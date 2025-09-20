"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, TrendingUp, TrendingDown, Trophy, Users, Target, Coins } from 'lucide-react'
import Link from "next/link"

export default function LearnPage() {
  const steps = [
    {
      icon: Users,
      title: "Build Your Squad",
      description: "Select up to 6 cryptocurrency tokens for your portfolio",
      details: [
        "Choose from top cryptocurrencies like ALGO, BTC, ETH, SOL",
        "Set allocation percentages for each token (must total 100%)",
        "Consider market trends and token performance",
        "Diversify your portfolio to manage risk"
      ]
    },
    {
      icon: Target,
      title: "Choose Your Strategy",
      description: "Decide whether to go Long or Short based on market prediction",
      details: [
        "📈 Long: Profit when your portfolio value increases",
        "📉 Short: Profit when your portfolio value decreases",
        "Consider market conditions and volatility",
        "Match duration affects strategy effectiveness"
      ]
    },
    {
      icon: Trophy,
      title: "Find Opponents",
      description: "Set match parameters and compete against other players",
      details: [
        "Choose match duration (1m, 5m, 1h, 12h, 1d)",
        "Set entry fee in ALGO tokens",
        "Winner takes the prize pool",
        "Real-time performance tracking"
      ]
    },
    {
      icon: Coins,
      title: "Win Prizes",
      description: "Earn ALGO based on your portfolio's performance",
      details: [
        "Better performance = bigger winnings",
        "Automatic payouts via smart contracts",
        "Climb leaderboards for bonus rewards",
        "Participate in tournaments for massive prizes"
      ]
    }
  ]

  const strategies = [
    {
      type: "Long Strategy",
      icon: TrendingUp,
      color: "emerald",
      description: "Profit when your portfolio gains value",
      tips: [
        "Best during bull markets or positive news",
        "Focus on fundamentally strong tokens",
        "Consider upcoming events and partnerships",
        "Monitor market sentiment and trends"
      ]
    },
    {
      type: "Short Strategy", 
      icon: TrendingDown,
      color: "red",
      description: "Profit when your portfolio loses value",
      tips: [
        "Effective during market downturns",
        "Look for overvalued or risky tokens",
        "Consider regulatory concerns or bad news",
        "Useful for hedging against market volatility"
      ]
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
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Learn to Play AFL.so
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master the ultimate crypto fantasy league. Build portfolios, compete with players, and win ALGO prizes.
            </p>
            <Link href="/arena">
              <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 text-lg">
                <Play className="w-5 h-5 mr-2" />
                Start Playing Now
              </Button>
            </Link>
          </div>

          {/* How It Works Steps */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="glass-card rounded-xl p-6 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.description}</p>
                    <div className="space-y-2">
                      {step.details.map((detail, i) => (
                        <div key={i} className="text-sm text-gray-300 text-left">
                          • {detail}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Strategy Guide */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Strategy Guide
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {strategies.map((strategy, index) => {
                const Icon = strategy.icon
                return (
                  <motion.div
                    key={strategy.type}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    className={`glass-card rounded-xl p-8 border-2 ${
                      strategy.color === 'emerald' 
                        ? 'border-emerald-500/30 bg-emerald-500/5' 
                        : 'border-red-500/30 bg-red-500/5'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 ${
                        strategy.color === 'emerald' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                      } rounded-full flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${
                          strategy.color === 'emerald' ? 'text-emerald-400' : 'text-red-400'
                        }`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{strategy.type}</h3>
                        <p className="text-gray-400">{strategy.description}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className={`font-semibold ${
                        strategy.color === 'emerald' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        Pro Tips:
                      </h4>
                      {strategy.tips.map((tip, i) => (
                        <div key={i} className="text-gray-300 flex items-start gap-2">
                          <span className={`${
                            strategy.color === 'emerald' ? 'text-emerald-400' : 'text-red-400'
                          } mt-1`}>•</span>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Game Modes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="glass-card rounded-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Game Modes
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-emerald-500/10 rounded-lg">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Quick Match</h3>
                <p className="text-gray-400 mb-4">Fast-paced 1v1 matches with instant matchmaking</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• 1-60 minute durations</li>
                  <li>• Low entry fees</li>
                  <li>• Perfect for beginners</li>
                </ul>
              </div>
              
              <div className="text-center p-6 bg-yellow-500/10 rounded-lg">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-white mb-2">Tournaments</h3>
                <p className="text-gray-400 mb-4">Scheduled competitions with massive prize pools</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Multiple rounds</li>
                  <li>• Big ALGO prizes</li>
                  <li>• Leaderboard rankings</li>
                </ul>
              </div>
              
              <div className="text-center p-6 bg-purple-500/10 rounded-lg">
                <div className="text-4xl mb-4">👑</div>
                <h3 className="text-xl font-bold text-white mb-2">Custom Match</h3>
                <p className="text-gray-400 mb-4">Create private matches with friends</p>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Custom rules</li>
                  <li>• Private lobbies</li>
                  <li>• Flexible settings</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Tips for Success */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="glass-card rounded-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Tips for Success
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Portfolio Management</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Diversify across different token categories (DeFi, Layer 1, etc.)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Don't put all allocation in one token - spread the risk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Consider correlation between tokens in your portfolio</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-1">•</span>
                    <span>Monitor market cap and trading volume</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-yellow-400 mb-4">Market Analysis</h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Follow crypto news and market sentiment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Watch for major announcements and partnerships</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Understand technical analysis basics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">•</span>
                    <span>Consider macro economic factors</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Ready to Play CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="glass-card rounded-xl p-8 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Playing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of players competing in the ultimate crypto fantasy league
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/arena">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 text-lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Enter Arena
                </Button>
              </Link>
              <Link href="/tournament">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                  View Tournaments
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
