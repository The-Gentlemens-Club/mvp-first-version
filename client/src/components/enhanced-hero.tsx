import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Crown, Sparkles, ArrowRight, Play, Shield, TrendingUp, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWeb3 } from '@/hooks/use-web3';

interface HeroStats {
  totalVolume: string;
  activeUsers: string;
  totalRewards: string;
  gamesLive: string;
}

export function EnhancedHero() {
  const { account } = useWeb3();
  const [, navigate] = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [stats, setStats] = useState<HeroStats>({
    totalVolume: '$2.4M',
    activeUsers: '15,240',
    totalRewards: '$180K',
    gamesLive: '42'
  });

  useEffect(() => {
    setIsLoaded(true);
    
    // Simulate real-time stats updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        activeUsers: (parseInt(prev.activeUsers.replace(',', '')) + Math.floor(Math.random() * 10)).toLocaleString(),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Crown className="w-5 h-5" />,
      title: 'Licensed Platform',
      description: 'Curaçao Gaming Authority regulated'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Provably Fair',
      description: 'Blockchain-verified game outcomes'
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Revenue Share',
      description: '30% of profits distributed to stakers'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'DAO Governance',
      description: 'Community-driven decisions'
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-yellow-600/15 rotate-45 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-emerald-600/15 rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-16 h-16 border border-amber-600/15 rotate-45 animate-float" style={{ animationDelay: '4s' }}></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-yellow-500/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className={`text-center max-w-6xl mx-auto transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          
          {/* Platform Badge */}
          <div className="mb-8">
            <Badge className="bg-gradient-to-r from-emerald-600/20 to-yellow-600/20 text-white border border-emerald-500/30 px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              Licensed GambleFi DAO Platform
            </Badge>
          </div>

          {/* Main Headlines */}
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 font-playfair">
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              GENTLEMEN'S
            </span>
          </h1>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-8 text-emerald-400 font-playfair italic">
            Decentralized Gaming Society
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-inter">
            The world's most sophisticated blockchain gaming platform where distinguished members 
            enjoy premium games, earn governance tokens, and shape the future of decentralized entertainment.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            {account ? (
              <Button 
                onClick={() => handleNavigate('/dashboard')}
                size="lg"
                className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-gray-900 font-semibold px-8 py-4 text-lg transition-colors duration-200"
              >
                <Crown className="w-6 h-6 mr-3" />
                ENTER THE CLUB
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            ) : (
              <>
                <Button 
                  onClick={() => handleNavigate('/dashboard')}
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold px-8 py-4 text-lg transition-colors duration-200"
                >
                  <Play className="w-6 h-6 mr-3" />
                  EXPLORE PLATFORM
                </Button>
                <Button 
                  onClick={() => handleNavigate('/nft-collection')}
                  variant="outline"
                  size="lg"
                  className="border-2 border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-semibold px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300"
                >
                  <Sparkles className="w-6 h-6 mr-3" />
                  VIEW COLLECTION
                </Button>
              </>
            )}
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Object.entries(stats).map(([key, value], index) => (
              <div 
                key={key}
                className={`luxury-card p-6 text-center backdrop-blur-xl transition-all duration-700 ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${800 + (index * 100)}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-2 font-playfair">
                  {value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wider font-inter">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`luxury-card p-6 text-center backdrop-blur-xl ${
                  isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}
                style={{ transitionDelay: `${1200 + (index * 100)}ms` }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-emerald-400">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 font-playfair">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}