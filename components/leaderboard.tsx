"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const LeaderboardContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const LeaderboardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

const TabButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
`

const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $active, theme }) =>
    $active
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
  `
      : `
    background: transparent;
    color: ${theme.colors.text};
    opacity: 0.7;
    
    &:hover {
      opacity: 1;
      background: rgba(255, 255, 255, 0.1);
    }
  `}
`

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const LeaderboardItem = styled.div<{ $rank: number; $isCurrentUser?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ $isCurrentUser }) => ($isCurrentUser ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 1px solid ${({ $isCurrentUser, theme }) => ($isCurrentUser ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  position: relative;
  
  ${({ $rank, theme }) => {
    if ($rank === 1) return `border-color: #FFD700; background: rgba(255, 215, 0, 0.1);`
    if ($rank === 2) return `border-color: #C0C0C0; background: rgba(192, 192, 192, 0.1);`
    if ($rank === 3) return `border-color: #CD7F32; background: rgba(205, 127, 50, 0.1);`
    return ""
  }}
`

const RankBadge = styled.div<{ $rank: number }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.1rem;
  
  ${({ $rank, theme }) => {
    if ($rank === 1) return `background: #FFD700; color: #000;`
    if ($rank === 2) return `background: #C0C0C0; color: #000;`
    if ($rank === 3) return `background: #CD7F32; color: #fff;`
    return `background: ${theme.colors.muted}; color: ${theme.colors.text};`
  }}
`

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const UserAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.2rem;
`

const UserDetails = styled.div``

const UserName = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  margin-bottom: 2px;
`

const UserStats = styled.div`
  font-size: 0.9rem;
  opacity: 0.7;
`

const UserScore = styled.div`
  text-align: right;
  font-weight: 700;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
`

const CurrentUserIndicator = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.8rem;
  font-weight: 600;
`

interface LeaderboardUser {
  id: string
  name: string
  avatar: string
  scrollTokens: number
  vibeTokens: number
  totalEarned: number
  streak: number
}

const mockLeaderboard: LeaderboardUser[] = [
  {
    id: "1",
    name: "CryptoKing",
    avatar: "CK",
    scrollTokens: 15420,
    vibeTokens: 89,
    totalEarned: 25680,
    streak: 45,
  },
  {
    id: "2",
    name: "ScrollMaster",
    avatar: "SM",
    scrollTokens: 12890,
    vibeTokens: 67,
    totalEarned: 22340,
    streak: 38,
  },
  {
    id: "3",
    name: "VibeQueen",
    avatar: "VQ",
    scrollTokens: 11250,
    vibeTokens: 78,
    totalEarned: 19870,
    streak: 42,
  },
  {
    id: "4",
    name: "TokenHunter",
    avatar: "TH",
    scrollTokens: 9680,
    vibeTokens: 45,
    totalEarned: 17230,
    streak: 29,
  },
  {
    id: "5",
    name: "EarnGuru",
    avatar: "EG",
    scrollTokens: 8420,
    vibeTokens: 52,
    totalEarned: 15890,
    streak: 33,
  },
]

type LeaderboardTab = "scroll" | "vibe" | "total" | "streak"

export function Leaderboard() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [activeTab, setActiveTab] = useState<LeaderboardTab>("total")
  const [leaderboard] = useState<LeaderboardUser[]>(mockLeaderboard)
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
  }

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    switch (activeTab) {
      case "scroll":
        return b.scrollTokens - a.scrollTokens
      case "vibe":
        return b.vibeTokens - a.vibeTokens
      case "total":
        return b.totalEarned - a.totalEarned
      case "streak":
        return b.streak - a.streak
      default:
        return 0
    }
  })

  const getScoreForTab = (user: LeaderboardUser) => {
    switch (activeTab) {
      case "scroll":
        return `${user.scrollTokens.toLocaleString()} $SCROLL`
      case "vibe":
        return `${user.vibeTokens.toLocaleString()} $VIBE`
      case "total":
        return `${user.totalEarned.toLocaleString()} Total`
      case "streak":
        return `${user.streak} days`
      default:
        return ""
    }
  }

  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>

      <TabButtons>
        <TabButton $active={activeTab === "total"} onClick={() => setActiveTab("total")}>
          Total Earned
        </TabButton>
        <TabButton $active={activeTab === "scroll"} onClick={() => setActiveTab("scroll")}>
          $SCROLL
        </TabButton>
        <TabButton $active={activeTab === "vibe"} onClick={() => setActiveTab("vibe")}>
          $VIBE
        </TabButton>
        <TabButton $active={activeTab === "streak"} onClick={() => setActiveTab("streak")}>
          Streak
        </TabButton>
      </TabButtons>

      <LeaderboardList>
        {sortedLeaderboard.map((leaderUser, index) => {
          const rank = index + 1
          const isCurrentUser = leaderUser.name === user.username // Simplified check

          return (
            <LeaderboardItem key={leaderUser.id} $rank={rank} $isCurrentUser={isCurrentUser}>
              {isCurrentUser && <CurrentUserIndicator>You</CurrentUserIndicator>}

              <RankBadge $rank={rank}>{rank <= 3 ? ["🥇", "🥈", "🥉"][rank - 1] : rank}</RankBadge>

              <UserInfo>
                <UserAvatar>{leaderUser.avatar}</UserAvatar>
                <UserDetails>
                  <UserName>{leaderUser.name}</UserName>
                  <UserStats>
                    {leaderUser.streak} day streak • {leaderUser.totalEarned.toLocaleString()} total earned
                  </UserStats>
                </UserDetails>
              </UserInfo>

              <UserScore>{getScoreForTab(leaderUser)}</UserScore>
            </LeaderboardItem>
          )
        })}
      </LeaderboardList>
    </LeaderboardContainer>
  )
}
