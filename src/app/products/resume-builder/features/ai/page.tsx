"use client";

import { useState } from 'react';
import { PageContainer } from '../../components/ui';
import { Sparkles, FileText, Brain } from 'lucide-react';
import TemplateSelector from '../../components/TemplateSelector';
import SectionEditor from '../../components/SectionEditor';
import ResumeAnalyzer from '../../components/ResumeAnalyzer';

const defaultSections = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    content: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    order: 0
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Professional Summary',
    content: '',
    order: 1
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    content: [],
    order: 2
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: [],
    order: 3
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    content: [],
    order: 4
  }
];

export default function AIResumeBuilder() {
  const [template, setTemplate] = useState('');
  const [sections, setSections] = useState(defaultSections);
  const [step, setStep] = useState<'template' | 'content'>('template');

  const handleTemplateSelect = (selectedTemplate: any) => {
    setTemplate(selectedTemplate.id);
    setStep('content');
  };

  const handleSectionUpdate = (updatedSections: any) => {
    setSections(updatedSections);
  };

  return (
    <PageContainer
      badge={{
        icon: Sparkles,
        text: "AI-Powered Resume Builder"
      }}
      title={{
        main: "Create Your",
        highlight: "Professional Resume",
        end: "with AI"
      }}
      description="Let our AI guide you through creating a powerful, ATS-optimized resume"
    >
      <div className="space-y-8">
        {step === 'template' && (
          <TemplateSelector
            onSelect={handleTemplateSelect}
            selectedId={template}
          />
        )}

        {step === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <SectionEditor
                sections={sections}
                onUpdate={handleSectionUpdate}
              />
            </div>
            <div className="lg:col-span-1">
              <ResumeAnalyzer
                content={sections.reduce((acc, section) => ({
                  ...acc,
                  [section.type]: section.content
                }), {})}
              />
            </div>
          </div>
        )}
      </div>
    </PageContainer>
  );
}
