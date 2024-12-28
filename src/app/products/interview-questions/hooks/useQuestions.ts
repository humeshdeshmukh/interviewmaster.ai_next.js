import { useState, useMemo } from 'react';
import { Question, QuestionCategory, QuestionType, QuestionDifficulty } from '@/types';
import {
  getQuestionsByType,
  getQuestionsByCategory,
  getQuestionsByDifficulty,
  searchQuestions,
  sortQuestions
} from '../utils/questionHelpers';

interface UseQuestionsProps {
  initialQuestions: Question[];
}

interface Filters {
  type?: QuestionType;
  category?: QuestionCategory;
  difficulty?: QuestionDifficulty;
  searchQuery?: string;
}

interface Sort {
  by: 'likes' | 'views' | 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

export const useQuestions = ({ initialQuestions }: UseQuestionsProps) => {
  const [filters, setFilters] = useState<Filters>({});
  const [sort, setSort] = useState<Sort>({ by: 'createdAt', order: 'desc' });

  // Apply filters and sorting
  const filteredQuestions = useMemo(() => {
    let result = [...initialQuestions];

    // Apply type filter
    if (filters.type) {
      result = getQuestionsByType(result, filters.type);
    }

    // Apply category filter
    if (filters.category) {
      result = getQuestionsByCategory(result, filters.category);
    }

    // Apply difficulty filter
    if (filters.difficulty) {
      result = getQuestionsByDifficulty(result, filters.difficulty);
    }

    // Apply search filter
    if (filters.searchQuery) {
      result = searchQuestions(result, filters.searchQuery);
    }

    // Apply sorting
    result = sortQuestions(result, sort.by, sort.order);

    return result;
  }, [initialQuestions, filters, sort]);

  // Update filters
  const updateFilters = (newFilters: Partial<Filters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Update sort
  const updateSort = (newSort: Partial<Sort>) => {
    setSort(prev => ({ ...prev, ...newSort }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
  };

  // Reset to default sort
  const resetSort = () => {
    setSort({ by: 'createdAt', order: 'desc' });
  };

  return {
    questions: filteredQuestions,
    filters,
    sort,
    updateFilters,
    updateSort,
    clearFilters,
    resetSort
  };
};
