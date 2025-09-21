"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const EnergyContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 1000;
  min-width: 200px;
`

const EnergyHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const EnergyIcon = styled.div`
  font-size: 1.2rem;
`

const EnergyTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const EnergyCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
  margin-left: auto;
`

const EnergyBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const EnergyFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: linear-gradient(90deg, #ff4757, #ffa502);
  transition: width 0.3s ease;
`

const EnergyStatus = styled.div<{ $canScroll: boolean }>`
  font-size: 0.75rem;
  color: ${({ $canScroll, theme }) => ($canScroll ? theme.colors.primary : theme.colors.text)};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const RechargeTimer = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
`

const EnergyWarning = styled.div<{ $show: boolean }>`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: #ff4757;
  color: white;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transition: opacity 0.3s ease;
  z-index: 10;
  white-space: nowrap;
`

interface EnergySystemProps {
  onEnergyChange?: (energy: number, canScroll: boolean) => void
}

export function EnergySystem({ onEnergyChange }: EnergySystemProps) {
  const { connected } = useWallet()
  const [energy, setEnergy] = useState(100) // Start with full energy
  const [lastRechargeTime, setLastRechargeTime] = useState(Date.now())
  const [showWarning, setShowWarning] = useState(false)

  const MAX_ENERGY = 100
  const ENERGY_PER_SCROLL = 2 // Each scroll costs 2 energy
  const RECHARGE_RATE = 1 // 1 energy per minute
  const RECHARGE_INTERVAL = 60000 // 1 minute in milliseconds

  // Calculate time until next recharge
  const getTimeUntilRecharge = () => {
    const timeSinceLastRecharge = Date.now() - lastRechargeTime
    const timeUntilNext = RECHARGE_INTERVAL - (timeSinceLastRecharge % RECHARGE_INTERVAL)
    return timeUntilNext
  }

  // Format time for display
  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  // Recharge energy every minute
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

  // Update parent component when energy changes
  useEffect(() => {
    const canScroll = energy >= ENERGY_PER_SCROLL
    onEnergyChange?.(energy, canScroll)
  }, [energy, onEnergyChange])

  // Consume energy when scrolling
  const consumeEnergy = () => {
    if (energy >= ENERGY_PER_SCROLL) {
      setEnergy((prev) => prev - ENERGY_PER_SCROLL)
      return true
    } else {
      setShowWarning(true)
      setTimeout(() => setShowWarning(false), 3000)
      return false
    }
  }

  // Expose consume function globally for reel feed
  useEffect(() => {
    ;(window as any).consumeEnergy = consumeEnergy
  }, [energy])

  if (!connected) return null

  const energyPercentage = (energy / MAX_ENERGY) * 100
  const canScroll = energy >= ENERGY_PER_SCROLL
  const timeUntilRecharge = getTimeUntilRecharge()

  return (
    <EnergyContainer>
      <EnergyWarning $show={showWarning}>Out of energy! Wait for recharge</EnergyWarning>

      <EnergyHeader>
        <EnergyIcon>⚡</EnergyIcon>
        <EnergyTitle>Energy</EnergyTitle>
        <EnergyCount>
          {energy}/{MAX_ENERGY}
        </EnergyCount>
      </EnergyHeader>

      <EnergyBar>
        <EnergyFill $percentage={energyPercentage} />
      </EnergyBar>

      <EnergyStatus $canScroll={canScroll}>
        {canScroll ? `${Math.floor(energy / ENERGY_PER_SCROLL)} scrolls remaining` : "Recharging..."}
      </EnergyStatus>

      <RechargeTimer>Next recharge: {formatTime(timeUntilRecharge)}</RechargeTimer>
    </EnergyContainer>
  )
}
