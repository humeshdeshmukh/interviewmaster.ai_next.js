'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Users, Video, MessageSquare, Star, Plus, Search, Filter, ArrowLeft } from 'lucide-react';

const peerList = [
  {
    name: 'Alex Johnson',
    role: 'Software Engineer',
    experience: '5 years',
    rating: 4.8,
    status: 'Available',
    avatar: '👨‍💻'
  },
  {
    name: 'Sarah Chen',
    role: 'Product Manager',
    experience: '3 years',
    rating: 4.9,
    status: 'In Session',
    avatar: '👩‍💼'
  },
  {
    name: 'Mike Peters',
    role: 'Data Scientist',
    experience: '4 years',
    rating: 4.7,
    status: 'Available',
    avatar: '👨‍🔬'
  }
];

export default function PeerPracticePage() {
  const [selectedPeer, setSelectedPeer] = useState(null);

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
            <Users className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Peer Practice
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Practice with other candidates and give each other valuable feedback
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Peer List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              {/* Search & Filter */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search peers..."
                    className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400"
                  />
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 flex items-center justify-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="flex-1 px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" />
                    Create Room
                  </button>
                </div>
              </div>

              {/* Peer List */}
              <div className="space-y-4">
                {peerList.map((peer, index) => (
                  <div
                    key={index}
                    className="bg-white/10 rounded-lg p-4 hover:bg-white/20 transition-colors duration-200 cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{peer.avatar}</div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{peer.name}</h3>
                        <p className="text-gray-400 text-sm">{peer.role}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Star className="w-4 h-4 text-[#fcba28]" />
                          <span className="text-white">{peer.rating}</span>
                          <span className="text-gray-400">•</span>
                          <span className="text-gray-400">{peer.experience}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        peer.status === 'Available' 
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {peer.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Video Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feeds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-6"
            >
              {/* Your Feed */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <div className="aspect-video rounded-lg overflow-hidden bg-black/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                    You
                  </div>
                </div>
              </div>

              {/* Peer Feed */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
                <div className="aspect-video rounded-lg overflow-hidden bg-black/50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Users className="w-16 h-16 text-gray-600" />
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#fcba28]/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                    Peer
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#fcba28]" />
                <h3 className="text-lg font-semibold text-white">Chat</h3>
              </div>
              <div className="h-[200px] overflow-y-auto mb-4">
                {/* Chat messages will go here */}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                />
                <button className="px-4 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200">
                  Send
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
