import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="luxury-card p-8 text-center">
              <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              
              <h1 className="text-3xl font-bold text-white mb-4 font-playfair">
                Something Went Wrong
              </h1>
              
              <p className="text-gray-300 mb-8 font-inter leading-relaxed">
                We encountered an unexpected error while loading the application. 
                This has been logged and our team will investigate the issue.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={this.handleRetry}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Try Again
                </Button>
                
                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-6 py-3 flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-yellow-600 text-yellow-400 hover:bg-yellow-500/10 px-6 py-3 flex items-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Go Home
                </Button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="text-left bg-gray-900/50 rounded-lg p-4 mt-6">
                  <summary className="cursor-pointer text-gray-400 font-medium mb-2 flex items-center gap-2">
                    <Bug className="w-4 h-4" />
                    Error Details (Development Only)
                  </summary>
                  <div className="text-sm text-red-400 font-mono whitespace-pre-wrap bg-gray-900 rounded p-3 overflow-auto max-h-40">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </div>
                </details>
              )}

              <div className="mt-8 pt-6 border-t border-gray-700">
                <p className="text-xs text-gray-500">
                  Error ID: {Date.now().toString(36)}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook for error boundary in functional components
export function useErrorHandler() {
  return (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Application error:', error, errorInfo);
    // Here you could send error to logging service
  };
}

// Simple error display component
export function ErrorDisplay({ 
  error, 
  onRetry, 
  title = "Something went wrong" 
}: { 
  error: string | Error; 
  onRetry?: () => void; 
  title?: string; 
}) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="luxury-card p-6 text-center max-w-md mx-auto">
      <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-6 h-6 text-red-500" />
      </div>
      
      <h3 className="text-lg font-semibold text-white mb-2">
        {title}
      </h3>
      
      <p className="text-gray-400 text-sm mb-4">
        {errorMessage}
      </p>

      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="text-emerald-400 border-emerald-600 hover:bg-emerald-500/10"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export default ErrorBoundary;