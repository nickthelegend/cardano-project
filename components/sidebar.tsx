"use client"

import styled from "styled-components"
import { useAuth } from "@/hooks/use-auth"

const SidebarContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 0;
  width: 280px;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  z-index: 100;
  
  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    
    &.open {
      transform: translateX(0);
    }
  }
`

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: rgba(0, 0, 0, 0.4);
  margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const UserHandle = styled.p`
  font-size: 0.8rem;
  color: #cccccc;
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

const NavLink = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $active, theme }) => ($active ? "rgba(99, 219, 154, 0.4)" : "transparent")};
  color: ${({ $active, theme }) => ($active ? "#ffffff" : "#cccccc")};
  border: none;
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

const TokenDisplay = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TokenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  &:last-child {
    margin-bottom: 0;
  }
`

const TokenName = styled.span`
  font-size: 0.9rem;
  color: #cccccc;
`

const TokenAmount = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
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
  activeView: "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile"
  onViewChange: (view: "feed" | "wallet" | "leaderboard" | "challenges" | "battles" | "quests" | "profile") => void
}

export function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const { user, logout } = useAuth()

  if (!user) return null

  return (
    <SidebarContainer>
      <UserProfile>
        <Avatar>{user.username.charAt(0).toUpperCase()}</Avatar>
        <UserInfo>
          <Username>{user.username}</Username>
          <UserHandle>@{user.username}</UserHandle>
        </UserInfo>
      </UserProfile>

      <TokenDisplay>
        <TokenRow>
          <TokenName>$Scroll</TokenName>
          <TokenAmount>{user.scrollTokens.toLocaleString()}</TokenAmount>
        </TokenRow>
        <TokenRow>
          <TokenName>$Vibe</TokenName>
          <TokenAmount>{user.vibeTokens.toLocaleString()}</TokenAmount>
        </TokenRow>
      </TokenDisplay>

      <Navigation>
        <NavList>
          <NavItem>
            <NavLink $active={activeView === "feed"} onClick={() => onViewChange("feed")}>
              <NavIcon>🎬</NavIcon>
              Reel Feed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "wallet"} onClick={() => onViewChange("wallet")}>
              <NavIcon>💰</NavIcon>
              Token Wallet
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "leaderboard"} onClick={() => onViewChange("leaderboard")}>
              <NavIcon>🏆</NavIcon>
              Leaderboard
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "challenges"} onClick={() => onViewChange("challenges")}>
              <NavIcon>🎯</NavIcon>
              Daily Challenges
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "quests"} onClick={() => onViewChange("quests")}>
              <NavIcon>🗡️</NavIcon>
              Quests
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "battles"} onClick={() => onViewChange("battles")}>
              <NavIcon>⚔️</NavIcon>
              Reel Battles
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink $active={activeView === "profile"} onClick={() => onViewChange("profile")}>
              <NavIcon>👤</NavIcon>
              Profile
            </NavLink>
          </NavItem>
        </NavList>
      </Navigation>

      <LogoutButton onClick={logout}>Sign Out</LogoutButton>
    </SidebarContainer>
  )
}
