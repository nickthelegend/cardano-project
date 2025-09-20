"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Crown, Trophy, Clock, Coins, Play, Zap, Target } from 'lucide-react'
import Link from "next/link"

export default function PremiumArenaPage() {
  const premiumMatches = [
    {
      id: 101,
      title: "Golden Opportunity",
      players: "45/100",
      duration: "1h",
      entryFee: "25 ALGO",
      prizePool: "2,500 ALGO",
      difficulty: "Intermediate",
      multiplier: "2x"
    },
    {
      id: 102,
      title: "Crypto Masters",
      players: "32/75",
      duration: "2h",
      entryFee: "50 ALGO", 
      prizePool: "3,750 ALGO",
      difficulty: "Advanced",
      multiplier: "1.5x"
    },
    {
      id: 103,
      title: "Diamond Hands",
      players: "18/50",
      duration: "4h",
      entryFee: "100 ALGO",
      prizePool: "5,000 ALGO",
      difficulty: "Expert",
      multiplier: "3x"
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
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Crown className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">Premium Arena</h1>
            <p className="text-xl text-gray-300 mb-8">
              Higher stakes, bigger rewards, and competitive gameplay
            </p>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card rounded-xl p-4 bg-yellow-500/10 border border-yellow-500/20">
                <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Real ALGO Prizes</h3>
                <p className="text-gray-400 text-sm">Win substantial ALGO rewards</p>
              </div>
              <div className="glass-card rounded-xl p-4 bg-yellow-500/10 border border-yellow-500/20">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Skill-Based Matching</h3>
                <p className="text-gray-400 text-sm">Compete with similar skill levels</p>
              </div>
              <div className="glass-card rounded-xl p-4 bg-yellow-500/10 border border-yellow-500/20">
                <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Advanced Features</h3>
                <p className="text-gray-400 text-sm">Enhanced analytics & tools</p>
              </div>
            </div>
          </div>

          {/* Available Matches */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Premium Matches</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {premiumMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-yellow-500/30 bg-yellow-500/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm">
                        PREMIUM
                      </span>
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs">
                        {match.multiplier}
                      </span>
                    </div>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                      {match.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{match.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Trophy className="w-4 h-4" />
                        <span>Prize Pool</span>
                      </div>
                      <span className="text-yellow-400 font-bold">{match.prizePool}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Coins className="w-4 h-4" />
                        <span>Entry Fee</span>
                      </div>
                      <span className="text-white">{match.entryFee}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Duration</span>
                      </div>
                      <span className="text-white">{match.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Crown className="w-4 h-4" />
                        <span>Players</span>
                      </div>
                      <span className="text-white">{match.players}</span>
                    </div>
                  </div>

                  <Link href={`/arena/${match.id}`}>
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-2 font-bold">
                      <Play className="w-4 h-4 mr-2" />
                      Join Premium Match
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Premium Arena Requirements</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Minimum Requirements</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Completed at least 5 free matches
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Minimum 10 ALGO in wallet
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Verified Algorand wallet connection
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-400">✓</span>
                    Basic KYC verification
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-bold text-yellow-400 mb-4">Premium Benefits</h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    Higher prize multipliers
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    Advanced portfolio analytics
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    Priority customer support
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-400">★</span>
                    Exclusive tournament access
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready for the Ultimate Challenge?
            </h2>
            <p className="text-gray-300 mb-6">
              Take your skills to the next level with VIP Arena
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/arena/vip">
                <Button className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 text-lg">
                  Enter VIP Arena
                </Button>
              </Link>
              <Link href="/arena/free">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                  Practice in Free Arena
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
