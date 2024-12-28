import { Question } from '../../types';

export const backendQuestions: Question[] = [
  {
    id: 2001,
    title: 'RESTful API Design Principles',
    description: 'Explain the key principles of designing RESTful APIs.',
    category: 'Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `REST (Representational State Transfer) is an architectural style for designing networked applications.

Key Principles:
1. Stateless Communication
2. Client-Server Architecture
3. Uniform Interface
4. Resource-Based
5. Cacheable
6. Layered System

Best Practices:
1. Use HTTP Methods Correctly:
\`\`\`
GET    /users     - List users
POST   /users     - Create user
GET    /users/1   - Get user
PUT    /users/1   - Update user
DELETE /users/1   - Delete user
\`\`\`

2. Use Proper Status Codes:
\`\`\`
200 - OK
201 - Created
400 - Bad Request
401 - Unauthorized
404 - Not Found
500 - Server Error
\`\`\`

3. Version Your API:
\`\`\`
/api/v1/users
/api/v2/users
\`\`\`

4. Use Plural Nouns for Resources:
\`\`\`
/api/v1/users
/api/v1/products
/api/v1/categories
\`\`\`

5. Handle Errors Consistently:
\`\`\`json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Invalid email format",
    "details": {
      "field": "email",
      "value": "invalid-email"
    }
  }
}
\`\`\``
  },
  {
    id: 2002,
    title: 'Database Indexing',
    description: 'Explain database indexing and its importance.',
    category: 'Tech',
    company: 'Microsoft',
    isBookmarked: false,
    details: `Database indexing is a data structure technique to quickly locate and access data in a database.

Key Concepts:
1. Types of Indexes:
   - Primary Index
   - Secondary Index
   - Clustered Index
   - Non-Clustered Index

2. When to Use Indexes:
   - Frequently queried columns
   - Foreign key columns
   - Columns used in WHERE clauses
   - Columns used in JOIN conditions

Example:
\`\`\`sql
-- Create an index
CREATE INDEX idx_last_name
ON users(last_name);

-- Create a composite index
CREATE INDEX idx_name
ON users(last_name, first_name);

-- Query using index
SELECT * FROM users
WHERE last_name = 'Smith';
\`\`\`

Advantages:
- Faster data retrieval
- Improved query performance
- Better sorting efficiency

Disadvantages:
- Additional disk space
- Slower write operations
- Index maintenance overhead`
  }
  // Add more backend questions here
];
