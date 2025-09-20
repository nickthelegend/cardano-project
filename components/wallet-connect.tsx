"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Wallet, Shield, Check, Rocket } from "lucide-react"
import { JSX, SVGProps, useState, useEffect } from "react"
import { useUTXOSAuth } from "@/hooks/use-utxos-auth"

const Logo = (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    height="48"
    viewBox="0 0 40 48"
    width="40"
    {...props}
  >
    <clipPath id="a">
      <path d="m0 0h40v48h-40z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="m25.0887 5.05386-3.933-1.05386-3.3145 12.3696-2.9923-11.16736-3.9331 1.05386 3.233 12.0655-8.05262-8.0526-2.87919 2.8792 8.83271 8.8328-10.99975-2.9474-1.05385625 3.933 12.01860625 3.2204c-.1376-.5935-.2104-1.2119-.2104-1.8473 0-4.4976 3.646-8.1436 8.1437-8.1436 4.4976 0 8.1436 3.646 8.1436 8.1436 0 .6313-.0719 1.2459-.2078 1.8359l10.9227 2.9267 1.0538-3.933-12.0664-3.2332 11.0005-2.9476-1.0539-3.933-12.0659 3.233 8.0526-8.0526-2.8792-2.87916-8.7102 8.71026z" />
      <path d="m27.8723 26.2214c-.3372 1.4256-1.0491 2.7063-2.0259 3.7324l7.913 7.9131 2.8792-2.8792z" />
      <path d="m25.7665 30.0366c-.9886 1.0097-2.2379 1.7632-3.6389 2.1515l2.8794 10.746 3.933-1.0539z" />
      <path d="m21.9807 32.2274c-.65.1671-1.3313.2559-2.0334.2559-.7522 0-1.4806-.102-2.1721-.2929l-2.882 10.7558 3.933 1.0538z" />
      <path d="m17.6361 32.1507c-1.3796-.4076-2.6067-1.1707-3.5751-2.1833l-7.9325 7.9325 2.87919 2.8792z" />
      <path d="m13.9956 29.8973c-.9518-1.019-1.6451-2.2826-1.9751-3.6862l-10.95836 2.9363 1.05385 3.933z" />
    </g>
  </svg>
)

export default function WalletConnect() {
  const { connectWallet, isLoading, error } = useUTXOSAuth()
  const [mounted, setMounted] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnectWallet = async () => {
    if (!acceptTerms) return
    await connectWallet()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="bg-gray-900/90 border-gray-700 shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">ScrollVibe</h1>
              <p className="text-gray-400">
                Connect your Cardano wallet to start earning tokens
              </p>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center space-x-3 mb-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <h3 className="font-semibold text-white">UTXOS Wallet</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Secure, hosted wallet solution for Cardano
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>No private key management</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Instant Cardano transactions</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Works on all devices</span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">
                {error}
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="border-gray-600 data-[state=checked]:bg-blue-600"
              />
              <label htmlFor="terms" className="text-sm text-gray-300 cursor-pointer">
                I agree to connect my wallet and start earning
              </label>
            </div>

            <Button 
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleConnectWallet}
              disabled={isLoading || !acceptTerms}
            >
              {mounted && isLoading ? (
                <>
                  <Rocket className="mr-2 h-5 w-5 animate-pulse" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect UTXOS Wallet
                </>
              )}
            </Button>
          </CardContent>
          
          <CardFooter className="text-center border-t border-gray-700 pt-6">
            <p className="text-sm text-gray-400">
              New to ScrollVibe? Start earning by scrolling! 🚀
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}