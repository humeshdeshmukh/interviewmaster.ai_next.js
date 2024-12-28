import { Category, Test } from './types';

export class TestLoader {
  private static instance: TestLoader;
  private categories: Category[] = [];
  private tests: Test[] = [];

  private constructor() {
    // Initialize with sample data
    this.categories = [
      {
        id: 'algorithms',
        name: 'Algorithms',
        subcategories: [
          { id: 'sorting', name: 'Sorting Algorithms' },
          { id: 'searching', name: 'Searching Algorithms' },
          { id: 'dynamic', name: 'Dynamic Programming' }
        ]
      },
      {
        id: 'data-structures',
        name: 'Data Structures',
        subcategories: [
          { id: 'arrays', name: 'Arrays and Strings' },
          { id: 'linked-lists', name: 'Linked Lists' },
          { id: 'trees', name: 'Trees and Graphs' }
        ]
      },
      {
        id: 'system-design',
        name: 'System Design',
        subcategories: [
          { id: 'basics', name: 'Basic Concepts' },
          { id: 'scalability', name: 'Scalability & Performance' },
          { id: 'distributed', name: 'Distributed Systems' }
        ]
      }
    ];

    this.tests = [
      {
        id: '1',
        title: 'Basic Sorting Algorithms',
        description: 'Practice implementing and analyzing common sorting algorithms including Bubble Sort, Selection Sort, and Insertion Sort.',
        difficulty: 'beginner',
        timeLimit: 30,
        totalQuestions: 10,
        category: 'algorithms',
        subcategory: 'sorting',
        questions: [
          {
            id: '1-1',
            text: 'What is the time complexity of Bubble Sort in the worst case?',
            options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
            correctAnswer: 'O(n²)',
            explanation: 'Bubble Sort has a worst-case time complexity of O(n²) because it uses nested loops to compare and swap adjacent elements.'
          }
        ]
      },
      {
        id: '2',
        title: 'Advanced Tree Operations',
        description: 'Complex problems involving binary trees, balanced BSTs, and tree traversal algorithms.',
        difficulty: 'advanced',
        timeLimit: 60,
        totalQuestions: 15,
        category: 'data-structures',
        subcategory: 'trees',
        questions: [
          {
            id: '2-1',
            text: 'What is the time complexity of inserting a node into a balanced BST?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
            correctAnswer: 'O(log n)',
            explanation: 'In a balanced BST, insertion takes O(log n) time as we only need to traverse one path from root to leaf.'
          }
        ]
      },
      {
        id: '3',
        title: 'Array Manipulation Techniques',
        description: 'Learn and practice various array manipulation algorithms and techniques.',
        difficulty: 'intermediate',
        timeLimit: 45,
        totalQuestions: 12,
        category: 'data-structures',
        subcategory: 'arrays',
        questions: [
          {
            id: '3-1',
            text: 'Which algorithm is most efficient for finding the kth largest element in an unsorted array?',
            options: ['Quick Select', 'Merge Sort', 'Bubble Sort', 'Linear Search'],
            correctAnswer: 'Quick Select',
            explanation: 'Quick Select has an average time complexity of O(n) which is more efficient than sorting the entire array.'
          }
        ]
      },
      {
        id: '4',
        title: 'System Design Fundamentals',
        description: 'Learn the basic concepts and principles of system design.',
        difficulty: 'beginner',
        timeLimit: 40,
        totalQuestions: 10,
        category: 'system-design',
        subcategory: 'basics',
        questions: [
          {
            id: '4-1',
            text: 'What is the primary purpose of using a load balancer?',
            options: [
              'To distribute traffic across multiple servers',
              'To store data in the database',
              'To cache frequently accessed data',
              'To encrypt network traffic'
            ],
            correctAnswer: 'To distribute traffic across multiple servers',
            explanation: 'Load balancers help distribute incoming network traffic across multiple servers to ensure no single server bears too much load.'
          }
        ]
      },
      {
        id: '5',
        title: 'Dynamic Programming Basics',
        description: 'Introduction to dynamic programming concepts and simple problems.',
        difficulty: 'intermediate',
        timeLimit: 50,
        totalQuestions: 8,
        category: 'algorithms',
        subcategory: 'dynamic',
        questions: [
          {
            id: '5-1',
            text: 'Which of the following is NOT a characteristic of Dynamic Programming?',
            options: [
              'Optimal Substructure',
              'Overlapping Subproblems',
              'Random Access Memory',
              'Memoization'
            ],
            correctAnswer: 'Random Access Memory',
            explanation: 'Dynamic Programming is characterized by optimal substructure and overlapping subproblems. Random Access Memory is not a specific characteristic of DP.'
          }
        ]
      }
    ];
  }

  public static getInstance(): TestLoader {
    if (!TestLoader.instance) {
      TestLoader.instance = new TestLoader();
    }
    return TestLoader.instance;
  }

  public async getCategories(): Promise<Category[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.categories;
  }

  public async getAllTests(): Promise<Test[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.tests;
  }

  public async loadTestsForCategory(categoryId: string, subcategoryId: string): Promise<{ tests: Test[] } | null> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    const filteredTests = this.tests.filter(
      test => test.category === categoryId && test.subcategory === subcategoryId
    );
    return { tests: filteredTests };
  }
}
