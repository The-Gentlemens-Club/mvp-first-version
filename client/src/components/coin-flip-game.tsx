import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Coins, Crown, Shield, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { useAccount } from '@/hooks/use-web3';
import { useMutation, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export function CoinFlipGame() {
  const { account } = useAccount();
  const [betAmount, setBetAmount] = useState('0.1');
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails'>('heads');
  const [isFlipping, setIsFlipping] = useState(false);
  const [lastResult, setLastResult] = useState<{
    won: boolean;
    side: 'heads' | 'tails';
    payout: string;
  } | null>(null);
  const [coinRotation, setCoinRotation] = useState(0);

  // Get user data
  const { data: authData } = useQuery({
    queryKey: ['/api/auth', account],
    queryFn: async () => {
      if (!account) return null;
      const response = await apiRequest('POST', '/api/auth', {
        walletAddress: account
      });
      return response.json();
    },
    enabled: !!account
  });

  const user = authData?.user;

  // Get recent flips
  const { data: recentFlips } = useQuery({
    queryKey: ['/api/coinflips/recent'],
    queryFn: async () => {
      const response = await fetch('/api/coinflips/recent');
      return response.json();
    },
    refetchInterval: 5000
  });

  // Flip mutation
  const flipMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please connect wallet");
      
      const response = await apiRequest('POST', '/api/coinflip/bet', {
        userId: user.id,
        betAmount,
        choice: selectedSide
      });
      
      return response.json();
    },
    onSuccess: async (data) => {
      setIsFlipping(true);
      
      // Animate coin flip
      const flips = 8 + Math.floor(Math.random() * 4); // 8-11 flips
      setCoinRotation(flips * 180);
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setLastResult({
        won: data.won,
        side: data.result,
        payout: data.payout
      });
      
      if (data.won) {
        toast.success(`You won ${data.payout} ETH!`, {
          icon: '🎉',
          duration: 5000,
          style: {
            background: 'linear-gradient(145deg, #2a3b4c, #1a2b3c)',
            border: '2px solid #d4af37',
            color: '#fff'
          }
        });
      } else {
        toast.error(`The coin landed on ${data.result}. Better luck next time!`, {
          icon: '😔',
          duration: 3000
        });
      }
      
      setIsFlipping(false);
      setCoinRotation(0);
      
      // Refresh user bets
      queryClient.invalidateQueries({ queryKey: ['/api/bets'] });
      queryClient.invalidateQueries({ queryKey: ['/api/coinflips/recent'] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Flip failed");
      setIsFlipping(false);
    }
  });

  const handleFlip = () => {
    if (!betAmount || parseFloat(betAmount) <= 0) {
      toast.error("Please enter a valid bet amount");
      return;
    }
    flipMutation.mutate();
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="luxury-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Coins className="w-6 h-6 text-yellow-400" />
              <span className="font-playfair text-2xl">Coin Flip</span>
            </span>
            <Badge className="bg-green-900/50 text-green-400 border-green-600">
              50/50 Odds • 2x Payout
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="luxury-card">
            <CardContent className="p-8">
              {/* Coin Display */}
              <div className="flex justify-center mb-8">
                <div className="relative w-48 h-48">
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotateY: coinRotation }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Heads Side */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl flex items-center justify-center"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      <Crown className="w-24 h-24 text-yellow-900" />
                    </div>
                    
                    {/* Tails Side */}
                    <div 
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 shadow-2xl flex items-center justify-center"
                      style={{ 
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)"
                      }}
                    >
                      <Shield className="w-24 h-24 text-gray-900" />
                    </div>
                  </motion.div>
                  
                  {/* Shadow */}
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-black/20 rounded-full blur-xl" />
                </div>
              </div>

              {/* Last Result */}
              <AnimatePresence>
                {lastResult && !isFlipping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mb-6"
                  >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      lastResult.won 
                        ? 'bg-green-900/30 text-green-400 border border-green-600' 
                        : 'bg-red-900/30 text-red-400 border border-red-600'
                    }`}>
                      {lastResult.won ? (
                        <>
                          <TrendingUp className="w-5 h-5" />
                          <span className="font-bold">You Won {lastResult.payout} ETH!</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="w-5 h-5" />
                          <span>Lost - It was {lastResult.side}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Betting Controls */}
              <div className="space-y-6">
                {/* Side Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Choose Your Side
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setSelectedSide('heads')}
                      disabled={isFlipping || flipMutation.isPending}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSide === 'heads'
                          ? 'border-yellow-400 bg-yellow-900/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Crown className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                      <p className="font-bold text-white">HEADS</p>
                      <p className="text-xs text-gray-400">Crown</p>
                    </button>
                    
                    <button
                      onClick={() => setSelectedSide('tails')}
                      disabled={isFlipping || flipMutation.isPending}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedSide === 'tails'
                          ? 'border-yellow-400 bg-yellow-900/20'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <Shield className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <p className="font-bold text-white">TAILS</p>
                      <p className="text-xs text-gray-400">Shield</p>
                    </button>
                  </div>
                </div>

                {/* Bet Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-3">
                    Bet Amount (ETH)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      step="0.01"
                      min="0.01"
                      disabled={isFlipping || flipMutation.isPending}
                      className="flex-1 px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-yellow-400 focus:outline-none"
                    />
                    <div className="flex gap-1">
                      {['0.1', '0.5', '1'].map(amount => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setBetAmount(amount)}
                          disabled={isFlipping || flipMutation.isPending}
                          className="border-gray-700"
                        >
                          {amount}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Potential Win: {(parseFloat(betAmount || '0') * 2).toFixed(2)} ETH
                  </p>
                </div>

                {/* Flip Button */}
                <Button
                  onClick={handleFlip}
                  disabled={!account || isFlipping || flipMutation.isPending}
                  className="w-full btn-luxury-primary py-6 text-lg font-bold"
                >
                  {isFlipping || flipMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {isFlipping ? 'Flipping...' : 'Processing...'}
                    </>
                  ) : (
                    <>
                      <Coins className="w-5 h-5 mr-2" />
                      Flip Coin ({betAmount} ETH)
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats & Recent Flips */}
        <div className="space-y-6">
          {/* Game Stats */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-lg font-playfair">Game Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">House Edge</span>
                <span className="text-white font-bold">2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Win Chance</span>
                <span className="text-green-400 font-bold">50%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Payout</span>
                <span className="text-yellow-400 font-bold">2x</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Min Bet</span>
                <span className="text-white">0.01 ETH</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Max Bet</span>
                <span className="text-white">10 ETH</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Flips */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="text-lg font-playfair">Recent Flips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {recentFlips?.length > 0 ? (
                  recentFlips.map((flip: any, index: number) => (
                    <div
                      key={flip.id || index}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-800/50"
                    >
                      <div className="flex items-center gap-2">
                        {flip.result === 'heads' ? (
                          <Crown className="w-4 h-4 text-yellow-400" />
                        ) : (
                          <Shield className="w-4 h-4 text-gray-400" />
                        )}
                        <span className="text-xs text-gray-400">
                          {flip.player?.slice(0, 6)}...
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          flip.won ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {flip.won ? '+' : '-'}{flip.amount} ETH
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-4">
                    No recent flips. Be the first!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}