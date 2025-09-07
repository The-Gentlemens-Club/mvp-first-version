import { Crown } from "lucide-react";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  text = 'Loading...', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center space-y-3 ${className}`}>
      <div className="relative">
        <div className={`${sizeClasses[size]} animate-spin`}>
          <Crown className="w-full h-full metal-gold" />
        </div>
        <div className="absolute inset-0 border-2 border-yellow-400/30 rounded-full animate-pulse"></div>
      </div>
      {text && (
        <p className={`text-gray-300 font-inter ${textSizes[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
}

export function LoadingCard({ className = "" }: { className?: string }) {
  return (
    <div className={`luxury-card p-6 ${className}`}>
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-3 bg-gray-700/50 rounded"></div>
          <div className="h-3 bg-gray-700/50 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
}

export function LoadingStats() {
  return (
    <div className="luxury-grid">
      {[...Array(6)].map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}