"use client"

import { motion } from "framer-motion"
import { Home, Video, Target, Trophy, User } from 'lucide-react'
import Link from "next/link"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"

interface BottomNavigationProps {
  activeView: string
}

export function BottomNavigation({ activeView }: BottomNavigationProps) {
  const { user } = useUTXOSAuth()
  
  const navItems = [
    { id: "home", icon: Home, href: "/home" },
    { id: "leaderboard", icon: Trophy, href: "/leaderboard" },
    { id: "reel", icon: Video, href: "/reel", isCenter: true },
    { id: "challenges", icon: Target, href: "/challenges" },
    { id: "profile", icon: User, href: "/profile", isProfile: true }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50 z-50">
      <div className="flex items-center justify-around py-3 px-4 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = activeView === item.id
          const isCenter = item.isCenter
          const isProfile = item.isProfile
          
          return (
            <Link key={`${item.id}-${index}`} href={item.href}>
              <motion.div
                className={`flex items-center justify-center relative ${
                  isCenter 
                    ? "w-14 h-14 -mt-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 shadow-lg" 
                    : "w-10 h-10"
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {isProfile ? (
                  <div className={`w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-semibold text-sm ${
                    isActive ? "ring-2 ring-emerald-400 ring-offset-2 ring-offset-gray-900" : ""
                  }`}>
                    {user?.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                ) : (
                  <Icon className={`w-6 h-6 ${
                    isCenter 
                      ? "text-white" 
                      : isActive 
                        ? "text-emerald-400" 
                        : "text-gray-400"
                  }`} />
                )}
              </motion.div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
