"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useWallet } from "@meshsdk/react"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"


const ModalOverlay = styled.div<{ $show: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${(props) => (props.$show ? 1 : 0)};
  visibility: ${(props) => (props.$show ? "visible" : "hidden")};
  transition: all 0.3s ease;
`

const ModalContent = styled.div`
  background: #1a1a1a;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  width: 90%;
  max-width: 400px;
  position: relative;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  
  &:hover {
    opacity: 1;
  }
`

const TipSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`

const MicroTips = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const MicroTipButton = styled.button<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ $selected }) => ($selected ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(99, 219, 154, 0.1);
  }
`

const EmojiIcon = styled.div`
  font-size: 1.2rem;
`

const TipAmounts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const TipButton = styled.button<{ $selected?: boolean }>`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ $selected, theme }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ $selected }) => ($selected ? "rgba(99, 219, 154, 0.1)" : "rgba(255, 255, 255, 0.05)")};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background: rgba(99, 219, 154, 0.1);
  }
`

const CustomTipInput = styled.input`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 219, 154, 0.2);
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`

const TipSummary = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
    font-weight: 600;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding-top: ${({ theme }) => theme.spacing.sm};
  }
`

const SendTipButton = styled.button`
  width: 100%;
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

const CreatorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${({ theme }) => theme.borderRadius.md};
`

const CreatorAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.background};
`

const CreatorName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`

interface TipModalProps {
  show: boolean
  onClose: () => void
  creatorName: string
  reelId: string
}

const microTips = [
  { amount: 10, emoji: "🔥", label: "Fire" },
  { amount: 25, emoji: "💎", label: "Gem" },
  { amount: 50, emoji: "⚡", label: "Bolt" },
  { amount: 100, emoji: "🚀", label: "Rocket" },
]

const tipAmounts = [250, 500, 1000, 2500, 5000, 10000]

export function TipModal({ show, onClose, creatorName, reelId }: TipModalProps) {
  const { connected, name } = useWallet()
  const { user } = useUTXOSAuth()
  const [selectedAmount, setSelectedAmount] = useState(0)
  const [customAmount, setCustomAmount] = useState("")
  const [tipType, setTipType] = useState<"micro" | "regular">("micro")

  if (!connected && !user) return null

  // Use UTXOS user data or create default data for connected wallet
  const userData = user || {
    username: name ? `User_${name.slice(0, 8)}` : "Wallet User",
    scrollTokens: 0,
  }

  const tipAmount = customAmount ? Number.parseFloat(customAmount) : selectedAmount
  const platformFee = Math.ceil(tipAmount * 0.05) // 5% platform fee
  const creatorReceives = tipAmount - platformFee

  const handleSendTip = () => {
    if (tipAmount > 0 && tipAmount <= userData.scrollTokens) {
      console.log(`[v0] Sending ${tipAmount} $SCROLL tip to ${creatorName} for reel ${reelId}`)
      onClose()
    }
  }

  const handleMicroTipSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setTipType("micro")
  }

  const handleRegularTipSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount("")
    setTipType("regular")
  }

  return (
    <ModalOverlay $show={show} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Send Tip</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <CreatorInfo>
          <CreatorAvatar>{creatorName.charAt(0)}</CreatorAvatar>
          <CreatorName>@{creatorName}</CreatorName>
        </CreatorInfo>

        <TipSection>
          <SectionTitle>🔥 Quick Tips</SectionTitle>
          <MicroTips>
            {microTips.map((tip) => (
              <MicroTipButton
                key={tip.amount}
                $selected={selectedAmount === tip.amount && tipType === "micro"}
                onClick={() => handleMicroTipSelect(tip.amount)}
              >
                <EmojiIcon>{tip.emoji}</EmojiIcon>
                <div>{tip.amount}</div>
              </MicroTipButton>
            ))}
          </MicroTips>
        </TipSection>

        <TipSection>
          <SectionTitle>💰 Premium Tips</SectionTitle>
          <TipAmounts>
            {tipAmounts.map((amount) => (
              <TipButton
                key={amount}
                $selected={selectedAmount === amount && tipType === "regular"}
                onClick={() => handleRegularTipSelect(amount)}
              >
                {amount.toLocaleString()} $SCROLL
              </TipButton>
            ))}
          </TipAmounts>
        </TipSection>

        <CustomTipInput
          type="number"
          placeholder="Custom amount"
          value={customAmount}
          onChange={(e) => {
            setCustomAmount(e.target.value)
            setSelectedAmount(0)
          }}
          max={userData.scrollTokens}
        />

        {tipAmount > 0 && (
          <TipSummary>
            <SummaryRow>
              <span>Tip amount:</span>
              <span>{tipAmount} $SCROLL</span>
            </SummaryRow>
            <SummaryRow>
              <span>Platform fee (5%):</span>
              <span>-{platformFee} $SCROLL</span>
            </SummaryRow>
            <SummaryRow>
              <span>Creator receives:</span>
              <span style={{ color: "#63db9b" }}>{creatorReceives} $SCROLL</span>
            </SummaryRow>
          </TipSummary>
        )}

        <SendTipButton onClick={handleSendTip} disabled={tipAmount <= 0 || tipAmount > userData.scrollTokens}>
          Send Tip
        </SendTipButton>
      </ModalContent>
    </ModalOverlay>
  )
}
