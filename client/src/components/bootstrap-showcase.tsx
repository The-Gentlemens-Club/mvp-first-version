import React, { useState } from 'react';
import { Crown, Star, Trophy, Shield, Coins, Users, Zap, Award, Info } from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BootstrapModal, BootstrapToast, BootstrapCarousel, BootstrapAccordion } from './bootstrap-integration';
import { EnhancedFormDemo } from './enhanced-form-demo';
import { FlaskIntegrationDemo } from './flask-integration-demo';
import { EnhancedFormValidation } from './enhanced-form-validation';
import { InvestorLanding } from './investor-landing';

// Bootstrap integration - using unified declaration

export function BootstrapShowcase() {
  const [toastCount, setToastCount] = useState(0);

  const showToast = (variant: 'success' | 'danger' | 'warning' | 'info', title: string, message: string) => {
    const toastId = `toast-${Date.now()}`;
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    const toastDiv = document.createElement('div');
    toastDiv.innerHTML = `
      <div class="toast align-items-center text-bg-${variant} border-0" id="${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${title}</strong> ${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    
    toastContainer.appendChild(toastDiv.firstElementChild!);
    
    const toast = new (window as any).bootstrap.Toast(document.getElementById(toastId));
    toast.show();
  };

  const createToastContainer = () => {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '11';
    document.body.appendChild(container);
    return container;
  };

  const carouselItems = [
    {
      src: '/api/placeholder/800/400',
      alt: 'Gaming Hub',
      caption: 'Premium Gaming Experience',
      description: 'Access exclusive games with provably fair mechanics'
    },
    {
      src: '/api/placeholder/800/400',
      alt: 'Token Staking',
      caption: 'Earn Rewards',
      description: 'Stake GTLM tokens and earn 30% APY rewards'
    },
    {
      src: '/api/placeholder/800/400',
      alt: 'DAO Governance',
      caption: 'Community Driven',
      description: 'Vote on platform decisions and shape the future'
    },
    {
      src: '/api/placeholder/800/400',
      alt: 'NFT Collection',
      caption: 'Exclusive NFTs',
      description: 'Mint limited edition Gentlemen NFTs'
    }
  ];

  const accordionItems = [
    {
      title: 'What is the Gentlemen\'s Club?',
      content: (
        <div>
          <p className="mb-3">
            The Gentlemen's Club is a sophisticated GambleFi DAO platform that combines blockchain gaming, 
            token economics, and decentralized governance into a premium gaming experience.
          </p>
          <div className="d-flex align-items-center gap-2">
            <Crown className="w-4 h-4 text-warning" />
            <span>Licensed & Regulated Platform</span>
          </div>
        </div>
      ),
      expanded: true
    },
    {
      title: 'How does token staking work?',
      content: (
        <div>
          <p className="mb-3">
            Stake your GTLM tokens to earn a share of platform revenues. We distribute 30% of all profits 
            back to token holders based on their staking amount and duration.
          </p>
          <div className="row g-2">
            <div className="col-md-4">
              <div className="bg-success bg-opacity-10 p-2 rounded text-center">
                <Coins className="w-5 h-5 mx-auto mb-1 text-success" />
                <div className="fw-bold">30% APY</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-warning bg-opacity-10 p-2 rounded text-center">
                <Shield className="w-5 h-5 mx-auto mb-1 text-warning" />
                <div className="fw-bold">Secure</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-info bg-opacity-10 p-2 rounded text-center">
                <Zap className="w-5 h-5 mx-auto mb-1 text-info" />
                <div className="fw-bold">Auto-compound</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'What are the DAO governance features?',
      content: (
        <div>
          <p className="mb-3">
            Token holders can participate in platform governance by creating and voting on proposals 
            that affect platform operations, game additions, and revenue distribution.
          </p>
          <ul className="list-unstyled">
            <li className="d-flex align-items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-primary" />
              <span>Vote on new game integrations</span>
            </li>
            <li className="d-flex align-items-center gap-2 mb-2">
              <Users className="w-4 h-4 text-success" />
              <span>Propose platform improvements</span>
            </li>
            <li className="d-flex align-items-center gap-2">
              <Award className="w-4 h-4 text-warning" />
              <span>Influence revenue distribution</span>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="bg-light min-vh-100">
      {/* Bootstrap Navigation Header */}
      <header className="bg-dark text-white py-3">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-dark">
            <a className="navbar-brand" href="#" style={{ textDecoration: 'none' }}>
              <img src="/logo.svg" alt="Gentlemen Club Logo" width="150" height="50" />
            </a>
            <div className="navbar-nav ms-auto">
              <span className="badge text-dark" style={{ backgroundColor: 'var(--bs-secondary)' }}>
                Bootstrap Integration
              </span>
            </div>
          </nav>
        </div>
      </header>

      {/* Bootstrap Hero Section */}
      <section className="hero text-white text-center py-5" style={{ backgroundColor: 'var(--bs-primary)' }}>
        <div className="container">
          <div className="mb-3">
            <i className="fas fa-crown fa-3x animate-on-load fa-bounce-custom" style={{ color: 'var(--bs-secondary)' }}></i>
          </div>
          <h1 className="hero display-4 font-playfair fade-in">Welcome to the Gentlemen Club</h1>
          <p className="lead fade-in-delayed">
            <i className="fab fa-font-awesome me-2"></i>
            An exclusive community built with Bootstrap precision and Font Awesome flair.
          </p>
          <button className="btn btn-lg fade-in-slow" style={{ 
            backgroundColor: 'var(--bs-secondary)', 
            borderColor: 'var(--bs-secondary)',
            color: '#1a2b3c'
          }}>
            <i className="fas fa-crown me-2"></i>
            Join Now
            <i className="fas fa-arrow-right ms-2"></i>
          </button>
          
          {/* Feature Icons Row */}
          <div className="row mt-5 pt-3">
            <div className="col-6 col-md-3 fade-in">
              <i className="fab fa-ethereum fa-2x text-info mb-2"></i>
              <div className="small">Blockchain</div>
            </div>
            <div className="col-6 col-md-3 fade-in-delayed">
              <i className="fas fa-shield-alt fa-2x text-success mb-2"></i>
              <div className="small">Secure</div>
            </div>
            <div className="col-6 col-md-3 fade-in-slow">
              <i className="fas fa-coins fa-2x text-warning mb-2"></i>
              <div className="small">Rewards</div>
            </div>
            <div className="col-6 col-md-3 fade-in">
              <i className="fas fa-users fa-2x text-primary mb-2"></i>
              <div className="small">Community</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-3 py-md-5">
        <div className="text-center mb-4 mb-md-5">
          <h2 className="display-5 text-dark mb-3 mb-md-4 font-playfair">
            Bootstrap Integration Showcase
          </h2>
          <p className="lead text-muted mx-auto font-roboto px-2" style={{ maxWidth: '800px' }}>
            Experience how Bootstrap 5.3.3 components seamlessly integrate with our luxury design system, 
            providing additional UI flexibility while maintaining the premium aesthetic.
          </p>
        </div>

        {/* Enhanced Form Demo */}
        <div className="mb-5">
          <EnhancedFormDemo />
        </div>

        {/* Flask Integration Demo */}
        <div className="mb-5">
          <FlaskIntegrationDemo />
        </div>

        {/* Enhanced Form Validation Demo */}
        <div className="mb-5">
          <EnhancedFormValidation />
        </div>

        {/* NFT Collection Preview */}
        <div className="container my-5">
          <div className="text-center mb-4">
            <h3 className="display-6 text-dark mb-3 font-playfair">
              <i className="fas fa-crown me-3" style={{ color: 'var(--bs-secondary)' }}></i>
              Tier-Specific NFT Collection
            </h3>
            <p className="lead text-gray-600">
              Custom-generated NFT cards for each membership tier
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card bg-dark text-white border-warning">
                <img 
                  src="/src/assets/generated_images/Founder_Tier_NFT_Card_9bd5b90c.png" 
                  className="card-img-top" 
                  alt="Founder Tier NFT"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title font-playfair">
                    <i className="fas fa-crown me-2" style={{ color: '#d4af37' }}></i>
                    Founder Tier
                  </h5>
                  <p className="card-text">Golden Regalia • Diamond Authority</p>
                  <span className="badge bg-warning text-dark">5.0 ETH</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card bg-dark text-white border-info">
                <img 
                  src="/src/assets/generated_images/Elite_Tier_NFT_Card_f8d23b75.png" 
                  className="card-img-top" 
                  alt="Elite Tier NFT"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title font-playfair">
                    <i className="fas fa-gem me-2" style={{ color: '#4169e1' }}></i>
                    Elite Tier
                  </h5>
                  <p className="card-text">Platinum Insignia • Sapphire Authority</p>
                  <span className="badge bg-info">2.5 ETH</span>
                </div>
              </div>
            </div>
            
            <div className="col-lg-4">
              <div className="card bg-dark text-white border-success">
                <img 
                  src="/src/assets/generated_images/Noble_Tier_NFT_Card_ea582732.png" 
                  className="card-img-top" 
                  alt="Noble Tier NFT"
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title font-playfair">
                    <i className="fas fa-medal me-2" style={{ color: '#50c878' }}></i>
                    Noble Tier
                  </h5>
                  <p className="card-text">Gold Medallion • Emerald Authority</p>
                  <span className="badge bg-success">1.0 ETH</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <a href="/nft-collection" className="btn btn-outline-secondary btn-lg">
              <i className="fas fa-eye me-2"></i>
              View Full Collection
            </a>
          </div>
        </div>

        {/* Investor Landing Preview */}
        <div className="container my-5">
          <div className="text-center mb-4">
            <h3 className="display-6 text-dark mb-3 font-playfair">
              <i className="fas fa-chart-line me-3" style={{ color: 'var(--bs-secondary)' }}></i>
              Investor-Ready Landing Page
            </h3>
            <p className="lead text-gray-600">
              Professional landing page optimized for investor presentations
            </p>
          </div>
          
          <div className="card border-0 shadow-lg">
            <div className="card-body p-0" style={{ maxHeight: '600px', overflowY: 'auto' }}>
              <InvestorLanding />
            </div>
          </div>
          
          <div className="text-center mt-4">
            <a href="/" className="btn btn-outline-secondary btn-lg">
              <i className="fas fa-external-link-alt me-2"></i>
              View Full Landing Page
            </a>
          </div>
        </div>

        {/* Bootstrap Loading Spinner Demo */}
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-dark text-white border-secondary">
                <div className="card-header border-secondary">
                  <h5 className="card-title mb-0 font-playfair">
                    <i className="fas fa-spinner me-2" style={{ color: 'var(--bs-secondary)' }}></i>
                    Loading Spinner Integration
                  </h5>
                </div>
                <div className="card-body">
                  <div id="loadingSpinner" className="d-none text-center mb-3">
                    <div className="spinner-border" style={{ color: 'var(--bs-secondary)' }} role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="mt-2">
                      <small>Processing your request...</small>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-3">
                    Experience smooth form submissions with elegant loading animations that keep users engaged during processing.
                  </p>
                  
                  <button 
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      const spinner = document.getElementById('loadingSpinner');
                      if (spinner) {
                        spinner.classList.remove('d-none');
                        setTimeout(() => spinner.classList.add('d-none'), 2000);
                      }
                    }}
                  >
                    <i className="fas fa-play me-2"></i>
                    Demo Loading Spinner
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Feature Cards Section */}
        <div className="container my-5">
          <div className="text-center mb-5">
            <h3 className="display-6 text-dark mb-3 font-playfair">
              <i className="fas fa-gem text-secondary me-2"></i>
              Platform Features
            </h3>
            <p className="lead text-muted">
              Discover what makes the Gentlemen's Club the premier GambleFi destination
            </p>
          </div>
          
          <div className="row text-center g-4">
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-users fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">Exclusive Community</h3>
                  <p className="card-text text-muted">
                    Join a curated network of professionals in the most sophisticated gaming environment.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-handshake fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">Elite Networking</h3>
                  <p className="card-text text-muted">
                    Connect with like-minded individuals and build valuable relationships in our exclusive club.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-star fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">Premium Benefits</h3>
                  <p className="card-text text-muted">
                    Unlock exclusive perks, events, and rewards available only to verified members.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row text-center g-4 mt-4">
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-shield-alt fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">Blockchain Security</h3>
                  <p className="card-text text-muted">
                    Enjoy provably fair gaming with complete transparency and blockchain-verified results.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-coins fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">Token Staking</h3>
                  <p className="card-text text-muted">
                    Stake GTLM tokens and earn 30% revenue sharing from platform activities.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card feature-card shadow-sm h-100">
                <div className="card-body">
                  <i className="fas fa-vote-yea fa-2x mb-3" style={{ color: 'var(--bs-primary)' }}></i>
                  <h3 className="card-title font-playfair">DAO Governance</h3>
                  <p className="card-text text-muted">
                    Participate in democratic governance and shape the future of the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Toast Notifications */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-dark text-white">
            <div className="d-flex align-items-center">
              <div className="p-2 bg-primary bg-opacity-25 rounded me-3">
                <i className="fas fa-bell text-primary"></i>
              </div>
              <div>
                <h5 className="mb-1 font-playfair">Bootstrap Toast Notifications</h5>
                <small className="text-light">
                  <i className="fab fa-font-awesome me-1"></i>
                  Interactive notification system with Font Awesome icons
                </small>
              </div>
            </div>
          </div>
          <div className="card-body">
            <p className="card-text font-roboto mb-4">
              Click the buttons below to trigger different types of toast notifications:
            </p>
            <div className="d-flex flex-wrap gap-2">
              <button
                className="btn btn-success"
                onClick={() => showToast('success', 'Success!', 'Your action was completed successfully.')}
              >
                <i className="fas fa-check-circle me-2"></i>
                Success Toast
              </button>
              <button
                className="btn btn-danger"
                onClick={() => showToast('danger', 'Error!', 'Something went wrong. Please try again.')}
              >
                <i className="fas fa-exclamation-triangle me-2"></i>
                Error Toast
              </button>
              <button
                className="btn btn-warning"
                onClick={() => showToast('warning', 'Warning!', 'Please check your wallet connection.')}
              >
                <i className="fas fa-exclamation-circle me-2"></i>
                Warning Toast
              </button>
              <button
                className="btn btn-info"
                onClick={() => showToast('info', 'Info!', 'New features have been added to the platform.')}
              >
                <i className="fas fa-info-circle me-2"></i>
                Info Toast
              </button>
            </div>
          </div>
        </div>

      {/* Bootstrap Modal */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <Crown className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Bootstrap Modal</h3>
              <p className="text-gray-400 text-sm">Premium modal dialogs</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-300 mb-4">
              Experience our luxury-styled Bootstrap modals with the platform's design system:
            </p>
            <button 
              className="btn btn-outline-warning btn-lg"
              data-bs-toggle="modal" 
              data-bs-target="#premiumModal"
            >
              <Crown className="w-4 h-4 me-2" />
              Open Premium Modal
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Bootstrap Carousel */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Platform Features Carousel</h3>
              <p className="text-gray-400 text-sm">Showcase platform capabilities</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BootstrapCarousel
            id="platformCarousel"
            items={carouselItems}
            indicators={true}
            controls={true}
            autoplay={true}
            interval={4000}
          />
        </CardContent>
      </Card>

      {/* Bootstrap Accordion */}
      <Card className="luxury-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Platform FAQ</h3>
              <p className="text-gray-400 text-sm">Frequently asked questions</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <BootstrapAccordion
            id="platformFAQ"
            items={accordionItems}
          />
        </CardContent>
      </Card>

      {/* Bootstrap Progress Bars & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="luxury-card">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Platform Statistics</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-gray-300">Gaming Activity</span>
                  <span className="text-emerald-400 font-bold">85%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-success" role="progressbar" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-gray-300">Staking Participation</span>
                  <span className="text-yellow-400 font-bold">72%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-warning" role="progressbar" style={{ width: '72%' }}></div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-gray-300">DAO Engagement</span>
                  <span className="text-blue-400 font-bold">63%</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div className="progress-bar bg-info" role="progressbar" style={{ width: '63%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-card">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Platform Alerts</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="alert alert-success mb-3" role="alert">
                <Trophy className="w-4 h-4 me-2" />
                <strong>New Games Added!</strong> Check out our latest gaming providers.
              </div>
              <div className="alert alert-warning mb-3" role="alert">
                <Coins className="w-4 h-4 me-2" />
                <strong>Staking Rewards!</strong> Claim your pending rewards now.
              </div>
              <div className="alert alert-info mb-0" role="alert">
                <Users className="w-4 h-4 me-2" />
                <strong>DAO Proposal!</strong> New voting proposal is live.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Premium Modal Component */}
      <BootstrapModal
        id="premiumModal"
        title="Welcome to the Gentlemen's Club"
        size="lg"
        centered={true}
      >
        <div className="text-center py-4">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Crown className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h4 className="text-white font-playfair mb-3">Premium Gaming Experience</h4>
          <p className="text-gray-300 mb-4">
            Join the most sophisticated blockchain gaming community. Experience premium games, 
            earn rewards through staking, and participate in decentralized governance.
          </p>
          <div className="row g-3 text-center">
            <div className="col-md-4">
              <div className="bg-emerald-500/10 p-3 rounded">
                <Trophy className="w-6 h-6 mx-auto mb-2 text-emerald-400" />
                <div className="text-white font-semibold">42+ Games</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-yellow-500/10 p-3 rounded">
                <Coins className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                <div className="text-white font-semibold">30% APY</div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="bg-blue-500/10 p-3 rounded">
                <Shield className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                <div className="text-white font-semibold">Licensed</div>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <button className="btn btn-warning btn-lg me-3" data-bs-dismiss="modal">
              <Crown className="w-4 h-4 me-2" />
              Join Now
            </button>
            <button className="btn btn-outline-light" data-bs-dismiss="modal">
              Learn More
            </button>
          </div>
        </div>
      </BootstrapModal>

        {/* Bootstrap Testimonials Carousel */}
        <div className="container my-5">
          <h3 className="text-center mb-4 font-playfair">
            <i className="fas fa-quote-left text-secondary me-2"></i>
            Member Testimonials
          </h3>
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="card bg-dark text-white border-secondary">
                  <div className="card-body text-center py-5">
                    <i className="fas fa-star text-warning mb-3"></i>
                    <blockquote className="blockquote mb-4">
                      <p className="h5">"Great community! The exclusive gaming experience and professional atmosphere make this the premier destination for serious players."</p>
                    </blockquote>
                    <footer className="blockquote-footer">
                      <cite className="text-secondary">Marcus Thompson, Diamond Member</cite>
                    </footer>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card bg-dark text-white border-secondary">
                  <div className="card-body text-center py-5">
                    <i className="fas fa-crown text-warning mb-3"></i>
                    <blockquote className="blockquote mb-4">
                      <p className="h5">"Professional and exclusive. The DAO governance system gives members real control over the platform's future. Highly recommended!"</p>
                    </blockquote>
                    <footer className="blockquote-footer">
                      <cite className="text-secondary">Sarah Chen, Platinum Member</cite>
                    </footer>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="card bg-dark text-white border-secondary">
                  <div className="card-body text-center py-5">
                    <i className="fas fa-shield-alt text-success mb-3"></i>
                    <blockquote className="blockquote mb-4">
                      <p className="h5">"Security and transparency at its finest. The blockchain integration and provably fair games give me complete confidence."</p>
                    </blockquote>
                    <footer className="blockquote-footer">
                      <cite className="text-secondary">David Rodriguez, Gold Member</cite>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Bootstrap Footer */}
        <footer className="bg-dark text-white text-center py-4 mt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <p className="mb-1 font-playfair">&copy; 2025 Gentlemen's Club. All rights reserved.</p>
              </div>
              <div className="col-md-6">
                <p className="mb-1 font-roboto">
                  <span className="badge bg-success me-2">Licensed</span>
                  Curaçao Gaming Authority Regulated
                </p>
              </div>
            </div>
          </div>
        </footer>

        {/* Toast Container */}
        <div id="toast-container" className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}></div>
      </div>
    </div>
  );
}