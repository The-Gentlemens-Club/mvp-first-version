import { Trophy, Target, TrendingUp, Star, Award, Clock, Gamepad2, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: any;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
}

export default function PlayerAchievements() {
  const achievements: Achievement[] = [
    {
      id: 'first_bet',
      name: 'First Steps',
      description: 'Placed your first bet on the platform',
      icon: Target,
      earned: true,
      rarity: 'common',
      points: 10
    },
    {
      id: 'high_roller',
      name: 'High Roller',
      description: 'Wagered over 10,000 GTLM tokens',
      icon: TrendingUp,
      earned: true,
      progress: 12450,
      maxProgress: 10000,
      rarity: 'rare',
      points: 50
    },
    {
      id: 'lucky_streak',
      name: 'Lucky Streak',
      description: 'Won 5 consecutive bets',
      icon: Star,
      earned: true,
      rarity: 'epic',
      points: 75
    },
    {
      id: 'dao_member',
      name: 'DAO Participant',
      description: 'Voted on a governance proposal',
      icon: Award,
      earned: true,
      rarity: 'rare',
      points: 40
    },
    {
      id: 'whale_staker',
      name: 'Whale Staker',
      description: 'Stake over 1,000 GTLM tokens',
      icon: Trophy,
      earned: false,
      progress: 750,
      maxProgress: 1000,
      rarity: 'epic',
      points: 100
    },
    {
      id: 'diamond_hands',
      name: 'Diamond Hands',
      description: 'Hold stake for 6+ months',
      icon: Clock,
      earned: false,
      progress: 127,
      maxProgress: 180,
      rarity: 'legendary',
      points: 200
    },
    {
      id: 'game_master',
      name: 'Game Master',
      description: 'Try all available games',
      icon: Gamepad2,
      earned: false,
      progress: 1,
      maxProgress: 5,
      rarity: 'epic',
      points: 125
    },
    {
      id: 'community_leader',
      name: 'Community Leader',
      description: 'Create 5+ DAO proposals',
      icon: Activity,
      earned: false,
      progress: 2,
      maxProgress: 5,
      rarity: 'legendary',
      points: 250
    }
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return 'border-yellow-500';
      case 'epic': return 'border-purple-500';
      case 'rare': return 'border-blue-500';
      default: return 'border-gray-500';
    }
  };

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const earnedCount = achievements.filter(a => a.earned).length;

  return (
    <div className="space-y-6">
      {/* Achievement Summary */}
      <div className="luxury-card border border-yellow-600/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-100 heading-playfair">Achievement Progress</h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--gentlemen-gold)]">{earnedCount}</div>
              <div className="text-xs text-gray-300">Unlocked</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--gentlemen-gold)]">{totalPoints}</div>
              <div className="text-xs text-gray-300">Points</div>
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(earnedCount / achievements.length) * 100}%` }}
          />
        </div>
        <div className="text-sm text-gray-300 mt-2">
          {earnedCount} of {achievements.length} achievements unlocked
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement) => {
          const IconComponent = achievement.icon;
          return (
            <div 
              key={achievement.id}
              className={`luxury-card p-4 transition-all duration-300 ${
                achievement.earned 
                  ? `${getRarityBorder(achievement.rarity)} border-2` 
                  : 'border-yellow-600/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  achievement.earned 
                    ? `bg-gradient-to-br ${getRarityColor(achievement.rarity)}` 
                    : 'bg-gray-600'
                }`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className={`font-semibold ${
                      achievement.earned ? 'text-gray-100' : 'text-gray-300'
                    }`}>
                      {achievement.name}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={`text-xs ${
                        achievement.earned
                          ? `bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-black`
                          : 'bg-gray-600 text-gray-300'
                      }`}>
                        {achievement.rarity}
                      </Badge>
                      {achievement.earned && (
                        <Trophy className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">
                    {achievement.description}
                  </p>
                  
                  {achievement.progress !== undefined && achievement.maxProgress && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400">
                          {achievement.progress} / {achievement.maxProgress}
                        </span>
                        <span className="text-[var(--gentlemen-gold)]">
                          {achievement.points} pts
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-1">
                        <div 
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1 rounded-full transition-all duration-500"
                          style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {achievement.earned && (
                    <div className="text-xs text-[var(--gentlemen-gold)] mt-1">
                      +{achievement.points} points earned
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}