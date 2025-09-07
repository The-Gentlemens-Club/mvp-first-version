import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function EnhancedFormValidation() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target as HTMLFormElement;
    const emailInput = form.querySelector('#email') as HTMLInputElement;
    const passwordInput = form.querySelector('#password') as HTMLInputElement;
    const emailHelp = document.getElementById('emailHelp');
    const passwordHelp = document.getElementById('passwordHelp');

    // Reset validation states
    emailHelp?.classList.add('d-none');
    passwordHelp?.classList.add('d-none');

    let hasErrors = false;

    // Validate email
    if (!emailInput.value.includes('@')) {
      emailHelp?.classList.remove('d-none');
      emailInput.focus();
      hasErrors = true;
    }

    // Validate password
    if (passwordInput.value.length < 8) {
      passwordHelp?.classList.remove('d-none');
      if (!hasErrors) passwordInput.focus(); // Only focus if first error
      hasErrors = true;
    }

    if (hasErrors) {
      setIsSubmitting(false);
      return;
    }

    try {
      // Track form submission
      if (typeof window !== 'undefined' && (window as any).trackFormSubmission) {
        (window as any).trackFormSubmission('enhanced_validation_form');
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success modal if available
      const successModal = document.getElementById('successModal');
      if (successModal && (window as any).bootstrap) {
        const modal = new (window as any).bootstrap.Modal(successModal);
        modal.show();
      }

      // Reset form
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <Card className="luxury-card">
            <CardHeader>
              <div className="text-center">
                <h3 className="font-playfair text-white mb-2">
                  <i className="fas fa-shield-alt me-2" style={{ color: 'var(--bs-secondary)' }}></i>
                  Enhanced Form Validation
                </h3>
                <p className="text-gray-400">
                  Real-time validation with accessibility features
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} aria-label="Join Gentlemen Club" className="needs-validation" noValidate>
                {/* Email Field */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-white fw-bold">
                    <i className="fas fa-envelope me-2" style={{ color: 'var(--bs-secondary)' }}></i>
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    id="email"
                    style={{
                      backgroundColor: 'rgba(26, 43, 60, 0.8)',
                      borderColor: 'var(--bs-secondary)',
                      color: 'white'
                    }}
                    required
                    aria-describedby="emailHelp"
                    placeholder="Enter your email"
                  />
                  <div id="emailHelp" className="form-text text-danger d-none">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    Please enter a valid email address.
                  </div>
                </div>

                {/* Password Field */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label text-white fw-bold">
                    <i className="fas fa-lock me-2" style={{ color: 'var(--bs-secondary)' }}></i>
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    style={{
                      backgroundColor: 'rgba(26, 43, 60, 0.8)',
                      borderColor: 'var(--bs-secondary)',
                      color: 'white'
                    }}
                    required
                    aria-describedby="passwordHelp"
                    placeholder="Enter your password"
                  />
                  <div id="passwordHelp" className="form-text text-danger d-none">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    Password must be at least 8 characters.
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="btn btn-lg px-5 py-3"
                    style={{
                      backgroundColor: 'var(--bs-secondary)',
                      borderColor: 'var(--bs-secondary)',
                      color: '#1a2b3c'
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-crown me-2"></i>
                        Join Now
                      </>
                    )}
                  </Button>
                </div>
              </form>

              {/* Success Modal */}
              <div className="modal fade" id="successModal" tabIndex={-1} aria-labelledby="successModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content bg-dark text-white border-secondary">
                    <div className="modal-header border-secondary">
                      <h5 className="modal-title font-playfair" id="successModalLabel">
                        <i className="fas fa-crown me-2" style={{ color: 'var(--bs-secondary)' }}></i>
                        Welcome to the Club!
                      </h5>
                      <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body text-center py-4">
                      <div className="mb-3">
                        <i className="fas fa-check-circle fa-3x" style={{ color: 'var(--bs-secondary)' }}></i>
                      </div>
                      <h6 className="fw-bold mb-2">Registration Successful!</h6>
                      <p className="text-gray-300 mb-0">
                        You've successfully joined the Gentlemen's Club. Welcome to the exclusive community!
                      </p>
                    </div>
                    <div className="modal-footer border-secondary justify-content-center">
                      <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                        <i className="fas fa-thumbs-up me-2"></i>
                        Excellent
                      </button>
                    </div>
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