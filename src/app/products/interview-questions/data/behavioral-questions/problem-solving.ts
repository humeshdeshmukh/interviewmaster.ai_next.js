import { Question } from '../../types';

export const problemSolvingQuestions: Question[] = [
  {
    id: 7001,
    title: 'Describe a challenging technical problem you solved',
    description: 'Share an experience where you solved a complex technical issue.',
    category: 'Non-Tech',
    company: 'Google',
    isBookmarked: false,
    details: `How to Answer Problem-Solving Questions:

Framework for Problem-Solving Stories:

1. Problem Identification
   - What was the issue?
   - Who was affected?
   - What was the impact?
   - How was it discovered?

2. Analysis
   - What data did you gather?
   - What tools did you use?
   - What were potential causes?
   - Who did you consult?

3. Solution Development
   - What options did you consider?
   - How did you evaluate options?
   - What was your chosen approach?
   - Why did you choose it?

4. Implementation
   - How did you execute the solution?
   - What challenges arose?
   - How did you overcome them?
   - Who helped you?

5. Results
   - What was the outcome?
   - How did you measure success?
   - What did you learn?
   - What would you do differently?

Example Answer:
"At my previous company, we faced a critical performance issue where our main application's response time increased from 200ms to 2s during peak hours.

Problem:
- Sudden performance degradation
- Affecting 10,000+ users
- Revenue impact of $50K/day
- Discovered through monitoring alerts

Analysis:
1. Reviewed application logs
2. Analyzed database queries
3. Monitored system resources
4. Profiled application code
5. Consulted with database team

Solution:
1. Identified inefficient queries
2. Implemented query optimization
3. Added database indexes
4. Improved caching strategy
5. Set up better monitoring

Results:
- Response time reduced to 150ms
- 30% reduction in database load
- Zero downtime during fix
- Implemented preventive measures
- Created documentation for future reference"

Tips:
1. Use metrics when possible
2. Show systematic approach
3. Highlight collaboration
4. Emphasize learning
5. Focus on business impact`
  },
  {
    id: 7002,
    title: 'How do you approach making decisions with incomplete information?',
    description: 'Explain your decision-making process when faced with uncertainty.',
    category: 'Non-Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Decision-Making Framework:

1. Information Gathering
   - What do you know?
   - What don't you know?
   - What can you find out quickly?
   - What must you assume?

2. Risk Assessment
   - What are the potential outcomes?
   - What's the worst case scenario?
   - What's reversible vs. irreversible?
   - What are the opportunity costs?

3. Decision Matrix:
\`\`\`
| Option | Pros | Cons | Risk Level | Time to Implement |
|--------|------|------|------------|------------------|
| A      | ...  | ...  | Low        | Fast            |
| B      | ...  | ...  | Medium     | Medium          |
| C      | ...  | ...  | High       | Slow            |
\`\`\`

Example Answer:
"In my role as a tech lead, I had to decide whether to proceed with a major platform upgrade with only 70% of the usual testing completed due to time constraints.

Approach:
1. Gathered Available Information
   - Current system stability
   - Known issues
   - Critical functionality
   - Customer impact

2. Identified Unknowns
   - Edge case behaviors
   - Performance under full load
   - Integration points
   - Legacy system compatibility

3. Risk Mitigation
   - Created rollback plan
   - Prepared communication strategy
   - Set up enhanced monitoring
   - Staged deployment approach

4. Decision
   - Proceeded with upgrade
   - Implemented in phases
   - Increased monitoring
   - Had backup team on standby

Result:
- Successful upgrade
- Minor issues caught early
- No customer impact
- Team learned valuable lessons"

Best Practices:
1. Document assumptions
2. Consult stakeholders
3. Plan for contingencies
4. Monitor outcomes
5. Learn from results`
  }
];
