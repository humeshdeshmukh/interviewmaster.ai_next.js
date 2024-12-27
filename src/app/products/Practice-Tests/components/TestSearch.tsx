"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { Test } from '../utils/testLoader';

interface TestSearchProps {
  tests: Test[];
  onTestSelect: (test: Test) => void;
}

export default function TestSearch({ tests, onTestSelect }: TestSearchProps) {
  const [query, setQuery] = useState('');
  const [filteredTests, setFilteredTests] = useState<Test[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setFilteredTests([]);
      return;
    }

    const searchTerms = query.toLowerCase().split(' ');
    const filtered = tests.filter(test => {
      const searchText = `${test.title} ${test.description} ${test.difficulty}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });

    setFilteredTests(filtered);
  }, [query, tests]);

  const handleTestClick = (test: Test) => {
    onTestSelect(test);
    setQuery('');
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowDropdown(true);
          }}
          placeholder="Search tests by title, description, or difficulty..."
          className="w-full px-4 py-3 pl-12 pr-10 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] focus:ring-1 focus:ring-[#fcba28]"
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setShowDropdown(false);
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            <FaTimes />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showDropdown && filteredTests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 w-full mt-2 bg-gray-900 border border-white/10 rounded-lg shadow-lg overflow-hidden"
        >
          <div className="max-h-96 overflow-y-auto">
            {filteredTests.map((test) => (
              <button
                key={test.id}
                onClick={() => handleTestClick(test)}
                className="w-full px-4 py-3 text-left hover:bg-white/5 border-b border-white/5 last:border-0"
              >
                <h4 className="font-medium text-white">{test.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{test.description}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-[#fcba28]">{test.difficulty}</span>
                  <span className="text-gray-400">{test.totalQuestions} questions</span>
                  <span className="text-gray-400">{test.timeLimit} minutes</span>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
