"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const LeaderboardContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`

const LeaderboardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TabContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.sm};
`

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.background : "#ffffff")};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : "rgba(255, 255, 255, 0.1)")};
  }
`

const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const LeaderboardItem = styled.div<{ $isCurrentUser?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ $isCurrentUser, theme }) => ($isCurrentUser ? `rgba(99, 219, 154, 0.1)` : "rgba(0, 0, 0, 0.4)")};
  border: ${({ $isCurrentUser, theme }) =>
    $isCurrentUser ? `2px solid ${theme.colors.primary}` : "1px solid rgba(255, 255, 255, 0.1)"};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  backdrop-filter: blur(20px);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const Rank = styled.div<{ $rank: number }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  background: ${({ $rank, theme }) => {
    if ($rank === 1) return "#FFD700"
    if ($rank === 2) return "#C0C0C0"
    if ($rank === 3) return "#CD7F32"
    return theme.colors.secondary
  }};
  color: ${({ theme }) => theme.colors.background};
`

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
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
  color: ${({ theme }) => theme.colors.background};
`

const UserDetails = styled.div`
  flex: 1;
`

const Username = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 2px;
  color: #ffffff;
`

const UserStats = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
`

const Score = styled.div`
  text-align: right;
`

const ScoreValue = styled.div`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
`

const ScoreLabel = styled.div`
  font-size: 0.8rem;
  color: #cccccc;
`

const RewardSection = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const RewardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const RewardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const RewardItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
`

const RewardRank = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const RewardAmount = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

type LeaderboardType = "scrollers" | "creators" | "tippers" | "battles"

interface LeaderboardUser {
  id: string
  username: string
  score: number
  rank: number
  stats: string
}

export function EnhancedLeaderboard() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [activeTab, setActiveTab] = useState<LeaderboardType>("scrollers")
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])
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

  useEffect(() => {
    // Mock leaderboard data
    const mockData: Record<LeaderboardType, LeaderboardUser[]> = {
      scrollers: [
        { id: "1", username: "ScrollMachine", score: 15420, rank: 1, stats: "15.4K reels scrolled" },
        { id: "2", username: "InfiniteScroller", score: 12890, rank: 2, stats: "12.9K reels scrolled" },
        { id: "3", username: "ReelAddict", score: 11250, rank: 3, stats: "11.3K reels scrolled" },
        { id: "4", username: (userData?.username || (name ? `User_${name.slice(0, 8)}` : "Wallet User")), score: 8640, rank: 4, stats: "8.6K reels scrolled" },
        { id: "5", username: "ScrollKing", score: 7320, rank: 5, stats: "7.3K reels scrolled" },
      ],
      creators: [
        { id: "1", username: "ContentQueen", score: 2450000, rank: 1, stats: "2.45M total views" },
        { id: "2", username: "ViralMaker", score: 1890000, rank: 2, stats: "1.89M total views" },
        { id: "3", username: "ReelCreator", score: 1560000, rank: 3, stats: "1.56M total views" },
        { id: "4", username: (userData?.username || (name ? `User_${name.slice(0, 8)}` : "Wallet User")), score: 125000, rank: 4, stats: "125K total views" },
        { id: "5", username: "TrendSetter", score: 98000, rank: 5, stats: "98K total views" },
      ],
      tippers: [
        { id: "1", username: "GenerousTipper", score: 45600, rank: 1, stats: "45.6K $SCROLL tipped" },
        { id: "2", username: "SupportMaster", score: 38200, rank: 2, stats: "38.2K $SCROLL tipped" },
        { id: "3", username: "CreatorSupporter", score: 29800, rank: 3, stats: "29.8K $SCROLL tipped" },
        { id: "4", username: (userData?.username || (name ? `User_${name.slice(0, 8)}` : "Wallet User")), score: 12500, rank: 4, stats: "12.5K $SCROLL tipped" },
        { id: "5", username: "TipWarrior", score: 8900, rank: 5, stats: "8.9K $SCROLL tipped" },
      ],
      battles: [
        { id: "1", username: "BattleChamp", score: 28, rank: 1, stats: "28 battles won" },
        { id: "2", username: "ReelWarrior", score: 22, rank: 2, stats: "22 battles won" },
        { id: "3", username: "ContentKing", score: 18, rank: 3, stats: "18 battles won" },
        { id: "4", username: (userData?.username || (name ? `User_${name.slice(0, 8)}` : "Wallet User")), score: 5, rank: 4, stats: "5 battles won" },
        { id: "5", username: "VideoViper", score: 3, rank: 5, stats: "3 battles won" },
      ],
    }

    setLeaderboardData(mockData[activeTab])
  }, [activeTab, userData, name])

  const getTabLabel = (type: LeaderboardType) => {
    switch (type) {
      case "scrollers":
        return "📱 Top Scrollers"
      case "creators":
        return "🎬 Top Creators"
      case "tippers":
        return "💝 Biggest Tippers"
      case "battles":
        return "⚔️ Battle Winners"
    }
  }

  return (
    <LeaderboardContainer>
      <LeaderboardHeader>
        <Title>🏆 Leaderboard</Title>
        <Subtitle>Multiple ways to flex and climb the ranks!</Subtitle>
      </LeaderboardHeader>

      <TabContainer>
        {(["scrollers", "creators", "tippers", "battles"] as LeaderboardType[]).map((type) => (
          <Tab key={type} $active={activeTab === type} onClick={() => setActiveTab(type)}>
            {getTabLabel(type)}
          </Tab>
        ))}
      </TabContainer>

      <LeaderboardList>
        {leaderboardData.map((item) => (
          <LeaderboardItem key={item.id} $isCurrentUser={item.username === (userData?.username || (name ? `User_${name.slice(0, 8)}` : "Wallet User"))}>
            <Rank $rank={item.rank}>#{item.rank}</Rank>
            <UserInfo>
              <Avatar>{item.username.charAt(0).toUpperCase()}</Avatar>
              <UserDetails>
                <Username>{item.username}</Username>
                <UserStats>{item.stats}</UserStats>
              </UserDetails>
            </UserInfo>
            <Score>
              <ScoreValue>{item.score.toLocaleString()}</ScoreValue>
              <ScoreLabel>
                {activeTab === "scrollers" && "reels"}
                {activeTab === "creators" && "views"}
                {activeTab === "tippers" && "$SCROLL"}
                {activeTab === "battles" && "wins"}
              </ScoreLabel>
            </Score>
          </LeaderboardItem>
        ))}
      </LeaderboardList>

      <RewardSection>
        <RewardTitle>🎁 Weekly Rewards by Category</RewardTitle>
        <RewardGrid>
          <RewardItem>
            <RewardRank>🥇 1st Place</RewardRank>
            <RewardAmount>5,000 $SCROLL + 10 $VIBE</RewardAmount>
          </RewardItem>
          <RewardItem>
            <RewardRank>🥈 2nd Place</RewardRank>
            <RewardAmount>3,000 $SCROLL + 5 $VIBE</RewardAmount>
          </RewardItem>
          <RewardItem>
            <RewardRank>🥉 3rd Place</RewardRank>
            <RewardAmount>2,000 $SCROLL + 3 $VIBE</RewardAmount>
          </RewardItem>
          <RewardItem>
            <RewardRank>🏆 Top 10</RewardRank>
            <RewardAmount>1,000 $SCROLL + 1 $VIBE</RewardAmount>
          </RewardItem>
        </RewardGrid>
      </RewardSection>
    </LeaderboardContainer>
  )
}
