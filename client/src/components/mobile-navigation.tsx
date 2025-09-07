import { useState, useEffect } from "react";
import { Link } from "wouter";
import { X, Menu, Home, Crown, Trophy, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/hooks/use-web3";

interface MobileNavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileNavigation({ isOpen, onToggle }: MobileNavigationProps) {
  const { account } = useWeb3();

  const navigationItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Casino", icon: Crown },
    { href: "/nft-collection", label: "Brand Collection", icon: Trophy },
    { href: "/eligibility", label: "Eligibility", icon: Shield },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      onToggle(); // Close menu after navigation
    }
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-300 hover:text-yellow-400 p-2 focus-ring"
          onClick={onToggle}
          aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
          data-testid="button-mobile-menu"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onToggle}
          role="button"
          tabIndex={0}
          aria-label="Close mobile menu"
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={`
        fixed top-0 right-0 h-full w-80 max-w-[90vw] 
        luxury-glass border-l border-yellow-600/20 z-50 
        transform transition-transform duration-300 ease-in-out md:hidden
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-playfair">Menu</h3>
                <p className="text-xs text-amber-400">Navigation</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-yellow-400 focus-ring"
              onClick={onToggle}
              aria-label="Close mobile menu"
              data-testid="button-close-mobile-menu"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-2 mb-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onToggle}
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/30 transition-colors focus-ring"
                  data-testid={`link-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-inter">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Section Quick Links */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 font-inter">
              Quick Access
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => scrollToSection('tokenomics')}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/30 transition-colors w-full text-left focus-ring"
                data-testid="button-tokenomics"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-inter">Treasury</span>
              </button>
              <button
                onClick={() => scrollToSection('governance')}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/30 transition-colors w-full text-left focus-ring"
                data-testid="button-governance"
              >
                <Crown className="w-5 h-5" />
                <span className="font-inter">DAO Governance</span>
              </button>
              <button
                onClick={() => scrollToSection('staking')}
                className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-gray-800/30 transition-colors w-full text-left focus-ring"
                data-testid="button-staking"
              >
                <Trophy className="w-5 h-5" />
                <span className="font-inter">Token Staking</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-gray-700/50">
            {account ? (
              <Link href="/dashboard" onClick={onToggle}>
                <Button className="w-full btn-luxury-primary" data-testid="button-enter-club">
                  <Crown className="w-4 h-4 mr-2" />
                  ENTER THE CLUB
                </Button>
              </Link>
            ) : (
              <p className="text-center text-gray-400 text-sm font-inter">
                Connect wallet to access exclusive features
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}