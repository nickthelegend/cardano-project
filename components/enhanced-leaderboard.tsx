"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"

const LeaderboardContainer = styled.div`
  padding: 0 1rem 2rem 1rem;
  max-width: 900px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 0 1rem 6rem 1rem;
  }
`

const LeaderboardHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: 2rem;
  opacity: 0.9;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }
`

const TabContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 16px;
  padding: 0.5rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem;
    padding: 0.25rem;
  }
`

const Tab = styled.button<{ $active: boolean }>`
  padding: 0.75rem 0.5rem;
  border: none;
  border-radius: 12px;
  background: ${({ $active, theme }) => 
    $active 
      ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
      : "transparent"
  };
  color: ${({ $active }) => ($active ? "#000000" : "#ffffff")};
  font-weight: ${({ $active }) => ($active ? "700" : "600")};
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: ${({ $active }) => ($active ? "scale(1.02)" : "scale(1)")};
  box-shadow: ${({ $active }) => ($active ? "0 4px 20px rgba(99, 219, 154, 0.3)" : "none")};

  &:hover {
    background: ${({ $active, theme }) => 
      $active 
        ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
        : "rgba(255, 255, 255, 0.1)"
    };
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    padding: 0.5rem 0.25rem;
    font-size: 0.8rem;
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
  gap: 1rem;
  padding: 1.25rem;
  background: ${({ $isCurrentUser }) => 
    $isCurrentUser 
      ? "linear-gradient(135deg, rgba(99, 219, 154, 0.15), rgba(255, 73, 210, 0.05))" 
      : "rgba(26, 26, 26, 0.8)"
  };
  border: ${({ $isCurrentUser, theme }) =>
    $isCurrentUser ? `2px solid ${theme.colors.primary}` : "1px solid rgba(255, 255, 255, 0.1)"};
  border-radius: 16px;
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.05), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: ${({ theme }) => theme.colors.primary};
    
    &::before {
      opacity: 1;
    }
  }
  
  @media (max-width: 768px) {
    gap: 0.75rem;
    padding: 1rem;
  }
`

const Rank = styled.div<{ $rank: number }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  background: ${({ $rank }) => {
    if ($rank === 1) return "linear-gradient(135deg, #FFD700, #FFA500)"
    if ($rank === 2) return "linear-gradient(135deg, #C0C0C0, #A0A0A0)"
    if ($rank === 3) return "linear-gradient(135deg, #CD7F32, #B8860B)"
    return "linear-gradient(135deg, #ff49d2, #ff73e6)"
  }};
  color: #000000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  
  &::before {
    content: ${({ $rank }) => {
      if ($rank === 1) return "'👑'"
      if ($rank === 2) return "'🥈'"
      if ($rank === 3) return "'🥉'"
      return "''"
    }};
    position: absolute;
    top: -8px;
    right: -8px;
    font-size: 1rem;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
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
  border-radius: 12px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  color: #000000;
  box-shadow: 0 4px 15px rgba(99, 219, 154, 0.3);
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
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
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.primary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`

const ScoreLabel = styled.div`
  font-size: 0.8rem;
  color: #cccccc;
`

const RewardSection = styled.div`
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(26, 26, 26, 0.4));
  border-radius: 20px;
  padding: 2rem;
  margin-top: 3rem;
  text-align: center;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-top: 2rem;
  }
`

const RewardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const RewardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const RewardItem = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 10px 30px rgba(99, 219, 154, 0.2);
  }
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
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
  const { user } = useUTXOSAuth()
  const [activeTab, setActiveTab] = useState<LeaderboardType>("scrollers")
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([])

  useEffect(() => {
    // Mock leaderboard data
    const mockData: Record<LeaderboardType, LeaderboardUser[]> = {
      scrollers: [
        { id: "1", username: "ScrollMachine", score: 15420, rank: 1, stats: "15.4K reels scrolled" },
        { id: "2", username: "InfiniteScroller", score: 12890, rank: 2, stats: "12.9K reels scrolled" },
        { id: "3", username: "ReelAddict", score: 11250, rank: 3, stats: "11.3K reels scrolled" },
        { id: "4", username: user?.username || "You", score: 8640, rank: 4, stats: "8.6K reels scrolled" },
        { id: "5", username: "ScrollKing", score: 7320, rank: 5, stats: "7.3K reels scrolled" },
      ],
      creators: [
        { id: "1", username: "ContentQueen", score: 2450000, rank: 1, stats: "2.45M total views" },
        { id: "2", username: "ViralMaker", score: 1890000, rank: 2, stats: "1.89M total views" },
        { id: "3", username: "ReelCreator", score: 1560000, rank: 3, stats: "1.56M total views" },
        { id: "4", username: user?.username || "You", score: 125000, rank: 4, stats: "125K total views" },
        { id: "5", username: "TrendSetter", score: 98000, rank: 5, stats: "98K total views" },
      ],
      tippers: [
        { id: "1", username: "GenerousTipper", score: 45600, rank: 1, stats: "45.6K $SCROLL tipped" },
        { id: "2", username: "SupportMaster", score: 38200, rank: 2, stats: "38.2K $SCROLL tipped" },
        { id: "3", username: "CreatorSupporter", score: 29800, rank: 3, stats: "29.8K $SCROLL tipped" },
        { id: "4", username: user?.username || "You", score: 12500, rank: 4, stats: "12.5K $SCROLL tipped" },
        { id: "5", username: "TipWarrior", score: 8900, rank: 5, stats: "8.9K $SCROLL tipped" },
      ],
      battles: [
        { id: "1", username: "BattleChamp", score: 28, rank: 1, stats: "28 battles won" },
        { id: "2", username: "ReelWarrior", score: 22, rank: 2, stats: "22 battles won" },
        { id: "3", username: "ContentKing", score: 18, rank: 3, stats: "18 battles won" },
        { id: "4", username: user?.username || "You", score: 5, rank: 4, stats: "5 battles won" },
        { id: "5", username: "VideoViper", score: 3, rank: 5, stats: "3 battles won" },
      ],
    }

    setLeaderboardData(mockData[activeTab])
  }, [activeTab, user])

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
          <LeaderboardItem key={item.id} $isCurrentUser={item.username === user?.username}>
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
