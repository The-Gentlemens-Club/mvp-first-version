import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Target,
  Zap,
  Crown,
  Globe
} from "lucide-react";

// Mock investor-focused metrics showing platform potential
const investorMetrics = {
  projectedUsers: {
    current: 2847,
    target: 100000,
    growth: "+24.5%"
  },
  monthlyRevenue: {
    current: 125000,
    target: 2500000,
    growth: "+45.2%"
  },
  totalValueLocked: {
    current: 1850000,
    target: 50000000,
    growth: "+67.8%"
  },
  marketShare: {
    current: 0.12,
    target: 5.0,
    sector: "GambleFi"
  }
};

const roadmapMilestones = [
  {
    quarter: "Q1 2026",
    milestone: "Curaçao License & Launch",
    description: "Full regulatory approval and platform launch",
    status: "in-progress",
    impact: "$500K+ monthly revenue"
  },
  {
    quarter: "Q2 2026", 
    milestone: "Evolution Gaming Integration",
    description: "Premium live casino games integration",
    status: "planned",
    impact: "$2M+ monthly revenue"
  },
  {
    quarter: "Q3 2026",
    milestone: "Multi-Jurisdiction Expansion", 
    description: "EU and additional markets",
    status: "planned",
    impact: "$5M+ monthly revenue"
  },
  {
    quarter: "Q4 2026",
    milestone: "Advanced DAO Features",
    description: "Complex governance and profit sharing",
    status: "planned", 
    impact: "$10M+ monthly revenue"
  }
];

export default function InvestorDemoMetrics() {
  const [animatedValues, setAnimatedValues] = useState({
    users: 0,
    revenue: 0,
    tvl: 0,
    marketShare: 0
  });

  useEffect(() => {
    // Animate metrics on load for impressive demo effect
    const timer = setTimeout(() => {
      setAnimatedValues({
        users: investorMetrics.projectedUsers.current,
        revenue: investorMetrics.monthlyRevenue.current,
        tvl: investorMetrics.totalValueLocked.current,
        marketShare: investorMetrics.marketShare.current
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress": return "bg-yellow-600 text-white";
      case "planned": return "bg-blue-600 text-white";
      case "completed": return "bg-green-600 text-white";
      default: return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="space-y-8">
      {/* Platform Potential Overview */}
      <Card className="gentlemen-card border-2 border-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair text-2xl">
            <Target className="text-[var(--gentlemen-gold)] mr-3 w-8 h-8" />
            Platform Potential - Investor Projections
          </CardTitle>
          <p className="text-gray-400 body-lora">
            Demonstrating scalability and revenue potential in the $10B+ GambleFi market
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Projected User Base */}
            <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white heading-playfair">
                  {animatedValues.users.toLocaleString()}
                </p>
                <p className="text-sm text-gray-400 body-lora">Active Users</p>
                <Badge className="bg-blue-600 text-white text-xs">
                  {investorMetrics.projectedUsers.growth} growth
                </Badge>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 body-lora">Target: 100K users</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(animatedValues.users / investorMetrics.projectedUsers.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Revenue */}
            <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500 transition-all duration-300">
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white heading-playfair">
                  {formatCurrency(animatedValues.revenue)}
                </p>
                <p className="text-sm text-gray-400 body-lora">Monthly Revenue</p>
                <Badge className="bg-green-600 text-white text-xs">
                  {investorMetrics.monthlyRevenue.growth} growth
                </Badge>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 body-lora">Target: $2.5M/month</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(animatedValues.revenue / investorMetrics.monthlyRevenue.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Total Value Locked */}
            <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white heading-playfair">
                  {formatCurrency(animatedValues.tvl)}
                </p>
                <p className="text-sm text-gray-400 body-lora">Total Value Locked</p>
                <Badge className="bg-purple-600 text-white text-xs">
                  {investorMetrics.totalValueLocked.growth} growth
                </Badge>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 body-lora">Target: $50M TVL</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(animatedValues.tvl / investorMetrics.totalValueLocked.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Market Share */}
            <div className="text-center p-6 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300">
              <Globe className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-3xl font-bold text-white heading-playfair">
                  {animatedValues.marketShare.toFixed(2)}%
                </p>
                <p className="text-sm text-gray-400 body-lora">GambleFi Market Share</p>
                <Badge className="bg-yellow-600 text-white text-xs">
                  Early Mover Advantage
                </Badge>
                <div className="mt-3">
                  <p className="text-xs text-gray-500 body-lora">Target: 5% market share</p>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(animatedValues.marketShare / investorMetrics.marketShare.target) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Model Breakdown */}
      <Card className="gentlemen-card">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair text-xl">
            <TrendingUp className="text-[var(--gentlemen-gold)] mr-3 w-6 h-6" />
            Revenue Model & Business Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 heading-playfair">House Edge Revenue</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Average House Edge</span>
                  <span className="text-white font-semibold">3.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Daily Betting Volume</span>
                  <span className="text-white font-semibold">$85K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Monthly House Profit</span>
                  <span className="text-[var(--gentlemen-gold)] font-bold">$89K</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 heading-playfair">Token Economics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Staking APY</span>
                  <span className="text-white font-semibold">24.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Revenue Share to Stakers</span>
                  <span className="text-white font-semibold">30%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Monthly Staking Rewards</span>
                  <span className="text-[var(--gentlemen-gold)] font-bold">$27K</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-4 heading-playfair">Growth Projections</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Year 1 Revenue</span>
                  <span className="text-white font-semibold">$3.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Year 2 Revenue</span>
                  <span className="text-white font-semibold">$12.8M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Year 3 Revenue</span>
                  <span className="text-[var(--gentlemen-gold)] font-bold">$35M</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Launch Roadmap */}
      <Card className="gentlemen-card">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair text-xl">
            <Activity className="text-[var(--gentlemen-gold)] mr-3 w-6 h-6" />
            Go-Live Roadmap & Revenue Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {roadmapMilestones.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-yellow-500 transition-all duration-300">
                <div className="flex-shrink-0">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.status === "completed" ? "bg-green-500" :
                    milestone.status === "in-progress" ? "bg-yellow-500 animate-pulse" : "bg-blue-500"
                  }`}></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white heading-playfair">{milestone.milestone}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(milestone.status)}>
                        {milestone.status.replace("-", " ").toUpperCase()}
                      </Badge>
                      <Badge className="bg-green-600/20 text-green-400 border border-green-600">
                        {milestone.impact}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-gray-300 body-lora mb-2">{milestone.description}</p>
                  <p className="text-sm text-gray-400 body-lora">{milestone.quarter}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment Opportunity */}
      <Card className="gentlemen-card border-2 border-green-500">
        <CardHeader>
          <CardTitle className="flex items-center text-white heading-playfair text-xl">
            <Zap className="text-green-400 mr-3 w-6 h-6" />
            Investment Opportunity Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white heading-playfair">Market Opportunity</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Total Addressable Market</span>
                  <span className="text-white font-semibold">$10.2B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Serviceable Market</span>
                  <span className="text-white font-semibold">$2.8B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Target Market Share</span>
                  <span className="text-green-400 font-bold">5% ($140M)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white heading-playfair">Financial Projections</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Break-even Timeline</span>
                  <span className="text-white font-semibold">8 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">3-Year Revenue</span>
                  <span className="text-white font-semibold">$51M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 body-lora">Projected ROI</span>
                  <span className="text-green-400 font-bold">450%</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}