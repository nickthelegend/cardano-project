"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AuthModal } from "./auth-modal"
import { supabase } from "@/lib/supabase"
import { User } from "@supabase/supabase-js"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, UserIcon, Settings } from 'lucide-react'
import { toast } from "sonner"

export function Header() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
        
        if (event === 'SIGNED_IN') {
          setIsAuthModalOpen(false)
          toast.success('Successfully signed in!')
        } else if (event === 'SIGNED_OUT') {
          toast.success('Successfully signed out!')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        toast.error('Failed to sign out')
        console.error('Sign out error:', error)
      }
    } catch (error) {
      toast.error('An unexpected error occurred')
      console.error('Sign out error:', error)
    }
  }

  const getUserInitials = (user: User) => {
    if (user.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(' ')
        .map((name: string) => name[0])
        .join('')
        .toUpperCase()
    }
    return user.email?.charAt(0).toUpperCase() || 'U'
  }

  const getUserDisplayName = (user: User) => {
    return user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'
  }

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            <span className="text-xl font-bold">Algorandi</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/arena" className="text-sm font-medium hover:text-primary transition-colors">
              Arena
            </Link>
            <Link href="/tournament" className="text-sm font-medium hover:text-primary transition-colors">
              Tournaments
            </Link>
            <Link href="/profile" className="text-sm font-medium hover:text-primary transition-colors">
              Profile
            </Link>
            <Link href="/learn" className="text-sm font-medium hover:text-primary transition-colors">
              Learn
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={user.user_metadata?.avatar_url || "/placeholder.svg"} 
                        alt={getUserDisplayName(user)} 
                      />
                      <AvatarFallback>
                        {getUserInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{getUserDisplayName(user)}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </>
  )
}
