import { useEffect, useState, ReactNode } from 'react';

interface ParallaxLayerProps {
  speed?: number;
  children: ReactNode;
  className?: string;
}

export function ParallaxLayer({ speed = 0.5, children, className = "" }: ParallaxLayerProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className={`parallax-layer ${className}`}
      style={{ 
        transform: `translateY(${scrollY * speed}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}