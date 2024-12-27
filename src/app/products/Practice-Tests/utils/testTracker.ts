export interface TestAttempt {
  testId: string;
  category: string;
  score: number;
  timeSpent: number;
  correctAnswers: number;
  wrongAnswers: number;
  skippedAnswers: number;
  answers: { [questionId: string]: number };
  timestamp: string;
}

export interface TestStats {
  averageScore: number;
  totalTests: number;
  bestScore: number;
  worstScore: number;
  averageTime: number;
  categoryScores: { [category: string]: number };
}

export class TestTracker {
  private static instance: TestTracker;
  private readonly STORAGE_KEY = 'test_attempts';

  private constructor() {}

  public static getInstance(): TestTracker {
    if (!TestTracker.instance) {
      TestTracker.instance = new TestTracker();
    }
    return TestTracker.instance;
  }

  public saveAttempt(attempt: Omit<TestAttempt, 'timestamp'>): void {
    const attempts = this.getAttempts();
    const newAttempt: TestAttempt = {
      ...attempt,
      timestamp: new Date().toISOString()
    };
    attempts.push(newAttempt);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(attempts));
  }

  public getAttempts(): TestAttempt[] {
    try {
      const attempts = localStorage.getItem(this.STORAGE_KEY);
      return attempts ? JSON.parse(attempts) : [];
    } catch {
      return [];
    }
  }

  public getTestStats(): TestStats {
    const attempts = this.getAttempts();
    if (attempts.length === 0) {
      return {
        averageScore: 0,
        totalTests: 0,
        bestScore: 0,
        worstScore: 0,
        averageTime: 0,
        categoryScores: {}
      };
    }

    const scores = attempts.map(a => a.score);
    const times = attempts.map(a => a.timeSpent);
    const categories = attempts.reduce((acc, curr) => {
      if (!acc[curr.category]) {
        acc[curr.category] = [];
      }
      acc[curr.category].push(curr.score);
      return acc;
    }, {} as { [key: string]: number[] });

    return {
      averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      totalTests: attempts.length,
      bestScore: Math.max(...scores),
      worstScore: Math.min(...scores),
      averageTime: times.reduce((a, b) => a + b, 0) / times.length,
      categoryScores: Object.entries(categories).reduce((acc, [category, scores]) => {
        acc[category] = scores.reduce((a, b) => a + b, 0) / scores.length;
        return acc;
      }, {} as { [key: string]: number })
    };
  }

  public getTestHistory(testId: string): TestAttempt[] {
    return this.getAttempts().filter(a => a.testId === testId);
  }

  public getCategoryProgress(category: string): {
    testsAttempted: number;
    averageScore: number;
    timeSpent: number;
    strongTopics: string[];
    weakTopics: string[];
  } {
    const attempts = this.getAttempts().filter(a => a.category === category);
    if (attempts.length === 0) {
      return {
        testsAttempted: 0,
        averageScore: 0,
        timeSpent: 0,
        strongTopics: [],
        weakTopics: []
      };
    }

    const scores = attempts.map(a => a.score);
    const timeSpent = attempts.reduce((acc, curr) => acc + curr.timeSpent, 0);

    // Analyze question performance to identify strong/weak topics
    const questionStats = attempts.reduce((acc, attempt) => {
      Object.entries(attempt.answers).forEach(([questionId, answer]) => {
        if (!acc[questionId]) {
          acc[questionId] = { correct: 0, total: 0 };
        }
        acc[questionId].total++;
        if (answer === attempt.correctAnswers) {
          acc[questionId].correct++;
        }
      });
      return acc;
    }, {} as { [key: string]: { correct: number; total: number } });

    const topics = Object.entries(questionStats).map(([id, stats]) => ({
      id,
      performance: (stats.correct / stats.total) * 100
    }));

    return {
      testsAttempted: attempts.length,
      averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
      timeSpent,
      strongTopics: topics.filter(t => t.performance >= 80).map(t => t.id),
      weakTopics: topics.filter(t => t.performance < 60).map(t => t.id)
    };
  }

  public clearHistory(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}
