"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { TournamentCard } from "@/components/tournament-card"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, Coins, Crown, Zap } from 'lucide-react'
import Link from "next/link"

export default function ArenaPage() {
  const tournaments = [
    {
      id: 1,
      title: "Daily Championship",
      prizePool: "1,000 ALGO",
      entryFee: "10 ALGO",
      players: "156/200",
      timeLeft: "2h 45m",
      type: "free",
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Weekly Masters",
      prizePool: "5,000 ALGO",
      entryFee: "50 ALGO",
      players: "89/100",
      timeLeft: "1d 12h",
      type: "premium",
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Whale Tournament",
      prizePool: "25,000 ALGO",
      entryFee: "500 ALGO",
      players: "23/50",
      timeLeft: "3d 8h",
      type: "vip",
      difficulty: "Expert"
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
          {/* Arena Header */}
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
              Battle Arena
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete in tournaments and climb the leaderboards
            </p>
            
            {/* Live Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">1,247</div>
                <div className="text-gray-400">Players Online</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">₳ 45,230</div>
                <div className="text-gray-400">Total Prize Pool</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">23</div>
                <div className="text-gray-400">Active Tournaments</div>
              </div>
            </div>
          </div>

          {/* Tournament Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 text-center hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Free Arena</h3>
              <p className="text-gray-400 mb-4">Practice and compete for free</p>
              <Link href="/arena/free">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white w-full">
                  Enter Free Arena
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6 text-center hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Premium Arena</h3>
              <p className="text-gray-400 mb-4">Higher stakes, bigger rewards</p>
              <Link href="/arena/premium">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-black w-full">
                  Enter Premium Arena
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-6 text-center hover:bg-gray-800/60 transition-colors cursor-pointer"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">VIP Arena</h3>
              <p className="text-gray-400 mb-4">Exclusive high-roller tournaments</p>
              <Link href="/arena/vip">
                <Button className="bg-purple-500 hover:bg-purple-400 text-white w-full">
                  Enter VIP Arena
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Active Tournaments */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-6">Active Tournaments</h2>
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {tournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <TournamentCard tournament={tournament} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Compete?
            </h2>
            <p className="text-gray-300 mb-6">
              Join a tournament or create your own custom match
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/arena/quick-match">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 text-lg">
                  Quick Match
                </Button>
              </Link>
              <Link href="/tournament/create">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                  Create Tournament
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
