"use client";

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, GripVertical, ChevronDown, ChevronUp,
  Sparkles, AlertCircle
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { ResumeSection } from '../types';

interface SectionEditorProps {
  sections: ResumeSection[];
  onUpdate: (sections: ResumeSection[]) => void;
  onAIAssist?: (sectionId: string) => void;
}

export const SectionEditor = ({ sections, onUpdate, onAIAssist }: SectionEditorProps) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  const handleSectionChange = useCallback((sectionId: string, content: any) => {
    onUpdate(sections.map(section =>
      section.id === sectionId ? { ...section, content } : section
    ));
  }, [sections, onUpdate]);

  const handleAddSection = useCallback((type: ResumeSection['type']) => {
    const newSection: ResumeSection = {
      id: `${type}-${Date.now()}`,
      type,
      title: type.charAt(0).toUpperCase() + type.slice(1),
      content: type === 'experience' || type === 'education' ? [] : '',
      order: sections.length,
      isVisible: true
    };
    onUpdate([...sections, newSection]);
    setExpandedSection(newSection.id);
  }, [sections, onUpdate]);

  const handleDeleteSection = useCallback((sectionId: string) => {
    onUpdate(sections.filter(section => section.id !== sectionId));
    if (expandedSection === sectionId) {
      setExpandedSection(null);
    }
  }, [sections, onUpdate, expandedSection]);

  const handleDragStart = useCallback((sectionId: string) => {
    setDraggedSection(sectionId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetId) return;

    const updatedSections = [...sections];
    const draggedIndex = sections.findIndex(s => s.id === draggedSection);
    const targetIndex = sections.findIndex(s => s.id === targetId);

    const [draggedItem] = updatedSections.splice(draggedIndex, 1);
    updatedSections.splice(targetIndex, 0, draggedItem);

    updatedSections.forEach((section, index) => {
      section.order = index;
    });

    onUpdate(updatedSections);
  }, [draggedSection, sections, onUpdate]);

  const handleDragEnd = useCallback(() => {
    setDraggedSection(null);
  }, []);

  const renderSectionContent = useCallback((section: ResumeSection) => {
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
                className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                placeholder="Your full name"
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
                className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                className="w-full bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                placeholder="City, Country"
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
                onClick={() => onAIAssist?.(section.id)}
                className="!p-2"
              >
                <Sparkles className="w-4 h-4" />
                AI Assist
              </Button>
            </div>
            <textarea
              value={section.content || ''}
              onChange={(e) => handleSectionChange(section.id, e.target.value)}
              className="w-full h-32 bg-white/5 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#fcba28] resize-none"
              placeholder="Write a brief summary of your professional background and goals..."
            />
            <div className="flex items-center gap-2 text-sm text-white/60">
              <AlertCircle className="w-4 h-4" />
              <span>Aim for 3-4 sentences highlighting your key strengths and career objectives.</span>
            </div>
          </div>
        );

      case 'experience':
      case 'education':
        return (
          <div className="space-y-4">
            {section.content.map((item: any, index: number) => (
              <div key={item.id} className="bg-white/5 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {section.type === 'experience' ? 'Company' : 'Institution'}
                      </label>
                      <input
                        type="text"
                        value={item[section.type === 'experience' ? 'company' : 'institution'] || ''}
                        onChange={(e) => {
                          const updatedContent = [...section.content];
                          updatedContent[index] = {
                            ...item,
                            [section.type === 'experience' ? 'company' : 'institution']: e.target.value
                          };
                          handleSectionChange(section.id, updatedContent);
                        }}
                        className="w-full bg-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {section.type === 'experience' ? 'Position' : 'Degree'}
                      </label>
                      <input
                        type="text"
                        value={item[section.type === 'experience' ? 'position' : 'degree'] || ''}
                        onChange={(e) => {
                          const updatedContent = [...section.content];
                          updatedContent[index] = {
                            ...item,
                            [section.type === 'experience' ? 'position' : 'degree']: e.target.value
                          };
                          handleSectionChange(section.id, updatedContent);
                        }}
                        className="w-full bg-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                      className="w-full bg-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                      className="w-full bg-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                      <span className="text-sm">Current</span>
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
                          className="flex-1 bg-white/10 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#fcba28]"
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
                  [section.type === 'experience' ? 'company' : 'institution']: '',
                  [section.type === 'experience' ? 'position' : 'degree']: '',
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
              Add {section.type === 'experience' ? 'Experience' : 'Education'}
            </Button>
          </div>
        );

      default:
        return null;
    }
  }, [handleSectionChange]);

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {sections
          .sort((a, b) => a.order - b.order)
          .map((section) => (
            <motion.div
              key={section.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white/5 rounded-xl overflow-hidden"
              draggable
              onDragStart={() => handleDragStart(section.id)}
              onDragOver={(e) => handleDragOver(e, section.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="p-4">
                <div className="flex items-center gap-4">
                  <GripVertical className="w-5 h-5 text-white/40 cursor-move" />
                  <h3 className="text-lg font-medium flex-1">{section.title}</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => handleDeleteSection(section.id)}
                      className="!p-2 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => setExpandedSection(
                        expandedSection === section.id ? null : section.id
                      )}
                      className="!p-2"
                    >
                      {expandedSection === section.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                {expandedSection === section.id && (
                  <div className="mt-4">
                    {renderSectionContent(section)}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => handleAddSection('experience')}
          className="!py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAddSection('education')}
          className="!py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
        <Button
          variant="secondary"
          onClick={() => handleAddSection('skills')}
          className="!py-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skills
        </Button>
      </div>
    </div>
  );
};
