import { FaLaptop, FaUsers, FaGraduationCap, FaCode, FaBrain, FaChalkboardTeacher } from 'react-icons/fa';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  type: 'webinar' | 'workshop' | 'mock-interview' | 'panel' | 'bootcamp' | 'networking';
  icon: any;
  host: {
    name: string;
    role: string;
    company: string;
    avatar?: string;
  };
  attendees: number;
  maxAttendees: number;
  tags: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  duration: string;
  location: 'online' | 'hybrid' | 'in-person';
  price: number | 'free';
  featured?: boolean;
  registrationLink: string;
}

export const upcomingEvents: Event[] = [
  {
    id: '1',
    title: 'System Design Interview Masterclass',
    description: 'Learn how to tackle complex system design questions with practical examples from experienced tech leads. We\'ll cover scalability, reliability, and performance optimization.',
    date: '2025-01-15',
    time: '10:00 AM EST',
    type: 'webinar',
    icon: FaLaptop,
    host: {
      name: 'David Chen',
      role: 'Senior System Architect',
      company: 'Google',
      avatar: '/avatars/david.jpg'
    },
    attendees: 156,
    maxAttendees: 200,
    tags: ['system design', 'architecture', 'scalability'],
    level: 'intermediate',
    duration: '2 hours',
    location: 'online',
    price: 'free',
    featured: true,
    registrationLink: '/register/system-design-masterclass'
  },
  {
    id: '2',
    title: 'Mock Interview Practice Session',
    description: 'Practice technical interviews with peers and receive feedback from experienced interviewers. Focus on data structures and algorithms.',
    date: '2025-01-20',
    time: '2:00 PM EST',
    type: 'mock-interview',
    icon: FaUsers,
    host: {
      name: 'Sarah Miller',
      role: 'Tech Interview Coach',
      company: 'InterviewMaster.AI',
      avatar: '/avatars/sarah.jpg'
    },
    attendees: 24,
    maxAttendees: 30,
    tags: ['algorithms', 'data structures', 'practice'],
    level: 'intermediate',
    duration: '3 hours',
    location: 'online',
    price: 49.99,
    registrationLink: '/register/mock-interview-session'
  },
  {
    id: '3',
    title: 'Coding Interview Bootcamp',
    description: 'Intensive 2-day bootcamp covering essential algorithms, data structures, and problem-solving strategies for technical interviews.',
    date: '2025-02-01',
    time: '9:00 AM EST',
    type: 'bootcamp',
    icon: FaGraduationCap,
    host: {
      name: 'Michael Zhang',
      role: 'Principal Engineer',
      company: 'Meta',
      avatar: '/avatars/michael.jpg'
    },
    attendees: 45,
    maxAttendees: 50,
    tags: ['algorithms', 'interview prep', 'coding'],
    level: 'advanced',
    duration: '2 days',
    location: 'hybrid',
    price: 299.99,
    featured: true,
    registrationLink: '/register/coding-bootcamp'
  },
  {
    id: '4',
    title: 'Behavioral Interview Workshop',
    description: 'Master the STAR method and learn how to effectively communicate your experiences in behavioral interviews.',
    date: '2025-01-25',
    time: '1:00 PM EST',
    type: 'workshop',
    icon: FaBrain,
    host: {
      name: 'Emily Rodriguez',
      role: 'Senior HR Manager',
      company: 'Amazon',
      avatar: '/avatars/emily.jpg'
    },
    attendees: 89,
    maxAttendees: 100,
    tags: ['behavioral', 'soft skills', 'communication'],
    level: 'all',
    duration: '4 hours',
    location: 'online',
    price: 'free',
    registrationLink: '/register/behavioral-workshop'
  },
  {
    id: '5',
    title: 'Dynamic Programming Deep Dive',
    description: 'An in-depth workshop on mastering dynamic programming problems commonly asked in technical interviews.',
    date: '2025-02-10',
    time: '11:00 AM EST',
    type: 'workshop',
    icon: FaCode,
    host: {
      name: 'Alex Kumar',
      role: 'Algorithm Specialist',
      company: 'Microsoft',
      avatar: '/avatars/alex.jpg'
    },
    attendees: 134,
    maxAttendees: 150,
    tags: ['algorithms', 'dynamic programming', 'problem solving'],
    level: 'advanced',
    duration: '3 hours',
    location: 'online',
    price: 79.99,
    registrationLink: '/register/dp-workshop'
  },
  {
    id: '6',
    title: 'Tech Interview Panel Discussion',
    description: 'Join hiring managers from top tech companies as they share insights about the interview process and what they look for in candidates.',
    date: '2025-01-30',
    time: '4:00 PM EST',
    type: 'panel',
    icon: FaChalkboardTeacher,
    host: {
      name: 'Rachel Chen',
      role: 'Engineering Director',
      company: 'Apple',
      avatar: '/avatars/rachel.jpg'
    },
    attendees: 278,
    maxAttendees: 300,
    tags: ['career advice', 'interview tips', 'industry insights'],
    level: 'all',
    duration: '1.5 hours',
    location: 'online',
    price: 'free',
    registrationLink: '/register/panel-discussion'
  }
];

export const eventTypes = [
  { value: 'all', label: 'All Events' },
  { value: 'webinar', label: 'Webinars' },
  { value: 'workshop', label: 'Workshops' },
  { value: 'mock-interview', label: 'Mock Interviews' },
  { value: 'panel', label: 'Panel Discussions' },
  { value: 'bootcamp', label: 'Bootcamps' },
  { value: 'networking', label: 'Networking' }
];

export const eventLevels = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];
