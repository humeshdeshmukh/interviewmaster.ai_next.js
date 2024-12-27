'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaFilter, FaTimes, FaSearch, FaSortAmountDown } from 'react-icons/fa';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  categories: FilterOption[];
  difficulties: FilterOption[];
  selectedCategory: string;
  selectedDifficulty: string;
  searchQuery: string;
  sortBy: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
}

export function FilterBar({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  sortBy,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
  onSortChange,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
  ];

  return (
    <div className="relative z-10 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <motion.button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl text-white"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="flex items-center gap-2">
            <FaFilter className="text-[#fcba28]" />
            <span>Filters & Sort</span>
          </span>
          <motion.div
            animate={{ rotate: isFilterOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isFilterOpen ? <FaTimes /> : <FaFilter />}
          </motion.div>
        </motion.button>
      </div>

      {/* Filter Content */}
      <motion.div
        className={`lg:block ${isFilterOpen ? 'block' : 'hidden'}`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-6">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search ebooks..."
              className="w-full pl-11 pr-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Filter Options */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Categories */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value} className="bg-gray-900">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => onDifficultyChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty.value} value={difficulty.value} className="bg-gray-900">
                    {difficulty.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <label className="text-sm font-medium text-gray-400">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50 focus:border-[#fcba28] transition-all duration-300"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-900">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <div className="space-y-2 flex items-end">
              <motion.button
                onClick={() => {
                  onCategoryChange('all');
                  onDifficultyChange('all');
                  onSearchChange('');
                  onSortChange('popular');
                }}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-lg border border-white/10 rounded-xl text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear Filters
              </motion.button>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory !== 'all' || selectedDifficulty !== 'all' || searchQuery) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-wrap items-center gap-2 text-sm text-gray-400"
          >
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-lg">
                  {categories.find(c => c.value === selectedCategory)?.label}
                  <button
                    onClick={() => onCategoryChange('all')}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#fcba28]/10 text-[#fcba28] rounded-lg">
                  {difficulties.find(d => d.value === selectedDifficulty)?.label}
                  <button
                    onClick={() => onDifficultyChange('all')}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/5 text-white/70 rounded-lg">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => onSearchChange('')}
                    className="ml-1 hover:text-white transition-colors"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
