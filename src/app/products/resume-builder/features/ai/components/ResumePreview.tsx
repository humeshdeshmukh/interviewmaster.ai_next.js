"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Share2, Eye, Printer, 
  FileText, Settings, Layout
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { ResumeSection, ResumeTemplate } from '../types';

interface ResumePreviewProps {
  sections: ResumeSection[];
  template: ResumeTemplate;
  scale?: number;
  onExport?: (format: 'pdf' | 'docx' | 'txt') => void;
  onShare?: () => void;
  onPrint?: () => void;
  onTemplateSettings?: () => void;
}

export const ResumePreview = ({
  sections,
  template,
  scale = 1,
  onExport,
  onShare,
  onPrint,
  onTemplateSettings
}: ResumePreviewProps) => {
  const [activeView, setActiveView] = useState<'desktop' | 'mobile'>('desktop');
  const [showActions, setShowActions] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      setShowActions(false);
      setMounted(false);
    };
  }, []);

  const templateStyles = useMemo(() => ({
    fontFamily: template.fonts?.body || 'system-ui',
    headingFont: template.fonts?.heading || 'system-ui',
    primaryColor: template.color?.primary || '#fcba28',
    secondaryColor: template.color?.secondary || '#2a2a2a',
    accentColor: template.color?.accent || '#ffffff'
  }), [template]);

  const renderSection = useCallback((section: ResumeSection) => {
    switch (section.type) {
      case 'personal':
        return (
          <div className="space-y-2" style={{ color: templateStyles.primaryColor }}>
            <h1 className="text-3xl font-bold" style={{ fontFamily: templateStyles.headingFont }}>
              {section.content.name}
            </h1>
            <p className="text-lg">{section.content.title}</p>
            <div className="flex flex-wrap gap-4 text-sm">
              <span>{section.content.email}</span>
              <span>{section.content.phone}</span>
              <span>{section.content.location}</span>
            </div>
            {section.content.linkedin && (
              <div className="text-sm">
                <a href={section.content.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </div>
            )}
          </div>
        );

      case 'summary':
        return (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold" style={{ 
              fontFamily: templateStyles.headingFont,
              color: templateStyles.primaryColor
            }}>
              Professional Summary
            </h2>
            <p style={{ color: templateStyles.secondaryColor }}>{section.content}</p>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold" style={{ 
              fontFamily: templateStyles.headingFont,
              color: templateStyles.primaryColor
            }}>
              Work Experience
            </h2>
            {section.content.map((exp: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium" style={{ color: templateStyles.secondaryColor }}>
                      {exp.position}
                    </h3>
                    <p className="text-sm">{exp.company}</p>
                  </div>
                  <p className="text-sm">
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </p>
                </div>
                <ul className="list-disc list-inside space-y-1">
                  {exp.highlights.map((highlight: string, hIndex: number) => (
                    <li key={hIndex} className="text-sm" style={{ color: templateStyles.secondaryColor }}>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      // Add other section types as needed
      default:
        return null;
    }
  }, [templateStyles]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      {/* Preview Controls */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-gray-900 p-4 rounded-t-lg border-b border-white/10">
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={() => setActiveView('desktop')}
            className={activeView === 'desktop' ? 'bg-white/10' : ''}
          >
            <Layout className="w-4 h-4" />
            Desktop
          </Button>
          <Button
            variant="secondary"
            onClick={() => setActiveView('mobile')}
            className={activeView === 'mobile' ? 'bg-white/10' : ''}
          >
            <FileText className="w-4 h-4" />
            Mobile
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setShowActions(!showActions)}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Actions Dropdown */}
      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-4 top-16 w-48 bg-gray-900 rounded-lg shadow-xl border border-white/10 overflow-hidden z-20"
          >
            <button
              onClick={() => onExport?.('pdf')}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as PDF
            </button>
            <button
              onClick={() => onExport?.('docx')}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export as Word
            </button>
            <button
              onClick={onShare}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              Share Resume
            </button>
            <button
              onClick={onPrint}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              Print Resume
            </button>
            <button
              onClick={onTemplateSettings}
              className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Template Settings
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preview Area */}
      <div 
        className={`bg-white rounded-b-lg shadow-xl overflow-hidden transition-all duration-300 ${
          activeView === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
        }`}
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: 'top center'
        }}
      >
        <div className="p-8 min-h-[1056px]" style={{ 
          fontFamily: templateStyles.fontFamily,
          background: templateStyles.secondaryColor,
          color: templateStyles.accentColor
        }}>
          {sections
            .filter(section => section.isVisible)
            .sort((a, b) => a.order - b.order)
            .map(section => (
              <div key={section.id} className="mb-6">
                {renderSection(section)}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};
