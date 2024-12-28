'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaBookmark, FaRegBookmark, FaShare } from 'react-icons/fa';
import type { Question } from '../types';

interface QuestionModalProps {
  question: Question | null;
  onClose: () => void;
  onBookmark: (id: number) => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  onClose,
  onBookmark
}) => {
  if (!question) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-start justify-between">
            <h2 className="text-2xl font-semibold text-white pr-8">{question.title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 text-lg mb-6">{question.description}</p>
              
              {question.details && (
                <>
                  <h3 className="text-[#fcba28] font-semibold mb-4">Detailed Answer</h3>
                  <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                    <p className="text-gray-300 whitespace-pre-line">{question.details}</p>
                  </div>
                </>
              )}

              {/* Tags Section */}
              <div className="mt-8 flex flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  question.category === 'Tech'
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {question.category}
                </span>
                {question.company && (
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm font-medium">
                    {question.company}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => onBookmark(question.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-[#fcba28] hover:bg-white/10 transition-colors"
            >
              {question.isBookmarked ? (
                <>
                  <FaBookmark className="w-4 h-4" />
                  Bookmarked
                </>
              ) : (
                <>
                  <FaRegBookmark className="w-4 h-4" />
                  Bookmark
                </>
              )}
            </button>

            <button
              onClick={() => {
                // Implement share functionality
                navigator.clipboard.writeText(question.title);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#fcba28] text-black font-medium hover:bg-[#fcd978] transition-colors"
            >
              <FaShare className="w-4 h-4" />
              Share
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
