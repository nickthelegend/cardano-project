"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const GovernanceContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const GovernanceTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
`

const VotingPower = styled.div`
  background: rgba(226, 227, 97, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const VotingPowerValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const VotingPowerLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`

const ProposalsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const ProposalCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`

const ProposalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ProposalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const ProposalStatus = styled.div<{ $status: "active" | "passed" | "failed" }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  
  ${({ $status, theme }) => {
    switch ($status) {
      case "active":
        return `background: ${theme.colors.accent}; color: ${theme.colors.background};`
      case "passed":
        return `background: ${theme.colors.primary}; color: ${theme.colors.background};`
      case "failed":
        return `background: ${theme.colors.secondary}; color: ${theme.colors.background};`
    }
  }}
`

const ProposalDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  opacity: 0.8;
  line-height: 1.5;
`

const VotingSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const VoteButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const VoteButton = styled.button<{ $type: "for" | "against" }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${({ $type, theme }) =>
    $type === "for"
      ? `
    background: ${theme.colors.primary};
    color: ${theme.colors.background};
    
    &:hover {
      background: #4fb87f;
    }
  `
      : `
    background: ${theme.colors.secondary};
    color: ${theme.colors.background};
    
    &:hover {
      background: #e03bb8;
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const VoteProgress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: 0.9rem;
`

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`

const ProgressFill = styled.div<{ $percentage: number; $type: "for" | "against" }>`
  height: 100%;
  width: ${({ $percentage }) => $percentage}%;
  background: ${({ $type, theme }) => ($type === "for" ? theme.colors.primary : theme.colors.secondary)};
  transition: width 0.3s ease;
`

const ProposalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.7;
`

interface Proposal {
  id: string
  title: string
  description: string
  status: "active" | "passed" | "failed"
  votesFor: number
  votesAgainst: number
  totalVotes: number
  endDate: string
  userVoted?: "for" | "against"
}

const mockProposals: Proposal[] = [
  {
    id: "1",
    title: "Increase Daily $SCROLL Rewards by 25%",
    description:
      "Proposal to increase the daily scroll rewards from 100 to 125 $SCROLL tokens to incentivize more user engagement and platform growth.",
    status: "active",
    votesFor: 15420,
    votesAgainst: 3280,
    totalVotes: 18700,
    endDate: "2 days left",
  },
  {
    id: "2",
    title: "Add NFT Marketplace Integration",
    description:
      "Integrate an NFT marketplace where users can buy/sell exclusive ScrollVibe collectibles using $VIBE tokens.",
    status: "active",
    votesFor: 8950,
    votesAgainst: 12100,
    totalVotes: 21050,
    endDate: "5 days left",
  },
  {
    id: "3",
    title: "Reduce Boost Cost for New Creators",
    description:
      "Reduce the $VIBE cost for content boosting by 50% for creators with less than 1000 followers to support platform growth.",
    status: "passed",
    votesFor: 22100,
    votesAgainst: 5900,
    totalVotes: 28000,
    endDate: "Ended",
  },
]

export function GovernanceDAO() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [proposals] = useState<Proposal[]>(mockProposals)
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
    vibeTokens: 100,
    stakedVibe: 0,
  }

  const votingPower = (user.stakedVibe || 0) + user.vibeTokens * 0.1

  const handleVote = (proposalId: string, voteType: "for" | "against") => {
    console.log(`[v0] Voting ${voteType} on proposal ${proposalId} with ${votingPower} voting power`)
  }

  return (
    <GovernanceContainer>
      <GovernanceTitle>DAO Governance</GovernanceTitle>

      <VotingPower>
        <VotingPowerValue>{votingPower.toFixed(1)}</VotingPowerValue>
        <VotingPowerLabel>Your Voting Power (Staked + 10% of held $VIBE)</VotingPowerLabel>
      </VotingPower>

      <ProposalsList>
        {proposals.map((proposal) => {
          const forPercentage = (proposal.votesFor / proposal.totalVotes) * 100
          const againstPercentage = (proposal.votesAgainst / proposal.totalVotes) * 100

          return (
            <ProposalCard key={proposal.id}>
              <ProposalHeader>
                <div>
                  <ProposalTitle>{proposal.title}</ProposalTitle>
                  <ProposalStatus $status={proposal.status}>{proposal.status}</ProposalStatus>
                </div>
              </ProposalHeader>

              <ProposalDescription>{proposal.description}</ProposalDescription>

              {proposal.status === "active" && votingPower > 0 && (
                <VotingSection>
                  <VoteButtons>
                    <VoteButton
                      $type="for"
                      onClick={() => handleVote(proposal.id, "for")}
                      disabled={!!proposal.userVoted}
                    >
                      Vote For
                    </VoteButton>
                    <VoteButton
                      $type="against"
                      onClick={() => handleVote(proposal.id, "against")}
                      disabled={!!proposal.userVoted}
                    >
                      Vote Against
                    </VoteButton>
                  </VoteButtons>
                </VotingSection>
              )}

              <VoteProgress>
                <span>For: {proposal.votesFor.toLocaleString()}</span>
                <ProgressBar>
                  <ProgressFill $percentage={forPercentage} $type="for" />
                </ProgressBar>
                <span>Against: {proposal.votesAgainst.toLocaleString()}</span>
              </VoteProgress>

              <ProposalFooter>
                <span>Total votes: {proposal.totalVotes.toLocaleString()}</span>
                <span>{proposal.endDate}</span>
              </ProposalFooter>
            </ProposalCard>
          )
        })}
      </ProposalsList>
    </GovernanceContainer>
  )
}
