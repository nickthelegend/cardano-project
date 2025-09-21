"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const ModalOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  transition: all 0.3s ease;
`

const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  max-width: 450px;
  width: 90%;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text};
`

const BoostTiers = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const TierSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TierTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const BoostOption = styled.button<{ $selected?: boolean; $tier: "scroll" | "vibe" }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${(props) => (props.$selected ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 2px solid ${(props) => {
    if (props.$selected) return props.theme.colors.primary
    if (props.$tier === "vibe") return props.theme.colors.accent
    return props.theme.colors.border
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
  }
`

const BoostInfo = styled.div`
  text-align: left;
  flex: 1;
`

const BoostTitle = styled.div`
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const BoostDescription = styled.div`
  font-size: 0.85rem;
  opacity: 0.8;
  margin-bottom: 4px;
`

const BoostBenefit = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`

const BoostCost = styled.div<{ $tier: "scroll" | "vibe" }>`
  font-weight: 600;
  color: ${({ $tier, theme }) => ($tier === "vibe" ? theme.colors.accent : theme.colors.primary)};
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const CostAmount = styled.div`
  font-size: 1.1rem;
`

const CostLabel = styled.div`
  font-size: 0.75rem;
  opacity: 0.7;
`

const BoostButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const BalanceInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const BalanceItem = styled.div`
  text-align: center;
`

const BalanceLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.7;
  margin-bottom: 4px;
`

const BalanceAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`

interface BoostModalProps {
  show: boolean
  onClose: () => void
  reelId: string
}

interface BoostTier {
  id: string
  name: string
  description: string
  benefit: string
  cost: number
  currency: "scroll" | "vibe"
  multiplier: number
  duration: string
  icon: string
}

const scrollBoosts: BoostTier[] = [
  {
    id: "scroll-small",
    name: "Quick Boost",
    description: "Small visibility bump",
    benefit: "Appears in 'Trending' for 30 minutes",
    cost: 500,
    currency: "scroll",
    multiplier: 1.5,
    duration: "30 min",
    icon: "📈",
  },
  {
    id: "scroll-medium",
    name: "Power Boost",
    description: "Medium visibility increase",
    benefit: "Featured in category feed for 1 hour",
    cost: 1500,
    currency: "scroll",
    multiplier: 2,
    duration: "1 hour",
    icon: "🔥",
  },
]

const vibeBoosts: BoostTier[] = [
  {
    id: "vibe-premium",
    name: "Premium Boost",
    description: "Major feed placement",
    benefit: "Top of main feed for 2 hours",
    cost: 5,
    currency: "vibe",
    multiplier: 5,
    duration: "2 hours",
    icon: "💎",
  },
  {
    id: "vibe-mega",
    name: "Mega Boost",
    description: "Maximum visibility",
    benefit: "Featured across all feeds for 4 hours",
    cost: 15,
    currency: "vibe",
    multiplier: 10,
    duration: "4 hours",
    icon: "🚀",
  },
]

export function BoostModal({ show, onClose, reelId }: BoostModalProps) {
  const { connected, name } = useWallet()
  const [selectedBoost, setSelectedBoost] = useState<string>("")

  if (!connected) return null

  const user = {
    username: name ? `User_${name.slice(0, 8)}` : "Wallet User",
    scrollTokens: 0,
    vibeTokens: 100,
  }

  const allBoosts = [...scrollBoosts, ...vibeBoosts]
  const selectedBoostTier = allBoosts.find((b) => b.id === selectedBoost)

  const canAfford = selectedBoostTier
    ? selectedBoostTier.currency === "scroll"
      ? user.scrollTokens >= selectedBoostTier.cost
      : user.vibeTokens >= selectedBoostTier.cost
    : false

  const handleBoost = () => {
    if (!selectedBoostTier || !canAfford) return

    console.log(
      `[v0] Boosting reel ${reelId} with ${selectedBoostTier.name} for ${selectedBoostTier.cost} ${selectedBoostTier.currency.toUpperCase()}`,
    )
    onClose()
  }

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>

        <ModalTitle>Boost Your Reel</ModalTitle>

        <BalanceInfo>
          <BalanceItem>
            <BalanceLabel>$SCROLL Balance</BalanceLabel>
            <BalanceAmount>{user.scrollTokens.toLocaleString()}</BalanceAmount>
          </BalanceItem>
          <BalanceItem>
            <BalanceLabel>$VIBE Balance</BalanceLabel>
            <BalanceAmount style={{ color: "#ff49d2" }}>{user.vibeTokens.toLocaleString()}</BalanceAmount>
          </BalanceItem>
        </BalanceInfo>

        <TierSection>
          <TierTitle>📱 $SCROLL Boosts</TierTitle>
          <BoostTiers>
            {scrollBoosts.map((boost) => (
              <BoostOption
                key={boost.id}
                $selected={selectedBoost === boost.id}
                $tier="scroll"
                onClick={() => setSelectedBoost(boost.id)}
              >
                <BoostInfo>
                  <BoostTitle>
                    {boost.icon} {boost.name}
                  </BoostTitle>
                  <BoostDescription>{boost.description}</BoostDescription>
                  <BoostBenefit>{boost.benefit}</BoostBenefit>
                </BoostInfo>
                <BoostCost $tier="scroll">
                  <CostAmount>{boost.cost.toLocaleString()}</CostAmount>
                  <CostLabel>$SCROLL</CostLabel>
                </BoostCost>
              </BoostOption>
            ))}
          </BoostTiers>
        </TierSection>

        <TierSection>
          <TierTitle>💎 $VIBE Boosts</TierTitle>
          <BoostTiers>
            {vibeBoosts.map((boost) => (
              <BoostOption
                key={boost.id}
                $selected={selectedBoost === boost.id}
                $tier="vibe"
                onClick={() => setSelectedBoost(boost.id)}
              >
                <BoostInfo>
                  <BoostTitle>
                    {boost.icon} {boost.name}
                  </BoostTitle>
                  <BoostDescription>{boost.description}</BoostDescription>
                  <BoostBenefit>{boost.benefit}</BoostBenefit>
                </BoostInfo>
                <BoostCost $tier="vibe">
                  <CostAmount>{boost.cost}</CostAmount>
                  <CostLabel>$VIBE</CostLabel>
                </BoostCost>
              </BoostOption>
            ))}
          </BoostTiers>
        </TierSection>

        <BoostButton onClick={handleBoost} disabled={!selectedBoost || !canAfford}>
          {!selectedBoost
            ? "Select a boost tier"
            : !canAfford
              ? `Insufficient ${selectedBoostTier?.currency.toUpperCase()}`
              : `Boost for ${selectedBoostTier?.cost} ${selectedBoostTier?.currency.toUpperCase()}`}
        </BoostButton>
      </ModalContent>
    </ModalOverlay>
  )
}
