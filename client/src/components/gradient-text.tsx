import { ReactNode } from 'react';

interface GradientTextProps {
  children: ReactNode;
  gradient?: string;
  className?: string;
  animate?: boolean;
}

export function GradientText({ 
  children, 
  gradient = 'linear-gradient(120deg, #d4af37, #50c878, #4169e1, #9c27b0)',
  className = "",
  animate = true
}: GradientTextProps) {
  return (
    <span 
      className={`gradient-text ${animate ? 'gradient-animate' : ''} ${className}`}
      style={{ 
        background: gradient,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundSize: animate ? '200% 200%' : 'auto',
      }}
    >
      {children}
    </span>
  );
}