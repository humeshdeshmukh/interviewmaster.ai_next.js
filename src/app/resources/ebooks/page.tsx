"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaDownload,
  FaStar,
  FaCode,
  FaServer,
  FaDesktop,
  FaDatabase,
  FaUserTie,
  FaBook,
  FaClock,
  FaLanguage,
  FaFile,
  FaTag
} from 'react-icons/fa';
import { ebookCategories, ebooks } from './data';
import type { Ebook } from './data';

interface EbooksPageProps {
  className?: string;
}

export default function EbooksPage({ className = '' }: EbooksPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedEbook, setSelectedEbook] = useState<Ebook | null>(null);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      FaCode,
      FaServer,
      FaDesktop,
      FaDatabase,
      FaUserTie
    };
    return icons[iconName] || FaBook;
  };

  const filteredEbooks = ebooks.filter(ebook => {
    const matchesSearch = ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || ebook.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderEbookCard = (ebook: Ebook) => {
    const category = ebookCategories.find(cat => cat.id === ebook.category);
    const IconComponent = getIconComponent(category?.icon || 'FaBook');

    return (
      <motion.div
        key={ebook.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`bg-background-paper p-6 rounded-xl border border-white/10 hover:border-[#fcba28]/50 transition-all cursor-pointer hover:shadow-lg ${className}`}
        onClick={() => setSelectedEbook(ebook)}
      >
        <div className="flex items-start gap-6">
          <div className="w-32 h-40 rounded-lg overflow-hidden bg-background-elevated flex items-center justify-center">
            {ebook.coverImage ? (
              <img
                src={ebook.coverImage}
                alt={ebook.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <FaBook className="w-12 h-12 text-[#fcba28]" />
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {ebook.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">by {ebook.author}</p>
              </div>
              <div
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: `${category?.color}20` || '#fcba28',
                  color: category?.color || '#fcba28',
                  border: `1px solid ${category?.color}40` || '#fcba28'
                }}
              >
                <IconComponent className="inline-block mr-1 w-3 h-3" />
                {category?.name}
              </div>
            </div>
            <p className="text-sm text-gray-300 mb-4 line-clamp-2">
              {ebook.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <FaStar className="w-4 h-4 text-[#fcba28]" />
                {ebook.rating}
              </div>
              <div className="flex items-center gap-1">
                <FaDownload className="w-4 h-4" />
                {ebook.downloads.toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <FaFile className="w-4 h-4" />
                {ebook.format}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const renderEbookModal = () => {
    if (!selectedEbook) return null;

    const category = ebookCategories.find(cat => cat.id === selectedEbook.category);
    const IconComponent = getIconComponent(category?.icon || 'FaBook');

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedEbook(null)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-background-paper p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex gap-8">
            <div className="w-48 h-64 rounded-lg overflow-hidden bg-background-elevated flex items-center justify-center">
              {selectedEbook.coverImage ? (
                <img
                  src={selectedEbook.coverImage}
                  alt={selectedEbook.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaBook className="w-16 h-16 text-[#fcba28]" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedEbook.title}
              </h2>
              <p className="text-lg text-gray-400 mb-4">by {selectedEbook.author}</p>
              <div
                className="inline-block px-3 py-1 rounded-full text-sm mb-4"
                style={{
                  backgroundColor: `${category?.color}20` || '#fcba28',
                  color: category?.color || '#fcba28',
                  border: `1px solid ${category?.color}40` || '#fcba28'
                }}
              >
                <IconComponent className="inline-block mr-1 w-3 h-3" />
                {category?.name}
              </div>
              <p className="text-gray-300 mb-6">{selectedEbook.description}</p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <FaFile className="w-4 h-4" />
                  <span>{selectedEbook.format}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaClock className="w-4 h-4" />
                  <span>{selectedEbook.pages} pages</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaLanguage className="w-4 h-4" />
                  <span>{selectedEbook.language}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <FaDownload className="w-4 h-4" />
                  <span>{selectedEbook.downloads.toLocaleString()} downloads</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedEbook.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-sm bg-background-elevated text-gray-300"
                  >
                    <FaTag className="inline-block mr-1 w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={selectedEbook.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 font-medium"
              >
                <FaDownload /> Download Ebook
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <div className={`min-h-screen bg-background-default text-white pt-20 px-4 md:px-8 ${className}`}>
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Interview Preparation Ebooks
          </h1>
          <p className="text-xl text-gray-300">
            Curated collection of high-quality ebooks to ace your tech interviews
          </p>
        </motion.div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search ebooks by title, author, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background-paper border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
            />
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-lg text-sm transition-all ${
              !selectedCategory
                ? 'bg-[#fcba28] text-black font-medium'
                : 'bg-background-paper text-gray-300 hover:bg-white/10'
            }`}
          >
            All Categories
          </motion.button>
          {ebookCategories.map(category => {
            const IconComponent = getIconComponent(category.icon);
            return (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  selectedCategory === category.id
                    ? 'bg-[#fcba28] text-black font-medium'
                    : 'bg-background-paper text-gray-300 hover:bg-white/10'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                {category.name}
              </motion.button>
            );
          })}
        </div>

        {/* Ebooks Grid */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          {filteredEbooks.map(renderEbookCard)}
        </div>

        {/* Ebook Modal */}
        <AnimatePresence>
          {renderEbookModal()}
        </AnimatePresence>
      </div>
    </div>
  );
}
