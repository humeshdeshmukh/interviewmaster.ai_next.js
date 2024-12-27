"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
  FaStar,
  FaUserFriends,
  FaClock,
  FaGlobe,
  FaTrophy,
  FaChevronRight,
} from "react-icons/fa";
import { mockMentors, expertiseAreas, priceRanges, experienceLevels } from './data';
import type { Mentor } from './data';

export default function MentorshipPage() {
  const [selectedExpertise, setSelectedExpertise] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  const filteredMentors = mockMentors.filter((mentor) => {
    if (selectedExpertise !== 'all' && !mentor.expertise.includes(selectedExpertise as any)) return false;
    
    if (selectedPrice !== 'all') {
      const [min, max] = selectedPrice.split('-').map(Number);
      if (max) {
        if (mentor.hourlyRate < min || mentor.hourlyRate > max) return false;
      } else {
        if (min === 200 && mentor.hourlyRate < 200) return false;
        if (min === 0 && mentor.hourlyRate > 100) return false;
      }
    }

    if (selectedExperience !== 'all') {
      if (selectedExperience === '5-' && mentor.yearsOfExperience >= 5) return false;
      if (selectedExperience === '5-10' && (mentor.yearsOfExperience < 5 || mentor.yearsOfExperience > 10)) return false;
      if (selectedExperience === '10+' && mentor.yearsOfExperience <= 10) return false;
    }

    return true;
  });

  const renderMentorCard = (mentor: Mentor) => {
    const IconComponent = expertiseAreas.find(area => mentor.expertise.includes(area.value as any))?.icon;

    return (
      <motion.div
        key={mentor.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className={`bg-black/20 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 ${
          mentor.featured ? 'ring-2 ring-[#fcba28]' : ''
        }`}
      >
        {mentor.featured && (
          <div className="bg-[#fcba28] text-black px-4 py-1 text-sm font-medium">
            Featured Mentor
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-[#fcba28]/20 flex items-center justify-center overflow-hidden">
                {mentor.avatar ? (
                  <img
                    src={mentor.avatar}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserFriends className="w-8 h-8 text-[#fcba28]" />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#fcba28] text-black text-xs font-medium px-2 py-0.5 rounded-full">
                {mentor.rating} ⭐
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{mentor.name}</h3>
              <p className="text-white/60 text-sm">{mentor.title} at {mentor.company}</p>
              <p className="text-white/40 text-sm">{mentor.yearsOfExperience} years of experience</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-white/60">
              <FaStar className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>
                {mentor.rating} rating • {mentor.totalSessions} sessions completed
              </span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaClock className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>Next available: {new Date(mentor.availability.nextAvailable).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaGlobe className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>{mentor.languages.join(', ')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mentor.expertise.map((exp) => {
                const area = expertiseAreas.find(a => a.value === exp);
                return (
                  <span
                    key={exp}
                    className="px-2 py-1 bg-white/5 rounded-lg text-xs text-white/80"
                  >
                    {area?.label}
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-sm text-white/60 mb-4 line-clamp-3">
            {mentor.bio}
          </p>

          {/* Achievements */}
          <div className="mb-4 space-y-2">
            {mentor.achievements.slice(0, 2).map((achievement, index) => (
              <div key={index} className="flex items-center text-sm text-white/60">
                <FaTrophy className="w-3 h-3 mr-2 text-[#fcba28]" />
                <span>{achievement}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-lg font-semibold text-white">
              ${mentor.hourlyRate}/hr
            </div>
            <Button
              className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
              onClick={() => {}} // Add booking logic
            >
              Book Session <FaChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Latest Testimonial */}
          {mentor.testimonials[0] && (
            <div className="p-3 bg-white/5 rounded-lg">
              <p className="text-sm text-white/60 italic mb-2">"{mentor.testimonials[0].text}"</p>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span>{mentor.testimonials[0].author}</span>
                <span>{new Date(mentor.testimonials[0].date).toLocaleDateString()}</span>
              </div>
            </div>
          )}
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
              Expert Mentorship
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Connect with experienced mentors from top tech companies who can help you
              prepare for technical interviews and advance your career.
            </p>
          </motion.div>

          {/* Expertise Areas */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {expertiseAreas.map((area) => {
              const IconComponent = area.icon;
              return (
                <motion.button
                  key={area.value}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedExpertise(area.value)}
                  className={`p-4 rounded-xl border ${
                    selectedExpertise === area.value
                      ? 'bg-[#fcba28] border-[#fcba28] text-black'
                      : 'bg-black/20 border-white/10 text-white hover:border-[#fcba28]/50'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">{area.label}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <select
              value={selectedPrice}
              onChange={(e) => setSelectedPrice(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {experienceLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMentors.map(renderMentorCard)}
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
