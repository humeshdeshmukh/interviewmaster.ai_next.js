"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaDollarSign, FaChartLine, FaRobot, FaUserTie, FaHandshake, FaArrowRight, FaCheckCircle } from 'react-icons/fa';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

const cardVariants = {
  initial: { scale: 0.95, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const cardClasses = "relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-8 transition-colors hover:bg-white/10";
const statCardClasses = "flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10";
const testimonialCardClasses = "relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 transition-all hover:bg-white/10";

const stats = [
  { title: "Average Salary Increase", value: "15-25%", icon: FaDollarSign },
  { title: "Success Rate", value: "92%", icon: FaChartLine },
  { title: "Satisfied Clients", value: "1000+", icon: FaHandshake }
];

const testimonials = [
  {
    quote: "The AI-powered analysis helped me secure a 20% raise. Incredible insights!",
    author: "Sarah J.",
    role: "Senior Product Manager"
  },
  {
    quote: "Professional consultation gave me the confidence to negotiate effectively.",
    author: "Michael R.",
    role: "Software Engineer"
  },
  {
    quote: "The market insights were spot-on. Worth every penny!",
    author: "Lisa M.",
    role: "Marketing Director"
  }
];

export default function SalaryNegotiationPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="max-w-7xl mx-auto space-y-16"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute inset-0 -top-12 mx-auto w-96 h-96 bg-[#fcba28]/20 rounded-full blur-3xl" />
            <h1 className="relative text-4xl sm:text-5xl font-bold text-white">
              Master Your{" "}
              <span className="text-[#fcba28]">Salary Negotiation</span>
            </h1>
          </motion.div>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Get personalized insights and expert guidance to negotiate your worth with confidence.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/services/salary-negotiation/ai">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2"
              >
                <FaRobot className="w-5 h-5" />
                Start AI Analysis
              </motion.button>
            </Link>
            <Link href="/services/salary-negotiation/professional">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-white/20"
              >
                <FaUserTie className="w-5 h-5" />
                Book Expert Session
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Services Section */}
        <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className={cardClasses}
          >
            <div className="relative z-10">
              <div className="p-3 bg-[#fcba28]/10 rounded-lg w-fit">
                <FaRobot className="w-6 h-6 text-[#fcba28]" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">AI Consultation</h3>
              <p className="mt-2 text-white/80">
                Get instant, data-driven insights for your negotiation strategy.
              </p>
              <ul className="mt-4 space-y-2">
                {["Market rate analysis", "Custom negotiation scripts", "Real-time feedback"].map((feature, index) => (
                  <li key={index} className="flex items-center text-white/70">
                    <FaCheckCircle className="w-4 h-4 mr-2 text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/salary-negotiation/ai">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2"
                >
                  Start AI Analysis
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/20 to-transparent opacity-0 transition-opacity hover:opacity-100" />
          </motion.div>

          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className={cardClasses}
          >
            <div className="relative z-10">
              <div className="p-3 bg-[#fcba28]/10 rounded-lg w-fit">
                <FaUserTie className="w-6 h-6 text-[#fcba28]" />
              </div>
              <h3 className="mt-4 text-2xl font-bold text-white">Professional Consultation</h3>
              <p className="mt-2 text-white/80">
                Get personalized coaching from experienced negotiation experts.
              </p>
              <ul className="mt-4 space-y-2">
                {["1-on-1 strategy session", "Mock negotiation practice", "Follow-up support"].map((feature, index) => (
                  <li key={index} className="flex items-center text-white/70">
                    <FaCheckCircle className="w-4 h-4 mr-2 text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/services/salary-negotiation/professional">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-6 px-6 py-2 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2"
                >
                  Book Consultation
                  <FaArrowRight />
                </motion.button>
              </Link>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/20 to-transparent opacity-0 transition-opacity hover:opacity-100" />
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={statCardClasses}
              >
                <stat.icon className="w-8 h-8 text-[#fcba28] mb-4" />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-white/70 text-center">{stat.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className={testimonialCardClasses}
              >
                <div className="text-white/80 italic mb-4">"{testimonial.quote}"</div>
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-white/70">{testimonial.role}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6 py-12"
        >
          <h2 className="text-3xl font-bold text-white">
            Ready to Maximize Your Worth?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Choose your preferred consultation method and take the first step towards better compensation.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/services/salary-negotiation/ai">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-[#fcba28] text-black rounded-lg font-medium flex items-center gap-2"
              >
                <FaRobot className="w-5 h-5" />
                Start AI Analysis
              </motion.button>
            </Link>
            <Link href="/services/salary-negotiation/professional">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-white/20"
              >
                <FaUserTie className="w-5 h-5" />
                Book Expert Session
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
