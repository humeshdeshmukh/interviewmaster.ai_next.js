'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Monitor, MessageSquare, Video, Mic, Play, Settings, User, ArrowLeft } from 'lucide-react';

export default function SimulationPage() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products/mock-interviews/visual-simulation" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <Monitor className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Live AI Interview
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Experience a real-time interview with our AI interviewer
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Feeds */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Interviewer Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <User className="w-16 h-16 text-gray-600" />
                </div>
                <div className="absolute bottom-4 left-4 bg-[#fcba28]/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                  AI Interviewer
                </div>
              </div>
            </motion.div>

            {/* User Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-black/50 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Video className="w-16 h-16 text-gray-600" />
                </div>
                <div className="absolute bottom-4 left-4 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                  You
                </div>
              </div>
            </motion.div>

            {/* Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center gap-4"
            >
              <button
                onClick={() => setIsStarted(!isStarted)}
                className="px-8 py-4 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Interview
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 font-medium flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Settings
              </button>
            </motion.div>
          </div>

          {/* Chat & Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Chat Window */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl h-[400px] p-6 backdrop-blur-lg flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#fcba28]" />
                <h3 className="text-lg font-semibold text-white">Interview Chat</h3>
              </div>
              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                <div className="bg-white/10 rounded-lg p-3 max-w-[80%] ml-auto">
                  <p className="text-white">Hello! Ready to start the interview?</p>
                </div>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your response..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200">
                  Send
                </button>
              </div>
            </motion.div>

            {/* Audio Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Audio Controls</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Microphone</span>
                  <button className="p-2 bg-[#fcba28]/20 rounded-lg">
                    <Mic className="w-5 h-5 text-[#fcba28]" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Speaker</span>
                  <button className="p-2 bg-[#fcba28]/20 rounded-lg">
                    <Video className="w-5 h-5 text-[#fcba28]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
