'use client';

import { motion } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

interface FilterSectionProps {
  categories: string[];
  levels: string[];
  selectedCategory: string;
  selectedLevel: string;
  searchQuery: string;
  showUpcomingOnly: boolean;
  onCategoryChange: (category: string) => void;
  onLevelChange: (level: string) => void;
  onSearchChange: (query: string) => void;
  onUpcomingChange: (value: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSection({
  categories,
  levels,
  selectedCategory,
  selectedLevel,
  searchQuery,
  showUpcomingOnly,
  onCategoryChange,
  onLevelChange,
  onSearchChange,
  onUpcomingChange,
  onClearFilters,
}: FilterSectionProps) {
  const hasActiveFilters = selectedCategory || selectedLevel || searchQuery || showUpcomingOnly;

  return (
    <div className="w-full space-y-6">
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {selectedCategory && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                {selectedCategory}
              </span>
            )}
            {selectedLevel && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                {selectedLevel}
              </span>
            )}
            {showUpcomingOnly && (
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                Upcoming Only
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 bg-[#fcba28]/20 text-[#fcba28] rounded-full text-sm">
                Search: {searchQuery}
              </span>
            )}
          </div>
          <button
            onClick={onClearFilters}
            className="text-sm text-[#fcba28] hover:text-[#fcd978] flex items-center gap-2"
          >
            <FaTimes />
            Clear Filters
          </button>
        </div>
      )}

      {/* Filter Categories */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Categories</h3>
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

      {/* Experience Level */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white">Experience Level</h3>
        <div className="flex flex-wrap gap-2">
          {levels.map((level) => (
            <motion.button
              key={level}
              onClick={() => onLevelChange(level)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedLevel === level
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {level}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Upcoming Filter */}
      <div className="flex items-center space-x-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={showUpcomingOnly}
            onChange={(e) => onUpcomingChange(e.target.checked)}
          />
          <div className="w-11 h-6 bg-white/5 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#fcba28]"></div>
          <span className="ms-3 text-sm font-medium text-gray-400">Show Upcoming Only</span>
        </label>
      </div>
    </div>
  );
}
