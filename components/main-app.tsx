"use client"

import styled from "styled-components"
import { Sidebar } from "./sidebar"
import { BottomNavigation } from "./bottom-navigation"
import { HomeScreen } from "./home-screen"
import { ReelFeed } from "./reel-feed"
import { TokenWallet } from "./token-wallet"
import { EnhancedLeaderboard } from "./enhanced-leaderboard"
import { DailyChallenges } from "./daily-challenges"
import { ReelBattles } from "./reel-battles"
import { QuestsPanel } from "./quests-panel"
import { EnergySystem } from "./energy-system"
import { EnergyBar } from "./energy-bar" // Added energy bar import
import { ScrollProgress } from "./scroll-progress"
import { useState } from "react"
import { ProfileBadges } from "./profile-badges"
import { useIsMobile } from "@/hooks/use-mobile"

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const MainContent = styled.main<{ $isMobile: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${({ $isMobile }) => ($isMobile ? '0' : '280px')};
  padding-bottom: ${({ $isMobile }) => ($isMobile ? '80px' : '0')};
`

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`

export function MainApp() {
  const [activeView, setActiveView] = useState<
    "home" | "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile"
  >("home")
  const [canScroll, setCanScroll] = useState(true)
  const isMobile = useIsMobile()

  const handleEnergyChange = (energy: number, canScrollNow: boolean) => {
    setCanScroll(canScrollNow)
  }

  return (
    <AppContainer>
      {!isMobile && <Sidebar activeView={activeView} onViewChange={setActiveView} />}
      <MainContent $isMobile={isMobile}>
        <ContentArea>
          {activeView === "home" && <HomeScreen />}
          {activeView === "feed" && <ReelFeed />}
          {activeView === "wallet" && <TokenWallet />}
          {activeView === "leaderboard" && <EnhancedLeaderboard />}
          {activeView === "challenges" && <DailyChallenges />}
          {activeView === "quests" && <QuestsPanel />}
          {activeView === "battles" && <ReelBattles />}
          {activeView === "profile" && <ProfileBadges />}
        </ContentArea>
      </MainContent>

      {isMobile && <BottomNavigation activeView={activeView} onViewChange={setActiveView} />}
      <EnergyBar />
      <EnergySystem onEnergyChange={handleEnergyChange} />
    </AppContainer>
  )
}
