import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { 
  Activity, 
  Users, 
  DollarSign, 
  TrendingUp,
  Dice1,
  Crown,
  Zap,
  ArrowUp,
  ArrowDown,
  Clock
} from "lucide-react";

// Simulated live user activity for demo
const generateLiveActivity = () => {
  const activities = [
    "placed a $250 bet on Evolution Roulette",
    "won $1,200 on Crazy Time", 
    "staked 5,000 $GTLM tokens",
    "minted Diamond Elite NFT",
    "voted on DAO Proposal #7",
    "won $800 on Lightning Dice",
    "joined VIP tournament",
    "claimed staking rewards",
    "placed $500 bet on Blackjack",
    "won $2,500 on Mega Ball"
  ];

  const usernames = [
    "CryptoWhale47", "GamblerPro", "DiamondHands", "LuckyStrike", 
    "VegasVet", "TokenMaster", "BigBettor", "RoulettePro", "DiceKing", "SlotMaster"
  ];

  return {
    id: Math.random().toString(36).substr(2, 9),
    user: usernames[Math.floor(Math.random() * usernames.length)],
    action: activities[Math.floor(Math.random() * activities.length)],
    timestamp: new Date().toLocaleTimeString(),
    amount: Math.floor(Math.random() * 2000) + 100
  };
};

