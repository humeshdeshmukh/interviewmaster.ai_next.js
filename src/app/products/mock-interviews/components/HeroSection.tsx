"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Video } from "lucide-react";

const FigmaAnimation = () => {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, bounce: 0 },
        opacity: { duration: 0.5 }
      }
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Main Container */}
      <motion.div
        className="relative w-full aspect-video bg-black/20 rounded-xl overflow-hidden border border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Interview Interface */}
        <div className="absolute inset-0 p-6">
          {/* Video Call Frame */}
          <motion.div
            className="relative w-full h-full rounded-lg overflow-hidden bg-gradient-to-br from-[#1c6bff]/10 to-[#fcba28]/10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* AI Interviewer Side */}
            <motion.div
              className="absolute left-6 top-6 w-[calc(50%-2rem)] h-[calc(100%-4rem)] rounded-lg bg-gradient-to-br from-[#1c6bff]/20 to-transparent backdrop-blur-sm border border-[#1c6bff]/20"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* AI Avatar */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#1c6bff] to-[#fcba28]"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="absolute inset-1 rounded-full bg-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 }}
                />
              </motion.div>
              
              {/* Animated Waves */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1c6bff]/30"
                  initial={{ width: '100px', height: '100px', opacity: 0 }}
                  animate={{
                    width: ['100px', '200px'],
                    height: ['100px', '200px'],
                    opacity: [0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.4,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>

            {/* Candidate Side */}
            <motion.div
              className="absolute right-6 top-6 w-[calc(50%-2rem)] h-[calc(100%-4rem)] rounded-lg bg-gradient-to-bl from-[#fcba28]/20 to-transparent backdrop-blur-sm border border-[#fcba28]/20"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {/* Candidate Placeholder */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-bl from-[#fcba28] to-[#b2be10]"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 }}
              />
            </motion.div>

            {/* Interview Progress */}
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-2 rounded-full bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#1c6bff] to-[#fcba28]"
                initial={{ width: '0%' }}
                animate={{ width: '75%' }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </motion.div>

            {/* Floating Elements */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#1c6bff] to-[#fcba28]"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Background Grid */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6">
        {[...Array(36)].map((_, i) => (
          <motion.div
            key={i}
            className="border-[0.5px] border-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
          />
        ))}
      </div>
    </div>
  );
};

export const HeroSection = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative pt-20 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Hero Section */}
          <motion.div 
            className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Master Your Interview Skills
            </motion.h1>
            <motion.p 
              className="text-lg text-white/60 mb-8"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice with our AI-powered platform and get real-time feedback on your responses, body language, and communication skills.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="/products/mock-interviews/schedule">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#fcba28] to-amber-600 text-black rounded-full font-medium hover:shadow-lg hover:shadow-amber-500/20 transition-all duration-300 flex items-center justify-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Video className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  Start Interview
                </motion.button>
              </Link>
              <Link href="/products/mock-interviews/schedule">
                <motion.button 
                  className="w-full sm:w-auto px-8 py-3 bg-white/10 text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Interview
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Hero Section - Figma Animation */}
          <motion.div 
            className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
              <div className="relative block w-full aspect-video bg-black/20 rounded-lg overflow-hidden">
                <FigmaAnimation />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1c6bff]/5 via-transparent to-[#fcba28]/5 -z-10" />
    </motion.div>
  );
};
