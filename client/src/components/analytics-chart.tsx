import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const volumeData = [
  { name: 'Mon', volume: 2400, profit: 240 },
  { name: 'Tue', volume: 1398, profit: 140 },
  { name: 'Wed', volume: 9800, profit: 980 },
  { name: 'Thu', volume: 3908, profit: 390 },
  { name: 'Fri', volume: 4800, profit: 480 },
  { name: 'Sat', volume: 3800, profit: 380 },
  { name: 'Sun', volume: 4300, profit: 430 },
];

const revenueData = [
  { name: 'Jan', revenue: 65000 },
  { name: 'Feb', revenue: 59000 },
  { name: 'Mar', revenue: 80000 },
  { name: 'Apr', revenue: 81000 },
  { name: 'May', revenue: 56000 },
  { name: 'Jun', revenue: 95000 },
];

const distributionData = [
  { name: 'House Edge', value: 40, color: '#3B82F6' },
  { name: 'Staking Rewards', value: 30, color: '#10B981' },
  { name: 'DAO Treasury', value: 20, color: '#F59E0B' },
  { name: 'Operations', value: 10, color: '#EF4444' },
];

export default function AnalyticsChart() {
  const [activeChart, setActiveChart] = useState<'volume' | 'revenue' | 'distribution'>('volume');

  const renderChart = () => {
    switch (activeChart) {
      case 'volume':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={volumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Bar dataKey="volume" fill="#3B82F6" />
              <Bar dataKey="profit" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'revenue':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: '#F3F4F6' }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (activeChart) {
      case 'volume':
        return 'Weekly Volume & Profit';
      case 'revenue':
        return 'Monthly Revenue Trend';
      case 'distribution':
        return 'Revenue Distribution';
      default:
        return '';
    }
  };

  return (
    <div className="gentlemen-primary rounded-xl border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">
          <TrendingUp className="inline-block mr-3" />
          Platform Analytics
        </h2>
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant={activeChart === 'volume' ? 'default' : 'outline'}
            onClick={() => setActiveChart('volume')}
            className={activeChart === 'volume' ? 'gentlemen-gradient text-gray-900' : 'border-gray-600 text-gray-400'}
          >
            <BarChart3 className="w-4 h-4 mr-1" />
            Volume
          </Button>
          <Button
            size="sm"
            variant={activeChart === 'revenue' ? 'default' : 'outline'}
            onClick={() => setActiveChart('revenue')}
            className={activeChart === 'revenue' ? 'gentlemen-gradient text-gray-900' : 'border-gray-600 text-gray-400'}
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            Revenue
          </Button>
          <Button
            size="sm"
            variant={activeChart === 'distribution' ? 'default' : 'outline'}
            onClick={() => setActiveChart('distribution')}
            className={activeChart === 'distribution' ? 'gentlemen-gradient text-gray-900' : 'border-gray-600 text-gray-400'}
          >
            <PieChartIcon className="w-4 h-4 mr-1" />
            Distribution
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold gentlemen-gold">{getChartTitle()}</h3>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Legend */}
      {activeChart === 'volume' && (
        <div className="mt-4 flex justify-center space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-gray-400 text-sm">Volume (GTLM)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-400 text-sm">Profit (GTLM)</span>
          </div>
        </div>
      )}
    </div>
  );
}