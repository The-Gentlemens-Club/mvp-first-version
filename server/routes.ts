import { Router } from "express";
import { z } from "zod";
import { storage } from "./storage";
import { insertUserSchema, insertDiceBetSchema } from "@shared/schema";
import { ProvablyFair } from "./provably-fair";
import crypto from "crypto";

const router = Router();

// Get current user by wallet address
router.get("/api/user/:walletAddress", async (req, res) => {
  try {
    const user = await storage.getUserByWallet(req.params.walletAddress);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

// Create or authenticate user
router.post("/api/auth", async (req, res) => {
  try {
    const { walletAddress } = req.body;
    
    if (!walletAddress) {
      return res.status(400).json({ error: "Wallet address required" });
    }

    let user = await storage.getUserByWallet(walletAddress);
    
    if (!user) {
      // Create new user
      user = await storage.createUser({
        walletAddress,
        nonce: crypto.randomBytes(16).toString('hex')
      });
      
      // Create initial game seed for new user
      await storage.createGameSeed({
        userId: user.id,
        clientSeed: ProvablyFair.generateClientSeed(),
        serverSeed: "", // Will be set by storage
        serverSeedHash: "" // Will be set by storage
      });
    }
    
    // Get active seed
    const activeSeed = await storage.getActiveSeed(user.id);
    
    res.json({ 
      user,
      activeSeed: activeSeed ? {
        id: activeSeed.id,
        serverSeedHash: activeSeed.serverSeedHash,
        clientSeed: activeSeed.clientSeed,
        nonce: activeSeed.nonce
      } : null
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
});

// Get active game seed for user
router.get("/api/seed/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const seed = await storage.getActiveSeed(userId);
    
    if (!seed) {
      return res.status(404).json({ error: "No active seed found" });
    }
    
    // Only return public information
    res.json({
      id: seed.id,
      serverSeedHash: seed.serverSeedHash,
      clientSeed: seed.clientSeed,
      nonce: seed.nonce,
      createdAt: seed.createdAt
    });
  } catch (error) {
    console.error("Error fetching seed:", error);
    res.status(500).json({ error: "Failed to fetch seed" });
  }
});

// Create new game seed (rotate seeds)
router.post("/api/seed/rotate", async (req, res) => {
  try {
    const { userId, clientSeed } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }
    
    // Reveal old seed if exists
    const oldSeed = await storage.getActiveSeed(userId);
    if (oldSeed) {
      await storage.revealSeed(oldSeed.id);
    }
    
    // Create new seed
    const newSeed = await storage.createGameSeed({
      userId,
      clientSeed: clientSeed || ProvablyFair.generateClientSeed(),
      serverSeed: "", // Will be set by storage
      serverSeedHash: "" // Will be set by storage
    });
    
    res.json({
      id: newSeed.id,
      serverSeedHash: newSeed.serverSeedHash,
      clientSeed: newSeed.clientSeed,
      nonce: newSeed.nonce,
      previousSeed: oldSeed ? {
        serverSeed: oldSeed.serverSeed,
        serverSeedHash: oldSeed.serverSeedHash,
        clientSeed: oldSeed.clientSeed
      } : null
    });
  } catch (error) {
    console.error("Error rotating seed:", error);
    res.status(500).json({ error: "Failed to rotate seed" });
  }
});

// Place a dice bet
router.post("/api/dice/bet", async (req, res) => {
  try {
    const { userId, betAmount, target } = req.body;
    
    // Validate inputs
    if (!userId || !betAmount || !target) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const betAmountNum = parseFloat(betAmount);
    const targetNum = parseInt(target);
    
    if (betAmountNum <= 0) {
      return res.status(400).json({ error: "Bet amount must be positive" });
    }
    
    if (targetNum < 100 || targetNum > 9900) {
      return res.status(400).json({ error: "Target must be between 100 and 9900" });
    }
    
    // Get active seed
    const seed = await storage.getActiveSeed(userId);
    if (!seed) {
      return res.status(400).json({ error: "No active seed. Please refresh seed." });
    }
    
    // Calculate dice roll
    const result = ProvablyFair.calculateDiceRoll(
      seed.serverSeed,
      seed.clientSeed,
      seed.nonce || 0
    );
    
    // Calculate odds and determine win
    const odds = ProvablyFair.calculateDiceOdds(targetNum);
    const won = result < targetNum;
    const profit = won ? (betAmountNum * odds.multiplier - betAmountNum) : -betAmountNum;
    
    // Generate fairness proof
    const fairnessProof = ProvablyFair.generateFairnessProof(
      seed.serverSeed,
      seed.serverSeedHash,
      seed.clientSeed,
      seed.nonce || 0,
      result
    );
    
    // Create bet record with fairness proof
    const betData: any = {
      userId,
      seedId: seed.id,
      betAmount: betAmountNum.toString(),
      target: targetNum,
      multiplier: odds.multiplier.toString(),
      result,
      won,
      profit: profit.toString(),
      txHash: null, // Optional blockchain tx hash
      fairnessProof // Include the proof
    };
    
    const bet = await storage.createDiceBet(betData);
    
    // Get updated user stats
    const user = await storage.getUser(userId);
    
    res.json({
      bet: {
        ...bet,
        serverSeedHash: seed.serverSeedHash,
        clientSeed: seed.clientSeed,
        nonce: seed.nonce
      },
      user
    });
  } catch (error) {
    console.error("Error placing bet:", error);
    res.status(500).json({ error: "Failed to place bet" });
  }
});

// Get recent bets (all users) - MUST BE BEFORE :userId route
router.get("/api/bets/recent", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20;
    const bets = await storage.getRecentBets(limit);
    res.json(bets || []);
  } catch (error) {
    console.error("Error fetching recent bets:", error);
    // Return empty array on error to prevent frontend crashes
    res.json([]);
  }
});

// Get user's bet history - MUST BE AFTER /recent route
router.get("/api/bets/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    
    // Validate userId
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    
    const limit = parseInt(req.query.limit as string) || 50;
    
    const bets = await storage.getUserBets(userId, limit);
    res.json(bets || []);
  } catch (error) {
    console.error("Error fetching bets:", error);
    res.status(500).json({ error: "Failed to fetch bets" });
  }
});

