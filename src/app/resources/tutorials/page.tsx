"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { tutorialCategories, tutorials } from './data';
import { TutorialCard } from './components/TutorialCard';
import { FilterSection } from './components/FilterSection';
import { HeroBackground } from './components/HeroBackground';

interface TutorialsPageProps {
  params?: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default function TutorialsPage(props: TutorialsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSelectedDifficulty('');
    setSearchQuery('');
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || tutorial.category === selectedCategory;
    const matchesDifficulty = !selectedDifficulty || tutorial.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const categories = [...new Set(tutorials.map(tutorial => tutorial.category))];
  const difficulties = [...new Set(tutorials.map(tutorial => tutorial.difficulty))];

  return (
    <div className="min-h-screen bg-background-default text-white">
      {/* Hero Section with Background */}
      <div className="relative overflow-hidden bg-background-paper py-20 px-4">
        <HeroBackground />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Master Your
            <span className="bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-transparent bg-clip-text"> Interview Skills</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Explore our curated collection of expert-led tutorials covering everything from algorithms to system design
          </motion.p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="sticky top-0 z-30 bg-background-default/80 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-background-paper border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-background-paper text-white rounded-xl border border-white/10 hover:border-[#fcba28]/50 transition-all duration-300 flex items-center justify-center gap-2 md:w-auto"
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-4">
                  <FilterSection
                    categories={categories}
                    difficulties={difficulties}
                    selectedCategory={selectedCategory}
                    selectedDifficulty={selectedDifficulty}
                    searchQuery={searchQuery}
                    onCategoryChange={setSelectedCategory}
                    onDifficultyChange={setSelectedDifficulty}
                    onSearchChange={setSearchQuery}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Tutorials Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutorials.map(tutorial => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onClick={() => window.open(tutorial.url, '_blank')}
            />
          ))}
        </div>
        
        {filteredTutorials.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold text-gray-400 mb-4">No tutorials found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}
