"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Shield, Eye, Lock, Database } from 'lucide-react'

export default function PrivacyPage() {
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
              className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-xl text-gray-300">
              Last updated: December 2024
            </p>
          </div>

          {/* Privacy Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card rounded-xl p-8 space-y-8"
          >
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <Database className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-blue-400 font-semibold mb-2">Account Information</h3>
                    <p className="text-gray-300">Email address, username, wallet addresses, and profile information you provide.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                  <Eye className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-emerald-400 font-semibold mb-2">Usage Data</h3>
                    <p className="text-gray-300">Game statistics, match history, portfolio performance, and platform interactions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <Lock className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-purple-400 font-semibold mb-2">Technical Information</h3>
                    <p className="text-gray-300">IP address, browser type, device information, and cookies for platform functionality.</p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use the collected information for the following purposes:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Provide and maintain our fantasy league platform</li>
                <li>Process transactions and manage your account</li>
                <li>Calculate match results and distribute winnings</li>
                <li>Improve our services and user experience</li>
                <li>Communicate important updates and notifications</li>
                <li>Prevent fraud and ensure platform security</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Blockchain Transparency</h2>
              <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <p className="text-gray-300 leading-relaxed">
                  <strong className="text-yellow-400">Important:</strong> All transactions on AFL.so are recorded on the Algorand blockchain, which is public and immutable. While we don't directly share your personal information, your wallet addresses and transaction history are publicly visible on the blockchain.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>With your explicit consent</li>
                <li>To comply with legal requirements or court orders</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transfer or merger</li>
                <li>With service providers who assist in platform operations (under strict confidentiality agreements)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Multi-factor authentication for account access</li>
                <li>Secure smart contract implementations</li>
                <li>Limited access to personal data on a need-to-know basis</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                You have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li><strong className="text-emerald-400">Access:</strong> Request a copy of your personal data</li>
                <li><strong className="text-emerald-400">Correction:</strong> Update or correct inaccurate information</li>
                <li><strong className="text-emerald-400">Deletion:</strong> Request deletion of your personal data (subject to legal requirements)</li>
                <li><strong className="text-emerald-400">Portability:</strong> Receive your data in a structured, machine-readable format</li>
                <li><strong className="text-emerald-400">Objection:</strong> Object to certain processing of your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze platform usage and performance</li>
                <li>Provide personalized content and features</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
              <p className="text-gray-300 leading-relaxed mt-4">
                You can control cookie settings through your browser preferences, though some features may not function properly if cookies are disabled.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Data Retention</h2>
              <p className="text-gray-300 leading-relaxed">
                We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Account information is typically retained for the duration of your account plus a reasonable period thereafter. Transaction data may be retained longer for regulatory compliance.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. International Transfers</h2>
              <p className="text-gray-300 leading-relaxed">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy and applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Your continued use of the platform after changes constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">11. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="p-4 bg-gray-800/30 rounded-lg">
                <p className="text-emerald-400">Email: privacy@afl.so</p>
                <p className="text-emerald-400">Discord: AFL.so Community</p>
                <p className="text-emerald-400">Address: [Company Address]</p>
              </div>
            </section>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
