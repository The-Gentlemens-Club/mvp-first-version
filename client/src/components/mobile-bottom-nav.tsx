import { Link, useLocation } from "wouter";
import { Home, Gamepad2, Coins, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Gamepad2, label: "Casino", path: "/casino" },
  { icon: Coins, label: "Staking", path: "/dashboard?tab=staking" },
  { icon: Trophy, label: "NFTs", path: "/nft-collection" },
  { icon: User, label: "Profile", path: "/dashboard?tab=profile" }
];

export function MobileBottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-gray-800">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location === item.path || 
            (item.path === "/casino" && location === "/dashboard");
          
          return (
            <Link key={item.path} href={item.path}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all",
                  "active:bg-gray-800/50",
                  isActive 
                    ? "text-yellow-400" 
                    : "text-gray-400 hover:text-gray-300"
                )}
              >
                <div className="relative">
                  <item.icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    />
                  )}
                </div>
                <span className="text-xs">{item.label}</span>
              </motion.button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}