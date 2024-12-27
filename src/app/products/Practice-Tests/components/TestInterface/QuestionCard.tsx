'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface QuestionCardProps {
    question: {
        id: string;
        text: string;
        options: string[];
        correctAnswer: string;
    };
    selectedAnswer: string | null;
    onAnswerSelect: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, selectedAnswer, onAnswerSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-lg shadow-lg p-6 mb-6"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{question.text}</h3>
            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => onAnswerSelect(option)}
                        className={`w-full p-4 text-left rounded-lg transition-all duration-200 ${
                            selectedAnswer === option
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionCard;
