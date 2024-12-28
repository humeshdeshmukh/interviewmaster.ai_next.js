import { Test } from '../../utils/types';

export const systemDesignTests: Test[] = [
  {
    id: 'sys-beginner',
    title: 'System Design Fundamentals',
    description: 'Learn the basic concepts and principles of system design.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'system-design',
    questions: [
      {
        id: 'sys-b-1',
        text: 'What is the primary purpose of using a load balancer?',
        options: [
          'To distribute traffic across multiple servers',
          'To store data in the database',
          'To cache frequently accessed data',
          'To encrypt network traffic'
        ],
        correctAnswer: 'To distribute traffic across multiple servers',
        explanation: 'Load balancers help distribute incoming network traffic across multiple servers to ensure no single server bears too much load.'
      },
      {
        id: 'sys-b-2',
        text: 'Which type of database would be best suited for storing user session data?',
        options: [
          'SQL Database',
          'In-memory Database',
          'Document Database',
          'Graph Database'
        ],
        correctAnswer: 'In-memory Database',
        explanation: 'In-memory databases like Redis are ideal for session storage due to their fast access times and built-in TTL support.'
      },
      {
        id: 'sys-b-3',
        text: 'What is the purpose of a CDN (Content Delivery Network)?',
        options: [
          'To store application data',
          'To process user requests',
          'To deliver content from locations closer to users',
          'To manage database connections'
        ],
        correctAnswer: 'To deliver content from locations closer to users',
        explanation: 'CDNs cache content at edge locations worldwide to reduce latency for users accessing the content.'
      },
      {
        id: 'sys-b-4',
        text: 'What is horizontal scaling?',
        options: [
          'Adding more power to existing servers',
          'Adding more servers to handle load',
          'Increasing database size',
          'Optimizing code performance'
        ],
        correctAnswer: 'Adding more servers to handle load',
        explanation: 'Horizontal scaling involves adding more machines to your pool of resources to handle increased load.'
      },
      {
        id: 'sys-b-5',
        text: 'What is the purpose of a message queue in a distributed system?',
        options: [
          'To store application logs',
          'To handle asynchronous processing',
          'To cache database queries',
          'To manage user sessions'
        ],
        correctAnswer: 'To handle asynchronous processing',
        explanation: 'Message queues enable asynchronous communication between components and help in decoupling services.'
      },
      {
        id: 'sys-b-6',
        text: 'Which of these is NOT a benefit of microservices architecture?',
        options: [
          'Independent deployment',
          'Technology flexibility',
          'Simplified testing',
          'Simplified data management'
        ],
        correctAnswer: 'Simplified data management',
        explanation: 'Microservices actually make data management more complex due to distributed data and consistency challenges.'
      },
      {
        id: 'sys-b-7',
        text: 'What is the CAP theorem?',
        options: [
          'A security principle',
          'A database design pattern',
          'A distributed systems principle',
          'A network protocol'
        ],
        correctAnswer: 'A distributed systems principle',
        explanation: 'CAP theorem states that a distributed system can only provide two of three guarantees: Consistency, Availability, and Partition tolerance.'
      },
      {
        id: 'sys-b-8',
        text: 'What is the purpose of a reverse proxy?',
        options: [
          'To protect client identity',
          'To protect server identity',
          'To balance database load',
          'To store static files'
        ],
        correctAnswer: 'To protect server identity',
        explanation: 'Reverse proxies hide server details from clients and can provide additional features like caching and SSL termination.'
      },
      {
        id: 'sys-b-9',
        text: 'Which storage type is best for handling large file uploads?',
        options: [
          'SQL Database',
          'Object Storage',
          'In-memory Cache',
          'Message Queue'
        ],
        correctAnswer: 'Object Storage',
        explanation: 'Object storage systems like S3 are designed for storing and serving large files efficiently.'
      },
      {
        id: 'sys-b-10',
        text: 'What is the purpose of database indexing?',
        options: [
          'To backup data',
          'To speed up queries',
          'To validate data',
          'To compress data'
        ],
        correctAnswer: 'To speed up queries',
        explanation: 'Indexes improve query performance by providing quick access paths to data.'
      }
    ]
  }
  // Add intermediate and advanced tests similar to algorithms.ts
];
