import { motion } from 'framer-motion';

interface AnimatedProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  height?: string;
}

export function AnimatedProgress({ 
  value, 
  max = 100, 
  label,
  color = '#d4af37',
  showPercentage = true,
  height = '8px'
}: AnimatedProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-300">{label}</span>
          {showPercentage && (
            <span className="text-sm font-bold" style={{ color }}>
              {percentage.toFixed(1)}%
            </span>
          )}
        </div>
      )}
      <div 
        className="relative w-full bg-gray-800 rounded-full overflow-hidden"
        style={{ height }}
      >
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, ${color}dd)` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="absolute inset-0 shimmer-effect opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}