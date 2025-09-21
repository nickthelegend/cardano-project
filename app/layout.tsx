"use client"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import StyledComponentsRegistry from "@/lib/registry"
import { MeshProviderWrapper } from "@/components/mesh-provider-wrapper"

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
              {children}
            </MeshProviderWrapper>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
