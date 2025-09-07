import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface JoinRequest {
  email: string;
  name: string;
  timestamp: string;
}

export function FlaskIntegrationDemo() {
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);
  const [showRequests, setShowRequests] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Enhanced validation with accessibility focus
    const emailHelp = document.getElementById('emailHelp');
    const nameHelp = document.getElementById('nameHelp');
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const nameInput = document.getElementById('name') as HTMLInputElement;

    // Reset validation states
    emailHelp?.classList.add('d-none');
    nameHelp?.classList.add('d-none');

    let hasErrors = false;

    // Validate name
    if (!formData.name.trim()) {
      nameHelp?.classList.remove('d-none');
      nameInput?.focus();
      hasErrors = true;
    }

    // Validate email
    if (!formData.email.includes('@')) {
      emailHelp?.classList.remove('d-none');
      if (!hasErrors) emailInput?.focus(); // Only focus if first error
      hasErrors = true;
    }

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    // Track form submission with Google Analytics
    if (typeof window !== 'undefined' && (window as any).trackFormSubmission) {
      (window as any).trackFormSubmission('flask_join_form');
    }

    try {
      // Simulate processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Simulate Flask API call
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        toast({
          title: "Success!",
          description: "Welcome to the Gentlemen's Club! Check your email for next steps.",
          variant: "default"
        });
        
        // Reset form
        setFormData({ email: '', name: '' });
        
        // Refresh join requests if showing
        if (showRequests) {
          fetchJoinRequests();
        }
      } else {
        throw new Error('Failed to join');
      }
    } catch (error) {
      // Fallback for demo - simulate success
      toast({
        title: "Demo Mode",
        description: "Flask integration ready! In production, this would save to the database.",
        variant: "default"
      });
      
      // Add to local state for demo
      const newRequest: JoinRequest = {
        ...formData,
        timestamp: new Date().toISOString()
      };
      setJoinRequests(prev => [newRequest, ...prev]);
      setFormData({ email: '', name: '' });
    }

    setIsSubmitting(false);
  };

  const fetchJoinRequests = async () => {
    try {
      const response = await fetch('/api/join-requests');
      if (response.ok) {
        const data = await response.json();
        setJoinRequests(data.requests || []);
      }
    } catch (error) {
      console.log('Demo mode - using local data');
    }
  };

  const toggleRequests = () => {
    setShowRequests(!showRequests);
    if (!showRequests) {
      fetchJoinRequests();
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card className="luxury-card mb-4">
            <CardHeader>
              <div className="text-center">
                <div className="mb-3 fade-in">
                  <i className="fab fa-python fa-3x text-info"></i>
                </div>
                <h2 className="h3 font-playfair text-white mb-2 fade-in-delayed">
                  Flask Backend Integration
                </h2>
                <p className="text-gray-400 fade-in-slow">
                  <i className="fas fa-server me-2"></i>
                  Python Flask API with Google Analytics tracking and Bootstrap forms
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" aria-label="Join Gentlemen Club">
                {/* Name Field */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-white">
                    <i className="fas fa-user me-2"></i>
                    Full Name
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-id-card"></i>
                    </span>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-control bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter your full name"
                      required
                      aria-describedby="nameHelp"
                    />
                  </div>
                  <div id="nameHelp" className="form-text text-danger d-none">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    Please enter your full name.
                  </div>
                </div>

                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white">
                    <i className="fas fa-envelope me-2"></i>
                    Email Address
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-dark border-gray-600 text-gray-300">
                      <i className="fas fa-at"></i>
                    </span>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-control bg-gray-800 border-gray-600 text-white"
                      placeholder="Enter your email"
                      required
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div id="emailHelp" className="form-text text-danger d-none">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    Please enter a valid email address.
                  </div>
                </div>

                {/* Loading Spinner */}
                <div id="loadingSpinner" className="d-none text-center mb-3">
                  <div className="spinner-border" style={{ color: 'var(--bs-secondary)' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="mt-2 text-white">
                    <small>Processing your membership application...</small>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="btn btn-lg px-5 py-3 me-3"
                    style={{
                      backgroundColor: 'var(--bs-secondary)',
                      borderColor: 'var(--bs-secondary)',
                      color: '#1a2b3c'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Joining...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-crown me-2"></i>
                        Join the Club
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    onClick={toggleRequests}
                    className="btn btn-outline-secondary btn-lg"
                  >
                    <i className="fas fa-users me-2"></i>
                    {showRequests ? 'Hide' : 'Show'} Requests ({joinRequests.length})
                  </Button>
                </div>
              </form>

              {/* Join Requests Display */}
              {showRequests && (
                <div className="mt-5 pt-4 fade-in" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <h5 className="text-white mb-3 font-playfair">
                    <i className="fas fa-database me-2 text-info"></i>
                    Recent Join Requests
                  </h5>
                  {joinRequests.length === 0 ? (
                    <p className="text-gray-400 text-center py-3">
                      <i className="fas fa-inbox me-2"></i>
                      No join requests yet. Be the first to join!
                    </p>
                  ) : (
                    <div className="row">
                      {joinRequests.slice(0, 6).map((request, index) => (
                        <div key={index} className="col-md-6 mb-3">
                          <div className="card bg-gray-800 border-gray-600">
                            <div className="card-body">
                              <h6 className="card-title text-white">
                                <i className="fas fa-user-circle me-2 text-secondary"></i>
                                {request.name || 'Anonymous'}
                              </h6>
                              <p className="card-text text-gray-300 small">
                                <i className="fas fa-envelope me-1"></i>
                                {request.email}
                              </p>
                              <small className="text-muted">
                                <i className="fas fa-clock me-1"></i>
                                {new Date(request.timestamp).toLocaleString()}
                              </small>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Integration Info */}
              <div className="mt-5 pt-4 fade-in" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h5 className="text-white mb-3 font-playfair">
                  <i className="fas fa-code me-2 text-warning"></i>
                  Flask Integration Features
                </h5>
                <div className="row g-3">
                  <div className="col-6 col-md-3 text-center">
                    <i className="fab fa-python fa-2x text-info mb-2"></i>
                    <div className="small text-gray-300">Python Flask</div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <i className="fas fa-chart-line fa-2x text-success mb-2"></i>
                    <div className="small text-gray-300">Google Analytics</div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <i className="fas fa-database fa-2x text-primary mb-2"></i>
                    <div className="small text-gray-300">Data Storage</div>
                  </div>
                  <div className="col-6 col-md-3 text-center">
                    <i className="fas fa-shield-alt fa-2x text-warning mb-2"></i>
                    <div className="small text-gray-300">Form Validation</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bootstrap Success Modal */}
          <div className="modal fade" id="successModal" tabIndex={-1} aria-labelledby="successModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-white border-secondary">
                <div className="modal-header border-secondary">
                  <h5 className="modal-title font-playfair" id="successModalLabel">
                    <i className="fas fa-crown text-warning me-2"></i>
                    Welcome to the Club!
                  </h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="text-center py-3">
                    <i className="fas fa-check-circle fa-3x text-success mb-3"></i>
                    <p className="lead">Thank you for joining the Gentlemen Club!</p>
                    <p className="text-gray-300">You'll hear from us soon with exclusive access details.</p>
                  </div>
                </div>
                <div className="modal-footer border-secondary">
                  <button 
                    type="button" 
                    className="btn btn-lg"
                    style={{
                      backgroundColor: 'var(--bs-secondary)',
                      borderColor: 'var(--bs-secondary)',
                      color: '#1a2b3c'
                    }}
                    data-bs-dismiss="modal"
                  >
                    <i className="fas fa-thumbs-up me-2"></i>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}