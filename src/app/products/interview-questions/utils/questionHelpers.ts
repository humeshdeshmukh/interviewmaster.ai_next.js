import { Question, QuestionCategory, QuestionType, QuestionDifficulty } from '@/types';

// Get all questions by type (Tech or Non-Tech)
export const getQuestionsByType = (questions: Question[], type: QuestionType): Question[] => {
  return questions.filter(q => q.type === type);
};

// Get questions by category
export const getQuestionsByCategory = (questions: Question[], category: QuestionCategory): Question[] => {
  return questions.filter(q => q.category === category);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (questions: Question[], difficulty: QuestionDifficulty): Question[] => {
  return questions.filter(q => q.difficulty === difficulty);
};

// Get questions by company
export const getQuestionsByCompany = (questions: Question[], company: string): Question[] => {
  return questions.filter(q => q.company?.toLowerCase() === company.toLowerCase());
};

// Get bookmarked questions
export const getBookmarkedQuestions = (questions: Question[]): Question[] => {
  return questions.filter(q => q.isBookmarked);
};

// Search questions by query
export const searchQuestions = (questions: Question[], query: string): Question[] => {
  const lowercaseQuery = query.toLowerCase();
  return questions.filter(q => 
    q.title.toLowerCase().includes(lowercaseQuery) ||
    q.description.toLowerCase().includes(lowercaseQuery) ||
    q.details?.toLowerCase().includes(lowercaseQuery) ||
    q.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Sort questions by various criteria
export const sortQuestions = (
  questions: Question[],
  sortBy: 'likes' | 'views' | 'createdAt' | 'updatedAt',
  order: 'asc' | 'desc' = 'desc'
): Question[] => {
  return [...questions].sort((a, b) => {
    const aValue = a[sortBy] || 0;
    const bValue = b[sortBy] || 0;
    return order === 'asc' ? aValue - bValue : bValue - aValue;
  });
};

// Get related questions based on category and tags
export const getRelatedQuestions = (
  questions: Question[],
  currentQuestion: Question,
  limit: number = 5
): Question[] => {
  return questions
    .filter(q => 
      q.id !== currentQuestion.id && (
        q.category === currentQuestion.category ||
        q.tags?.some(tag => currentQuestion.tags?.includes(tag))
      )
    )
    .slice(0, limit);
};

// Get question statistics
export const getQuestionStats = (questions: Question[]) => {
  return {
    total: questions.length,
    byType: {
      Tech: questions.filter(q => q.type === 'Tech').length,
      'Non-Tech': questions.filter(q => q.type === 'Non-Tech').length
    },
    byDifficulty: {
      Easy: questions.filter(q => q.difficulty === 'Easy').length,
      Medium: questions.filter(q => q.difficulty === 'Medium').length,
      Hard: questions.filter(q => q.difficulty === 'Hard').length
    },
    byCategory: Object.values(QuestionCategory).reduce((acc, category) => {
      acc[category] = questions.filter(q => q.category === category).length;
      return acc;
    }, {} as Record<QuestionCategory, number>)
  };
};

// Generate unique ID for new questions
export const generateQuestionId = (questions: Question[]): number => {
  const maxId = Math.max(...questions.map(q => q.id));
  return maxId + 1;
};

// Validate question data
export const validateQuestion = (question: Partial<Question>): string[] => {
  const errors: string[] = [];

  if (!question.title?.trim()) {
    errors.push('Title is required');
  }

  if (!question.description?.trim()) {
    errors.push('Description is required');
  }

  if (!question.type) {
    errors.push('Type is required');
  }

  if (!question.category) {
    errors.push('Category is required');
  }

  if (!question.difficulty) {
    errors.push('Difficulty is required');
  }

  return errors;
};
