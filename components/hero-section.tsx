"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Trophy, Users, TrendingUp } from 'lucide-react'
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Algorand
            </span>
            <br />
            Fantasy League
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Join The League. Draft Your Squad. Double Your ALGO
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link href="/arena">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 text-lg">
                <Trophy className="w-5 h-5 mr-2" />
                Play Game
              </Button>
            </Link>
            <Link href="/learn">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                Learn How to Play
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* How It Works Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="glass-card rounded-xl p-6">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">1. Build Your Squad</h3>
            <p className="text-gray-400">Pick up to 10 tokens and set their ratio on your portfolio</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">2. Find Opponents</h3>
            <p className="text-gray-400">Set bet amount, match duration and choose Long or Short strategy</p>
          </div>

          <div className="glass-card rounded-xl p-6">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">3. Win Prizes</h3>
            <p className="text-gray-400">Compete for highest gains or largest losses to win ALGO</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
