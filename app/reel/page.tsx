"use client"

import { ReelFeed } from "@/components/reel-feed"
import { useEnergySystem } from "@/hooks/use-energy-system"

export default function ReelPage() {
  const { canScroll } = useEnergySystem()
  
  return <ReelFeed canScroll={canScroll} />
}