export interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'user' | 'moderator' | 'admin';
  reputation: number;
  joinedDate: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  description: string;
  count: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  isAccepted?: boolean;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  createdAt: string;
  updatedAt?: string;
  tags: Tag[];
  views: number;
  likes: number;
  comments: Comment[];
  isResolved: boolean;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  postCount: number;
  lastActivity?: {
    post: Post;
    timestamp: string;
  };
}

export interface ForumStats {
  totalPosts: number;
  totalUsers: number;
  onlineUsers: number;
  postsToday: number;
  topContributors: User[];
  trendingTags: Tag[];
}
