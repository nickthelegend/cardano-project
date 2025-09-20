"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { AuthModal } from "@/components/auth-modal"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, Coins, Clock } from 'lucide-react'
import { useState } from "react"

export default function TournamentPage() {
  const [showAuthModal, setShowAuthModal] = useState(false)

  const upcomingTournaments = [
    {
      id: 1,
      title: "Algorand Masters Cup",
      date: "Dec 15, 2024",
      time: "18:00 UTC",
      prizePool: "10,000 ALGO",
      entryFee: "100 ALGO",
      maxPlayers: 500,
      currentPlayers: 347,
      status: "Open"
    },
    {
      id: 2,
      title: "Weekly Championship",
      date: "Dec 22, 2024",
      time: "20:00 UTC",
      prizePool: "5,000 ALGO",
      entryFee: "50 ALGO",
      maxPlayers: 200,
      currentPlayers: 156,
      status: "Open"
    },
    {
      id: 3,
      title: "New Year Special",
      date: "Jan 1, 2025",
      time: "00:00 UTC",
      prizePool: "25,000 ALGO",
      entryFee: "250 ALGO",
      maxPlayers: 1000,
      currentPlayers: 89,
      status: "Early Bird"
    }
  ]

  return (
    <div className="min-h-screen stadium-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Tournament Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Tournaments
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete in scheduled tournaments for massive prize pools
            </p>
          </div>

          {/* Auth CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8 text-center mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Join the Competition
            </h2>
            <p className="text-gray-300 mb-6">
              Sign up now to participate in tournaments and win big prizes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 text-lg"
              >
                Sign Up with Gmail
              </Button>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 text-lg"
              >
                Sign Up with X
              </Button>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 text-lg"
              >
                Continue with Wallet
              </Button>
            </div>
          </motion.div>

          {/* Upcoming Tournaments */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-8">Upcoming Tournaments</h2>
            <div className="space-y-6">
              {upcomingTournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 hover:bg-gray-800/60 transition-colors"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white">{tournament.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          tournament.status === 'Open' 
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {tournament.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-gray-400 text-sm">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {tournament.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {tournament.time}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {tournament.currentPlayers}/{tournament.maxPlayers} players
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">{tournament.prizePool}</div>
                        <div className="text-gray-400 text-sm">Prize Pool</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{tournament.entryFee}</div>
                        <div className="text-gray-400 text-sm">Entry Fee</div>
                      </div>
                      <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-6 py-2">
                        Register
                      </Button>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-400 mb-1">
                      <span>Registration Progress</span>
                      <span>{Math.round((tournament.currentPlayers / tournament.maxPlayers) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(tournament.currentPlayers / tournament.maxPlayers) * 100}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Tournament Rules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Tournament Rules</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3">How to Play</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Build your portfolio with up to 10 tokens</li>
                  <li>• Set allocation ratios for each token</li>
                  <li>• Choose Long or Short strategy</li>
                  <li>• Compete for the highest returns</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-yellow-400 mb-3">Prize Distribution</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 1st Place: 40% of prize pool</li>
                  <li>• 2nd Place: 25% of prize pool</li>
                  <li>• 3rd Place: 15% of prize pool</li>
                  <li>• Top 10: Share remaining 20%</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  )
}
