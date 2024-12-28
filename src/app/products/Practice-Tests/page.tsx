"use client";

import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaRobot, FaSearch, FaFilter, FaClock, FaChartBar, FaGraduationCap, FaLightbulb } from 'react-icons/fa';
import { useTest } from './context/TestContext';
import AITestForm from './components/AITestGenerator/AITestForm';
import { TestLoader } from './utils/testLoader';
import LoadingSpinner from './components/LoadingSpinner';
import TestContainer from './components/TestInterface/TestContainer';
import TestSearch from './components/TestSearch';
import { Category, Test } from './utils/types';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function PracticeTestsContent() {
  const { state, dispatch } = useTest();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<Test[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filter, setFilter] = useState({
    difficulty: 'all',
    duration: 'all'
  });

  useEffect(() => {
    loadCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && selectedSubcategory) {
      loadTests(selectedCategory, selectedSubcategory);
    }
  }, [selectedCategory, selectedSubcategory]);

  const loadCategories = async () => {
    try {
      const testLoader = TestLoader.getInstance();
      const cats = await testLoader.getCategories();
      setCategories(cats);
      setLoading(false);
    } catch (error) {
      setError('Failed to load test categories');
      setLoading(false);
    }
  };

  const loadTests = async (categoryId: string, subcategoryId: string) => {
    try {
      setLoading(true);
      const testLoader = TestLoader.getInstance();
      const testCategory = await testLoader.loadTestsForCategory(categoryId, subcategoryId);
      if (testCategory) {
        setTests(testCategory.tests);
        dispatch({ type: 'SET_TESTS', payload: testCategory.tests });
      } else {
        setTests([]);
        setError('No tests found for this category');
      }
    } catch (error) {
      console.error('Error loading tests:', error);
      setError('Failed to load tests');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const category = categories.find(c => c.id === categoryId);
    if (category && category.subcategories.length > 0) {
      setSelectedSubcategory(category.subcategories[0].id);
    }
    dispatch({ type: 'CLEAR_SELECTED_TEST' });
  };

  const handleTestSelect = (test: Test) => {
    dispatch({ type: 'SELECT_TEST', payload: test });
    dispatch({ type: 'SET_MODE', payload: 'question' });
  };

  const filteredTests = tests.filter(test => {
    if (filter.difficulty !== 'all' && test.difficulty !== filter.difficulty) return false;
    if (filter.duration !== 'all') {
      const duration = parseInt(filter.duration);
      if (test.timeLimit > duration) return false;
    }
    return true;
  });

  if (state.selectedTest) {
    return <TestContainer />;
  }

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-[#fcba28]/5" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#fcba28]/20 to-[#fcd978]/20 backdrop-blur-sm">
              <FaGraduationCap className="w-12 h-12 text-[#fcba28]" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text"
          >
            Practice Tests
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-12"
          >
            Master your skills with our comprehensive collection of tests and AI-powered practice sessions
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-3 gap-8 max-w-3xl mx-auto p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fcba28]">{tests.length}</div>
              <div className="text-sm text-gray-400">Practice Tests</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-3xl font-bold text-[#fcba28]">∞</div>
              <div className="text-sm text-gray-400">AI Generated Tests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#fcba28]">{categories.length}</div>
              <div className="text-sm text-gray-400">Categories</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <TestSearch tests={tests} onTestSelect={handleTestSelect} />
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setView(view === 'grid' ? 'list' : 'grid')}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 flex items-center gap-2"
              >
                <FaFilter className="w-4 h-4" />
                {view === 'grid' ? 'Grid View' : 'List View'}
              </motion.button>
              <select
                value={filter.difficulty}
                onChange={(e) => setFilter({ ...filter, difficulty: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 cursor-pointer"
              >
                <option value="all">All Difficulties</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
              <select
                value={filter.duration}
                onChange={(e) => setFilter({ ...filter, duration: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 backdrop-blur-sm border border-white/10 cursor-pointer"
              >
                <option value="all">All Durations</option>
                <option value="30">30 mins or less</option>
                <option value="60">60 mins or less</option>
                <option value="90">90 mins or less</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-12"
            >
              <LoadingSpinner />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              {...fadeInUp}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Categories and Tests */}
              <div className="lg:col-span-2 space-y-8">
                {/* Categories */}
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-xl bg-[#fcba28]/20">
                        <FaLightbulb className="w-6 h-6 text-[#fcba28]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-[#fcba28]">Test Categories</h3>
                        <p className="text-gray-400">Select a category to begin</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 rounded-xl text-center transition-all duration-300 backdrop-blur-sm ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-medium shadow-lg shadow-[#fcba28]/20'
                            : 'bg-white/5 text-gray-300 hover:border-[#fcba28]/30 border border-white/10'
                        }`}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tests */}
                {selectedCategory && filteredTests.length > 0 && (
                  <motion.div {...fadeInUp} transition={{ delay: 0.3 }} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">Available Tests</h3>
                      <span className="text-gray-400">{filteredTests.length} tests</span>
                    </div>

                    <div className={view === 'grid' ? 'grid sm:grid-cols-2 gap-4' : 'space-y-4'}>
                      {filteredTests.map((test) => (
                        <motion.button
                          key={test.id}
                          {...fadeInUp}
                          whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleTestSelect(test)}
                          className="w-full p-6 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:border-[#fcba28]/30 transition-all text-left group"
                        >
                          <h4 className="font-medium text-white group-hover:text-[#fcba28] transition-colors">
                            {test.title}
                          </h4>
                          <p className="text-sm text-gray-400 mt-2 line-clamp-2">{test.description}</p>
                          <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                            <span className="px-3 py-1 rounded-full bg-[#fcba28]/20 text-[#fcba28] border border-[#fcba28]/30">
                              {test.difficulty}
                            </span>
                            <span className="flex items-center text-gray-400">
                              <FaChartBar className="mr-2 w-4 h-4" /> {test.totalQuestions} questions
                            </span>
                            <span className="flex items-center text-gray-400">
                              <FaClock className="mr-2 w-4 h-4" /> {test.timeLimit} mins
                            </span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* AI Test Generator */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="lg:col-span-1"
              >
                <AITestForm />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function PracticeTests() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PracticeTestsContent />
    </Suspense>
  );
}
