import { Test, TestCategory, Category, CategoryData } from './types';
import categoriesData from '../data/categories.json';

export class TestLoader {
  private static instance: TestLoader;
  private testsCache: Map<string, Map<string, TestCategory>> = new Map();
  private categories: Category[] = [];

  private constructor() {
    this.loadCategories();
  }

  private loadCategories() {
    const data = categoriesData as CategoryData;
    this.categories = data.categories;
  }

  public static getInstance(): TestLoader {
    if (!TestLoader.instance) {
      TestLoader.instance = new TestLoader();
    }
    return TestLoader.instance;
  }

  public async loadTestsForCategory(categoryId: string, subcategoryId: string): Promise<TestCategory | null> {
    try {
      if (!this.testsCache.has(categoryId)) {
        this.testsCache.set(categoryId, new Map());
      }

      const categoryCache = this.testsCache.get(categoryId)!;
      
      if (!categoryCache.has(subcategoryId)) {
        try {
          // Try to load the test from the correct category directory
          const test = await import(`../data/tests/${categoryId}/${subcategoryId}.json`);
          const testCategory: TestCategory = {
            tests: Array.isArray(test.default) ? test.default : [test.default]
          };
          categoryCache.set(subcategoryId, testCategory);
        } catch (error) {
          console.error(`Error loading test from ${categoryId}/${subcategoryId}:`, error);
          return null;
        }
      }

      return categoryCache.get(subcategoryId) || null;
    } catch (error) {
      console.error(`Error in loadTestsForCategory for ${categoryId}/${subcategoryId}:`, error);
      return null;
    }
  }

  public async getCategories(): Promise<Category[]> {
    return this.categories;
  }

  public async getSubcategories(categoryId: string): Promise<Category['subcategories']> {
    const category = this.categories.find(c => c.id === categoryId);
    return category?.subcategories || [];
  }

  public async getTestsByCategory(categoryId: string): Promise<Test[]> {
    const subcategories = await this.getSubcategories(categoryId);
    const allTests: Test[] = [];

    for (const subcategory of subcategories) {
      const testCategory = await this.loadTestsForCategory(categoryId, subcategory.id);
      if (testCategory && testCategory.tests) {
        allTests.push(...testCategory.tests);
      }
    }

    return allTests;
  }

  public async searchTests(query: string): Promise<Test[]> {
    const searchTerms = query.toLowerCase().split(' ');
    const results: Test[] = [];

    for (const category of this.categories) {
      for (const subcategory of category.subcategories) {
        try {
          const tests = await this.loadTestsForCategory(category.id, subcategory.id);
          if (tests) {
            const matchingTests = tests.tests.filter(test => {
              const searchText = `${test.title} ${test.description} ${test.difficulty} ${category.name} ${subcategory.name}`.toLowerCase();
              return searchTerms.every(term => searchText.includes(term));
            });
            results.push(...matchingTests);
          }
        } catch (error) {
          console.error(`Error loading tests for ${category.id}/${subcategory.id}:`, error);
        }
      }
    }

    return results;
  }

  public async getTestById(categoryId: string, subcategoryId: string, testId: string): Promise<Test | null> {
    try {
      const tests = await this.loadTestsForCategory(categoryId, subcategoryId);
      return tests?.tests.find(test => test.id === testId) || null;
    } catch (error) {
      console.error(`Error loading test ${testId}:`, error);
      return null;
    }
  }

  public clearCache(): void {
    this.testsCache.clear();
  }
}
