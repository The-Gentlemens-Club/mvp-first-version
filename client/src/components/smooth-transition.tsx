import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SmoothTransitionProps {
  children: ReactNode;
  type?: 'fade' | 'slide' | 'scale' | 'slideUp';
  delay?: number;
  duration?: number;
  className?: string;
}

export function SmoothTransition({ 
  children, 
  type = 'fade',
  delay = 0,
  duration = 0.5,
  className = ""
}: SmoothTransitionProps) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slide: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    slideUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 },
    },
  };

  return (
    <motion.div
      className={className}
      initial={variants[type].initial}
      animate={variants[type].animate}
      exit={variants[type].exit}
      transition={{ duration, delay, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}