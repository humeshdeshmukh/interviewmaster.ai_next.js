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
    missing: ['scrum', 'budget management', 'risk assessment'],
    relevance: 0.75
  },
  suggestions: [
    {
      section: 'Professional Summary',
      priority: 'high',
      suggestions: [
        'Start with a strong action verb',
        'Mention years of experience',
        'Include key achievements'
      ]
    }
  ],
  industryFit: {
    score: 78,
    targetIndustry: 'Technology',
    matchingSkills: ['project management', 'leadership', 'agile'],
    missingSkills: ['cloud computing', 'DevOps']
  },
  atsOptimization: {
    score: 82,
    format: {
      issues: ['Inconsistent bullet point formatting'],
      suggestions: ['Use consistent bullet point symbols']
    },
    content: {
      issues: ['Missing key technical skills'],
      suggestions: ['Add more industry-specific keywords']
    }
  },
  readability: {
    score: 90,
    issues: ['Some sentences are too long'],
    suggestions: ['Break down complex sentences']
  },
  impact: {
    score: 85,
    weakPhrases: ['responsible for', 'worked on'],
    strongPhrases: ['led', 'implemented', 'achieved'],
    suggestions: ['Replace passive voice with active voice']
  },
  lastUpdated: new Date().toISOString(),
  version: '1.0.0'
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

  const handleBack = () => {
    setStep('template');
  };

  const renderContent = () => {
    if (step === 'template') {
      return (
        <div className="w-full">
          <TemplateSelector
            onSelect={handleTemplateSelect}
            selectedId={template}
          />
        </div>
      );
    }

    return (
      <div className="w-full">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="secondary"
            onClick={handleBack}
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
      </div>
    );
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
        {renderContent()}
      </div>
    </PageContainer>
  );
}
