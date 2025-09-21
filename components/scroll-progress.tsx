"use client"

import styled from "styled-components"
import { useScrollRewards } from "@/hooks/use-scroll-rewards"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

const ProgressContainer = styled.div<{ $expanded: boolean; $isMobile: boolean }>`
  position: fixed !important;
  top: 0 !important;
  left: ${({ $isMobile }) => ($isMobile ? '0 !important' : '280px !important')};
  right: 0 !important;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(26, 26, 26, 0.95));
  backdrop-filter: blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  padding: ${({ $expanded }) => ($expanded ? "1rem" : "0.75rem 1rem")};
  z-index: 9999 !important;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: ${({ $expanded }) => ($expanded ? "auto" : "70px")};
  overflow: hidden;
  
  &:hover {
    background: linear-gradient(135deg, rgba(0, 0, 0, 0.98), rgba(26, 26, 26, 0.98));
    border-bottom-color: ${({ theme }) => theme.colors.secondary};
  }
`

const ProgressHeader = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ $expanded }) => ($expanded ? "0.5rem" : "0")};
`

const ProgressTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &::before {
    content: "⚡";
    font-size: 1rem;
  }
`

const EarningsCount = styled.span`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  background: rgba(99, 219, 154, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  border: 1px solid rgba(99, 219, 154, 0.2);
`

const ProgressBarContainer = styled.div`
  position: relative;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProgressBar = styled.div<{ $expanded: boolean }>`
  width: 100%;
  height: ${({ $expanded }) => ($expanded ? "10px" : "6px")};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: ${({ $expanded }) => ($expanded ? "0.5rem" : "0")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
`

const ProgressFill = styled.div<{ $progress: number }>`
  height: 100%;
  width: ${(props) => props.$progress}%;
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.accent});
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(99, 219, 154, 0.3);
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
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

const ExpandedContent = styled.div<{ $expanded: boolean }>`
  opacity: ${({ $expanded }) => ($expanded ? 1 : 0)};
  max-height: ${({ $expanded }) => ($expanded ? "500px" : "0")};
  transition: all 0.3s ease;
  overflow: hidden;
`

const MilestoneRewards = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  margin-bottom: 0.5rem;
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
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 0.5rem;
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
  margin-top: 0.5rem;
`

const ResetTimer = styled.div`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
  margin-top: 0.25rem;
`

const ExpandIndicator = styled.div<{ $expanded: boolean }>`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.primary};
  opacity: 0.8;
  transform: ${({ $expanded }) => ($expanded ? "rotate(180deg)" : "rotate(0deg)")};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.25rem;
  border-radius: 50%;
  background: rgba(99, 219, 154, 0.1);
  
  &:hover {
    opacity: 1;
    background: rgba(99, 219, 154, 0.2);
  }
`

export function ScrollProgress() {
  const { dailyEarnings, canEarn, timeUntilReset, streakDays } = useScrollRewards()
  const [expanded, setExpanded] = useState(false)
  const isMobile = useIsMobile()

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
    <ProgressContainer $expanded={expanded} $isMobile={isMobile} onClick={() => setExpanded(!expanded)}>
      <ProgressHeader $expanded={expanded}>
        <ProgressTitle>Daily Progress</ProgressTitle>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <EarningsCount>
            {dailyEarnings}/{DAILY_LIMIT}
          </EarningsCount>
          <ExpandIndicator $expanded={expanded}>▼</ExpandIndicator>
        </div>
      </ProgressHeader>

      <ProgressBarContainer>
        <ProgressBar $expanded={expanded}>
          <ProgressFill $progress={progress} />
        </ProgressBar>

        {expanded && (
          <MilestonesContainer>
            {milestones.map((milestone, index) => (
              <Milestone key={index} $position={milestone.threshold} $achieved={dailyEarnings >= milestone.threshold} />
            ))}
          </MilestonesContainer>
        )}
      </ProgressBarContainer>

      <ExpandedContent $expanded={expanded}>
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
      </ExpandedContent>
    </ProgressContainer>
  )
}
