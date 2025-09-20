"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/login-form"
import { MainApp } from "@/components/main-app"

export default function HomePage() {
  const { user, login, isLoading } = useAuth()

  if (isLoading) {
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
        Loading...
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={login} />
  }

  return <MainApp />
}
