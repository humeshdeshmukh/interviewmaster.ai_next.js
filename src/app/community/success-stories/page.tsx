"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
  FaClock,
  FaStar,
  FaChartLine,
  FaUserFriends,
  FaGraduationCap,
  FaTrophy,
  FaChevronRight,
} from "react-icons/fa";
import { successStories, categories, companies, experienceLevels } from './data';
import type { SuccessStory } from './data';

export default function SuccessStoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredStories = successStories.filter((story) => {
    if (selectedCompany !== 'all' && story.company.name.toLowerCase() !== selectedCompany) return false;
    // Add more filters as needed
    return true;
  });

  const renderSuccessStory = (story: SuccessStory) => {
    return (
      <motion.div
        key={story.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className={`bg-black/20 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 ${
          story.featured ? 'ring-2 ring-[#fcba28]' : ''
        }`}
      >
        {story.featured && (
          <div className="bg-[#fcba28] text-black px-4 py-1 text-sm font-medium">
            Featured Story
          </div>
        )}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#fcba28]/20 flex items-center justify-center overflow-hidden">
                {story.avatar ? (
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserFriends className="w-8 h-8 text-[#fcba28]" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 p-1 rounded-full" style={{ backgroundColor: story.company.color }}>
                <img
                  src={story.company.logo}
                  alt={story.company.name}
                  className="w-4 h-4"
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{story.name}</h3>
              <p className="text-white/60">
                {story.role} at <span className="text-white">{story.company.name}</span>
              </p>
              {story.previousRole && (
                <p className="text-sm text-white/40">
                  Previously: {story.previousRole} at {story.previousCompany}
                </p>
              )}
            </div>
          </div>

          {/* Story */}
          <p className="text-white/70 mb-6">{story.story}</p>

          {/* Interview Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center text-[#fcba28] mb-2">
                <FaClock className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Preparation</span>
              </div>
              <p className="text-white">{story.interview.preparation}</p>
            </div>
            <div className="p-3 bg-white/5 rounded-lg">
              <div className="flex items-center text-[#fcba28] mb-2">
                <FaStar className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Difficulty</span>
              </div>
              <p className="text-white">{story.interview.difficulty}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {story.metrics.practiceHours}h
              </div>
              <p className="text-sm text-white/40">Practice</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-1">
                {story.metrics.mockInterviews}
              </div>
              <p className="text-sm text-white/40">Mock Interviews</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#fcba28] mb-1">
                +{story.metrics.offerIncrease}
              </div>
              <p className="text-sm text-white/40">Offer Increase</p>
            </div>
          </div>

          {/* Interview Topics */}
          <div className="mb-6">
            <div className="flex items-center text-[#fcba28] mb-3">
              <FaGraduationCap className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Interview Topics</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {story.interview.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/80"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="mb-6">
            <div className="flex items-center text-[#fcba28] mb-3">
              <FaTrophy className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Key Tips</span>
            </div>
            <ul className="space-y-2">
              {story.tips.map((tip, index) => (
                <li key={index} className="flex items-start text-sm text-white/70">
                  <span className="mr-2">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <div className="p-4 bg-white/5 rounded-lg mb-6">
            <p className="text-sm text-white/70 italic">"{story.testimonial}"</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-white/40">
              {new Date(story.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </div>
            <Button
              className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
              onClick={() => {}} // Add navigation to full story
            >
              Read Full Story <FaChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <MaxWidthWrapper>
        <section className="relative pt-20 pb-16">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Success Stories
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Discover how our community members landed their dream jobs at top tech companies
              through structured preparation and expert guidance.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">500+</div>
              <p className="text-sm text-white/60">Success Stories</p>
            </div>
            <div className="p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">85%</div>
              <p className="text-sm text-white/60">Offer Rate</p>
            </div>
            <div className="p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">75%</div>
              <p className="text-sm text-white/60">Avg. Salary Increase</p>
            </div>
            <div className="p-6 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10">
              <div className="text-3xl font-bold text-white mb-2">30+</div>
              <p className="text-sm text-white/60">Partner Companies</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {companies.map((company) => (
                <option key={company.value} value={company.value}>
                  {company.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Success Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredStories.map(renderSuccessStory)}
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
