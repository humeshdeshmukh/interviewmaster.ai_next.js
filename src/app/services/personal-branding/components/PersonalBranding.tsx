"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRobot, FaUserTie, FaArrowRight } from 'react-icons/fa';
import SpinningIcons from './SpinningIcons';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

export default function PersonalBranding() {
  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Build Your Personal Brand
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Choose between AI-powered optimization or professional branding services to elevate your professional presence
          </p>
          <SpinningIcons />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={itemVariants}
        >
          {[
            { number: '85%', text: 'Profile Views Increase' },
            { number: '5000+', text: 'Successful Profiles' },
            { number: '92%', text: 'Career Transitions' }
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white/5 p-8 rounded-xl border border-white/10 text-center"
            >
              <div className="text-4xl font-bold text-[#fcba28] mb-2">{stat.number}</div>
              <div className="text-gray-300">{stat.text}</div>
            </div>
          ))}
        </motion.div>

        {/* Options Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={itemVariants}
        >
          {/* AI Personal Branding */}
          <Link href="/services/personal-branding/ai" className="group">
            <div className="h-full bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-[#fcba28]/20">
                  <FaRobot className="w-8 h-8 text-[#fcba28]" />
                </div>
                <h3 className="text-2xl font-bold">AI Personal Branding</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  AI-powered profile optimization
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Content generation for social media
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Real-time suggestions
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Unlimited revisions
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#fcba28]">Free</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  Get Started →
                </span>
              </div>
            </div>
          </Link>

          {/* Professional Branding */}
          <Link href="/services/personal-branding/professional" className="group">
            <div className="h-full bg-white/5 p-8 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-full bg-[#fcba28]/20">
                  <FaUserTie className="w-8 h-8 text-[#fcba28]" />
                </div>
                <h3 className="text-2xl font-bold">Professional Branding</h3>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Personal brand strategy development
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  One-on-one consultation
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Professional photoshoot
                </li>
                <li className="flex items-center gap-2">
                  <FaArrowRight className="text-[#fcba28]" />
                  Network growth strategy
                </li>
              </ul>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-[#fcba28]">$199</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  Learn More →
                </span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="mt-16 bg-white/5 p-8 rounded-xl border border-white/10"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Why Build Your Personal Brand?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Professional Networking',
                description: 'Connect with industry leaders and expand your professional network'
              },
              {
                title: 'Industry Recognition',
                description: 'Establish yourself as a thought leader in your field'
              },
              {
                title: 'Career Growth',
                description: 'Open doors to new opportunities and career advancement'
              }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">{benefit.title}</h3>
                <p className="text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
