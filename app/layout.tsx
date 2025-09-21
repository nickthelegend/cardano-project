"use client"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import StyledComponentsRegistry from "@/lib/registry"
import { MeshProviderWrapper } from "@/components/mesh-provider-wrapper"
import { UTXOSAuthProvider } from "@/hooks/use-utxos-auth"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "ScrollVibe - Scroll to Earn",
//   description: "Earn tokens by scrolling reels. The future of social media.",
//     generator: 'v0.app'
// }

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
            <MeshProviderWrapper>
              <UTXOSAuthProvider>
                {children}
              </UTXOSAuthProvider>
            </MeshProviderWrapper>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
