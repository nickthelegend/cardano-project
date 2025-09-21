"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useWallet } from "@meshsdk/react"

import { useEnergySystem } from "./use-energy-system"

interface ScrollReward {
  amount: number
  timestamp: number
  id: string
}

interface UseScrollRewardsReturn {
  earnTokens: (amount: number) => void
  showReward: boolean
  rewardAmount: number
  dailyEarnings: number
  canEarn: boolean
  timeUntilReset: number
  streakDays: number
}

const DAILY_LIMIT = 100 // Maximum tokens per day
const MIN_SCROLL_INTERVAL = 1500 // Minimum time between rewards (ms)
const REWARD_RANGE = { min: 1, max: 8 } // Token reward range

export function useScrollRewards(): UseScrollRewardsReturn {
  const { connected } = useWallet()

  const { canScroll, consumeEnergy } = useEnergySystem() // Added energy system integration
  const [showReward, setShowReward] = useState(false)
  const [rewardAmount, setRewardAmount] = useState(0)
  const [dailyEarnings, setDailyEarnings] = useState(0)
  const [streakDays, setStreakDays] = useState(0)
  const lastRewardTime = useRef(0)
  const rewardTimeoutRef = useRef<NodeJS.Timeout>()

  // Check if user can still earn tokens today
  const canEarn = dailyEarnings < DAILY_LIMIT && canScroll // Added energy check

  // Calculate time until daily reset (midnight)
  const timeUntilReset = useCallback(() => {
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    return tomorrow.getTime() - now.getTime()
  }, [])

  // Load daily earnings from localStorage
  useEffect(() => {
    const today = new Date().toDateString()
    const savedEarnings = localStorage.getItem(`daily_earnings_${today}`)
    if (savedEarnings) {
      setDailyEarnings(Number.parseInt(savedEarnings, 10))
    }
  }, [])

  useEffect(() => {
    const savedStreak = localStorage.getItem("daily_streak")
    const lastLoginDate = localStorage.getItem("last_login_date")
    const today = new Date().toDateString()

    if (lastLoginDate) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)

      if (lastLoginDate === today) {
        // Same day, keep current streak
        if (savedStreak) {
          setStreakDays(Number.parseInt(savedStreak, 10))
        }
      } else if (lastLoginDate === yesterday.toDateString()) {
        // Consecutive day, increment streak
        const newStreak = savedStreak ? Number.parseInt(savedStreak, 10) + 1 : 1
        setStreakDays(newStreak)
        localStorage.setItem("daily_streak", newStreak.toString())
      } else {
        // Streak broken, reset to 1
        setStreakDays(1)
        localStorage.setItem("daily_streak", "1")
      }
    } else {
      // First time, start streak
      setStreakDays(1)
      localStorage.setItem("daily_streak", "1")
    }

    localStorage.setItem("last_login_date", today)
  }, [])

  // Reset daily earnings at midnight
  useEffect(() => {
    const resetTimer = setTimeout(() => {
      setDailyEarnings(0)
      const today = new Date().toDateString()
      localStorage.removeItem(`daily_earnings_${today}`)
    }, timeUntilReset())

    return () => clearTimeout(resetTimer)
  }, [timeUntilReset])

  const earnTokens = useCallback(
    (amount: number) => {
      const now = Date.now()

      // Check if enough time has passed since last reward
      if (now - lastRewardTime.current < MIN_SCROLL_INTERVAL) {
        return
      }

      if (!canScroll || !consumeEnergy()) {
        console.log("[v0] Not enough energy to earn tokens")
        return
      }

      // Check daily limit
      if (dailyEarnings >= DAILY_LIMIT) {
        return
      }

      // Calculate actual reward (random within range, capped by daily limit)
      const maxPossible = Math.min(amount, DAILY_LIMIT - dailyEarnings)
      const baseReward = Math.min(
        Math.floor(Math.random() * (REWARD_RANGE.max - REWARD_RANGE.min + 1)) + REWARD_RANGE.min,
        maxPossible,
      )

      const streakMultiplier = Math.min(1 + streakDays * 0.1, 2.0)
      const actualReward = Math.floor(baseReward * streakMultiplier)

      if (actualReward <= 0) return

      // Update state
      setRewardAmount(actualReward)
      setShowReward(true)
      setDailyEarnings((prev) => {
        const newTotal = prev + actualReward
        const today = new Date().toDateString()
        localStorage.setItem(`daily_earnings_${today}`, newTotal.toString())
        return newTotal
      })

      lastRewardTime.current = now

      // Hide reward notification after 2 seconds
      if (rewardTimeoutRef.current) {
        clearTimeout(rewardTimeoutRef.current)
      }
      rewardTimeoutRef.current = setTimeout(() => {
        setShowReward(false)
      }, 2000)

      // In a real app, this would make an API call to update user's balance
      console.log(
        `[v0] User earned ${actualReward} $Scroll tokens (${baseReward} base + ${((streakMultiplier - 1) * 100).toFixed(0)}% streak bonus). Daily total: ${dailyEarnings + actualReward}`,
      )
    },
    [dailyEarnings, canScroll, consumeEnergy, streakDays],
  )

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (rewardTimeoutRef.current) {
        clearTimeout(rewardTimeoutRef.current)
      }
    }
  }, [])

  return {
    earnTokens,
    showReward,
    rewardAmount,
    dailyEarnings,
    canEarn,
    timeUntilReset: timeUntilReset(),
    streakDays,
  }
}
