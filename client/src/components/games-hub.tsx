import { useState } from "react";
import { Dice1, Spade, Gamepad2, Filter, Search, Star, Lock, Maximize, Minimize } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DiceGame from "@/components/dice-game";

interface Game {
  id: string;
  name: string;
  provider: string;
  category: 'dice' | 'cards' | 'slots' | 'live';
  status: 'live' | 'coming-soon';
  thumbnail?: string;
  description: string;
  rtp: number;
  minBet: string;
  maxBet: string;
  features: string[];
}

export default function GamesHub() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedGame, setSelectedGame] = useState<string>('gentlemen-dice');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const games: Game[] = [
    {
      id: 'gentlemen-dice',
      name: 'Gentlemen Dice',
      provider: 'Gentlemen Originals',
      category: 'dice',
      status: 'live',
      description: 'Our signature provably fair dice game with multiple betting options',
      rtp: 99.0,
      minBet: '1',
      maxBet: '1000',
      features: ['Provably Fair', 'Instant Payouts', '6x Multiplier']
    },
    {
      id: 'live-blackjack',
      name: 'Live Blackjack',
      provider: 'Evolution Gaming',
      category: 'live',
      status: 'coming-soon',
      description: 'Classic blackjack with professional dealers and HD streaming',
      rtp: 99.5,
      minBet: '5',
      maxBet: '5000',
      features: ['Live Dealer', 'HD Stream', 'Side Bets']
    },
    {
      id: 'european-roulette',
      name: 'European Roulette',
      provider: 'Evolution Gaming',
      category: 'live',
      status: 'coming-soon',
      description: 'Premium European roulette with immersive gameplay',
      rtp: 97.3,
      minBet: '1',
      maxBet: '10000',
      features: ['Live Dealer', 'Multiple Cameras', 'Statistics']
    },
    {
      id: 'starburst',
      name: 'Starburst',
      provider: 'NetEnt',
      category: 'slots',
      status: 'coming-soon',
      description: 'Popular space-themed slot with expanding wilds',
      rtp: 96.1,
      minBet: '0.10',
      maxBet: '100',
      features: ['Expanding Wilds', 'Both Ways Pay', 'Re-spins']
    },
    {
      id: 'baccarat',
      name: 'Baccarat',
      provider: 'Evolution Gaming',
      category: 'cards',
      status: 'coming-soon',
      description: 'Classic baccarat with elegant presentation',
      rtp: 98.9,
      minBet: '1',
      maxBet: '15000',
      features: ['Live Dealer', 'Side Bets', 'Roadmaps']
    },
    {
      id: 'great-rhino',
      name: 'Great Rhino',
      provider: 'Pragmatic Play',
      category: 'slots',
      status: 'coming-soon',
      description: 'African-themed slot with exciting bonus features',
      rtp: 96.5,
      minBet: '0.25',
      maxBet: '125',
      features: ['Free Spins', 'Super Respin', 'Wild Symbols']
    },
    {
      id: 'wolf-gold',
      name: 'Wolf Gold',
      provider: 'Pragmatic Play',
      category: 'slots',
      status: 'coming-soon',
      description: 'Western-themed slot with progressive jackpots',
      rtp: 96.0,
      minBet: '0.25',
      maxBet: '125',
      features: ['Money Respin', 'Free Spins', 'Progressive Jackpot']
    }
  ];

  const categories = [
    { value: 'all', label: 'All Games' },
    { value: 'dice', label: 'Dice Games' },
    { value: 'cards', label: 'Card Games' },
    { value: 'slots', label: 'Slot Games' },
    { value: 'live', label: 'Live Casino' }
  ];

  const providers = [
    { value: 'all', label: 'All Providers' },
    { value: 'Gentlemen Originals', label: 'Gentlemen Originals' },
    { value: 'Evolution Gaming', label: 'Evolution Gaming' },
    { value: 'NetEnt', label: 'NetEnt' },
    { value: 'Pragmatic Play', label: 'Pragmatic Play' }
  ];

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider;
    const matchesSearch = game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         game.provider.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesProvider && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'dice':
        return <Dice1 className="w-4 h-4" />;
      case 'cards':
      case 'live':
        return <Spade className="w-4 h-4" />;
      case 'slots':
        return <Star className="w-4 h-4" />;
      default:
        return <Gamepad2 className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="bg-green-900 text-green-400">Live</Badge>;
      case 'coming-soon':
        return <Badge className="bg-orange-900 text-orange-400">Soon</Badge>;
      default:
        return <Badge className="bg-gray-800 text-gray-400">Unknown</Badge>;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const currentGame = games.find(game => game.id === selectedGame);

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black">
        <div className="h-full flex flex-col">
          {/* Fullscreen Header */}
          <div className="gentlemen-primary border-b border-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  {getCategoryIcon(currentGame?.category || 'dice')}
                  <h2 className="text-xl font-bold text-white">{currentGame?.name}</h2>
                </div>
                {currentGame && getStatusBadge(currentGame.status)}
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right text-sm">
                  <p className="text-gray-400">RTP: {currentGame?.rtp}%</p>
                  <p className="text-gray-300">{currentGame?.provider}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
                >
                  <Minimize className="w-4 h-4 mr-2" />
                  Exit Fullscreen
                </Button>
              </div>
            </div>
          </div>
          
          {/* Fullscreen Game Area */}
          <div className="flex-1 p-6">
            {selectedGame === 'gentlemen-dice' ? (
              <DiceGame />
            ) : (
              <div className="h-full gentlemen-primary rounded-xl border border-gray-800 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-gray-400 text-4xl" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Game Coming Soon</h3>
                  <p className="text-gray-400 mb-6 max-w-md">
                    This game is currently being integrated and will be available soon.
                  </p>
                  <Button 
                    onClick={() => setSelectedGame('gentlemen-dice')}
                    className="gentlemen-gradient text-gray-900 font-semibold"
                  >
                    <Dice1 className="w-4 h-4 mr-2" />
                    Play Available Games
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Games Library Sidebar */}
      <div className="lg:col-span-1">
        <div className="gentlemen-primary rounded-xl border border-gray-800 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Games Library</h3>
            <Badge className="gentlemen-gradient text-gray-900">
              {filteredGames.filter(g => g.status === 'live').length} Live
            </Badge>
          </div>

          {/* Search and Filter */}
          <div className="space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedProvider} onValueChange={setSelectedProvider}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Filter by provider" />
              </SelectTrigger>
              <SelectContent>
                {providers.map((provider) => (
                  <SelectItem key={provider.value} value={provider.value}>
                    {provider.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Games List */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedGame === game.id
                    ? 'border-yellow-600 bg-yellow-900/20'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                } ${game.status === 'coming-soon' ? 'opacity-60' : ''}`}
                onClick={() => game.status === 'live' && setSelectedGame(game.id)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(game.category)}
                    <h4 className="font-semibold text-white">{game.name}</h4>
                  </div>
                  {getStatusBadge(game.status)}
                </div>
                <p className="text-gray-400 text-sm mb-2">{game.provider}</p>
                <p className="text-gray-300 text-xs mb-2">{game.description}</p>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>RTP: {game.rtp}%</span>
                  <span>{game.minBet} - {game.maxBet} GTLM</span>
                </div>
                {game.status === 'coming-soon' && (
                  <div className="flex items-center mt-2 text-orange-400">
                    <Lock className="w-3 h-3 mr-1" />
                    <span className="text-xs">Coming Soon</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Game Display Area */}
      <div className="lg:col-span-2">
        <div className="gentlemen-primary rounded-xl border border-gray-800 overflow-hidden">
          {/* Game Header with Fullscreen Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {getCategoryIcon(currentGame?.category || 'dice')}
                <h3 className="text-lg font-bold text-white">{currentGame?.name || 'Select Game'}</h3>
              </div>
              {currentGame && getStatusBadge(currentGame.status)}
            </div>
            {currentGame?.status === 'live' && (
              <Button
                variant="outline"
                size="sm"
                onClick={toggleFullscreen}
                className="border-gray-600 text-gray-300 hover:text-white hover:border-gray-500"
              >
                <Maximize className="w-4 h-4 mr-2" />
                Fullscreen
              </Button>
            )}
          </div>
          
          {/* Game Content */}
          <div className="p-6">
            {selectedGame === 'gentlemen-dice' ? (
              <DiceGame />
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Lock className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Game Coming Soon</h3>
                  <p className="text-gray-400 mb-6">
                    This game is currently being integrated and will be available soon. 
                    We're working with premium providers to bring you the best gaming experience.
                  </p>
                  <Button 
                    onClick={() => setSelectedGame('gentlemen-dice')}
                    className="gentlemen-gradient text-gray-900 font-semibold"
                  >
                    <Dice1 className="w-4 h-4 mr-2" />
                    Play Available Games
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}