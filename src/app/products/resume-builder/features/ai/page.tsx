"use client";

import { useState } from 'react';
import { PageContainer } from '../../components/ui';
import { Sparkles, FileText, Brain, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui';
import { TemplateSelector } from './components/TemplateSelector';
import { SectionEditor } from './components/SectionEditor';
import { AIAnalysis } from './components/AIAnalysis';
import type { ResumeSection, AIAnalysis as AIAnalysisType } from './types';

const defaultSections: ResumeSection[] = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    content: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: ''
    },
    order: 0,
    isVisible: true
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Professional Summary',
    content: '',
    order: 1,
    isVisible: true
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    content: [],
    order: 2,
    isVisible: true
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: [],
    order: 3,
    isVisible: true
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    content: [],
    order: 4,
    isVisible: true
  }
];

const mockAnalysis: AIAnalysisType = {
  score: 85,
  strengths: [
    'Strong professional experience section with quantifiable achievements',
    'Clear and concise summary that highlights key skills',
    'Well-structured education section with relevant details'
  ],
  improvements: [
    'Consider adding more industry-specific keywords',
    'Include more technical skills to improve ATS optimization',
    'Add links to portfolio or project examples'
  ],
  keywordMatch: {
    found: ['project management', 'leadership', 'agile', 'stakeholder management'],
    missing: ['scrum', 'budget management', 'risk assessment']
  },
  suggestions: [
    {
      section: 'Professional Summary',
      suggestions: [
        'Start with a strong action verb',
        'Mention years of experience',
        'Include key achievements'
      ]
    },
    {
      section: 'Work Experience',
      suggestions: [
        'Add more quantifiable results',
        'Use action verbs to start bullet points',
        'Include relevant technologies and methodologies'
      ]
    }
  ]
};

export default function AIResumeBuilder() {
  const [template, setTemplate] = useState('');
  const [sections, setSections] = useState(defaultSections);
  const [step, setStep] = useState<'template' | 'content'>('template');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTemplateSelect = (selectedTemplate: any) => {
    setTemplate(selectedTemplate.id);
    setStep('content');
  };

  const handleSectionUpdate = (updatedSections: ResumeSection[]) => {
    setSections(updatedSections);
  };

  const handleAIAssist = async (sectionId: string) => {
    // TODO: Implement AI assistance for section content
    console.log('AI Assist requested for section:', sectionId);
  };

  const handleRefreshAnalysis = async () => {
    setIsAnalyzing(true);
    // TODO: Implement real-time resume analysis
    setTimeout(() => setIsAnalyzing(false), 1500);
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
          <>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setStep('template')}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Templates
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <SectionEditor
                  sections={sections}
                  onUpdate={handleSectionUpdate}
                  onAIAssist={handleAIAssist}
                />
              </div>
              <div className="lg:col-span-1">
                <AIAnalysis
                  analysis={mockAnalysis}
                  onRefresh={handleRefreshAnalysis}
                  isLoading={isAnalyzing}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
}
