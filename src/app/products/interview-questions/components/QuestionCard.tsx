'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBookmark, FaRegBookmark, FaChevronRight, FaEye, FaThumbsUp } from 'react-icons/fa';
import type { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onBookmark: (id: number) => void;
  onViewDetails: (question: Question) => void;
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-400';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Hard':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Tech':
      return 'bg-blue-500/20 text-blue-400';
    case 'Non-Tech':
      return 'bg-purple-500/20 text-purple-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  onBookmark,
  onViewDetails
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-[#fcba28]/50 transition-all duration-300 group"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-white flex-1 pr-4">{question.title}</h3>
          <button
            onClick={() => onBookmark(question.id)}
            className="text-[#fcba28] hover:scale-110 transition-transform"
          >
            {question.isBookmarked ? (
              <FaBookmark className="w-5 h-5" />
            ) : (
              <FaRegBookmark className="w-5 h-5" />
            )}
          </button>
        </div>

        <p className="text-gray-300 mb-4 line-clamp-2">{question.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(question.type)}`}>
            {question.type}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium">
            {question.category}
          </span>
          {question.company && (
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-sm font-medium">
              {question.company}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-4 text-gray-400 text-sm">
            {question.views !== undefined && (
              <span className="flex items-center gap-1">
                <FaEye className="w-4 h-4" />
                {question.views}
              </span>
            )}
            {question.likes !== undefined && (
              <span className="flex items-center gap-1">
                <FaThumbsUp className="w-4 h-4" />
                {question.likes}
              </span>
            )}
          </div>
          
          <button
            onClick={() => onViewDetails(question)}
            className="text-[#fcba28] opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110 transform flex items-center gap-2"
          >
            View Details
            <FaChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
