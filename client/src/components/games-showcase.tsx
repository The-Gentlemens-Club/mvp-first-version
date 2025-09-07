import { Link } from "wouter";
import { Dice1, Spade, Gamepad2, Trophy, Zap, Star, Lock, ArrowRight, Crown, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface GameProvider {
  id: string;
  name: string;
  logo?: string;
  games: number;
  status: 'live' | 'coming-soon' | 'beta';
  features: string[];
  description: string;
}

export default function GamesShowcase() {
  const gameProviders: GameProvider[] = [
    {
      id: 'gentlemen-originals',
      name: 'Gentlemen Originals',
      games: 1,
      status: 'live',
      features: ['Provably Fair', 'Instant Payouts', 'Multiple Multipliers'],
      description: 'Our signature dice game with transparent, verifiable outcomes and premium user experience.'
    },
    {
      id: 'evolution-gaming',
      name: 'Evolution Gaming',
      games: 45,
      status: 'coming-soon',
      features: ['Live Dealers', 'HD Streaming', 'Multi-Language'],
      description: 'Premium live casino games including Blackjack, Roulette, and Baccarat with professional dealers.'
    },
    {
      id: 'pragmatic-play',
      name: 'Pragmatic Play',
      games: 200,
      status: 'coming-soon',
      features: ['Slots Portfolio', 'Tournament Ready', 'Mobile Optimized'],
      description: 'Extensive collection of high-quality slots and table games with engaging themes and features.'
    },
    {
      id: 'netent',
      name: 'NetEnt',
      games: 120,
      status: 'coming-soon',
      features: ['Innovative Mechanics', 'Jackpot Games', 'Premium Graphics'],
      description: 'Award-winning game provider known for innovative slot mechanics and stunning visual design.'
    },
    {
      id: 'playtech',
      name: 'Playtech',
      games: 180,
      status: 'coming-soon',
      features: ['Progressive Jackpots', 'Age of the Gods', 'Branded Games'],
      description: 'Industry pioneer with legendary progressive jackpot network and premium branded gaming experiences.'
    },
    {
      id: 'playngo',
      name: "Play'n GO",
      games: 150,
      status: 'coming-soon',
      features: ['Mobile First', 'Book of Dead', 'Reactoonz Series'],
      description: 'Leading mobile-focused provider known for captivating storytelling and innovative game mechanics.'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-emerald-900/50 text-emerald-400 border border-emerald-600/30">Live Now</Badge>;
      case 'beta':
        return <Badge className="bg-blue-900/50 text-blue-400 border border-blue-600/30">Beta</Badge>;
      case 'coming-soon':
        return <Badge className="bg-amber-900/50 text-amber-400 border border-amber-600/30">Coming Soon</Badge>;
      default:
        return <Badge className="bg-gray-800/50 text-gray-400 border border-gray-600/30">Unknown</Badge>;
    }
  };

  const getProviderIcon = (providerId: string) => {
    switch (providerId) {
      case 'gentlemen-originals':
        return <Crown className="text-2xl" />;
      case 'evolution-gaming':
        return <Spade className="text-2xl" />;
      case 'netent':
        return <Zap className="text-2xl" />;
      case 'playtech':
        return <Star className="text-2xl" />;
      case 'playngo':
        return <Compass className="text-2xl" />;
      default:
        return <Gamepad2 className="text-2xl" />;
    }
  };

  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <h3 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4 font-playfair metal-gold">Gaming Portfolio</h3>
        </div>

        <div className="luxury-grid">
          {gameProviders.map((provider) => (
            <div 
              key={provider.id}
              className="luxury-card p-8 luxury-grid-item flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${
                    provider.status === 'live' 
                      ? 'bg-gradient-to-br from-amber-500 to-yellow-600 text-black' 
                      : 'bg-gray-700/50 text-gray-400'
                  }`}>
                    {getProviderIcon(provider.id)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <h4 className="text-lg sm:text-2xl font-bold text-white font-playfair flex-1">{provider.name}</h4>
                      <div className="flex-shrink-0">
                        {getStatusBadge(provider.status)}
                      </div>
                    </div>
                    <p className="text-gray-400 font-inter mt-1 text-sm sm:text-base">{provider.games} Games Available</p>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed font-inter flex-grow">
                {provider.description}
              </p>

              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3 font-inter">Distinguished Features:</h5>
                <div className="flex flex-wrap gap-2 min-h-[2.5rem]">
                  {provider.features.map((feature, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-amber-900/30 text-amber-300 rounded-full text-sm border border-amber-600/30 font-inter"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex-shrink-0">
                  {provider.status === 'live' ? (
                    <Link href="/dashboard">
                      <Button className="btn-luxury-primary min-w-[140px] h-11">
                        <Zap className="w-4 h-4 mr-2" />
                        Play Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button className="btn-luxury-outline min-w-[140px] h-11" disabled>
                      <Lock className="w-4 h-4 mr-2" />
                      Coming Soon
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-amber-400 flex-shrink-0">
                  <Trophy className="w-4 h-4" />
                  <span className="text-sm font-inter whitespace-nowrap">Elite Provider</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Notice */}
        <div className="mt-12 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xl font-bold text-white mb-2">Expanding Game Library</h4>
              <p className="text-gray-400">
                We're continuously partnering with premium game providers to bring you the most comprehensive 
                gaming experience in the decentralized space. More providers coming soon!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Trophy className="text-yellow-400 text-3xl" />
              <div className="text-right">
                <p className="text-2xl font-bold gentlemen-gold">695+</p>
                <p className="text-gray-400 text-sm">Games Coming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}