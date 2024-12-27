declare module '*.json' {
  const value: {
    category: string;
    tests: Array<{
      id: string;
      title: string;
      description: string;
      difficulty: string;
      timeLimit: number;
      totalQuestions: number;
      passingScore: number;
      questions: Array<{
        id: string;
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      }>;
    }>;
  };
  export default value;
}
