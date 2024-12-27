"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaSearch,
  FaPlus,
  FaFire,
  FaClock,
  FaStar,
  FaUser,
  FaUsers,
  FaChartLine,
  FaCode,
  FaLaptopCode,
  FaBrain,
  FaGraduationCap,
  FaBriefcase,
  FaLightbulb,
  FaSpinner,
  FaComments,
  FaHeart
} from 'react-icons/fa';
import { mockCategories, mockStats, mockTags, forumTheme } from './data/mock';
import type { Post, Category } from './types';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import cn from 'classnames';

interface ForumPageProps {
  className?: string;
}

export default function ForumsPage({ className = '' }: ForumPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'latest' | 'trending' | 'top'>('latest');
  const [isLoading, setIsLoading] = useState(false);

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: React.ComponentType } = {
      FaCode,
      FaLaptopCode,
      FaBrain,
      FaGraduationCap,
      FaBriefcase,
      FaLightbulb
    };
    return icons[iconName] || FaCode;
  };

  const renderCategoryCard = (category: Category) => {
    const IconComponent = getIconComponent(category.icon);
    return (
      <motion.div
        key={category.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "bg-black/20 backdrop-blur-lg p-6 rounded-xl border border-white/10",
          "hover:border-[#fcba28]/50 transition-all cursor-pointer hover:shadow-lg",
          selectedCategory === category.id && "border-[#fcba28]"
        )}
        onClick={() => setSelectedCategory(category.id)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="p-3 rounded-lg"
              style={{ backgroundColor: `${category.color}20` }}
            >
              <IconComponent
                className="w-6 h-6"
                style={{ color: category.color }}
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {category.name}
              </h3>
              <p className="text-sm text-white/60">{category.description}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-sm font-medium text-[#fcba28]">
              {category.postCount.toLocaleString()} posts
            </span>
          </div>
        </div>

        {category.lastActivity && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-white/60">
                <FaClock className="w-4 h-4" />
                <span>Last activity:</span>
              </div>
              <span className="text-white/60">
                {new Date(category.lastActivity.timestamp).toLocaleDateString()}
              </span>
            </div>
            <Link
              href={`/community/forums/${category.id}/${category.lastActivity.post.id}`}
              className="block mt-2 text-sm text-[#fcba28] hover:underline"
            >
              {category.lastActivity.post.title}
            </Link>
          </div>
        )}
      </motion.div>
    );
  };

  const renderStats = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-black/20 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:border-[#fcba28]/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#fcba28]/20">
            <FaUsers className="w-5 h-5 text-[#fcba28]" />
          </div>
          <div>
            <div className="text-sm text-white/60">Total Users</div>
            <div className="text-xl font-semibold text-white">
              {mockStats.totalUsers.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-black/20 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:border-[#7B61FF]/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#7B61FF]/20">
            <FaChartLine className="w-5 h-5 text-[#7B61FF]" />
          </div>
          <div>
            <div className="text-sm text-white/60">Posts Today</div>
            <div className="text-xl font-semibold text-white">
              {mockStats.postsToday.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-black/20 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:border-[#4CAF50]/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#4CAF50]/20">
            <FaUser className="w-5 h-5 text-[#4CAF50]" />
          </div>
          <div>
            <div className="text-sm text-white/60">Online Users</div>
            <div className="text-xl font-semibold text-white">
              {mockStats.onlineUsers.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-black/20 backdrop-blur-lg p-4 rounded-xl border border-white/10 hover:border-[#FF5252]/30 transition-all"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#FF5252]/20">
            <FaFire className="w-5 h-5 text-[#FF5252]" />
          </div>
          <div>
            <div className="text-sm text-white/60">Total Posts</div>
            <div className="text-xl font-semibold text-white">
              {mockStats.totalPosts.toLocaleString()}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <MaxWidthWrapper>
        {/* Hero Section */}
        <section className="relative pt-20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              InterviewMaster.AI Community
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Join our vibrant community of developers and tech professionals. Share experiences,
              ask questions, and help others succeed in their interview journey.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <Input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-black/20 border-white/10 text-white placeholder:text-white/40"
              />
            </div>
            <Button
              onClick={() => {}}
              className="bg-[#fcba28] text-black hover:bg-[#fcba28]/90"
            >
              <FaPlus className="mr-2" /> New Discussion
            </Button>
          </div>

          {/* Sort Options */}
          <div className="flex gap-2 mb-8">
            <Button
              variant={sortBy === 'latest' ? 'secondary' : 'ghost'}
              onClick={() => setSortBy('latest')}
              className="text-white/60"
            >
              <FaClock className="mr-2" /> Latest
            </Button>
            <Button
              variant={sortBy === 'trending' ? 'secondary' : 'ghost'}
              onClick={() => setSortBy('trending')}
              className="text-white/60"
            >
              <FaFire className="mr-2" /> Trending
            </Button>
            <Button
              variant={sortBy === 'top' ? 'secondary' : 'ghost'}
              onClick={() => setSortBy('top')}
              className="text-white/60"
            >
              <FaStar className="mr-2" /> Top
            </Button>
          </div>

          {/* Stats */}
          {renderStats()}

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {mockCategories.map(renderCategoryCard)}
          </div>

          {/* Trending Tags */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-white mb-4">Trending Tags</h2>
            <div className="flex flex-wrap gap-2">
              {mockTags.map((tag) => (
                <div
                  key={tag.id}
                  className="px-3 py-1 rounded-full text-sm"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                    border: `1px solid ${tag.color}40`
                  }}
                >
                  {tag.name} ({tag.count})
                </div>
              ))}
            </div>
          </div>

          {/* Top Contributors */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Top Contributors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {mockStats.topContributors.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center gap-3 p-4 bg-black/20 backdrop-blur-lg rounded-xl border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#fcba28]/20 flex items-center justify-center">
                    <FaUser className="w-5 h-5 text-[#fcba28]" />
                  </div>
                  <div>
                    <div className="font-medium text-white">{user.name}</div>
                    <div className="text-sm text-white/60">
                      {user.reputation.toLocaleString()} reputation
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
