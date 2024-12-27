"use client";

import { motion } from 'framer-motion';
import { Question } from '../../utils/types';

interface TestQuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswer: (answerId: number) => void;
}

export default function TestQuestion({
  question,
  selectedAnswer,
  onAnswer
}: TestQuestionProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl text-gray-300">
        {question.question}
      </h3>
      
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
              selectedAnswer === index
                ? 'bg-[#fcba28] text-black'
                : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      {selectedAnswer !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-6 p-4 rounded-xl ${
            selectedAnswer === question.correctAnswer
              ? 'bg-green-500/10 border border-green-500/20'
              : 'bg-red-500/10 border border-red-500/20'
          }`}
        >
          <p className={`text-lg font-medium mb-2 ${
            selectedAnswer === question.correctAnswer
              ? 'text-green-400'
              : 'text-red-400'
          }`}>
            {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
          </p>
          <p className="text-gray-300">{question.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
