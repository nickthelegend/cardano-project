"use client"

import { motion } from "framer-motion"
import { Home, Video, Target, Wallet, Trophy } from 'lucide-react'
import Link from "next/link"

interface BottomNavigationProps {
  activeView: string
}

export function BottomNavigation({ activeView }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home", href: "/home" },
    { id: "reel", icon: Video, label: "Reels", href: "/reel" },
    { id: "leaderboard", icon: Trophy, label: "Leaderboard", href: "/leaderboard" },
    { id: "challenges", icon: Target, label: "Challenges", href: "/challenges" },
    { id: "wallet", icon: Wallet, label: "Wallet", href: "/wallet" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 z-50 mobile-nav-safe-area">
      <div className="flex items-center justify-around py-3 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <Link key={`${item.id}-${index}`} href={item.href}>
              <motion.div
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-emerald-400" : "text-gray-400"
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    color: isActive ? "#10b981" : "#9ca3af"
                  }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center w-8 h-8"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -top-1 w-1 h-1 bg-emerald-400 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
