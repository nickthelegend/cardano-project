"use client"

import type React from "react"
import { useState } from "react"
import styled from "styled-components"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
`

const LoginCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 450px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const LogoText = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const LogoSubtext = styled.p`
  color: #FFFFFF;
  opacity: 0.9;
  font-size: 0.9rem;
`

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const WelcomeTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #FFFFFF;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const WelcomeDescription = styled.p`
  color: #FFFFFF;
  opacity: 0.8;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const UTXOSSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
`

const UTXOSCard = styled.div`
  background: linear-gradient(135deg, rgba(99, 219, 154, 0.1), rgba(255, 73, 210, 0.1));
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const UTXOSTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const UTXOSDescription = styled.p`
  color: #FFFFFF;
  opacity: 0.8;
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`

const ConnectButton = styled.button<{ $isLoading?: boolean }>`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};

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

const WalletIcon = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`

const ErrorMessage = styled.div`
  background: rgba(255, 73, 210, 0.1);
  border: 1px solid ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.9rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: #FFFFFF;
  opacity: 0.8;
  font-size: 0.9rem;
`

const FeatureIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`

export function UTXOSLoginForm() {
  const { connectWallet, isLoading, error } = useUTXOSAuth()

  const handleConnectWallet = async () => {
    await connectWallet()
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <LogoText>ScrollVibe</LogoText>
          <LogoSubtext>Scroll to Earn • Share the Vibe</LogoSubtext>
        </Logo>

        <WelcomeSection>
          <WelcomeTitle>Welcome to ScrollVibe</WelcomeTitle>
          <WelcomeDescription>
            Connect your Cardano wallet to start earning tokens by scrolling through reels and engaging with content.
          </WelcomeDescription>
        </WelcomeSection>

        <UTXOSSection>
          <UTXOSCard>
            <UTXOSTitle>🔗 UTXOS Wallet</UTXOSTitle>
            <UTXOSDescription>
              Secure, hosted wallet solution. No browser extensions required!
            </UTXOSDescription>
            
            {error && <ErrorMessage>{error}</ErrorMessage>}
            
            <ConnectButton 
              onClick={handleConnectWallet} 
              disabled={isLoading}
              $isLoading={isLoading}
            >
              <WalletIcon>💳</WalletIcon>
              {isLoading ? "Connecting..." : "Connect UTXOS Wallet"}
            </ConnectButton>

            <FeaturesList>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                No private key management
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                Instant Cardano transactions
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                Secure and reliable
              </FeatureItem>
              <FeatureItem>
                <FeatureIcon>✓</FeatureIcon>
                Works on all devices
              </FeatureItem>
            </FeaturesList>
          </UTXOSCard>
        </UTXOSSection>
      </LoginCard>
    </LoginContainer>
  )
}
