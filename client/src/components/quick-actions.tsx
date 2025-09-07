import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Zap, 
  Coins, 
  Vote, 
  Trophy, 
  Shield, 
  TrendingUp, 
  Users, 
  Settings,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Crown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useWeb3 } from '@/hooks/use-web3';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  path?: string;
  action?: () => void;
  badge?: string;
  isExternal?: boolean;
  requiresWallet?: boolean;
}

export function QuickActions() {
  const { account } = useWeb3();
  const [, navigate] = useLocation();
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const quickActions: QuickAction[] = [
    {
      id: 'gaming',
      title: 'Gaming Hub',
      description: 'Access premium games and live casino',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600',
      path: '/dashboard',
      badge: 'Live'
    },
    {
      id: 'staking',
      title: 'Token Staking',
      description: 'Stake GTLM and earn rewards',
      icon: <Coins className="w-6 h-6" />,
      color: 'from-yellow-500 to-yellow-600',
      path: '/dashboard#staking',
      badge: '30% APY',
      requiresWallet: true
    },
    {
      id: 'governance',
      title: 'DAO Voting',
      description: 'Participate in platform decisions',
      icon: <Vote className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      path: '/dashboard#governance',
      requiresWallet: true
    },
    {
      id: 'collection',
      title: 'NFT Collection',
      description: 'Mint exclusive Gentlemen NFTs',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      path: '/nft-collection',
      badge: 'New'
    },
    {
      id: 'eligibility',
      title: 'Verify Status',
      description: 'Check gaming eligibility',
      icon: <Shield className="w-6 h-6" />,
      color: 'from-gray-500 to-gray-600',
      path: '/eligibility'
    },
    {
      id: 'analytics',
      title: 'Live Stats',
      description: 'Platform performance metrics',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-orange-500 to-orange-600',
      path: '/dashboard#analytics'
    }
  ];

  const handleAction = (action: QuickAction) => {
    if (action.requiresWallet && !account) {
      // Trigger wallet connection or show message
      return;
    }

    if (action.action) {
      action.action();
    } else if (action.path) {
      if (action.isExternal) {
        window.open(action.path, '_blank');
      } else {
        navigate(action.path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4 font-playfair">
          Quick Actions
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto font-inter">
          Access key platform features with a single click. Get started with gaming, staking, or governance.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action) => {
          const isDisabled = action.requiresWallet && !account;
          
          return (
            <Card 
              key={action.id}
              className={`
                luxury-card cursor-pointer transition-colors duration-200 group
                ${hoveredAction === action.id ? 'border-yellow-400/40' : ''}
                ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
              onMouseEnter={() => setHoveredAction(action.id)}
              onMouseLeave={() => setHoveredAction(null)}
              onClick={() => !isDisabled && handleAction(action)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center
                    bg-gradient-to-r ${action.color}
                  `}>
                    <div className="text-white">
                      {action.icon}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {action.badge && (
                      <Badge className="bg-emerald-500/20 text-emerald-400 text-xs">
                        {action.badge}
                      </Badge>
                    )}
                    {action.requiresWallet && !account && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400/30 text-xs">
                        <Crown className="w-3 h-3 mr-1" />
                        Wallet Required
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-white group-hover:to-gray-300 transition-all duration-300 font-playfair">
                    {action.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed font-inter">
                    {action.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    {action.isExternal && (
                      <div className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        External
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center text-gray-400 group-hover:text-white transition-colors">
                    <span className="text-sm mr-2">Go</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Call-to-Action Section */}
      <Card className="luxury-card bg-gradient-to-r from-emerald-900/20 to-yellow-900/20 border-emerald-500/30">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-yellow-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-4 font-playfair">
            Ready to Join the Elite?
          </h3>
          
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto font-inter">
            Connect your wallet to access exclusive gaming features, earn governance tokens, 
            and become part of the most sophisticated DeFi gaming community.
          </p>

          {!account ? (
            <Button 
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-yellow-600 hover:from-emerald-700 hover:to-yellow-700 text-white font-semibold px-8 py-4"
              onClick={() => handleAction({ id: 'connect', title: '', description: '', icon: null, color: '', path: '/dashboard' })}
            >
              <Crown className="w-5 h-5 mr-3" />
              Connect Wallet & Start
            </Button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-semibold px-6 py-3"
                onClick={() => navigate('/dashboard')}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Enter Gaming Hub
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-400 hover:bg-yellow-500/10 font-semibold px-6 py-3"
                onClick={() => navigate('/nft-collection')}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                View Collection
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}