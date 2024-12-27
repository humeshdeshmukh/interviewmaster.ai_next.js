"use client";

import { motion } from 'framer-motion';
import { FaStar, FaClock, FaCheckCircle, FaChartLine } from 'react-icons/fa';

interface TestResultsProps {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  accuracy: number;
  correctAnswers: number;
  wrongAnswers: number;
  onRetry: () => void;
  onBack: () => void;
}

export default function TestResults({
  score,
  totalQuestions,
  timeSpent,
  accuracy,
  correctAnswers,
  wrongAnswers,
  onRetry,
  onBack
}: TestResultsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getPerformanceMessage = (score: number) => {
    if (score >= 90) return "Excellent! You're well-prepared!";
    if (score >= 70) return "Good job! Keep practicing!";
    if (score >= 50) return "You're making progress!";
    return "Keep practicing, you'll improve!";
  };

  const metrics = [
    {
      icon: FaStar,
      label: 'Score',
      value: `${score}%`,
      color: '#fcba28'
    },
    {
      icon: FaCheckCircle,
      label: 'Accuracy',
      value: `${Math.round(accuracy)}%`,
      color: '#4CAF50'
    },
    {
      icon: FaClock,
      label: 'Time Spent',
      value: formatTime(timeSpent),
      color: '#00C4CC'
    },
    {
      icon: FaChartLine,
      label: 'Questions',
      value: `${correctAnswers}/${totalQuestions}`,
      color: '#FF6B6B'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Performance Message */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">
          {getPerformanceMessage(score)}
        </h2>
        <p className="text-gray-400">
          You've completed the test. Here's how you performed:
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 p-6 rounded-xl border border-white/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon style={{ color: metric.color }} />
                <span className="text-gray-400">{metric.label}</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {metric.value}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Score Breakdown */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-white mb-4">Score Breakdown</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Correct Answers</span>
              <span>{correctAnswers}/{totalQuestions}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(correctAnswers / totalQuestions) * 100}%` }}
                className="h-full bg-green-500"
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Wrong Answers</span>
              <span>{wrongAnswers}/{totalQuestions}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(wrongAnswers / totalQuestions) * 100}%` }}
                className="h-full bg-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all"
        >
          Back to Tests
        </button>
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all"
        >
          Try Again
        </button>
      </div>
    </motion.div>
  );
}
