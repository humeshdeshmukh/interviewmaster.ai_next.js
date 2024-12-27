'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Users, MapPin, Trophy, Clock, ExternalLink, Globe, Gift, ChevronRight } from 'lucide-react';
import { hackathons, categories, difficulties, type Hackathon } from './data';

export default function HackathonsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const filteredHackathons = hackathons.filter(hackathon => {
    const categoryMatch = selectedCategory === 'all' || 
                        hackathon.tracks.some(track => track.name.toLowerCase().includes(selectedCategory)) ||
                        hackathon.tags.some(tag => tag.toLowerCase().includes(selectedCategory));
    const difficultyMatch = selectedDifficulty === 'all' || 
                          hackathon.difficulty.toLowerCase().includes(selectedDifficulty);
    return categoryMatch && difficultyMatch;
  });

  const renderHackathon = (hackathon: Hackathon) => {
    return (
      <motion.div
        key={hackathon.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10 group"
      >
        {/* Background gradient effects */}
        <div className="absolute inset-0 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2805_0%,transparent_65%)] blur-xl" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={hackathon.organizer.logo}
                  alt={hackathon.organizer.name}
                  className="w-8 h-8"
                />
                <h3 className="font-semibold text-xl text-white">{hackathon.title}</h3>
              </div>
              <p className="text-sm text-gray-300">
                Organized by {hackathon.organizer.name}
              </p>
            </div>
            {hackathon.featured && (
              <span className="px-3 py-1 bg-[#fcba28] text-black text-sm font-medium rounded-full shadow-[0_0_15px_rgba(252,186,40,0.35)]">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{hackathon.description}</p>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(hackathon.startDate), 'MMM d')} - {format(new Date(hackathon.endDate), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Trophy className="w-4 h-4" />
              <span>{hackathon.prizes.total} in Prizes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>
                {hackathon.location.type === 'online' ? 'Online' : 
                 hackathon.location.type === 'hybrid' ? 'Hybrid' :
                 `${hackathon.location.city}, ${hackathon.location.country}`}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span>{hackathon.stats.teams} Teams</span>
            </div>
          </div>

          {/* Tracks */}
          <div className="flex flex-wrap gap-2 mb-6">
            {hackathon.tracks.map(track => (
              <div
                key={track.name}
                className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:border-[#fcba28]/50 transition-colors"
              >
                <span>{track.icon}</span>
                <span>{track.name}</span>
              </div>
            ))}
          </div>

          {/* Sponsors */}
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-2">Sponsored by</p>
            <div className="flex gap-4">
              {hackathon.sponsors.map(sponsor => (
                <img
                  key={sponsor.name}
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-6 opacity-75 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            {/* Stats */}
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-lg font-semibold text-[#fcba28]">{hackathon.stats.participants}</p>
                <p className="text-xs text-gray-400">Participants</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-[#fcba28]">{hackathon.stats.countries}</p>
                <p className="text-xs text-gray-400">Countries</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-[#fcba28]">{hackathon.stats.submissions}</p>
                <p className="text-xs text-gray-400">Submissions</p>
              </div>
            </div>

            {/* Action Button */}
            <button 
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all
                ${hackathon.registrationOpen 
                  ? 'bg-[#fcba28] text-black hover:bg-[#fcba28]/90 shadow-[0_0_15px_rgba(252,186,40,0.25)] hover:shadow-[0_0_25px_rgba(252,186,40,0.35)] group-hover:shadow-[0_0_35px_rgba(252,186,40,0.4)]'
                  : 'bg-gray-700 text-gray-300'}`}
            >
              {hackathon.registrationOpen ? (
                <>Register Now <ChevronRight className="w-4 h-4" /></>
              ) : (
                'Registration Closed'
              )}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
            Tech Hackathons
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join exciting hackathons, build innovative projects, and compete for prizes while learning from the best in tech.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Active Hackathons', value: hackathons.filter(h => h.registrationOpen).length },
            { label: 'Total Prize Pool', value: '$80,000+' },
            { label: 'Global Participants', value: '2,500+' },
            { label: 'Partner Companies', value: '15+' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-4 text-center backdrop-blur-lg border border-white/10">
              <p className="text-2xl font-bold text-[#fcba28] mb-1">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col sm:flex-row gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28] border border-white/10"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value} className="bg-gray-900">
              {category.label}
            </option>
          ))}
        </select>
        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28] border border-white/10"
        >
          {difficulties.map(difficulty => (
            <option key={difficulty.value} value={difficulty.value} className="bg-gray-900">
              {difficulty.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hackathons Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredHackathons.map(renderHackathon)}
      </div>
    </div>
  );
}
