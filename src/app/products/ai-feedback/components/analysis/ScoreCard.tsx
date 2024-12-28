'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaTrophy, FaChartLine } from 'react-icons/fa';

interface ScoreCardProps {
  score: number;
  metrics: {
    confidence: number;
    clarity: number;
    technicalAccuracy: number;
    completeness: number;
    relevance: number;
    structure: number;
  };
}

export const ScoreCard: React.FC<ScoreCardProps> = ({ score, metrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-[#fcba28]';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 75) return 'Strong';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-[#fcba28]/20">
              <FaTrophy className="w-6 h-6 text-[#fcba28]" />
            </div>
            <h3 className="text-xl font-semibold text-[#fcba28]">Overall Score</h3>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-4xl font-bold ${getScoreColor(score)}`}
          >
            {score}/100
          </motion.div>
        </div>
        <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${
              score >= 90
                ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                : score >= 75
                ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978]'
                : score >= 60
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500'
                : 'bg-gradient-to-r from-red-400 to-rose-500'
            }`}
          />
        </div>
        <p className={`text-center font-medium ${getScoreColor(score)}`}>
          {getScoreMessage(score)}
        </p>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {Object.entries(metrics).map(([key, value]) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-[#fcba28] transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <FaChartLine className="w-4 h-4 text-[#fcba28]" />
                <h3 className="text-lg font-semibold text-[#fcba28] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
              </div>
              <div className="text-3xl font-bold text-white mb-2">
                {Math.round(value)}%
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-[#fcba28]"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
