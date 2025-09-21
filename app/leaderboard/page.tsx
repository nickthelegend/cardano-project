"use client"

import { EnhancedLeaderboard } from "@/components/enhanced-leaderboard"

export default function LeaderboardPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <EnhancedLeaderboard />
      </div>
    </div>
  )
}