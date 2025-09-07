import { pgTable, serial, text, integer, timestamp, boolean, numeric, jsonb, varchar, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  walletAddress: text("wallet_address").notNull().unique(),
  username: text("username"),
  nonce: text("nonce").notNull(), // For signature verification
  createdAt: timestamp("created_at").defaultNow().notNull(),
  totalWagered: numeric("total_wagered", { precision: 20, scale: 8 }).default("0"),
  totalWon: numeric("total_won", { precision: 20, scale: 8 }).default("0"),
  totalProfit: numeric("total_profit", { precision: 20, scale: 8 }).default("0"),
  gamesPlayed: integer("games_played").default(0),
  currentStreak: integer("current_streak").default(0),
  bestStreak: integer("best_streak").default(0),
});

// Game seeds table for provably fair gaming
export const gameSeeds = pgTable("game_seeds", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  serverSeed: text("server_seed").notNull(), // Hidden until revealed
  serverSeedHash: text("server_seed_hash").notNull(), // Shown to player before bet
  clientSeed: text("client_seed").notNull(), // Player's seed
  nonce: integer("nonce").default(0).notNull(), // Increments with each bet
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  revealedAt: timestamp("revealed_at"), // When server seed is revealed
});

// Dice game bets
export const diceBets = pgTable("dice_bets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  seedId: integer("seed_id").references(() => gameSeeds.id).notNull(),
  betAmount: numeric("bet_amount", { precision: 20, scale: 8 }).notNull(),
  target: integer("target").notNull(), // Roll under this number to win
  multiplier: numeric("multiplier", { precision: 10, scale: 4 }).notNull(),
  result: integer("result").notNull(), // The dice roll result (0-9999)
  won: boolean("won").notNull(),
  profit: numeric("profit", { precision: 20, scale: 8 }).notNull(),
  txHash: text("tx_hash"), // Blockchain transaction hash if applicable
  createdAt: timestamp("created_at").defaultNow().notNull(),
  fairnessProof: jsonb("fairness_proof"), // Store the proof data
});

// Staking table for GTLM tokens
export const stakes = pgTable("stakes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  amount: numeric("amount", { precision: 20, scale: 8 }).notNull(),
  stakedAt: timestamp("staked_at").defaultNow().notNull(),
  unstakedAt: timestamp("unstaked_at"),
  rewardsEarned: numeric("rewards_earned", { precision: 20, scale: 8 }).default("0"),
  isActive: boolean("is_active").default(true),
});

// House edge and revenue tracking
export const houseStats = pgTable("house_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").defaultNow().notNull(),
  totalVolume: numeric("total_volume", { precision: 20, scale: 8 }).default("0"),
  totalProfit: numeric("total_profit", { precision: 20, scale: 8 }).default("0"),
  totalBets: integer("total_bets").default(0),
  uniquePlayers: integer("unique_players").default(0),
  revenueSharingPool: numeric("revenue_sharing_pool", { precision: 20, scale: 8 }).default("0"),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  gameSeeds: many(gameSeeds),
  diceBets: many(diceBets),
  stakes: many(stakes),
}));

export const gameSeedsRelations = relations(gameSeeds, ({ one, many }) => ({
  user: one(users, {
    fields: [gameSeeds.userId],
    references: [users.id],
  }),
  diceBets: many(diceBets),
}));

export const diceBetsRelations = relations(diceBets, ({ one }) => ({
  user: one(users, {
    fields: [diceBets.userId],
    references: [users.id],
  }),
  seed: one(gameSeeds, {
    fields: [diceBets.seedId],
    references: [gameSeeds.id],
  }),
}));

export const stakesRelations = relations(stakes, ({ one }) => ({
  user: one(users, {
    fields: [stakes.userId],
    references: [users.id],
  }),
}));

// Schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({ 
  id: true, 
  createdAt: true,
  totalWagered: true,
  totalWon: true,
  totalProfit: true,
  gamesPlayed: true,
  currentStreak: true,
  bestStreak: true,
});

export const insertGameSeedSchema = createInsertSchema(gameSeeds).omit({ 
  id: true, 
  createdAt: true,
  nonce: true,
  isActive: true,
  revealedAt: true,
});

export const insertDiceBetSchema = createInsertSchema(diceBets).omit({ 
  id: true, 
  createdAt: true,
  fairnessProof: true,
});

export const insertStakeSchema = createInsertSchema(stakes).omit({ 
  id: true, 
  stakedAt: true,
  unstakedAt: true,
  rewardsEarned: true,
  isActive: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type GameSeed = typeof gameSeeds.$inferSelect;
export type InsertGameSeed = z.infer<typeof insertGameSeedSchema>;
export type DiceBet = typeof diceBets.$inferSelect;
export type InsertDiceBet = z.infer<typeof insertDiceBetSchema>;
export type Stake = typeof stakes.$inferSelect;
export type InsertStake = z.infer<typeof insertStakeSchema>;
export type HouseStat = typeof houseStats.$inferSelect;