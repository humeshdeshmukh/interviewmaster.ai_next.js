export interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: {
    type: 'online' | 'hybrid' | 'in-person';
    venue?: string;
    city?: string;
    country?: string;
    platform?: string;
  };
  prizes: {
    total: string;
    breakdown: {
      place: string;
      amount: string;
    }[];
  };
  organizer: {
    name: string;
    logo: string;
    website: string;
  };
  sponsors: {
    name: string;
    logo: string;
  }[];
  timeline: {
    phase: string;
    date: string;
    description: string;
  }[];
  tracks: {
    name: string;
    description: string;
    icon: string;
  }[];
  stats: {
    participants: number;
    teams: number;
    countries: number;
    submissions: number;
  };
  featured?: boolean;
  registrationOpen: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  tags: string[];
}

export const categories = [
  { value: 'all', label: 'All Tracks' },
  { value: 'ai', label: 'AI/ML' },
  { value: 'web3', label: 'Web3' },
  { value: 'fullstack', label: 'Full Stack' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'cloud', label: 'Cloud' }
];

export const difficulties = [
  { value: 'all', label: 'All Levels' },
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' }
];

export const hackathons: Hackathon[] = [
  {
    id: '1',
    title: 'AI Innovation Challenge',
    description: 'Build innovative AI solutions that solve real-world problems. Focus on practical applications of machine learning, natural language processing, and computer vision.',
    startDate: '2025-02-01',
    endDate: '2025-02-15',
    location: {
      type: 'hybrid',
      venue: 'Tech Hub',
      city: 'San Francisco',
      country: 'USA',
      platform: 'Discord'
    },
    prizes: {
      total: '$50,000',
      breakdown: [
        { place: '1st Place', amount: '$25,000' },
        { place: '2nd Place', amount: '$15,000' },
        { place: '3rd Place', amount: '$10,000' }
      ]
    },
    organizer: {
      name: 'InterviewMaster.ai',
      logo: '/companies/interviewmaster.svg',
      website: 'https://interviewmaster.ai'
    },
    sponsors: [
      { name: 'Google Cloud', logo: '/sponsors/google-cloud.svg' },
      { name: 'Microsoft', logo: '/sponsors/microsoft.svg' },
      { name: 'AWS', logo: '/sponsors/aws.svg' }
    ],
    timeline: [
      { phase: 'Registration', date: '2025-01-15', description: 'Registration opens' },
      { phase: 'Kickoff', date: '2025-02-01', description: 'Project submissions begin' },
      { phase: 'Submissions', date: '2025-02-15', description: 'Final submission deadline' },
      { phase: 'Judging', date: '2025-02-20', description: 'Projects evaluation' },
      { phase: 'Winners', date: '2025-02-25', description: 'Winners announcement' }
    ],
    tracks: [
      {
        name: 'AI/ML',
        description: 'Machine learning and artificial intelligence solutions',
        icon: '🤖'
      },
      {
        name: 'NLP',
        description: 'Natural language processing applications',
        icon: '📝'
      },
      {
        name: 'Computer Vision',
        description: 'Image and video processing solutions',
        icon: '👁️'
      }
    ],
    stats: {
      participants: 1500,
      teams: 300,
      countries: 45,
      submissions: 250
    },
    featured: true,
    registrationOpen: true,
    difficulty: 'All Levels',
    tags: ['AI', 'ML', 'Cloud', 'Innovation']
  },
  {
    id: '2',
    title: 'Web3 DeFi Hackathon',
    description: 'Create decentralized finance applications using blockchain technology. Focus on smart contracts, DeFi protocols, and web3 infrastructure.',
    startDate: '2025-03-01',
    endDate: '2025-03-15',
    location: {
      type: 'online',
      platform: 'Discord'
    },
    prizes: {
      total: '$30,000',
      breakdown: [
        { place: '1st Place', amount: '$15,000' },
        { place: '2nd Place', amount: '$10,000' },
        { place: '3rd Place', amount: '$5,000' }
      ]
    },
    organizer: {
      name: 'InterviewMaster.ai',
      logo: '/companies/interviewmaster.svg',
      website: 'https://interviewmaster.ai'
    },
    sponsors: [
      { name: 'Ethereum', logo: '/sponsors/ethereum.svg' },
      { name: 'Polygon', logo: '/sponsors/polygon.svg' },
      { name: 'Chainlink', logo: '/sponsors/chainlink.svg' }
    ],
    timeline: [
      { phase: 'Registration', date: '2025-02-15', description: 'Registration opens' },
      { phase: 'Kickoff', date: '2025-03-01', description: 'Project submissions begin' },
      { phase: 'Submissions', date: '2025-03-15', description: 'Final submission deadline' },
      { phase: 'Judging', date: '2025-03-20', description: 'Projects evaluation' },
      { phase: 'Winners', date: '2025-03-25', description: 'Winners announcement' }
    ],
    tracks: [
      {
        name: 'DeFi',
        description: 'Decentralized finance applications',
        icon: '💰'
      },
      {
        name: 'NFT',
        description: 'Non-fungible token projects',
        icon: '🎨'
      },
      {
        name: 'Infrastructure',
        description: 'Web3 infrastructure solutions',
        icon: '🏗️'
      }
    ],
    stats: {
      participants: 1000,
      teams: 200,
      countries: 35,
      submissions: 180
    },
    registrationOpen: true,
    difficulty: 'Intermediate',
    tags: ['Web3', 'DeFi', 'Blockchain', 'Smart Contracts']
  }
];
