import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  PlayCircle,
  Target,
  Zap
} from "lucide-react";
import WalletConnect from "@/components/wallet-connect";
import InvestorDemoMetrics from "@/components/investor-demo-metrics";
import LiveDemoSimulation from "@/components/live-demo-simulation";
import logoPath from "@assets/newlogo_1753369626128.jpeg";

export default function InvestorDemoPage() {
  const [fadeIn, setFadeIn] = useState(false);
  const [currentView, setCurrentView] = useState<"metrics" | "simulation">("metrics");

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* Header */}
      <header className="gentlemen-primary border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-4 cursor-pointer">
                <img 
                  src={logoPath} 
                  alt="The Gentlemen's Club Logo" 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-2xl font-bold gentlemen-gold heading-playfair">The Gentlemen's Club</h1>
                  <p className="text-sm text-gray-400 body-lora">Investor Demo Portal</p>
                </div>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-[var(--gentlemen-gold)] transition-colors body-lora">Home</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-[var(--gentlemen-gold)] transition-colors body-lora">Platform Demo</Link>
              <Link href="/nft-collection" className="text-gray-300 hover:text-[var(--gentlemen-gold)] transition-colors body-lora">NFT Collection</Link>
              <Badge className="bg-blue-600 text-white">Investor Demo</Badge>
            </nav>

            <div className="flex items-center space-x-4">
              <WalletConnect />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 lg:py-32 transition-all duration-1000 ${fadeIn ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Target className="text-[var(--gentlemen-gold)] text-4xl animate-pulse" />
              <Badge className="bg-blue-600 text-white px-6 py-2 text-lg font-bold">
                Investor Demonstration Portal
              </Badge>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight heading-playfair">
              The Future of <span className="gentlemen-gold">GambleFi</span><br />
              <span className="text-3xl lg:text-4xl">Post-License Revenue Simulation</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl mx-auto body-lora">
              Experience our platform's full potential when licensed and operational - complete with live user activity, 
              real-time revenue generation, and thriving DAO governance in the $10B+ GambleFi market.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <Button 
                size="lg" 
                onClick={() => setCurrentView("simulation")}
                className={`${currentView === "simulation" ? "btn-luxury" : "btn-luxury-outline"} hover:scale-105 transition-all duration-300`}
              >
                <PlayCircle className="w-6 h-6 mr-3" />
                Live Platform Simulation
              </Button>
              
              <Button 
                size="lg" 
                onClick={() => setCurrentView("metrics")}
                className={`${currentView === "metrics" ? "btn-luxury" : "btn-luxury-outline"} hover:scale-105 transition-all duration-300`}
              >
                <TrendingUp className="w-6 h-6 mr-3" />
                Business Metrics & Projections
              </Button>
            </div>

            {/* Key Value Props */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
                <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 heading-playfair">Scalable User Base</h3>
                <p className="text-gray-400 text-sm body-lora">Targeting 100K+ active users with proven acquisition strategies</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <DollarSign className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 heading-playfair">Revenue Model</h3>
                <p className="text-gray-400 text-sm body-lora">Multi-stream revenue: gaming, staking, NFTs, and DAO treasury</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300">
                <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2 heading-playfair">Market Position</h3>
                <p className="text-gray-400 text-sm body-lora">First-mover advantage in licensed GambleFi DAO space</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Content */}
      <section className="py-16 gentlemen-secondary">
        <div className="container mx-auto px-6">
          {currentView === "metrics" ? (
            <InvestorDemoMetrics />
          ) : (
            <LiveDemoSimulation />
          )}
        </div>
      </section>

      {/* Investment Opportunity CTA */}
      <section className="py-20 gentlemen-primary border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-6 heading-playfair">
              Ready to Build the Future of <span className="gentlemen-gold">GambleFi</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto body-lora">
              Join us in revolutionizing decentralized gaming with a licensed, compliant, and community-governed platform 
              that generates sustainable revenue while empowering users through true ownership.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="text-center">
                <div className="text-3xl font-bold gentlemen-gold mb-2">$150K</div>
                <p className="text-gray-400 body-lora">Licensing Investment</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gentlemen-gold mb-2">8 Months</div>
                <p className="text-gray-400 body-lora">Break-even Timeline</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gentlemen-gold mb-2">450%</div>
                <p className="text-gray-400 body-lora">Projected 3-Year ROI</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="btn-luxury hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                <Zap className="w-6 h-6 mr-3" />
                Request Investment Deck
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
              
              <Link href="/dashboard">
                <Button size="lg" className="btn-luxury-outline hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                  <PlayCircle className="w-6 h-6 mr-3" />
                  Explore Platform Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 body-lora">
            This demonstration shows projected platform performance post-licensing. 
            All data is simulated for investor presentation purposes.
          </p>
          <p className="text-sm text-gray-500 body-lora mt-2">
            Current development operates on Sepolia testnet with no real money transactions.
          </p>
        </div>
      </footer>
    </div>
  );
}