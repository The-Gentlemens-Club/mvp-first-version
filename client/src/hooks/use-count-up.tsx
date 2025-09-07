import { useEffect, useState, useRef } from 'react';

interface UseCountUpProps {
  end: number;
  duration?: number;
  decimals?: number;
  start?: number;
  prefix?: string;
  suffix?: string;
}

export function useCountUp({
  end,
  duration = 2000,
  decimals = 0,
  start = 0,
  prefix = '',
  suffix = ''
}: UseCountUpProps) {
  const [value, setValue] = useState(start);
  const previousEndRef = useRef(start);
  
  useEffect(() => {
    if (end === previousEndRef.current) return;
    
    const startValue = previousEndRef.current;
    const startTime = Date.now();
    const difference = end - startValue;
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (difference * easeOutQuart);
      
      setValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setValue(end);
        previousEndRef.current = end;
      }
    };
    
    requestAnimationFrame(animate);
  }, [end, duration]);
  
  const formattedValue = `${prefix}${(value || 0).toFixed(decimals)}${suffix}`;
  
  return { value, formattedValue };
}