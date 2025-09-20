"use client"

import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { ReferralHero } from "@/components/referral-hero"
import { Button } from "@/components/ui/button"
import { Users, Trophy, Coins, Gift } from 'lucide-react'

export default function ReferralPage() {
  const params = useParams()
  const slug = params.slug as string

  return (
    <div className="min-h-screen stadium-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Referral Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Gift className="w-12 h-12 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">
              You've Been Invited!
            </h1>
            <p className="text-gray-300 text-lg">
              Join the Algorand Fantasy League and get bonus rewards
            </p>
            <div className="mt-4 px-4 py-2 bg-emerald-500/20 rounded-lg inline-block">
              <span className="text-emerald-400 font-mono">Referral Code: {slug}</span>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bonus ALGO</h3>
              <p className="text-gray-400">Get 10 ALGO bonus when you make your first deposit</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-yellow-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">VIP Access</h3>
              <p className="text-gray-400">Exclusive tournaments and premium features</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Referral Rewards</h3>
              <p className="text-gray-400">Earn 5% of your friends' winnings forever</p>
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Start Playing?
            </h2>
            <p className="text-gray-300 mb-6">
              Join thousands of players in the ultimate crypto fantasy league
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 text-lg">
                Play Game Now
              </Button>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 text-lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
