'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ebooks } from './data';
import { EbookCard } from './components/EbookCard';
import { FilterBar } from './components/FilterBar';
import { FaBook, FaGraduationCap, FaUsers, FaStar } from 'react-icons/fa';

export default function EbooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Extract unique categories and difficulties
  const categories = useMemo(() => [
    { value: 'all', label: 'All Categories' },
    ...Array.from(new Set(ebooks.map(book => book.category)))
      .map(category => ({ value: category, label: category }))
  ], []);

  const difficulties = useMemo(() => [
    { value: 'all', label: 'All Levels' },
    ...Array.from(new Set(ebooks.map(book => book.difficulty)))
      .map(difficulty => ({ value: difficulty, label: difficulty }))
  ], []);

  // Filter and sort ebooks
  const filteredEbooks = useMemo(() => {
    return ebooks
      .filter(ebook => {
        if (selectedCategory !== 'all' && ebook.category !== selectedCategory) return false;
        if (selectedDifficulty !== 'all' && ebook.difficulty !== selectedDifficulty) return false;
        if (searchQuery) {
          const search = searchQuery.toLowerCase();
          return (
            ebook.title.toLowerCase().includes(search) ||
            ebook.description.toLowerCase().includes(search) ||
            ebook.category.toLowerCase().includes(search)
          );
        }
        return true;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return b.downloadCount - a.downloadCount;
          default: // popular
            return b.downloadCount - a.downloadCount;
        }
      });
  }, [selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const stats = useMemo(() => [
    {
      icon: <FaBook className="w-6 h-6" />,
      label: 'Total Resources',
      value: ebooks.length
    },
    {
      icon: <FaGraduationCap className="w-6 h-6" />,
      label: 'Skill Levels',
      value: difficulties.length - 1
    },
    {
      icon: <FaUsers className="w-6 h-6" />,
      label: 'Active Learners',
      value: '10,000+'
    },
    {
      icon: <FaStar className="w-6 h-6" />,
      label: 'Avg. Rating',
      value: '4.8/5'
    }
  ], [difficulties.length]);

  return (
    <div className="min-h-screen bg-background text-white pt-20 pb-20">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 mb-16">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              Interview Preparation
            </span>
            <br />
            Resources
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            Access our comprehensive collection of interview preparation materials, guides, and practice resources to help you succeed in your next interview.
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="p-6 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
              >
                <div className="text-[#fcba28] mb-3">{stat.icon}</div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="px-4 md:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            categories={categories}
            difficulties={difficulties}
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            searchQuery={searchQuery}
            sortBy={sortBy}
            onCategoryChange={setSelectedCategory}
            onDifficultyChange={setSelectedDifficulty}
            onSearchChange={setSearchQuery}
            onSortChange={setSortBy}
          />
        </div>
      </section>

      {/* Ebooks Grid */}
      <section className="px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredEbooks.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredEbooks.map((ebook) => (
                  <EbookCard key={ebook.id} ebook={ebook} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <div className="inline-block p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-xl">
                  <p className="text-xl text-gray-400 mb-4">
                    No resources found matching your criteria
                  </p>
                  <motion.button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedDifficulty('all');
                      setSortBy('popular');
                    }}
                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white/70 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Clear All Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
