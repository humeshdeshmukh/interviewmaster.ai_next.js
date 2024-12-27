export interface ResumeSection {
  id: string;
  type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects' | 'certifications' | 'custom';
  title: string;
  content: any;
  order: number;
  isVisible?: boolean;
}

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  github?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
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
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category?: string;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  preview?: string;
  isPopular?: boolean;
  category: 'Professional' | 'Creative' | 'Simple' | 'Modern' | 'Executive';
  features: string[];
}

export interface AIAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  keywordMatch: {
    found: string[];
    missing: string[];
  };
  suggestions: {
    section: string;
    suggestions: string[];
  }[];
}
