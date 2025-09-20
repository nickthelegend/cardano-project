"use client"

import { useState, useEffect, useCallback } from "react"

export function useEnergy() {
  const [energy, setEnergy] = useState(100)
  const [lastRechargeTime, setLastRechargeTime] = useState(Date.now())

  const MAX_ENERGY = 100
  const ENERGY_PER_SCROLL = 2
  const RECHARGE_RATE = 1
  const RECHARGE_INTERVAL = 60000 // 1 minute

  // Load energy from localStorage on mount
  useEffect(() => {
    const savedEnergy = localStorage.getItem("user-energy")
    const savedTime = localStorage.getItem("last-recharge-time")

    if (savedEnergy && savedTime) {
      const parsedEnergy = Number.parseInt(savedEnergy)
      const parsedTime = Number.parseInt(savedTime)
      const timePassed = Date.now() - parsedTime
      const rechargeAmount = Math.floor(timePassed / RECHARGE_INTERVAL) * RECHARGE_RATE

      setEnergy(Math.min(parsedEnergy + rechargeAmount, MAX_ENERGY))
      setLastRechargeTime(parsedTime)
    }
  }, [])

  // Save energy to localStorage
  useEffect(() => {
    localStorage.setItem("user-energy", energy.toString())
    localStorage.setItem("last-recharge-time", lastRechargeTime.toString())
  }, [energy, lastRechargeTime])

  // Recharge energy
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergy((prev) => {
        const newEnergy = Math.min(prev + RECHARGE_RATE, MAX_ENERGY)
        if (newEnergy !== prev) {
          setLastRechargeTime(Date.now())
        }
        return newEnergy
      })
    }, RECHARGE_INTERVAL)

    return () => clearInterval(interval)
  }, [])

  const consumeEnergy = useCallback(() => {
    if (energy >= ENERGY_PER_SCROLL) {
      setEnergy((prev) => prev - ENERGY_PER_SCROLL)
      return true
    }
    return false
  }, [energy])

  const canScroll = energy >= ENERGY_PER_SCROLL

  return {
    energy,
    maxEnergy: MAX_ENERGY,
    canScroll,
    consumeEnergy,
    energyPerScroll: ENERGY_PER_SCROLL,
    rechargeRate: RECHARGE_RATE,
    rechargeInterval: RECHARGE_INTERVAL,
  }
}
