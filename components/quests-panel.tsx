"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const QuestsContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const QuestsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const QuestsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const QuestsTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
`

const QuestTab = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  color: ${({ $active, theme }) => ($active ? theme.colors.background : theme.colors.text)};
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : "rgba(255, 255, 255, 0.1)")};
  }
`

const QuestsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const QuestCard = styled.div<{ $completed?: boolean; $rarity: "common" | "rare" | "epic" | "legendary" }>`
  background: ${({ $completed }) => ($completed ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 2px solid ${({ $completed, $rarity, theme }) => {
    if ($completed) return theme.colors.primary
    switch ($rarity) {
      case "rare":
        return "#3b82f6"
      case "epic":
        return "#8b5cf6"
      case "legendary":
        return "#f59e0b"
      default:
        return theme.colors.border
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const QuestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const QuestInfo = styled.div`
  flex: 1;
`

const QuestTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const QuestIcon = styled.div`
  font-size: 1.2rem;
`

const QuestTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const QuestRarity = styled.div<{ $rarity: "common" | "rare" | "epic" | "legendary" }>`
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ $rarity }) => {
    switch ($rarity) {
      case "rare":
        return "#3b82f6"
      case "epic":
        return "#8b5cf6"
      case "legendary":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }};
  color: white;
`

const QuestDescription = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const QuestRewards = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const RewardBadge = styled.div<{ $type: "scroll" | "vibe" | "special" }>`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  background: ${({ $type, theme }) => {
    switch ($type) {
      case "vibe":
        return theme.colors.accent
      case "special":
        return theme.colors.secondary
      default:
        return theme.colors.primary
    }
  }};
  color: ${({ theme }) => theme.colors.background};
`

const QuestProgress = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressFill = styled.div<{ $percentage: number }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage + "%"};
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
  text-align: center;
`

const QuestActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`

const ClaimButton = styled.button<{ $completed?: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: ${({ $completed }) => ($completed ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  
  ${({ $completed, theme }) =>
    $completed
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    
    &:hover {
      background: ${theme.colors.secondary};
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.lg};
    }
  `
      : `
    background: rgba(255, 255, 255, 0.1);
    color: ${theme.colors.text};
    opacity: 0.6;
  `}
`

const TimeRemaining = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.sm};
`

type QuestType = "daily" | "weekly" | "special"
type QuestRarity = "common" | "rare" | "epic" | "legendary"

interface Quest {
  id: string
  title: string
  description: string
  icon: string
  type: QuestType
  rarity: QuestRarity
  target: number
  current: number
  rewards: {
    scroll?: number
    vibe?: number
    special?: string
  }
  completed: boolean
  claimed: boolean
  expiresAt?: Date
}

const mockQuests: Quest[] = [
  // Daily Quests
  {
    id: "daily-1",
    title: "Morning Scroller",
    description: "Watch 20 reels before noon",
    icon: "🌅",
    type: "daily",
    rarity: "common",
    target: 20,
    current: 12,
    rewards: { scroll: 100 },
    completed: false,
    claimed: false,
    expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hours
  },
  {
    id: "daily-2",
    title: "Social Butterfly",
    description: "Like, comment, and share 15 times",
    icon: "🦋",
    type: "daily",
    rarity: "common",
    target: 15,
    current: 15,
    rewards: { scroll: 150 },
    completed: true,
    claimed: false,
  },
  {
    id: "daily-3",
    title: "Generous Tipper",
    description: "Send tips to 5 different creators",
    icon: "💝",
    type: "daily",
    rarity: "rare",
    target: 5,
    current: 3,
    rewards: { scroll: 200, vibe: 1 },
    completed: false,
    claimed: false,
  },

  // Weekly Quests
  {
    id: "weekly-1",
    title: "Scroll Marathon",
    description: "Watch 500 reels this week",
    icon: "🏃",
    type: "weekly",
    rarity: "epic",
    target: 500,
    current: 287,
    rewards: { scroll: 2000, vibe: 5 },
    completed: false,
    claimed: false,
    expiresAt: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days
  },
  {
    id: "weekly-2",
    title: "Community Builder",
    description: "Get 100 likes on your comments",
    icon: "🏗️",
    type: "weekly",
    rarity: "rare",
    target: 100,
    current: 67,
    rewards: { scroll: 1000, vibe: 2 },
    completed: false,
    claimed: false,
  },

  // Special Quests
  {
    id: "special-1",
    title: "Reel Battle Champion",
    description: "Win 10 reel battles in a row",
    icon: "👑",
    type: "special",
    rarity: "legendary",
    target: 10,
    current: 7,
    rewards: { scroll: 5000, vibe: 20, special: "Golden Crown Badge" },
    completed: false,
    claimed: false,
  },
  {
    id: "special-2",
    title: "Whale Tipper",
    description: "Tip 10,000 $SCROLL in a single day",
    icon: "🐋",
    type: "special",
    rarity: "legendary",
    target: 10000,
    current: 10000,
    rewards: { scroll: 15000, vibe: 50, special: "Whale Badge" },
    completed: true,
    claimed: false,
  },
]

