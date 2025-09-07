import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import founderTierImage from '@assets/generated_images/Founder_Tier_NFT_Card_9bd5b90c.png';
import eliteTierImage from '@assets/generated_images/Elite_Tier_NFT_Card_f8d23b75.png';
import nobleTierImage from '@assets/generated_images/Noble_Tier_NFT_Card_ea582732.png';

interface NFTTier {
  id: string;
  name: string;
  image: string;
  price: string;
  benefits: string[];
  rarity: string;
  supply: string;
  authority: string;
  color: string;
  bgGradient: string;
}

const nftTiers: NFTTier[] = [
  {
    id: 'founder',
    name: 'Founder Tier',
    image: founderTierImage,
    price: '5.0 ETH',
    benefits: [
      'Maximum governance voting power',
      'Exclusive access to private events',
      'Priority customer support',
      'Revenue sharing: 35%',
      'Limited edition badge'
    ],
    rarity: 'Legendary',
    supply: '100',
    authority: 'Diamond Authority',
    color: '#d4af37',
    bgGradient: 'linear-gradient(135deg, #1a2b3c 0%, #2a3b4c 100%)'
  },
  {
    id: 'elite',
    name: 'Elite Tier',
    image: eliteTierImage,
    price: '2.5 ETH',
    benefits: [
      'Enhanced governance rights',
      'Access to premium features',
      'Monthly exclusive content',
      'Revenue sharing: 25%',
      'Platinum recognition'
    ],
    rarity: 'Epic',
    supply: '500',
    authority: 'Sapphire Authority',
    color: '#4169e1',
    bgGradient: 'linear-gradient(135deg, #1e2a3a 0%, #2e3a4a 100%)'
  },
  {
    id: 'noble',
    name: 'Noble Tier',
    image: nobleTierImage,
    price: '1.0 ETH',
    benefits: [
      'Standard governance participation',
      'Community access',
      'Weekly updates',
      'Revenue sharing: 15%',
      'Gold medallion status'
    ],
    rarity: 'Rare',
    supply: '1000',
    authority: 'Emerald Authority',
    color: '#50c878',
    bgGradient: 'linear-gradient(135deg, #1a2a1a 0%, #2a3a2a 100%)'
  }
];

