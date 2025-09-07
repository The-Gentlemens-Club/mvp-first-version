import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  glassEffect?: boolean;
}

export function EnhancedCard({ 
  children, 
  className = "", 
  delay = 0,
  glassEffect = false
}: EnhancedCardProps) {
  const baseClass = glassEffect ? "glass-morphism-dark" : "luxury-card";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ 
        scale: 1.02,
        rotateX: 5,
        rotateY: -5,
        transition: { duration: 0.3 }
      }}
      className={`${baseClass} card-3d ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}