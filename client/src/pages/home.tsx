import { Link, useLocation } from "wouter";
import { Crown, Dice1, Lock, Users, TrendingUp, Shield, Zap, Award, ArrowRight, Play, BarChart3, CheckCircle, Calendar, Rocket, Target, FileText, Star, Trophy, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WalletConnect from "@/components/wallet-connect";
import UserProfileModal from "@/components/user-profile-modal";
import MobileNavigation from "@/components/mobile-navigation";
import LiveFeed from "@/components/live-feed";
import { EnhancedSocietyActivities } from "@/components/enhanced-society-activities";
import GamesShowcase from "@/components/games-showcase";
import TokenTreasury from "@/components/token-treasury";
import TokenAcquisition from "@/components/token-acquisition";
import DAODashboard from "@/components/dao-dashboard";
import BettingInterface from "@/components/betting-interface";
import { ParticleBackground } from "@/components/particle-background";
import { AnimatedCounter } from "@/components/animated-counter";
import { EntranceAnimation } from "@/components/entrance-animation";
import { useWeb3 } from "@/hooks/use-web3";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import logoPath from "@assets/newlogo_1753369626128.jpeg";

export default function Home() {
  const { account } = useWeb3();
  const [isLoaded, setIsLoaded] = useState(false);
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWinConfetti, setShowWinConfetti] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    // Show welcome toast
    toast.success('Welcome to The Gentlemen\'s Club', {
      duration: 3000,
      icon: '🎩'
    });
  }, []);

  const navigateToTop = (path: string) => {
    // Use hash navigation trick to force browser reset
    window.location.href = path + '#top';
  };

  return (
    <div className="min-h-screen w-full text-white relative">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link focus-ring"
        data-testid="skip-link"
      >
        Skip to main content
      </a>
      
      {/* Sophisticated Header */}
      <header className="luxury-glass border-b border-yellow-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={logoPath} 
                alt="The Gentlemen's Club Logo" 
                className="h-12 w-12 rounded-full object-cover luxury-glow-gold"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold font-playfair bg-gradient-to-r from-yellow-400 via-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  THE GENTLEMEN'S CLUB
                </h1>
                <p className="text-xs sm:text-sm text-yellow-500 font-inter uppercase tracking-wider">Licensed GambleFi DAO</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#tokenomics" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">Treasury</a>
              <a href="#governance" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">DAO</a>
              <a href="#staking" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">Staking</a>
              <Link href="/nft-collection" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">Collection</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">Casino</Link>
              <Link href="/eligibility" className="text-gray-300 hover:text-yellow-500 transition-colors font-inter text-sm lg:text-base">Eligibility</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {account && <UserProfileModal />}
              <WalletConnect />
              {account && (
                <Link href="/dashboard" className="hidden sm:block">
                  <Button className="btn-luxury-primary focus-ring" data-testid="button-enter-club">
                    <Crown className="w-4 h-4 mr-2" />
                    ENTER CLUB
                  </Button>
                </Link>
              )}
              <MobileNavigation 
                isOpen={isMobileMenuOpen} 
                onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Premium Hero Section - Elegant & Exclusive */}
      <main id="main-content" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-gray-900 via-[#0a0f1f] to-gray-900" role="main">
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-yellow-900/10 pointer-events-none" />
        
        {/* Premium Particle Effect */}
        <ParticleBackground />
        
        <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10 py-20 sm:py-28 lg:py-36">
          <div className={`text-center max-w-7xl mx-auto space-y-10 sm:space-y-12 lg:space-y-16 transition-all duration-1500 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}>
            
            
            
            {/* Bold Main Title - Premium Typography */}
            <div className="space-y-6">
              <h2 className="text-6xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-2xl font-playfair">
                  OWN THE
                </span>
                <span className="block mt-2 text-white drop-shadow-2xl font-playfair">
                  HOUSE
                </span>
              </h2>
              
              
            </div>
            
            {/* Refined Description */}
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light px-4">
              An <span className="text-yellow-300 font-medium">exclusive society</span> where sophisticated gaming meets blockchain innovation. 
              Stake, govern, and share in the prosperity of the world's most <span className="text-blue-300 font-medium">refined GambleFi ecosystem</span>.
            </p>
            
            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center px-4 pt-4">
              {account ? (
                <button 
                  className="group relative px-10 py-5 bg-gradient-to-r from-yellow-500 to-yellow-600 text-gray-900 font-bold text-lg rounded-2xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
                  onClick={() => navigateToTop('/dashboard')}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Crown className="w-6 h-6" />
                    ENTER THE CLUB
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              ) : (
                <div className="w-full sm:w-auto">
                  <WalletConnect />
                </div>
              )}
              
              <button 
                className="group px-10 py-5 bg-gray-900/80 backdrop-blur-md text-white font-semibold text-lg rounded-2xl border-2 border-blue-400/30 shadow-2xl hover:shadow-blue-400/20 transition-all duration-300 hover:scale-105 hover:bg-gray-900/90 hover:border-blue-400/50"
                onClick={() => navigateToTop('/nft-collection')}
              >
                <span className="flex items-center justify-center gap-3">
                  <Trophy className="w-6 h-6 text-blue-300 group-hover:text-blue-200 transition-colors" />
                  VIEW COLLECTION
                </span>
              </button>
            </div>


            {/* Premium Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-6xl mx-auto px-4 pt-8">
              <div className="group bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10">
                <Shield className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">LICENSED</div>
                <div className="text-sm text-gray-400">Curaçao Gaming Authority</div>
              </div>
              
              <div className="group bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/10" style={{ animationDelay: '0.2s' }}>
                <Users className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  <AnimatedCounter value={2847} duration={2500} />
                </div>
                <div className="text-sm text-gray-400">Distinguished Members</div>
              </div>
              
              <div className="group bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/10" style={{ animationDelay: '0.4s' }}>
                <TrendingUp className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  <AnimatedCounter value={12.8} decimals={1} prefix="$" suffix="M" duration={2500} />
                </div>
                <div className="text-sm text-gray-400">Treasury Assets</div>
              </div>
              
              <div className="group bg-gray-900/60 backdrop-blur-md rounded-2xl p-6 sm:p-8 text-center border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-400/10" style={{ animationDelay: '0.6s' }}>
                <Award className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-2xl sm:text-3xl font-bold mb-2 text-white">
                  <AnimatedCounter value={94.2} decimals={1} suffix="%" duration={2500} />
                </div>
                <div className="text-sm text-gray-400">Elite Participation</div>
              </div>
            </div>
          </div>
        </div>
        
        
      </main>

      

      

      {/* Features Section */}
      <section id="features" className="luxury-section">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 sm:mb-20">
            <h3 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 luxury-header">
              EXCLUSIVE FEATURES
            </h3>
          </div>
          
          <GamesShowcase />
        </div>
      </section>

      {/* Token Treasury */}
      <section id="tokenomics" className="luxury-section">
        <div className="container mx-auto px-4 sm:px-6">
          <TokenTreasury />
        </div>
      </section>
      
      {/* Token Acquisition */}
      <section className="luxury-section bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6">
          <TokenAcquisition />
        </div>
      </section>

      {/* DAO Governance Section */}
      <section id="governance" className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-8 jewel-sapphire font-playfair">
              DAO Governance
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              Shape the future of The Gentlemen's Club through decentralized governance. Participate in $GTLM token voting to influence platform development, treasury allocation, and strategic decisions independently of gaming activities.
            </p>
            <div className="mt-8 p-6 luxury-card max-w-4xl mx-auto">
              <p className="text-sm text-amber-400 font-inter leading-relaxed">
                <strong>Important:</strong> DAO governance participation is a separate utility token function, distinct from and independent of any gaming activities. Token holders may participate in governance regardless of gaming jurisdiction eligibility.
              </p>
            </div>
          </div>
          
          <DAODashboard />
        </div>
      </section>

      {/* Token Staking Section */}
      <section id="staking" className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-8 metal-gold font-playfair">
              Token Staking
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              Stake $GTLM tokens to earn platform profit sharing rewards. Staking is a financial utility separate from gaming activities.
            </p>
            <div className="mt-8 p-6 luxury-card max-w-4xl mx-auto">
              <p className="text-sm text-amber-400 font-inter leading-relaxed">
                <strong>Compliance Notice:</strong> Token staking rewards are derived from platform operational profits and business activities, not gambling outcomes. Staking eligibility is independent of gaming jurisdiction restrictions and does not constitute gambling activity.
              </p>
            </div>
          </div>
          
          <BettingInterface />
        </div>
      </section>

      {/* Society Activities & Performance */}
      <section className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h3 className="text-5xl font-bold mb-8 jewel-sapphire font-playfair">
              Society Activities & Performance
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              Real-time platform metrics, member activities, and performance indicators across all operations
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <EnhancedSocietyActivities />
          </div>
        </div>
      </section>

      {/* B2B White-Label Vision */}
      <section className="luxury-section bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-8 metal-gold font-playfair">
              BEYOND THE PLATFORM: OUR B2B VISION
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              Our long-term strategy is to become the core infrastructure for trusted on-chain gaming.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="luxury-card p-8 text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h4 className="text-xl font-semibold mb-3">Infrastructure</h4>
              <p className="text-gray-400">Core technology stack powering secure on-chain gaming</p>
            </div>
            <div className="luxury-card p-8 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h4 className="text-xl font-semibold mb-3">White-Label</h4>
              <p className="text-gray-400">Turnkey solutions for brands entering blockchain gaming</p>
            </div>
            <div className="luxury-card p-8 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h4 className="text-xl font-semibold mb-3">B2B Revenue</h4>
              <p className="text-gray-400">Licensing fees flow directly back to DAO members</p>
            </div>
          </div>
          
          <div className="luxury-card-elevated p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-300 text-center">
              The Gentlemen's Club is our flagship platform—the proof-of-concept for our robust, secure, and licensed technology stack. 
              Once mature, we will offer this infrastructure as a turnkey white-label solution for other brands & partners. 
              This creates a powerful B2B revenue stream that flows directly back to our DAO, rewarding $GTLM stakers & 
              solidifying our position as a market-leading technology provider.
            </p>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-8 jewel-sapphire font-playfair">
              OUR BLUEPRINT
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter">
              A strategic roadmap to building the premier licensed GambleFi ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="luxury-card p-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-xl font-bold">Q4 2025</h4>
              </div>
              <h5 className="text-lg font-semibold mb-3 text-yellow-400">MVP & LICENSE</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Finalize core MVP</li>
                <li>• Provably fair games</li>
                <li>• Submit Curaçao license</li>
                <li>• Smart contract audit</li>
              </ul>
            </div>
            
            <div className="luxury-card p-8">
              <div className="flex items-center mb-4">
                <Rocket className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-xl font-bold">Q1 2026</h4>
              </div>
              <h5 className="text-lg font-semibold mb-3 text-yellow-400">BETA & AUDIT</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Closed beta testing</li>
                <li>• Third-party audit</li>
                <li>• Deploy staking</li>
                <li>• Security hardening</li>
              </ul>
            </div>
            
            <div className="luxury-card p-8">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-xl font-bold">Q2 2026</h4>
              </div>
              <h5 className="text-lg font-semibold mb-3 text-yellow-400">PUBLIC LAUNCH</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Platform launch</li>
                <li>• $GTLM liquidity pool</li>
                <li>• Marketing campaign</li>
                <li>• Affiliate program</li>
              </ul>
            </div>
            
            <div className="luxury-card p-8">
              <div className="flex items-center mb-4">
                <Star className="w-8 h-8 text-yellow-400 mr-3" />
                <h4 className="text-xl font-bold">Q3 2026</h4>
              </div>
              <h5 className="text-lg font-semibold mb-3 text-yellow-400">EXPANSION</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Genesis NFT launch</li>
                <li>• Expand game library</li>
                <li>• NFT marketplace</li>
                <li>• White-Label pilot</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="luxury-section bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-8 metal-gold font-playfair">
              YOUR STRATEGIC QUESTIONS, ANSWERED
            </h3>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="luxury-card p-8">
              <h4 className="text-xl font-semibold mb-4">Why is being a LICENSED GambleFi DAO so important?</h4>
              <p className="text-gray-400">
                Most GambleFi projects operate in regulatory gray areas, creating significant risks for users and token holders. 
                Our Curaçao gaming license provides legal clarity, regulatory compliance, and operational legitimacy that protects 
                your investment and ensures sustainable growth. This also opens doors to traditional gaming partnerships and 
                institutional investment that unlicensed platforms cannot access.
              </p>
            </div>
            
            <div className="luxury-card p-8">
              <h4 className="text-xl font-semibold mb-4">How do I earn from the platform's revenue?</h4>
              <p className="text-gray-400">
                30% of all net platform profits are distributed quarterly to $GTLM stakers through audited smart contracts. 
                This includes revenue from gaming operations, NFT sales, partnership deals, and our future white-label B2B solutions. 
                The more $GTLM you stake, the larger your share of the profit distribution. These payments are automatic and 
                transparent, viewable on-chain at any time.
              </p>
            </div>
            
            <div className="luxury-card p-8">
              <h4 className="text-xl font-semibold mb-4">What is the business case for White-Label Solutions?</h4>
              <p className="text-gray-400">
                The B2B white-label solution leverages our licensed infrastructure to serve other gaming brands who want to enter 
                the on-chain space without the complexity of building their own platform or obtaining licenses. This creates a 
                recurring revenue stream through licensing fees, transaction fees, and revenue sharing agreements. As the market 
                for licensed on-chain gaming grows, this becomes a significant competitive advantage and revenue multiplier for 
                $GTLM holders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold mb-8 jewel-emerald font-playfair">
              INVESTMENT OPPORTUNITIES
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto font-inter mb-12">
              Whether you are an Angel Investor, Strategic Partner or Institutional Investor, 
              we welcome the opportunity to discuss potential collaboration and investment opportunities.
            </p>
          </div>
          
          <div className="luxury-card-elevated p-12 max-w-3xl mx-auto text-center">
            <h4 className="text-3xl font-bold mb-6 font-playfair">Contact Our Team</h4>
            <p className="text-lg text-gray-300 mb-8">
              Ready to join The Gentlemen's Club ecosystem? Reach out to us directly for investment inquiries, 
              partnerships, and collaboration opportunities.
            </p>
            
            <div className="flex flex-col items-center space-y-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Official Contact Email</p>
                <a href="mailto:contact.gentlemensclub.app@gmail.com" 
                   className="text-xl text-yellow-400 hover:text-yellow-300 transition-colors">
                  contact.gentlemensclub.app@gmail.com
                </a>
              </div>
              
              <div className="flex gap-4 flex-wrap justify-center mt-8">
                <Badge className="px-4 py-2 bg-yellow-600/20 text-yellow-400">Angel Investors</Badge>
                <Badge className="px-4 py-2 bg-yellow-600/20 text-yellow-400">Strategic Partners</Badge>
                <Badge className="px-4 py-2 bg-yellow-600/20 text-yellow-400">Institutional Investors</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="luxury-section">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-6xl mx-auto">
            <h3 className="text-6xl font-bold mb-8 luxury-header">
              JOIN THE SOCIETY
            </h3>
            <p className="text-2xl text-gray-300 mb-16 font-crimson leading-relaxed">
              Become a distinguished member of the world's most exclusive decentralized gaming community
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              {account ? (
                <Link href="/dashboard">
                  <Button className="btn-luxury-primary text-xl">
                    <Crown className="w-6 h-6 mr-3" />
                    ENTER THE CLUB
                  </Button>
                </Link>
              ) : (
                <WalletConnect />
              )}
              <Link href="/nft-collection">
                <Button className="btn-luxury-outline text-xl">
                  <Trophy className="w-6 h-6 mr-3" />
                  VIEW BRAND COLLECTION
                </Button>
              </Link>
            </div>

            {/* Final stats showcase */}
            <div className="grid md:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto">
              <div className="luxury-card-elevated card-3d p-8 text-center">
                <div className="data-metric text-4xl font-bold mb-2">Eternal</div>
                <div className="data-label">Legacy & Heritage</div>
              </div>
              <div className="luxury-card-elevated card-3d p-8 text-center">
                <div className="data-metric text-4xl font-bold mb-2">24/7</div>
                <div className="data-label">Concierge Service</div>
              </div>
              <div className="luxury-card-elevated card-3d p-8 text-center">
                <div className="data-metric text-4xl font-bold mb-2">
                  <AnimatedCounter value={100} suffix="%" duration={2000} />
                </div>
                <div className="data-label">Member Owned</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="luxury-glass border-t border-yellow-600/20 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
              <img 
                src={logoPath} 
                alt="The Gentlemen's Club Logo" 
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover luxury-glow-gold"
              />
              <h4 className="text-xl sm:text-2xl font-bold metal-gold font-playfair">THE GENTLEMEN'S CLUB</h4>
            </div>
            <p className="text-gray-400 font-inter text-base sm:text-lg mb-4 sm:mb-6">
              LICENSED GAMBLEFI DAO SOCIETY
            </p>
            <p className="text-gray-500 font-crimson text-xs sm:text-sm px-4">
              Curaçao Gaming Authority License Pending • Ethereum Sepolia Network
            </p>
            
            <div className="mt-6 sm:mt-8 flex justify-center items-center space-x-4">
              <div className="status-online w-3 h-3 rounded-full"></div>
              <span className="jewel-emerald font-inter text-xs sm:text-sm">Society Online</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}