'use client';

import { Webinar } from '../data';
import { formatDate } from '../utils';
import { FaClock, FaUser, FaTag, FaExternalLinkAlt, FaBuilding } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface WebinarCardProps {
  webinar: Webinar;
  onClick: () => void;
}

export function WebinarCard({ webinar, onClick }: WebinarCardProps) {
  const isComingSoon = webinar.status === 'coming_soon';

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 hover:bg-white/10 transition-all border border-white/10"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2805_0%,transparent_65%)] blur-xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10">
        {/* Status and Category */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-sm bg-[#fcba28]/10 text-[#fcba28] rounded-full">
            {webinar.category}
          </span>
          {isComingSoon && (
            <span className="px-3 py-1 text-sm bg-primary/10 text-primary-light rounded-full animate-pulse">
              Coming Soon
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white group-hover:text-[#fcba28] transition-colors mb-3">
          {webinar.title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-4 line-clamp-2">
          {webinar.description}
        </p>

        {/* Speaker Info */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#fcba28]/10 flex items-center justify-center text-[#fcba28] border border-[#fcba28]/20">
            {webinar.speaker.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <FaUser className="text-[#fcba28] w-4 h-4" />
              <span className="text-white font-medium">{webinar.speaker.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <FaBuilding className="text-[#fcba28] w-3 h-3" />
              <span>{webinar.speaker.role} at {webinar.speaker.company}</span>
            </div>
          </div>
        </div>

        {/* Meta Info */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaClock className="text-[#fcba28]" />
            <span>{formatDate(webinar.date)} • {webinar.duration}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {webinar.tags.map((tag, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/5 text-gray-400"
              >
                <FaTag className="text-[#fcba28]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClick}
          disabled={isComingSoon}
          className={`w-full group/button flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
            isComingSoon
              ? 'bg-white/5 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black hover:shadow-lg hover:shadow-[#fcba28]/25'
          }`}
        >
          {isComingSoon ? (
            'Registration Opening Soon'
          ) : (
            <>
              Register Now
              <FaExternalLinkAlt className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </motion.article>
  );
}
