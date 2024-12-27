'use client';
import React from 'react';
import { motion } from 'framer-motion';

interface PerformanceData {
    category: string;
    score: number;
    total: number;
}

interface PerformanceChartProps {
    data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
        >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Analysis</h3>
            <div className="space-y-4">
                {data.map((item, index) => {
                    const percentage = (item.score / item.total) * 100;
                    return (
                        <div key={index}>
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>{item.category}</span>
                                <span>{`${item.score}/${item.total}`}</span>
                            </div>
                            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, delay: index * 0.2 }}
                                    className={`h-full ${
                                        percentage >= 80
                                            ? 'bg-green-500'
                                            : percentage >= 60
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                    }`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default PerformanceChart;
