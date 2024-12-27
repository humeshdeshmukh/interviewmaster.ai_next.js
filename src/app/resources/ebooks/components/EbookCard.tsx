'use client';

import { motion } from 'framer-motion';
import { FaBook, FaDownload, FaStar, FaEye } from 'react-icons/fa';

interface Ebook {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  rating: number;
  downloadCount: number;
  fileSize: string;
  downloadUrl: string;
}

interface EbookCardProps {
  ebook: Ebook;
}

export function EbookCard({ ebook }: EbookCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#fcba28]/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-[#fcba28] mb-2">
              <FaBook className="w-5 h-5" />
              <span className="text-sm font-medium">{ebook.category}</span>
            </div>
            <h3 className="text-xl font-semibold text-white group-hover:text-[#fcba28] transition-colors duration-300">
              {ebook.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 mb-6 line-clamp-3">
          {ebook.description}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-400">
            <FaStar className="text-[#fcba28]" />
            <span>{ebook.rating}/5</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaEye className="text-[#fcba28]" />
            <span>{ebook.downloadCount}+</span>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <FaDownload className="text-[#fcba28]" />
            <span>{ebook.fileSize}</span>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            ebook.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            ebook.difficulty === 'Intermediate' ? 'bg-[#fcba28]/20 text-[#fcba28]' :
            'bg-purple-500/20 text-purple-400'
          }`}>
            {ebook.difficulty}
          </span>
        </div>

        {/* Download Button */}
        <motion.a
          href={ebook.downloadUrl}
          className="block w-full px-4 py-3 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black text-center rounded-xl font-medium shadow-lg shadow-[#fcba28]/25 hover:shadow-[#fcba28]/40 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Download Now
        </motion.a>
      </div>
    </motion.div>
  );
}
