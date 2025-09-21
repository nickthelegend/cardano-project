"use client"

import { useWallet } from "@meshsdk/react"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"
import { useEffect, useState } from "react"
import styled from "styled-components"

const TestContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background: #1a1a1a;
  border-radius: 1rem;
  border: 1px solid #333;
`

const TestSection = styled.div`
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #444;
  border-radius: 0.5rem;
`

const TestTitle = styled.h3`
  color: #63DB9A;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`

const TestResult = styled.div<{ success?: boolean }>`
  padding: 0.5rem;
  border-radius: 0.25rem;
  background: ${props => props.success ? '#1a4d2e' : '#4d1a1a'};
  color: ${props => props.success ? '#63DB9A' : '#ff6b6b'};
  font-family: monospace;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
`

const Button = styled.button`
  background: #63DB9A;
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  margin: 0.25rem;

  &:hover {
    background: #4ade80;
  }
`

const InfoText = styled.p`
  color: #ccc;
  font-size: 0.9rem;
  margin: 0.5rem 0;
`

export function WalletTest() {
  const { connected, name, address, disconnect } = useWallet()
  const { user, connectWallet, disconnectWallet } = useUTXOSAuth()
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (message: string, success = true) => {
    setTestResults(prev => [...prev, `${success ? '✅' : '❌'} ${message}`])
  }

  const runTests = async () => {
    setTestResults([])
    addTestResult("Starting wallet tests...")

    // Test 1: Check wallet connection
    if (connected) {
      addTestResult(`Wallet connected: ${name}`)
      addTestResult(`Wallet address: ${address?.slice(0, 20)}...`)
    } else {
      addTestResult("No wallet connected", false)
    }

    // Test 2: Check user data
    if (user) {
      addTestResult(`User data found: ${user.username}`)
      addTestResult(`Tokens: ${user.scrollTokens} SCROLL, ${user.vibeTokens} VIBE`)
      addTestResult(`ADA Balance: ${user.adaBalance}`)
    } else {
      addTestResult("No user data found", false)
    }

    addTestResult("Tests completed!")
  }

  const handleDisconnect = async () => {
    try {
      disconnectWallet()
      addTestResult("Wallet disconnected")
    } catch (error) {
      addTestResult(`Disconnect failed: ${error}`, false)
    }
  }

  return (
    <TestContainer>
      <h2 style={{ color: '#63DB9A', marginBottom: '2rem' }}>Wallet Migration Test Suite</h2>

      <TestSection>
        <TestTitle>Wallet Status</TestTitle>
        <InfoText><strong>Connected:</strong> {connected ? 'Yes' : 'No'}</InfoText>
        <InfoText><strong>Wallet Name:</strong> {name || 'None'}</InfoText>
        <InfoText><strong>Address:</strong> {address ? `${address.slice(0, 20)}...` : 'None'}</InfoText>
      </TestSection>

      <TestSection>
        <TestTitle>User Data</TestTitle>
        {user ? (
          <div>
            <InfoText><strong>Username:</strong> {user.username}</InfoText>
            <InfoText><strong>Scroll Tokens:</strong> {user.scrollTokens}</InfoText>
            <InfoText><strong>Vibe Tokens:</strong> {user.vibeTokens}</InfoText>
            <InfoText><strong>Daily Scrolls:</strong> {user.dailyScrollCount}</InfoText>
            <InfoText><strong>ADA Balance:</strong> {user.adaBalance}</InfoText>
          </div>
        ) : (
          <InfoText>No user data available</InfoText>
        )}
      </TestSection>

      <TestSection>
        <TestTitle>Test Controls</TestTitle>
        <div>
          <Button onClick={runTests}>Run All Tests</Button>
          {!connected && <Button onClick={connectWallet}>Connect Wallet</Button>}
          {connected && <Button onClick={handleDisconnect}>Disconnect Wallet</Button>}
        </div>
      </TestSection>

      <TestSection>
        <TestTitle>Test Results</TestTitle>
        {testResults.length > 0 ? (
          testResults.map((result, index) => (
            <TestResult key={index} success={result.startsWith('✅')}>
              {result}
            </TestResult>
          ))
        ) : (
          <InfoText>No tests run yet. Click "Run All Tests" to start.</InfoText>
        )}
      </TestSection>

      <TestSection>
        <TestTitle>Instructions</TestTitle>
        <InfoText>1. Connect your wallet using the wallet connection component</InfoText>
        <InfoText>2. Run tests to verify migration and data persistence</InfoText>
        <InfoText>3. Check that your UTXOS wallet data is loaded</InfoText>
        <InfoText>4. Verify that wallet connection persists across sessions</InfoText>
      </TestSection>
    </TestContainer>
  )
}
