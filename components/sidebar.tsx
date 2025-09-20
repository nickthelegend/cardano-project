"use client"

import styled from "styled-components"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"
import Link from "next/link"
import { Copy } from "lucide-react"

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  z-index: 100;
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UserProfile = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(0, 0, 0, 0.4);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.background};
`

const UserInfo = styled.div`
  flex: 1;
`

const Username = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 2px;
  color: #ffffff;
`

const WalletSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.sm};
`

const WalletAddress = styled.span`
  font-size: 0.8rem;
  color: #cccccc;
  font-family: monospace;
  flex: 1;
`

const CopyButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 2px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(99, 219, 154, 0.2);
  }
`

const Navigation = styled.nav`
  flex: 1;
`

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const NavItem = styled.li<{ $active?: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const NavLink = styled(Link)<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $active, theme }) => ($active ? "rgba(99, 219, 154, 0.4)" : "transparent")};
  color: ${({ $active, theme }) => ($active ? "#ffffff" : "#cccccc")};
  text-decoration: none;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: rgba(99, 219, 154, 0.3);
    color: #ffffff;
  }
`

const NavIcon = styled.span`
  font-size: 1.2rem;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`



const LogoutButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 73, 210, 0.4);
  color: #ffffff;
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background};
  }
`

interface SidebarProps {
  activeView: string
}

export function Sidebar({ activeView }: SidebarProps) {
  const { user, disconnectWallet } = useUTXOSAuth()

  const copyToClipboard = async () => {
    if (user?.walletAddress) {
      await navigator.clipboard.writeText(user.walletAddress)
    }
  }

  if (!user) return null

  return (
    <SidebarContainer>
      <UserProfile>
        <ProfileHeader>
          <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
          <UserInfo>
            <Username>{user.username}</Username>
          </UserInfo>
        </ProfileHeader>
        <WalletSection>
          <WalletAddress>
            {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
          </WalletAddress>
          <CopyButton onClick={copyToClipboard}>
            <Copy size={14} />
          </CopyButton>
        </WalletSection>
      </UserProfile>

      <Navigation>
        <NavList>
          <NavItem>
            <NavLink href="/home" $active={activeView === "home"}>
              <NavIcon>🏠</NavIcon>
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/reel" $active={activeView === "reel"}>
              <NavIcon>🎬</NavIcon>
              Reel Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/wallet" $active={activeView === "wallet"}>
              <NavIcon>💰</NavIcon>
              Token Wallet
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/leaderboard" $active={activeView === "leaderboard"}>
              <NavIcon>🏆</NavIcon>
              Leaderboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/challenges" $active={activeView === "challenges"}>
              <NavIcon>🎯</NavIcon>
              Daily Challenges
            </NavLink>
          </NavItem>
        </NavList>
      </Navigation>

      <LogoutButton onClick={disconnectWallet}>Disconnect Wallet</LogoutButton>
    </SidebarContainer>
  )
}
