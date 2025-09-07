import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Menu, X, Home, Gamepad2, Coins, Shield, Users, ChevronRight, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useWeb3 } from '@/hooks/use-web3';
import WalletConnect from '@/components/wallet-connect';
import UserProfileModal from '@/components/user-profile-modal';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  description?: string;
  badge?: string;
  isExternal?: boolean;
}

const navigationItems: NavItem[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
    description: 'Platform overview and features'
  },
  {
    href: '/dashboard',
    label: 'Casino',
    icon: <Gamepad2 className="w-5 h-5" />,
    description: 'Gaming hub and live games',
    badge: 'Live'
  },
  {
    href: '/nft-collection',
    label: 'Collection',
    icon: <Crown className="w-5 h-5" />,
    description: 'NFT collection and branding'
  },
  {
    href: '/bootstrap-demo',
    label: 'Bootstrap',
    icon: <Zap className="w-5 h-5" />,
    description: 'Bootstrap integration showcase',
    badge: 'New'
  },
  {
    href: '/eligibility',
    label: 'Eligibility',
    icon: <Shield className="w-5 h-5" />,
    description: 'Compliance verification'
  }
];

export function EnhancedNavigation() {
  const [location, navigate] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { account } = useWeb3();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    navigate(href);
    setIsOpen(false);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (href: string) => {
    if (href === '/') return location === '/';
    return location.startsWith(href);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 shadow-xl' 
          : 'bg-transparent'
        }
      `}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo Section */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => handleNavigation('/')}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <Crown className="w-6 h-6 text-gray-900" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white font-playfair group-hover:text-yellow-400 transition-colors">
                  GENTLEMEN'S CLUB
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-wider">
                  Licensed GambleFi DAO
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => handleNavigation(item.href)}
                  className={`
                    relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(item.href)
                      ? 'text-yellow-400 bg-yellow-400/10 shadow-lg'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-800/50'
                    }
                  `}
                >
                  <div className="flex items-center gap-2">
                    {item.icon}
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {account && (
                <div className="hidden sm:block">
                  <UserProfileModal />
                </div>
              )}
              <WalletConnect />
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-gray-300 hover:text-yellow-400 p-2"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-gray-900/95 backdrop-blur-sm">
          <div className="pt-20 px-4">
            <div className="bg-gray-800/90 rounded-xl p-6 max-w-sm mx-auto">
              <h2 className="text-lg font-semibold text-white mb-4 font-playfair">
                Navigation
              </h2>
              
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.href}
                    onClick={() => handleNavigation(item.href)}
                    className={`
                      w-full flex items-center justify-between p-4 rounded-lg text-left transition-all duration-200
                      ${isActive(item.href)
                        ? 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
                        : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <div>
                        <div className="font-medium flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-400 text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </div>

              {account && (
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <UserProfileModal />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content overlap */}
      <div className="h-16 sm:h-20" />
    </>
  );
}