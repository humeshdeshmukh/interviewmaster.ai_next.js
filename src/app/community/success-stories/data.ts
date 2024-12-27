import { IconType } from 'react-icons';

export interface SuccessStory {
  id: string;
  name: string;
  avatar: string;
  role: string;
  company: {
    name: string;
    logo: string;
    color: string;
  };
  previousRole?: string;
  previousCompany?: string;
  story: string;
  interview: {
    preparation: string;
    duration: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    topics: string[];
  };
  tips: string[];
  metrics: {
    practiceHours: number;
    mockInterviews: number;
    offerIncrease: string;
  };
  featured?: boolean;
  testimonial: string;
  date: string;
}

export const categories = [
  { value: 'all', label: 'All Stories' },
  { value: 'software', label: 'Software Engineering' },
  { value: 'frontend', label: 'Frontend Development' },
  { value: 'backend', label: 'Backend Development' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'data', label: 'Data Science' }
];

export const companies = [
  { value: 'all', label: 'All Companies' },
  { value: 'google', label: 'Google' },
  { value: 'meta', label: 'Meta' },
  { value: 'amazon', label: 'Amazon' },
  { value: 'microsoft', label: 'Microsoft' },
  { value: 'apple', label: 'Apple' }
];

export const successStories: SuccessStory[] = [
  {
    id: '1',
    name: 'Michael Chen',
    avatar: '/success-stories/michael.jpg',
    role: 'Senior Software Engineer',
    company: {
      name: 'Google',
      logo: '/companies/google.svg',
      color: '#4285F4'
    },
    previousRole: 'Software Engineer',
    previousCompany: 'Mid-sized Startup',
    story: 'After 3 years at a startup, I decided to aim for Big Tech. InterviewMaster.ai helped me structure my preparation and master system design concepts I was missing. The mentorship from experienced Google engineers was invaluable.',
    interview: {
      preparation: '3 months',
      duration: '5 rounds',
      difficulty: 'Hard',
      topics: ['System Design', 'Algorithms', 'Leadership Principles']
    },
    tips: [
      'Focus on distributed systems concepts',
      'Practice explaining your thought process clearly',
      'Do at least one mock interview per week',
      'Study Google-specific design patterns'
    ],
    metrics: {
      practiceHours: 150,
      mockInterviews: 12,
      offerIncrease: '85%'
    },
    featured: true,
    testimonial: 'The structured approach and expert mentorship from InterviewMaster.ai were game-changers in my preparation. I went from feeling overwhelmed to confident in handling any technical question.',
    date: '2024-12-01'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    avatar: '/success-stories/sarah.jpg',
    role: 'Frontend Engineer',
    company: {
      name: 'Meta',
      logo: '/companies/meta.svg',
      color: '#0668E1'
    },
    previousRole: 'Junior Developer',
    previousCompany: 'E-commerce Company',
    story: 'Coming from a non-CS background, I was intimidated by Meta interviews. InterviewMaster.ai provided me with a clear roadmap and frontend-specific resources that helped me succeed.',
    interview: {
      preparation: '4 months',
      duration: '4 rounds',
      difficulty: 'Medium',
      topics: ['React', 'JavaScript', 'System Design', 'Problem Solving']
    },
    tips: [
      'Master React internals and performance optimization',
      'Focus on real-world frontend system design',
      'Practice coding on whiteboard',
      'Study Meta-specific frontend architecture'
    ],
    metrics: {
      practiceHours: 200,
      mockInterviews: 15,
      offerIncrease: '95%'
    },
    testimonial: 'The frontend-specific mock interviews and detailed feedback helped me identify and improve my weak areas. The community support was incredible.',
    date: '2024-11-15'
  },
  {
    id: '3',
    name: 'David Kumar',
    avatar: '/success-stories/david.jpg',
    role: 'Software Development Engineer',
    company: {
      name: 'Amazon',
      logo: '/companies/amazon.svg',
      color: '#FF9900'
    },
    previousRole: 'Backend Developer',
    previousCompany: 'Financial Tech',
    story: 'InterviewMaster.ai helped me understand Amazon\'s leadership principles and how to incorporate them into my technical answers. The behavioral interview preparation was exceptional.',
    interview: {
      preparation: '2.5 months',
      duration: '6 rounds',
      difficulty: 'Hard',
      topics: ['System Design', 'Leadership Principles', 'Algorithms']
    },
    tips: [
      'Structure stories using STAR method',
      'Practice leadership principle examples',
      'Focus on scalable system design',
      'Learn about Amazon\'s architectural practices'
    ],
    metrics: {
      practiceHours: 120,
      mockInterviews: 10,
      offerIncrease: '75%'
    },
    featured: true,
    testimonial: 'The combination of technical preparation and leadership principle coaching made all the difference. I felt well-prepared for both aspects of the interview.',
    date: '2024-11-30'
  },
  {
    id: '4',
    name: 'Emily Zhang',
    avatar: '/success-stories/emily.jpg',
    role: 'Senior Frontend Engineer',
    company: {
      name: 'Microsoft',
      logo: '/companies/microsoft.svg',
      color: '#00A4EF'
    },
    previousRole: 'Frontend Developer',
    previousCompany: 'Agency',
    story: 'The structured learning path and frontend system design modules from InterviewMaster.ai were exactly what I needed. The platform helped me level up my technical communication skills significantly.',
    interview: {
      preparation: '3 months',
      duration: '4 rounds',
      difficulty: 'Medium',
      topics: ['Frontend Architecture', 'JavaScript', 'System Design', 'Behavioral']
    },
    tips: [
      'Deep dive into frontend architecture patterns',
      'Practice explaining technical decisions',
      'Study Microsoft-specific frontend practices',
      'Focus on accessibility and performance'
    ],
    metrics: {
      practiceHours: 160,
      mockInterviews: 8,
      offerIncrease: '70%'
    },
    testimonial: 'The frontend system design content was particularly helpful. It covered aspects that are rarely discussed in other resources.',
    date: '2024-12-10'
  }
];

export const experienceLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'junior', label: 'Junior (0-3 years)' },
  { value: 'mid', label: 'Mid-Level (3-6 years)' },
  { value: 'senior', label: 'Senior (6+ years)' }
];
