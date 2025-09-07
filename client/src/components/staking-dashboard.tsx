import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Users, Lock, Unlock, DollarSign, PieChart, Activity, Shield } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import toast from "react-hot-toast";
import { AnimatedCounter } from "@/components/animated-counter";
import { EnhancedTooltip } from "@/components/enhanced-tooltip";
import { AnimatedProgress } from "@/components/animated-progress";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function StakingDashboard() {
  const { account } = useWeb3();
  const queryClient = useQueryClient();
  const [stakeAmount, setStakeAmount] = useState("100");

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

  // Get house statistics
  const { data: houseStats } = useQuery({
    queryKey: ['/api/stats/house'],
    queryFn: async () => {
      const response = await fetch('/api/stats/house');
      return response.json();
    },
    refetchInterval: 10000 // Refresh every 10 seconds
  });

  // Simulate staking mutation
  const stakeMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please connect wallet");
      
      const response = await apiRequest('POST', '/api/stake/simulate', {
        userId: user.id,
        amount: stakeAmount
      });
      
      return response.json();
    },
    onSuccess: (data) => {
      toast.success(`Successfully staked ${stakeAmount} GTLM tokens!`, {
        duration: 5000,
        style: {
          background: 'linear-gradient(145deg, #2a3b4c, #1a2b3c)',
          border: '2px solid #d4af37',
          color: '#fff'
        }
      });
      queryClient.invalidateQueries({ queryKey: ['/api/stats/house'] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Staking failed");
    }
  });

  // Chart data for revenue sharing
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Daily Revenue Share',
        data: [0.12, 0.19, 0.15, 0.25, 0.22, 0.30, 0.28],
        borderColor: '#d4af37',
        backgroundColor: 'rgba(212, 175, 55, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1a2b3c',
        borderColor: '#d4af37',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af'
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#9ca3af',
          callback: function(value: any) {
            return value + ' ETH';
          }
        }
      }
    }
  };

  const totalStaked = parseFloat(houseStats?.totalStaked || '0');
  const revenuePool = parseFloat(houseStats?.revenueSharingPool || '0');
  const estimatedAPY = totalStaked > 0 ? (revenuePool * 365 / totalStaked) * 100 : 30;
  const houseProfit = parseFloat(houseStats?.totalProfit || '0');
  const totalVolume = parseFloat(houseStats?.totalVolume || '0');

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="luxury-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Staked</p>
                <p className="text-2xl font-bold text-yellow-400">
                  <AnimatedCounter value={totalStaked} decimals={2} suffix=" GTLM" duration={2000} />
                </p>
              </div>
              <Coins className="w-8 h-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Revenue Pool</p>
                <p className="text-2xl font-bold text-green-400">
                  <AnimatedCounter value={revenuePool} decimals={4} suffix=" ETH" duration={2000} />
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Est. APY</p>
                <p className="text-2xl font-bold text-yellow-400">
                  <AnimatedCounter value={estimatedAPY} decimals={1} suffix="%" duration={2000} />
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-yellow-400/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">House Volume</p>
                <p className="text-2xl font-bold text-purple-400">
                  <AnimatedCounter value={totalVolume} decimals={2} suffix=" ETH" duration={2000} />
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Voting Power Display */}
      <Card className="luxury-card bg-gradient-to-br from-yellow-900/20 to-yellow-800/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-yellow-400" />
            <span className="font-playfair text-yellow-400">Your Voting Power</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">veGTLM Balance</span>
            <span className="text-2xl font-bold text-yellow-400">
              <AnimatedCounter 
                value={parseFloat(stakeAmount) * 1.5} 
                decimals={2}
                suffix=" veGTLM"
                duration={2000}
              />
            </span>
          </div>
          <div className="p-3 bg-gray-800/30 rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Calculation Formula:</p>
            <code className="text-xs text-yellow-400/80 block">
              {stakeAmount} GTLM × 1.5x (12-month lock) = {(parseFloat(stakeAmount) * 1.5).toFixed(2)} veGTLM
            </code>
          </div>
          <p className="text-xs text-gray-500">
            Your voting power increases with longer lock-up periods. Currently showing a 12-month lock-up scenario with 1.5x multiplier.
          </p>
        </CardContent>
      </Card>

      {/* Main Staking Card */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-yellow-400" />
              <span className="font-playfair">GTLM Token Staking</span>
            </CardTitle>
            <Badge className="bg-yellow-900/50 text-yellow-400 border-yellow-600">
              30% Revenue Share
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Staking Info */}
          <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-transparent rounded-lg border border-yellow-600/20">
            <h3 className="font-bold text-yellow-400 mb-2">🏆 Own the House</h3>
            <p className="text-sm text-gray-300">
              Stake your GTLM tokens to receive 30% of all house profits. The more you stake, 
              the larger your share of the revenue pool. Rewards are distributed daily and can 
              be claimed anytime.
            </p>
          </div>

          {/* Staking Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="stake-amount">Stake Amount (GTLM)</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="stake-amount"
                  type="number"
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                  min="1"
                  className="flex-1"
                />
                <Button
                  className="btn-luxury-primary"
                  onClick={() => stakeMutation.mutate()}
                  disabled={!account || stakeMutation.isPending}
                >
                  {stakeMutation.isPending ? (
                    <>
                      <Lock className="w-4 h-4 mr-2 animate-pulse" />
                      Staking...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Stake
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Quick Stake Buttons */}
            <div className="flex gap-2">
              {[100, 500, 1000, 5000].map(amount => (
                <Button
                  key={amount}
                  size="sm"
                  variant="outline"
                  onClick={() => setStakeAmount(amount.toString())}
                  className="flex-1"
                >
                  {amount}
                </Button>
              ))}
            </div>
          </div>

          {/* Projected Returns */}
          <div className="p-4 bg-gray-800/50 rounded-lg space-y-3">
            <h4 className="font-bold text-gray-300">Projected Returns</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Daily</p>
                <p className="font-bold text-green-400">
                  {((parseFloat(stakeAmount) * estimatedAPY / 100) / 365).toFixed(4)} ETH
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Monthly</p>
                <p className="font-bold text-green-400">
                  {((parseFloat(stakeAmount) * estimatedAPY / 100) / 12).toFixed(4)} ETH
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Yearly</p>
                <p className="font-bold text-green-400">
                  {(parseFloat(stakeAmount) * estimatedAPY / 100).toFixed(4)} ETH
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-400">Your Share</p>
                <p className="font-bold text-yellow-400">
                  {totalStaked > 0 
                    ? ((parseFloat(stakeAmount) / (totalStaked + parseFloat(stakeAmount))) * 100).toFixed(2)
                    : '100'
                  }%
                </p>
              </div>
            </div>
          </div>

          {/* Revenue Distribution Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Next Distribution</span>
              <span className="text-yellow-400">23:45:12</span>
            </div>
            <AnimatedProgress value={65} />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0.15 ETH collected</span>
              <span>0.23 ETH target</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Chart */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="w-6 h-6 text-yellow-400" />
            <span className="font-playfair">Revenue Distribution</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={chartData} options={chartOptions} />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Distributed</p>
              <p className="font-bold text-green-400">1.24 ETH</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">Avg Daily</p>
              <p className="font-bold text-yellow-400">0.21 ETH</p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-400">Total Stakers</p>
              <p className="font-bold text-yellow-400">147</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card className="luxury-card">
        <CardHeader>
          <CardTitle className="font-playfair">How Revenue Sharing Works</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 font-bold">1</span>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400">House Takes Bets</h4>
                <p className="text-sm text-gray-400">
                  Players bet on provably fair games. The house edge ensures long-term profitability.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 font-bold">2</span>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400">Revenue Accumulates</h4>
                <p className="text-sm text-gray-400">
                  30% of house profits automatically flow to the revenue sharing pool.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 font-bold">3</span>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400">Daily Distribution</h4>
                <p className="text-sm text-gray-400">
                  Rewards are calculated and distributed to stakers proportionally every 24 hours.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-yellow-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-yellow-400 font-bold">4</span>
              </div>
              <div>
                <h4 className="font-bold text-yellow-400">Compound or Claim</h4>
                <p className="text-sm text-gray-400">
                  Choose to compound your rewards for higher returns or claim them to your wallet.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/20 to-transparent rounded-lg border border-green-600/20">
            <div className="flex items-center gap-2 mb-2">
              <EnhancedTooltip content="Verified by smart contract">
                <Badge className="bg-green-900/50 text-green-400 border-green-600">
                  <Lock className="w-3 h-3 mr-1" />
                  Immutable Contract
                </Badge>
              </EnhancedTooltip>
            </div>
            <p className="text-sm text-gray-300">
              All revenue sharing is handled by immutable smart contracts. No one can change the 
              30% distribution rate or prevent you from claiming your rewards.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}