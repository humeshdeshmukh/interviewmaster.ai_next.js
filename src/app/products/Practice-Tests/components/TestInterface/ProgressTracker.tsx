'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ProgressTrackerProps {
    currentQuestion: number;
    totalQuestions: number;
    answeredQuestions: number[];
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({
    currentQuestion,
    totalQuestions,
    answeredQuestions,
}) => {
    const progress = (currentQuestion / totalQuestions) * 100;

    return (
        <div className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-4 w-64">
            <div className="mb-2">
                <span className="text-sm text-gray-600">Question</span>
                <span className="font-bold text-lg ml-2">
                    {currentQuestion + 1}/{totalQuestions}
                </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
                {Array.from({ length: totalQuestions }).map((_, index) => (
                    <div
                        key={index}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                            answeredQuestions.includes(index)
                                ? 'bg-green-500 text-white'
                                : index === currentQuestion
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200'
                        }`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressTracker;
