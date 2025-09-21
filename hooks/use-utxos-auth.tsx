"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { EnableWeb3WalletOptions, Web3Wallet } from "@meshsdk/web3-sdk"
import { BlockfrostProvider } from "@meshsdk/core";

interface User {
  id: string
  walletAddress: string
  username: string
  scrollTokens: number
  vibeTokens: number
  dailyScrollCount: number
  lastScrollReset: string
  adaBalance: number
  isConnected: boolean
}

interface AuthContextType {
  user: User | null
  wallet: Web3Wallet | null
  connectWallet: () => Promise<void>
  disconnectWallet: () => void
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function UTXOSAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [wallet, setWallet] = useState<Web3Wallet | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check for existing session and restore wallet
    const savedUser = localStorage.getItem("scrollvibe_utxos_user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      
      // Restore wallet connection
      const restoreWallet = async () => {
        try {
          const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY_PREPROD!);
          const options: EnableWeb3WalletOptions = {
            networkId: 0,
            fetcher: provider,
            submitter: provider,
            projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID,
          }
          const walletInstance = await Web3Wallet.enable(options)
          setWallet(walletInstance)
          console.log("Wallet restored successfully")
        } catch (error) {
          console.error("Failed to restore wallet:", error)
        }
      }
      
      restoreWallet()
    }
  }, [])

  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Initialize the blockchain data provider with secure api endpoint
      const provider = new BlockfrostProvider(process.env.BLOCKFROST_API_KEY_PREPROD!);

      // Configure UTXOS wallet options
      const options: EnableWeb3WalletOptions = {
        networkId: 0, // 0: preprod, 1: mainnet
        fetcher: provider,
        submitter: provider,
        projectId: process.env.NEXT_PUBLIC_UTXOS_PROJECT_ID,
      }

      // Enable the wallet
      const walletInstance = await Web3Wallet.enable(options)
      setWallet(walletInstance)

      // Get wallet address
      const address = await walletInstance.getChangeAddress()
      
      // Get ADA balance
      let adaBalance = 0
      if (walletInstance.cardano) {
        const utxos = await walletInstance.cardano.getUtxos()
        adaBalance = utxos.reduce((total, utxo) => {
          const lovelace = utxo.output.amount.find(asset => asset.unit === "lovelace")
          return total + (lovelace ? parseInt(lovelace.quantity) : 0)
        }, 0) / 1000000 // Convert lovelace to ADA
      }

      // Create user object
      const newUser: User = {
        id: address,
        walletAddress: address,
        username: `User_${address.slice(0, 8)}`,
        scrollTokens: 0,
        vibeTokens: 100,
        dailyScrollCount: 0,
        lastScrollReset: new Date().toISOString(),
        adaBalance,
        isConnected: true,
      }

      setUser(newUser)
      localStorage.setItem("scrollvibe_utxos_user", JSON.stringify(newUser))

      console.log("UTXOS wallet connected successfully:", address)
    } catch (err) {
      console.error("Failed to connect UTXOS wallet:", err)
      setError(err instanceof Error ? err.message : "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }

  const disconnectWallet = () => {
    setUser(null)
    setWallet(null)
    setError(null)
    localStorage.removeItem("scrollvibe_utxos_user")
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        wallet, 
        connectWallet, 
        disconnectWallet, 
        isLoading, 
        error 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useUTXOSAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useUTXOSAuth must be used within an UTXOSAuthProvider")
  }
  return context
}
