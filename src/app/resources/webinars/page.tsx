"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaCalendarAlt, FaUsers, FaClock, FaGraduationCap } from "react-icons/fa";
import { webinars, webinarCategories } from "./data";
import { WebinarCard } from "./components/WebinarCard";
import { FilterSection } from "./components/FilterSection";
import { isUpcoming } from "./utils";

export default function Webinars() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory("");
    setSelectedLevel("");
    setSearchQuery("");
    setShowUpcomingOnly(false);
  };

  const filteredWebinars = webinars.filter((webinar) => {
    const matchesSearch =
      webinar.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      webinar.speaker.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || webinar.category === selectedCategory;
    const matchesLevel = !selectedLevel || webinar.level === selectedLevel;
    const matchesUpcoming = !showUpcomingOnly || isUpcoming(webinar.date);
    return matchesSearch && matchesCategory && matchesLevel && matchesUpcoming;
  });

  const levels = [...new Set(webinars.map(webinar => webinar.level))];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text"
          >
            Expert-Led Interview Prep
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-4"
          >
            Join live webinars with industry experts from top tech companies to master technical interviews and advance your career
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 text-sm text-[#fcba28]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fcba28] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#fcba28]"></span>
            </span>
            <span>New webinars coming soon in January 2024</span>
          </motion.div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: FaCalendarAlt, label: 'Upcoming Webinars', value: webinars.length },
            { icon: FaUsers, label: 'Expert Speakers', value: '20+' },
            { icon: FaClock, label: 'Hours of Content', value: '40+' },
            { icon: FaGraduationCap, label: 'Success Rate', value: '95%' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden group p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-lg"
            >
              {/* Background effects */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Content */}
              <div className="relative">
                <stat.icon className="w-8 h-8 text-[#fcba28] mb-4" />
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search webinars..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-white/5 text-white rounded-xl border border-white/10 hover:border-[#fcba28]/50 transition-all duration-300 flex items-center justify-center gap-2 md:w-auto"
            >
              <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
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
                    categories={webinarCategories}
                    levels={levels}
                    selectedCategory={selectedCategory}
                    selectedLevel={selectedLevel}
                    searchQuery={searchQuery}
                    showUpcomingOnly={showUpcomingOnly}
                    onCategoryChange={setSelectedCategory}
                    onLevelChange={setSelectedLevel}
                    onSearchChange={setSearchQuery}
                    onUpcomingChange={setShowUpcomingOnly}
                    onClearFilters={handleClearFilters}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Webinars Grid */}
        <AnimatePresence mode="wait">
          {filteredWebinars.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-400">No webinars found matching your criteria</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredWebinars.map((webinar) => (
                <WebinarCard
                  key={webinar.id}
                  webinar={webinar}
                  onClick={() => window.open(webinar.registrationUrl, '_blank')}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
