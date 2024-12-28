'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

interface ExperienceLevel {
  id: string;
  name: string;
  color: string;
  years: string;
  description: string;
}

const experienceLevels: ExperienceLevel[] = [
  {
    id: 'entry',
    name: 'Entry Level',
    color: 'from-green-400 to-emerald-500',
    years: '0-2 years',
    description: 'Recent graduates and early career professionals'
  },
  {
    id: 'mid',
    name: 'Mid Level',
    color: 'from-blue-400 to-indigo-500',
    years: '2-5 years',
    description: 'Experienced professionals with proven track record'
  },
  {
    id: 'senior',
    name: 'Senior Level',
    color: 'from-purple-400 to-violet-500',
    years: '5-8 years',
    description: 'Advanced expertise and leadership skills'
  },
  {
    id: 'expert',
    name: 'Expert Level',
    color: 'from-yellow-400 to-amber-500',
    years: '8+ years',
    description: 'Industry experts and technical leaders'
  }
];

interface ExperienceLevelSelectorProps {
  selectedLevel: string;
  onSelect: (level: string) => void;
}

export const ExperienceLevelSelector: React.FC<ExperienceLevelSelectorProps> = ({
  selectedLevel,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Experience Level</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {experienceLevels.map(level => (
          <motion.button
            key={level.id}
            onClick={() => onSelect(level.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`p-6 rounded-xl text-center transition-all duration-300 ${
              selectedLevel === level.id
                ? `bg-gradient-to-br ${level.color} text-white shadow-lg`
                : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
            }`}
          >
            <div className="flex justify-center mb-3">
              {[...Array(parseInt(level.years))].map((_, i) => (
                <FaStar
                  key={i}
                  className={`w-4 h-4 ${
                    selectedLevel === level.id ? 'text-white' : 'text-[#fcba28]'
                  }`}
                />
              ))}
            </div>
            <h4 className="font-semibold text-lg mb-1">{level.name}</h4>
            <p className="text-sm mb-2">{level.years}</p>
            <p className="text-xs opacity-80">{level.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
