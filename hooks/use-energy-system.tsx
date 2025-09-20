"use client"

import { useState, useEffect, useCallback } from "react"

interface UseEnergySystemReturn {
  currentEnergy: number
  maxEnergy: number
  energyPercentage: number
  canScroll: boolean
  timeUntilNextEnergy: number
  consumeEnergy: (amount?: number) => boolean
  energyRechargeRate: number
}

const MAX_ENERGY = 100
const ENERGY_PER_SCROLL = 2
const RECHARGE_RATE = 1 // Energy points per minute
const RECHARGE_INTERVAL = 60000 // 1 minute in milliseconds

export function useEnergySystem(): UseEnergySystemReturn {
  const [currentEnergy, setCurrentEnergy] = useState(MAX_ENERGY)
  const [lastRechargeTime, setLastRechargeTime] = useState(Date.now())

  // Load energy from localStorage on mount
  useEffect(() => {
    const savedEnergy = localStorage.getItem("user_energy")
    const savedTime = localStorage.getItem("last_recharge_time")

    if (savedEnergy && savedTime) {
      const energy = Number.parseInt(savedEnergy, 10)
      const lastTime = Number.parseInt(savedTime, 10)
      const timePassed = Date.now() - lastTime
      const energyToRecharge = Math.floor(timePassed / RECHARGE_INTERVAL) * RECHARGE_RATE

      setCurrentEnergy(Math.min(MAX_ENERGY, energy + energyToRecharge))
      setLastRechargeTime(lastTime + Math.floor(timePassed / RECHARGE_INTERVAL) * RECHARGE_INTERVAL)
    }
  }, [])

  // Auto-recharge energy every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEnergy((prev) => {
        const newEnergy = Math.min(MAX_ENERGY, prev + RECHARGE_RATE)
        localStorage.setItem("user_energy", newEnergy.toString())
        return newEnergy
      })

      const now = Date.now()
      setLastRechargeTime(now)
      localStorage.setItem("last_recharge_time", now.toString())
    }, RECHARGE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  // Save energy to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("user_energy", currentEnergy.toString())
  }, [currentEnergy])

  const consumeEnergy = useCallback(
    (amount: number = ENERGY_PER_SCROLL): boolean => {
      if (currentEnergy >= amount) {
        setCurrentEnergy((prev) => prev - amount)
        return true
      }
      return false
    },
    [currentEnergy],
  )

  const energyPercentage = (currentEnergy / MAX_ENERGY) * 100
  const canScroll = currentEnergy >= ENERGY_PER_SCROLL

  // Calculate time until next energy point
  const timeUntilNextEnergy =
    currentEnergy < MAX_ENERGY ? RECHARGE_INTERVAL - ((Date.now() - lastRechargeTime) % RECHARGE_INTERVAL) : 0

  return {
    currentEnergy,
    maxEnergy: MAX_ENERGY,
    energyPercentage,
    canScroll,
    timeUntilNextEnergy,
    consumeEnergy,
    energyRechargeRate: RECHARGE_RATE,
  }
}
