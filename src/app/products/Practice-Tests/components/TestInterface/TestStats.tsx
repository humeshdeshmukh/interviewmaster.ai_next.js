"use client";

import { motion } from 'framer-motion';
import { FaChartLine, FaHistory, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { TestTracker, TestStats } from '../../utils/testTracker';

interface TestStatsProps {
  category?: string;
}

export default function TestStats({ category }: TestStatsProps) {
  const tracker = TestTracker.getInstance();
  const stats = tracker.getTestStats();
  const categoryProgress = category ? tracker.getCategoryProgress(category) : null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Overall Stats */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-[#fcba28]/20">
            <FaChartLine className="w-6 h-6 text-[#fcba28]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Overall Statistics</h3>
            <p className="text-gray-400">Your performance across all tests</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-sm">Average Score</p>
            <p className={`text-2xl font-bold ${getScoreColor(stats.averageScore)}`}>
              {Math.round(stats.averageScore)}%
            </p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-sm">Tests Taken</p>
            <p className="text-2xl font-bold text-white">{stats.totalTests}</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-sm">Best Score</p>
            <p className="text-2xl font-bold text-green-500">{Math.round(stats.bestScore)}%</p>
          </div>
          <div className="p-4 bg-white/5 rounded-lg">
            <p className="text-gray-400 text-sm">Average Time</p>
            <p className="text-2xl font-bold text-white">{formatTime(stats.averageTime)}</p>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      {categoryProgress && (
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-lg bg-[#fcba28]/20">
              <FaHistory className="w-6 h-6 text-[#fcba28]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Category Progress</h3>
              <p className="text-gray-400">Your performance in {category}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm">Tests Attempted</p>
                <p className="text-2xl font-bold text-white">
                  {categoryProgress.testsAttempted}
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(categoryProgress.averageScore)}`}>
                  {Math.round(categoryProgress.averageScore)}%
                </p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-gray-400 text-sm">Total Time Spent</p>
                <p className="text-2xl font-bold text-white">
                  {formatTime(categoryProgress.timeSpent)}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Strong Topics */}
              {categoryProgress.strongTopics.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="text-green-500" />
                    <h4 className="text-white font-medium">Strong Topics</h4>
                  </div>
                  <div className="space-y-2">
                    {categoryProgress.strongTopics.map(topic => (
                      <div
                        key={topic}
                        className="p-2 bg-green-500/10 text-green-500 rounded-lg text-sm"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Weak Topics */}
              {categoryProgress.weakTopics.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <h4 className="text-white font-medium">Areas for Improvement</h4>
                  </div>
                  <div className="space-y-2">
                    {categoryProgress.weakTopics.map(topic => (
                      <div
                        key={topic}
                        className="p-2 bg-yellow-500/10 text-yellow-500 rounded-lg text-sm"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
