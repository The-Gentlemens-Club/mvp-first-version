import { useEffect, useState } from 'react';
import { Activity, Zap, Wifi, Clock } from 'lucide-react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  connectionType: string;
  isOnline: boolean;
}

export function usePerformanceMetrics(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    connectionType: 'unknown',
    isOnline: navigator.onLine
  });

  useEffect(() => {
    // Measure load time
    const loadTime = performance.now();
    
    // Measure render time
    const startRender = performance.now();
    requestAnimationFrame(() => {
      const renderTime = performance.now() - startRender;
      setMetrics(prev => ({ ...prev, renderTime }));
    });

    // Get connection info
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    const connectionType = connection?.effectiveType || 'unknown';

    setMetrics(prev => ({
      ...prev,
      loadTime,
      connectionType
    }));

    // Listen for online/offline events
    const handleOnline = () => setMetrics(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setMetrics(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return metrics;
}

// Development performance monitor component
export function PerformanceMonitor() {
  const metrics = usePerformanceMetrics();
  const [isVisible, setIsVisible] = useState(false);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Performance Monitor"
      >
        <Activity className="w-4 h-4" />
      </button>

      {isVisible && (
        <div className="absolute bottom-12 right-0 bg-gray-900 text-white p-4 rounded-lg shadow-xl border border-gray-700 min-w-64">
          <h3 className="font-semibold mb-3 text-emerald-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            Performance Metrics
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Load Time:</span>
              <span className={metrics.loadTime < 1000 ? 'text-green-400' : metrics.loadTime < 3000 ? 'text-yellow-400' : 'text-red-400'}>
                {metrics.loadTime.toFixed(0)}ms
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Render Time:</span>
              <span className={metrics.renderTime < 16 ? 'text-green-400' : 'text-yellow-400'}>
                {metrics.renderTime.toFixed(1)}ms
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300 flex items-center gap-1">
                <Wifi className="w-3 h-3" />
                Connection:
              </span>
              <span className={metrics.isOnline ? 'text-green-400' : 'text-red-400'}>
                {metrics.isOnline ? metrics.connectionType : 'offline'}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Status:
              </span>
              <span className="text-green-400">
                {metrics.isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}