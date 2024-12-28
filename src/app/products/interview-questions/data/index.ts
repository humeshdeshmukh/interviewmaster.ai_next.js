import { frontendQuestions } from './tech-questions/frontend';
import { backendQuestions } from './tech-questions/backend';
import { systemDesignQuestions } from './tech-questions/system-design';
import { algorithmQuestions } from './tech-questions/algorithms';
import { devopsQuestions } from './tech-questions/devops';
import { securityQuestions } from './tech-questions/security';
import { testingQuestions } from './tech-questions/testing';
import { databaseQuestions } from './tech-questions/database';
import { machineLearningQuestions } from './tech-questions/machine-learning';
import { leadershipQuestions } from './behavioral-questions/leadership';
import { problemSolvingQuestions } from './behavioral-questions/problem-solving';
import { communicationQuestions } from './behavioral-questions/communication';
import { timeManagementQuestions } from './behavioral-questions/time-management';
import { projectManagementQuestions } from './behavioral-questions/project-management';
import { innovationQuestions } from './behavioral-questions/innovation';
import type { Question } from '../types';

// Technical Questions Categories
export const technicalQuestions: Question[] = [
  ...frontendQuestions,
  ...backendQuestions,
  ...systemDesignQuestions,
  ...algorithmQuestions,
  ...devopsQuestions,
  ...securityQuestions,
  ...testingQuestions,
  ...databaseQuestions,
  ...machineLearningQuestions
];

// Behavioral Questions Categories
export const behavioralQuestions: Question[] = [
  ...leadershipQuestions,
  ...problemSolvingQuestions,
  ...communicationQuestions,
  ...timeManagementQuestions,
  ...projectManagementQuestions,
  ...innovationQuestions
];

// All Questions Combined
export const allQuestions: Question[] = [
  ...technicalQuestions,
  ...behavioralQuestions,
];

// Helper Functions

// Get questions by category
export const getQuestionsByCategory = (category: string): Question[] => {
  return allQuestions.filter(q => q.category === category);
};

// Get questions by company
export const getQuestionsByCompany = (company: string): Question[] => {
  return allQuestions.filter(q => q.company === company);
};

// Get bookmarked questions
export const getBookmarkedQuestions = (): Question[] => {
  return allQuestions.filter(q => q.isBookmarked);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return allQuestions.filter(q => q.difficulty === difficulty);
};

// Get questions by topic
export const getQuestionsByTopic = (topic: string): Question[] => {
  return allQuestions.filter(q => q.topic === topic);
};

// Search questions
export const searchQuestions = (query: string): Question[] => {
  const lowercaseQuery = query.toLowerCase();
  return allQuestions.filter(q => 
    q.title.toLowerCase().includes(lowercaseQuery) ||
    q.description.toLowerCase().includes(lowercaseQuery) ||
    q.details?.toLowerCase().includes(lowercaseQuery)
  );
};
