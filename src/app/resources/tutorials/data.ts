export interface Tutorial {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
    role: string;
  };
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  lessons: number;
  thumbnail?: string;
  tags: string[];
  url: string;
}

export const tutorialCategories = [
  {
    id: 'algorithms',
    name: 'Algorithms & DSA',
    icon: 'FaCode',
    color: '#fcba28',
    description: 'Master data structures and algorithms for technical interviews'
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: 'FaServer',
    color: '#7B61FF',
    description: 'Learn scalable system design principles'
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: 'FaUsers',
    color: '#FF6B6B',
    description: 'Excel in behavioral interviews'
  },
  {
    id: 'coding',
    name: 'Coding Interviews',
    icon: 'FaLaptopCode',
    color: '#00C48C',
    description: 'Practice real coding interview questions'
  },
  {
    id: 'career',
    name: 'Career Growth',
    icon: 'FaChartLine',
    color: '#FF9F43',
    description: 'Advance your software engineering career'
  }
];

export const tutorials: Tutorial[] = [
  {
    id: 'leetcode-mastery',
    title: 'LeetCode Problem Solving Strategies',
    description: 'Master the art of solving LeetCode problems with proven strategies. Learn pattern recognition, time complexity analysis, and optimal solution approaches.',
    author: {
      name: 'Neetcode',
      role: 'Algorithm Expert'
    },
    category: 'algorithms',
    difficulty: 'Intermediate',
    duration: '10 hours',
    rating: 4.9,
    lessons: 15,
    tags: ['leetcode', 'algorithms', 'problem solving', 'coding interviews'],
    url: 'https://neetcode.io/roadmap',
    thumbnail: '/images/tutorials/algorithms-leetcode.jpg'
  },
  {
    id: 'system-design-interview',
    title: 'System Design Interview Guide',
    description: 'Comprehensive guide to ace system design interviews at top tech companies. Learn how to design scalable distributed systems with real-world examples.',
    author: {
      name: 'Alex Xu',
      role: 'System Design Expert'
    },
    category: 'system-design',
    difficulty: 'Advanced',
    duration: '12 hours',
    rating: 4.8,
    lessons: 20,
    tags: ['system design', 'scalability', 'distributed systems', 'architecture'],
    url: 'https://bytebytego.com',
    thumbnail: '/images/tutorials/system-design-guide.jpg'
  },
  {
    id: 'behavioral-interview-prep',
    title: 'STAR Method Interview Preparation',
    description: 'Learn how to effectively structure your responses using the STAR method. Includes real examples from successful candidates at FAANG companies.',
    author: {
      name: 'Gayle McDowell',
      role: 'Interview Coach'
    },
    category: 'behavioral',
    difficulty: 'Beginner',
    duration: '6 hours',
    rating: 4.7,
    lessons: 12,
    tags: ['behavioral', 'STAR method', 'soft skills', 'communication'],
    url: '/tutorials/behavioral-prep',
    thumbnail: '/images/tutorials/behavioral-interview.jpg'
  },
  {
    id: 'google-interview-prep',
    title: 'Google Interview Preparation Guide',
    description: 'A comprehensive preparation guide specifically tailored for Google interviews, covering all aspects from coding to system design and behavioral rounds.',
    author: {
      name: 'TechLead',
      role: 'Ex-Google Tech Lead'
    },
    category: 'coding',
    difficulty: 'Advanced',
    duration: '15 hours',
    rating: 4.9,
    lessons: 25,
    tags: ['google', 'faang', 'interview prep', 'coding'],
    url: 'https://techinterviewhandbook.org/google-interview-guide',
    thumbnail: '/images/tutorials/google-interview.jpg'
  },
  {
    id: 'career-growth-swe',
    title: 'Software Engineer Career Path',
    description: 'Navigate your software engineering career path from junior to senior levels. Learn about promotion criteria, skill development, and leadership opportunities.',
    author: {
      name: 'Will Larson',
      role: 'Engineering Director'
    },
    category: 'career',
    difficulty: 'Intermediate',
    duration: '8 hours',
    rating: 4.8,
    lessons: 16,
    tags: ['career growth', 'leadership', 'promotion', 'soft skills'],
    url: 'https://staffeng.com/guides',
    thumbnail: '/images/tutorials/career-growth.jpg'
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming Deep Dive',
    description: 'Master dynamic programming concepts with step-by-step explanations of popular interview problems. Includes pattern recognition and optimization techniques.',
    author: {
      name: 'Back To Back SWE',
      role: 'Algorithm Specialist'
    },
    category: 'algorithms',
    difficulty: 'Advanced',
    duration: '10 hours',
    rating: 4.7,
    lessons: 18,
    tags: ['dynamic programming', 'algorithms', 'optimization', 'problem solving'],
    url: 'https://algo.monster/dynamic-programming',
    thumbnail: '/images/tutorials/dp-mastery.jpg'
  },
  {
    id: 'microservices-design',
    title: 'Microservices System Design',
    description: 'Learn how to design and implement microservices architecture. Perfect for system design interviews focusing on distributed systems.',
    author: {
      name: 'Martin Fowler',
      role: 'Software Architect'
    },
    category: 'system-design',
    difficulty: 'Advanced',
    duration: '12 hours',
    rating: 4.8,
    lessons: 20,
    tags: ['microservices', 'system design', 'architecture', 'scalability'],
    url: 'https://microservices.io/patterns/index.html',
    thumbnail: '/images/tutorials/microservices.jpg'
  },
  {
    id: 'amazon-interview',
    title: 'Amazon Interview Guide',
    description: 'Comprehensive preparation guide for Amazon interviews, with focus on leadership principles, coding challenges, and system design questions.',
    author: {
      name: 'Leadership Guide',
      role: 'Ex-Amazon Principal'
    },
    category: 'behavioral',
    difficulty: 'Intermediate',
    duration: '8 hours',
    rating: 4.9,
    lessons: 15,
    tags: ['amazon', 'leadership principles', 'behavioral', 'interview'],
    url: 'https://www.amazon.jobs/en/landing_pages/software-development-topics',
    thumbnail: '/images/tutorials/amazon-interview.jpg'
  }
];
