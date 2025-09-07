import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Diamond, 
  Gem, 
  Zap, 
  Star, 
  TrendingUp, 
  Users, 
  Coins,
  BarChart3,
  Activity,
  Heart,
  Eye,
  ShoppingCart,
  Filter,
  Grid3X3,
  ArrowRight,
  Award,
  Target
} from "lucide-react";
import WalletConnect from "@/components/wallet-connect";
import UserProfileModal from "@/components/user-profile-modal";
import { useWeb3 } from "@/hooks/use-web3";
import logoPath from "@assets/newlogo_1753369626128.jpeg";
import emeraldKeyPath from "@assets/generated_images/Emerald_Key_NFT_6ce86085.png";

export default function NFTCollection() {
  const { account } = useWeb3();
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const nftCollection = [
    {
      id: 1,
      name: "Distinguished Founder #001",
      rarity: "Legendary",
      price: "5.0 ETH",
      image: "/src/assets/generated_images/Founder_Tier_NFT_Card_9bd5b90c.png",
      traits: ["Golden Regalia", "Diamond Authority", "Founding Member"],
      tier: "Founder",
      benefits: ["Maximum governance voting power", "35% Revenue Share", "Exclusive access to private events"]
    },
    {
      id: 2,
      name: "Distinguished Elite #002", 
      rarity: "Epic",
      price: "2.5 ETH",
      image: "/src/assets/generated_images/Elite_Tier_NFT_Card_f8d23b75.png",
      traits: ["Platinum Insignia", "Sapphire Authority", "Elite Status"],
      tier: "Elite",
      benefits: ["Enhanced governance rights", "25% Revenue Share", "Access to premium features"]
    },
    {
      id: 3,
      name: "Distinguished Noble #003",
      rarity: "Rare", 
      price: "1.0 ETH",
      image: "/src/assets/generated_images/Noble_Tier_NFT_Card_ea582732.png",
      traits: ["Gold Medallion", "Emerald Authority", "Noble Status"],
      tier: "Noble",
      benefits: ["Standard governance participation", "15% Revenue Share", "Community access"]
    },
    {
      id: 4,
      name: "Distinguished Member #004",
      rarity: "Common",
      price: "0.8 ETH", 
      image: "/api/placeholder/300/300",
      traits: ["Silver Badge", "Ruby Authority", "Member Status"],
      tier: "Member",
      benefits: ["Basic Voting", "10% Revenue Share", "Standard Access"]
    },
    {
      id: 5,
      name: "Distinguished Patron #005",
      rarity: "Epic",
      price: "3.1 ETH",
      image: "/api/placeholder/300/300", 
      traits: ["Crystal Emblem", "Amethyst Authority", "Patron Status"],
      tier: "Patron",
      benefits: ["Enhanced Voting", "25% Revenue Share", "Exclusive Lounge"]
    },
    {
      id: 6,
      name: "Distinguished Guardian #006",
      rarity: "Legendary",
      price: "4.7 ETH",
      image: "/api/placeholder/300/300",
      traits: ["Obsidian Crown", "Topaz Authority", "Guardian Status"],
      tier: "Guardian", 
      benefits: ["Full DAO Control", "35% Revenue Share", "Private Gaming"]
    },
    {
      id: 7,
      name: "The Emerald Key",
      rarity: "Legendary",
      price: "6.5 ETH",
      image: emeraldKeyPath,
      traits: ["Blockchain Circuit", "Ancient Authority", "Master Access"],
      tier: "Keymaster",
      benefits: ["Ultimate governance control", "40% Revenue Share", "Exclusive vault access", "Private society privileges"]
    }
  ];

  return (
    <div className="min-h-screen w-full text-white relative"
         style={{
           background: 'linear-gradient(135deg, var(--gentlemen-primary) 0%, var(--gentlemen-secondary) 100%)',
           backgroundAttachment: 'fixed',
           backgroundSize: 'cover',
           backgroundRepeat: 'no-repeat'
         }}>
      <div id="top"></div>
      
      {/* Header */}
      <header className="luxury-card border-b border-yellow-600/30 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4 hover-lift">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--gentlemen-gold)] rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-100 heading-playfair">Brand Identity Collection</h1>
                  <p className="text-xs text-gray-300 body-inter">Exclusive Brand Collection</p>
                </div>
              </div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-300 hover:text-[var(--gentlemen-gold)] transition-colors body-inter">Home</Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-[var(--gentlemen-gold)] transition-colors body-inter">Casino</Link>
              <Link href="/nft-collection" className="text-[var(--gentlemen-gold)] font-semibold body-inter">Brand Identity Collection</Link>
            </nav>

            <div className="flex items-center space-x-4">
              {account && <UserProfileModal />}
              <WalletConnect />
              <Button className="btn-luxury-enhanced">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Marketplace
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className={`transition-all duration-1000 delay-300 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          
          {/* Hero Section */}
          <section className="gentlemen-section text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-100 mb-8 heading-playfair">
              The Gentlemen's Brand Identity Collection
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-12 body-inter">
              Own a piece of the exclusive Gentlemen's Club. Each NFT grants special privileges, 
              voting rights, and revenue sharing in our premium gaming ecosystem.
            </p>

            {/* Collection Stats */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <Diamond className="w-10 h-10 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-100 heading-playfair">1,000</div>
                <div className="text-sm text-gray-300 body-inter mt-2">Total Supply</div>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <Users className="w-10 h-10 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-100 heading-playfair">847</div>
                <div className="text-sm text-gray-300 body-inter mt-2">Unique Owners</div>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <TrendingUp className="w-10 h-10 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-100 heading-playfair">2.5 ETH</div>
                <div className="text-sm text-gray-300 body-inter mt-2">Floor Price</div>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <BarChart3 className="w-10 h-10 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-100 heading-playfair">1,247 ETH</div>
                <div className="text-sm text-gray-300 body-inter mt-2">Total Volume</div>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* NFT Grid */}
          <section className="gentlemen-section mb-16">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <h3 className="text-3xl font-bold text-gray-100 heading-playfair">
                Featured Collection
              </h3>
              
              {/* Filter Controls */}
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-[var(--gentlemen-gold)]" />
                  <span className="text-gray-300 text-sm">Filter by:</span>
                </div>
                
                <div className="flex space-x-2">
                  {["all", "Legendary", "Epic", "Rare", "Common"].map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilter === filter ? "default" : "outline"}
                      size="sm"
                      className={selectedFilter === filter ? "btn-luxury-primary" : "btn-luxury-outline text-xs"}
                      onClick={() => setSelectedFilter(filter)}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-10">
              {nftCollection
                .filter(nft => selectedFilter === "all" || nft.rarity === selectedFilter)
                .map((nft, index) => (
                <Card key={nft.id} className={`luxury-card border border-yellow-600/30 transition-all duration-500 delay-${index * 100}`}>
                  <div className="relative">
                    <img 
                      src={nft.image} 
                      alt={nft.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    <Badge className={`absolute top-4 right-4 ${
                      nft.rarity === 'Legendary' ? 'bg-yellow-500' :
                      nft.rarity === 'Epic' ? 'bg-purple-500' : 'bg-blue-500'
                    } text-black font-bold`}>
                      {nft.rarity}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <h4 className="text-xl font-bold text-gray-100 mb-2 heading-playfair">{nft.name}</h4>
                    <div className="text-2xl font-bold text-[var(--gentlemen-gold)] mb-4 body-inter">{nft.price}</div>
                    
                    {/* Traits */}
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-300 mb-2">Traits:</div>
                      <div className="flex flex-wrap gap-1">
                        {nft.traits.map((trait, i) => (
                          <Badge key={i} variant="outline" className="border-yellow-600/30 text-yellow-400 text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    {/* Benefits */}
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-gray-300 mb-2">Member Benefits:</div>
                      <div className="space-y-1">
                        {nft.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center text-xs text-gray-200">
                            <Award className="w-3 h-3 text-[var(--gentlemen-gold)] mr-2" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button className="flex-1 btn-luxury-enhanced">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                      <Button variant="outline" className="btn-luxury-outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <div className="section-divider"></div>

          {/* Utility Section */}
          <section className="gentlemen-section text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-100 mb-8 heading-playfair">
              Brand Identity Holder Benefits
            </h3>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <Crown className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-100 mb-4 heading-playfair">Governance Rights</h4>
                <p className="text-gray-200 body-inter">Vote on platform decisions and shape the future of The Gentlemen's Club</p>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <Coins className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-100 mb-4 heading-playfair">Revenue Sharing</h4>
                <p className="text-gray-200 body-inter">Receive a portion of platform profits distributed to Brand Identity holders</p>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-8 text-center">
                <Star className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-100 mb-4 heading-playfair">Exclusive Access</h4>
                <p className="text-gray-200 body-inter">Early access to new games, features, and exclusive events</p>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* Roadmap Section */}
          <section className="gentlemen-section text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-100 mb-8 heading-playfair">
              Collection Roadmap
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="luxury-card border border-yellow-600/30 p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-100 mb-2 heading-playfair">Phase 1: Launch</h4>
                <div className="text-sm text-green-400 mb-2">COMPLETED</div>
                <p className="text-gray-200 text-sm body-inter">Initial collection launch with 1,000 unique Brand Identity NFTs</p>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-100 mb-2 heading-playfair">Phase 2: Community</h4>
                <div className="text-sm text-blue-400 mb-2">IN PROGRESS</div>
                <p className="text-gray-200 text-sm body-inter">DAO governance activation and holder-exclusive events</p>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Coins className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-100 mb-2 heading-playfair">Phase 3: Utility</h4>
                <div className="text-sm text-purple-400 mb-2">Q4 2025</div>
                <p className="text-gray-200 text-sm body-inter">Revenue sharing implementation and staking rewards</p>
              </div>
              
              <div className="luxury-card border border-yellow-600/30 p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-100 mb-2 heading-playfair">Phase 4: Expansion</h4>
                <div className="text-sm text-orange-400 mb-2">Q1 2026</div>
                <p className="text-gray-200 text-sm body-inter">Metaverse integration and exclusive gaming experiences</p>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* Minting Information */}
          <section className="gentlemen-section text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-100 mb-8 heading-playfair">
              Minting Information
            </h3>
            
            <div className="max-w-4xl mx-auto luxury-card border border-yellow-600/30 p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-100 mb-4 heading-playfair">Collection Details</h4>
                  <div className="space-y-3 text-gray-200 body-inter">
                    <div className="flex justify-between">
                      <span>Total Supply:</span>
                      <span className="text-[var(--gentlemen-gold)]">1,000 NFTs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Mint Price:</span>
                      <span className="text-[var(--gentlemen-gold)]">0.08 ETH</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Max Per Wallet:</span>
                      <span className="text-[var(--gentlemen-gold)]">5 NFTs</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Royalties:</span>
                      <span className="text-[var(--gentlemen-gold)]">5%</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-left">
                  <h4 className="text-xl font-bold text-gray-100 mb-4 heading-playfair">Rarity Distribution</h4>
                  <div className="space-y-3 text-gray-200 body-inter">
                    <div className="flex justify-between">
                      <span>Legendary:</span>
                      <span className="text-yellow-400">50 (5%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Epic:</span>
                      <span className="text-purple-400">150 (15%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rare:</span>
                      <span className="text-blue-400">300 (30%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Common:</span>
                      <span className="text-gray-400">500 (50%)</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button className="btn-nft-mint mr-4">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Mint Now
                </Button>
                <Button className="btn-nft-opensea">
                  <Eye className="w-4 h-4 mr-2" />
                  View on OpenSea
                </Button>
              </div>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* Navigation Footer */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button className="btn-luxury-enhanced mr-4">
                <ArrowRight className="w-4 h-4 mr-2" />
                Enter Casino
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="btn-luxury-outline">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}