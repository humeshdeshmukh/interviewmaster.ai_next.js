// src/questionsData.ts

import { Question } from './types';

export interface Question {
  id: number;
  title: string;
  description: string;
  type: 'Tech' | 'Non-Tech';
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isBookmarked: boolean;
  company?: string;
  tags: string[];
  likes: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  details: string;
}

export const questions: Question[] = [
  // Frontend Questions
  {
    id: 1,
    title: 'Explain the concept of closures in JavaScript',
    description: 'Describe what closures are and provide an example of their use.',
    type: 'Tech',
    category: 'Frontend',
    difficulty: 'Medium',
    isBookmarked: false,
    company: 'Google',
    tags: ['JavaScript', 'Functions', 'Scope'],
    likes: 124,
    views: 1543,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    details: `A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.

Example:
\`\`\`javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
\`\`\`

Key Points:
1. Closures are created every time a function is created
2. They enable data privacy through encapsulation
3. They maintain access to outer scope variables
4. Common use cases include:
   - Module pattern
   - Currying
   - Memoization
   - Partial application`
  },
  
  // Backend Questions
  {
    id: 2,
    title: 'What is a promise in JavaScript?',
    description: 'Discuss the concept of promises and how they handle asynchronous operations.',
    type: 'Tech',
    category: 'Backend',
    difficulty: 'Medium',
    company: 'Facebook',
    isBookmarked: false,
    tags: ['JavaScript', 'Async', 'Promises'],
    likes: 98,
    views: 1232,
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
    details: `A Promise is an object representing the eventual completion (or failure) of an asynchronous operation. It serves as a proxy for a value that may not be known when the promise is created.

Example:
\`\`\`javascript
const fetchData = () => {
  return new Promise((resolve, reject) => {
    try {
      // Simulating API call
      setTimeout(() => {
        const data = { id: 1, name: 'John' };
        resolve(data);
      }, 1000);
    } catch (error) {
      reject(error);
    }
  });
};

// Using the promise
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));
\`\`\`

Key Concepts:
1. Promise States:
   - Pending: Initial state
   - Fulfilled: Operation completed successfully
   - Rejected: Operation failed

2. Promise Methods:
   - then(): Handle success
   - catch(): Handle errors
   - finally(): Execute cleanup

3. Promise Chaining
4. Error Handling
5. Promise.all() and Promise.race()`
  },

  // System Design Questions
  {
    id: 3,
    title: 'Design a URL Shortening Service',
    description: 'Create a system design for a URL shortening service like bit.ly',
    type: 'Tech',
    category: 'System Design',
    difficulty: 'Hard',
    company: 'Microsoft',
    isBookmarked: false,
    tags: ['System Design', 'Scalability', 'Database'],
    likes: 156,
    views: 2341,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `System Design for URL Shortener:

1. Requirements:
   - Functional:
     * Shorten long URLs
     * Redirect to original URL
     * Custom short URLs
     * Analytics
   - Non-Functional:
     * High Availability
     * Low Latency
     * Scalability

2. Capacity Planning:
   - Assumptions:
     * 100M new URLs per month
     * 10:1 read/write ratio
     * Average URL length: 100 bytes

3. System API:
\`\`\`typescript
interface URLShortener {
  createShortURL(longURL: string): string;
  getLongURL(shortURL: string): string;
  getAnalytics(shortURL: string): Analytics;
}
\`\`\`

4. Database Design:
\`\`\`sql
CREATE TABLE urls (
  id BIGINT PRIMARY KEY,
  short_url VARCHAR(10) UNIQUE,
  long_url TEXT NOT NULL,
  user_id BIGINT,
  created_at TIMESTAMP,
  expires_at TIMESTAMP
);

CREATE TABLE analytics (
  short_url VARCHAR(10),
  timestamp TIMESTAMP,
  user_agent TEXT,
  referrer TEXT,
  ip_address VARCHAR(45)
);
\`\`\`

5. Architecture Components:
   - Load Balancer
   - Application Servers
   - Cache Layer (Redis)
   - Database (PostgreSQL)
   - Analytics Service

6. URL Generation:
   - Base62 encoding
   - Counter-based approach
   - Hash-based approach`
  },

  // Behavioral Questions
  {
    id: 4,
    title: 'Tell me about a time you resolved a conflict in a team',
    description: 'Describe a situation where you successfully resolved a team conflict.',
    type: 'Non-Tech',
    category: 'Leadership',
    difficulty: 'Medium',
    company: 'Amazon',
    isBookmarked: false,
    tags: ['Leadership', 'Conflict Resolution', 'Team Management'],
    likes: 87,
    views: 1123,
    createdAt: '2024-01-04',
    updatedAt: '2024-01-04',
    details: `STAR Method Framework:

1. Situation:
   - Team disagreement over technical approach
   - Tight deadline pressure
   - Different experience levels

2. Task:
   - Resolve conflict
   - Maintain team harmony
   - Meet project deadline

3. Action:
   - Organized team meeting
   - Created pros/cons list
   - Facilitated discussion
   - Found compromise
   - Documented decision

4. Result:
   - Unified team approach
   - Improved communication
   - Met deadline
   - Better team dynamics

Key Learnings:
1. Active Listening
2. Empathy
3. Facilitation Skills
4. Documentation
5. Follow-up

Best Practices:
1. Address conflicts early
2. Stay neutral
3. Focus on facts
4. Document decisions
5. Follow up regularly`
  }
];