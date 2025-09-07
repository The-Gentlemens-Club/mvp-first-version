import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Users, DollarSign, Activity, Target, Award,
  ArrowUp, ArrowDown, BarChart3, Clock, Calendar, 
  Zap, Trophy, Shield, Coins, Eye, Hash
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MetricData {
  id: string;
  title: string;
  value: string | number;
  change: number;
  trend: number[];
  unit?: string;
  subtitle?: string;
  target?: number;
  category: 'platform' | 'treasury' | 'gaming' | 'community';
  icon: JSX.Element;
  color: string;
  bgGradient: string;
}

// Enhanced metrics data
const metricsData: MetricData[] = [
  {
    id: 'total-volume',
    title: 'Total Volume',
    value: '$2.4M',
    change: 12.5,
    trend: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4],
    subtitle: 'Last 7 days',
    category: 'platform',
    icon: <TrendingUp className="w-5 h-5" />,
    color: '#10b981',
    bgGradient: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'active-members',
    title: 'Distinguished Members',
    value: 2847,
    change: 8.2,
    trend: [2500, 2600, 2650, 2700, 2750, 2800, 2847],
    subtitle: 'Active this month',
    target: 3000,
    category: 'community',
    icon: <Users className="w-5 h-5" />,
    color: '#f59e0b',
    bgGradient: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'treasury-value',
    title: 'Treasury Value',
    value: '$12.8M',
    change: 15.3,
    trend: [10.5, 11.0, 11.5, 11.8, 12.2, 12.5, 12.8],
    subtitle: 'Total holdings',
    category: 'treasury',
    icon: <DollarSign className="w-5 h-5" />,
    color: '#3b82f6',
    bgGradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'success-rate',
    title: 'Platform Success Rate',
    value: '94.2%',
    change: 2.1,
    trend: [91, 92, 92.5, 93, 93.5, 94, 94.2],
    subtitle: 'Operational efficiency',
    target: 95,
    category: 'platform',
    icon: <Target className="w-5 h-5" />,
    color: '#a855f7',
    bgGradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'staking-apr',
    title: 'Staking APR',
    value: '24.5%',
    change: 0.8,
    trend: [23.0, 23.5, 23.8, 24.0, 24.2, 24.3, 24.5],
    subtitle: 'Annual returns',
    category: 'treasury',
    icon: <Award className="w-5 h-5" />,
    color: '#f97316',
    bgGradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'daily-activity',
    title: 'Daily Activities',
    value: '8.9K',
    change: 22.1,
    trend: [6000, 6500, 7000, 7500, 8000, 8500, 8900],
    subtitle: 'Transactions today',
    category: 'gaming',
    icon: <Activity className="w-5 h-5" />,
    color: '#ef4444',
    bgGradient: 'from-rose-500 to-red-600'
  },
  {
    id: 'unique-players',
    title: 'Unique Players',
    value: 1847,
    change: 5.7,
    trend: [1600, 1650, 1700, 1750, 1780, 1820, 1847],
    subtitle: 'Active in 24h',
    category: 'gaming',
    icon: <Zap className="w-5 h-5" />,
    color: '#06b6d4',
    bgGradient: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'governance-participation',
    title: 'Governance Rate',
    value: '67.3%',
    change: 3.4,
    trend: [60, 62, 63, 64, 65, 66, 67.3],
    subtitle: 'Voting participation',
    category: 'community',
    icon: <Shield className="w-5 h-5" />,
    color: '#8b5cf6',
    bgGradient: 'from-violet-500 to-violet-600'
  }
];

// Time ranges for filtering
const timeRanges = [
  { label: '24H', value: '24h' },
  { label: '7D', value: '7d' },
  { label: '30D', value: '30d' },
  { label: 'ALL', value: 'all' }
];

