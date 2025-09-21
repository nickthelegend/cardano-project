"use client"

import { TokenWallet } from "@/components/token-wallet"

export default function WalletPage() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <TokenWallet />
      </div>
    </div>
  )
}