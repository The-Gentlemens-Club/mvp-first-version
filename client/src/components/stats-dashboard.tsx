import { TrendingUp, Users, DollarSign, Activity, Target, Award } from "lucide-react";

export default function StatsDashboard() {
  return (
    <div className="luxury-grid mb-8">
      {/* Total Volume */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center">
            <TrendingUp className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">2.4M</p>
            <p className="data-label">Total Volume</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 status-online"></div>
          <span className="jewel-emerald text-sm font-inter">+12.5% 24h</span>
        </div>
      </div>

      {/* Active Members */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full flex items-center justify-center">
            <Users className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">1,247</p>
            <p className="data-label">Distinguished Members</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-amber-400 rounded-full mr-2 status-online"></div>
          <span className="metal-gold text-sm font-inter">+8.2% 24h</span>
        </div>
      </div>

      {/* Treasury Profit */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
            <DollarSign className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">48.2K</p>
            <p className="data-label">Treasury Profit</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 status-online"></div>
          <span className="jewel-sapphire text-sm font-inter">+15.3% 24h</span>
        </div>
      </div>

      {/* Success Rate */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center">
            <Target className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">47.8%</p>
            <p className="data-label">Success Rate</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 status-online"></div>
          <span className="jewel-amethyst text-sm font-inter">Optimal</span>
        </div>
      </div>

      {/* Staking Yield */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-full flex items-center justify-center">
            <Award className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">24.5%</p>
            <p className="data-label">Staking Yield</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-orange-400 rounded-full mr-2 status-online"></div>
          <span className="metal-bronze text-sm font-inter">Premium Tier</span>
        </div>
      </div>

      {/* Society Activity */}
      <div className="luxury-card p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-red-700 rounded-full flex items-center justify-center">
            <Activity className="text-white" />
          </div>
          <div className="text-right">
            <p className="data-metric text-2xl font-bold mb-1">8.9K</p>
            <p className="data-label">Society Activity</p>
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-rose-400 rounded-full mr-2 status-online"></div>
          <span className="jewel-ruby text-sm font-inter">+22.1% 24h</span>
        </div>
      </div>
    </div>
  );
}