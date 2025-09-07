import crypto from 'crypto';

/**
 * Provably Fair Gaming System
 * 
 * This system ensures that game outcomes are:
 * 1. Predetermined before the bet is placed
 * 2. Verifiable by the player after the game
 * 3. Impossible for the house to manipulate
 */

export class ProvablyFair {
  /**
   * Generate a random server seed
   */
  static generateServerSeed(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  /**
   * Hash the server seed (shown to player before bet)
   */
  static hashServerSeed(serverSeed: string): string {
    return crypto.createHash('sha256').update(serverSeed).digest('hex');
  }

  /**
   * Generate a random client seed (or let player choose)
   */
  static generateClientSeed(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  /**
   * Calculate dice roll result (0-9999)
   * @param serverSeed - The server's secret seed
   * @param clientSeed - The player's seed
   * @param nonce - Bet number with current seed pair
   * @returns A number between 0 and 9999
   */
  static calculateDiceRoll(serverSeed: string, clientSeed: string, nonce: number): number {
    // Combine seeds and nonce
    const combined = `${serverSeed}-${clientSeed}-${nonce}`;
    
    // Create HMAC hash
    const hmac = crypto.createHmac('sha512', serverSeed).update(combined).digest('hex');
    
    // Take first 8 characters of the hash
    const index = 0;
    const lucky = parseInt(hmac.substring(index * 5, index * 5 + 5), 16);
    
    // Convert to 0-9999 range
    const result = Math.floor((lucky / Math.pow(2, 20)) * 10000);
    
    return Math.min(result, 9999); // Ensure max is 9999
  }

  /**
   * Calculate win chance and multiplier for dice game
   * @param target - Roll under this to win (1-9999)
   * @param houseEdge - House edge percentage (default 1%)
   */
  static calculateDiceOdds(target: number, houseEdge: number = 1): { 
    winChance: number; 
    multiplier: number;
    payout: number;
  } {
    // Win chance is target / 10000 (since we roll 0-9999)
    const winChance = target / 10000;
    
    // Fair multiplier would be 1 / winChance
    // With house edge: multiplier = (1 - houseEdge/100) / winChance
    const multiplier = (100 - houseEdge) / (winChance * 100);
    
    // Payout is bet * multiplier (includes original bet)
    const payout = multiplier;
    
    return {
      winChance: winChance * 100, // As percentage
      multiplier: parseFloat(multiplier.toFixed(4)),
      payout: parseFloat(payout.toFixed(4))
    };
  }

  /**
   * Verify a dice roll result
   * Used by players to verify fairness after server seed is revealed
   */
  static verifyDiceRoll(
    serverSeed: string, 
    serverSeedHash: string,
    clientSeed: string, 
    nonce: number,
    result: number
  ): boolean {
    // Verify server seed matches the hash shown before bet
    const calculatedHash = this.hashServerSeed(serverSeed);
    if (calculatedHash !== serverSeedHash) {
      return false;
    }
    
    // Verify the result matches what should have been rolled
    const calculatedResult = this.calculateDiceRoll(serverSeed, clientSeed, nonce);
    return calculatedResult === result;
  }

  /**
   * Generate fairness proof data for storage
   */
  static generateFairnessProof(
    serverSeed: string,
    serverSeedHash: string,
    clientSeed: string,
    nonce: number,
    result: number
  ) {
    return {
      serverSeedHash,
      clientSeed,
      nonce,
      result,
      timestamp: Date.now(),
      // Include calculation method for transparency
      algorithm: 'HMAC-SHA512',
      range: '0-9999'
    };
  }
}

// Example usage:
/*
// Before game starts:
const serverSeed = ProvablyFair.generateServerSeed();
const serverSeedHash = ProvablyFair.hashServerSeed(serverSeed);
// Show serverSeedHash to player

// Player provides or we generate:
const clientSeed = ProvablyFair.generateClientSeed();

// For each bet:
const nonce = 0; // Increments with each bet
const result = ProvablyFair.calculateDiceRoll(serverSeed, clientSeed, nonce);

// After revealing server seed, player can verify:
const isValid = ProvablyFair.verifyDiceRoll(
  serverSeed, 
  serverSeedHash, 
  clientSeed, 
  nonce, 
  result
);
*/