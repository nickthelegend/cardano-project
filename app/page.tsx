"use client"

import { CardanoWallet, useWallet } from "@meshsdk/react"
import { BlockfrostProvider } from "@meshsdk/core"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import "@meshsdk/react/styles.css";

// Initialize Blockfrost provider
const blockfrostProvider = new BlockfrostProvider("preprodFzYIfO6BdUE1PvHWIiekgYE1ixMa9XF9")

export default function RootPage() {
  const { connected, name , connect, wallet, setWallet, connecting} = useWallet()
  console.log(name)
  const router = useRouter()

  useEffect(() => {
    if (connected) {
      router.push("/home")
    }
  }, [connected, router])

  if (connecting) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#0E0E0E",
          color: "#FFFFFF",
        }}
      >
        Connecting wallet...
      </div>
    )
  }

  // Don't render anything if wallet is connected
  if (connected) {
    return null
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '1rem'
      }}
    >
      <div
        style={{
          background: '#1a1a1a',
          borderRadius: '1rem',
          padding: '2rem',
          width: '100%',
          maxWidth: '450px',
          textAlign: 'center',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          zIndex: 10000
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#63DB9A',
            marginBottom: '0.5rem'
          }}
        >
          ScrollVibe
        </h1>
        <p
          style={{
            color: '#FFFFFF',
            opacity: 0.9,
            fontSize: '0.9rem',
            marginBottom: '2rem'
          }}
        >
          Scroll to Earn • Share the Vibe
        </p>

        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 600,
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}
        >
          Welcome to ScrollVibe
        </h2>

        <p
          style={{
            color: '#FFFFFF',
            opacity: 0.8,
            fontSize: '1rem',
            lineHeight: 1.5,
            marginBottom: '2rem'
          }}
        >
          Connect your Cardano wallet to start earning tokens by scrolling through reels and engaging with content.
        </p>

        <div
          style={{
            background: 'linear-gradient(135deg, rgba(99, 219, 154, 0.1), rgba(255, 73, 210, 0.1))',
            border: '1px solid #63DB9A',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#63DB9A',
              marginBottom: '0.5rem'
            }}
          >
            🔗 Cardano Wallet
          </h3>

          <p
            style={{
              color: '#FFFFFF',
              opacity: 0.8,
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            Connect your Cardano wallet to access all features. Supports all major Cardano wallets.
          </p>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <CardanoWallet
              web3Services={{
                networkId: parseInt(process.env.NEXT_PUBLIC_NETWORK_ID || "0") as 0 | 1,
                fetcher: blockfrostProvider,
                submitter: blockfrostProvider,
                projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID,
              }}
              persist={true} // Enable session persistence
              />
          </div>

          {connecting && (
            <p
              style={{
                marginTop: '1rem',
                color: '#63DB9A',
                textAlign: 'center',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Connecting wallet...
            </p>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFFFFF',
              opacity: 0.8,
              fontSize: '0.9rem',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#63DB9A', fontWeight: 'bold' }}>✓</span>
            Multi-wallet support
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFFFFF',
              opacity: 0.8,
              fontSize: '0.9rem',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#63DB9A', fontWeight: 'bold' }}>✓</span>
            Instant Cardano transactions
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFFFFF',
              opacity: 0.8,
              fontSize: '0.9rem',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#63DB9A', fontWeight: 'bold' }}>✓</span>
            Secure and reliable
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#FFFFFF',
              opacity: 0.8,
              fontSize: '0.9rem',
              justifyContent: 'center'
            }}
          >
            <span style={{ color: '#63DB9A', fontWeight: 'bold' }}>✓</span>
            Works on all devices
          </div>
        </div>
      </div>
    </div>
  )
}
