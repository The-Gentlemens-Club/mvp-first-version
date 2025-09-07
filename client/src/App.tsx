import { Switch, Route, useLocation } from "wouter";
import { useEffect, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/error-boundary";
import { PageLoader } from "@/components/loading-states";
import { PerformanceMonitor } from "@/components/performance-monitor";
import { NotificationProvider } from "@/components/notification-provider";
import { useSoundEffects } from "@/hooks/use-sound";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import NFTCollection from "@/pages/nft-collection";
import EligibilityPage from "@/pages/eligibility";
import BootstrapDemo from "@/pages/bootstrap-demo";
import NotFound from "@/pages/not-found";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Force scroll to top on route change
    window.scrollTo(0, 0);
    // Additional attempts to ensure it works
    setTimeout(() => window.scrollTo(0, 0), 10);
    setTimeout(() => window.scrollTo(0, 0), 100);
    setTimeout(() => window.scrollTo(0, 0), 300);
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/casino" component={Dashboard} />
        <Route path="/nft-collection" component={NFTCollection} />
        <Route path="/eligibility" component={EligibilityPage} />
        <Route path="/bootstrap-demo" component={BootstrapDemo} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function AppContent() {
  // Temporarily disable sound effects until we fix the hook
  // useSoundEffects();

  return (
    <>
      <NotificationProvider />
      <div className="min-h-screen gentlemen-secondary">
        <Suspense fallback={<PageLoader message="Initializing platform..." />}>
          <Toaster />
          <Router />
          <MobileBottomNav />
          <PerformanceMonitor />
        </Suspense>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  );
}

export default App;
