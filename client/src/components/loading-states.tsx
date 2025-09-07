import React from 'react';
import { Loader2, Crown, Dice1, TrendingUp } from 'lucide-react';

// Enhanced loading skeleton component
export function LoadingSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-700/50 rounded-lg h-4 mb-2"></div>
      <div className="bg-gray-700/30 rounded-lg h-4 mb-2 w-3/4"></div>
      <div className="bg-gray-700/20 rounded-lg h-4 w-1/2"></div>
    </div>
  );
}

// Card loading skeleton
export function CardSkeleton() {
  return (
    <div className="luxury-card p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-700/50 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-700/50 rounded mb-2"></div>
          <div className="h-3 bg-gray-700/30 rounded w-2/3"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-700/30 rounded"></div>
        <div className="h-3 bg-gray-700/20 rounded w-5/6"></div>
        <div className="h-3 bg-gray-700/10 rounded w-4/6"></div>
      </div>
    </div>
  );
}

// Full page loading component
export function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping">
            <Crown className="w-16 h-16 text-yellow-400/50 mx-auto" />
          </div>
          <Crown className="w-16 h-16 text-yellow-400 mx-auto animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4 font-playfair">
          The Gentlemen's Club
        </h2>
        <div className="flex items-center justify-center gap-2 text-gray-300">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-inter">{message}</span>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Inline loader for buttons and small components
export function InlineLoader({ size = "sm", className = "" }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  };

  return (
    <Loader2 className={`animate-spin ${sizeClasses[size]} ${className}`} />
  );
}

// Data loading state with retry option
export function DataLoader({ 
  isLoading, 
  error, 
  onRetry, 
  children 
}: { 
  isLoading: boolean; 
  error?: string | null; 
  onRetry?: () => void; 
  children: React.ReactNode;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
          <p className="text-gray-300 font-inter">Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-red-500" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Unable to Load Data</h3>
          <p className="text-gray-400 text-sm mb-6">{error}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn-luxury-outline px-6 py-2 text-sm"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// Gaming-specific loading states
export function GameLoader() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 animate-spin">
            <Dice1 className="w-12 h-12 text-emerald-500/30 mx-auto" />
          </div>
          <Dice1 className="w-12 h-12 text-emerald-500 mx-auto animate-pulse" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 font-playfair">
          Initializing Game
        </h3>
        <p className="text-gray-400 font-inter text-sm">
          Connecting to gaming providers...
        </p>
        <div className="mt-4 w-48 mx-auto">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}