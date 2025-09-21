"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const ChallengesContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ChallengesTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
`

const ChallengesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const ChallengeCard = styled.div<{ $completed?: boolean }>`
  background: ${({ $completed }) => ($completed ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  border: 1px solid ${({ $completed, theme }) => ($completed ? theme.colors.primary : theme.colors.border)};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  position: relative;
  overflow: hidden;
`

const ChallengeHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ChallengeInfo = styled.div`
  flex: 1;
`

const ChallengeTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ChallengeDescription = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ChallengeReward = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  min-width: 80px;
`

const ProgressSection = styled.div`
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
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.3s ease;
`

const ProgressText = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  text-align: center;
`

const ClaimButton = styled.button<{ $completed?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
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
    cursor: not-allowed;
  `}
`

const CompletedBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
`

interface Challenge {
  id: string
  title: string
  description: string
  reward: number
  rewardType: "scroll" | "vibe"
  target: number
  current: number
  completed: boolean
  claimed: boolean
}

const mockChallenges: Challenge[] = [
  {
    id: "1",
    title: "Daily Scroller",
    description: "Scroll through 50 reels today",
    reward: 25,
    rewardType: "scroll",
    target: 50,
    current: 32,
    completed: false,
    claimed: false,
  },
  {
    id: "2",
    title: "Engagement Master",
    description: "Like, comment, and share 10 reels",
    reward: 15,
    rewardType: "scroll",
    target: 10,
    current: 10,
    completed: true,
    claimed: false,
  },
  {
    id: "3",
    title: "Creator Support",
    description: "Send tips to 3 different creators",
    reward: 2,
    rewardType: "vibe",
    target: 3,
    current: 1,
    completed: false,
    claimed: false,
  },
  {
    id: "4",
    title: "Streak Keeper",
    description: "Maintain a 7-day login streak",
    reward: 50,
    rewardType: "scroll",
    target: 7,
    current: 7,
    completed: true,
    claimed: true,
  },
]

export function DailyChallenges() {
  const { connected, name } = useWallet()
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges)

  if (!connected) return null

  const handleClaimReward = (challengeId: string) => {
    setChallenges((prev) =>
      prev.map((challenge) => (challenge.id === challengeId ? { ...challenge, claimed: true } : challenge)),
    )

    const challenge = challenges.find((c) => c.id === challengeId)
    if (challenge) {
      console.log(
        `[v0] Claimed ${challenge.reward} ${challenge.rewardType.toUpperCase()} from challenge: ${challenge.title}`,
      )
    }
  }

  return (
    <ChallengesContainer>
      <ChallengesTitle>Daily Challenges</ChallengesTitle>

      <ChallengesList>
        {challenges.map((challenge) => {
          const progressPercentage = Math.min((challenge.current / challenge.target) * 100, 100)

          return (
            <ChallengeCard key={challenge.id} $completed={challenge.completed}>
              {challenge.claimed && <CompletedBadge>✓ Claimed</CompletedBadge>}

              <ChallengeHeader>
                <ChallengeInfo>
                  <ChallengeTitle>{challenge.title}</ChallengeTitle>
                  <ChallengeDescription>{challenge.description}</ChallengeDescription>
                </ChallengeInfo>
                <ChallengeReward>
                  +{challenge.reward} ${challenge.rewardType.toUpperCase()}
                </ChallengeReward>
              </ChallengeHeader>

              <ProgressSection>
                <ProgressBar>
                  <ProgressFill $percentage={progressPercentage} />
                </ProgressBar>
                <ProgressText>
                  {challenge.current} / {challenge.target}
                </ProgressText>
              </ProgressSection>

              <ClaimButton
                $completed={challenge.completed && !challenge.claimed}
                onClick={() => handleClaimReward(challenge.id)}
                disabled={!challenge.completed || challenge.claimed}
              >
                {challenge.claimed ? "Claimed" : challenge.completed ? "Claim Reward" : "In Progress"}
              </ClaimButton>
            </ChallengeCard>
          )
        })}
      </ChallengesList>
    </ChallengesContainer>
  )
}
