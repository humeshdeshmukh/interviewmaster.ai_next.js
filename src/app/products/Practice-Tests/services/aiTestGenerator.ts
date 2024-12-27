import OpenAI from 'openai';

interface GenerateTestParams {
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  numberOfQuestions: number;
  specificConcepts?: string[];
}

interface GeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface GeneratedTest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  timeLimit: number;
  questions: GeneratedQuestion[];
  totalQuestions: number;
  passingScore: number;
  concepts: string[];
}

const defaultSystemPrompt = `You are an expert technical interviewer specializing in creating high-quality practice tests. 
Generate questions that:
1. Are clear and unambiguous
2. Have exactly one correct answer
3. Include detailed explanations
4. Are at the appropriate difficulty level
5. Cover practical, real-world scenarios`;

export class AITestGenerator {
  private openai: OpenAI;
  private cache: Map<string, GeneratedTest>;

  constructor() {
    // Initialize OpenAI with API key from environment variable
    this.openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true
    });
    this.cache = new Map();
  }

  async generateTest({
    topic,
    difficulty,
    numberOfQuestions,
    specificConcepts
  }: GenerateTestParams): Promise<GeneratedTest> {
    try {
      // Check cache first
      const cacheKey = this.getCacheKey(topic, difficulty, numberOfQuestions, specificConcepts);
      const cachedTest = this.cache.get(cacheKey);
      if (cachedTest) {
        return cachedTest;
      }

      const prompt = this.constructPrompt(topic, difficulty, numberOfQuestions, specificConcepts);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: defaultSystemPrompt
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      const response = completion.choices[0].message.content;
      const generatedTest = this.parseResponse(response, topic, difficulty, numberOfQuestions);
      
      // Cache the result
      this.cache.set(cacheKey, generatedTest);
      
      return generatedTest;
    } catch (error) {
      console.error('Error generating test:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Failed to generate test. Please try again.'
      );
    }
  }

  private getCacheKey(
    topic: string,
    difficulty: string,
    numberOfQuestions: number,
    specificConcepts?: string[]
  ): string {
    return `${topic}-${difficulty}-${numberOfQuestions}-${specificConcepts?.join(',') || ''}`;
  }

  private constructPrompt(
    topic: string,
    difficulty: string,
    numberOfQuestions: number,
    specificConcepts?: string[]
  ): string {
    const conceptsStr = specificConcepts?.length 
      ? `Focus on these specific concepts: ${specificConcepts.join(', ')}\n`
      : '';

    return `Generate a ${difficulty} level practice test for ${topic} with ${numberOfQuestions} questions.
    ${conceptsStr}
    
    Requirements:
    1. Questions should be challenging but fair for the ${difficulty} level
    2. Include practical, real-world scenarios
    3. Each question should test a different aspect of ${topic}
    4. Provide detailed explanations for why each answer is correct
    
    Return the response in this JSON format:
    {
      "title": "Test title",
      "description": "A brief description of what this test covers",
      "questions": [
        {
          "question": "The question text",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": 0,
          "explanation": "Detailed explanation of why this answer is correct"
        }
      ],
      "concepts": ["concept1", "concept2"]
    }`;
  }

  private parseResponse(
    response: string | null,
    topic: string,
    difficulty: string,
    numberOfQuestions: number
  ): GeneratedTest {
    if (!response) {
      throw new Error('No response received from AI');
    }

    try {
      const parsed = JSON.parse(response);
      
      // Validate the response format
      if (!parsed.title || !parsed.description || !Array.isArray(parsed.questions)) {
        throw new Error('Invalid response format from AI');
      }

      // Validate each question
      parsed.questions.forEach((q: any, index: number) => {
        if (!q.question || !Array.isArray(q.options) || q.options.length !== 4 ||
            typeof q.correctAnswer !== 'number' || !q.explanation) {
          throw new Error(`Invalid question format at index ${index}`);
        }
      });

      return {
        id: `ai-${topic}-${Date.now()}`,
        title: parsed.title,
        description: parsed.description,
        difficulty,
        timeLimit: this.calculateTimeLimit(numberOfQuestions, difficulty),
        questions: parsed.questions,
        totalQuestions: numberOfQuestions,
        passingScore: this.calculatePassingScore(difficulty),
        concepts: parsed.concepts || []
      };
    } catch (error) {
      console.error('Error parsing AI response:', error);
      throw new Error('Failed to parse AI response. Please try again.');
    }
  }

  private calculateTimeLimit(numberOfQuestions: number, difficulty: string): number {
    const baseTimePerQuestion = {
      'Beginner': 1.5,
      'Intermediate': 2,
      'Advanced': 2.5,
      'Expert': 3
    }[difficulty] || 2;

    return Math.ceil(numberOfQuestions * baseTimePerQuestion);
  }

  private calculatePassingScore(difficulty: string): number {
    return {
      'Beginner': 60,
      'Intermediate': 70,
      'Advanced': 75,
      'Expert': 80
    }[difficulty] || 70;
  }
}
