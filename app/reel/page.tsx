"use client"

import { ReelFeed } from "@/components/reel-feed"
import { useEnergySystem } from "@/hooks/use-energy-system"

export default function ReelPage() {
  const { canScroll } = useEnergySystem()
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <ReelFeed canScroll={canScroll} />
      </div>
    </div>
  )
}