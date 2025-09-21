"use client"

import { MeshProvider } from "@meshsdk/react"
import { BlockfrostProvider } from "@meshsdk/core"
import type { ReactNode } from "react"
import { useEffect } from "react"
import { useWallet } from "@meshsdk/react"

// Initialize Blockfrost provider for Cardano mainnet/preprod
const blockfrostProvider = new BlockfrostProvider("preprodFzYIfO6BdUE1PvHWIiekgYE1ixMa9XF9")

interface MeshProviderWrapperProps {
  children: ReactNode
}

function WalletPersistenceHandler() {
  const { setPersist } = useWallet()

  useEffect(() => {
    // Enable wallet persistence by default
    setPersist(true)
  }, [setPersist])

  return null
}

export function MeshProviderWrapper({ children }: MeshProviderWrapperProps) {
  return (
    <MeshProvider
    >
      <WalletPersistenceHandler />
      {children}
    </MeshProvider>
  )
}

// Export the provider for use in other components
export { blockfrostProvider }