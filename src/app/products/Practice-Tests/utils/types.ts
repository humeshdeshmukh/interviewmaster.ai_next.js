export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Test {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  difficulty: string;
  timeLimit: number;
  totalQuestions: number;
  questions: Question[];
  resources: {
    title: string;
    url: string;
  }[];
  tags: string[];
}

export interface TestCategory {
  tests: Test[];
}

export interface Subcategory {
  id: string;
  name: string;
  description: string;
  difficulty: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface CategoryData {
  categories: Category[];
}
