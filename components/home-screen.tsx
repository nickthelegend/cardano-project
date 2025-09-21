"use client"

import styled from "styled-components"
import { ScrollProgress } from "./scroll-progress"
import { ReelFeed } from "./reel-feed"
import { useWallet } from "@meshsdk/react"
import { useWalletMigration } from "@/lib/wallet-migration"
import { useEffect, useState } from "react"

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: ${({ theme }) => theme.spacing.lg};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const WelcomeSection = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  width: 100%;
`

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const WelcomeSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const QuickStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const StatCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

const ContentSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
`

interface HomeScreenProps {
  canScroll?: boolean
}

export function HomeScreen({ canScroll = true }: HomeScreenProps) {
  const { connected, name } = useWallet()
  const { getUserData } = useWalletMigration()
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
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

  // If not connected and no migrated data, return null
  if (!connected && !userData) return null

  // Use migrated data or create default data for connected wallet
  const user = userData || {
    username: name ? `User_${name.slice(0, 8)}` : "Wallet User",
    scrollTokens: 0,
    vibeTokens: 100,
    dailyScrollCount: 0,
    lastScrollReset: new Date().toISOString(),
    adaBalance: 0,
    isConnected: connected,
  }

  return (
    <HomeContainer>
      <WelcomeSection>
        <WelcomeTitle>Welcome back, {user.username}! 👋</WelcomeTitle>
        <WelcomeSubtitle>
          Ready to scroll and earn? Check your daily progress and dive into the latest reels!
        </WelcomeSubtitle>

        <QuickStats>
          <StatCard>
            <StatValue>{user.scrollTokens.toLocaleString()}</StatValue>
            <StatLabel>$SCROLL</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{user.vibeTokens.toLocaleString()}</StatValue>
            <StatLabel>$VIBE</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{user.dailyScrollCount}</StatValue>
            <StatLabel>Today's Scrolls</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>7</StatValue>
            <StatLabel>Day Streak</StatLabel>
          </StatCard>
        </QuickStats>
      </WelcomeSection>


    </HomeContainer>
  )
}
