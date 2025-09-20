"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Clock, Coins, Play, Star } from 'lucide-react'
import Link from "next/link"

export default function FreeArenaPage() {
  const freeMatches = [
    {
      id: 1,
      title: "Beginner's Luck",
      players: "24/50",
      duration: "15m",
      entryFee: "Free",
      prizePool: "Practice Points",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Crypto Basics",
      players: "18/30",
      duration: "30m", 
      entryFee: "Free",
      prizePool: "Practice Points",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Strategy Test",
      players: "12/25",
      duration: "1h",
      entryFee: "Free",
      prizePool: "Practice Points", 
      difficulty: "Intermediate"
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
              className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Users className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">Free Arena</h1>
            <p className="text-xl text-gray-300 mb-8">
              Practice your skills and learn the game without risking ALGO
            </p>
            
            {/* Benefits */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass-card rounded-xl p-4">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">No Risk</h3>
                <p className="text-gray-400 text-sm">Play without spending ALGO</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <Trophy className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Learn & Practice</h3>
                <p className="text-gray-400 text-sm">Master strategies safely</p>
              </div>
              <div className="glass-card rounded-xl p-4">
                <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-bold">Build Reputation</h3>
                <p className="text-gray-400 text-sm">Earn practice points</p>
              </div>
            </div>
          </div>

          {/* Available Matches */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Available Free Matches</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {freeMatches.map((match, index) => (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card rounded-xl p-6 border border-emerald-500/30 bg-emerald-500/5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm">
                      FREE
                    </span>
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                      {match.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-4">{match.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Users className="w-4 h-4" />
                        <span>Players</span>
                      </div>
                      <span className="text-white">{match.players}</span>
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
                        <Trophy className="w-4 h-4" />
                        <span>Reward</span>
                      </div>
                      <span className="text-emerald-400">{match.prizePool}</span>
                    </div>
                  </div>

                  <Link href={`/arena/${match.id}`}>
                    <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white py-2">
                      <Play className="w-4 h-4 mr-2" />
                      Join Free Match
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Play for Real?
            </h2>
            <p className="text-gray-300 mb-6">
              Once you're comfortable, try premium matches with ALGO prizes
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/arena/premium">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 text-lg">
                  Try Premium Arena
                </Button>
              </Link>
              <Link href="/arena/quick-match">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                  Quick Match
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
