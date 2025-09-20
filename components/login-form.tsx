"use client"

import type React from "react"

import { useState } from "react"
import styled from "styled-components"

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md};
`

const LoginCard = styled.div`
  background: #1a1a1a;
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

const LogoText = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

const LogoSubtext = styled.p`
  color: #FFFFFF;
  opacity: 0.9;
  font-size: 0.9rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`

const Label = styled.label`
  color: #FFFFFF;
  font-size: 0.9rem;
  font-weight: 500;
`

const Input = styled.input`
  background: #2a2a2a;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  color: #FFFFFF;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(99, 219, 154, 0.2);
    background: #333333;
  }

  &::placeholder {
    color: #FFFFFF;
    opacity: 0.6;
  }
`

const LoginButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: ${({ theme }) => theme.spacing.md};
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`

const ToggleText = styled.p`
  text-align: center;
  color: #FFFFFF;
  opacity: 0.9;
  font-size: 0.9rem;
  margin-top: ${({ theme }) => theme.spacing.lg};
`

const ToggleLink = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`

const SocialLoginSection = styled.div`
  margin: ${({ theme }) => theme.spacing.lg} 0;
  position: relative;
`

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
  }
  
  span {
    padding: 0 ${({ theme }) => theme.spacing.md};
    color: #FFFFFF;
    opacity: 0.6;
    font-size: 0.9rem;
  }
`

const SocialButtonsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

const SocialButton = styled.button<{ provider: "google" | "github" | "twitter" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: #2a2a2a;
  color: #FFFFFF;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  
  &:hover {
    background: #333333;
    border-color: ${({ provider }) => (provider === "google" ? "#4285f4" : provider === "github" ? "#333" : "#1da1f2")};
    transform: translateY(-1px);
  }
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`)
    // Simulate social login
    onLogin(`user@${provider}.com`, "social-login")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return
    if (!isLogin && password !== confirmPassword) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      onLogin(email, password)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginCard>
        <Logo>
          <LogoText>ScrollVibe</LogoText>
          <LogoSubtext>Scroll to Earn • Share the Vibe</LogoSubtext>
        </Logo>

        <SocialLoginSection>
          <SocialButtonsGrid>
            <SocialButton provider="google" onClick={() => handleSocialLogin("google")} type="button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </SocialButton>

            <SocialButton provider="github" onClick={() => handleSocialLogin("github")} type="button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </SocialButton>

            <SocialButton provider="twitter" onClick={() => handleSocialLogin("twitter")} type="button">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X
            </SocialButton>
          </SocialButtonsGrid>

          <Divider>
            <span>or continue with email</span>
          </Divider>
        </SocialLoginSection>

        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>

          {!isLogin && (
            <InputGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </InputGroup>
          )}

          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : isLogin ? "Sign In" : "Sign Up"}
          </LoginButton>
        </Form>

        <ToggleText>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <ToggleLink onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Sign Up" : "Sign In"}</ToggleLink>
        </ToggleText>
      </LoginCard>
    </LoginContainer>
  )
}
