import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { Crown, Menu, X } from 'lucide-react';
import { useWeb3 } from '@/hooks/use-web3';
import WalletConnect from '@/components/wallet-connect';

export function BootstrapEnhancedNav() {
  const [, navigate] = useLocation();
  const { account } = useWeb3();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsCollapsed(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-dark text-white py-2 sticky-top" style={{ 
      background: 'linear-gradient(90deg, #1a202c 0%, #2d3748 50%, #1a202c 100%) !important',
      borderBottom: '1px solid rgba(16, 185, 129, 0.2)',
      backdropFilter: 'blur(10px)'
    }}>
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark p-0">
          {/* Brand */}
          <button 
            className="navbar-brand btn btn-link text-decoration-none p-0 border-0 text-white"
            onClick={() => handleNavigation('/')}
            style={{ background: 'transparent' }}
          >
            <div className="d-flex align-items-center">
              <div className="p-2 rounded me-2" style={{ 
                background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                display: 'inline-flex'
              }}>
                <Crown className="w-6 h-6" style={{ color: '#1f2937' }} />
              </div>
              <div className="d-none d-sm-block">
                <div className="fw-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>
                  GENTLEMEN'S CLUB
                </div>
                <div className="small text-warning text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                  Licensed GambleFi DAO
                </div>
              </div>
            </div>
          </button>

          {/* Mobile Toggle */}
          <button 
            className="navbar-toggler border-0 p-2" 
            type="button" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Toggle navigation"
            style={{ boxShadow: 'none' }}
          >
            {isCollapsed ? (
              <Menu className="w-6 h-6" />
            ) : (
              <X className="w-6 h-6" />
            )}
          </button>

          {/* Navigation Menu */}
          <div className={`collapse navbar-collapse ${!isCollapsed ? 'show' : ''}`}>
            <ul className="navbar-nav ms-auto me-3">
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none border-0 bg-transparent px-3 py-2"
                  onClick={() => handleNavigation('/')}
                  style={{ background: 'transparent !important' }}
                >
                  Home
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none border-0 bg-transparent px-3 py-2"
                  onClick={() => handleNavigation('/dashboard')}
                  style={{ background: 'transparent !important' }}
                >
                  Casino
                  <span className="badge bg-success ms-1 small">Live</span>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none border-0 bg-transparent px-3 py-2"
                  onClick={() => handleNavigation('/nft-collection')}
                  style={{ background: 'transparent !important' }}
                >
                  Collection
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none border-0 bg-transparent px-3 py-2"
                  onClick={() => handleNavigation('/bootstrap-demo')}
                  style={{ background: 'transparent !important' }}
                >
                  Bootstrap
                  <span className="badge bg-info ms-1 small">New</span>
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className="nav-link btn btn-link text-white text-decoration-none border-0 bg-transparent px-3 py-2"
                  onClick={() => handleNavigation('/eligibility')}
                  style={{ background: 'transparent !important' }}
                >
                  Eligibility
                </button>
              </li>
            </ul>

            {/* Wallet Connect */}
            <div className="d-flex">
              <WalletConnect />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}