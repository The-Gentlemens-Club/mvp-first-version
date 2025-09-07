import { Link } from 'wouter';
import { ArrowLeft, Shield, Globe, Scale, CheckCircle2 } from 'lucide-react';
import EligibilityVerification from '@/components/eligibility-verification';

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-gray-100">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center text-[var(--gentlemen-gold)] hover:text-yellow-400 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="body-inter">Back to Home</span>
        </Link>
      </div>

      {/* Header Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="luxury-card w-20 h-20 flex items-center justify-center">
              <Shield className="w-10 h-10 text-[var(--gentlemen-gold)]" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold heading-playfair text-gray-100 mb-6">
            Eligibility Verification
          </h1>
          
          <p className="text-xl body-inter text-gray-300 max-w-3xl mx-auto mb-12">
            Ensuring regulatory compliance with our Curaçao gaming license through 
            automated location verification and responsible gaming protocols
          </p>
        </div>
      </section>

      {/* Main Verification Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <EligibilityVerification />
        </div>
      </section>

      {/* Compliance Information */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl heading-playfair text-center text-gray-100 mb-16">
            Our Regulatory Framework
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="luxury-card border-yellow-600/30 p-8 text-center">
              <Scale className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-6" />
              <h3 className="text-xl heading-playfair text-gray-100 mb-4">Legal Compliance</h3>
              <p className="body-inter text-gray-300 leading-relaxed">
                Operating under strict Curaçao gaming regulations with full legal authorization 
                for blockchain-based gaming operations.
              </p>
            </div>
            
            <div className="luxury-card border-yellow-600/30 p-8 text-center">
              <Globe className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-6" />
              <h3 className="text-xl heading-playfair text-gray-100 mb-4">Geographic Restrictions</h3>
              <p className="body-inter text-gray-300 leading-relaxed">
                Access is restricted in jurisdictions where online gaming is prohibited 
                or where our license is not recognized.
              </p>
            </div>
            
            <div className="luxury-card border-yellow-600/30 p-8 text-center">
              <CheckCircle2 className="w-12 h-12 text-[var(--gentlemen-gold)] mx-auto mb-6" />
              <h3 className="text-xl heading-playfair text-gray-100 mb-4">Responsible Gaming</h3>
              <p className="body-inter text-gray-300 leading-relaxed">
                Comprehensive age verification, deposit limits, and self-exclusion 
                tools to ensure safe and responsible gaming practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Firewall Notice */}
      <section className="py-16 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="luxury-card border-yellow-600/50 p-8">
            <h3 className="text-2xl heading-playfair text-center text-gray-100 mb-6">
              Important Legal Distinction
            </h3>
            <div className="body-inter text-gray-300 space-y-4 leading-relaxed">
              <p>
                <strong className="text-gray-100">DAO Governance & Token Staking:</strong> These features represent 
                financial utilities and platform profit-sharing mechanisms. They are available to eligible token 
                holders regardless of gaming jurisdiction restrictions.
              </p>
              <p>
                <strong className="text-gray-100">Gaming Activities:</strong> Casino games and betting functions 
                are subject to gaming license restrictions and are only available to users in permitted jurisdictions.
              </p>
              <p className="text-center text-sm text-yellow-400 mt-6">
                This legal firewall ensures compliance with both financial and gaming regulations across all jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}