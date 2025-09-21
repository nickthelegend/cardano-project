"use client"

import { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"

import { useScrollRewards } from "@/hooks/use-scroll-rewards"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"
import { ScrollProgress } from "./scroll-progress"
import { BoostModal } from "./boost-modal"
import { TipModal } from "./tip-modal"

const FeedContainer = styled.div`
  flex: 1;
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const ReelCard = styled.div`
  height: 100vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const ReelVideo = styled.div<{ $bgImage: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`

const VideoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.7) 100%
  );
`

const PlayButton = styled.button`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`

const ReelInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: 2;
`

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const CreatorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
`

const CreatorName = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

const ReelDescription = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ReelActions = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.lg};
  bottom: 120px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  z-index: 2;
`

const ActionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }
`

const ActionCount = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-top: 4px;
`

const ScrollReward = styled.div<{ $show: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 600;
  z-index: 1000;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  transform: translate(-50%, -50%) scale(${(props) => (props.$show ? 1 : 0.8)});
  transition: all 0.3s ease;
  pointer-events: none;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const BoostButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary}, ${({ theme }) => theme.colors.accent});
  border: none;
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.secondary});
    transform: scale(1.1);
  }
`

const TipButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.accent});
  border: none;
  color: ${({ theme }) => theme.colors.background};
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.accent}, ${({ theme }) => theme.colors.primary});
    transform: scale(1.1);
  }
`

interface Reel {
  id: string
  creator: string
  description: string
  thumbnail: string
  likes: number
  comments: number
  shares: number
}

const mockReels: Reel[] = [
  {
    id: "1",
    creator: "TechVibes",
    description: "Building the future of social media! 🚀 What do you think about scroll-to-earn?",
    thumbnail: "/tech-startup-office-modern.jpg",
    likes: 1234,
    comments: 89,
    shares: 45,
  },
  {
    id: "2",
    creator: "CryptoQueen",
    description: "Just earned 50 $Scroll tokens by watching reels! This platform is revolutionary 💎",
    thumbnail: "/cryptocurrency-trading-setup-neon.jpg",
    likes: 2156,
    comments: 234,
    shares: 78,
  },
  {
    id: "3",
    creator: "VibeCreator",
    description: "Creating content that pays! Join the scroll-to-earn revolution 🎬✨",
    thumbnail: "/content-creator-studio-colorful.jpg",
    likes: 987,
    comments: 156,
    shares: 34,
  },
  {
    id: "4",
    creator: "TokenMaster",
    description: "Boosted this reel with 100 $Vibe tokens! Watch it reach millions 🔥",
    thumbnail: "/digital-marketing-dashboard.png",
    likes: 3421,
    comments: 445,
    shares: 123,
  },
  {
    id: "5",
    creator: "ScrollGuru",
    description: "Daily scroll streak: 30 days! Earning passive income while having fun 💰",
    thumbnail: "/mobile-app-interface-social-media.jpg",
    likes: 1876,
    comments: 298,
    shares: 67,
  },
]

export function ReelFeed() {
  const { connected } = useWallet()
  const { user } = useUTXOSAuth()
  const { earnTokens, showReward, rewardAmount, canEarn } = useScrollRewards()
  const [reels] = useState<Reel[]>(mockReels)
  const [currentReelIndex, setCurrentReelIndex] = useState(0)
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [showTipModal, setShowTipModal] = useState(false)
  const [selectedReelId, setSelectedReelId] = useState<string>("")
  const [selectedCreator, setSelectedCreator] = useState<string>("")
  const feedRef = useRef<HTMLDivElement>(null)
  const lastScrollTime = useRef(Date.now())

  // Show feed if connected or has user data
  if (!connected && !user) return null

  useEffect(() => {
    const handleScroll = () => {
      if (!feedRef.current || !canEarn) return

      const now = Date.now()
      const timeSinceLastScroll = now - lastScrollTime.current

      // Only reward if enough time has passed and user can still earn
      if (timeSinceLastScroll > 1000) {
        earnTokens(5) // Attempt to earn up to 5 tokens
        lastScrollTime.current = now
      }

      // Update current reel index based on scroll position
      const scrollTop = feedRef.current.scrollTop
      const reelHeight = window.innerHeight
      const newIndex = Math.round(scrollTop / reelHeight)
      setCurrentReelIndex(newIndex)
    }

    const feedElement = feedRef.current
    if (feedElement) {
      feedElement.addEventListener("scroll", handleScroll)
      return () => feedElement.removeEventListener("scroll", handleScroll)
    }
  }, [earnTokens, canEarn])

  const handleLike = (reelId: string) => {
    console.log(`[v0] Liked reel ${reelId}`)
    // Small reward for engagement
    if (canEarn) {
      earnTokens(2)
    }
  }

  const handleComment = (reelId: string) => {
    console.log(`[v0] Comment on reel ${reelId}`)
    // Small reward for engagement
    if (canEarn) {
      earnTokens(3)
    }
  }

  const handleShare = (reelId: string) => {
    console.log(`[v0] Shared reel ${reelId}`)
    // Reward for sharing
    if (canEarn) {
      earnTokens(5)
    }
  }

  const handleBoost = (reelId: string) => {
    setSelectedReelId(reelId)
    setShowBoostModal(true)
  }

  const handleTip = (reelId: string, creatorName: string) => {
    setSelectedReelId(reelId)
    setSelectedCreator(creatorName)
    setShowTipModal(true)
  }

  return (
    <>
      {/* <ScrollProgress /> */}

      <FeedContainer ref={feedRef}>
        {reels.map((reel, index) => (
          <ReelCard key={reel.id}>
            <ReelVideo $bgImage={reel.thumbnail}>
              <VideoOverlay />
              <PlayButton>▶</PlayButton>

              <ReelInfo>
                <CreatorInfo>
                  <CreatorAvatar>{reel.creator.charAt(0)}</CreatorAvatar>
                  <CreatorName>@{reel.creator}</CreatorName>
                </CreatorInfo>
                <ReelDescription>{reel.description}</ReelDescription>
              </ReelInfo>

              <ReelActions>
                <div>
                  <ActionButton onClick={() => handleLike(reel.id)}>❤️</ActionButton>
                  <ActionCount>{reel.likes.toLocaleString()}</ActionCount>
                </div>
                <div>
                  <ActionButton onClick={() => handleComment(reel.id)}>💬</ActionButton>
                  <ActionCount>{reel.comments}</ActionCount>
                </div>
                <div>
                  <ActionButton onClick={() => handleShare(reel.id)}>📤</ActionButton>
                  <ActionCount>{reel.shares}</ActionCount>
                </div>
                <div>
                  <TipButton onClick={() => handleTip(reel.id, reel.creator)}>💰</TipButton>
                  <ActionCount>Tip</ActionCount>
                </div>
                <div>
                  <BoostButton onClick={() => handleBoost(reel.id)}>🚀</BoostButton>
                  <ActionCount>Boost</ActionCount>
                </div>
              </ReelActions>
            </ReelVideo>
          </ReelCard>
        ))}
      </FeedContainer>

      <ScrollReward $show={showReward}>+{rewardAmount} $Scroll earned!</ScrollReward>

      <BoostModal show={showBoostModal} onClose={() => setShowBoostModal(false)} reelId={selectedReelId} />
      <TipModal
        show={showTipModal}
        onClose={() => setShowTipModal(false)}
        reelId={selectedReelId}
        creatorName={selectedCreator}
      />
    </>
  )
}
