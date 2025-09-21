"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"

import { TokenConversion } from "./token-conversion"
import { StakingSystem } from "./staking-system"
import { GovernanceDAO } from "./governance-dao"
import { DailyChallenges } from "./daily-challenges"
import { Leaderboard } from "./leaderboard"

const WalletContainer = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 800px;
  margin: 0 auto;
`

const WalletHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const WalletTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const WalletSubtitle = styled.p`
  color: #cccccc;
  font-size: 1.1rem;
`

const TokenCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

const TokenCard = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
`

const TokenCardBg = styled.div<{ $color: string }>`
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: ${(props) => props.$color};
  opacity: 0.1;
  border-radius: ${({ theme }) => theme.borderRadius.full};
`

const TokenHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: relative;
  z-index: 2;
`

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const TokenIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${(props) => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
`

const TokenDetails = styled.div``

const TokenName = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 2px;
  color: #ffffff;
`

const TokenSymbol = styled.p`
  font-size: 0.9rem;
  color: #cccccc;
`

const TokenBalance = styled.div`
  text-align: right;
  position: relative;
  z-index: 2;
`

const TokenAmount = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 4px;
`

const TokenValue = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
`

const TokenActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  position: relative;
  z-index: 2;
`

const ActionButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${(props) =>
    props.$variant === "primary"
      ? `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.background};
    
    &:hover {
      background: ${props.theme.colors.secondary};
      transform: translateY(-2px);
      box-shadow: ${props.theme.shadows.lg};
    }
  `
      : `
    background: rgba(255, 255, 255, 0.2);
    color: #ffffff;
    border: 1px solid ${props.theme.colors.border};
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `}
`

const StatsSection = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const StatsTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: #ffffff;
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`

const StatCard = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
`

const TransactionHistory = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
`

const HistoryTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: #ffffff;
`

const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const TransactionItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const TransactionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const TransactionIcon = styled.div<{ $type: "earn" | "spend" }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${(props) => (props.$type === "earn" ? props.theme.colors.primary : props.theme.colors.secondary)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.background};
`

const TransactionDetails = styled.div``

const TransactionType = styled.div`
  font-weight: 600;
  margin-bottom: 2px;
  color: #ffffff;
`

const TransactionTime = styled.div`
  font-size: 0.8rem;
  color: #cccccc;
`

const TransactionAmount = styled.div<{ $type: "earn" | "spend" }>`
  font-weight: 600;
  color: ${(props) => (props.$type === "earn" ? props.theme.colors.primary : props.theme.colors.secondary)};
`

interface Transaction {
  id: string
  type: "earn" | "spend"
  action: string
  amount: number
  token: "scroll" | "vibe"
  timestamp: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "earn",
    action: "Scroll Reward",
    amount: 5,
    token: "scroll",
    timestamp: "2 minutes ago",
  },
  {
    id: "2",
    type: "earn",
    action: "Daily Login Bonus",
    amount: 10,
    token: "scroll",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    type: "spend",
    action: "Boost Reel",
    amount: 25,
    token: "vibe",
    timestamp: "3 hours ago",
  },
  {
    id: "4",
    type: "earn",
    action: "Reel Views Bonus",
    amount: 15,
    token: "scroll",
    timestamp: "5 hours ago",
  },
  {
    id: "5",
    type: "earn",
    action: "Comment Reward",
    amount: 3,
    token: "scroll",
    timestamp: "1 day ago",
  },
]

export function TokenWallet() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [transactions] = useState<Transaction[]>(mockTransactions)
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
    dailyScrollCount: 0,
    stakedVibe: 0,
  }

  const handleSendTokens = (tokenType: "scroll" | "vibe") => {
    console.log(`[v0] Send ${tokenType} tokens`)
  }

  const handleReceiveTokens = (tokenType: "scroll" | "vibe") => {
    console.log(`[v0] Receive ${tokenType} tokens`)
  }

  const handleStakeTokens = () => {
    console.log("[v0] Stake tokens")
  }

  return (
    <WalletContainer>
      <WalletHeader>
        <WalletTitle>Token Wallet</WalletTitle>
        <WalletSubtitle>Manage your $Scroll and $Vibe tokens</WalletSubtitle>
      </WalletHeader>

      <TokenCards>
        <TokenCard>
          <TokenCardBg $color="#63db9b" />
          <TokenHeader>
            <TokenInfo>
              <TokenIcon $color="#63db9b">S</TokenIcon>
              <TokenDetails>
                <TokenName>Scroll Token</TokenName>
                <TokenSymbol>$SCROLL</TokenSymbol>
              </TokenDetails>
            </TokenInfo>
          </TokenHeader>
          <TokenBalance>
            <TokenAmount>{user.scrollTokens.toLocaleString()}</TokenAmount>
            <TokenValue>≈ ${(user.scrollTokens * 0.05).toFixed(2)} USD</TokenValue>
          </TokenBalance>
          <TokenActions>
            <ActionButton onClick={() => handleSendTokens("scroll")}>Send</ActionButton>
            <ActionButton onClick={() => handleReceiveTokens("scroll")}>Receive</ActionButton>
          </TokenActions>
        </TokenCard>

        <TokenCard>
          <TokenCardBg $color="#ff49d2" />
          <TokenHeader>
            <TokenInfo>
              <TokenIcon $color="#ff49d2">V</TokenIcon>
              <TokenDetails>
                <TokenName>Vibe Token</TokenName>
                <TokenSymbol>$VIBE</TokenSymbol>
              </TokenDetails>
            </TokenInfo>
          </TokenHeader>
          <TokenBalance>
            <TokenAmount>{user.vibeTokens.toLocaleString()}</TokenAmount>
            <TokenValue>≈ ${(user.vibeTokens * 0.25).toFixed(2)} USD</TokenValue>
          </TokenBalance>
          <TokenActions>
            <ActionButton $variant="primary" onClick={handleStakeTokens}>
              Stake
            </ActionButton>
            <ActionButton onClick={() => handleSendTokens("vibe")}>Send</ActionButton>
          </TokenActions>
        </TokenCard>
      </TokenCards>

      <TokenConversion />
      <StakingSystem />
      <GovernanceDAO />

      <StatsSection>
        <StatsTitle>Earning Statistics</StatsTitle>
        <StatsGrid>
          <StatCard>
            <StatValue>{user.dailyScrollCount}</StatValue>
            <StatLabel>Today's Scrolls</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>47</StatValue>
            <StatLabel>Total Earned Today</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>1,234</StatValue>
            <StatLabel>All-Time Earnings</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>7</StatValue>
            <StatLabel>Login Streak</StatLabel>
          </StatCard>
        </StatsGrid>
      </StatsSection>

      <TransactionHistory>
        <HistoryTitle>Recent Transactions</HistoryTitle>
        <TransactionList>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id}>
              <TransactionInfo>
                <TransactionIcon $type={transaction.type}>{transaction.type === "earn" ? "+" : "-"}</TransactionIcon>
                <TransactionDetails>
                  <TransactionType>{transaction.action}</TransactionType>
                  <TransactionTime>{transaction.timestamp}</TransactionTime>
                </TransactionDetails>
              </TransactionInfo>
              <TransactionAmount $type={transaction.type}>
                {transaction.type === "earn" ? "+" : "-"}
                {transaction.amount} ${transaction.token.toUpperCase()}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </TransactionHistory>
    </WalletContainer>
  )
}
