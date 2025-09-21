"use client"

import { DailyChallenges } from "@/components/daily-challenges"

export default function ChallengesPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <DailyChallenges />
      </div>
    </div>
  )
}