import { User, Tag, Post, Category, ForumStats } from '../types';
import {
  FaCode,
  FaLaptopCode,
  FaBrain,
  FaChartLine,
  FaUsers,
  FaGraduationCap,
  FaBriefcase,
  FaLightbulb
} from 'react-icons/fa';

export const mockTags: Tag[] = [
  {
    id: '1',
    name: 'Data Structures',
    color: '#FF6B6B',
    description: 'Questions about arrays, linked lists, trees, and graphs',
    count: 345
  },
  {
    id: '2',
    name: 'System Design',
    color: '#4ECDC4',
    description: 'Distributed systems and scalable architecture discussions',
    count: 289
  },
  {
    id: '3',
    name: 'Algorithms',
    color: '#45B7D1',
    description: 'Algorithm problems and optimization techniques',
    count: 456
  },
  {
    id: '4',
    name: 'Behavioral',
    color: '#96CEB4',
    description: 'STAR method and behavioral question strategies',
    count: 234
  },
  {
    id: '5',
    name: 'Mock Interviews',
    color: '#D4A5A5',
    description: 'Mock interview practice and feedback',
    count: 167
  },
  {
    id: '6',
    name: 'Career Growth',
    color: '#FFD93D',
    description: 'Career advancement and professional development',
    count: 198
  }
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'David Chen',
    avatar: '/avatars/user1.jpg',
    role: 'admin',
    reputation: 2850,
    joinedDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Sarah Miller',
    avatar: '/avatars/user2.jpg',
    role: 'moderator',
    reputation: 1890,
    joinedDate: '2023-03-22'
  },
  {
    id: '3',
    name: 'Raj Patel',
    avatar: '/avatars/user3.jpg',
    role: 'user',
    reputation: 956,
    joinedDate: '2023-06-10'
  },
  {
    id: '4',
    name: 'Emily Zhang',
    avatar: '/avatars/user4.jpg',
    role: 'moderator',
    reputation: 1456,
    joinedDate: '2023-04-18'
  }
];

export const mockCategories: Category[] = [
  {
    id: 'coding-interviews',
    name: 'Coding Interviews',
    description: 'Discuss coding challenges, algorithms, and data structures',
    icon: 'FaCode',
    color: '#FF6B6B',
    postCount: 1234,
    lastActivity: {
      post: {
        id: '1',
        title: 'How to approach Dynamic Programming questions?',
        content: 'I have an upcoming interview at Google and struggling with DP...',
        author: mockUsers[0],
        createdAt: '2024-12-26T10:30:00Z',
        tags: [mockTags[0], mockTags[2]],
        views: 256,
        likes: 43,
        comments: [],
        isResolved: true,
        category: 'coding-interviews'
      },
      timestamp: '2024-12-26T10:30:00Z'
    }
  },
  {
    id: 'system-design',
    name: 'System Design',
    description: 'Learn about distributed systems and scalable architectures',
    icon: 'FaLaptopCode',
    color: '#4ECDC4',
    postCount: 856,
    lastActivity: {
      post: {
        id: '2',
        title: 'Designing a real-time chat application',
        content: 'What are the key components to consider...',
        author: mockUsers[1],
        createdAt: '2024-12-26T09:15:00Z',
        tags: [mockTags[1]],
        views: 189,
        likes: 28,
        comments: [],
        isResolved: false,
        category: 'system-design'
      },
      timestamp: '2024-12-26T09:15:00Z'
    }
  },
  {
    id: 'behavioral',
    name: 'Behavioral Interviews',
    description: 'Master the STAR method and behavioral questions',
    icon: 'FaBrain',
    color: '#45B7D1',
    postCount: 678,
    lastActivity: {
      post: {
        id: '3',
        title: 'Best STAR method examples for leadership',
        content: 'Here are some effective examples...',
        author: mockUsers[2],
        createdAt: '2024-12-26T08:45:00Z',
        tags: [mockTags[3]],
        views: 145,
        likes: 19,
        comments: [],
        isResolved: true,
        category: 'behavioral'
      },
      timestamp: '2024-12-26T08:45:00Z'
    }
  },
  {
    id: 'interview-prep',
    name: 'Interview Preparation',
    description: 'General interview preparation and strategies',
    icon: 'FaGraduationCap',
    color: '#96CEB4',
    postCount: 945,
    lastActivity: {
      post: {
        id: '4',
        title: 'One month interview preparation plan',
        content: 'Here\'s my structured plan for interview prep...',
        author: mockUsers[3],
        createdAt: '2024-12-26T07:30:00Z',
        tags: [mockTags[4], mockTags[5]],
        views: 312,
        likes: 67,
        comments: [],
        isResolved: true,
        category: 'interview-prep'
      },
      timestamp: '2024-12-26T07:30:00Z'
    }
  }
];

export const mockStats: ForumStats = {
  totalPosts: 3713,
  totalUsers: 15678,
  onlineUsers: 234,
  postsToday: 89,
  topContributors: [mockUsers[0], mockUsers[1], mockUsers[3]],
  trendingTags: [mockTags[0], mockTags[1], mockTags[2]]
};

export const forumTheme = {
  primary: '#fcba28',
  secondary: '#7B61FF',
  success: '#4CAF50',
  error: '#FF5252',
  background: {
    default: '#000000',
    paper: '#111111'
  }
};
