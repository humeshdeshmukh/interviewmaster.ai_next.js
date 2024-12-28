"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaSearch, FaFilter, FaClock, FaChartBar, FaLightbulb } from 'react-icons/fa';
import { useTest } from '../../context/TestContext';
import { TestLoader } from '../../utils/testLoader';
import LoadingSpinner from '../../components/LoadingSpinner';
import TestView from './components/TestView';
import { Test } from '../../utils/types';

interface StandardTestsPageProps {
  onBack: () => void;
}

export default function StandardTestsPage({ onBack }: StandardTestsPageProps) {
  const { state, dispatch } = useTest();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    difficulty: 'all',
    duration: 'all'
  });

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      const testLoader = TestLoader.getInstance();
      const categories = await testLoader.getCategories();
      dispatch({ type: 'SET_CATEGORIES', payload: categories });
      const tests = await testLoader.getAllTests();
      dispatch({ type: 'SET_TESTS', payload: tests });
    } catch (error) {
      console.error('Error loading tests:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load tests' });
    } finally {
      setLoading(false);
    }
  };

  const handleTestSelect = (test: Test) => {
    dispatch({ type: 'SET_SELECTED_TEST', payload: test });
  };

  const filteredTests = state.tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = filters.difficulty === 'all' || test.difficulty === filters.difficulty;
    const matchesDuration = filters.duration === 'all' ||
      (filters.duration === '30' && test.timeLimit <= 30) ||
      (filters.duration === '60' && test.timeLimit <= 60) ||
      (filters.duration === '90' && test.timeLimit <= 90);

    return matchesSearch && matchesDifficulty && matchesDuration;
  });

  if (state.selectedTest) {
    return <TestView test={state.selectedTest} onBack={() => dispatch({ type: 'CLEAR_SELECTED_TEST' })} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white mb-8"
        >
          <FaArrowLeft className="mr-2" />
          Back to Options
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Standard Practice Tests
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Choose from our curated collection of practice tests designed to help you excel in your interviews
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative mb-4">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search tests..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-[#fcba28] text-white placeholder-gray-400"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 flex items-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              {view === 'grid' ? 'Grid View' : 'List View'}
            </button>

            <select
              value={filters.difficulty}
              onChange={(e) => setFilters(prev => ({ ...prev, difficulty: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <select
              value={filters.duration}
              onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
              className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10"
            >
              <option value="all">All Durations</option>
              <option value="30">30 mins or less</option>
              <option value="60">60 mins or less</option>
              <option value="90">90 mins or less</option>
            </select>
          </div>
        </motion.div>

        {/* Test Grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`max-w-7xl mx-auto ${
              view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
            }`}
          >
            {filteredTests.map((test) => (
              <motion.div
                key={test.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleTestSelect(test)}
                className="cursor-pointer"
              >
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                  <h3 className="text-xl font-semibold mb-2">{test.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">{test.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      test.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      test.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {test.difficulty}
                    </span>
                    
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaChartBar className="w-4 h-4" />
                      {test.totalQuestions} questions
                    </span>
                    
                    <span className="flex items-center gap-2 text-gray-400 text-sm">
                      <FaClock className="w-4 h-4" />
                      {test.timeLimit} mins
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
