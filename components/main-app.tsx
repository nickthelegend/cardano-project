"use client"

import styled from "styled-components"
import { Sidebar } from "./sidebar"
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

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 280px;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`

export function MainApp() {
  const [activeView, setActiveView] = useState<
    "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile"
  >("feed")
  const [canScroll, setCanScroll] = useState(true)

  const handleEnergyChange = (energy: number, canScrollNow: boolean) => {
    setCanScroll(canScrollNow)
  }

  return (
    <AppContainer>
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      <MainContent>
        <ContentArea>
          {activeView === "feed" && <ReelFeed canScroll={canScroll} />}
          {activeView === "wallet" && <TokenWallet />}
          {activeView === "leaderboard" && <EnhancedLeaderboard />}
          {activeView === "challenges" && <DailyChallenges />}
          {activeView === "quests" && <QuestsPanel />}
          {activeView === "battles" && <ReelBattles />}
          {activeView === "profile" && <ProfileBadges />}
        </ContentArea>
      </MainContent>

      <EnergyBar />
      <EnergySystem onEnergyChange={handleEnergyChange} />
      <ScrollProgress />
    </AppContainer>
  )
}