export function NFTCollection() {
  const [selectedTier, setSelectedTier] = useState<NFTTier | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTierSelect = (tier: NFTTier) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTier(null);
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <div className="mb-4">
          <i className="fas fa-crown fa-4x" style={{ color: 'var(--bs-secondary)' }}></i>
        </div>
        <h1 className="display-4 font-playfair text-white mb-3">
          Brand Identity Collection
        </h1>
        <p className="lead text-gray-300 mb-4">
          Exclusive NFT memberships that define your status within the Gentlemen's Club ecosystem
        </p>
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Badge variant="outline" className="border-secondary text-secondary">
            <i className="fas fa-gem me-2"></i>
            Limited Edition
          </Badge>
          <Badge variant="outline" className="border-secondary text-secondary">
            <i className="fas fa-shield-alt me-2"></i>
            Verified Authentic
          </Badge>
          <Badge variant="outline" className="border-secondary text-secondary">
            <i className="fas fa-vote-yea me-2"></i>
            Governance Rights
          </Badge>
        </div>
      </div>

      {/* NFT Tiers Grid */}
      <div className="row g-4 mb-5">
        {nftTiers.map((tier) => (
          <div key={tier.id} className="col-lg-4 col-md-6">
            <Card 
              className="luxury-card h-100 border-0 position-relative overflow-hidden"
              style={{
                background: tier.bgGradient,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onClick={() => handleTierSelect(tier)}
            >
              {/* Rarity Badge */}
              <div className="position-absolute top-0 end-0 m-3 z-index-10">
                <Badge 
                  className="px-3 py-1"
                  style={{ 
                    backgroundColor: tier.color,
                    color: '#1a2b3c'
                  }}
                >
                  {tier.rarity}
                </Badge>
              </div>

              <CardContent className="p-0">
                {/* NFT Image */}
                <div className="position-relative overflow-hidden">
                  <img
                    src={tier.image}
                    alt={`${tier.name} NFT`}
                    className="w-100 h-auto"
                    style={{ 
                      aspectRatio: '4/3',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  <div className="position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-dark">
                    <h5 className="font-playfair text-white mb-1">{tier.name}</h5>
                    <p className="text-gray-300 mb-0 small">
                      <i className="fas fa-certificate me-1" style={{ color: tier.color }}></i>
                      {tier.authority}
                    </p>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h6 className="text-white mb-1">Price</h6>
                      <p className="h5 mb-0" style={{ color: tier.color }}>
                        <i className="fab fa-ethereum me-1"></i>
                        {tier.price}
                      </p>
                    </div>
                    <div className="text-end">
                      <h6 className="text-white mb-1">Supply</h6>
                      <p className="text-gray-300 mb-0">{tier.supply} NFTs</p>
                    </div>
                  </div>

                  {/* Benefits Preview */}
                  <div className="mb-3">
                    <h6 className="text-white mb-2">
                      <i className="fas fa-star me-2" style={{ color: tier.color }}></i>
                      Key Benefits
                    </h6>
                    <ul className="list-unstyled mb-0">
                      {tier.benefits.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="text-gray-300 small mb-1">
                          <i className="fas fa-check me-2" style={{ color: tier.color }}></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: tier.color,
                      borderColor: tier.color,
                      color: '#1a2b3c'
                    }}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      {/* Collection Stats */}
      <div className="row g-4 mb-5">
        <div className="col-md-3 col-6">
          <Card className="luxury-card text-center">
            <CardContent className="p-4">
              <i className="fas fa-users fa-2x mb-3" style={{ color: 'var(--bs-secondary)' }}></i>
              <h4 className="text-white mb-1">1,600</h4>
              <p className="text-gray-400 mb-0">Total Supply</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 col-6">
          <Card className="luxury-card text-center">
            <CardContent className="p-4">
              <i className="fas fa-chart-line fa-2x mb-3" style={{ color: 'var(--bs-secondary)' }}></i>
              <h4 className="text-white mb-1">2.8 ETH</h4>
              <p className="text-gray-400 mb-0">Floor Price</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 col-6">
          <Card className="luxury-card text-center">
            <CardContent className="p-4">
              <i className="fas fa-fire fa-2x mb-3" style={{ color: 'var(--bs-secondary)' }}></i>
              <h4 className="text-white mb-1">156</h4>
              <p className="text-gray-400 mb-0">Holders</p>
            </CardContent>
          </Card>
        </div>
        <div className="col-md-3 col-6">
          <Card className="luxury-card text-center">
            <CardContent className="p-4">
              <i className="fas fa-percentage fa-2x mb-3" style={{ color: 'var(--bs-secondary)' }}></i>
              <h4 className="text-white mb-1">25%</h4>
              <p className="text-gray-400 mb-0">Max Revenue Share</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal for Tier Details */}
      {isModalOpen && selectedTier && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-white border-secondary">
              <div className="modal-header border-secondary">
                <h5 className="modal-title font-playfair">
                  <i className="fas fa-crown me-2" style={{ color: selectedTier.color }}></i>
                  {selectedTier.name} Details
                </h5>
                <button 
                  type="button" 
                  className="btn-close btn-close-white" 
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <img
                      src={selectedTier.image}
                      alt={selectedTier.name}
                      className="w-100 rounded"
                    />
                  </div>
                  <div className="col-md-6">
                    <h6 className="text-white mb-3">Complete Benefits Package</h6>
                    <ul className="list-unstyled">
                      {selectedTier.benefits.map((benefit, index) => (
                        <li key={index} className="text-gray-300 mb-2">
                          <i className="fas fa-check-circle me-2" style={{ color: selectedTier.color }}></i>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-4">
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-gray-400">Price:</span>
                        <span className="text-white fw-bold">{selectedTier.price}</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-gray-400">Supply:</span>
                        <span className="text-white">{selectedTier.supply} NFTs</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span className="text-gray-400">Rarity:</span>
                        <span style={{ color: selectedTier.color }}>{selectedTier.rarity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer border-secondary">
                <Button
                  variant="outline"
                  onClick={closeModal}
                  className="border-secondary text-secondary"
                >
                  Close
                </Button>
                <Button
                  style={{
                    backgroundColor: selectedTier.color,
                    borderColor: selectedTier.color,
                    color: '#1a2b3c'
                  }}
                >
                  <i className="fas fa-wallet me-2"></i>
                  Connect Wallet to Purchase
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}