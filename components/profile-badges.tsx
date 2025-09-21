"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const ProfileContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.background};
  position: relative;
`

const ProfileInfo = styled.div`
  flex: 1;
`

const ProfileName = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProfileHandle = styled.p`
  font-size: 1.1rem;
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProfileStats = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`

const StatItem = styled.div`
  text-align: center;
`

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
`

const BadgesSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const SectionTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const BadgesTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.xs};
`

const BadgeTab = styled.button<{ $active: boolean }>`
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

const BadgesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`

const BadgeCard = styled.div<{ $earned: boolean; $rarity: "common" | "rare" | "epic" | "legendary" }>`
  background: ${({ $earned }) => ($earned ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 2px solid ${({ $earned, $rarity, theme }) => {
    if (!$earned) return "rgba(255, 255, 255, 0.1)"
    switch ($rarity) {
      case "rare":
        return "#3b82f6"
      case "epic":
        return "#8b5cf6"
      case "legendary":
        return "#f59e0b"
      default:
        return theme.colors.primary
    }
  }};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  transition: all 0.2s ease;
  opacity: ${({ $earned }) => ($earned ? 1 : 0.6)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`

const BadgeIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  filter: ${({ $earned }: { $earned: boolean }) => ($earned ? "none" : "grayscale(100%)")};
`

const BadgeName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BadgeDescription = styled.p`
  font-size: 0.8rem;
  color: #cccccc;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BadgeRarity = styled.div<{ $rarity: "common" | "rare" | "epic" | "legendary" }>`
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
  display: inline-block;
`

const BadgeProgress = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.primary};
`

const AchievementsSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const AchievementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const AchievementItem = styled.div<{ $recent?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ $recent }) => ($recent ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 1px solid ${({ $recent, theme }) => ($recent ? theme.colors.primary : "rgba(255, 255, 255, 0.1)")};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const AchievementIcon = styled.div`
  font-size: 1.5rem;
`

const AchievementInfo = styled.div`
  flex: 1;
`

const AchievementTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2px;
`

const AchievementDate = styled.p`
  font-size: 0.8rem;
  color: #cccccc;
`

type BadgeCategory = "achievements" | "milestones" | "social" | "special"

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  rarity: "common" | "rare" | "epic" | "legendary"
  earned: boolean
  progress?: {
    current: number
    target: number
  }
  earnedAt?: Date
}

interface Achievement {
  id: string
  title: string
  icon: string
  earnedAt: Date
  recent: boolean
}

const mockBadges: Badge[] = [
  // Achievement Badges
  {
    id: "first-scroll",
    name: "First Scroll",
    description: "Watched your first reel",
    icon: "🎬",
    category: "achievements",
    rarity: "common",
    earned: true,
    earnedAt: new Date("2024-01-15"),
  },
  {
    id: "scroll-master",
    name: "Scroll Master",
    description: "Watched 1,000 reels",
    icon: "📱",
    category: "achievements",
    rarity: "rare",
    earned: true,
    earnedAt: new Date("2024-02-20"),
  },
  {
    id: "scroll-legend",
    name: "Scroll Legend",
    description: "Watched 10,000 reels",
    icon: "🏆",
    category: "achievements",
    rarity: "legendary",
    earned: false,
    progress: { current: 7543, target: 10000 },
  },

  // Milestone Badges
  {
    id: "token-collector",
    name: "Token Collector",
    description: "Earned 10,000 $SCROLL",
    icon: "💰",
    category: "milestones",
    rarity: "common",
    earned: true,
    earnedAt: new Date("2024-01-25"),
  },
  {
    id: "whale-status",
    name: "Whale Status",
    description: "Hold 100,000 $SCROLL",
    icon: "🐋",
    category: "milestones",
    rarity: "epic",
    earned: false,
    progress: { current: 45600, target: 100000 },
  },

  // Social Badges
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    description: "Liked 1,000 reels",
    icon: "🦋",
    category: "social",
    rarity: "common",
    earned: true,
    earnedAt: new Date("2024-02-10"),
  },
  {
    id: "generous-tipper",
    name: "Generous Tipper",
    description: "Tipped 50,000 $SCROLL total",
    icon: "💝",
    category: "social",
    rarity: "rare",
    earned: false,
    progress: { current: 12500, target: 50000 },
  },

  // Special Badges
  {
    id: "early-adopter",
    name: "Early Adopter",
    description: "Joined in the first month",
    icon: "🚀",
    category: "special",
    rarity: "legendary",
    earned: true,
    earnedAt: new Date("2024-01-01"),
  },
  {
    id: "battle-champion",
    name: "Battle Champion",
    description: "Won 100 reel battles",
    icon: "👑",
    category: "special",
    rarity: "epic",
    earned: false,
    progress: { current: 28, target: 100 },
  },
]

const mockAchievements: Achievement[] = [
  {
    id: "1",
    title: "Reached 50,000 $SCROLL tokens",
    icon: "💰",
    earnedAt: new Date("2024-03-15"),
    recent: true,
  },
  {
    id: "2",
    title: "Won 25 reel battles",
    icon: "⚔️",
    earnedAt: new Date("2024-03-10"),
    recent: true,
  },
  {
    id: "3",
    title: "Completed 100 daily challenges",
    icon: "🎯",
    earnedAt: new Date("2024-03-05"),
    recent: false,
  },
  {
    id: "4",
    title: "Tipped 10,000 $SCROLL to creators",
    icon: "💝",
    earnedAt: new Date("2024-02-28"),
    recent: false,
  },
]

export function ProfileBadges() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [activeTab, setActiveTab] = useState<BadgeCategory>("achievements")
  const [badges] = useState<Badge[]>(mockBadges)
  const [achievements] = useState<Achievement[]>(mockAchievements)
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
    scrollTokens: 0,
    vibeTokens: 100,
  }

  const filteredBadges = badges.filter((badge) => badge.category === activeTab)
  const earnedBadges = badges.filter((badge) => badge.earned)
  const totalBadges = badges.length

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>{user.username.charAt(0).toUpperCase()}</ProfileAvatar>
        <ProfileInfo>
          <ProfileName>{user.username}</ProfileName>
          <ProfileHandle>@{user.username}</ProfileHandle>
          <ProfileStats>
            <StatItem>
              <StatValue>{user.scrollTokens.toLocaleString()}</StatValue>
              <StatLabel>$SCROLL</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{user.vibeTokens.toLocaleString()}</StatValue>
              <StatLabel>$VIBE</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>
                {earnedBadges.length}/{totalBadges}
              </StatValue>
              <StatLabel>Badges</StatLabel>
            </StatItem>
          </ProfileStats>
        </ProfileInfo>
      </ProfileHeader>

      <BadgesSection>
        <SectionTitle>🏅 Badge Collection</SectionTitle>

        <BadgesTabs>
          <BadgeTab $active={activeTab === "achievements"} onClick={() => setActiveTab("achievements")}>
            Achievements
          </BadgeTab>
          <BadgeTab $active={activeTab === "milestones"} onClick={() => setActiveTab("milestones")}>
            Milestones
          </BadgeTab>
          <BadgeTab $active={activeTab === "social"} onClick={() => setActiveTab("social")}>
            Social
          </BadgeTab>
          <BadgeTab $active={activeTab === "special"} onClick={() => setActiveTab("special")}>
            Special
          </BadgeTab>
        </BadgesTabs>

        <BadgesGrid>
          {filteredBadges.map((badge) => (
            <BadgeCard key={badge.id} $earned={badge.earned} $rarity={badge.rarity}>
              <BadgeIcon $earned={badge.earned}>{badge.icon}</BadgeIcon>
              <BadgeName>{badge.name}</BadgeName>
              <BadgeDescription>{badge.description}</BadgeDescription>
              <BadgeRarity $rarity={badge.rarity}>{badge.rarity}</BadgeRarity>
              {badge.progress && !badge.earned && (
                <BadgeProgress>
                  {badge.progress.current.toLocaleString()} / {badge.progress.target.toLocaleString()}
                </BadgeProgress>
              )}
            </BadgeCard>
          ))}
        </BadgesGrid>
      </BadgesSection>

      <AchievementsSection>
        <SectionTitle>🎉 Recent Achievements</SectionTitle>

        <AchievementsList>
          {achievements.map((achievement) => (
            <AchievementItem key={achievement.id} $recent={achievement.recent}>
              <AchievementIcon>{achievement.icon}</AchievementIcon>
              <AchievementInfo>
                <AchievementTitle>{achievement.title}</AchievementTitle>
                <AchievementDate>
                  {achievement.earnedAt.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </AchievementDate>
              </AchievementInfo>
            </AchievementItem>
          ))}
        </AchievementsList>
      </AchievementsSection>
    </ProfileContainer>
  )
}
