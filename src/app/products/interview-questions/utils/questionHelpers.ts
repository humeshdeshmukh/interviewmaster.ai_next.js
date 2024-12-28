import { Question, QuestionCategory, QuestionType, QuestionDifficulty } from '../types';

// Get all questions by type (Tech or Non-Tech)
export const getQuestionsByType = (questions: Question[] | null, type: QuestionType): Question[] => {
  if (!questions) return [];
  return questions.filter(q => q.type === type);
};

// Get questions by category
export const getQuestionsByCategory = (questions: Question[] | null, category: QuestionCategory): Question[] => {
  if (!questions) return [];
  return questions.filter(q => q.category === category);
};

// Get questions by difficulty
export const getQuestionsByDifficulty = (questions: Question[] | null, difficulty: QuestionDifficulty): Question[] => {
  if (!questions) return [];
  return questions.filter(q => q.difficulty === difficulty);
};

// Get questions by company
export const getQuestionsByCompany = (questions: Question[] | null, company: string): Question[] => {
  if (!questions) return [];
  return questions.filter(q => q.company?.toLowerCase() === company.toLowerCase());
};

// Get bookmarked questions
export const getBookmarkedQuestions = (questions: Question[] | null): Question[] => {
  if (!questions) return [];
  return questions.filter(q => q.isBookmarked);
};

// Search questions by query
export const searchQuestions = (questions: Question[] | null, query: string): Question[] => {
  if (!questions) return [];
  const lowercaseQuery = query.toLowerCase();
  return questions.filter(q => 
    q.title?.toLowerCase().includes(lowercaseQuery) ||
    q.description?.toLowerCase().includes(lowercaseQuery) ||
    q.details?.toLowerCase().includes(lowercaseQuery) ||
    q.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

// Sort questions by various criteria
export const sortQuestions = (
  questions: Question[] | null,
  sortBy: 'likes' | 'views' | 'createdAt' | 'updatedAt',
  order: 'asc' | 'desc' = 'desc'
): Question[] => {
  if (!questions) return [];
  return [...questions].sort((a, b) => {
    const aValue = a[sortBy] ?? 0;
    const bValue = b[sortBy] ?? 0;
    return order === 'asc' ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
  });
};

// Get related questions based on category and tags
export const getRelatedQuestions = (
  questions: Question[] | null,
  currentQuestion: Question | null,
  limit: number = 5
): Question[] => {
  if (!questions || !currentQuestion) return [];
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
export const getQuestionStats = (questions: Question[] | null) => {
  if (!questions) return null;

  const categories: QuestionCategory[] = [
    'Frontend', 'Backend', 'System Design', 'Data Structures', 
    'Algorithms', 'DevOps', 'Security', 'Testing', 
    'Database', 'Machine Learning', 'Leadership', 
    'Problem Solving', 'Communication', 'Time Management', 
    'Project Management', 'Innovation'
  ];

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
    byCategory: categories.reduce((acc: Record<QuestionCategory, number>, category) => {
      acc[category] = questions.filter(q => q.category === category).length;
      return acc;
    }, {} as Record<QuestionCategory, number>)
  };
};

// Generate unique ID for new questions
export const generateQuestionId = (questions: Question[] | null): number => {
  if (!questions) return 1;
  const maxId = Math.max(...questions.map(q => q.id ?? 0));
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
