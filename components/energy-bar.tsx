"use client"

import styled from "styled-components"
import { useEnergySystem } from "@/hooks/use-energy-system"

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
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const EnergyTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`

const EnergyIcon = styled.span`
  font-size: 1rem;
`

const EnergyCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 600;
`

const EnergyBarContainer = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const EnergyFill = styled.div<{ $percentage: number; $low: boolean }>`
  height: 100%;
  width: ${(props) => props.$percentage}%;
  background: ${({ $low, theme }) =>
    $low ? "linear-gradient(90deg, #ff4444, #ff6666)" : "linear-gradient(90deg, #44ff88, #66ffaa)"};
  transition: all 0.3s ease;
  animation: ${({ $low }) => ($low ? "pulse 1s infinite" : "none")};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`

const EnergyStatus = styled.div<{ $canScroll: boolean }>`
  font-size: 0.75rem;
  color: ${({ $canScroll, theme }) => ($canScroll ? theme.colors.text : "#ff6666")};
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
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #ff4444, #ff6666);
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

export function EnergyBar() {
  const { currentEnergy, maxEnergy, energyPercentage, canScroll, timeUntilNextEnergy, energyRechargeRate } =
    useEnergySystem()

  const isLowEnergy = energyPercentage < 20
  const isEmpty = currentEnergy === 0

  const formatTimeUntilRecharge = (ms: number) => {
    const minutes = Math.floor(ms / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <EnergyContainer>
      <EnergyWarning $show={isEmpty}>Out of energy! Wait to recharge</EnergyWarning>

      <EnergyHeader>
        <EnergyTitle>
          <EnergyIcon>⚡</EnergyIcon>
          Energy
        </EnergyTitle>
        <EnergyCount>
          {currentEnergy}/{maxEnergy}
        </EnergyCount>
      </EnergyHeader>

      <EnergyBarContainer>
        <EnergyFill $percentage={energyPercentage} $low={isLowEnergy} />
      </EnergyBarContainer>

      <EnergyStatus $canScroll={canScroll}>
        {canScroll ? "Ready to scroll!" : isEmpty ? "Energy depleted - recharging..." : "Low energy - scroll carefully"}
      </EnergyStatus>

      {currentEnergy < maxEnergy && (
        <RechargeTimer>
          Next energy in {formatTimeUntilRecharge(timeUntilNextEnergy)}
          <br />+{energyRechargeRate} energy/min
        </RechargeTimer>
      )}
    </EnergyContainer>
  )
}
