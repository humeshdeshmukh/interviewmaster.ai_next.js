"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Sparkles, AlertCircle, Settings, Eye, EyeOff, 
  ArrowUp, ArrowDown
} from 'lucide-react';
import { Button } from '../../../components/ui';
import { AISuggestions } from './AISuggestions';
import { ContentAnalyzer } from './ContentAnalyzer';
import type { ResumeSection, AIAssistResponse } from '../types';

interface SectionManagerProps {
  sections: ResumeSection[];
  onUpdate: (sections: ResumeSection[]) => void;
  onAIAssist?: (sectionId: string) => Promise<AIAssistResponse>;
}

export const SectionManager = ({
  sections,
  onUpdate,
  onAIAssist
}: SectionManagerProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [currentSuggestions, setCurrentSuggestions] = useState<AIAssistResponse | null>(null);
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setExpandedSection(null);
      setDraggedSection(null);
      setShowAISuggestions(false);
      setCurrentSuggestions(null);
      setActiveSectionId(null);
      setMounted(false);
    };
  }, []);

  const handleSectionChange = useCallback((sectionId: string, content: any) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId ? { ...section, content } : section
    );
    onUpdate(updatedSections);
  }, [sections, onUpdate]);

  const handleAddSection = useCallback((type: ResumeSection['type']) => {
    const newSection: ResumeSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: type === 'experience' || type === 'education' ? [] : '',
      order: sections.length,
      isVisible: true,
      aiAssisted: false
    };
    onUpdate([...sections, newSection]);
    setExpandedSection(newSection.id);
  }, [sections, onUpdate]);

  const handleDeleteSection = useCallback((sectionId: string) => {
    onUpdate(sections.filter(section => section.id !== sectionId));
  }, [sections, onUpdate]);

  const handleMoveSection = useCallback((sectionId: string, direction: 'up' | 'down') => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (
      (direction === 'up' && sectionIndex === 0) ||
      (direction === 'down' && sectionIndex === sections.length - 1)
    ) {
      return;
    }

    const newSections = [...sections];
    const targetIndex = direction === 'up' ? sectionIndex - 1 : sectionIndex + 1;
    [newSections[sectionIndex], newSections[targetIndex]] = 
    [newSections[targetIndex], newSections[sectionIndex]];

    newSections.forEach((section, index) => {
      section.order = index;
    });

    onUpdate(newSections);
  }, [sections, onUpdate]);

  const handleToggleVisibility = useCallback((sectionId: string) => {
    const updatedSections = sections.map(section =>
      section.id === sectionId 
        ? { ...section, isVisible: !section.isVisible }
        : section
    );
    onUpdate(updatedSections);
  }, [sections, onUpdate]);

  const handleAIAssistRequest = useCallback(async (sectionId: string) => {
    if (!onAIAssist) return;

    try {
      const suggestions = await onAIAssist(sectionId);
      setCurrentSuggestions(suggestions);
      setShowAISuggestions(true);
      setActiveSectionId(sectionId);
    } catch (error) {
      console.error('Error getting AI suggestions:', error);
    }
  }, [onAIAssist]);

  const handleApplySuggestions = useCallback((content: any) => {
    if (!activeSectionId) return;

    const updatedSections = sections.map(section =>
      section.id === activeSectionId
        ? { ...section, content, aiAssisted: true, lastUpdated: new Date().toISOString() }
        : section
    );
    onUpdate(updatedSections);
    setShowAISuggestions(false);
    setCurrentSuggestions(null);
    setActiveSectionId(null);
  }, [sections, onUpdate, activeSectionId]);

  const renderSectionContent = useCallback((section: ResumeSection) => {
    const commonClasses = "w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]";

    switch (section.type) {
      case 'personal':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                value={section.content.name || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  name: e.target.value
                })}
                className={commonClasses}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={section.content.title || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  title: e.target.value
                })}
                className={commonClasses}
                placeholder="Your professional title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={section.content.email || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  email: e.target.value
                })}
                className={commonClasses}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={section.content.phone || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  phone: e.target.value
                })}
                className={commonClasses}
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={section.content.location || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  location: e.target.value
                })}
                className={commonClasses}
                placeholder="City, Country"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                type="url"
                value={section.content.linkedin || ''}
                onChange={(e) => handleSectionChange(section.id, {
                  ...section.content,
                  linkedin: e.target.value
                })}
                className={commonClasses}
                placeholder="LinkedIn profile URL"
              />
            </div>
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                variant="secondary"
                onClick={() => handleAIAssistRequest(section.id)}
                className="!p-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Assist
              </Button>
            </div>
            <textarea
              value={section.content || ''}
              onChange={(e) => handleSectionChange(section.id, e.target.value)}
              className={`${commonClasses} h-32 resize-none`}
              placeholder="Write a brief summary of your professional background and goals..."
            />
            <ContentAnalyzer
              content={section.content || ''}
              onSuggestions={(suggestions) => {
                // Handle content analysis suggestions
              }}
            />
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            {section.content.map((item: any, index: number) => (
              <div key={item.id} className="bg-white/5 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={item.company || ''}
                        onChange={(e) => {
                          const updatedContent = [...section.content];
                          updatedContent[index] = {
                            ...item,
                            company: e.target.value
                          };
                          handleSectionChange(section.id, updatedContent);
                        }}
                        className={commonClasses}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Position</label>
                      <input
                        type="text"
                        value={item.position || ''}
                        onChange={(e) => {
                          const updatedContent = [...section.content];
                          updatedContent[index] = {
                            ...item,
                            position: e.target.value
                          };
                          handleSectionChange(section.id, updatedContent);
                        }}
                        className={commonClasses}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const updatedContent = section.content.filter((_: any, i: number) => i !== index);
                      handleSectionChange(section.id, updatedContent);
                    }}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={item.startDate || ''}
                      onChange={(e) => {
                        const updatedContent = [...section.content];
                        updatedContent[index] = {
                          ...item,
                          startDate: e.target.value
                        };
                        handleSectionChange(section.id, updatedContent);
                      }}
                      className={commonClasses}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={item.endDate || ''}
                      disabled={item.current}
                      onChange={(e) => {
                        const updatedContent = [...section.content];
                        updatedContent[index] = {
                          ...item,
                          endDate: e.target.value
                        };
                        handleSectionChange(section.id, updatedContent);
                      }}
                      className={commonClasses}
                    />
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={item.current}
                        onChange={(e) => {
                          const updatedContent = [...section.content];
                          updatedContent[index] = {
                            ...item,
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : item.endDate
                          };
                          handleSectionChange(section.id, updatedContent);
                        }}
                        className="form-checkbox text-[#fcba28] rounded"
                      />
                      <span className="text-sm">Current Position</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Highlights</label>
                  <div className="space-y-2">
                    {item.highlights?.map((highlight: string, hIndex: number) => (
                      <div key={hIndex} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => {
                            const updatedContent = [...section.content];
                            updatedContent[index] = {
                              ...item,
                              highlights: item.highlights.map((h: string, i: number) =>
                                i === hIndex ? e.target.value : h
                              )
                            };
                            handleSectionChange(section.id, updatedContent);
                          }}
                          className={commonClasses}
                          placeholder="Add a highlight..."
                        />
                        <button
                          onClick={() => {
                            const updatedContent = [...section.content];
                            updatedContent[index] = {
                              ...item,
                              highlights: item.highlights.filter((_: string, i: number) => i !== hIndex)
                            };
                            handleSectionChange(section.id, updatedContent);
                          }}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    ))}
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const updatedContent = [...section.content];
                        updatedContent[index] = {
                          ...item,
                          highlights: [...(item.highlights || []), '']
                        };
                        handleSectionChange(section.id, updatedContent);
                      }}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4" />
                      Add Highlight
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => {
                const newItem = {
                  id: Date.now().toString(),
                  company: '',
                  position: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  highlights: ['']
                };
                handleSectionChange(section.id, [...section.content, newItem]);
              }}
              className="w-full"
            >
              <Plus className="w-4 h-4" />
              Add Experience
            </Button>
          </div>
        );

      default:
        return null;
    }
  }, [handleSectionChange]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="space-y-6">
      {sections
        .sort((a, b) => a.order - b.order)
        .map((section) => (
          <motion.div
            key={section.id}
            layout
            className="bg-white/5 rounded-xl overflow-hidden"
          >
            <div className="flex items-center gap-4 p-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMoveSection(section.id, 'up')}
                  disabled={section.order === 0}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleMoveSection(section.id, 'down')}
                  disabled={section.order === sections.length - 1}
                  className="p-1 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
              <div
                className="flex-1 cursor-pointer"
                onClick={() => setExpandedSection(
                  expandedSection === section.id ? null : section.id
                )}
              >
                <h3 className="font-medium">{section.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleVisibility(section.id)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  {section.isVisible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>
                {section.type !== 'personal' && (
                  <button
                    onClick={() => handleDeleteSection(section.id)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                )}
                {expandedSection === section.id ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
            {expandedSection === section.id && (
              <div className="p-4 border-t border-white/10">
                {renderSectionContent(section)}
              </div>
            )}
          </motion.div>
        ))}

      {/* Add Section Button */}
      <div className="flex justify-center">
        <div className="relative group">
          <Button variant="secondary">
            <Plus className="w-4 h-4" />
            Add Section
          </Button>
          <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-lg shadow-xl border border-white/10 hidden group-hover:block">
            {['experience', 'education', 'skills', 'projects', 'certifications', 'languages', 'awards', 'publications', 'volunteer', 'references', 'custom'].map((type) => (
              <button
                key={type}
                onClick={() => handleAddSection(type as ResumeSection['type'])}
                className="w-full px-4 py-2 text-left hover:bg-white/5 first:rounded-t-lg last:rounded-b-lg"
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI Suggestions Modal */}
      {currentSuggestions && (
        <AISuggestions
          suggestions={currentSuggestions}
          onApply={handleApplySuggestions}
          onDismiss={() => {
            setShowAISuggestions(false);
            setCurrentSuggestions(null);
            setActiveSectionId(null);
          }}
          isVisible={showAISuggestions}
        />
      )}
    </div>
  );
};
