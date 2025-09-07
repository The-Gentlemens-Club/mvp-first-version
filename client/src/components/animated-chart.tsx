import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface AnimatedChartProps {
  type: 'line' | 'bar' | 'doughnut';
  data: any;
  options?: any;
  className?: string;
}

export function AnimatedChart({ type, data, options = {}, className = "" }: AnimatedChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#f5f5f5',
          font: {
            family: 'Inter',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 43, 60, 0.95)',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        borderWidth: 1,
        titleColor: '#d4af37',
        bodyColor: '#f5f5f5',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          color: 'rgba(212, 175, 55, 0.1)',
        },
        ticks: {
          color: '#999',
        },
      },
      y: {
        grid: {
          color: 'rgba(212, 175, 55, 0.1)',
        },
        ticks: {
          color: '#999',
        },
      },
    } : undefined,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const ChartComponent = type === 'line' ? Line : type === 'bar' ? Bar : Doughnut;

  return (
    <motion.div
      className={`chart-container ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ChartComponent data={data} options={mergedOptions} />
    </motion.div>
  );
}