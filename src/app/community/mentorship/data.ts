import { FaCode, FaLaptop, FaBrain, FaChartLine, FaDatabase, FaCloud } from 'react-icons/fa';

export interface Mentor {
  id: string;
  name: string;
  avatar?: string;
  title: string;
  company: string;
  yearsOfExperience: number;
  specialties: string[];
  expertise: ('algorithms' | 'system design' | 'behavioral' | 'frontend' | 'backend' | 'cloud' | 'data')[];
  rating: number;
  totalSessions: number;
  hourlyRate: number;
  availability: {
    nextAvailable: string;
    timezone: string;
    slots: string[];
  };
  languages: string[];
  bio: string;
  featured?: boolean;
  achievements: string[];
  testimonials: {
    id: string;
    text: string;
    author: string;
    rating: number;
    date: string;
  }[];
}

export interface ExpertiseArea {
  value: string;
  label: string;
  icon: any;
  description: string;
}

export const expertiseAreas: ExpertiseArea[] = [
  {
    value: 'algorithms',
    label: 'Algorithms & Data Structures',
    icon: FaCode,
    description: 'Master complex algorithms and optimize your problem-solving skills'
  },
  {
    value: 'system design',
    label: 'System Design',
    icon: FaLaptop,
    description: 'Learn to design scalable and reliable distributed systems'
  },
  {
    value: 'behavioral',
    label: 'Behavioral Interviews',
    icon: FaBrain,
    description: 'Perfect your STAR responses and leadership examples'
  },
  {
    value: 'frontend',
    label: 'Frontend Development',
    icon: FaCode,
    description: 'Excel in frontend engineering interviews'
  },
  {
    value: 'backend',
    label: 'Backend Development',
    icon: FaDatabase,
    description: 'Master backend engineering concepts and patterns'
  },
  {
    value: 'cloud',
    label: 'Cloud Architecture',
    icon: FaCloud,
    description: 'Learn cloud-native architecture and best practices'
  }
];

export const mockMentors: Mentor[] = [
  {
    id: '1',
    name: 'Alex Thompson',
    avatar: '/mentors/alex.jpg',
    title: 'Senior Software Engineer',
    company: 'Google',
    yearsOfExperience: 8,
    specialties: ['Distributed Systems', 'Algorithm Optimization', 'System Design'],
    expertise: ['algorithms', 'system design', 'backend'],
    rating: 4.9,
    totalSessions: 156,
    hourlyRate: 150,
    availability: {
      nextAvailable: '2024-12-27T10:00:00Z',
      timezone: 'PST',
      slots: ['Morning', 'Evening']
    },
    languages: ['English', 'Spanish'],
    bio: 'Ex-Facebook tech lead with extensive experience in distributed systems and scalability. I specialize in helping engineers crack technical interviews at top tech companies.',
    featured: true,
    achievements: [
      'Led team of 20+ engineers at Google Cloud',
      'Contributed to key distributed systems projects',
      'Published author on system design patterns'
    ],
    testimonials: [
      {
        id: 't1',
        text: 'Alex helped me crack my Google interview. His system design expertise is unmatched!',
        author: 'Sarah K.',
        rating: 5,
        date: '2024-12-20'
      }
    ]
  },
  {
    id: '2',
    name: 'Emily Chen',
    avatar: '/mentors/emily.jpg',
    title: 'Engineering Manager',
    company: 'Meta',
    yearsOfExperience: 10,
    specialties: ['Leadership', 'Behavioral Interviews', 'Team Building'],
    expertise: ['behavioral', 'frontend', 'backend'],
    rating: 4.8,
    totalSessions: 234,
    hourlyRate: 180,
    availability: {
      nextAvailable: '2024-12-28T15:00:00Z',
      timezone: 'EST',
      slots: ['Afternoon', 'Evening']
    },
    languages: ['English', 'Mandarin'],
    bio: 'Engineering Manager at Meta with a passion for mentoring. I help candidates prepare for both technical and behavioral aspects of interviews.',
    featured: true,
    achievements: [
      'Managed 30+ successful hiring loops at Meta',
      'Built and scaled multiple engineering teams',
      'Created interview preparation frameworks'
    ],
    testimonials: [
      {
        id: 't2',
        text: 'Emily helped me structure my experiences perfectly for behavioral interviews.',
        author: 'Michael R.',
        rating: 5,
        date: '2024-12-15'
      }
    ]
  },
  {
    id: '3',
    name: 'Raj Patel',
    avatar: '/mentors/raj.jpg',
    title: 'Principal Engineer',
    company: 'Microsoft',
    yearsOfExperience: 12,
    specialties: ['Cloud Architecture', 'System Design', 'Scalability'],
    expertise: ['system design', 'cloud', 'backend'],
    rating: 4.9,
    totalSessions: 189,
    hourlyRate: 200,
    availability: {
      nextAvailable: '2024-12-29T09:00:00Z',
      timezone: 'IST',
      slots: ['Morning', 'Afternoon']
    },
    languages: ['English', 'Hindi'],
    bio: 'Principal Engineer at Microsoft Azure. Expert in cloud architecture and distributed systems. I help engineers prepare for senior and principal-level interviews.',
    achievements: [
      'Led Azure core infrastructure team',
      'Designed critical cloud services',
      'Multiple patents in distributed systems'
    ],
    testimonials: [
      {
        id: 't3',
        text: 'Raj helped me ace my senior engineer interview with his deep knowledge.',
        author: 'David L.',
        rating: 5,
        date: '2024-12-18'
      }
    ]
  },
  {
    id: '4',
    name: 'Sophie Anderson',
    avatar: '/mentors/sophie.jpg',
    title: 'Frontend Architect',
    company: 'Netflix',
    yearsOfExperience: 7,
    specialties: ['Frontend Systems', 'Performance Optimization', 'UI Architecture'],
    expertise: ['frontend', 'algorithms', 'behavioral'],
    rating: 4.7,
    totalSessions: 145,
    hourlyRate: 140,
    availability: {
      nextAvailable: '2024-12-27T14:00:00Z',
      timezone: 'PST',
      slots: ['Afternoon', 'Evening']
    },
    languages: ['English', 'French'],
    bio: 'Frontend Architect at Netflix, specializing in large-scale web applications. I help engineers master frontend interviews and system design.',
    achievements: [
      'Led Netflix frontend architecture team',
      'Created frontend interview frameworks',
      'Speaker at major tech conferences'
    ],
    testimonials: [
      {
        id: 't4',
        text: "Sophie's expertise and interview strategies were exactly what I needed.",
        author: 'James W.',
        rating: 5,
        date: '2024-12-22'
      }
    ]
  }
];

export const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-100', label: 'Under $100/hr' },
  { value: '100-150', label: '$100-150/hr' },
  { value: '150-200', label: '$150-200/hr' },
  { value: '200+', label: 'Over $200/hr' }
];

export const experienceLevels = [
  { value: 'all', label: 'All Levels' },
  { value: '5-', label: 'Under 5 years' },
  { value: '5-10', label: '5-10 years' },
  { value: '10+', label: 'Over 10 years' }
];
