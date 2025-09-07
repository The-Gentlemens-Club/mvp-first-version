import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Zap, Target, Award } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnalyticsData {
  revenue: Array<{ name: string; value: number; change: number }>;
  users: Array<{ name: string; active: number; new: number }>;
  performance: Array<{ metric: string; value: number; target: number; status: 'good' | 'warning' | 'poor' }>;
  distribution: Array<{ name: string; value: number; color: string }>;
}

export function AdvancedAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading realistic analytics data
    const fetchAnalytics = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const analyticsData: AnalyticsData = {
        revenue: [
          { name: 'Mon', value: 2400, change: 5.2 },
          { name: 'Tue', value: 1398, change: -2.1 },
          { name: 'Wed', value: 9800, change: 12.5 },
          { name: 'Thu', value: 3908, change: 8.1 },
          { name: 'Fri', value: 4800, change: 3.7 },
          { name: 'Sat', value: 3800, change: -1.2 },
          { name: 'Sun', value: 4300, change: 6.8 }
        ],
        users: [
          { name: 'Week 1', active: 1200, new: 180 },
          { name: 'Week 2', active: 1350, new: 220 },
          { name: 'Week 3', active: 1180, new: 195 },
          { name: 'Week 4', active: 1420, new: 275 }
        ],
        performance: [
          { metric: 'Load Time', value: 1.2, target: 2.0, status: 'good' },
          { metric: 'Uptime', value: 99.9, target: 99.5, status: 'good' },
          { metric: 'Error Rate', value: 0.1, target: 1.0, status: 'good' },
          { metric: 'Response Time', value: 150, target: 200, status: 'good' }
        ],
        distribution: [
          { name: 'Gaming', value: 45, color: '#10B981' },
          { name: 'Staking', value: 30, color: '#F59E0B' },
          { name: 'Governance', value: 15, color: '#3B82F6' },
          { name: 'NFTs', value: 10, color: '#8B5CF6' }
        ]
      };
      
      setData(analyticsData);
      setIsLoading(false);
    };

    fetchAnalytics();
  }, [selectedPeriod]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i} className="luxury-card animate-pulse">
            <CardContent className="p-6">
              <div className="h-48 bg-gray-700/30 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data) return null;

  const formatCurrency = (value: number) => `$${value.toLocaleString()}`;
  const formatPercent = (value: number) => `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['24h', '7d', '30d', '90d'].map(period => (
          <button
            key={period}
            onClick={() => setSelectedPeriod(period)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedPeriod === period
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {period}
          </button>
        ))}
      </div>

      {/* Revenue Analytics */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                <p className="text-gray-400 text-sm">Weekly performance tracking</p>
              </div>
            </div>
            <Badge className="bg-emerald-500/20 text-emerald-400">
              +12.3% vs last period
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.revenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  formatter={(value: number, name) => [formatCurrency(value), name]}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  fillOpacity={1} 
                  fill="url(#revenueGradient)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* User Analytics */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">User Growth</h3>
              <p className="text-gray-400 text-sm">Active and new user trends</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.users}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Line type="monotone" dataKey="active" stroke="#3B82F6" strokeWidth={2} name="Active Users" />
                <Line type="monotone" dataKey="new" stroke="#10B981" strokeWidth={2} name="New Users" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="luxury-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Performance</h3>
                <p className="text-gray-400 text-sm">System health metrics</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.performance.map((metric, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      metric.status === 'good' ? 'bg-emerald-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-gray-300">{metric.metric}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      {metric.metric.includes('Time') ? `${metric.value}ms` : 
                       metric.metric.includes('Uptime') ? `${metric.value}%` :
                       metric.metric.includes('Rate') ? `${metric.value}%` : metric.value}
                    </div>
                    <div className="text-xs text-gray-500">
                      Target: {metric.metric.includes('Time') ? `${metric.target}ms` : 
                              metric.metric.includes('Uptime') ? `${metric.target}%` :
                              metric.metric.includes('Rate') ? `${metric.target}%` : metric.target}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Distribution */}
        <Card className="luxury-card">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Activity Distribution</h3>
                <p className="text-gray-400 text-sm">Platform usage breakdown</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.distribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F3F4F6'
                    }}
                    formatter={(value: number) => [`${value}%`, 'Usage']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {data.distribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}