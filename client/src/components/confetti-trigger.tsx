import { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

interface ConfettiTriggerProps {
  active: boolean;
  duration?: number;
}

export function ConfettiTrigger({ active, duration = 3000 }: ConfettiTriggerProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (active) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!showConfetti) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      gravity={0.1}
      colors={['#d4af37', '#50c878', '#4169e1', '#9c27b0', '#ff6b6b']}
      recycle={false}
    />
  );
}