export default function LiveDemoSimulation() {
  const [liveActivities, setLiveActivities] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeUsers: 1247,
    dailyVolume: 425000,
    totalBets: 8934,
    totalWinnings: 387500
  });

  useEffect(() => {
    // Add initial activities
    const initialActivities = Array.from({ length: 5 }, generateLiveActivity);
    setLiveActivities(initialActivities);

    // Simulate live activity every 3 seconds
    const activityInterval = setInterval(() => {
      const newActivity = generateLiveActivity();
      setLiveActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 3000);

    // Update stats every 5 seconds
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10) - 5,
        dailyVolume: prev.dailyVolume + Math.floor(Math.random() * 5000),
        totalBets: prev.totalBets + Math.floor(Math.random() * 20),
        totalWinnings: prev.totalWinnings + Math.floor(Math.random() * 2000)
      }));
    }, 5000);

    return () => {
      clearInterval(activityInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="space-y-8">
      {/* Live Platform Status Header */}
      <div className="text-center p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-xl border border-green-500">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <Badge className="bg-green-600 text-white text-lg px-4 py-2">
            LIVE DEMO - POST-LICENSE SIMULATION
          </Badge>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2 heading-playfair">
          Platform in <span className="gentlemen-gold">Full Operation</span>
        </h2>
        <p className="text-gray-300 body-lora">
          Demonstrating live user activity, real-time betting, and active DAO governance
        </p>
      </div>

      {/* Real-time Stats Dashboard */}
      <div className="grid lg:grid-cols-4 gap-6">
        <Card className="gentlemen-card border border-blue-500">
          <CardContent className="p-6 text-center">
            <Users className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white heading-playfair">
                {stats.activeUsers.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 body-lora">Active Users</p>
              <div className="flex items-center justify-center space-x-1 text-green-400">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs">+12% today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gentlemen-card border border-green-500">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white heading-playfair">
                {formatCurrency(stats.dailyVolume)}
              </p>
              <p className="text-sm text-gray-400 body-lora">Daily Volume</p>
              <div className="flex items-center justify-center space-x-1 text-green-400">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs">+8.5% today</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gentlemen-card border border-purple-500">
          <CardContent className="p-6 text-center">
            <Dice1 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white heading-playfair">
                {stats.totalBets.toLocaleString()}
              </p>
              <p className="text-sm text-gray-400 body-lora">Bets Today</p>
              <div className="flex items-center justify-center space-x-1 text-green-400">
                <ArrowUp className="w-3 h-3" />
                <span className="text-xs">+24 bets/min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="gentlemen-card border border-yellow-500">
          <CardContent className="p-6 text-center">
            <Crown className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <div className="space-y-2">
              <p className="text-3xl font-bold text-white heading-playfair">
                {formatCurrency(stats.totalWinnings)}
              </p>
              <p className="text-sm text-gray-400 body-lora">Paid Winnings</p>
              <div className="flex items-center justify-center space-x-1 text-yellow-400">
                <TrendingUp className="w-3 h-3" />
                <span className="text-xs">95% RTP</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Activity Feed */}
      <Card className="gentlemen-card">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair">
            <Activity className="text-[var(--gentlemen-gold)] mr-3 w-6 h-6" />
            Live User Activity Feed
            <div className="ml-auto flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 body-lora">Live Updates</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {liveActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300 animate-in slide-in-from-right"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-white font-semibold body-lora">
                      {activity.user}
                    </p>
                    <p className="text-gray-400 text-sm body-lora">
                      {activity.action}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[var(--gentlemen-gold)] font-semibold">
                    ${activity.amount.toLocaleString()}
                  </p>
                  <p className="text-gray-500 text-xs body-lora flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Provider Integration Status */}
      <Card className="gentlemen-card">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair">
            <Zap className="text-[var(--gentlemen-gold)] mr-3 w-6 h-6" />
            Game Provider Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-green-900/20 rounded-lg p-6 border border-green-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white heading-playfair">Evolution Gaming</h3>
                <Badge className="bg-green-600 text-white">LIVE</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Live Tables</span>
                  <span className="text-white">47 Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Daily Revenue</span>
                  <span className="text-green-400 font-semibold">$89,500</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                <p className="text-xs text-gray-500 body-lora">87% capacity utilization</p>
              </div>
            </div>

            <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white heading-playfair">NetEnt Slots</h3>
                <Badge className="bg-blue-600 text-white">LIVE</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Game Titles</span>
                  <span className="text-white">200+ Slots</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Daily Revenue</span>
                  <span className="text-yellow-400 font-semibold">$67,200</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full" style={{ width: '73%' }} />
                </div>
                <p className="text-xs text-gray-500 body-lora">73% of games active</p>
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-lg p-6 border border-purple-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white heading-playfair">Pragmatic Play</h3>
                <Badge className="bg-purple-600 text-white">LIVE</Badge>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Live Games</span>
                  <span className="text-white">85 Tables</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Daily Revenue</span>
                  <span className="text-purple-400 font-semibold">$54,800</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full" style={{ width: '91%' }} />
                </div>
                <p className="text-xs text-gray-500 body-lora">91% uptime today</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Distribution Live */}
      <Card className="gentlemen-card">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair">
            <TrendingUp className="text-[var(--gentlemen-gold)] mr-3 w-6 h-6" />
            Live Revenue Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 heading-playfair">House Revenue</h4>
              <p className="text-2xl font-bold gentlemen-gold">${(stats.dailyVolume * 0.035).toLocaleString()}</p>
              <p className="text-sm text-gray-400 body-lora">3.5% house edge</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 heading-playfair">Staker Rewards</h4>
              <p className="text-2xl font-bold text-yellow-400">${(stats.dailyVolume * 0.035 * 0.3).toLocaleString()}</p>
              <p className="text-sm text-gray-400 body-lora">30% to stakers</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 heading-playfair">DAO Treasury</h4>
              <p className="text-2xl font-bold text-green-400">${(stats.dailyVolume * 0.035 * 0.5).toLocaleString()}</p>
              <p className="text-sm text-gray-400 body-lora">50% to treasury</p>
            </div>
            
            <div className="text-center p-4 bg-gray-800/30 rounded-lg">
              <h4 className="text-white font-semibold mb-2 heading-playfair">Operations</h4>
              <p className="text-2xl font-bold text-purple-400">${(stats.dailyVolume * 0.035 * 0.2).toLocaleString()}</p>
              <p className="text-sm text-gray-400 body-lora">20% operations</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action for Investors */}
      <Card className="gentlemen-card border-2 border-yellow-500">
        <CardContent className="p-8 text-center">
          <Crown className="w-16 h-16 text-[var(--gentlemen-gold)] mx-auto mb-6 animate-pulse" />
          <h3 className="text-2xl font-bold text-white mb-4 heading-playfair">
            This is Your Platform's Future
          </h3>
          <p className="text-gray-300 body-lora max-w-2xl mx-auto mb-6">
            Experience the full potential of The Gentlemen's Club - a thriving ecosystem generating 
            consistent revenue through licensed gaming operations, community governance, and innovative tokenomics.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="btn-luxury text-lg px-8 py-3">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Full Business Plan
            </Button>
            <Button variant="outline" className="border-yellow-500 text-yellow-300 hover:bg-yellow-500 hover:text-black text-lg px-8 py-3">
              <Users className="w-5 h-5 mr-2" />
              Join Investment Round
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}