"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaArrowRight, FaPaperPlane } from 'react-icons/fa';

export default function AIConsultationPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiResponse = {
        role: 'ai' as const,
        content: "I'm analyzing your query and preparing personalized career advice. Here's what I recommend based on your situation..."
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-purple-900/30 mb-6"
          >
            <FaRobot className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold mb-4"
          >
            AI Career Consultation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400"
          >
            Get instant, personalized career guidance powered by advanced AI
          </motion.p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg p-6">
          {/* Messages */}
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 mt-8">
                <p>Start your consultation by asking any career-related question</p>
                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => setInput("What career path should I pursue based on my interests?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    What career path should I pursue based on my interests?
                  </button>
                  <button
                    onClick={() => setInput("How can I prepare for a tech interview?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    How can I prepare for a tech interview?
                  </button>
                  <button
                    onClick={() => setInput("What skills should I develop for future job market?")}
                    className="block w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                  >
                    What skills should I develop for future job market?
                  </button>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      message.role === 'user'
                        ? 'bg-[#fcba28] text-black'
                        : 'bg-white/10 text-white'
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your career-related question..."
              className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center gap-2"
            >
              Send
              <FaPaperPlane />
            </button>
          </form>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: '24/7 Availability',
              description: 'Get instant guidance anytime, anywhere',
              icon: '⏰'
            },
            {
              title: 'Personalized Advice',
              description: 'Tailored recommendations based on your profile',
              icon: '🎯'
            },
            {
              title: 'Data-Driven Insights',
              description: 'Backed by industry trends and market data',
              icon: '📊'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-lg"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
