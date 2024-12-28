import { Question } from '../../types';

export const systemDesignQuestions: Question[] = [
  {
    id: 3001,
    title: 'Design a URL Shortener',
    description: 'Design a URL shortening service like bit.ly.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `System Design for URL Shortener:

1. Requirements:
   - Functional:
     * Shorten long URLs
     * Redirect to original URL
     * Custom short URLs (optional)
     * Analytics (optional)
   
   - Non-Functional:
     * Highly available
     * Low latency
     * URL expiration
     * Scalable

2. System APIs:
\`\`\`typescript
interface URLShortener {
  createShortURL(longURL: string, customAlias?: string): string;
  getLongURL(shortURL: string): string;
  deleteURL(shortURL: string): boolean;
}
\`\`\`

3. Database Design:
\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  short_url VARCHAR(16) UNIQUE,
  long_url TEXT NOT NULL,
  user_id BIGINT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  click_count INT DEFAULT 0
);

CREATE INDEX idx_short_url ON urls(short_url);
\`\`\`

4. URL Shortening Algorithm:
\`\`\`typescript
function generateShortURL(counter: number): string {
  const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const base = characters.length;
  let shortURL = '';
  
  while (counter > 0) {
    shortURL = characters[counter % base] + shortURL;
    counter = Math.floor(counter / base);
  }
  
  return shortURL.padStart(7, '0');
}
\`\`\`

5. System Architecture:
   - Load Balancer
   - Application Servers
   - Cache Layer (Redis)
   - Database Cluster
   - Analytics Service

6. Scaling Considerations:
   - Database Sharding
   - Caching Strategy
   - Rate Limiting
   - Analytics Processing`
  },
  {
    id: 3002,
    title: 'Design a Chat System',
    description: 'Design a real-time chat system like WhatsApp.',
    category: 'Tech',
    company: 'Facebook',
    isBookmarked: false,
    details: `Real-time Chat System Design:

1. Requirements:
   - Functional:
     * 1-on-1 chat
     * Group chat
     * Online status
     * Message status (sent/delivered/read)
     * Media sharing
   
   - Non-Functional:
     * Low latency
     * High availability
     * Message persistence
     * Consistency

2. System Components:
\`\`\`typescript
interface ChatSystem {
  sendMessage(from: string, to: string, content: string): boolean;
  getMessages(chatId: string, limit: number, before?: Date): Message[];
  markAsRead(messageId: string): void;
  createGroup(name: string, members: string[]): string;
}
\`\`\`

3. Database Schema:
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  status VARCHAR(20),
  last_seen TIMESTAMP
);

CREATE TABLE messages (
  id UUID PRIMARY KEY,
  chat_id UUID,
  sender_id UUID,
  content TEXT,
  type VARCHAR(20),
  created_at TIMESTAMP,
  status VARCHAR(20)
);

CREATE TABLE chats (
  id UUID PRIMARY KEY,
  type VARCHAR(20),
  created_at TIMESTAMP
);

CREATE TABLE chat_members (
  chat_id UUID,
  user_id UUID,
  joined_at TIMESTAMP,
  PRIMARY KEY (chat_id, user_id)
);
\`\`\`

4. Technology Stack:
   - WebSocket for real-time communication
   - Redis for presence management
   - Cassandra for message storage
   - PostgreSQL for user data
   - RabbitMQ for async processing

5. Scaling Considerations:
   - Message fanout
   - Connection handling
   - Message ordering
   - Offline message delivery`
  }
  // Add more system design questions here
];
