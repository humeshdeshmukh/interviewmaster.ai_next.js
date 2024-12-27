interface Answer {
  questionId: string;
  selectedAnswer: string;
  correctAnswer: string | number;
}

interface ScoreResult {
  score: number;
  accuracy: number;
  correctAnswers: number;
  wrongAnswers: number;
}

export const calculateScore = (answers: Answer[]): ScoreResult => {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(
    answer => answer.selectedAnswer === answer.correctAnswer.toString()
  ).length;
  
  const wrongAnswers = totalQuestions - correctAnswers;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const score = Math.round(accuracy);

  return {
    score,
    accuracy,
    correctAnswers,
    wrongAnswers
  };
};

export const getPerformanceLevel = (score: number): string => {
  if (score >= 90) return 'Expert';
  if (score >= 70) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  return 'Beginner';
};

export const generateFeedback = (score: number): string => {
  if (score >= 90) {
    return 'Excellent work! You demonstrate expert-level knowledge.';
  } else if (score >= 70) {
    return 'Good job! You show strong understanding with some room for improvement.';
  } else if (score >= 50) {
    return 'You\'re making progress! Focus on the areas where you made mistakes.';
  }
  return 'Keep practicing! Review the concepts and try again.';
};
