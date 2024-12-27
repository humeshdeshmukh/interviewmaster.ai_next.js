'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar, Users, MapPin, Clock, ExternalLink } from 'lucide-react';
import { meetups, categories, cities, type Meetup } from './data';

export default function MeetupsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');

  const filteredMeetups = meetups.filter(meetup => {
    const categoryMatch = selectedCategory === 'all' || meetup.type.toLowerCase().includes(selectedCategory);
    const cityMatch = selectedCity === 'all' || 
                     (selectedCity === 'online' && meetup.location.online) ||
                     meetup.location.city.toLowerCase().includes(selectedCity);
    return categoryMatch && cityMatch;
  });

  const renderMeetup = (meetup: Meetup) => {
    return (
      <motion.div
        key={meetup.id}
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
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src={meetup.organizer.avatar}
                    alt={meetup.organizer.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white">
                  <img
                    src={meetup.organizer.company.logo}
                    alt={meetup.organizer.company.name}
                    className="w-4 h-4"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white">{meetup.title}</h3>
                <p className="text-sm text-gray-300">
                  Hosted by {meetup.organizer.name} · {meetup.organizer.role} at {meetup.organizer.company.name}
                </p>
              </div>
            </div>
            {meetup.featured && (
              <span className="px-3 py-1 bg-[#fcba28] text-black text-sm font-medium rounded-full shadow-[0_0_15px_rgba(252,186,40,0.35)]">
                Featured
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-6">{meetup.description}</p>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2 text-gray-300">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(meetup.date), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Clock className="w-4 h-4" />
              <span>{meetup.time}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>{meetup.location.online ? 'Online Event' : `${meetup.location.name}, ${meetup.location.city}`}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-4 h-4" />
              <span>{meetup.attendees.total} / {meetup.attendees.capacity} Attendees</span>
            </div>
          </div>

          {/* Topics */}
          <div className="flex flex-wrap gap-2 mb-6">
            {meetup.topics.map(topic => (
              <span
                key={topic}
                className="px-3 py-1 bg-white/5 rounded-full text-sm text-gray-300 border border-white/10 hover:border-[#fcba28]/50 transition-colors"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Attendees Preview */}
          <div className="flex items-center justify-between">
            <div className="flex -space-x-2">
              {meetup.attendees.avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt="Attendee"
                  className="w-8 h-8 rounded-full border-2 border-gray-900"
                />
              ))}
              {meetup.attendees.total > meetup.attendees.avatars.length && (
                <div className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-xs text-gray-300">
                  +{meetup.attendees.total - meetup.attendees.avatars.length}
                </div>
              )}
            </div>
            <button className="px-4 py-2 bg-[#fcba28] text-black rounded-lg font-medium hover:bg-[#fcba28]/90 transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(252,186,40,0.25)] hover:shadow-[0_0_25px_rgba(252,186,40,0.35)] group-hover:shadow-[0_0_35px_rgba(252,186,40,0.4)]">
              {meetup.location.online ? (
                <>
                  Join Online <ExternalLink className="w-4 h-4" />
                </>
              ) : (
                'RSVP Now'
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
            Tech Interview Meetups
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our community events to learn, practice, and network with fellow developers preparing for technical interviews.
          </p>
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
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="bg-white/5 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28] border border-white/10"
        >
          {cities.map(city => (
            <option key={city.value} value={city.value} className="bg-gray-900">
              {city.label}
            </option>
          ))}
        </select>
      </div>

      {/* Meetups Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMeetups.map(renderMeetup)}
      </div>
    </div>
  );
}
