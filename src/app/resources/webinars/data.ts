export interface Webinar {
  id: string;
  title: string;
  description: string;
  speaker: {
    name: string;
    role: string;
    company: string;
  };
  date: string;
  duration: string;
  category: string;
  level: string;
  attendees: number;
  tags: string[];
  status: 'upcoming' | 'live' | 'recorded' | 'coming_soon';
  registrationUrl?: string;
  recordingUrl?: string;
}

export const webinarCategories = [
  'Technical Interview',
  'System Design',
  'Behavioral Interview',
  'Career Development',
  'Interview Preparation',
  'Company Specific'
];

// Current date: 2024-12-27
export const webinars: Webinar[] = [
  {
    id: 'faang-interview-prep',
    title: 'FAANG Interview Preparation Masterclass',
    description: 'Comprehensive guide to preparing for FAANG interviews. Learn proven strategies, common pitfalls, and get insider tips from experienced interviewers.',
    speaker: {
      name: 'David Miller',
      role: 'Senior Software Engineer',
      company: 'Meta'
    },
    date: '2024-01-15T14:00:00Z',
    duration: '90 minutes',
    category: 'Interview Preparation',
    level: 'Intermediate',
    attendees: 0,
    tags: ['faang', 'interview prep', 'career growth'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/faang-interview-prep'
  },
  {
    id: 'system-design-2024',
    title: 'Modern System Design for 2024',
    description: 'Master system design interviews with focus on microservices, distributed systems, and modern architectural patterns. Real-world examples from top tech companies.',
    speaker: {
      name: 'Arpit Bhayani',
      role: 'Principal Engineer',
      company: 'Stripe'
    },
    date: '2024-01-20T16:00:00Z',
    duration: '120 minutes',
    category: 'System Design',
    level: 'Advanced',
    attendees: 0,
    tags: ['system design', 'architecture', 'microservices'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/system-design-2024'
  },
  {
    id: 'behavioral-excellence',
    title: 'Mastering Behavioral Interviews: STAR Method Deep Dive',
    description: 'Learn how to structure your responses using the STAR method. Practice with real behavioral questions from top tech companies.',
    speaker: {
      name: 'Jennifer Wong',
      role: 'Engineering Manager',
      company: 'Google'
    },
    date: '2024-02-01T15:00:00Z',
    duration: '60 minutes',
    category: 'Behavioral Interview',
    level: 'Beginner',
    attendees: 0,
    tags: ['behavioral', 'soft skills', 'leadership'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/behavioral-excellence'
  },
  {
    id: 'amazon-leadership',
    title: 'Amazon Leadership Principles in Practice',
    description: 'Deep dive into Amazon\'s leadership principles and how to demonstrate them in your interviews. Includes real examples and practice scenarios.',
    speaker: {
      name: 'Robert Chen',
      role: 'Senior Manager',
      company: 'Amazon'
    },
    date: '2024-02-05T17:00:00Z',
    duration: '90 minutes',
    category: 'Company Specific',
    level: 'Intermediate',
    attendees: 0,
    tags: ['amazon', 'leadership principles', 'behavioral'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/amazon-leadership'
  },
  {
    id: 'coding-patterns',
    title: 'Essential Coding Patterns for Interviews',
    description: 'Master the most common coding patterns that appear in technical interviews. Includes live problem solving and optimization techniques.',
    speaker: {
      name: 'Kevin Naughton Jr.',
      role: 'Software Engineer',
      company: 'Google'
    },
    date: '2024-02-10T16:00:00Z',
    duration: '120 minutes',
    category: 'Technical Interview',
    level: 'Intermediate',
    attendees: 0,
    tags: ['algorithms', 'coding', 'problem solving'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/coding-patterns'
  },
  {
    id: 'career-growth-2024',
    title: 'Software Engineering Career Growth in 2024',
    description: 'Navigate your career path in software engineering. Learn about promotion criteria, skill development, and leadership opportunities in modern tech companies.',
    speaker: {
      name: 'Taro Yamamoto',
      role: 'Engineering Director',
      company: 'Microsoft'
    },
    date: '2024-02-15T15:00:00Z',
    duration: '90 minutes',
    category: 'Career Development',
    level: 'All Levels',
    attendees: 0,
    tags: ['career growth', 'leadership', 'skill development'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/career-growth-2024'
  },
  {
    id: 'netflix-culture',
    title: 'Netflix Engineering Culture and Interview Process',
    description: 'Understanding Netflix\'s unique engineering culture and interview process. Learn what makes Netflix different and how to prepare for their interviews.',
    speaker: {
      name: 'Michelle Lee',
      role: 'Senior Software Engineer',
      company: 'Netflix'
    },
    date: '2024-02-20T16:00:00Z',
    duration: '75 minutes',
    category: 'Company Specific',
    level: 'Intermediate',
    attendees: 0,
    tags: ['netflix', 'culture', 'interview process'],
    status: 'coming_soon',
    registrationUrl: '/resources/webinars/register/netflix-culture'
  }
];
