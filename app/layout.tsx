import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import StyledComponentsRegistry from "@/lib/registry"
import { UTXOSAuthProvider } from "@/hooks/use-utxos-auth"
import { AppShell } from "@/components/app-shell"
import { DonationModalProvider } from "@/hooks/use-donation-modal"
import { DonationModal } from "@/components/donation-modal"
import { WalletProvider } from "@/hooks/use-wallet"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ScrollVibe - Scroll to Earn",
  description: "Earn tokens by scrolling reels. The future of social media.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider>
            <UTXOSAuthProvider>
              <WalletProvider>
                <DonationModalProvider>
                  <AppShell>{children}</AppShell>
                  <DonationModal />
                  <Toaster />
                </DonationModalProvider>
              </WalletProvider>
            </UTXOSAuthProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
