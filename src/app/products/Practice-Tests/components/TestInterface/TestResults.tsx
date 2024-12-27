"use client";

import { motion } from 'framer-motion';
import { FaTrophy, FaClock, FaCheckCircle, FaTimesCircle, FaRedo } from 'react-icons/fa';
import { Test } from '../../utils/types';

interface TestResultsProps {
  test: Test;
  answers: { [key: string]: number };
  timeSpent: number;
  onRetry: () => void;
}

export default function TestResults({
  test,
  answers,
  timeSpent,
  onRetry
}: TestResultsProps) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const calculateResults = () => {
    const totalQuestions = test.questions.length;
    const correctAnswers = test.questions.reduce((acc, question, index) => {
      return acc + (answers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);
    const wrongAnswers = Object.keys(answers).length - correctAnswers;
    const score = Math.round((correctAnswers / totalQuestions) * 100);
    const accuracy = Object.keys(answers).length > 0 
      ? Math.round((correctAnswers / Object.keys(answers).length) * 100)
      : 0;

    return {
      score,
      accuracy,
      correctAnswers,
      wrongAnswers,
      totalQuestions
    };
  };

  const results = calculateResults();
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="max-w-4xl mx-auto pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1e1e1e] p-8 rounded-xl shadow-lg"
      >
        <div className="text-center mb-8">
          <div className="p-4 rounded-full bg-[#fcba28]/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <FaTrophy className="w-8 h-8 text-[#fcba28]" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Test Complete!</h2>
          <div className={`text-5xl font-bold mb-4 ${getScoreColor(results.score)}`}>
            {results.score}%
          </div>
          <p className="text-gray-300">
            {results.score >= 80 ? 'Excellent work!' : 
             results.score >= 60 ? 'Good effort!' : 
             'Keep practicing!'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FaCheckCircle className="text-green-400" />
              <span className="text-gray-300">Correct Answers</span>
            </div>
            <div className="text-2xl font-bold text-green-400">
              {results.correctAnswers}/{results.totalQuestions}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FaTimesCircle className="text-red-400" />
              <span className="text-gray-300">Wrong Answers</span>
            </div>
            <div className="text-2xl font-bold text-red-400">
              {results.wrongAnswers}
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <FaClock className="text-[#fcba28]" />
              <span className="text-gray-300">Time Taken</span>
            </div>
            <div className="text-2xl font-bold text-[#fcba28]">
              {formatTime(timeSpent)}
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
          >
            <FaRedo />
            Try Another Test
          </button>
        </div>
      </motion.div>
    </div>
  );
}
