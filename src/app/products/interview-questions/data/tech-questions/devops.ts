import { Question } from '../../types';

export const devopsQuestions: Question[] = [
  {
    id: 6001,
    title: 'Explain CI/CD Pipeline',
    description: 'Describe the components and benefits of a CI/CD pipeline.',
    category: 'Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Continuous Integration/Continuous Deployment (CI/CD) is a method to frequently deliver apps to customers by introducing automation into the development stages.

Components of CI/CD Pipeline:

1. Source Control:
\`\`\`yaml
# Example GitHub Actions workflow
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
        
    - name: Install Dependencies
      run: npm install
      
    - name: Run Tests
      run: npm test
      
    - name: Build
      run: npm run build
\`\`\`

2. Automated Testing:
   - Unit Tests
   - Integration Tests
   - End-to-End Tests
   - Security Tests
   - Performance Tests

3. Build Process:
   - Compile code
   - Create artifacts
   - Run static analysis
   - Generate documentation

4. Deployment Stages:
   - Development
   - Staging
   - Production

Best Practices:
1. Automate everything
2. Use version control
3. Implement security scans
4. Monitor metrics
5. Use infrastructure as code

Benefits:
1. Faster delivery
2. Reduced manual errors
3. Consistent process
4. Early bug detection
5. Continuous feedback`
  },
  {
    id: 6002,
    title: 'Docker and Containerization',
    description: 'Explain Docker containers and their benefits.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `Docker is a platform for developing, shipping, and running applications in containers.

Key Concepts:

1. Dockerfile Example:
\`\`\`dockerfile
# Use official Node.js runtime
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
\`\`\`

2. Docker Compose:
\`\`\`yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=myuser
      - POSTGRES_PASSWORD=mypassword
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

3. Common Commands:
\`\`\`bash
# Build image
docker build -t myapp .

# Run container
docker run -p 3000:3000 myapp

# List containers
docker ps

# Stop container
docker stop <container_id>

# Remove container
docker rm <container_id>
\`\`\`

Benefits:
1. Consistency across environments
2. Isolation
3. Resource efficiency
4. Easy scaling
5. Version control
6. Rapid deployment

Best Practices:
1. Use official base images
2. Minimize layers
3. Multi-stage builds
4. Security scanning
5. Resource limits
6. Health checks`
  }
];
