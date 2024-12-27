'use client';

import { motion } from 'framer-motion';
import { FaClock, FaGraduationCap, FaPlay, FaStar } from 'react-icons/fa';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration: string;
  rating: number;
  lessons: number;
  thumbnail?: string;
  tags: string[];
  author: {
    name: string;
    role: string;
  };
}

interface TutorialCardProps {
  tutorial: Tutorial;
  onClick: () => void;
}

export function TutorialCard({ tutorial, onClick }: TutorialCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/20';
      case 'intermediate':
        return 'bg-[#fcba28]/20 text-[#fcba28] border-[#fcba28]/20';
      case 'advanced':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/20';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/20';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#fcba28] mb-2">
              <span className="text-sm font-medium">{tutorial.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#fcba28] transition-colors duration-300 mb-2">
              {tutorial.title}
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              by {tutorial.author.name} · {tutorial.author.role}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-6 line-clamp-2">
          {tutorial.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FaClock className="text-[#fcba28]" />
            <span>{tutorial.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaGraduationCap className="text-[#fcba28]" />
            <span>{tutorial.lessons} lessons</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaStar className="text-[#fcba28]" />
            <span>{tutorial.rating}/5</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tutorial.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Difficulty Badge */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
        </div>

        {/* Start Button */}
        <motion.button
          onClick={onClick}
          className="w-full px-4 py-3 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl font-medium shadow-lg shadow-[#fcba28]/25 hover:shadow-[#fcba28]/40 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaPlay className="w-4 h-4" />
          Start Tutorial
        </motion.button>
      </div>
    </motion.div>
  );
}
