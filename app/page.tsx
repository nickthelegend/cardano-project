"use client"

import { useUTXOSAuth } from "@/hooks/use-utxos-auth"
import { UTXOSLoginForm } from "@/components/utxos-login-form"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function RootPage() {
  const { user, isLoading } = useUTXOSAuth()
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
    return <UTXOSLoginForm />
  }

  return null
}