// Verify a bet's fairness
router.post("/api/verify", async (req, res) => {
  try {
    const { serverSeed, serverSeedHash, clientSeed, nonce, result } = req.body;
    
    const isValid = ProvablyFair.verifyDiceRoll(
      serverSeed,
      serverSeedHash,
      clientSeed,
      nonce,
      result
    );
    
    const calculatedResult = ProvablyFair.calculateDiceRoll(serverSeed, clientSeed, nonce);
    
    res.json({
      isValid,
      providedResult: result,
      calculatedResult,
      serverSeedHash: ProvablyFair.hashServerSeed(serverSeed),
      providedHash: serverSeedHash
    });
  } catch (error) {
    console.error("Error verifying bet:", error);
    res.status(500).json({ error: "Failed to verify bet" });
  }
});

// Get house statistics
router.get("/api/stats/house", async (req, res) => {
  try {
    const stats = await storage.getHouseStats();
    const totalStaked = await storage.getTotalStaked();
    
    res.json({
      ...stats,
      totalStaked: totalStaked.toString()
    });
  } catch (error) {
    console.error("Error fetching house stats:", error);
    res.status(500).json({ error: "Failed to fetch house stats" });
  }
});

// Get house statistics
router.get("/api/stats/house", async (req, res) => {
  try {
    const stats = await storage.getHouseStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching house stats:", error);
    // Return default stats on error
    res.json({
      totalWagered: "0",
      totalWon: "0",
      totalProfit: "0",
      totalGames: 0,
      totalVolume: "10.5",
      totalStaked: "5000",
      revenueSharingPool: "0.315"
    });
  }
});

// Simulate staking (for demo purposes)
router.post("/api/stake/simulate", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    
    if (!userId || !amount) {
      return res.status(400).json({ error: "User ID and amount required" });
    }
    
    const stake = await storage.createStake({
      userId,
      amount: amount.toString()
    });
    
    const totalStaked = await storage.getTotalStaked();
    const houseStats = await storage.getHouseStats();
    const revenueShare = houseStats ? parseFloat(houseStats.revenueSharingPool || '0') : 0;
    
    // Calculate estimated APY based on house performance
    const estimatedAPY = totalStaked > 0 ? (revenueShare * 365 / totalStaked) * 100 : 30;
    
    res.json({
      stake,
      totalStaked: totalStaked.toString(),
      estimatedAPY: estimatedAPY.toFixed(2),
      revenueSharePool: revenueShare.toFixed(8)
    });
  } catch (error) {
    console.error("Error simulating stake:", error);
    res.status(500).json({ error: "Failed to simulate stake" });
  }
});

export default router;