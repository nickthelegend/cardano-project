"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { SquadBuilder } from "@/components/squad-builder"
import { LiveMatchTracker } from "@/components/live-match-tracker"
import { MatchHistory } from "@/components/match-history"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, TrendingUp, TrendingDown } from 'lucide-react'

export default function ArenaMatchPage() {
  const params = useParams()
  const matchId = params.id as string
  const [activeTab, setActiveTab] = useState("squad")
  const [matchStatus, setMatchStatus] = useState("building") // building, live, completed

  // Mock match data
  const [matchData, setMatchData] = useState({
    id: matchId,
    opponent: "xboost_io",
    playerName: "Ebns****v4Do",
    duration: "12h",
    timeLeft: "01:07:23",
    playerProfit: 2.389,
    opponentProfit: 1.543,
    isLeading: true,
    entryFee: "100 ALGO",
    prizePool: "200 ALGO"
  })

  const tabs = [
    { id: "squad", label: "Build Squad", icon: Users },
    { id: "live", label: "Live Match", icon: TrendingUp },
    { id: "history", label: "Match History", icon: Clock }
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
          {/* Match Header */}
          <div className="glass-card rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Arena Match #{matchId}
                </h1>
                <div className="flex items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Prize: {matchData.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>Duration: {matchData.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>vs {matchData.opponent}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {matchData.playerProfit.toFixed(3)}%
                  </div>
                  <div className="text-gray-400 text-sm">Your Profit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {matchData.opponentProfit.toFixed(3)}%
                  </div>
                  <div className="text-gray-400 text-sm">Opponent</div>
                </div>
                {matchStatus === "live" && (
                  <div className={`px-4 py-2 rounded-full text-sm font-bold ${
                    matchData.isLeading 
                      ? "bg-emerald-500/20 text-emerald-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {matchData.isLeading ? "Leading" : "Behind"}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mb-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-colors ${
                    activeTab === tab.id
                      ? "bg-emerald-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </Button>
              )
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === "squad" && (
                <SquadBuilder 
                  matchId={matchId}
                  onMatchStart={() => {
                    setMatchStatus("live")
                    setActiveTab("live")
                  }}
                />
              )}
              {activeTab === "live" && (
                <LiveMatchTracker 
                  matchData={matchData}
                  onMatchComplete={() => setMatchStatus("completed")}
                />
              )}
              {activeTab === "history" && <MatchHistory />}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  )
}
