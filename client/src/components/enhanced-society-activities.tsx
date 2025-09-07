import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Coins, Users, Award, Zap, Crown, Shield, 
  Trophy, DollarSign, BarChart3, Activity, Briefcase,
  Vote, MessageSquare, Gift, Star, Target, Gem, 
  Calendar, Clock, ArrowUp, ArrowDown, Eye, Hash,
  Percent, Timer, Database, CreditCard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface Activity {
  id: string;
  type: 'bet' | 'stake' | 'win' | 'join' | 'vote' | 'proposal' | 'treasury' | 'achievement' | 'tournament' | 'referral' | 'milestone' | 'governance';
  category: 'gaming' | 'finance' | 'social' | 'governance';
  user: string;
  amount?: string;
  title?: string;
  description?: string;
  game?: string;
  timestamp: Date;
  impact?: 'high' | 'medium' | 'low';
  status?: 'success' | 'pending' | 'failed';
}

// Enhanced mock data with more variety
const mockActivities: Omit<Activity, 'id' | 'timestamp'>[] = [
  { type: 'win', category: 'gaming', user: '0x7a...3f2d', amount: '2.5 ETH', game: 'Gentlemen Dice', impact: 'high', status: 'success' },
  { type: 'stake', category: 'finance', user: '0x9b...8e1c', amount: '1000 GTLM', description: 'Locked for 90 days', impact: 'medium', status: 'success' },
  { type: 'proposal', category: 'governance', user: '0xd4...7e3f', title: 'Increase Staking Rewards', description: 'Proposal to increase APY to 15%', impact: 'high', status: 'pending' },
  { type: 'treasury', category: 'finance', user: 'DAO Treasury', amount: '+$50,000', description: 'Monthly revenue distribution', impact: 'high', status: 'success' },
  { type: 'achievement', category: 'social', user: '0x1d...6b3e', title: 'Diamond Hands', description: 'Held GTLM for 365 days', impact: 'medium', status: 'success' },
  { type: 'tournament', category: 'gaming', user: '0x8f...4c2d', title: 'Weekly Dice Championship', amount: '10 ETH Prize Pool', impact: 'high', status: 'pending' },
  { type: 'referral', category: 'social', user: '0x3e...9a1b', description: 'Invited 5 new members', amount: '100 GTLM reward', impact: 'low', status: 'success' },
  { type: 'milestone', category: 'social', user: 'GentlemenClub', title: '10,000 Members!', description: 'Community milestone reached', impact: 'high', status: 'success' },
  { type: 'governance', category: 'governance', user: '0x6a...7f4e', title: 'Quorum Reached', description: 'Proposal #42 ready for execution', impact: 'high', status: 'pending' },
  { type: 'bet', category: 'gaming', user: '0x2b...3c8d', amount: '1.0 ETH', game: 'Lightning Roulette', impact: 'low', status: 'pending' },
  { type: 'join', category: 'social', user: '0x4c...2a9f', description: 'Elite tier member joined', impact: 'medium', status: 'success' },
  { type: 'vote', category: 'governance', user: '0x5d...8b2c', description: 'Voted on Treasury Allocation', impact: 'medium', status: 'success' },
];

// Activity statistics with performance metrics
const activityStats = {
  gaming: { count: 1247, change: 12.5, total: '$2.8M', label: 'Volume' },
  finance: { count: 892, change: 8.3, total: '$12.8M', label: 'Treasury' },
  social: { count: 3421, change: 15.7, total: '2,847', label: 'Members' },
  governance: { count: 156, change: -3.2, total: '94.2%', label: 'Participation' }
};

// Key performance metrics
const performanceMetrics = [
  { 
    id: 'platform-revenue',
    title: 'Platform Revenue',
    value: '$847K',
    change: 18.3,
    period: 'This month',
    icon: <CreditCard className="w-4 h-4" />,
    color: 'text-emerald-400',
    progress: 72
  },
  { 
    id: 'staking-apr',
    title: 'Staking APR',
    value: '24.5%',
    change: 2.1,
    period: 'Current rate',
    icon: <Percent className="w-4 h-4" />,
    color: 'text-purple-400',
    progress: 85
  },
  { 
    id: 'user-retention',
    title: 'User Retention',
    value: '89.7%',
    change: 3.4,
    period: '30-day average',
    icon: <Users className="w-4 h-4" />,
    color: 'text-blue-400',
    progress: 90
  },
  { 
    id: 'system-uptime',
    title: 'System Uptime',
    value: '99.98%',
    change: 0.02,
    period: 'Last 90 days',
    icon: <Timer className="w-4 h-4" />,
    color: 'text-green-400',
    progress: 100
  }
];

