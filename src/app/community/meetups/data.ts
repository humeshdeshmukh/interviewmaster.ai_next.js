export interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    name: string;
    address: string;
    city: string;
    online: boolean;
    meetingUrl?: string;
  };
  organizer: {
    name: string;
    avatar: string;
    role: string;
    company: {
      name: string;
      logo: string;
    };
  };
  topics: string[];
  attendees: {
    total: number;
    capacity: number;
    avatars: string[];
  };
  type: 'Technical' | 'Career' | 'Interview Prep' | 'Networking';
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  featured?: boolean;
}

export const categories = [
  { value: 'all', label: 'All Events' },
  { value: 'technical', label: 'Technical Sessions' },
  { value: 'career', label: 'Career Development' },
  { value: 'interview', label: 'Interview Preparation' },
  { value: 'networking', label: 'Networking Events' }
];

export const cities = [
  { value: 'all', label: 'All Locations' },
  { value: 'online', label: 'Online' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'nyc', label: 'New York' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'london', label: 'London' }
];

export const meetups: Meetup[] = [
  {
    id: '1',
    title: 'System Design Deep Dive: Building Scalable Applications',
    description: 'Join us for an in-depth session on system design principles and best practices. We\'ll cover scalability, reliability, and performance optimization through real-world examples.',
    date: '2025-01-15',
    time: '18:00-20:00',
    location: {
      name: 'Google Campus',
      address: '188 The Embarcadero',
      city: 'San Francisco',
      online: false
    },
    organizer: {
      name: 'Alex Thompson',
      avatar: '/meetups/alex.jpg',
      role: 'Senior Staff Engineer',
      company: {
        name: 'Google',
        logo: '/companies/google.svg'
      }
    },
    topics: [
      'System Design',
      'Scalability',
      'Distributed Systems',
      'Performance'
    ],
    attendees: {
      total: 45,
      capacity: 50,
      avatars: ['/meetups/attendee1.jpg', '/meetups/attendee2.jpg', '/meetups/attendee3.jpg']
    },
    type: 'Technical',
    level: 'Advanced',
    featured: true
  },
  {
    id: '2',
    title: 'Mock Interview Workshop: Data Structures & Algorithms',
    description: 'Practice your coding interview skills with peers and experienced interviewers. Get real-time feedback and learn strategies for common interview patterns.',
    date: '2025-01-20',
    time: '19:00-21:00',
    location: {
      name: 'Online',
      address: '',
      city: 'Online',
      online: true,
      meetingUrl: 'https://meet.interviewmaster.ai/workshop'
    },
    organizer: {
      name: 'Sarah Chen',
      avatar: '/meetups/sarah.jpg',
      role: 'Tech Lead',
      company: {
        name: 'Meta',
        logo: '/companies/meta.svg'
      }
    },
    topics: [
      'Algorithms',
      'Data Structures',
      'Problem Solving',
      'Interview Tips'
    ],
    attendees: {
      total: 28,
      capacity: 30,
      avatars: ['/meetups/attendee4.jpg', '/meetups/attendee5.jpg', '/meetups/attendee6.jpg']
    },
    type: 'Interview Prep',
    level: 'Intermediate'
  },
  {
    id: '3',
    title: 'Career Growth in Tech: From Engineer to Tech Lead',
    description: 'Learn about the journey from individual contributor to tech lead. Discussion on leadership skills, team management, and career development strategies.',
    date: '2025-01-25',
    time: '17:00-19:00',
    location: {
      name: 'Microsoft Hub',
      address: '11 Times Square',
      city: 'New York',
      online: false
    },
    organizer: {
      name: 'David Kumar',
      avatar: '/meetups/david.jpg',
      role: 'Engineering Manager',
      company: {
        name: 'Microsoft',
        logo: '/companies/microsoft.svg'
      }
    },
    topics: [
      'Leadership',
      'Career Development',
      'Team Management',
      'Technical Leadership'
    ],
    attendees: {
      total: 35,
      capacity: 40,
      avatars: ['/meetups/attendee7.jpg', '/meetups/attendee8.jpg', '/meetups/attendee9.jpg']
    },
    type: 'Career',
    level: 'All Levels',
    featured: true
  },
  {
    id: '4',
    title: 'Frontend Development: Modern Architecture Patterns',
    description: 'Explore modern frontend architecture patterns and best practices. Learn about state management, performance optimization, and component design.',
    date: '2025-02-01',
    time: '18:30-20:30',
    location: {
      name: 'Online',
      address: '',
      city: 'Online',
      online: true,
      meetingUrl: 'https://meet.interviewmaster.ai/frontend'
    },
    organizer: {
      name: 'Emily Zhang',
      avatar: '/meetups/emily.jpg',
      role: 'Senior Frontend Engineer',
      company: {
        name: 'Amazon',
        logo: '/companies/amazon.svg'
      }
    },
    topics: [
      'Frontend Architecture',
      'React',
      'Performance',
      'State Management'
    ],
    attendees: {
      total: 55,
      capacity: 60,
      avatars: ['/meetups/attendee10.jpg', '/meetups/attendee11.jpg', '/meetups/attendee12.jpg']
    },
    type: 'Technical',
    level: 'Intermediate'
  }
];
