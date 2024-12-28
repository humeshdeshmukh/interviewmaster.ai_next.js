'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Smile, Volume2, Eye, Clock, ThumbsUp, AlertCircle } from 'lucide-react';

interface FeedbackMetric {
  category: string;
  score: number;
  icon: React.ElementType;
  color: string;
  feedback: string;
}

interface FeedbackPanelProps {
  metrics?: FeedbackMetric[];
}

const defaultMetrics: FeedbackMetric[] = [
  {
    category: 'Body Language',
    score: 85,
    icon: Smile,
    color: '#22c55e',
    feedback: 'Good eye contact and confident posture. Try to reduce hand movements.'
  },
  {
    category: 'Voice Clarity',
    score: 78,
    icon: Volume2,
    color: '#fcba28',
    feedback: 'Clear pronunciation. Consider varying your pace for emphasis.'
  },
  {
    category: 'Eye Contact',
    score: 92,
    icon: Eye,
    color: '#22c55e',
    feedback: 'Excellent eye contact maintained throughout the interview.'
  },
  {
    category: 'Pacing',
    score: 70,
    icon: Clock,
    color: '#fcba28',
    feedback: 'Good overall pace. Some answers could be more concise.'
  }
];

export const FeedbackPanel: React.FC<FeedbackPanelProps> = ({ metrics = defaultMetrics }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 70) return 'bg-[#fcba28]';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <BarChart className="w-5 h-5 text-[#fcba28]" />
        <h3 className="text-lg font-semibold text-white">AI Feedback</h3>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg" style={{ backgroundColor: `${metric.color}20` }}>
                  <Icon className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                <span className="text-white font-medium">{metric.category}</span>
              </div>
              
              {/* Score Bar */}
              <div className="h-2 bg-white/10 rounded-full mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.score}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-full rounded-full ${getScoreColor(metric.score)}`}
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Score</span>
                <span className="text-white font-medium">{metric.score}%</span>
              </div>

              <p className="text-sm text-gray-400">{metric.feedback}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Feedback */}
      <div className="bg-white/10 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-3">
          <ThumbsUp className="w-5 h-5 text-[#fcba28]" />
          <h4 className="text-white font-medium">Strengths</h4>
        </div>
        <ul className="space-y-2 mb-4">
          <li className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500" />
            Strong communication skills with clear articulation
          </li>
          <li className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-green-500" />
            Maintained professional demeanor throughout
          </li>
        </ul>

        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-5 h-5 text-[#fcba28]" />
          <h4 className="text-white font-medium">Areas for Improvement</h4>
        </div>
        <ul className="space-y-2">
          <li className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500" />
            Consider providing more specific examples
          </li>
          <li className="text-gray-400 text-sm flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-red-500" />
            Work on reducing filler words
          </li>
        </ul>
      </div>
    </div>
  );
};
