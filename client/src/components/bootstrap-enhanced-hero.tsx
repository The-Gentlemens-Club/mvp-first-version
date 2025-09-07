import React from 'react';
import { Crown, Star, ArrowRight } from 'lucide-react';
import { useWeb3 } from '@/hooks/use-web3';
import { useLocation } from 'wouter';

export function BootstrapEnhancedHero() {
  const { account } = useWeb3();
  const [, navigate] = useLocation();

  return (
    <section className="hero bg-dark text-white text-center py-5" style={{ 
      background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 50%, #1a202c 100%)',
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Badge */}
            <div className="mb-4">
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
                <Star className="w-4 h-4 me-2" style={{ display: 'inline', verticalAlign: 'middle' }} />
                Licensed GambleFi DAO Platform
              </span>
            </div>

            {/* Main Title */}
            <h1 className="display-4 font-playfair mb-4" style={{ 
              background: 'linear-gradient(45deg, #f59e0b, #d97706)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: '700'
            }}>
              Welcome to the Gentlemen's Club
            </h1>

            {/* Subtitle */}
            <p className="lead mb-4 font-roboto" style={{ fontSize: '1.5rem', color: '#e5e7eb' }}>
              An exclusive decentralized gaming society built with blockchain precision and luxury craftsmanship.
            </p>

            {/* Description */}
            <p className="mb-5 font-roboto" style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
              Experience premium gaming, earn governance tokens, and shape the future of decentralized entertainment.
            </p>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
              {account ? (
                <button 
                  className="btn btn-warning btn-lg px-4 py-3 fw-bold"
                  onClick={() => navigate('/dashboard')}
                  style={{ 
                    background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
                    color: '#1f2937'
                  }}
                >
                  <Crown className="w-5 h-5 me-2" style={{ display: 'inline', verticalAlign: 'middle' }} />
                  ENTER THE CLUB
                  <ArrowRight className="w-5 h-5 ms-2" style={{ display: 'inline', verticalAlign: 'middle' }} />
                </button>
              ) : (
                <>
                  <button 
                    className="btn btn-success btn-lg px-4 py-3 fw-bold"
                    onClick={() => navigate('/dashboard')}
                    style={{ 
                      background: 'linear-gradient(45deg, #10b981, #059669)',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    EXPLORE PLATFORM
                  </button>
                  <button 
                    className="btn btn-outline-warning btn-lg px-4 py-3 fw-bold"
                    onClick={() => navigate('/nft-collection')}
                    style={{ 
                      borderColor: '#f59e0b',
                      color: '#f59e0b',
                      borderWidth: '2px'
                    }}
                  >
                    VIEW COLLECTION
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row mt-5 pt-4" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div className="col-6 col-md-3 text-center mb-3">
            <div className="h3 text-warning fw-bold mb-1">$2.4M</div>
            <div className="text-muted small text-uppercase">Total Volume</div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <div className="h3 text-success fw-bold mb-1">15,240</div>
            <div className="text-muted small text-uppercase">Active Users</div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <div className="h3 text-info fw-bold mb-1">$180K</div>
            <div className="text-muted small text-uppercase">Total Rewards</div>
          </div>
          <div className="col-6 col-md-3 text-center mb-3">
            <div className="h3 text-danger fw-bold mb-1">42</div>
            <div className="text-muted small text-uppercase">Games Live</div>
          </div>
        </div>
      </div>
    </section>
  );
}