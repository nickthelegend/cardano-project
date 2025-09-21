"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"


const ConversionContainer = styled.div`
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const ConversionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
`

const ConversionCard = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ConversionRate = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const RateText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const BurnNotice = styled.div`
  font-size: 0.9rem;
  color: #cccccc;
  color: ${({ theme }) => theme.colors.secondary};
`

const ConversionForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

const TokenInput = styled.input`
  flex: 1;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: #ffffff;
  font-size: 1rem;
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 219, 154, 0.2);
  }
`

const TokenLabel = styled.div`
  font-weight: 600;
  color: #ffffff;
  min-width: 80px;
`

const ConvertButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ConversionBreakdown = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`

const BreakdownRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: #ffffff;
  
  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: ${({ theme }) => theme.spacing.sm};
  }
`

export function TokenConversion() {
  const { connected, name } = useWallet()
   
  const [userData, setUserData] = useState<ReturnType<typeof getUserData>>(null)
  const [scrollAmount, setScrollAmount] = useState("")
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
  }

  const scrollValue = Number.parseFloat(scrollAmount) || 0
  const conversionRate = 1000 // 1000 $SCROLL = 1 $VIBE
  const burnRate = 0.1 // 10% burn
  const vibeReceived = scrollValue / conversionRate
  const burnAmount = vibeReceived * burnRate
  const netVibeReceived = vibeReceived - burnAmount

  const handleConvert = () => {
    if (scrollValue > 0 && scrollValue <= user.scrollTokens) {
      console.log(`[v0] Converting ${scrollValue} $SCROLL to ${netVibeReceived} $VIBE`)
      // Implement conversion logic
    }
  }

  return (
    <ConversionContainer>
      <ConversionTitle>Token Conversion</ConversionTitle>

      <ConversionRate>
        <RateText>1,000 $SCROLL → 1 $VIBE</RateText>
        <BurnNotice>10% burn fee applies to maintain $VIBE scarcity</BurnNotice>
      </ConversionRate>

      <ConversionCard>
        <ConversionForm>
          <InputGroup>
            <TokenLabel>$SCROLL</TokenLabel>
            <TokenInput
              type="number"
              placeholder="Enter amount"
              value={scrollAmount}
              onChange={(e) => setScrollAmount(e.target.value)}
              max={user.scrollTokens}
            />
          </InputGroup>

          {scrollValue > 0 && (
            <ConversionBreakdown>
              <BreakdownRow>
                <span>$SCROLL to convert:</span>
                <span>{scrollValue.toLocaleString()}</span>
              </BreakdownRow>
              <BreakdownRow>
                <span>$VIBE before burn:</span>
                <span>{vibeReceived.toFixed(4)}</span>
              </BreakdownRow>
              <BreakdownRow>
                <span>Burn amount (10%):</span>
                <span style={{ color: "#ff49d2" }}>-{burnAmount.toFixed(4)}</span>
              </BreakdownRow>
              <BreakdownRow>
                <span>Net $VIBE received:</span>
                <span style={{ color: "#63db9b" }}>{netVibeReceived.toFixed(4)}</span>
              </BreakdownRow>
            </ConversionBreakdown>
          )}

          <ConvertButton onClick={handleConvert} disabled={scrollValue <= 0 || scrollValue > user.scrollTokens}>
            Convert to $VIBE
          </ConvertButton>
        </ConversionForm>
      </ConversionCard>
    </ConversionContainer>
  )
}