export function EnhancedSocietyActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'gaming' | 'finance' | 'social' | 'governance'>('all');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // Initialize with diverse activities
    const initialActivities = mockActivities.map((activity, index) => ({
      ...activity,
      id: `initial-${index}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000), // Random time within last hour
    })).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    
    setActivities(initialActivities);

    // Add new activities periodically if live mode is on
    if (isLive) {
      const interval = setInterval(() => {
        const randomActivity = mockActivities[Math.floor(Math.random() * mockActivities.length)];
        const newActivity: Activity = {
          ...randomActivity,
          id: `activity-${Date.now()}`,
          timestamp: new Date(),
        };
        
        setActivities(prev => [newActivity, ...prev].slice(0, 20));
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLive]);

  const getIcon = (type: Activity['type']) => {
    const iconMap = {
      win: <Trophy className="w-5 h-5" />,
      stake: <Coins className="w-5 h-5" />,
      bet: <TrendingUp className="w-5 h-5" />,
      join: <Users className="w-5 h-5" />,
      vote: <Vote className="w-5 h-5" />,
      proposal: <MessageSquare className="w-5 h-5" />,
      treasury: <DollarSign className="w-5 h-5" />,
      achievement: <Award className="w-5 h-5" />,
      tournament: <Target className="w-5 h-5" />,
      referral: <Gift className="w-5 h-5" />,
      milestone: <Star className="w-5 h-5" />,
      governance: <Shield className="w-5 h-5" />
    };
    return iconMap[type] || <Activity className="w-5 h-5" />;
  };

  const getCategoryColor = (category: Activity['category']) => {
    const colors = {
      gaming: 'from-purple-500 to-indigo-600',
      finance: 'from-green-500 to-emerald-600',
      social: 'from-yellow-500 to-orange-600',
      governance: 'from-blue-500 to-cyan-600'
    };
    return colors[category];
  };

  const getCategoryBadgeColor = (category: Activity['category']) => {
    const colors = {
      gaming: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      finance: 'bg-green-500/20 text-green-300 border-green-500/30',
      social: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      governance: 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    };
    return colors[category];
  };

  const getTimeAgo = (timestamp: Date) => {
    const seconds = Math.floor((Date.now() - timestamp.getTime()) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(a => a.category === selectedCategory);

  return (
    <div className="enhanced-society-activities w-full">
      {/* Performance Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {performanceMetrics.map((metric) => (
          <Card key={metric.id} className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`${metric.color}`}>
                  {metric.icon}
                </div>
                <Badge 
                  variant="outline" 
                  className={metric.change >= 0 ? "text-green-400 border-green-400/30 text-xs" : "text-red-400 border-red-400/30 text-xs"}
                >
                  {metric.change >= 0 ? '+' : ''}{metric.change}%
                </Badge>
              </div>
              <div className="space-y-1">
                <h4 className="text-xs text-gray-400">{metric.title}</h4>
                <p className="text-xl font-bold text-white">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.period}</p>
                <Progress value={metric.progress} className="h-1 mt-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Activity Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(activityStats).map(([category, stats]) => (
          <Card key={category} className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-400 capitalize">{category}</span>
                <Badge variant="outline" className={stats.change >= 0 ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}>
                  {stats.change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {Math.abs(stats.change)}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <p className="text-xs text-gray-400 font-semibold mb-1">{stats.label}</p>
              <p className="text-xs text-gray-500">{stats.count.toLocaleString()} activities today</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Activities Section */}
      <Card className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl font-bold text-white">Live Society Feed</CardTitle>
              <div className="flex items-center gap-2">
                {isLive && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">LIVE</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Category Filters */}
            <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
              <TabsList className="bg-gray-800/50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="gaming">Gaming</TabsTrigger>
                <TabsTrigger value="finance">Finance</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
                <TabsTrigger value="governance">Governance</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto custom-scrollbar">
            <AnimatePresence mode="popLayout">
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-gradient-to-br from-gray-700/30 to-gray-800/30 border-gray-700/50">
                    <CardContent className="p-4">
                      {/* Header with icon and category */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${getCategoryColor(activity.category)}`}>
                            {getIcon(activity.type)}
                          </div>
                          <div>
                            <Badge className={getCategoryBadgeColor(activity.category)} variant="outline">
                              {activity.category}
                            </Badge>
                            {activity.impact === 'high' && (
                              <Badge className="ml-1 bg-red-500/20 text-red-300 border-red-500/30" variant="outline">
                                HOT
                              </Badge>
                            )}
                          </div>
                        </div>
                        <span className="text-xs text-gray-500">
                          <Clock className="w-3 h-3 inline mr-1" />
                          {getTimeAgo(activity.timestamp)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="space-y-2">
                        {activity.title && (
                          <h4 className="font-semibold text-white text-sm">{activity.title}</h4>
                        )}
                        
                        <p className="text-gray-300 text-sm">
                          {activity.type === 'win' && `${activity.user} won ${activity.amount} in ${activity.game}`}
                          {activity.type === 'stake' && `${activity.user} staked ${activity.amount}`}
                          {activity.type === 'bet' && `${activity.user} bet ${activity.amount} on ${activity.game}`}
                          {activity.type === 'join' && `${activity.user} joined the Club`}
                          {activity.type === 'vote' && `${activity.user} voted`}
                          {activity.type === 'proposal' && `${activity.user} created a proposal`}
                          {activity.type === 'treasury' && `Treasury update: ${activity.amount}`}
                          {activity.type === 'achievement' && `${activity.user} earned an achievement`}
                          {activity.type === 'tournament' && `Tournament announced`}
                          {activity.type === 'referral' && `${activity.user} earned referral bonus`}
                          {activity.type === 'milestone' && `Community milestone!`}
                          {activity.type === 'governance' && `Governance update`}
                        </p>

                        {activity.description && (
                          <p className="text-xs text-gray-400">{activity.description}</p>
                        )}

                        {/* Amount or special badges */}
                        {activity.amount && activity.type !== 'win' && activity.type !== 'bet' && (
                          <div className="flex items-center gap-2 mt-2">
                            <Gem className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm font-semibold text-yellow-400">{activity.amount}</span>
                          </div>
                        )}

                        {/* Status indicator */}
                        {activity.status && (
                          <div className="flex justify-end mt-2">
                            <Badge 
                              variant="outline"
                              className={
                                activity.status === 'success' ? 'text-green-400 border-green-400/30' :
                                activity.status === 'pending' ? 'text-yellow-400 border-yellow-400/30' :
                                'text-red-400 border-red-400/30'
                              }
                            >
                              {activity.status}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}