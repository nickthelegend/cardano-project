"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Trophy, Users, Clock, Coins, Calendar, Target, AlertTriangle, CheckCircle } from 'lucide-react'

export default function JoinTournamentPage() {
  const params = useParams()
  const tournamentId = params.id as string
  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  // Mock tournament data based on ID
  const getTournamentData = (id: string) => {
    const tournaments: { [key: string]: any } = {
      "1": {
        title: "Daily Championship",
        description: "Fast-paced daily tournament perfect for beginners and intermediate players.",
        prizePool: "1,000 ALGO",
        entryFee: "10 ALGO",
        maxPlayers: 200,
        currentPlayers: 156,
        startTime: "2024-12-15T18:00:00Z",
        duration: "2h 45m",
        type: "free",
        difficulty: "Beginner",
        prizeDistribution: {
          "1st": "400 ALGO (40%)",
          "2nd": "250 ALGO (25%)", 
          "3rd": "150 ALGO (15%)",
          "Top 10": "200 ALGO (20%)"
        }
      },
      "2": {
        title: "Weekly Masters",
        description: "Advanced tournament for experienced players with substantial prizes.",
        prizePool: "5,000 ALGO",
        entryFee: "50 ALGO",
        maxPlayers: 100,
        currentPlayers: 89,
        startTime: "2024-12-16T20:00:00Z",
        duration: "1d 12h",
        type: "premium",
        difficulty: "Advanced",
        prizeDistribution: {
          "1st": "2,000 ALGO (40%)",
          "2nd": "1,250 ALGO (25%)",
          "3rd": "750 ALGO (15%)",
          "Top 10": "1,000 ALGO (20%)"
        }
      },
      "3": {
        title: "Whale Tournament",
        description: "Exclusive high-stakes tournament for elite players only.",
        prizePool: "25,000 ALGO",
        entryFee: "500 ALGO",
        maxPlayers: 50,
        currentPlayers: 23,
        startTime: "2024-12-20T12:00:00Z",
        duration: "3d 8h",
        type: "vip",
        difficulty: "Expert",
        prizeDistribution: {
          "1st": "10,000 ALGO (40%)",
          "2nd": "6,250 ALGO (25%)",
          "3rd": "3,750 ALGO (15%)",
          "Top 10": "5,000 ALGO (20%)"
        }
      }
    }
    return tournaments[id] || tournaments["1"]
  }

  const tournament = getTournamentData(tournamentId)
  const spotsLeft = tournament.maxPlayers - tournament.currentPlayers
  const fillPercentage = (tournament.currentPlayers / tournament.maxPlayers) * 100

  const handleJoinTournament = async () => {
    setIsJoining(true)
    // Simulate joining process
    setTimeout(() => {
      setIsJoining(false)
      setHasJoined(true)
    }, 2000)
  }

  const getTypeColor = () => {
    switch (tournament.type) {
      case "free": return "emerald"
      case "premium": return "yellow"
      case "vip": return "purple"
      default: return "gray"
    }
  }

  const typeColor = getTypeColor()

  return (
    <div className="min-h-screen stadium-bg">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tournament Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`w-20 h-20 bg-gradient-to-br from-${typeColor}-400 to-${typeColor}-600 rounded-full flex items-center justify-center mx-auto mb-6`}
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">{tournament.title}</h1>
            <p className="text-gray-300 text-lg">{tournament.description}</p>
          </div>

          {!hasJoined ? (
            <>
              {/* Tournament Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Tournament Details</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Trophy className={`w-5 h-5 text-${typeColor}-400`} />
                        <span className="text-gray-400">Prize Pool</span>
                      </div>
                      <span className={`text-${typeColor}-400 font-bold text-lg`}>{tournament.prizePool}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Coins className="w-5 h-5 text-blue-400" />
                        <span className="text-gray-400">Entry Fee</span>
                      </div>
                      <span className="text-white font-bold">{tournament.entryFee}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-green-400" />
                        <span className="text-gray-400">Duration</span>
                      </div>
                      <span className="text-white font-bold">{tournament.duration}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-400" />
                        <span className="text-gray-400">Players</span>
                      </div>
                      <span className="text-white font-bold">{tournament.currentPlayers}/{tournament.maxPlayers}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Target className="w-5 h-5 text-orange-400" />
                        <span className="text-gray-400">Difficulty</span>
                      </div>
                      <span className="text-white font-bold">{tournament.difficulty}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-pink-400" />
                        <span className="text-gray-400">Starts</span>
                      </div>
                      <span className="text-white font-bold">
                        {new Date(tournament.startTime).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Registration Progress */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Registration Progress</span>
                    <span>{fillPercentage.toFixed(1)}% Full</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${fillPercentage}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className={`bg-${typeColor}-500 h-3 rounded-full`}
                    />
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">
                    {spotsLeft} spots remaining
                  </p>
                </div>
              </motion.div>

              {/* Prize Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Prize Distribution</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(tournament.prizeDistribution).map(([place, prize], index) => (
                    <div key={place} className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg">
                      <span className="text-gray-400">{place} Place</span>
                      <span className={`text-${typeColor}-400 font-bold`}>{prize}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Rules & Requirements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card rounded-xl p-8 mb-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">Rules & Requirements</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold text-emerald-400 mb-4">Tournament Rules</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        Build portfolio with up to 6 tokens
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        Choose Long or Short strategy
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        No portfolio changes after start
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">•</span>
                        Winner determined by performance
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-yellow-400 mb-4">Requirements</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        Connected Algorand wallet
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        Sufficient ALGO balance
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        Account verification
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-1">✓</span>
                        Agree to tournament terms
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Join Tournament */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="glass-card rounded-xl p-8 text-center"
              >
                {spotsLeft > 0 ? (
                  <>
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Ready to Join?
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Entry fee of {tournament.entryFee} will be deducted from your wallet
                    </p>
                    <Button
                      onClick={handleJoinTournament}
                      disabled={isJoining}
                      className={`bg-${typeColor}-500 hover:bg-${typeColor}-400 text-white px-12 py-4 text-xl font-bold rounded-xl`}
                    >
                      {isJoining ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-3"
                          />
                          Joining Tournament...
                        </>
                      ) : (
                        <>
                          <Trophy className="w-6 h-6 mr-3" />
                          Join Tournament - {tournament.entryFee}
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-4">Tournament Full</h2>
                    <p className="text-gray-300 mb-6">
                      This tournament has reached maximum capacity
                    </p>
                    <Button disabled className="bg-gray-600 text-gray-400 px-12 py-4 text-xl font-bold rounded-xl cursor-not-allowed">
                      Registration Closed
                    </Button>
                  </>
                )}
              </motion.div>
            </>
          ) : (
            /* Success State */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-xl p-12 text-center"
            >
              <CheckCircle className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">
                Successfully Joined!
              </h2>
              <p className="text-gray-300 mb-8">
                You're now registered for {tournament.title}. Good luck!
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-4 bg-emerald-500/10 rounded-lg">
                  <h3 className="text-emerald-400 font-bold mb-2">Next Steps</h3>
                  <ul className="text-gray-300 text-sm space-y-1">
                    <li>• Build your portfolio before tournament starts</li>
                    <li>• Check tournament lobby for updates</li>
                    <li>• Join our Discord for live updates</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg">
                  <h3 className="text-blue-400 font-bold mb-2">Tournament Info</h3>
                  <div className="text-gray-300 text-sm space-y-1">
                    <div>Starts: {new Date(tournament.startTime).toLocaleString()}</div>
                    <div>Duration: {tournament.duration}</div>
                    <div>Your Entry: {tournament.entryFee}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3">
                  View Tournament Lobby
                </Button>
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3">
                  Join Discord
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>
    </div>
  )
}
