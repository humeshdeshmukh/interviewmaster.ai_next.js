export type ResumeTemplate = {
  id: string;
  name: string;
  description: string;
  preview?: string;
  isPopular?: boolean;
  category: 'Professional' | 'Creative' | 'Simple' | 'Modern' | 'Executive';
  features: string[];
  color?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
  layout: 'standard' | 'modern' | 'compact' | 'creative';
};

export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
  title?: string;
  summary?: string;
  photo?: string;
};

export type Experience = {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  technologies?: string[];
  achievements?: {
    metric: string;
    value: string;
    description: string;
  }[];
};

export type Education = {
  id: string;
  institution: string;
  degree: string;
  field: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  highlights?: string[];
  awards?: string[];
  courses?: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
  role?: string;
  teamSize?: number;
  impact?: string;
};

export type Skill = {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
  yearsOfExperience?: number;
  certifications?: string[];
  lastUsed?: string;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link?: string;
  credentialId?: string;
  skills?: string[];
};

export type Language = {
  id: string;
  name: string;
  proficiency: 'Elementary' | 'Limited Working' | 'Professional Working' | 'Full Professional' | 'Native/Bilingual';
  certifications?: string[];
};

export type Award = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
  link?: string;
};

export type Publication = {
  id: string;
  title: string;
  publisher: string;
  date: string;
  authors: string[];
  link?: string;
  doi?: string;
  abstract?: string;
};

export type Volunteer = {
  id: string;
  organization: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  highlights?: string[];
  impact?: string;
};

export type Reference = {
  id: string;
  name: string;
  title: string;
  company: string;
  email?: string;
  phone?: string;
  relationship: string;
  letter?: string;
};

export type ResumeSection = {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 
        'certifications' | 'languages' | 'awards' | 'publications' | 'volunteer' | 
        'references' | 'custom';
  title: string;
  content: any;
  order: number;
  isVisible: boolean;
  customIcon?: string;
  aiAssisted?: boolean;
  lastUpdated?: string;
  validationErrors?: string[];
};

export type AIAnalysis = {
  score: number;
  strengths: string[];
  improvements: string[];
  keywordMatch: {
    found: string[];
    missing: string[];
    relevance: number;
  };
  suggestions: {
    section: string;
    priority: 'high' | 'medium' | 'low';
    suggestions: string[];
    examples?: string[];
  }[];
  industryFit: {
    score: number;
    targetIndustry?: string;
    matchingSkills: string[];
    missingSkills: string[];
  };
  atsOptimization: {
    score: number;
    format: {
      issues: string[];
      suggestions: string[];
    };
    content: {
      issues: string[];
      suggestions: string[];
    };
  };
  readability: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
  impact: {
    score: number;
    weakPhrases: string[];
    strongPhrases: string[];
    suggestions: string[];
  };
  lastUpdated: string;
  version: string;
};

export type AIAssistRequest = {
  sectionId: string;
  sectionType: ResumeSection['type'];
  currentContent: any;
  context?: {
    jobTitle?: string;
    industry?: string;
    experienceLevel?: string;
    targetCompanies?: string[];
    keywords?: string[];
  };
};

export type AIAssistResponse = {
  suggestions: string[];
  improvements: string[];
  examples: string[];
  keywords: string[];
  formatting: {
    issues: string[];
    suggestions: string[];
  };
  generatedContent?: any;
};