export function QuestsPanel() {
  const { connected } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [activeTab, setActiveTab] = useState<QuestType>("daily")
  const [quests, setQuests] = useState<Quest[]>(mockQuests)
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

  const filteredQuests = quests.filter((quest) => quest.type === activeTab)

  const handleClaimReward = (questId: string) => {
    setQuests((prev) => prev.map((quest) => (quest.id === questId ? { ...quest, claimed: true } : quest)))

    const quest = quests.find((q) => q.id === questId)
    if (quest) {
      console.log(`[v0] Claimed quest reward: ${quest.title}`)
      if (quest.rewards.scroll) console.log(`[v0] +${quest.rewards.scroll} $SCROLL`)
      if (quest.rewards.vibe) console.log(`[v0] +${quest.rewards.vibe} $VIBE`)
      if (quest.rewards.special) console.log(`[v0] Unlocked: ${quest.rewards.special}`)
    }
  }

  const formatTimeRemaining = (expiresAt: Date) => {
    const now = new Date()
    const diff = expiresAt.getTime() - now.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m remaining`
  }

  return (
    <QuestsContainer>
      <QuestsHeader>
        <QuestsTitle>🎯 Quests</QuestsTitle>
        <QuestsTabs>
          <QuestTab $active={activeTab === "daily"} onClick={() => setActiveTab("daily")}>
            Daily
          </QuestTab>
          <QuestTab $active={activeTab === "weekly"} onClick={() => setActiveTab("weekly")}>
            Weekly
          </QuestTab>
          <QuestTab $active={activeTab === "special"} onClick={() => setActiveTab("special")}>
            Special
          </QuestTab>
        </QuestsTabs>
      </QuestsHeader>

      <QuestsList>
        {filteredQuests.map((quest) => {
          const progressPercentage = Math.min((quest.current / quest.target) * 100, 100)

          return (
            <QuestCard key={quest.id} $completed={quest.completed} $rarity={quest.rarity}>
              <QuestHeader>
                <QuestInfo>
                  <QuestTitleRow>
                    <QuestIcon>{quest.icon}</QuestIcon>
                    <QuestTitle>{quest.title}</QuestTitle>
                    <QuestRarity $rarity={quest.rarity}>{quest.rarity}</QuestRarity>
                  </QuestTitleRow>
                  <QuestDescription>{quest.description}</QuestDescription>
                </QuestInfo>
              </QuestHeader>

              <QuestRewards>
                {quest.rewards.scroll && <RewardBadge $type="scroll">+{quest.rewards.scroll} $SCROLL</RewardBadge>}
                {quest.rewards.vibe && <RewardBadge $type="vibe">+{quest.rewards.vibe} $VIBE</RewardBadge>}
                {quest.rewards.special && <RewardBadge $type="special">{quest.rewards.special}</RewardBadge>}
              </QuestRewards>

              <QuestProgress>
                <ProgressBar>
                  <ProgressFill $percentage={progressPercentage} />
                </ProgressBar>
                <ProgressText>
                  {quest.current} / {quest.target}
                </ProgressText>
              </QuestProgress>

              <QuestActions>
                <ClaimButton
                  $completed={quest.completed && !quest.claimed}
                  onClick={() => handleClaimReward(quest.id)}
                  disabled={!quest.completed || quest.claimed}
                >
                  {quest.claimed ? "Claimed" : quest.completed ? "Claim Reward" : "In Progress"}
                </ClaimButton>
              </QuestActions>

              {quest.expiresAt && <TimeRemaining>{formatTimeRemaining(quest.expiresAt)}</TimeRemaining>}
            </QuestCard>
          )
        })}
      </QuestsList>
    </QuestsContainer>
  )
}
