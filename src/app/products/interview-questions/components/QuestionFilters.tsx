import React from 'react';
import { QuestionCategory, QuestionType, QuestionDifficulty } from '../types.ts';

interface QuestionFiltersProps {
  selectedType?: QuestionType;
  selectedCategory?: QuestionCategory;
  selectedDifficulty?: QuestionDifficulty;
  searchQuery?: string;
  onTypeChange: (type?: QuestionType) => void;
  onCategoryChange: (category?: QuestionCategory) => void;
  onDifficultyChange: (difficulty?: QuestionDifficulty) => void;
  onSearchChange: (query: string) => void;
  onClearFilters: () => void;
}

export const QuestionFilters: React.FC<QuestionFiltersProps> = ({
  selectedType,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onTypeChange,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
  onClearFilters
}) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Type Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question Type
        </label>
        <select
          value={selectedType || ''}
          onChange={(e) => onTypeChange(e.target.value as QuestionType || undefined)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="Tech">Technical</option>
          <option value="Non-Tech">Non-Technical</option>
        </select>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(e.target.value as QuestionCategory || undefined)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {Object.values(QuestionCategory).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Difficulty
        </label>
        <select
          value={selectedDifficulty || ''}
          onChange={(e) => onDifficultyChange(e.target.value as QuestionDifficulty || undefined)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Clear Filters */}
      <button
        onClick={onClearFilters}
        className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
      >
        Clear Filters
      </button>
    </div>
  );
};
