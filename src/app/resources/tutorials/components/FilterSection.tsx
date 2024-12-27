'use client';

import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface FilterSectionProps {
  categories: string[];
  difficulties: string[];
  selectedCategory: string;
  selectedDifficulty: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export function FilterSection({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
  onClearFilters,
}: FilterSectionProps) {
  const hasActiveFilters = selectedCategory || selectedDifficulty || searchQuery;

  return (
    <div className="w-full space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search tutorials..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* Filter Categories */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Categories</h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-sm text-[#fcba28] hover:text-[#fcd978] flex items-center gap-2"
            >
              <FaTimes />
              Clear Filters
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Difficulty Filters */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Difficulty</h3>
        <div className="flex flex-wrap gap-2">
          {difficulties.map((difficulty) => (
            <motion.button
              key={difficulty}
              onClick={() => onDifficultyChange(difficulty)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedDifficulty === difficulty
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {difficulty}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                {selectedCategory}
              </span>
            )}
            {selectedDifficulty && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                {selectedDifficulty}
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                Search: {searchQuery}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
