"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { Question } from './types';
import { technicalQuestions, behavioralQuestions } from './data/index';
import { QuestionCard } from './components/QuestionCard';
import { QuestionModal } from './components/QuestionModal';
import { FilterDropdown } from './components/FilterDropdown';
import { useQuestions } from './hooks/useQuestions';

const InterviewQuestions: React.FC = () => {
  // Combine all questions
  const allQuestions = [...technicalQuestions, ...behavioralQuestions];
  
  const {
    questions: filteredQuestions,
    filters,
    updateFilters,
    clearFilters,
    sort,
    updateSort
  } = useQuestions({ initialQuestions: allQuestions });

  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState<boolean>(false);

  const handleBookmark = (id: number) => {
    const updatedQuestions = allQuestions.map(q =>
      q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
    );
    // Update the questions in your data store or localStorage here
  };

  // Get unique companies and categories
  const companies = ['All', ...new Set(allQuestions.filter(q => q.company).map(q => q.company!))];
  const categories = ['All', ...new Set(allQuestions.map(q => q.category))];
  const types = ['All', 'Tech', 'Non-Tech'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Interview Questions</h1>
        <p className="text-gray-400 mb-8">Practice with our curated list of technical and behavioral interview questions.</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 min-w-[300px]">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={filters.searchQuery || ''}
                onChange={(e) => updateFilters({ searchQuery: e.target.value })}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#fcba28] transition-colors"
              />
            </div>
          </div>

          {/* Type Filter */}
          <FilterDropdown
            label="Type"
            options={types}
            value={filters.type || 'All'}
            onChange={(value) => updateFilters({ type: value === 'All' ? undefined : value })}
            isOpen={isCategoryDropdownOpen}
            setIsOpen={setIsCategoryDropdownOpen}
          />

          {/* Category Filter */}
          <FilterDropdown
            label="Category"
            options={categories}
            value={filters.category || 'All'}
            onChange={(value) => updateFilters({ category: value === 'All' ? undefined : value })}
            isOpen={isCategoryDropdownOpen}
            setIsOpen={setIsCategoryDropdownOpen}
          />

          {/* Company Filter */}
          <FilterDropdown
            label="Company"
            options={companies}
            value={filters.company || 'All'}
            onChange={(value) => updateFilters({ company: value === 'All' ? undefined : value })}
            isOpen={isCompanyDropdownOpen}
            setIsOpen={setIsCompanyDropdownOpen}
          />

          {/* Difficulty Filter */}
          <FilterDropdown
            label="Difficulty"
            options={difficulties}
            value={filters.difficulty || 'All'}
            onChange={(value) => updateFilters({ difficulty: value === 'All' ? undefined : value })}
            isOpen={false}
            setIsOpen={() => {}}
          />

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-[#fcba28] hover:text-[#fcd167] transition-colors"
          >
            Clear Filters
          </button>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              onBookmark={handleBookmark}
              onViewDetails={setSelectedQuestion}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No questions found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Question Modal */}
      {selectedQuestion && (
        <QuestionModal
          question={selectedQuestion}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
};

export default InterviewQuestions;
