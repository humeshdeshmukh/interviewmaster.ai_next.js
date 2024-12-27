'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface TestSettingsProps {
    difficulty: string;
    timeLimit: number;
    onSettingsChange: (settings: { difficulty: string; timeLimit: number }) => void;
}

const TestSettings: React.FC<TestSettingsProps> = ({
    difficulty,
    timeLimit,
    onSettingsChange,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800/50 p-6 rounded-xl mb-6 backdrop-blur-sm"
        >
            <h3 className="text-xl font-semibold text-[#fcd34d] mb-4">Test Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-300 mb-2">Difficulty</label>
                    <select
                        value={difficulty}
                        onChange={(e) =>
                            onSettingsChange({ difficulty: e.target.value, timeLimit })
                        }
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#80cfd1]"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-300 mb-2">Time Limit (minutes)</label>
                    <input
                        type="number"
                        value={timeLimit}
                        onChange={(e) =>
                            onSettingsChange({
                                difficulty,
                                timeLimit: parseInt(e.target.value) || timeLimit,
                            })
                        }
                        min={1}
                        max={120}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-[#80cfd1]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default TestSettings;
