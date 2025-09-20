"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Trophy, Calendar, Users, Coins, Clock, Settings, Plus } from 'lucide-react'

export default function CreateTournamentPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    startTime: '',
    duration: '1h',
    maxPlayers: '100',
    entryFee: '50',
    prizeDistribution: 'standard',
    isPrivate: false,
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Tournament created:', formData)
    // Handle tournament creation
  }

  const prizeDistributions = [
    {
      id: 'standard',
      name: 'Standard',
      description: '1st: 40%, 2nd: 25%, 3rd: 15%, Top 10: 20%'
    },
    {
      id: 'winner-takes-all',
      name: 'Winner Takes All',
      description: '1st: 90%, 2nd: 10%'
    },
    {
      id: 'top-heavy',
      name: 'Top Heavy',
      description: '1st: 60%, 2nd: 20%, 3rd: 10%, Top 10: 10%'
    },
    {
      id: 'flat',
      name: 'Flat Distribution',
      description: 'Top 20 players split prize pool equally'
    }
  ]

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
              className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Plus className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">Create Tournament</h1>
            <p className="text-xl text-gray-300">
              Host your own tournament and compete for massive prize pools
            </p>
          </div>

          {/* Tournament Creation Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-emerald-400" />
                  Basic Information
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Tournament Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                      placeholder="Epic ALGO Championship"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Max Players</label>
                    <select
                      value={formData.maxPlayers}
                      onChange={(e) => setFormData({...formData, maxPlayers: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="50">50 Players</option>
                      <option value="100">100 Players</option>
                      <option value="200">200 Players</option>
                      <option value="500">500 Players</option>
                      <option value="1000">1000 Players</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-white font-medium mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 resize-none"
                    placeholder="Describe your tournament..."
                  />
                </div>
              </div>

              {/* Schedule */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  Schedule
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Start Time</label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Duration</label>
                    <select
                      value={formData.duration}
                      onChange={(e) => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="30m">30 Minutes</option>
                      <option value="1h">1 Hour</option>
                      <option value="2h">2 Hours</option>
                      <option value="4h">4 Hours</option>
                      <option value="12h">12 Hours</option>
                      <option value="1d">1 Day</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Entry Fee & Prizes */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Coins className="w-5 h-5 text-yellow-400" />
                  Entry Fee & Prizes
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Entry Fee (ALGO)</label>
                    <input
                      type="number"
                      value={formData.entryFee}
                      onChange={(e) => setFormData({...formData, entryFee: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                      placeholder="50"
                      min="1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-medium mb-2">Prize Distribution</label>
                    <select
                      value={formData.prizeDistribution}
                      onChange={(e) => setFormData({...formData, prizeDistribution: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-emerald-500"
                    >
                      {prizeDistributions.map((dist) => (
                        <option key={dist.id} value={dist.id}>{dist.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Prize Distribution Preview */}
                <div className="mt-4 p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Prize Distribution Preview</h4>
                  <p className="text-gray-400 text-sm">
                    {prizeDistributions.find(d => d.id === formData.prizeDistribution)?.description}
                  </p>
                  <div className="mt-2 text-emerald-400 font-bold">
                    Total Prize Pool: {parseInt(formData.entryFee) * parseInt(formData.maxPlayers)} ALGO
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-400" />
                  Privacy Settings
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="private"
                      checked={formData.isPrivate}
                      onChange={(e) => setFormData({...formData, isPrivate: e.target.checked})}
                      className="w-4 h-4 text-emerald-500 bg-gray-800 border-gray-600 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="private" className="text-white">
                      Make this tournament private (requires password)
                    </label>
                  </div>
                  
                  {formData.isPrivate && (
                    <div>
                      <label className="block text-white font-medium mb-2">Tournament Password</label>
                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500"
                        placeholder="Enter password"
                        required={formData.isPrivate}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Tournament Summary */}
              <div className="p-6 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Tournament Summary</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tournament Name:</span>
                    <span className="text-white">{formData.name || 'Untitled Tournament'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Players:</span>
                    <span className="text-white">{formData.maxPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Entry Fee:</span>
                    <span className="text-white">{formData.entryFee} ALGO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Prize Pool:</span>
                    <span className="text-emerald-400">{parseInt(formData.entryFee) * parseInt(formData.maxPlayers)} ALGO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{formData.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Privacy:</span>
                    <span className="text-white">{formData.isPrivate ? 'Private' : 'Public'}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 text-white px-12 py-4 text-xl font-bold rounded-xl"
                >
                  <Trophy className="w-6 h-6 mr-3" />
                  Create Tournament
                </Button>
                <p className="text-gray-400 text-sm mt-4">
                  Tournament creation fee: 5 ALGO (refunded if tournament fills)
                </p>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
