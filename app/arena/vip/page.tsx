"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Zap, Trophy, Clock, Coins, Play, Crown, Diamond, Star } from 'lucide-react'
import Link from "next/link"

export default function VIPArenaPage() {
  const vipMatches = [
    {
      id: 201,
      title: "Whale Wars",
      players: "8/20",
      duration: "6h",
      entryFee: "500 ALGO",
      prizePool: "10,000 ALGO",
      difficulty: "Expert",
      multiplier: "5x",
      exclusive: true
    },
    {
      id: 202,
      title: "Diamond League",
      players: "12/30",
      duration: "12h",
      entryFee: "1,000 ALGO", 
      prizePool: "30,000 ALGO",
      difficulty: "Master",
      multiplier: "10x",
      exclusive: true
    },
    {
      id: 203,
      title: "Legends Only",
      players: "5/10",
      duration: "24h",
      entryFee: "2,500 ALGO",
      prizePool: "25,000 ALGO",
      difficulty: "Legendary",
      multiplier: "15x",
      exclusive: true
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
              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">VIP Arena</h1>
            <p className="text-xl text-gray-300 mb-8">
              Exclusive high-roller tournaments for elite players only
            </p>
            
            {/* VIP Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card rounded-xl p-4 bg-purple-500/10 border border-purple-500/20">
                <Diamond className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Massive Prizes</h3>
                <p className="text-gray-400 text-sm">Up to 50,000 ALGO rewards</p>
              </div>
              <div className="glass-card rounded-xl p-4 bg-purple-500/10 border border-purple-500/20">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Elite Competition</h3>
                <p className="text-gray-400 text-sm">Top 1% players only</p>
              </div>
              <div className="glass-card rounded-xl p-4 bg-purple-500/10 border border-purple-500/20">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">VIP Perks</h3>
                <p className="text-gray-400 text-sm">Exclusive features & support</p>
              </div>
            </div>
          </div>

          {/* VIP Status Check */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card rounded-xl p-8 mb-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30"
          >
            <div className="text-center">
              <Crown className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">VIP Status Required</h2>
              <p className="text-gray-300 mb-6">
                Access to VIP Arena requires meeting our elite player criteria
              </p>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-left">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">Requirements</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      Minimum 1,000 ALGO in wallet
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      50+ premium matches completed
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      Top 10% win rate (70%+)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-red-400">✗</span>
                      Enhanced KYC verification
                    </li>
                  </ul>
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">VIP Benefits</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">★</span>
                      15x prize multipliers
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">★</span>
                      Personal account manager
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">★</span>
                      Exclusive VIP tournaments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-400">★</span>
                      Advanced trading tools
                    </li>
                  </ul>
                </div>
              </div>
              <Button className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-3 text-lg">
                Apply for VIP Status
              </Button>
            </div>
          </motion.div>

          {/* VIP Matches (Preview) */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Exclusive VIP Matches</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {vipMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-purple-500/30 bg-purple-500/5 relative overflow-hidden"
                >
                  {/* VIP Badge */}
                  <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-pink-500 text-white px-3 py-1 text-xs font-bold">
                    VIP ONLY
                  </div>

                  <div className="flex items-center justify-between mb-4 mt-4">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                        EXCLUSIVE
                      </span>
                      <span className="px-2 py-1 bg-pink-500/20 text-pink-400 rounded text-xs">
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
                      <span className="text-purple-400 font-bold">{match.prizePool}</span>
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

                  <Button 
                    disabled 
                    className="w-full bg-gray-600 text-gray-400 py-2 cursor-not-allowed"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    VIP Status Required
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Path to VIP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Path to VIP Status
            </h2>
            <p className="text-gray-300 mb-6">
              Build your skills and reputation to unlock VIP Arena access
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/arena/premium">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 text-lg">
                  Play Premium Arena
                </Button>
              </Link>
              <Link href="/tournament">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                  Join Tournaments
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
