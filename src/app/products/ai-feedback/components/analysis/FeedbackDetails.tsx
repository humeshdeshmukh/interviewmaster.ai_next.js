'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaGraduationCap
} from 'react-icons/fa';

interface FeedbackDetailsProps {
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  resources: string[];
}

export const FeedbackDetails: React.FC<FeedbackDetailsProps> = ({
  strengths,
  improvements,
  suggestions,
  resources
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-8">
      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
            <FaCheckCircle className="text-green-400" />
            Key Strengths
          </h3>
          <div className="space-y-4">
            {strengths.map((strength, index) => (
              <motion.div
                key={index}
                variants={item}
                className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-green-400/50 transition-colors duration-300"
              >
                <span className="text-gray-300">{strength}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400" />
            Areas for Improvement
          </h3>
          <div className="space-y-4">
            {improvements.map((improvement, index) => (
              <motion.div
                key={index}
                variants={item}
                className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-yellow-400/50 transition-colors duration-300"
              >
                <span className="text-gray-300">{improvement}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-lg font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
          <FaLightbulb className="text-[#fcba28]" />
          Actionable Suggestions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#fcba28]/50 transition-colors duration-300 group"
            >
              <div className="p-2 rounded-lg bg-[#fcba28]/10 group-hover:bg-[#fcba28]/20 transition-colors duration-300">
                <FaLightbulb className="w-4 h-4 text-[#fcba28]" />
              </div>
              <span className="text-gray-300">{suggestion}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Resources */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-lg font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
          <FaGraduationCap className="text-[#fcba28]" />
          Learning Resources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => (
            <motion.div
              key={index}
              variants={item}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#fcba28]/50 transition-colors duration-300 group"
            >
              <div className="p-2 rounded-lg bg-[#fcba28]/10 group-hover:bg-[#fcba28]/20 transition-colors duration-300">
                <FaGraduationCap className="w-4 h-4 text-[#fcba28]" />
              </div>
              <span className="text-gray-300">{resource}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
