"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqCategories } from './data/faq';
import {
  FaInfoCircle,
  FaCode,
  FaDollarSign,
  FaUserCog,
  FaSearch,
  FaChevronDown,
  FaExternalLinkAlt,
  FaArrowRight
} from 'react-icons/fa';

const iconMap = {
  FaInfoCircle,
  FaCode,
  FaDollarSign,
  FaUserCog,
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<string[]>([]);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQs(prev => 
      prev.includes(faqId) 
        ? prev.filter(id => id !== faqId)
        : [...prev, faqId]
    );
  };

  const filteredCategories = faqCategories.filter(category => {
    if (selectedCategory !== 'all' && category.id !== selectedCategory) {
      return false;
    }

    if (!searchQuery) return true;

    return category.faqs.some(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about InterviewMaster.AI
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] transition-colors"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              All Categories
            </button>
            {faqCategories.map(category => {
              const Icon = iconMap[category.icon as keyof typeof iconMap];
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {Icon && <Icon />} {category.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredCategories.map(category => {
            const Icon = iconMap[category.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden"
              >
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    {Icon && <Icon className="w-6 h-6 text-[#fcba28]" />}
                    <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
                  </div>
                  <p className="text-gray-400">{category.description}</p>
                </div>

                <div className="divide-y divide-white/10">
                  {category.faqs.map(faq => (
                    <div key={faq.id} className="p-6">
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full flex items-center justify-between text-left"
                      >
                        <h3 className="text-lg font-medium text-white pr-4">{faq.question}</h3>
                        <FaChevronDown
                          className={`w-5 h-5 text-[#fcba28] transform transition-transform ${
                            expandedFAQs.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {expandedFAQs.includes(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-gray-400">{faq.answer}</p>
                            
                            {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                              <div className="mt-4 space-y-2">
                                {faq.relatedLinks.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.url}
                                    className="flex items-center gap-2 text-[#fcba28] hover:text-[#fcba28]/70 transition-colors"
                                  >
                                    <FaArrowRight className="w-4 h-4" />
                                    {link.text}
                                    <FaExternalLinkAlt className="w-3 h-3" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">No FAQs found matching your search criteria</p>
          </motion.div>
        )}

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center p-8 bg-white/5 rounded-xl border border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-400 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcba28]/90 transition-colors"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </div>
  );
}
