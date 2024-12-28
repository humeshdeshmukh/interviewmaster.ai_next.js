import { Test } from '../../utils/types';

export const leadershipTests: Test[] = [
  {
    id: 'lead-beginner',
    title: 'Leadership Fundamentals',
    description: 'Learn basic leadership concepts and team management principles.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'behavioral',
    subcategory: 'leadership',
    questions: [
      {
        id: 'lead-b-1',
        text: 'A team member consistently delivers work late but with high quality. How would you address this situation?',
        options: [
          'Immediately implement strict deadlines',
          'Ignore the delays since quality is good',
          'Have a discussion to understand the underlying causes',
          'Reassign them to easier tasks'
        ],
        correctAnswer: 'Have a discussion to understand the underlying causes',
        explanation: 'A good leader first seeks to understand the root cause of issues and works collaboratively with team members to find solutions.'
      },
      {
        id: 'lead-b-2',
        text: 'What is the most effective way to motivate a team?',
        options: [
          'Offer monetary rewards',
          'Set clear goals and provide recognition',
          'Implement strict policies',
          'Increase supervision'
        ],
        correctAnswer: 'Set clear goals and provide recognition',
        explanation: 'Clear goals give direction while recognition fulfills psychological needs for appreciation and accomplishment.'
      },
      {
        id: 'lead-b-3',
        text: 'How should you handle disagreements between team members?',
        options: [
          'Let them resolve it themselves',
          'Take sides with the more senior member',
          'Facilitate a discussion to find common ground',
          'Ignore the conflict'
        ],
        correctAnswer: 'Facilitate a discussion to find common ground',
        explanation: 'Leaders should mediate conflicts constructively, helping team members understand each other's perspectives and find solutions.'
      },
      {
        id: 'lead-b-4',
        text: 'What is the best approach to giving negative feedback?',
        options: [
          'Be direct and harsh to make the point clear',
          'Avoid giving negative feedback',
          'Give it privately and constructively',
          'Send it via email'
        ],
        correctAnswer: 'Give it privately and constructively',
        explanation: 'Feedback should be given privately, focusing on specific behaviors and potential improvements rather than personal criticism.'
      },
      {
        id: 'lead-b-5',
        text: 'How do you handle a team member who is resistant to change?',
        options: [
          'Force them to comply',
          'Explain the benefits and address concerns',
          'Ignore their resistance',
          'Remove them from the project'
        ],
        correctAnswer: 'Explain the benefits and address concerns',
        explanation: 'Understanding and addressing concerns while clearly communicating benefits helps overcome resistance to change.'
      },
      {
        id: 'lead-b-6',
        text: 'What is the most important quality of a leader?',
        options: [
          'Technical expertise',
          'Emotional intelligence',
          'Years of experience',
          'Authority'
        ],
        correctAnswer: 'Emotional intelligence',
        explanation: 'Emotional intelligence enables leaders to understand and connect with team members, leading to better relationships and outcomes.'
      },
      {
        id: 'lead-b-7',
        text: 'How should you handle a mistake you made as a leader?',
        options: [
          'Hide it to maintain authority',
          'Blame external factors',
          'Acknowledge it and learn from it',
          'Minimize its importance'
        ],
        correctAnswer: 'Acknowledge it and learn from it',
        explanation: 'Leaders should model accountability by acknowledging mistakes, learning from them, and showing how to handle them professionally.'
      },
      {
        id: 'lead-b-8',
        text: 'What is the best way to delegate tasks?',
        options: [
          'Assign based on availability only',
          'Do everything yourself',
          'Match tasks to skills and provide support',
          'Give tasks to the most experienced'
        ],
        correctAnswer: 'Match tasks to skills and provide support',
        explanation: 'Effective delegation involves matching tasks to team members' skills while providing necessary support and guidance.'
      },
      {
        id: 'lead-b-9',
        text: 'How do you build trust within a team?',
        options: [
          'Keep information confidential',
          'Be consistent and transparent',
          'Maintain strict control',
          'Avoid personal connections'
        ],
        correctAnswer: 'Be consistent and transparent',
        explanation: 'Consistency in words and actions, combined with transparency, helps build and maintain trust within teams.'
      },
      {
        id: 'lead-b-10',
        text: 'What should you do when a team is underperforming?',
        options: [
          'Replace team members',
          'Increase pressure and deadlines',
          'Analyze root causes and address them',
          'Lower expectations'
        ],
        correctAnswer: 'Analyze root causes and address them',
        explanation: 'Understanding and addressing the root causes of underperformance is more effective than punitive measures.'
      }
    ]
  }
  // Add intermediate and advanced tests
];
