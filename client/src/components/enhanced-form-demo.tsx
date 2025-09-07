import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export function EnhancedFormDemo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    walletAddress: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'email':
        return value.includes('@') && value.includes('.') 
          ? '' 
          : 'Please enter a valid email address';
      
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain uppercase, lowercase, and number';
        }
        return '';
      
      case 'confirmPassword':
        return value === formData.password ? '' : 'Passwords do not match';
      
      case 'username':
        return value.length >= 3 ? '' : 'Username must be at least 3 characters';
      
      case 'walletAddress':
        return /^0x[a-fA-F0-9]{40}$/.test(value) || value === ''
          ? '' 
          : 'Please enter a valid Ethereum wallet address';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate all fields
    const newErrors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) newErrors[key] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      toast({
        title: "Validation Error",
        description: "Please correct the errors below",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Success!",
        description: "Form submitted successfully with Font Awesome validation",
        variant: "default"
      });
      
      // Reset form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        walletAddress: ''
      });
      setErrors({});
    }, 2000);
  };

  return (
    <div className="container py-3 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <Card className="luxury-card">
            <CardHeader>
              <div className="text-center">
                <div className="mb-3 fade-in">
                  <i className="fas fa-user-plus fa-3x text-warning"></i>
                </div>
                <h2 className="h3 font-playfair text-white mb-2 fade-in-delayed">Enhanced Form Validation</h2>
                <p className="text-gray-400 fade-in-slow">
                  <i className="fab fa-font-awesome me-2"></i>
                  Powered by Font Awesome 6.4.0 and advanced JavaScript validation
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="mb-3">
                  <label className="form-label text-white">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-at"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control bg-gray-800 border-gray-600 text-white ${
                        errors.email ? 'is-invalid' : formData.email && !errors.email ? 'is-valid' : ''
                      }`}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.email}
                      </div>
                    )}
                  </div>
                </div>

                {/* Username Field */}
                <div className="mb-3">
                  <label className="form-label text-white">
                    <i className="fas fa-user me-2"></i>
                    Username
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-id-card"></i>
                    </span>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className={`form-control bg-gray-800 border-gray-600 text-white ${
                        errors.username ? 'is-invalid' : formData.username && !errors.username ? 'is-valid' : ''
                      }`}
                      placeholder="Choose a username"
                      required
                    />
                    {errors.username && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.username}
                      </div>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label className="form-label text-white">
                    <i className="fas fa-lock me-2"></i>
                    Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-key"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-control bg-gray-800 border-gray-600 text-white ${
                        errors.password ? 'is-invalid' : formData.password && !errors.password ? 'is-valid' : ''
                      }`}
                      placeholder="Create a strong password"
                      required
                    />
                    {errors.password && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <small className="text-muted">
                    <i className="fas fa-info-circle me-1"></i>
                    Must be 8+ characters with uppercase, lowercase, and numbers
                  </small>
                </div>

                {/* Confirm Password Field */}
                <div className="mb-3">
                  <label className="form-label text-white">
                    <i className="fas fa-shield-alt me-2"></i>
                    Confirm Password
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-check-double"></i>
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`form-control bg-gray-800 border-gray-600 text-white ${
                        errors.confirmPassword ? 'is-invalid' : formData.confirmPassword && !errors.confirmPassword ? 'is-valid' : ''
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    {errors.confirmPassword && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>
                </div>

                {/* Wallet Address Field */}
                <div className="mb-4">
                  <label className="form-label text-white">
                    <i className="fab fa-ethereum me-2"></i>
                    Wallet Address <span className="text-muted">(Optional)</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-wallet"></i>
                    </span>
                    <input
                      type="text"
                      name="walletAddress"
                      value={formData.walletAddress}
                      onChange={handleInputChange}
                      className={`form-control bg-gray-800 border-gray-600 text-white ${
                        errors.walletAddress ? 'is-invalid' : formData.walletAddress && !errors.walletAddress ? 'is-valid' : ''
                      }`}
                      placeholder="0x... (optional)"
                    />
                    {errors.walletAddress && (
                      <div className="invalid-feedback d-flex align-items-center">
                        <i className="fas fa-exclamation-triangle me-2"></i>
                        {errors.walletAddress}
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="btn btn-warning btn-lg px-5 py-3"
                    style={{
                      background: 'linear-gradient(45deg, #f59e0b, #d97706)',
                      border: 'none',
                      color: '#1f2937'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Submit Form
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Font Awesome Feature Showcase */}
              <div className="mt-5 pt-4 fade-in" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h5 className="text-white mb-3 font-playfair fade-in-delayed">
                  <i className="fab fa-font-awesome me-2 text-warning"></i>
                  Font Awesome Icons Showcase
                </h5>
                <div className="row g-3">
                  <div className="col-6 col-md-3 text-center fade-in">
                    <i className="fas fa-crown fa-2x text-warning mb-2"></i>
                    <div className="small text-gray-300">Crown</div>
                  </div>
                  <div className="col-6 col-md-3 text-center fade-in-delayed">
                    <i className="fas fa-coins fa-2x text-success mb-2"></i>
                    <div className="small text-gray-300">Coins</div>
                  </div>
                  <div className="col-6 col-md-3 text-center fade-in-slow">
                    <i className="fas fa-shield-alt fa-2x text-primary mb-2"></i>
                    <div className="small text-gray-300">Shield</div>
                  </div>
                  <div className="col-6 col-md-3 text-center fade-in">
                    <i className="fab fa-ethereum fa-2x text-info mb-2"></i>
                    <div className="small text-gray-300">Ethereum</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}