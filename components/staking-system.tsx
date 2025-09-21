"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const StakingContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StakingTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.secondary};
`

const StakingTiers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StakingTier = styled.div<{ $active?: boolean }>`
  background: ${({ $active, theme }) => ($active ? "rgba(255, 73, 210, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.secondary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
  }
`

const TierName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
`

const TierRequirement = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const TierBenefits = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const TierBoost = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.9rem;
`

const CurrentStaking = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const StakingStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`

const StakeActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const StakeButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.$variant === "primary"
      ? `
    background: ${props.theme.colors.secondary};
    color: ${props.theme.colors.background};
    
    &:hover {
      background: ${props.theme.colors.accent};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: ${props.theme.colors.text};
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const stakingTiers = [
  {
    name: "Bronze",
    requirement: 100,
    boost: "1.2x",
    benefits: "20% faster $SCROLL mining, Bronze badge",
  },
  {
    name: "Silver",
    requirement: 500,
    boost: "1.5x",
    benefits: "50% faster mining, Silver badge, Early access",
  },
  {
    name: "Gold",
    requirement: 1000,
    boost: "2x",
    benefits: "2x mining rate, Gold badge, Exclusive features",
  },
  {
    name: "Diamond",
    requirement: 2500,
    boost: "3x",
    benefits: "3x mining rate, Diamond badge, DAO voting power",
  },
]

export function StakingSystem() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [selectedTier, setSelectedTier] = useState(0)
  const [isClient, setIsClient] = useState(false)

  // Set client-side flag
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Update user data when wallet connection changes (only on client)
  useEffect(() => {
    if (isClient) {
      if (connected) {
        const data = getUserData()
        setUserData(data)
      } else {
        setUserData(null)
      }
    }
  }, [connected, getUserData, isClient])

  if (!connected && !userData) return null

  // Use migrated data or create default data for connected wallet
  const user = userData || {
    username: name ? `User_${name.slice(0, 8)}` : "Wallet User",
    vibeTokens: 100,
    stakedVibe: 0,
  }

  const currentStaked = user.stakedVibe || 0
  const currentTier = stakingTiers.findIndex((tier) => currentStaked >= tier.requirement)
  const nextTier = currentTier < stakingTiers.length - 1 ? stakingTiers[currentTier + 1] : null

  const handleStake = () => {
    const tierRequirement = stakingTiers[selectedTier].requirement
    if (user.vibeTokens >= tierRequirement) {
      console.log(`[v0] Staking ${tierRequirement} $VIBE for ${stakingTiers[selectedTier].name} tier`)
    }
  }

  const handleUnstake = () => {
    console.log(`[v0] Unstaking ${currentStaked} $VIBE`)
  }

  return (
    <StakingContainer>
      <StakingTitle>$VIBE Staking</StakingTitle>

      {currentStaked > 0 && (
        <CurrentStaking>
          <StakingStats>
            <StatItem>
              <StatValue>{currentStaked.toLocaleString()}</StatValue>
              <StatLabel>$VIBE Staked</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{currentTier >= 0 ? stakingTiers[currentTier].name : "None"}</StatValue>
              <StatLabel>Current Tier</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{currentTier >= 0 ? stakingTiers[currentTier].boost : "1x"}</StatValue>
              <StatLabel>Mining Boost</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{nextTier ? `${nextTier.requirement - currentStaked}` : "Max"}</StatValue>
              <StatLabel>{nextTier ? "To Next Tier" : "Tier Reached"}</StatLabel>
            </StatItem>
          </StakingStats>

          <StakeActions>
            <StakeButton onClick={handleUnstake}>Unstake Tokens</StakeButton>
            {nextTier && (
              <StakeButton $variant="primary" onClick={() => setSelectedTier(currentTier + 1)}>
                Upgrade Tier
              </StakeButton>
            )}
          </StakeActions>
        </CurrentStaking>
      )}

      <StakingTiers>
        {stakingTiers.map((tier, index) => (
          <StakingTier key={tier.name} $active={selectedTier === index} onClick={() => setSelectedTier(index)}>
            <TierName>{tier.name}</TierName>
            <TierRequirement>{tier.requirement.toLocaleString()} $VIBE</TierRequirement>
            <TierBenefits>{tier.benefits}</TierBenefits>
            <TierBoost>{tier.boost} Mining Rate</TierBoost>
          </StakingTier>
        ))}
      </StakingTiers>

      {currentStaked === 0 && (
        <StakeActions>
          <StakeButton
            $variant="primary"
            onClick={handleStake}
            disabled={user.vibeTokens < stakingTiers[selectedTier].requirement}
          >
            Stake {stakingTiers[selectedTier].requirement.toLocaleString()} $VIBE
          </StakeButton>
        </StakeActions>
      )}
    </StakingContainer>
  )
}
