"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video, Brain, Target, ChevronRight, Sparkles, ArrowRight, MessageSquare, BarChart, Shield, UserCheck } from "lucide-react";

export default function MockInterviewLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background/90">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative pt-20 pb-16 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
          Master Your Interview Skills
        </h1>
        <p className="text-lg text-white/60 max-w-2xl mx-auto mb-12">
          Practice with our AI-powered platform and get real-time feedback
        </p>
      </motion.div>

      {/* Navigation Section */}
      <motion.nav 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-black/20 backdrop-blur-lg border-y border-white/10 mb-16"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-4">
            <div className="flex gap-8 items-center">
              <Link href="/products/mock-interviews/schedule">
                <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 w-3 bg-[#fcba28] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-sm font-medium text-white group-hover:text-black">Schedule Interview</span>
                </button>
              </Link>
              
              <Link href="/products/mock-interviews/visual-simulation">
                <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 w-3 bg-[#b2be10] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-sm font-medium text-white group-hover:text-black">Start Simulation</span>
                </button>
              </Link>
              
              <Link href="/products/mock-interviews/tips">
                <button className="group relative px-4 py-2 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 w-3 bg-[#1c6bff] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
                  <span className="relative text-sm font-medium text-white group-hover:text-black">Interview Tips</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="pt-24 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
            >
              <feature.icon className="w-8 h-8 text-[#fcba28] mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[#fcba28]">
            Ready to Begin Your Interview Journey?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products/mock-interviews/schedule">
              <button className="px-8 py-3 bg-gradient-to-r from-[#fcba28] to-amber-600 text-black rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300">
                Schedule Interview
              </button>
            </Link>
            <Link href="/products/mock-interviews/visual-simulation">
              <button className="px-8 py-3 bg-gradient-to-r from-[#b2be10] to-green-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300">
                Start Simulation
              </button>
            </Link>
            <Link href="/products/mock-interviews/tips">
              <button className="px-8 py-3 bg-gradient-to-r from-[#1c6bff] to-blue-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-300">
                Interview Tips
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Analysis",
    description: "Get instant feedback on your responses and body language",
    icon: Brain
  },
  {
    title: "Real-time Simulation",
    description: "Practice with realistic interview scenarios",
    icon: Video
  },
  {
    title: "Performance Tracking",
    description: "Monitor your progress and improvements",
    icon: Target
  },
  {
    title: "Smart Questions",
    description: "Dynamic questions based on your experience",
    icon: MessageSquare
  },
  {
    title: "Detailed Analytics",
    description: "Comprehensive performance insights",
    icon: BarChart
  },
  {
    title: "Expert Guidance",
    description: "Learn from industry best practices",
    icon: Shield
  }
];
