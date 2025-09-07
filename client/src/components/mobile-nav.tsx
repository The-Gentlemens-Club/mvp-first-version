import { Home, Gamepad2, Coins, Users, Menu } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Gamepad2, label: 'Casino', path: '/dashboard' },
  { icon: Coins, label: 'Staking', path: '/dashboard?tab=staking' },
  { icon: Users, label: 'DAO', path: '/dashboard?tab=dao' },
  { icon: Menu, label: 'More', path: '/dashboard?tab=more' }
];

export function MobileNav() {
  const [location] = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const isActive = item.path === '/' 
            ? location === '/' 
            : location.includes(item.path.split('?')[0]);
          
          return (
            <Link key={item.path} href={item.path}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex flex-col items-center justify-center p-2 rounded-lg transition-all",
                  isActive 
                    ? "text-yellow-400" 
                    : "text-gray-400 hover:text-gray-300"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute inset-0 bg-yellow-400/10 rounded-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon className="w-5 h-5 mb-1 relative z-10" />
                <span className="text-xs relative z-10">{item.label}</span>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full"
                  />
                )}
              </motion.button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}