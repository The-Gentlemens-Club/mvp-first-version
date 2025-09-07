import { ShoppingCart, Globe, ExternalLink, AlertTriangle, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function TokenAcquisition() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-4xl font-bold mb-4 font-playfair metal-gold">
          Acquire $GTLM Tokens
        </h3>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-inter">
          Join our exclusive society through multiple acquisition channels
        </p>
      </div>

      {/* Acquisition Methods */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Direct Platform Purchase */}
        <div className="luxury-card-elevated p-8 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center mr-4">
              <Zap className="w-7 h-7 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white font-playfair">Direct Purchase</h4>
              <Badge className="bg-yellow-900/30 text-yellow-500 border border-yellow-500/30 mt-1">
                Instant Access
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3 mb-6 text-gray-300">
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-1.5"></div>
              <span>Purchase directly through the platform</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-1.5"></div>
              <span>Immediate gaming and staking access</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-1.5"></div>
              <span>Member pricing with volume discounts</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-3 mt-1.5"></div>
              <span>KYC verified for enhanced benefits</span>
            </div>
          </div>

          <Button className="btn-luxury-primary w-full text-lg">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy $GTLM Now
          </Button>
        </div>

        {/* DEX Trading */}
        <div className="luxury-card-elevated p-8 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-full flex items-center justify-center mr-4">
              <Globe className="w-7 h-7 text-yellow-500" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white font-playfair">DEX Trading</h4>
              <Badge className="bg-orange-900/30 text-orange-400 border border-orange-500/30 mt-1">
                Decentralized
              </Badge>
            </div>
          </div>
          
          <div className="space-y-3 mb-6 text-gray-300">
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-1.5"></div>
              <span>Trade on Uniswap & major DEXs</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-1.5"></div>
              <span>Available globally without restrictions</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-1.5"></div>
              <span>Full governance participation rights</span>
            </div>
            <div className="flex items-start">
              <div className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3 mt-1.5"></div>
              <span>Permissionless staking rewards</span>
            </div>
          </div>

          <Button className="btn-luxury-outline w-full text-lg">
            <ExternalLink className="w-5 h-5 mr-2" />
            Trade on Uniswap
          </Button>
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="luxury-card p-4 text-center">
          <Shield className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h5 className="font-semibold text-white mb-1">Audited Contracts</h5>
          <p className="text-sm text-gray-400">Verified by CertiK</p>
        </div>
        <div className="luxury-card p-4 text-center">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h5 className="font-semibold text-white mb-1">Instant Settlement</h5>
          <p className="text-sm text-gray-400">No waiting periods</p>
        </div>
        <div className="luxury-card p-4 text-center">
          <Globe className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h5 className="font-semibold text-white mb-1">Global Access</h5>
          <p className="text-sm text-gray-400">24/7 availability</p>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="luxury-card bg-yellow-900/10 border-yellow-500/20 p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
          <div>
            <h5 className="text-yellow-500 font-semibold mb-2">Jurisdiction Notice</h5>
            <p className="text-gray-300 text-sm leading-relaxed">
              Gaming features are geo-restricted in certain jurisdictions. Token holders from restricted 
              regions maintain full access to DAO governance, staking rewards, and trading capabilities 
              through decentralized exchanges. Platform features automatically adjust based on your location.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}