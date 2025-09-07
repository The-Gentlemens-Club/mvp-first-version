import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dice1, Hash, Shield, TrendingUp, RefreshCw, Lock, Unlock, Zap, AlertCircle, CheckCircle2, Copy } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { EnhancedTooltip } from "@/components/enhanced-tooltip";

interface GameSeed {
  id: number;
  serverSeedHash: string;
  clientSeed: string;
  nonce: number;
}

interface User {
  id: number;
  walletAddress: string;
  totalWagered: string;
  totalWon: string;
  totalProfit: string;
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
}

interface DiceBet {
  id: number;
  betAmount: string;
  target: number;
  multiplier: string;
  result: number;
  won: boolean;
  profit: string;
  createdAt: string;
  serverSeedHash?: string;
  clientSeed?: string;
  nonce?: number;
}

export default function DiceGame() {
  const { account } = useWeb3();
  const queryClient = useQueryClient();
  
  // Game state
  const [betAmount, setBetAmount] = useState("0.1");
  const [target, setTarget] = useState(5000);
  const [isRolling, setIsRolling] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSeedModal, setShowSeedModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [customClientSeed, setCustomClientSeed] = useState("");
  const [verifyData, setVerifyData] = useState<any>(null);
  
  // Calculate odds
  const winChance = (target / 10000) * 100;
  const multiplier = (99 / winChance).toFixed(4);
  const potentialPayout = (parseFloat(betAmount) * parseFloat(multiplier)).toFixed(4);

  // Authenticate user
  const { data: authData, refetch: refetchAuth } = useQuery({
    queryKey: ['/api/auth', account],
    queryFn: async () => {
      if (!account) return null;
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ walletAddress: account })
      });
      return response.json();
    },
    enabled: !!account
  });

  const user = authData?.user as User | undefined;
  const activeSeed = authData?.activeSeed as GameSeed | undefined;

  // Get recent bets
  const { data: recentBets } = useQuery({
    queryKey: ['/api/bets/recent'],
    queryFn: async () => {
      const response = await fetch('/api/bets/recent?limit=10');
      const data = await response.json();
      // Ensure we always return an array
      return Array.isArray(data) ? data : [];
    },
    refetchInterval: 5000 // Refresh every 5 seconds
  });

  // Get user bets
  const { data: userBets } = useQuery({
    queryKey: user?.id ? [`/api/bets/${user.id}`] : ['no-user-bets'],
    queryFn: async () => {
      if (!user?.id) return [];
      const response = await fetch(`/api/bets/${user.id}?limit=20`);
      if (!response.ok) return [];
      return response.json();
    },
    enabled: !!user?.id
  });

  // Place bet mutation
  const placeBetMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please connect wallet");
      
      const response = await fetch('/api/dice/bet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          betAmount,
          target
        })
      });
      
      const data = await response.json();
      if (!data.bet) throw new Error("Bet failed");
      return data;
    },
    onSuccess: (data) => {
      // Clear the rolling animation interval
      if ((window as any).diceRollInterval) {
        clearInterval((window as any).diceRollInterval);
        (window as any).diceRollInterval = null;
      }
      
      // Set the final result and stop rolling
      setLastRoll(data.bet.result);
      setIsRolling(false);
      
      if (data.bet.won) {
        setShowConfetti(true);
        toast.success(`🎉 You won ${data.bet.profit} ETH!`, {
          duration: 5000,
          style: {
            background: 'linear-gradient(145deg, #2a3b4c, #1a2b3c)',
            border: '2px solid #d4af37',
            color: '#fff'
          }
        });
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        toast.error(`Roll: ${data.bet.result} - Better luck next time!`, {
          duration: 3000
        });
      }
      
      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['/api/auth'] });
      queryClient.invalidateQueries({ queryKey: [`/api/bets/${user?.id}`] });
      queryClient.invalidateQueries({ queryKey: ['/api/bets/recent'] });
    },
    onError: (error: any) => {
      // Clear the rolling animation interval on error
      if ((window as any).diceRollInterval) {
        clearInterval((window as any).diceRollInterval);
        (window as any).diceRollInterval = null;
      }
      
      // Stop rolling and show error
      setIsRolling(false);
      toast.error(error.message || "Bet failed");
    }
  });

  // Rotate seed mutation
  const rotateSeedMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please connect wallet");
      
      const response = await fetch('/api/seed/rotate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          clientSeed: customClientSeed || undefined
        })
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      toast.success("Seeds rotated successfully!");
      setShowSeedModal(false);
      setCustomClientSeed("");
      
      // Show previous seed for verification
      if (data.previousSeed) {
        setVerifyData(data.previousSeed);
      }
      
      refetchAuth();
    }
  });

  const handleRoll = async () => {
    if (!account) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setIsRolling(true);
    setLastRoll(null);
    
    // Start rolling animation that continues until bet result arrives
    const rollInterval = setInterval(() => {
      setLastRoll(Math.floor(Math.random() * 10000));
    }, 50);
    
    // Store interval ID to clear it when bet completes
    (window as any).diceRollInterval = rollInterval;
    
    // Place the bet after a short initial animation (500ms)
    setTimeout(() => {
      placeBetMutation.mutate();
    }, 500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="space-y-6">

      
      {/* Main Game Card */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Dice1 className="w-6 h-6 text-yellow-400" />
              <span className="font-playfair">Provably Fair Dice</span>
            </CardTitle>
            <Badge className="bg-green-900/50 text-green-400 border-green-600">
              <Shield className="w-3 h-3 mr-1" />
              Blockchain Verified
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Dice Display */}
          <div className="relative h-48 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-yellow-400/20 to-transparent animate-pulse" />
            </div>
            
            <div className="relative z-10 text-center">
              {lastRoll !== null ? (
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`text-7xl font-bold ${
                    userBets && userBets[0]?.result === lastRoll && userBets[0]?.won
                      ? 'text-green-400'
                      : userBets && userBets[0]?.result === lastRoll && !userBets[0]?.won
                      ? 'text-red-400'
                      : 'text-white'
                  }`}>
                  {lastRoll}
                </motion.div>
              ) : (
                <div className="text-5xl text-gray-500">
                  {isRolling ? (
                    <div className="animate-bounce">🎲</div>
                  ) : (
                    "Roll to Start"
                  )}
                </div>
              )}
              
              {lastRoll !== null && (
                <div className="mt-2 text-sm text-gray-400">
                  Target: Under {target}
                </div>
              )}
            </div>
          </div>

          {/* Betting Controls */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Bet Amount & Target */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="bet-amount">Bet Amount (ETH)</Label>
                <Input
                  id="bet-amount"
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  min="0.001"
                  step="0.001"
                  className="mt-2"
                  disabled={isRolling}
                />
                <div className="flex gap-2 mt-2">
                  {[0.01, 0.05, 0.1, 0.5].map(amount => (
                    <Button
                      key={amount}
                      size="sm"
                      variant="outline"
                      onClick={() => setBetAmount(amount.toString())}
                      disabled={isRolling}
                      className="text-xs"
                    >
                      {amount}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <Label htmlFor="target">Roll Under</Label>
                  <span className="text-sm text-gray-400">{target}</span>
                </div>
                <Slider
                  id="target"
                  value={[target]}
                  onValueChange={(value) => setTarget(value[0])}
                  min={100}
                  max={9900}
                  step={100}
                  className="mt-2"
                  disabled={isRolling}
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Min: 100</span>
                  <span>Max: 9900</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="space-y-3">
              <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-sm text-gray-400">Win Chance</span>
                <span className="font-bold text-green-400">{winChance.toFixed(2)}%</span>
              </div>
              
              <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-sm text-gray-400">Multiplier</span>
                <span className="font-bold text-yellow-400">{multiplier}x</span>
              </div>
              
              <div className="flex justify-between p-3 bg-gray-800/50 rounded-lg">
                <span className="text-sm text-gray-400">Potential Win</span>
                <span className="font-bold text-blue-400">{potentialPayout} ETH</span>
              </div>
            </div>
          </div>

          {/* Roll Button */}
          <Button
            className="w-full btn-luxury-primary text-lg py-6"
            onClick={handleRoll}
            disabled={isRolling || !account}
          >
            {isRolling ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Rolling...
              </>
            ) : (
              <>
                <Dice1 className="w-5 h-5 mr-2" />
                Roll Dice ({betAmount} ETH)
              </>
            )}
          </Button>

          {/* Enhanced Fairness Info with Verification */}
          {activeSeed && (
            <div className="p-4 bg-gray-800/30 rounded-lg space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-yellow-400">🔒 Provably Fair Gaming</h4>
                <Button
                  size="sm"
                  variant="outline"
                  className="btn-luxury-secondary text-xs"
                  onClick={() => setShowVerificationModal(true)}
                >
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verify This Bet
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Server Seed (Hash)</span>
                  <EnhancedTooltip content="This hash proves the server seed was predetermined before your bet">
                    <AlertCircle className="w-3 h-3 text-yellow-400" />
                  </EnhancedTooltip>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded flex-1 truncate font-mono">
                    {activeSeed.serverSeedHash}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(activeSeed.serverSeedHash)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Client Seed</span>
                  <span className="text-xs text-gray-500">Nonce: {activeSeed.nonce}</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded flex-1 font-mono">
                    {activeSeed.clientSeed}
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowSeedModal(true)}
                  >
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              {lastRoll && (
                <div className="pt-2 border-t border-gray-700">
                  <div className="text-xs text-gray-400 mb-1">Combined Hash (Last Roll)</div>
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded block truncate font-mono text-green-400">
                    SHA256({activeSeed.serverSeedHash} + {activeSeed.clientSeed}) = {lastRoll}
                  </code>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Stats */}
      {user && (
        <Card className="luxury-card">
          <CardHeader>
            <CardTitle className="font-playfair">Your Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {user.gamesPlayed || 0}
                </div>
                <div className="text-sm text-gray-400">Games Played</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {parseFloat(user.totalWon || '0').toFixed(4)}
                </div>
                <div className="text-sm text-gray-400">Total Won</div>
              </div>
              
              <div className="text-center">
                <div className={`text-2xl font-bold ${
                  parseFloat(user.totalProfit || '0') >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {parseFloat(user.totalProfit || '0').toFixed(4)}
                </div>
                <div className="text-sm text-gray-400">Total Profit</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {user.bestStreak || 0}
                </div>
                <div className="text-sm text-gray-400">Best Streak</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Bets Tabs */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="font-playfair">Betting History</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All Bets</TabsTrigger>
              <TabsTrigger value="my">My Bets</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(recentBets && Array.isArray(recentBets) ? recentBets : []).map((bet: DiceBet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        bet.won ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <div className="text-sm">
                          Roll: <span className="font-bold">{bet.result}</span> / Target: {bet.target}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(bet.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        bet.won ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {bet.won ? '+' : ''}{parseFloat(bet.profit).toFixed(4)} ETH
                      </div>
                      <div className="text-xs text-gray-500">
                        {bet.multiplier}x
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="my" className="mt-4">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {(userBets && Array.isArray(userBets) ? userBets : []).map((bet: DiceBet) => (
                  <div
                    key={bet.id}
                    className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        bet.won ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                      <div>
                        <div className="text-sm">
                          Roll: <span className="font-bold">{bet.result}</span> / Target: {bet.target}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(bet.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-sm font-bold ${
                        bet.won ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {bet.won ? '+' : ''}{parseFloat(bet.profit).toFixed(4)} ETH
                      </div>
                      <div className="text-xs text-gray-500">
                        Bet: {parseFloat(bet.betAmount).toFixed(4)} ETH
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!userBets || userBets.length === 0) && (
                  <div className="text-center py-8 text-gray-500">
                    No bets yet. Place your first bet!
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Seed Rotation Modal */}
      {showSeedModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="luxury-card max-w-md w-full">
            <CardHeader>
              <CardTitle>Rotate Seeds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Custom Client Seed (Optional)</Label>
                <Input
                  value={customClientSeed}
                  onChange={(e) => setCustomClientSeed(e.target.value)}
                  placeholder="Leave empty for random seed"
                  className="mt-2"
                />
              </div>
              
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => rotateSeedMutation.mutate()}
                  disabled={rotateSeedMutation.isPending}
                >
                  {rotateSeedMutation.isPending ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Unlock className="w-4 h-4 mr-2" />
                  )}
                  Rotate Seeds
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowSeedModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Verification Modal */}
      {verifyData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="luxury-card max-w-lg w-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                Previous Seed Revealed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Server Seed</div>
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded block break-all">
                    {verifyData.serverSeed}
                  </code>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Server Seed Hash</div>
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded block break-all">
                    {verifyData.serverSeedHash}
                  </code>
                </div>
                
                <div>
                  <div className="text-sm text-gray-400 mb-1">Client Seed</div>
                  <code className="text-xs bg-gray-900 px-2 py-1 rounded block">
                    {verifyData.clientSeed}
                  </code>
                </div>
              </div>
              
              <div className="text-sm text-gray-400">
                You can now verify all previous bets using this revealed server seed.
              </div>
              
              <Button
                className="w-full"
                onClick={() => setVerifyData(null)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}