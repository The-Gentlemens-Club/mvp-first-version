import { users, gameSeeds, diceBets, stakes, houseStats, type User, type InsertUser, type GameSeed, type InsertGameSeed, type DiceBet, type InsertDiceBet, type Stake, type InsertStake, type HouseStat } from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, sql } from "drizzle-orm";
import { ProvablyFair } from "./provably-fair";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByWallet(walletAddress: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStats(userId: number, bet: DiceBet): Promise<void>;
  
  // Game seed operations
  getActiveSeed(userId: number): Promise<GameSeed | undefined>;
  createGameSeed(seed: InsertGameSeed): Promise<GameSeed>;
  revealSeed(seedId: number): Promise<GameSeed>;
  incrementSeedNonce(seedId: number): Promise<void>;
  
  // Dice bet operations
  createDiceBet(bet: InsertDiceBet & { fairnessProof?: any }): Promise<DiceBet>;
  getUserBets(userId: number, limit?: number): Promise<DiceBet[]>;
  getRecentBets(limit?: number): Promise<DiceBet[]>;
  
  // Staking operations
  createStake(stake: InsertStake): Promise<Stake>;
  getActiveStakes(userId: number): Promise<Stake[]>;
  getTotalStaked(): Promise<number>;
  
  // House stats
  updateHouseStats(bet: DiceBet): Promise<void>;
  getHouseStats(): Promise<HouseStat | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByWallet(walletAddress: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.walletAddress, walletAddress.toLowerCase()));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        walletAddress: insertUser.walletAddress.toLowerCase(),
        nonce: Math.floor(Math.random() * 1000000).toString(),
      })
      .returning();
    return user;
  }

  async updateUserStats(userId: number, bet: DiceBet): Promise<void> {
    const user = await this.getUser(userId);
    if (!user) return;

    const newTotalWagered = parseFloat(user.totalWagered || '0') + parseFloat(bet.betAmount);
    const newTotalWon = bet.won ? parseFloat(user.totalWon || '0') + parseFloat(bet.betAmount) * parseFloat(bet.multiplier) : parseFloat(user.totalWon || '0');
    const newTotalProfit = parseFloat(user.totalProfit || '0') + parseFloat(bet.profit);
    const newGamesPlayed = (user.gamesPlayed || 0) + 1;
    const newCurrentStreak = bet.won ? (user.currentStreak || 0) + 1 : 0;
    const newBestStreak = Math.max(user.bestStreak || 0, newCurrentStreak);

    await db
      .update(users)
      .set({
        totalWagered: newTotalWagered.toString(),
        totalWon: newTotalWon.toString(),
        totalProfit: newTotalProfit.toString(),
        gamesPlayed: newGamesPlayed,
        currentStreak: newCurrentStreak,
        bestStreak: newBestStreak,
      })
      .where(eq(users.id, userId));
  }

  // Game seed operations
  async getActiveSeed(userId: number): Promise<GameSeed | undefined> {
    const [seed] = await db
      .select()
      .from(gameSeeds)
      .where(and(eq(gameSeeds.userId, userId), eq(gameSeeds.isActive, true)))
      .orderBy(desc(gameSeeds.createdAt))
      .limit(1);
    return seed || undefined;
  }

  async createGameSeed(insertSeed: InsertGameSeed): Promise<GameSeed> {
    // Deactivate previous seeds
    await db
      .update(gameSeeds)
      .set({ isActive: false })
      .where(eq(gameSeeds.userId, insertSeed.userId));

    // Create new seed
    const serverSeed = ProvablyFair.generateServerSeed();
    const serverSeedHash = ProvablyFair.hashServerSeed(serverSeed);
    
    const [seed] = await db
      .insert(gameSeeds)
      .values({
        ...insertSeed,
        serverSeed,
        serverSeedHash,
        isActive: true,
        nonce: 0,
      })
      .returning();
    return seed;
  }

  async revealSeed(seedId: number): Promise<GameSeed> {
    const [seed] = await db
      .update(gameSeeds)
      .set({ 
        isActive: false,
        revealedAt: new Date(),
      })
      .where(eq(gameSeeds.id, seedId))
      .returning();
    return seed;
  }

  async incrementSeedNonce(seedId: number): Promise<void> {
    await db
      .update(gameSeeds)
      .set({ 
        nonce: sql`${gameSeeds.nonce} + 1`
      })
      .where(eq(gameSeeds.id, seedId));
  }

  // Dice bet operations
  async createDiceBet(insertBet: InsertDiceBet & { fairnessProof?: any }): Promise<DiceBet> {
    const [bet] = await db
      .insert(diceBets)
      .values({
        ...insertBet,
        fairnessProof: insertBet.fairnessProof || null
      })
      .returning();
    
    // Update user stats
    await this.updateUserStats(bet.userId, bet);
    
    // Update house stats
    await this.updateHouseStats(bet);
    
    // Increment seed nonce
    await this.incrementSeedNonce(bet.seedId);
    
    return bet;
  }

  async getUserBets(userId: number, limit: number = 50): Promise<DiceBet[]> {
    return await db
      .select()
      .from(diceBets)
      .where(eq(diceBets.userId, userId))
      .orderBy(desc(diceBets.createdAt))
      .limit(limit);
  }

  async getRecentBets(limit: number = 20): Promise<DiceBet[]> {
    return await db
      .select()
      .from(diceBets)
      .orderBy(desc(diceBets.createdAt))
      .limit(limit);
  }

  // Staking operations
  async createStake(insertStake: InsertStake): Promise<Stake> {
    const [stake] = await db
      .insert(stakes)
      .values(insertStake)
      .returning();
    return stake;
  }

  async getActiveStakes(userId: number): Promise<Stake[]> {
    return await db
      .select()
      .from(stakes)
      .where(and(eq(stakes.userId, userId), eq(stakes.isActive, true)));
  }

  async getTotalStaked(): Promise<number> {
    const result = await db
      .select({ total: sql<string>`COALESCE(SUM(amount), 0)` })
      .from(stakes)
      .where(eq(stakes.isActive, true));
    return parseFloat(result[0]?.total || '0');
  }

  // House stats
  async updateHouseStats(bet: DiceBet): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [existing] = await db
      .select()
      .from(houseStats)
      .where(sql`DATE(${houseStats.date}) = DATE(${today})`);
    
    if (existing) {
      const houseProfit = bet.won ? -parseFloat(bet.profit) : parseFloat(bet.betAmount);
      const revenueShare = houseProfit > 0 ? houseProfit * 0.3 : 0; // 30% revenue sharing
      
      await db
        .update(houseStats)
        .set({
          totalVolume: (parseFloat(existing.totalVolume || '0') + parseFloat(bet.betAmount)).toString(),
          totalProfit: (parseFloat(existing.totalProfit || '0') + houseProfit).toString(),
          totalBets: (existing.totalBets || 0) + 1,
          revenueSharingPool: (parseFloat(existing.revenueSharingPool || '0') + revenueShare).toString(),
        })
        .where(eq(houseStats.id, existing.id));
    } else {
      const houseProfit = bet.won ? -parseFloat(bet.profit) : parseFloat(bet.betAmount);
      const revenueShare = houseProfit > 0 ? houseProfit * 0.3 : 0;
      
      await db
        .insert(houseStats)
        .values({
          date: today,
          totalVolume: bet.betAmount,
          totalProfit: houseProfit.toString(),
          totalBets: 1,
          uniquePlayers: 1,
          revenueSharingPool: revenueShare.toString(),
        });
    }
  }

  async getHouseStats(): Promise<HouseStat | undefined> {
    const [stats] = await db
      .select()
      .from(houseStats)
      .orderBy(desc(houseStats.date))
      .limit(1);
    return stats || undefined;
  }
}

export const storage = new DatabaseStorage();