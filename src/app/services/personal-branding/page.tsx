"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaRobot, FaUserTie, FaChartLine, FaUsers, FaTrophy, FaCheckCircle, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function PersonalBrandingPage() {
  const stats = [
    { label: 'Profile Views Increase', value: '300%', icon: FaChartLine },
    { label: 'Successful Profiles', value: '5,000+', icon: FaUsers },
    { label: 'Career Transitions', value: '2,500+', icon: FaTrophy },
  ];

  const aiFeatures = [
    'AI-powered profile optimization',
    'Content generation for social media',
    'Real-time suggestions',
    'Personal brand analysis',
    'Keyword optimization',
    'Unlimited revisions'
  ];

  const proFeatures = [
    'Personal brand strategy development',
    'One-on-one consultation',
    'Professional photoshoot',
    'Social media audit',
    'Content calendar creation',
    'Network growth strategy'
  ];

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Build Your{' '}
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Personal Brand
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Elevate your professional presence with AI-powered tools or expert guidance to stand out in your industry.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-white/5 border border-white/10 text-center hover:bg-white/10 transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 text-[#fcba28] mx-auto mb-4" />
              <div className="text-3xl font-bold text-[#fcba28] mb-2">{stat.value}</div>
              <div className="text-gray-300">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Branding Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* AI Branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-[#fcba28]/20">
                <FaRobot className="w-8 h-8 text-[#fcba28]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">AI Personal Branding</h2>
                <p className="text-gray-300">Smart profile optimization</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-6">Free</div>
            <ul className="space-y-4 mb-8">
              {aiFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#fcba28] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/personal-branding/ai"
              className="block w-full py-3 px-6 bg-[#fcba28] text-black rounded-xl text-center font-semibold hover:bg-[#fcd978] transition-colors duration-300"
            >
              Start Building Your Brand
            </Link>
          </motion.div>

          {/* Professional Branding */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-full bg-[#fcba28]/20">
                <FaUserTie className="w-8 h-8 text-[#fcba28]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Professional Branding</h2>
                <p className="text-gray-300">Expert-guided brand development</p>
              </div>
            </div>
            <div className="text-3xl font-bold mb-6">$199</div>
            <ul className="space-y-4 mb-8">
              {proFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-[#fcba28] flex-shrink-0" />
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/services/personal-branding/professional"
              className="block w-full py-3 px-6 bg-[#fcba28] text-black rounded-xl text-center font-semibold hover:bg-[#fcd978] transition-colors duration-300"
            >
              Work with an Expert
            </Link>
          </motion.div>
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold mb-12">Why Build Your Personal Brand?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaLinkedin className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Professional Network</h3>
              <p className="text-gray-300">
                Expand your network and attract career opportunities
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaGithub className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Industry Recognition</h3>
              <p className="text-gray-300">
                Establish yourself as a thought leader in your field
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <div className="p-3 rounded-full bg-[#fcba28]/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaTwitter className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h3 className="text-xl font-bold mb-4">Career Growth</h3>
              <p className="text-gray-300">
                Unlock better opportunities and higher earning potential
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
