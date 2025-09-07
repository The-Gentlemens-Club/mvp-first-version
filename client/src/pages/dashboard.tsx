import { Link } from "wouter";
import { Crown, Dice1, Lock, TrendingUp, Shield, Zap, Award, ArrowRight, Play, BarChart3, CheckCircle, Calendar, Rocket, Target, FileText, Star, Trophy, Coins, Filter, Search, SortAsc, List, Grid, Eye, Activity, DollarSign, Grid3x3, Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import WalletConnect from "@/components/wallet-connect";
import UserProfileModal from "@/components/user-profile-modal";
import DiceGame from "@/components/dice-game";
import StakingDashboard from "@/components/staking-dashboard";

import { useWeb3 } from "@/hooks/use-web3";
import { useState, useEffect } from "react";
import { GameCardSkeleton } from "@/components/loading-skeleton";
import logoPath from "@assets/newlogo_1753369626128.jpeg";

export default function Dashboard() {
  const { account } = useWeb3();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const [selectedGame, setSelectedGame] = useState<{name: string, provider: string} | null>(null);
  const [activeTab, setActiveTab] = useState('browse');

  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedGameType, setSelectedGameType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'popularity' | 'provider'>('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setIsLoaded(true);
    // Simulate games loading
    setTimeout(() => setIsLoadingGames(false), 1500);
  }, []);

  // Handle game selection and tab switching
  const handleGameSelect = (game: typeof gamesList[0]) => {
    console.log('Selecting game:', game.name);
    setSelectedGame({ name: game.name, provider: game.provider });
    // Switch to games tab immediately
    setActiveTab('games');
  };

  const gamesList = [
    { name: "Gentlemen Dice", provider: "Gentlemen Originals", status: "live", description: "Provably fair dice betting", type: "dice", category: "originals", popularity: 95, players: 247, revenue: "$12,840", rtp: "98.5%", imageUrl: "/api/placeholder/400/300?text=Gentlemen+Dice" },
    { name: "Live Blackjack", provider: "Evolution Gaming", status: "coming", description: "Professional dealers, multiple tables", type: "blackjack", category: "live-casino", popularity: 88, players: 0, revenue: "$0", rtp: "99.2%", imageUrl: "/api/placeholder/400/300?text=Live+Blackjack" },
    { name: "Lightning Roulette", provider: "Evolution Gaming", status: "coming", description: "Enhanced RNG multipliers", type: "roulette", category: "live-casino", popularity: 92, players: 0, revenue: "$0", rtp: "97.3%", imageUrl: "/api/placeholder/400/300?text=Lightning+Roulette" },
    { name: "Live Baccarat", provider: "Evolution Gaming", status: "coming", description: "Classic card game with live dealers", type: "baccarat", category: "live-casino", popularity: 85, players: 0, revenue: "$0", rtp: "98.9%", imageUrl: "/api/placeholder/400/300?text=Live+Baccarat" },
    { name: "Starburst", provider: "NetEnt", status: "coming", description: "Classic slot with expanding wilds", type: "slots", category: "slots", popularity: 89, players: 0, revenue: "$0", rtp: "96.1%", imageUrl: "/api/placeholder/400/300?text=Starburst" },
    { name: "Gonzo's Quest", provider: "NetEnt", status: "coming", description: "Adventure-themed slot", type: "slots", category: "slots", popularity: 87, players: 0, revenue: "$0", rtp: "95.9%", imageUrl: "/api/placeholder/400/300?text=Gonzos+Quest" },
    { name: "Dead or Alive 2", provider: "NetEnt", status: "coming", description: "High-volatility western slot", type: "slots", category: "slots", popularity: 84, players: 0, revenue: "$0", rtp: "96.8%", imageUrl: "/api/placeholder/400/300?text=Dead+or+Alive+2" },
    { name: "Sweet Bonanza", provider: "Pragmatic Play", status: "coming", description: "High-volatility fruit slot", type: "slots", category: "slots", popularity: 91, players: 0, revenue: "$0", rtp: "96.5%", imageUrl: "/api/placeholder/400/300?text=Sweet+Bonanza" },
    { name: "Gates of Olympus", provider: "Pragmatic Play", status: "coming", description: "Greek mythology themed slot", type: "slots", category: "slots", popularity: 90, players: 0, revenue: "$0", rtp: "96.5%", imageUrl: "/api/placeholder/400/300?text=Gates+of+Olympus" },
    { name: "The Dog House", provider: "Pragmatic Play", status: "coming", description: "Fun dog-themed slot game", type: "slots", category: "slots", popularity: 86, players: 0, revenue: "$0", rtp: "96.5%", imageUrl: "/api/placeholder/400/300?text=The+Dog+House" },
    { name: "Age of Gods", provider: "Playtech", status: "coming", description: "Progressive jackpot mythology series", type: "slots", category: "jackpot", popularity: 93, players: 0, revenue: "$0", rtp: "95.0%", imageUrl: "/api/placeholder/400/300?text=Age+of+Gods" },
    { name: "Gladiator Jackpot", provider: "Playtech", status: "coming", description: "Epic Roman-themed progressive slot", type: "slots", category: "jackpot", popularity: 88, players: 0, revenue: "$0", rtp: "94.1%", imageUrl: "/api/placeholder/400/300?text=Gladiator+Jackpot" },
    { name: "Book of Dead", provider: "Play'n GO", status: "coming", description: "Egyptian adventure slot", type: "slots", category: "slots", popularity: 89, players: 0, revenue: "$0", rtp: "96.2%", imageUrl: "/api/placeholder/400/300?text=Book+of+Dead" },
    { name: "Reactoonz", provider: "Play'n GO", status: "coming", description: "Alien-themed cluster pays slot", type: "slots", category: "slots", popularity: 85, players: 0, revenue: "$0", rtp: "96.5%", imageUrl: "/api/placeholder/400/300?text=Reactoonz" },
    { name: "Fire Joker", provider: "Play'n GO", status: "coming", description: "Classic fruit slot with respins", type: "slots", category: "slots", popularity: 83, players: 0, revenue: "$0", rtp: "96.2%", imageUrl: "/api/placeholder/400/300?text=Fire+Joker" }
  ];

  const providers = [
    { id: 'all', name: 'All Providers', games: gamesList.length },
    { id: 'gentlemen-originals', name: 'Gentlemen Originals', games: gamesList.filter(g => g.provider === 'Gentlemen Originals').length },
    { id: 'evolution-gaming', name: 'Evolution Gaming', games: gamesList.filter(g => g.provider === 'Evolution Gaming').length },
    { id: 'netent', name: 'NetEnt', games: gamesList.filter(g => g.provider === 'NetEnt').length },
    { id: 'pragmatic-play', name: 'Pragmatic Play', games: gamesList.filter(g => g.provider === 'Pragmatic Play').length },
    { id: 'playtech', name: 'Playtech', games: gamesList.filter(g => g.provider === 'Playtech').length },
    { id: 'playngo', name: "Play'n GO", games: gamesList.filter(g => g.provider === "Play'n GO").length }
  ];

  const gameTypes = [
    { id: 'all', name: 'All Games', icon: Grid3x3 },
    { id: 'originals', name: 'Originals', icon: Crown },
    { id: 'live-casino', name: 'Live Casino', icon: Users },
    { id: 'slots', name: 'Slots', icon: Star },
    { id: 'jackpot', name: 'Jackpots', icon: Trophy }
  ];

  const filteredAndSortedGames = gamesList
    .filter(game => {
      const providerMatch = selectedProvider === 'all' || 
        (selectedProvider === 'gentlemen-originals' && game.provider === 'Gentlemen Originals') ||
        (selectedProvider === 'evolution-gaming' && game.provider === 'Evolution Gaming') ||
        (selectedProvider === 'netent' && game.provider === 'NetEnt') ||
        (selectedProvider === 'pragmatic-play' && game.provider === 'Pragmatic Play') ||
        (selectedProvider === 'playtech' && game.provider === 'Playtech') ||
        (selectedProvider === 'playngo' && game.provider === "Play'n GO");
      const typeMatch = selectedGameType === 'all' || game.category === selectedGameType;
      const searchMatch = searchTerm === '' || 
        game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.provider.toLowerCase().includes(searchTerm.toLowerCase());
      return providerMatch && typeMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'popularity') return b.popularity - a.popularity;
      if (sortBy === 'provider') return a.provider.localeCompare(b.provider);
      return 0;
    });

  return (
    <div className={`min-h-screen bg-gradient-to-br from-[#0f1419] via-[#0f1419] to-[#0f1419] transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Enhanced Navigation Header */}
      <header className="bg-[#0f1419]/95 backdrop-blur-lg shadow-2xl sticky top-0 z-40 border-b border-yellow-500/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link href="/">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <img src={logoPath} alt="GentlemenClub" className="h-12 w-12 relative rounded-full ring-2 ring-yellow-500/50" />
                </div>
                <div className="flex flex-col">
                  <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                    GentlemenClub
                  </span>
                  <span className="text-xs text-gray-400 uppercase tracking-wider">Casino Dashboard</span>
                </div>
              </div>
            </Link>

            {/* Wallet Connection and User Profile */}
            <div className="flex items-center space-x-4">
              <WalletConnect />
              <UserProfileModal />
              <Link href="/">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-transparent border-gray-700 hover:bg-gray-800/50 hover:border-yellow-500/50 transition-all duration-300"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <Grid3x3 className="w-4 h-4" />
              Browse All
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-2">
              <Dice1 className="w-4 h-4" />
              Play Games
            </TabsTrigger>
            <TabsTrigger value="staking" className="flex items-center gap-2">
              <Coins className="w-4 h-4" />
              Staking
            </TabsTrigger>
          </TabsList>

          {/* Browse All Games Tab */}
          <TabsContent value="browse" className="space-y-6">
            {/* Featured Live Game */}
            <Card className="bg-gradient-to-r from-green-900/30 to-gray-900/50 border-green-500/30">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-green-500 rounded-full blur animate-pulse"></div>
                      <Badge className="relative bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm">
                        <span className="relative flex h-2 w-2 mr-1 sm:mr-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        LIVE NOW
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">Gentlemen Dice</h3>
                      <p className="text-xs sm:text-sm text-gray-400">Provably fair dice betting - Play instantly!</p>
                    </div>
                  </div>
                  <Button 
                    onClick={() => handleGameSelect(gamesList[0])}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold w-full sm:w-auto"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Total Games</p>
                      <p className="text-2xl font-bold text-white">{gamesList.length}</p>
                    </div>
                    <Dice1 className="w-8 h-8 text-yellow-400/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Live Games</p>
                      <p className="text-2xl font-bold text-green-400">1</p>
                    </div>
                    <Activity className="w-8 h-8 text-green-400/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Providers</p>
                      <p className="text-2xl font-bold text-white">{providers.length - 1}</p>
                    </div>
                    <Shield className="w-8 h-8 text-blue-400/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Active Players</p>
                      <p className="text-2xl font-bold text-white">247</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-400/50" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filter Controls */}
            <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Search games..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-gray-900/50 border-gray-700 focus:border-yellow-400/50"
                      />
                    </div>
                  </div>

                  {/* Provider Filter */}
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="w-full lg:w-[200px] bg-gray-900/50 border-gray-700">
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name} ({provider.games})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Game Type Filter */}
                  <Select value={selectedGameType} onValueChange={setSelectedGameType}>
                    <SelectTrigger className="w-full lg:w-[180px] bg-gray-900/50 border-gray-700">
                      <SelectValue placeholder="Game type" />
                    </SelectTrigger>
                    <SelectContent>
                      {gameTypes.map(type => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Sort By */}
                  <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                    <SelectTrigger className="w-full lg:w-[150px] bg-gray-900/50 border-gray-700">
                      <SortAsc className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Name</SelectItem>
                      <SelectItem value="popularity">Popularity</SelectItem>
                      <SelectItem value="provider">Provider</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode Toggle */}
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="bg-gray-900/50 border-gray-700"
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="bg-gray-900/50 border-gray-700"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Games Display */}
            {isLoadingGames ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <GameCardSkeleton key={i} />
                ))}
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedGames.map((game, index) => (
                  <Card key={index} className="game-card group hover:scale-105 transition-all duration-300 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-yellow-400/50">
                    <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 rounded-t-lg overflow-hidden">
                      <img 
                        src={game.imageUrl} 
                        alt={game.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                        <Dice1 className="w-16 h-16 text-gray-600" />
                      </div>
                      {game.status === 'live' && (
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-500 text-white">
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                            </span>
                            LIVE
                          </Badge>
                        </div>
                      )}
                      {game.status === 'coming' && (
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary">Coming Soon</Badge>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        {game.status === 'live' ? (
                          <Button 
                            onClick={() => handleGameSelect(game)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Play Now
                          </Button>
                        ) : (
                          <Badge variant="outline" className="text-white border-white">
                            <Calendar className="w-4 h-4 mr-2" />
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{game.provider}</p>
                      <p className="text-xs text-gray-500 mb-3">{game.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">RTP: {game.rtp}</span>
                        {game.status === 'live' && (
                          <span className="text-green-400">{game.players} playing</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAndSortedGames.map((game, index) => (
                  <Card key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700/50 hover:border-yellow-400/50 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg overflow-hidden">
                            <img 
                              src={game.imageUrl} 
                              alt={game.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{game.name}</h3>
                            <p className="text-sm text-gray-400">{game.provider} • {game.description}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-gray-500">RTP: {game.rtp}</span>
                              <span className="text-xs text-gray-500">Popularity: {game.popularity}%</span>
                              {game.status === 'live' && (
                                <span className="text-xs text-green-400">{game.players} playing</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {game.status === 'live' ? (
                            <>
                              <Badge className="bg-green-500 text-white">
                                <span className="relative flex h-2 w-2 mr-1">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                </span>
                                LIVE
                              </Badge>
                              <Button 
                                onClick={() => handleGameSelect(game)}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Play
                              </Button>
                            </>
                          ) : (
                            <Badge variant="secondary">
                              <Calendar className="w-4 h-4 mr-2" />
                              Coming Soon
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Play Games Tab - Shows selected game or dice game */}
          <TabsContent value="games" className="space-y-6 animate-fade-in">
            {account ? (
              <div className="space-y-4">
                {/* Back to Browse button when a game is selected */}
                {selectedGame && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedGame(null);
                      setActiveTab('browse');
                    }}
                    className="mb-4"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Browse Games
                  </Button>
                )}
                
                {/* Display selected game or default to Dice Game */}
                {selectedGame ? (
                  <div className="space-y-4">
                    <Card className="luxury-card">
                      <CardHeader>
                        <CardTitle className="text-2xl font-playfair">
                          {selectedGame.name}
                        </CardTitle>
                        <p className="text-gray-400">by {selectedGame.provider}</p>
                      </CardHeader>
                      <CardContent>
                        {selectedGame.name === "Gentlemen Dice" ? (
                          <DiceGame />
                        ) : (
                          <div className="text-center py-12">
                            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-400/50" />
                            <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                            <p className="text-gray-400">
                              {selectedGame.name} will be available in the next update.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ) : (
                  // Default to showing Dice Game when no game is selected
                  <div>
                    <h2 className="text-2xl font-playfair mb-4">Quick Play - Gentlemen Dice</h2>
                    <DiceGame />
                  </div>
                )}
              </div>
            ) : (
              <Card className="luxury-card">
                <CardContent className="p-12 text-center">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-yellow-400/50" />
                  <h3 className="text-2xl font-playfair mb-2">Connect Wallet to Play</h3>
                  <p className="text-gray-400 mb-6">
                    Connect your wallet to access provably fair gaming
                  </p>
                  <WalletConnect />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Staking Tab */}
          <TabsContent value="staking" className="space-y-6 animate-fade-in">
            {account ? (
              <StakingDashboard />
            ) : (
              <Card className="luxury-card">
                <CardContent className="p-12 text-center">
                  <Lock className="w-16 h-16 mx-auto mb-4 text-yellow-400/50" />
                  <h3 className="text-2xl font-playfair mb-2">Connect Wallet to Stake</h3>
                  <p className="text-gray-400 mb-6">
                    Connect your wallet to stake GTLM tokens and earn rewards
                  </p>
                  <WalletConnect />
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>


    </div>
  );
}