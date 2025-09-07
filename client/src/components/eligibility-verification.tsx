import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, MapPin, AlertTriangle } from 'lucide-react';

interface EligibilityVerificationProps {
  onEligibilityVerified?: (eligible: boolean, country: string) => void;
}

export default function EligibilityVerification({ onEligibilityVerified }: EligibilityVerificationProps) {
  const [userCountry, setUserCountry] = useState('');
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Countries where Curaçao license is generally NOT accepted
  const restrictedCountries = [
    'United States',
    'United Kingdom', 
    'France',
    'Germany',
    'Australia',
    'Netherlands',
    'Curacao',
    'Belgium',
    'Spain',
    'Italy',
    'Denmark',
    'Sweden',
    'Norway',
  ];

  const verifyEligibility = async () => {
    setIsLoading(true);
    setErrorMessage('');
    setIsEligible(null);
    setUserCountry('');

    try {
      // Get user's IP address
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      if (!ipResponse.ok) {
        throw new Error(`Failed to get IP address: ${ipResponse.statusText}`);
      }
      const ipData = await ipResponse.json();
      const ipAddress = ipData.ip;

      // Use IP to get geolocation data
      const geoResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
      if (!geoResponse.ok) {
        throw new Error(`Failed to get geolocation: ${geoResponse.statusText}`);
      }
      const geoData = await geoResponse.json();

      if (geoData.status === 'success') {
        const country = geoData.country;
        setUserCountry(country);

        const isRestricted = restrictedCountries.some(
          (restricted) => restricted.toLowerCase() === country.toLowerCase()
        );

        const eligible = !isRestricted;
        setIsEligible(eligible);
        
        // Notify parent component if callback provided
        if (onEligibilityVerified) {
          onEligibilityVerified(eligible, country);
        }
      } else {
        throw new Error(geoData.message || 'Could not determine your location.');
      }
    } catch (error: any) {
      console.error('Eligibility verification failed:', error);
      setErrorMessage(`Error: ${error.message}. Please try again.`);
      setIsEligible(false);
      
      if (onEligibilityVerified) {
        onEligibilityVerified(false, '');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="luxury-card border-yellow-600/30 max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl heading-playfair text-gray-100 mb-2">
          Verify Your Eligibility
        </CardTitle>
        <CardDescription className="body-inter text-gray-300 text-lg">
          Check if you are eligible to access The Gentlemen's Club platform based on your location and our Curaçao gaming license
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          onClick={verifyEligibility}
          disabled={isLoading}
          className="btn-luxury-primary w-full text-lg py-4"
          data-testid="button-verify-eligibility"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span>Checking Eligibility...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              <span>Verify Eligibility</span>
            </>
          )}
        </Button>

        {/* Results Display */}
        {errorMessage && (
          <div className="luxury-card-elevated border-red-500/30 p-6 text-center" data-testid="error-message">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <p className="text-red-400 text-lg body-inter font-medium">{errorMessage}</p>
          </div>
        )}

        {userCountry && !errorMessage && (
          <div className="luxury-card-subtle p-6 text-center" data-testid="country-display">
            <MapPin className="w-8 h-8 text-[var(--gentlemen-gold)] mx-auto mb-3" />
            <p className="body-inter text-gray-300 text-lg">
              Detected Location: <span className="font-semibold text-gray-100 heading-playfair">{userCountry}</span>
            </p>
          </div>
        )}

        {isEligible !== null && !errorMessage && (
          <div className={`luxury-card-elevated p-8 text-center ${
            isEligible ? 'border-green-500/30' : 'border-red-500/30'
          }`} data-testid="eligibility-result">
            {isEligible ? (
              <>
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-400 heading-playfair mb-2">
                  Eligible to Play!
                </h3>
                <p className="body-inter text-gray-300">
                  Welcome to The Gentlemen's Club. You may proceed to register and enjoy our premium gaming platform.
                </p>
              </>
            ) : (
              <>
                <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-400 heading-playfair mb-2">
                  Access Restricted
                </h3>
                <p className="body-inter text-gray-300 mb-4">
                  Unfortunately, our Curaçao gaming license does not permit access from your current location.
                </p>
                <div className="luxury-card-subtle p-4 mt-4">
                  <p className="body-inter text-gray-400 text-sm">
                    For compliance with international gaming regulations, access is restricted in certain jurisdictions. 
                    You may still participate in our DAO governance and token staking features.
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Compliance Information */}
        <div className="luxury-card-subtle p-6">
          <h4 className="heading-playfair text-lg text-gray-100 mb-3">Regulatory Compliance</h4>
          <div className="body-inter text-gray-400 text-sm space-y-2">
            <p>• Our platform operates under a Curaçao gaming license</p>
            <p>• Age verification required: Must be 18+ or legal gambling age in your jurisdiction</p>
            <p>• Responsible gaming measures are strictly enforced</p>
            <p>• Geo-blocking ensures compliance with local regulations</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}