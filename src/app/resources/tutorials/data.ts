export interface Tutorial {
  id: string;
  title: string;
  description: string;
  author: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  tags: string[];
  url: string;
  platform: string;
  rating: number;
  views: number;
  lastUpdated: string;
  prerequisites: string[];
  learningOutcomes: string[];
  chapters?: {
    title: string;
    duration: string;
    topics: string[];
  }[];
}

export const tutorialCategories = [
  {
    id: 'algorithms',
    name: 'Algorithms & DSA',
    icon: 'FaCode',
    color: '#fcba28',
    description: 'Master data structures and algorithms'
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: 'FaServer',
    color: '#7B61FF',
    description: 'Learn to design scalable systems'
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'FaDesktop',
    color: '#FF6B6B',
    description: 'Modern frontend technologies'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: 'FaDatabase',
    color: '#00C48C',
    description: 'Server-side programming'
  },
  {
    id: 'devops',
    name: 'DevOps & Cloud',
    icon: 'FaCloud',
    color: '#FF9F43',
    description: 'Cloud platforms and DevOps practices'
  },
  {
    id: 'security',
    name: 'Security',
    icon: 'FaShieldAlt',
    color: '#FF6B6B',
    description: 'Application security best practices'
  }
];

export const tutorials: Tutorial[] = [
  {
    id: 'system-design-fundamentals',
    title: 'System Design Fundamentals',
    description: 'Learn the fundamentals of system design, including scalability, reliability, and performance optimization. This comprehensive tutorial covers everything from basic concepts to advanced patterns.',
    author: 'Alex Xu',
    category: 'system-design',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['system design', 'scalability', 'architecture', 'distributed systems'],
    url: 'https://github.com/donnemartin/system-design-primer#system-design-topics-start-here',
    platform: 'GitHub',
    rating: 4.9,
    views: 250000,
    lastUpdated: '2024-01-15',
    prerequisites: ['Basic programming knowledge', 'Understanding of databases', 'Networking fundamentals'],
    learningOutcomes: [
      'Design scalable distributed systems',
      'Handle system bottlenecks',
      'Implement caching strategies',
      'Design database schemas'
    ],
    chapters: [
      {
        title: 'Scalability Fundamentals',
        duration: '1.5 hours',
        topics: ['Vertical scaling', 'Horizontal scaling', 'Load balancing']
      },
      {
        title: 'Database Design',
        duration: '2 hours',
        topics: ['SQL vs NoSQL', 'Sharding', 'Replication']
      }
    ]
  },
  {
    id: 'advanced-algorithms',
    title: 'Advanced Algorithms Masterclass',
    description: 'Deep dive into advanced algorithms and problem-solving techniques. Learn how to approach complex algorithmic problems and optimize solutions.',
    author: 'Abdul Bari',
    category: 'algorithms',
    difficulty: 'Advanced',
    duration: '12 hours',
    tags: ['algorithms', 'dynamic programming', 'graphs', 'optimization'],
    url: 'https://www.youtube.com/watch?v=0IAPZzGSbME&list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O',
    platform: 'YouTube',
    rating: 4.8,
    views: 180000,
    lastUpdated: '2024-02-01',
    prerequisites: ['Basic algorithms', 'Data structures', 'Time complexity analysis'],
    learningOutcomes: [
      'Master advanced algorithm techniques',
      'Solve complex coding problems',
      'Optimize algorithmic solutions',
      'Analyze space-time complexity'
    ]
  },
  {
    id: 'react-patterns',
    title: 'Advanced React Design Patterns',
    description: 'Learn advanced React patterns and best practices. This tutorial covers HOCs, render props, hooks, and performance optimization techniques.',
    author: 'Kent C. Dodds',
    category: 'frontend',
    difficulty: 'Advanced',
    duration: '6 hours',
    tags: ['react', 'javascript', 'patterns', 'performance'],
    url: 'https://kentcdodds.com/blog/advanced-react-patterns',
    platform: 'Blog',
    rating: 4.9,
    views: 120000,
    lastUpdated: '2024-03-01',
    prerequisites: ['React fundamentals', 'JavaScript ES6+', 'Basic TypeScript'],
    learningOutcomes: [
      'Implement advanced React patterns',
      'Optimize React applications',
      'Build reusable components',
      'Handle complex state management'
    ]
  },
  {
    id: 'microservices-architecture',
    title: 'Microservices Architecture',
    description: 'Comprehensive guide to building and deploying microservices. Learn about service discovery, API gateways, and containerization.',
    author: 'Martin Fowler',
    category: 'backend',
    difficulty: 'Advanced',
    duration: '10 hours',
    tags: ['microservices', 'docker', 'kubernetes', 'devops'],
    url: 'https://martinfowler.com/microservices/',
    platform: 'Blog',
    rating: 4.7,
    views: 90000,
    lastUpdated: '2024-02-15',
    prerequisites: ['Backend development', 'REST APIs', 'Basic Docker'],
    learningOutcomes: [
      'Design microservices architecture',
      'Implement service communication',
      'Handle distributed data',
      'Deploy with containers'
    ]
  },
  {
    id: 'cloud-security',
    title: 'Cloud Security Best Practices',
    description: 'Learn how to secure cloud applications and infrastructure. Covers AWS security services, encryption, and compliance.',
    author: 'AWS Training',
    category: 'security',
    difficulty: 'Advanced',
    duration: '8 hours',
    tags: ['security', 'aws', 'cloud', 'encryption'],
    url: 'https://aws.amazon.com/training/security/',
    platform: 'AWS',
    rating: 4.8,
    views: 75000,
    lastUpdated: '2024-03-15',
    prerequisites: ['Basic AWS knowledge', 'Network security', 'Cryptography basics'],
    learningOutcomes: [
      'Implement cloud security controls',
      'Configure IAM policies',
      'Set up encryption',
      'Monitor security events'
    ]
  },
  {
    id: 'devops-pipeline',
    title: 'Building Modern CI/CD Pipelines',
    description: 'Learn to build and optimize CI/CD pipelines using modern tools like GitHub Actions, Jenkins, and ArgoCD.',
    author: 'DevOps Toolkit',
    category: 'devops',
    difficulty: 'Intermediate',
    duration: '7 hours',
    tags: ['devops', 'ci/cd', 'automation', 'kubernetes'],
    url: 'https://www.youtube.com/c/DevOpsToolkit',
    platform: 'YouTube',
    rating: 4.6,
    views: 85000,
    lastUpdated: '2024-01-30',
    prerequisites: ['Git basics', 'Basic DevOps concepts', 'Docker fundamentals'],
    learningOutcomes: [
      'Build CI/CD pipelines',
      'Automate deployments',
      'Implement GitOps',
      'Monitor pipeline health'
    ]
  }
];
