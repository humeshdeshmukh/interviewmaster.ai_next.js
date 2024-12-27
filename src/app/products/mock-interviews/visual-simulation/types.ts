export interface InterviewQuestion {
  id: number;
  question: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  expectedDuration: number;
  keyPoints: string[];
  followUpQuestions: string[];
}

export interface InterviewSettings {
  duration: number;
  difficulty: string;
  category: string;
  subcategory: string;
  enableAIFeedback: boolean;
  enableTranscription: boolean;
}

export interface FeedbackMetrics {
  confidence: number;
  clarity: number;
  technicalAccuracy: number;
  communicationScore: number;
  eyeContact: number;
  posture: number;
}
