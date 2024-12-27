"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaCode,
  FaServer,
  FaDesktop,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaClock,
  FaStar,
  FaEye,
  FaGraduationCap,
  FaExternalLinkAlt,
  FaChevronRight,
  FaFilter,
  FaBookmark,
  FaPlay
} from 'react-icons/fa';
import { tutorialCategories, tutorials } from './data';
import type { Tutorial } from './data';

interface TutorialsPageProps {
  className?: string;
}

export default function TutorialsPage({ className = '' }: TutorialsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      FaCode,
      FaServer,
      FaDesktop,
      FaDatabase,
      FaCloud,
      FaShieldAlt
    };
    return icons[iconName] || FaCode;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      Beginner: '#00C48C',
      Intermediate: '#FF9F43',
      Advanced: '#FF6B6B'
    };
    return colors[difficulty as keyof typeof colors] || '#fcba28';
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || tutorial.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className={`min-h-screen bg-background-default text-white ${className}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background-paper py-20 px-4">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-gradient-to-b from-[#fcba28]/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Master Your
            <span className="bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-transparent bg-clip-text"> Interview Skills</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore our curated collection of expert-led tutorials covering everything from algorithms to system design
          </motion.p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-0 z-30 bg-background-default/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background-paper border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-background-paper text-white rounded-xl border border-white/10 hover:border-[#fcba28]/50 transition-all duration-300 flex items-center justify-center gap-2 md:w-auto"
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {tutorialCategories.map(category => {
                        const IconComponent = getIconComponent(category.icon);
                        return (
                          <motion.button
                            key={category.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCategory(
                              selectedCategory === category.id ? null : category.id
                            )}
                            className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                              selectedCategory === category.id
                                ? 'bg-[#fcba28] text-black font-medium'
                                : 'bg-background-elevated text-gray-300 hover:bg-white/10'
                            }`}
                            style={{
                              backgroundColor: selectedCategory === category.id ? category.color : undefined
                            }}
                          >
                            <IconComponent className="w-4 h-4" />
                            {category.name}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Difficulty</h3>
                    <div className="flex flex-wrap gap-2">
                      {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => (
                        <motion.button
                          key={difficulty}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedDifficulty(
                            selectedDifficulty === difficulty ? null : difficulty
                          )}
                          className={`px-4 py-2 rounded-lg text-sm transition-all ${
                            selectedDifficulty === difficulty
                              ? 'text-black font-medium'
                              : 'bg-background-elevated text-gray-300 hover:bg-white/10'
                          }`}
                          style={{
                            backgroundColor: selectedDifficulty === difficulty
                              ? getDifficultyColor(difficulty)
                              : undefined
                          }}
                        >
                          {difficulty}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-6">
          {filteredTutorials.map(tutorial => {
            const category = tutorialCategories.find(cat => cat.id === tutorial.category);
            const IconComponent = getIconComponent(category?.icon || 'FaCode');

            return (
              <motion.div
                key={tutorial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative bg-background-paper rounded-2xl overflow-hidden border border-white/10 hover:border-[#fcba28]/50 transition-all"
              >
                <div className="absolute top-4 right-4 z-10">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-full bg-black/50 text-[#fcba28] hover:bg-[#fcba28] hover:text-black transition-all"
                  >
                    <FaBookmark className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${category?.color}20` || '#fcba28',
                            color: category?.color || '#fcba28'
                          }}
                        >
                          <IconComponent className="inline-block mr-2 w-4 h-4" />
                          {category?.name}
                        </div>
                        <div
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: `${getDifficultyColor(tutorial.difficulty)}20`,
                            color: getDifficultyColor(tutorial.difficulty)
                          }}
                        >
                          {tutorial.difficulty}
                        </div>
                      </div>

                      <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-[#fcba28] transition-colors">
                        {tutorial.title}
                      </h2>
                      <p className="text-gray-400 mb-4">by {tutorial.author}</p>
                      <p className="text-gray-300 mb-6">{tutorial.description}</p>

                      <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <FaClock className="w-4 h-4" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <FaStar className="w-4 h-4 text-[#fcba28]" />
                          {tutorial.rating} Rating
                        </div>
                        <div className="flex items-center gap-2">
                          <FaEye className="w-4 h-4" />
                          {tutorial.views.toLocaleString()} Views
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-auto flex flex-col gap-4">
                      <a
                        href={tutorial.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 font-medium w-full md:w-auto"
                      >
                        <FaPlay className="w-4 h-4" /> Start Tutorial
                      </a>
                      <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-background-elevated text-white rounded-xl hover:bg-white/10 transition-all duration-300 w-full md:w-auto">
                        <FaChevronRight className="w-4 h-4" /> Learn More
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex flex-wrap gap-2">
                      {tutorial.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full text-sm bg-background-elevated text-gray-300"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
