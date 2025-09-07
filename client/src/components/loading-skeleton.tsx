import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function Skeleton({ className, lines = 1, height = "h-4" }: SkeletonProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50",
            "rounded animate-shimmer bg-[length:200%_100%]",
            height
          )}
        />
      ))}
    </div>
  );
}

export function GameCardSkeleton() {
  return (
    <div className="luxury-card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-24" height="h-6" />
        <Skeleton className="w-16" height="h-5" />
      </div>
      <Skeleton className="w-full" height="h-32" />
      <Skeleton lines={2} />
      <div className="flex justify-between">
        <Skeleton className="w-20" height="h-8" />
        <Skeleton className="w-20" height="h-8" />
      </div>
    </div>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="luxury-card p-6 space-y-3">
      <Skeleton className="w-32" height="h-5" />
      <Skeleton className="w-48" height="h-8" />
      <Skeleton className="w-24" height="h-4" />
    </div>
  );
}