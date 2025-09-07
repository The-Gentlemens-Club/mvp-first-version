import { TrendingUp, Target, Trophy, Calendar, Coins, Users, Activity, BarChart3, Clock, Zap, Gamepad2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlayerStats() {
  const stats = [
    {
      label: "Total Wagered",
      value: "12,450 GTLM",
      change: "+8.2%",
      icon: Target,
      trend: "up",
      description: "All-time betting volume"
    },
    {
      label: "Total Won",
      value: "6,890 GTLM",
      change: "+12.5%",
      icon: Trophy,
      trend: "up",
      description: "Total winnings earned"
    },
    {
      label: "Win Rate",
      value: "55.4%",
      change: "+2.1%",
      icon: TrendingUp,
      trend: "up",
      description: "Success rate across all games"
    },
    {
      label: "Member Since",
      value: "Dec 2023",
      change: "127 days",
      icon: Calendar,
      trend: "neutral",
      description: "Platform membership duration"
    },
    {
      label: "DAO Participation",
      value: "12 Votes",
      change: "+3 this month",
      icon: Users,
      trend: "up",
      description: "Governance engagement"
    },
    {
      label: "Staking Rewards",
      value: "284.5 GTLM",
      change: "+15.8%",
      icon: Coins,
      trend: "up",
      description: "Total rewards earned"
    }
  ];

  const gameStats = [
    { game: "Gentlemen Dice", bets: 156, winRate: 58.3, profit: "+245 GTLM" },
    { game: "Coming Soon - Blackjack", bets: 0, winRate: 0, profit: "0 GTLM" },
    { game: "Coming Soon - Roulette", bets: 0, winRate: 0, profit: "0 GTLM" },
    { game: "Coming Soon - Slots", bets: 0, winRate: 0, profit: "0 GTLM" }
  ];

  const weeklyActivity = [
    { day: 'Mon', bets: 12, volume: 450 },
    { day: 'Tue', bets: 8, volume: 320 },
    { day: 'Wed', bets: 15, volume: 680 },
    { day: 'Thu', bets: 22, volume: 890 },
    { day: 'Fri', bets: 18, volume: 750 },
    { day: 'Sat', bets: 25, volume: 1200 },
    { day: 'Sun', bets: 20, volume: 980 }
  ];

  const maxVolume = Math.max(...weeklyActivity.map(d => d.volume));

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="luxury-card border border-yellow-600/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-600/40 rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[var(--gentlemen-gold)]" />
                  </div>
                  <Badge className={`text-xs ${
                    stat.trend === 'up' ? 'bg-green-900 text-green-400' :
                    stat.trend === 'down' ? 'bg-red-900 text-red-400' :
                    'bg-gray-700 text-gray-300'
                  }`}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-100">{stat.value}</h4>
                  <p className="text-sm text-gray-300">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Game Performance */}
      <Card className="luxury-card border border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-white heading-playfair flex items-center">
            <Gamepad2 className="mr-2" />
            Game Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {gameStats.map((game, index) => (
              <div key={index} className="p-4 luxury-card-elevated border border-yellow-600/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-100">{game.game}</h4>
                  <Badge className={game.bets > 0 ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-400'}>
                    {game.bets > 0 ? 'Active' : 'Coming Soon'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-300">Total Bets</p>
                    <p className="font-bold text-gray-100">{game.bets}</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Win Rate</p>
                    <p className="font-bold text-gray-100">{game.winRate}%</p>
                  </div>
                  <div>
                    <p className="text-gray-300">Net Profit</p>
                    <p className={`font-bold ${
                      game.profit.startsWith('+') ? 'text-green-400' : 
                      game.profit.startsWith('-') ? 'text-red-400' : 'text-gray-400'
                    }`}>
                      {game.profit}
                    </p>
                  </div>
                </div>
                
                {game.bets > 0 && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${game.winRate}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="luxury-card border border-yellow-600/30">
        <CardHeader>
          <CardTitle className="text-white heading-playfair flex items-center">
            <BarChart3 className="mr-2" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyActivity.map((day, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <div 
                    className="bg-gradient-to-t from-[var(--gentlemen-gold)] to-yellow-300 rounded-t mx-auto transition-all duration-300 hover:opacity-80"
                    style={{ 
                      height: `${(day.volume / maxVolume) * 60 + 20}px`,
                      width: '100%',
                      minHeight: '20px'
                    }}
                  />
                </div>
                <p className="text-xs text-gray-300 mb-1">{day.day}</p>
                <p className="text-xs font-bold text-gray-100">{day.bets}</p>
                <p className="text-xs text-gray-400">{day.volume}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4 text-sm text-gray-400">
            Daily betting activity (bets count / volume GTLM)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}