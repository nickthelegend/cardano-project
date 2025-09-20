"use client"

import { motion } from "framer-motion"
import { Home, Video, Target, Wallet } from 'lucide-react'

interface BottomNavigationProps {
  activeView: "home" | "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile"
  onViewChange: (view: "home" | "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile") => void
}

export function BottomNavigation({ activeView, onViewChange }: BottomNavigationProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "feed", icon: Video, label: "Reel Feed" },
    { id: "challenges", icon: Target, label: "Challenges" },
    { id: "wallet", icon: Wallet, label: "Wallet" }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 z-50">
      <div className="flex items-center justify-around py-3">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          
          return (
            <motion.button
              key={`${item.id}-${index}`}
              onClick={() => onViewChange(item.id)}
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
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className="text-xs">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -top-1 w-1 h-1 bg-emerald-400 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
