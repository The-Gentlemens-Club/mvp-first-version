import React from 'react';
import { EnhancedNavigation } from '@/components/enhanced-navigation';
import { BootstrapShowcase } from '@/components/bootstrap-showcase';

export default function BootstrapDemo() {
  return (
    <div className="min-h-screen gentlemen-secondary">
      <EnhancedNavigation />
      
      <main className="pt-8">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <BootstrapShowcase />
        </div>
      </main>
    </div>
  );
}