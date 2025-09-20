"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Zap, Clock, Users, Coins, Search, Play } from 'lucide-react'
import Link from "next/link"

export default function QuickMatchPage() {
  const [selectedDuration, setSelectedDuration] = useState("5m")
  const [selectedEntry, setSelectedEntry] = useState("10")
  const [isSearching, setIsSearching] = useState(false)

  const durations = [
    { value: "1m", label: "1 Minute", description: "Lightning fast" },
    { value: "5m", label: "5 Minutes", description: "Quick action" },
    { value: "15m", label: "15 Minutes", description: "Standard match" },
    { value: "30m", label: "30 Minutes", description: "Extended play" },
    { value: "1h", label: "1 Hour", description: "Deep strategy" }
  ]

  const entryFees = [
    { value: "1", label: "1 ALGO", description: "Beginner friendly" },
    { value: "5", label: "5 ALGO", description: "Low stakes" },
    { value: "10", label: "10 ALGO", description: "Standard entry" },
    { value: "25", label: "25 ALGO", description: "Medium stakes" },
    { value: "50", label: "50 ALGO", description: "High stakes" },
    { value: "100", label: "100 ALGO", description: "Whale territory" }
  ]

  const handleQuickMatch = () => {
    setIsSearching(true)
    // Simulate matchmaking
    setTimeout(() => {
      // Redirect to a match
      window.location.href = `/arena/${Math.floor(Math.random() * 1000)}`
    }, 3000)
  }

  return (
    <div className="min-h-screen stadium-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Zap className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">Quick Match</h1>
            <p className="text-xl text-gray-300">
              Jump into instant 1v1 matches with automatic matchmaking
            </p>
          </div>

          {!isSearching ? (
            <>
              {/* Match Settings */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Duration Selection */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Match Duration
                  </h3>
                  <div className="space-y-3">
                    {durations.map((duration) => (
                      <button
                        key={duration.value}
                        onClick={() => setSelectedDuration(duration.value)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedDuration === duration.value
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-gray-600 bg-gray-800/30 hover:border-gray-500"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white font-semibold">{duration.label}</div>
                            <div className="text-gray-400 text-sm">{duration.description}</div>
                          </div>
                          {selectedDuration === duration.value && (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Entry Fee Selection */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Coins className="w-5 h-5 text-yellow-400" />
                    Entry Fee
                  </h3>
                  <div className="space-y-3">
                    {entryFees.map((fee) => (
                      <button
                        key={fee.value}
                        onClick={() => setSelectedEntry(fee.value)}
                        className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                          selectedEntry === fee.value
                            ? "border-emerald-500 bg-emerald-500/20"
                            : "border-gray-600 bg-gray-800/30 hover:border-gray-500"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-white font-semibold">{fee.label}</div>
                            <div className="text-gray-400 text-sm">{fee.description}</div>
                          </div>
                          {selectedEntry === fee.value && (
                            <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Match Preview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-xl p-8 mb-8"
              >
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Match Preview</h3>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-bold">Duration</div>
                    <div className="text-gray-400">{durations.find(d => d.value === selectedDuration)?.label}</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <Coins className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    <div className="text-white font-bold">Entry Fee</div>
                    <div className="text-gray-400">{selectedEntry} ALGO</div>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                    <div className="text-white font-bold">Prize Pool</div>
                    <div className="text-gray-400">{parseInt(selectedEntry) * 2} ALGO</div>
                  </div>
                </div>
              </motion.div>

              {/* Start Match Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <Button
                  onClick={handleQuickMatch}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-4 text-xl font-bold rounded-xl"
                >
                  <Play className="w-6 h-6 mr-3" />
                  Find Quick Match
                </Button>
                <p className="text-gray-400 text-sm mt-4">
                  Average wait time: 15-30 seconds
                </p>
              </motion.div>
            </>
          ) : (
            /* Searching State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Search className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-white mb-4">Finding Opponent...</h2>
              <p className="text-gray-300 mb-8">
                Searching for players with similar skill level and entry fee
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{durations.find(d => d.value === selectedDuration)?.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Entry Fee:</span>
                  <span className="text-white">{selectedEntry} ALGO</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Prize Pool:</span>
                  <span className="text-emerald-400">{parseInt(selectedEntry) * 2} ALGO</span>
                </div>
              </div>

              <motion.div
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 3, ease: "easeInOut" }}
                className="h-2 bg-emerald-500 rounded-full mb-6"
              />
              
              <Button
                onClick={() => setIsSearching(false)}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Cancel Search
              </Button>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
