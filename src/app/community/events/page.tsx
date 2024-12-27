"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUserFriends,
  FaTags,
  FaDollarSign,
  FaChevronRight,
} from "react-icons/fa";
import { upcomingEvents, eventTypes, eventLevels, type Event } from './data';

export default function Events() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const filteredEvents = upcomingEvents.filter((event) => {
    if (selectedType !== 'all' && event.type !== selectedType) return false;
    if (selectedLevel !== 'all' && event.level !== selectedLevel) return false;
    return true;
  });

  const formatPrice = (price: number | 'free') => {
    if (price === 'free') return 'Free';
    return `$${price.toFixed(2)}`;
  };

  const calculateProgress = (current: number, max: number) => {
    return (current / max) * 100;
  };

  const renderEventCard = (event: Event) => {
    const progress = calculateProgress(event.attendees, event.maxAttendees);
    const IconComponent = event.icon;

    return (
      <motion.div
        key={event.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        className={`bg-black/20 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 ${
          event.featured ? 'ring-2 ring-[#fcba28]' : ''
        }`}
      >
        {event.featured && (
          <div className="bg-[#fcba28] text-black px-4 py-1 text-sm font-medium">
            Featured Event
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-white/5">
              <IconComponent className="w-6 h-6 text-[#fcba28]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-1">{event.title}</h3>
              <p className="text-white/60 text-sm mb-2">{event.description}</p>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-sm text-white/60">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaClock className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>{event.time} • {event.duration}</span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span className="capitalize">{event.location}</span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaUserFriends className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>
                {event.attendees} / {event.maxAttendees} attendees
              </span>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaTags className="w-4 h-4 mr-2 text-[#fcba28]" />
              <div className="flex gap-2">
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-white/5 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-sm text-white/60">
              <FaDollarSign className="w-4 h-4 mr-2 text-[#fcba28]" />
              <span>{formatPrice(event.price)}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-4">
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#fcba28] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-white/40 mt-1">
              {event.maxAttendees - event.attendees} spots remaining
            </p>
          </div>

          {/* Host info */}
          <div className="flex items-center gap-3 mb-4 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 rounded-full bg-[#fcba28]/20 flex items-center justify-center">
              {event.host.avatar ? (
                <img
                  src={event.host.avatar}
                  alt={event.host.name}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FaUserFriends className="w-5 h-5 text-[#fcba28]" />
              )}
            </div>
            <div>
              <p className="font-medium text-white">{event.host.name}</p>
              <p className="text-sm text-white/60">
                {event.host.role} at {event.host.company}
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
            onClick={() => window.location.href = event.registrationLink}
          >
            Register Now <FaChevronRight className="ml-2 w-4 h-4" />
          </Button>
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
              Upcoming Events
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto">
              Join our expert-led workshops, webinars, and mock interviews to accelerate
              your interview preparation journey.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#fcba28]/50"
            >
              {eventLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredEvents.map(renderEventCard)}
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
