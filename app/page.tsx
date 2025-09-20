"use client"

import { useAuth } from "@/hooks/use-auth"
import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootPage() {
  const { user, login, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/home")
    }
  }, [user, router])

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

  return null
}