export function EnhancedPerformanceAnalytics() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'platform' | 'treasury' | 'gaming' | 'community'>('all');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [liveUpdate, setLiveUpdate] = useState(true);

  // Simulate real-time updates
  useEffect(() => {
    if (!liveUpdate) return;

    const interval = setInterval(() => {
      // Simulate small changes in metrics
      // In production, this would fetch real data
    }, 10000);

    return () => clearInterval(interval);
  }, [liveUpdate]);

  const filteredMetrics = selectedCategory === 'all' 
    ? metricsData 
    : metricsData.filter(m => m.category === selectedCategory);

  // Chart configuration
  const getSparklineData = (trend: number[]) => ({
    labels: trend.map((_, i) => ''),
    datasets: [{
      data: trend,
      borderColor: 'rgba(212, 175, 55, 0.8)',
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      borderWidth: 2,
      fill: true,
      tension: 0.4,
      pointRadius: 0,
      pointHoverRadius: 4,
    }]
  });

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    },
    scales: {
      x: { display: false },
      y: { display: false }
    }
  };

  // Main chart data
  const mainChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Volume',
        data: [2.1, 2.3, 2.2, 2.5, 2.4, 2.6, 2.8],
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        yAxisID: 'y',
      },
      {
        label: 'Activities',
        data: [6500, 7000, 6800, 7500, 8000, 8500, 8900],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        yAxisID: 'y1',
      }
    ]
  };

  const mainChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#d1d5db',
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#d4af37',
        bodyColor: '#d1d5db',
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: '#9ca3af' }
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { 
          color: '#9ca3af',
          callback: function(value: any) {
            return '$' + value + 'M';
          }
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: { drawOnChartArea: false },
        ticks: { 
          color: '#9ca3af',
          callback: function(value: any) {
            return (value / 1000) + 'K';
          }
        }
      },
    },
  };

  return (
    <div className="enhanced-performance-analytics w-full space-y-6">
      {/* Header with Controls */}
      <Card className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-yellow-400" />
              <CardTitle className="text-2xl font-bold text-white">Performance Analytics</CardTitle>
              {liveUpdate && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">LIVE</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Time Range Selector */}
              <div className="flex gap-1 bg-gray-800/50 rounded-lg p-1">
                {timeRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setSelectedTimeRange(range.value)}
                    className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                      selectedTimeRange === range.value
                        ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
                <TabsList className="bg-gray-800/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="platform">Platform</TabsTrigger>
                  <TabsTrigger value="treasury">Treasury</TabsTrigger>
                  <TabsTrigger value="gaming">Gaming</TabsTrigger>
                  <TabsTrigger value="community">Community</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Chart */}
      <Card className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <CardHeader>
          <CardTitle className="text-lg text-gray-300">Platform Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <Line data={mainChartData} options={mainChartOptions} />
          </div>
        </CardContent>
      </Card>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredMetrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className={`luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50 hover:border-yellow-400/40 transition-all duration-300 cursor-pointer ${
                expandedCard === metric.id ? 'lg:col-span-2' : ''
              }`}
              onClick={() => setExpandedCard(expandedCard === metric.id ? null : metric.id)}
            >
              <CardContent className="p-4">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.bgGradient}`}>
                    {metric.icon}
                  </div>
                  <Badge 
                    variant="outline" 
                    className={metric.change >= 0 ? "text-green-400 border-green-400/30" : "text-red-400 border-red-400/30"}
                  >
                    {metric.change >= 0 ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {Math.abs(metric.change)}%
                  </Badge>
                </div>

                {/* Value */}
                <div className="mb-3">
                  <h3 className="text-3xl font-bold text-white mb-1">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </h3>
                  <p className="text-sm text-gray-400">{metric.title}</p>
                  {metric.subtitle && (
                    <p className="text-xs text-gray-500 mt-1">{metric.subtitle}</p>
                  )}
                </div>

                {/* Progress Bar (if target exists) */}
                {metric.target && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{((parseFloat(metric.value.toString().replace(/[^0-9.-]/g, '')) / metric.target) * 100).toFixed(1)}%</span>
                    </div>
                    <Progress 
                      value={(parseFloat(metric.value.toString().replace(/[^0-9.-]/g, '')) / metric.target) * 100} 
                      className="h-2"
                    />
                  </div>
                )}

                {/* Sparkline */}
                <div className="h-12">
                  <Line data={getSparklineData(metric.trend)} options={sparklineOptions} />
                </div>

                {/* Expanded Content */}
                {expandedCard === metric.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700"
                  >
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-400">Peak Value</p>
                        <p className="text-white font-semibold">{Math.max(...metric.trend).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Average</p>
                        <p className="text-white font-semibold">
                          {(metric.trend.reduce((a, b) => a + b, 0) / metric.trend.length).toFixed(1)}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-400">Volatility</p>
                        <p className="text-white font-semibold">Low</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Trend</p>
                        <p className="text-green-400 font-semibold">Upward</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats Summary */}
      <Card className="luxury-card border-yellow-600/20 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <Eye className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">98.7%</p>
              <p className="text-sm text-gray-400">Uptime</p>
            </div>
            <div className="text-center">
              <Hash className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">142</p>
              <p className="text-sm text-gray-400">Active Proposals</p>
            </div>
            <div className="text-center">
              <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">$847K</p>
              <p className="text-sm text-gray-400">Rewards Distributed</p>
            </div>
            <div className="text-center">
              <Coins className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">4.2M</p>
              <p className="text-sm text-gray-400">GTLM Staked</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}