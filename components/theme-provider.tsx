"use client"

import type React from "react"

import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { theme } from "@/lib/theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
}
