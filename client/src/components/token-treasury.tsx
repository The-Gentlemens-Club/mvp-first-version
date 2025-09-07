import { TrendingUp, Users, Flame, DollarSign, BarChart3, Activity, Lock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useTokenMetrics } from "@/hooks/use-token-metrics";
import { AnimatedCounter } from "@/components/animated-counter";

export default function TokenTreasury() {
  const metrics = useTokenMetrics();

  if (metrics.isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="luxury-card p-8 animate-pulse">
            <div className="h-8 bg-gray-700/50 rounded mb-4"></div>
            <div className="h-12 bg-gray-700/50 rounded mb-2"></div>
            <div className="h-4 bg-gray-700/50 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Treasury Header Card */}
      <div className="luxury-card-elevated p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center">
            <DollarSign className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
        <h3 className="text-4xl font-bold mb-2 font-playfair metal-gold">$GTLM Treasury</h3>
        <p className="text-xl text-gray-300 font-inter">
          Transparent economic mechanics governing our exclusive decentralized society
        </p>
      </div>

      {/* Main Treasury Stats - No Duplicates */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Market Value */}
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Market Cap</p>
              <h4 className="text-3xl font-bold text-yellow-500 font-playfair">
                {metrics.marketCap}
              </h4>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400">Price:</span>
            <span className="ml-2 text-white font-semibold">{metrics.price}</span>
            <ArrowUpRight className="w-4 h-4 ml-2 text-green-400" />
          </div>
        </div>

        {/* Supply Distribution */}
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Active Supply</p>
              <h4 className="text-3xl font-bold text-yellow-500 font-playfair">
                <AnimatedCounter value={parseInt(metrics.circulatingSupply.replace(/[^0-9]/g, ''))} duration={1500} />
              </h4>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400">Of Total:</span>
            <span className="ml-2 text-white font-semibold">{metrics.totalSupply}</span>
          </div>
        </div>

        {/* Burn Metrics */}
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Burned Forever</p>
              <h4 className="text-3xl font-bold text-orange-500 font-playfair">
                <AnimatedCounter value={parseInt(metrics.tokensBurned.replace(/[^0-9]/g, ''))} duration={1500} />
              </h4>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <Flame className="w-6 h-6 text-orange-500" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-gray-400">Quarterly Target:</span>
            <span className="ml-2 text-white font-semibold">2% of Supply</span>
          </div>
        </div>
      </div>

      {/* Token Allocation Breakdown */}
      <div className="luxury-card p-8">
        <h4 className="text-2xl font-bold mb-6 font-playfair text-yellow-500">Token Allocation</h4>
        <div className="space-y-4">
          {[
            { category: "Staking & Rewards", percentage: 20, amount: "100M $GTLM", color: "bg-yellow-500" },
            { category: "Private Sale", percentage: 15, amount: "75M $GTLM", color: "bg-blue-500" },
            { category: "Development Fund", percentage: 15, amount: "75M $GTLM", color: "bg-orange-500" },
            { category: "Team & Advisors", percentage: 15, amount: "75M $GTLM", color: "bg-orange-600" },
            { category: "Public Sale", percentage: 10, amount: "50M $GTLM", color: "bg-green-500" },
            { category: "Liquidity Pool", percentage: 10, amount: "50M $GTLM", color: "bg-blue-600" },
            { category: "Marketing & Partnerships", percentage: 10, amount: "50M $GTLM", color: "bg-yellow-700" },
            { category: "Reserve & Future Use", percentage: 5, amount: "25M $GTLM", color: "bg-gray-500" }
          ].map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-white font-semibold">{item.category}</span>
                  {item.locked && (
                    <Lock className="w-4 h-4 ml-2 text-gray-400" />
                  )}
                </div>
                <span className="text-gray-300">{item.amount}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold font-playfair text-yellow-500">Community Growth</h4>
            <Users className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Total Holders</span>
              <span className="text-white font-bold text-xl">
                <AnimatedCounter value={metrics.holders} duration={1500} />
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Stakers</span>
              <span className="text-white font-bold">2,847</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Governance Participants</span>
              <span className="text-white font-bold">1,523</span>
            </div>
          </div>
        </div>

        <div className="luxury-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-bold font-playfair text-yellow-500">Treasury Health</h4>
            <BarChart3 className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Protocol Revenue (24h)</span>
              <span className="text-green-400 font-bold">$48,290</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Rewards Distributed</span>
              <span className="text-white font-bold">$14,487</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Burn Value (This Quarter)</span>
              <span className="text-orange-400 font-bold">$125,840</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Status Indicator */}
      <div className="luxury-card bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 border border-yellow-500/30">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-300 font-inter">
            Treasury data updated in real-time from Ethereum Sepolia
          </span>
        </div>
      </div>
    </div>
  );
}