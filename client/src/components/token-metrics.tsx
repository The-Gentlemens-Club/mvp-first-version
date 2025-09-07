import { TrendingUp, Users, Flame, ShoppingCart, DollarSign, BarChart3, ExternalLink, Globe, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTokenMetrics } from "@/hooks/use-token-metrics";

export default function TokenMetrics() {
  const metrics = useTokenMetrics();

  if (metrics.isLoading) {
    return (
      <div className="luxury-grid mb-12">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-center luxury-card p-6 animate-pulse">
            <div className="h-8 bg-gray-700/50 rounded mb-2"></div>
            <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
            <div className="h-3 bg-gray-700/50 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (metrics.error) {
    return (
      <div className="luxury-card border-red-800/30 p-6 mb-12 bg-red-900/10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <p className="text-red-400 font-semibold font-inter">Unable to fetch live treasury metrics</p>
        </div>
        <p className="text-gray-400 text-sm mt-2 font-inter">
          Displaying fallback data. Live metrics will be available once blockchain integration is complete.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Treasury Overview with Live Data */}
      <div className="luxury-grid mb-12">
        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <DollarSign className="metal-gold w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">$GTLM</h4>
          <p className="text-white font-semibold mb-2 font-inter">Society Token</p>
          <p className="data-label">Governance & Utility</p>
        </div>

        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <BarChart3 className="jewel-sapphire w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">{metrics.totalSupply}</h4>
          <p className="text-white font-semibold mb-2 font-inter">Total Supply</p>
          <p className="data-label">Fixed Supply Cap</p>
        </div>

        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <TrendingUp className="jewel-emerald w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">{metrics.circulatingSupply}</h4>
          <p className="text-white font-semibold mb-2 font-inter">Circulating Supply</p>
          <p className="data-label">Available for Trading</p>
        </div>

        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <Flame className="metal-bronze w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">{metrics.tokensBurned}</h4>
          <p className="text-white font-semibold mb-2 font-inter">Tokens Burned</p>
          <p className="data-label">Permanently Removed</p>
        </div>

        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <ShoppingCart className="jewel-amethyst w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">{metrics.tokensSold}</h4>
          <p className="text-white font-semibold mb-2 font-inter">Tokens Distributed</p>
          <p className="data-label">Through Member Rounds</p>
        </div>

        <div className="text-center luxury-card p-6">
          <div className="flex justify-center mb-2">
            <Users className="metal-copper w-6 h-6" />
          </div>
          <h4 className="data-metric text-2xl font-bold mb-2">{metrics.holders.toLocaleString()}</h4>
          <p className="text-white font-semibold mb-2 font-inter">Distinguished Holders</p>
          <p className="data-label">Unique Addresses</p>
        </div>
      </div>

      {/* Treasury Information */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="luxury-card p-6">
          <h4 className="text-xl font-bold text-white mb-4 font-playfair metal-gold">Market Information</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="data-label">Current Price</span>
              <span className="jewel-emerald font-bold font-inter">{metrics.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="data-label">Market Cap</span>
              <span className="jewel-sapphire font-bold font-inter">{metrics.marketCap}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="data-label">Circulating Supply</span>
              <span className="text-white font-bold font-inter">{metrics.circulatingSupply} $GTLM</span>
            </div>
          </div>
        </div>

        <div className="luxury-card p-6">
          <h4 className="text-xl font-bold text-white mb-4 font-playfair metal-gold">Supply Metrics</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="data-label">Total Supply</span>
              <span className="jewel-sapphire font-bold font-inter">{metrics.totalSupply} $GTLM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="data-label">Tokens Burned</span>
              <span className="metal-bronze font-bold font-inter">{metrics.tokensBurned} $GTLM</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="data-label">Burn Rate</span>
              <span className="jewel-ruby font-bold font-inter">0.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Token Purchase Section */}
      <div className="luxury-card bg-gradient-to-br from-amber-900/10 to-yellow-900/20 p-8 border border-yellow-600/30 mb-12" style={{ transition: 'none' }}>
        <div className="text-center mb-8">
          <h4 className="text-3xl font-bold text-white mb-4 font-playfair metal-gold">Acquire $GTLM Tokens</h4>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter leading-relaxed">
            Join our exclusive society by acquiring $GTLM tokens through official exchanges or direct participation
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Direct Gaming Access */}
          <div className="luxury-card-elevated token-acquire-card p-8 transition-all duration-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mr-6">
                <ShoppingCart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h5 className="text-2xl font-bold text-white font-playfair">Gaming Members</h5>
                <Badge className="bg-emerald-900/50 text-emerald-400 border border-emerald-600/30 mt-2">
                  Direct Access
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Purchase tokens directly in platform</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Immediate gaming and staking access</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Exclusive member pricing tiers</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">KYC verified member benefits</span>
              </div>
            </div>

            <Button className="btn-luxury-primary w-full text-lg">
              <ShoppingCart className="w-5 h-5 mr-3" />
              Purchase $GTLM Tokens
            </Button>
          </div>

          {/* Exchange Access */}
          <div className="luxury-card-elevated token-acquire-card p-8 transition-all duration-200">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-6">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h5 className="text-2xl font-bold text-white font-playfair">Exchange Trading</h5>
                <Badge className="bg-blue-900/50 text-blue-400 border border-blue-600/30 mt-2">
                  Global Access
                </Badge>
              </div>
            </div>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Trade on major decentralized exchanges</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Available in non-gaming jurisdictions</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Participate in governance voting</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-300 font-inter">Earn staking rewards</span>
              </div>
            </div>

            <Button className="btn-luxury-outline w-full text-lg">
              <ExternalLink className="w-5 h-5 mr-3" />
              View on Uniswap
            </Button>
          </div>
        </div>

        {/* Geo-Restriction Notice */}
        <div className="luxury-card bg-amber-900/20 border-amber-600/30 p-6 mt-8" style={{ transition: 'none' }}>
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-400 mr-4 flex-shrink-0 mt-1" />
            <div>
              <h6 className="text-amber-400 font-bold mb-2 font-playfair">Geographic Access Information</h6>
              <p className="text-gray-300 text-sm leading-relaxed font-inter">
                Gaming features are restricted in certain jurisdictions. Users from restricted regions can still 
                acquire $GTLM tokens through decentralized exchanges, participate in governance, and earn staking 
                rewards. The platform automatically detects your location and provides appropriate access options.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Data Indicator */}
      <div className="luxury-card bg-gradient-to-r from-emerald-900/20 to-blue-900/20 p-6 border border-emerald-800/30 mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xl font-bold text-white mb-2 font-playfair metal-gold">Live Blockchain Treasury</h4>
            <p className="text-gray-300 text-sm font-inter">
              Treasury metrics are updated every 30 seconds directly from the blockchain. 
              All data is verified and transparent through smart contract calls.
            </p>
          </div>
          <div className="flex items-center space-x-2 jewel-emerald">
            <div className="w-3 h-3 bg-emerald-400 rounded-full status-online"></div>
            <span className="text-sm font-semibold font-inter">Live Treasury Active</span>
          </div>
        </div>
      </div>
    </>
  );
}