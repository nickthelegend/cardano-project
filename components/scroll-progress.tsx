"use client"

import styled from "styled-components"
import { useScrollRewards } from "@/hooks/use-scroll-rewards"

const ProgressContainer = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.spacing.lg};
  right: ${({ theme }) => theme.spacing.lg};
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.md};
  z-index: 1000;
  min-width: 280px;
`

const ProgressHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressTitle = styled.h4`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const EarningsCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`

const ProgressBarContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  transition: width 0.3s ease;
`

const MilestonesContainer = styled.div`
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 12px;
  pointer-events: none;
`

const Milestone = styled.div<{ $position: number; $achieved: boolean }>`
  position: absolute;
  left: ${({ $position }) => $position}%;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ $achieved, theme }) => ($achieved ? theme.colors.accent : "rgba(255, 255, 255, 0.3)")};
  border: 2px solid ${({ theme }) => theme.colors.background};
  transform: translateX(-50%);
  z-index: 2;
`

const MilestoneRewards = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  opacity: 0.8;
`

const MilestoneReward = styled.div<{ $achieved: boolean; $current?: boolean }>`
  color: ${({ $achieved, $current, theme }) =>
    $achieved ? theme.colors.accent : $current ? theme.colors.primary : theme.colors.text};
  font-weight: ${({ $achieved, $current }) => ($achieved || $current ? "600" : "400")};
  text-align: center;
  flex: 1;
  font-size: ${({ $current }) => ($current ? "0.8rem" : "0.7rem")};
  animation: ${({ $current }) => ($current ? "pulse 2s infinite" : "none")};
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`

const StreakBonus = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xs};
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.7rem;
  color: #ffd700;
`

const MilestoneNotification = styled.div<{ $show: boolean; $type: string }>`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  background: ${({ $type, theme }) =>
    $type === "jackpot"
      ? "linear-gradient(45deg, #ffd700, #ffed4e)"
      : $type === "lootbox"
        ? "linear-gradient(45deg, #ff49d2, #ff73e6)"
        : theme.colors.accent};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? "translateX(-50%) translateY(-10px) scale(1.1)" : "translateX(-50%) scale(0.8)")};
  transition: all 0.3s ease;
  z-index: 10;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
`

const ProgressText = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;
  text-align: center;
`

const ResetTimer = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xs};
`

export function ScrollProgress() {
  const { dailyEarnings, canEarn, timeUntilReset, streakDays } = useScrollRewards()

  const DAILY_LIMIT = 100
  const progress = (dailyEarnings / DAILY_LIMIT) * 100

  const milestones = [
    { threshold: 10, reward: "First Boost!", type: "first" },
    { threshold: 25, reward: "Bonus +5 $SCROLL", type: "bonus" },
    { threshold: 50, reward: "Loot Box", type: "lootbox" },
    { threshold: 75, reward: "Mega Bonus!", type: "mega" },
    { threshold: 100, reward: "Jackpot!", type: "jackpot" },
  ]

  const formatTimeUntilReset = (ms: number) => {
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours}h ${minutes}m`
  }

  const getNextMilestone = () => {
    return milestones.find((m) => dailyEarnings < m.threshold)
  }

  const getCurrentMilestone = () => {
    return milestones.find((m) => dailyEarnings >= m.threshold && dailyEarnings < m.threshold + 5)
  }

  const nextMilestone = getNextMilestone()
  const currentMilestone = getCurrentMilestone()

  const streakMultiplier = Math.min(1 + streakDays * 0.1, 2.0)

  return (
    <ProgressContainer>
      <ProgressHeader>
        <ProgressTitle>Daily Progress</ProgressTitle>
        <EarningsCount>
          {dailyEarnings}/{DAILY_LIMIT}
        </EarningsCount>
      </ProgressHeader>

      <ProgressBarContainer>
        <ProgressBar>
          <ProgressFill $progress={progress} />
        </ProgressBar>

        <MilestonesContainer>
          {milestones.map((milestone, index) => (
            <Milestone key={index} $position={milestone.threshold} $achieved={dailyEarnings >= milestone.threshold} />
          ))}
        </MilestonesContainer>
      </ProgressBarContainer>

      <MilestoneRewards>
        {milestones.map((milestone, index) => (
          <MilestoneReward
            key={index}
            $achieved={dailyEarnings >= milestone.threshold}
            $current={currentMilestone?.threshold === milestone.threshold}
          >
            {milestone.threshold}: {milestone.reward}
          </MilestoneReward>
        ))}
      </MilestoneRewards>

      {streakDays > 0 && (
        <StreakBonus>
          🔥 {streakDays} Day Streak • {((streakMultiplier - 1) * 100).toFixed(0)}% Bonus
        </StreakBonus>
      )}

      <ProgressText>
        {nextMilestone
          ? `${nextMilestone.threshold - dailyEarnings} more for ${nextMilestone.reward}!`
          : canEarn
            ? "Keep scrolling to earn more!"
            : "Daily limit reached! Come back tomorrow!"}
      </ProgressText>

      <ResetTimer>Resets in {formatTimeUntilReset(timeUntilReset)}</ResetTimer>
    </ProgressContainer>
  )
}
