import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SkeletonLoaderProps {
  count?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  variant?: 'text' | 'card' | 'activity';
}

export function SkeletonLoader({ 
  count = 1, 
  height, 
  width,
  className = "",
  variant = 'text' 
}: SkeletonLoaderProps) {
  
  const getSkeletonByVariant = () => {
    switch(variant) {
      case 'card':
        return (
          <div className={`luxury-card p-6 ${className}`}>
            <Skeleton height={200} className="mb-4" />
            <Skeleton count={2} className="mb-2" />
            <Skeleton width="60%" />
          </div>
        );
      
      case 'activity':
        return (
          <div className={`flex gap-3 p-3 ${className}`}>
            <Skeleton circle width={32} height={32} />
            <div className="flex-1">
              <Skeleton width="80%" className="mb-1" />
              <Skeleton width="40%" height={12} />
            </div>
          </div>
        );
      
      default:
        return <Skeleton count={count} height={height} width={width} className={className} />;
    }
  };

  return (
    <SkeletonTheme 
      baseColor="rgba(212, 175, 55, 0.1)" 
      highlightColor="rgba(212, 175, 55, 0.2)"
    >
      {getSkeletonByVariant()}
    </SkeletonTheme>
  );
}