'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  category: string;
  tips: string[];
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "Tell me about a challenging project you've worked on and how you handled it.",
    category: "Behavioral",
    tips: [
      "Use the STAR method (Situation, Task, Action, Result)",
      "Focus on your specific contributions",
      "Highlight problem-solving skills",
      "Quantify results when possible"
    ]
  },
  {
    id: 2,
    text: "Where do you see yourself in five years?",
    category: "Career Goals",
    tips: [
      "Show alignment with company growth",
      "Be realistic but ambitious",
      "Focus on skill development",
      "Express commitment to the role"
    ]
  },
  {
    id: 3,
    text: "What are your greatest strengths and weaknesses?",
    category: "Self-Assessment",
    tips: [
      "Be honest but strategic",
      "Show self-awareness",
      "Demonstrate growth mindset",
      "Provide specific examples"
    ]
  }
];

interface QuestionPromptProps {
  onQuestionChange?: (question: Question) => void;
}

export const QuestionPrompt: React.FC<QuestionPromptProps> = ({ onQuestionChange }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showTips, setShowTips] = useState(false);

  const currentQuestion = sampleQuestions[currentQuestionIndex];

  const nextQuestion = () => {
    const nextIndex = (currentQuestionIndex + 1) % sampleQuestions.length;
    setCurrentQuestionIndex(nextIndex);
    if (onQuestionChange) {
      onQuestionChange(sampleQuestions[nextIndex]);
    }
  };

  const previousQuestion = () => {
    const prevIndex = currentQuestionIndex === 0 ? sampleQuestions.length - 1 : currentQuestionIndex - 1;
    setCurrentQuestionIndex(prevIndex);
    if (onQuestionChange) {
      onQuestionChange(sampleQuestions[prevIndex]);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      {/* Question Header */}
      <div className="flex items-center gap-2 mb-6">
        <MessageSquare className="w-5 h-5 text-[#fcba28]" />
        <h3 className="text-lg font-semibold text-white">Interview Question</h3>
        <span className="ml-auto text-sm text-gray-400">
          {currentQuestionIndex + 1} / {sampleQuestions.length}
        </span>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mb-6"
      >
        <div className="bg-white/10 rounded-lg p-6">
          <span className="inline-block px-3 py-1 rounded-full text-sm bg-[#fcba28]/20 text-[#fcba28] mb-4">
            {currentQuestion.category}
          </span>
          <h4 className="text-xl text-white mb-4">{currentQuestion.text}</h4>
          
          {/* Tips Section */}
          <div className="mt-4">
            <button
              onClick={() => setShowTips(!showTips)}
              className="flex items-center gap-2 text-[#fcba28] hover:text-[#fcd978] transition-colors duration-200"
            >
              <Lightbulb className="w-4 h-4" />
              {showTips ? 'Hide Tips' : 'Show Tips'}
            </button>
            
            {showTips && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-2"
              >
                {currentQuestion.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-2 text-gray-400">
                    <div className="w-1 h-1 rounded-full bg-[#fcba28] mt-2" />
                    <p>{tip}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Navigation Controls */}
      <div className="flex justify-between">
        <button
          onClick={previousQuestion}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={nextQuestion}
          className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
