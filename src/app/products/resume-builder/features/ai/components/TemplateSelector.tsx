"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Check, Filter, Search } from 'lucide-react';
import type { ResumeTemplate } from '../types';

interface TemplateSelectorProps {
  onSelect: (template: ResumeTemplate) => void;
  selectedId?: string;
}

const templates: ResumeTemplate[] = [
  {
    id: 'professional-1',
    name: 'Executive Pro',
    description: 'Clean and professional template perfect for corporate roles',
    category: 'Professional',
    isPopular: true,
    features: [
      'ATS-Optimized Layout',
      'Professional Typography',
      'Clean Design',
      'Perfect for Corporate'
    ]
  },
  {
    id: 'creative-1',
    name: 'Creative Studio',
    description: 'Modern and creative design for creative professionals',
    category: 'Creative',
    features: [
      'Eye-catching Layout',
      'Custom Sections',
      'Portfolio Integration',
      'Unique Typography'
    ]
  },
  {
    id: 'simple-1',
    name: 'Minimalist',
    description: 'Simple and effective design that focuses on content',
    category: 'Simple',
    features: [
      'Clean Layout',
      'Easy to Read',
      'Perfect for Any Role',
      'Maximum Content Space'
    ]
  },
  {
    id: 'modern-1',
    name: 'Tech Modern',
    description: 'Contemporary design perfect for tech professionals',
    category: 'Modern',
    isPopular: true,
    features: [
      'Modern Layout',
      'Skill Visualization',
      'Project Showcase',
      'Tech-focused Design'
    ]
  }
];

export const TemplateSelector = ({ onSelect, selectedId }: TemplateSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(templates.map(t => t.category)));

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
            />
          </div>
        </div>
        <div className="flex gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <motion.button
            key={template.id}
            onClick={() => onSelect(template)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`group relative p-4 rounded-xl text-left transition-all ${
              selectedId === template.id
                ? 'bg-[#fcba28] text-black'
                : 'bg-white/5 hover:bg-white/10'
            }`}
          >
            {template.isPopular && (
              <span className="absolute -top-2 right-4 px-2 py-0.5 bg-[#fcba28] text-black text-xs font-medium rounded-full">
                Popular
              </span>
            )}

            <div className="aspect-[8.5/11] mb-4 rounded-lg overflow-hidden bg-gray-800">
              {/* Template Preview */}
              <div className="w-full h-full p-4">
                {/* Simulated Resume Layout */}
                <div className="w-full h-3 bg-current rounded mb-2 opacity-60" />
                <div className="w-2/3 h-3 bg-current rounded mb-6 opacity-60" />
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="w-1/3 h-2 bg-current rounded opacity-40" />
                      <div className="w-full h-2 bg-current rounded opacity-40" />
                      <div className="w-5/6 h-2 bg-current rounded opacity-40" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-1">{template.name}</h3>
            <p className="text-sm opacity-80 mb-4">{template.description}</p>

            <div className="space-y-2">
              {template.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            {selectedId === template.id && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
                <span className="px-4 py-2 bg-white text-black rounded-lg font-medium">
                  Selected
                </span>
              </div>
            )}
          </motion.button>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-white/60">No templates found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
