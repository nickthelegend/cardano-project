"use client"

import styled from "styled-components"
import { Sidebar } from "./sidebar"
import { BottomNavigation } from "./bottom-navigation"
import { EnergySystem } from "./energy-system"
import { EnergyBar } from "./energy-bar"
import { ScrollProgress } from "./scroll-progress"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const MainContent = styled.main<{ $isMobile: boolean; $hasAuth: boolean; $showProgress: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${({ $isMobile, $hasAuth }) => ($isMobile || !$hasAuth ? '0' : '280px')};
  padding-top: ${({ $showProgress }) => ($showProgress ? '90px' : '0')};
  padding-bottom: ${({ $isMobile, $hasAuth }) => ($isMobile && $hasAuth ? '80px' : '0')};
  
  @media (max-width: 768px) {
    padding-top: ${({ $showProgress }) => ($showProgress ? '80px' : '0')};
    margin-left: 0;
  }
`

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  position: relative;
`

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useUTXOSAuth()
  const isMobile = useIsMobile()
  const pathname = usePathname()

  // Don't show navigation on root page (login)
  const showNavigation = user && pathname !== "/"

  const getActiveView = () => {
    if (pathname.startsWith("/home")) return "home"
    if (pathname.startsWith("/reel")) return "reel"
    if (pathname.startsWith("/wallet")) return "wallet"
    if (pathname.startsWith("/leaderboard")) return "leaderboard"
    if (pathname.startsWith("/challenges")) return "challenges"
    return "home"
  }

  return (
    <AppContainer>
      {showNavigation && !isMobile && <Sidebar activeView={getActiveView()} />}
      <MainContent $isMobile={isMobile} $hasAuth={!!user} $showProgress={showNavigation}>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>

      {showNavigation && isMobile && <BottomNavigation activeView={getActiveView()} />}
      {showNavigation && <ScrollProgress />}
    </AppContainer>
  )
}