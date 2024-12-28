import { Category, Test } from './types';
import { categories } from '../data/categories';
import { technicalQuestions } from '../data/questions/technical';
import { systemDesignQuestions } from '../data/questions/system-design';
import { webDevQuestions } from '../data/questions/web-dev';

export class TestLoader {
  private static instance: TestLoader;
  private categories: Category[] = [];
  private tests: Test[] = [];

  private constructor() {
    // Load categories
    this.categories = categories;

    // Load all tests
    this.tests = this.loadAllTests();
  }

  private loadAllTests(): Test[] {
    const allTests: Test[] = [];

    // Add algorithm tests
    ['beginner', 'intermediate', 'advanced'].forEach((difficulty) => {
      if (technicalQuestions.algorithms[difficulty]) {
        const test: Test = {
          id: `algo-${difficulty}`,
          title: `Algorithm ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Test`,
          description: `A comprehensive ${difficulty} level test covering algorithm concepts and problem-solving strategies.`,
          difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
          timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 45 : 60,
          totalQuestions: technicalQuestions.algorithms[difficulty].length,
          category: 'technical',
          subcategory: 'algorithms',
          questions: technicalQuestions.algorithms[difficulty]
        };
        allTests.push(test);
      }
    });

    // Add system design tests
    Object.keys(systemDesignQuestions).forEach((difficulty) => {
      if (systemDesignQuestions[difficulty].length > 0) {
        const test: Test = {
          id: `sys-${difficulty}`,
          title: `System Design ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Test`,
          description: `A comprehensive ${difficulty} level test covering system design principles and best practices.`,
          difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
          timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 45 : 60,
          totalQuestions: systemDesignQuestions[difficulty].length,
          category: 'technical',
          subcategory: 'system-design',
          questions: systemDesignQuestions[difficulty]
        };
        allTests.push(test);
      }
    });

    // Add web development tests
    Object.keys(webDevQuestions).forEach((difficulty) => {
      if (webDevQuestions[difficulty].length > 0) {
        const test: Test = {
          id: `web-${difficulty}`,
          title: `Web Development ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Test`,
          description: `A comprehensive ${difficulty} level test covering web development concepts and best practices.`,
          difficulty: difficulty as 'beginner' | 'intermediate' | 'advanced',
          timeLimit: difficulty === 'beginner' ? 30 : difficulty === 'intermediate' ? 45 : 60,
          totalQuestions: webDevQuestions[difficulty].length,
          category: 'technical',
          subcategory: 'web-dev',
          questions: webDevQuestions[difficulty]
        };
        allTests.push(test);
      }
    });

    return allTests;
  }

  public static getInstance(): TestLoader {
    if (!TestLoader.instance) {
      TestLoader.instance = new TestLoader();
    }
    return TestLoader.instance;
  }

  public async getCategories(): Promise<Category[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return this.categories;
  }

  public async getAllTests(): Promise<Test[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return this.tests;
  }

  public async loadTestsForCategory(categoryId: string, subcategoryId: string): Promise<{ tests: Test[] } | null> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    const filteredTests = this.tests.filter(
      test => test.category === categoryId && test.subcategory === subcategoryId
    );
    return filteredTests.length > 0 ? { tests: filteredTests } : null;
  }
}
