"use client"

import styled from "styled-components"
import { Sidebar } from "./sidebar"
import { BottomNavigation } from "./bottom-navigation"
import { EnergySystem } from "./energy-system"
import { EnergyBar } from "./energy-bar"
import { ScrollProgress } from "./scroll-progress"
import { useWallet } from "@meshsdk/react"
import { useWalletMigration } from "@/lib/wallet-migration"
import { useIsMobile } from "@/hooks/use-mobile"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const MainContent = styled.main<{ $isMobile: boolean; $hasAuth: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: ${({ $isMobile, $hasAuth }) => ($isMobile || !$hasAuth ? '0' : '280px')};
  padding-bottom: ${({ $isMobile, $hasAuth }) => ($isMobile && $hasAuth ? '80px' : '0')};
  min-height: 100vh;
  position: relative;
  z-index: 1;
`

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 100%;
`

export function AppShell({ children }: { children: React.ReactNode }) {
  const { connected } = useWallet()
  const { getUserData } = useWalletMigration()
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [isClient, setIsClient] = useState(false)
  const isMobile = useIsMobile()
  const pathname = usePathname()

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

  // Don't show navigation on root page (login) and don't render AppShell at all on root
  const showNavigation = (connected || userData) && pathname !== "/"
  const isRootPage = pathname === "/"

  const getActiveView = () => {
    if (pathname.startsWith("/home")) return "home"
    if (pathname.startsWith("/reel")) return "reel"
    if (pathname.startsWith("/wallet")) return "wallet"
    if (pathname.startsWith("/leaderboard")) return "leaderboard"
    if (pathname.startsWith("/challenges")) return "challenges"
    return "home"
  }

  // Don't render AppShell on root page to avoid interfering with wallet modal
  if (isRootPage) {
    return <>{children}</>
  }

  return (
    <AppContainer>
      {showNavigation && !isMobile && <Sidebar activeView={getActiveView()} />}
      <MainContent $isMobile={isMobile} $hasAuth={!!userData}>
        <ContentArea>
          {children}
        </ContentArea>
      </MainContent>

      {showNavigation && isMobile && <BottomNavigation activeView={getActiveView()} />}
      {showNavigation && (
        <>
          {/* <EnergyBar /> */}
          {pathname === "/home" && <ScrollProgress />}
        </>
      )}
    </AppContainer>
  )
}