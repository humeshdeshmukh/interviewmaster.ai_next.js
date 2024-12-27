"use client";

import { Suspense, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaRobot } from 'react-icons/fa';
import { useTest } from './context/TestContext';
import AITestForm from './components/AITestGenerator/AITestForm';
import { TestLoader } from './utils/testLoader';
import LoadingSpinner from './components/LoadingSpinner';
import TestContainer from './components/TestInterface/TestContainer';
import TestSearch from './components/TestSearch';
import { Category, Test } from './utils/types';

function PracticeTestsContent() {
  const { state, dispatch } = useTest();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tests, setTests] = useState<Test[]>([]);

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
    // Find the first subcategory of the selected category
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

  if (state.selectedTest) {
    return <TestContainer />;
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Practice Tests
          </h1>
          <p className="text-xl text-gray-300">
            Master your skills with our comprehensive collection of tests
          </p>
        </motion.div>

        {/* Search Bar */}
        <TestSearch tests={tests} onTestSelect={handleTestSelect} />

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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Static Tests Section */}
              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-[#fcba28]/20">
                      <FaCode className="w-6 h-6 text-[#fcba28]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#fcba28]">Practice Tests</h3>
                      <p className="text-gray-300">Choose from our curated collection of tests</p>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`p-4 rounded-xl text-center transition-all duration-300 ${
                          selectedCategory === category.id
                            ? 'bg-[#fcba28] text-black'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>

                  {/* Test List */}
                  {selectedCategory && tests.length > 0 && (
                    <div className="space-y-3">
                      {tests.map((test) => (
                        <motion.button
                          key={test.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          onClick={() => handleTestSelect(test)}
                          className="w-full p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-all text-left group"
                        >
                          <h4 className="font-medium text-white group-hover:text-[#fcba28] transition-colors">
                            {test.title}
                          </h4>
                          <p className="text-sm text-gray-300 mt-1">{test.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-[#fcba28]">{test.difficulty}</span>
                            <span className="text-gray-300">{test.totalQuestions} questions</span>
                            <span className="text-gray-300">{test.timeLimit} minutes</span>
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* AI Test Generator Section */}
              <div>
                <AITestForm />
              </div>
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
