'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface ScoreCardProps {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    accuracy: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, totalQuestions, timeSpent, accuracy }) => {
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-6">Test Results</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-600">Score</h3>
                    <p className="text-3xl font-bold text-blue-600">
                        {score}/{totalQuestions}
                    </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-600">Accuracy</h3>
                    <p className="text-3xl font-bold text-green-600">{accuracy}%</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-600">Time Spent</h3>
                    <p className="text-3xl font-bold text-purple-600">{formatTime(timeSpent)}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-sm text-gray-600">Questions</h3>
                    <p className="text-3xl font-bold text-yellow-600">{totalQuestions}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default ScoreCard;
