import { Question } from '../../types';

export const timeManagementQuestions: Question[] = [
  {
    id: 12001,
    title: 'How do you prioritize your tasks and manage your time effectively?',
    description: 'Explain your approach to time management and task prioritization.',
    type: 'Non-Tech',
    category: 'Time Management',
    difficulty: 'Medium',
    company: 'Amazon',
    isBookmarked: false,
    tags: ['Time Management', 'Prioritization', 'Organization'],
    likes: 156,
    views: 2341,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Time Management Framework:

1. Eisenhower Matrix
\`\`\`
Important & Urgent | Important & Not Urgent
------------------|--------------------
Do First          | Schedule
------------------|--------------------
Urgent & Not      | Not Important &
Important         | Not Urgent
------------------|--------------------
Delegate          | Eliminate
\`\`\`

2. Task Prioritization Method:
   - Impact vs Effort Analysis
   - Deadline-based prioritization
   - Value-based ranking
   - Dependencies consideration

3. Time Management Tools:
   - Calendar blocking
   - Pomodoro technique
   - Time tracking apps
   - Task management software

4. Best Practices:
   - Set clear goals
   - Break down large tasks
   - Minimize distractions
   - Regular reviews
   - Buffer time for emergencies

Example Answer:
"I use a combination of methods to manage my time effectively:

1. Daily Planning (10min):
   - Review calendar
   - Check deadlines
   - Set top 3 priorities

2. Task Organization:
   - Use Eisenhower Matrix
   - Consider dependencies
   - Estimate time needed

3. Execution:
   - Time blocking
   - Pomodoro technique
   - Regular breaks
   - Progress tracking

4. Review and Adjust:
   - Daily quick review
   - Weekly planning
   - Monthly assessment"`
  },
  {
    id: 12002,
    title: 'How do you handle multiple deadlines?',
    description: 'Describe your strategy for managing multiple concurrent deadlines.',
    type: 'Non-Tech',
    category: 'Time Management',
    difficulty: 'Hard',
    company: 'Google',
    isBookmarked: false,
    tags: ['Deadlines', 'Multitasking', 'Project Management'],
    likes: 134,
    views: 1892,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Multiple Deadline Management Framework:

1. Assessment Phase
   - List all deadlines
   - Evaluate dependencies
   - Estimate time needed
   - Identify resources required

2. Prioritization Strategy
   - Deadline proximity
   - Project importance
   - Stakeholder impact
   - Resource availability

3. Execution Plan
\`\`\`typescript
interface Project {
  name: string;
  deadline: Date;
  priority: 'High' | 'Medium' | 'Low';
  dependencies: string[];
  resources: string[];
  status: 'Not Started' | 'In Progress' | 'Completed';
}

interface Timeline {
  projects: Project[];
  milestones: {
    date: Date;
    deliverables: string[];
  }[];
}

// Example Project Timeline
const projectTimeline: Timeline = {
  projects: [
    {
      name: 'Project A',
      deadline: new Date('2024-02-01'),
      priority: 'High',
      dependencies: ['Design Approval'],
      resources: ['Team A', 'Design Team'],
      status: 'In Progress'
    }
  ],
  milestones: [
    {
      date: new Date('2024-01-15'),
      deliverables: ['Design Documentation', 'Initial Prototype']
    }
  ]
};
\`\`\`

4. Communication Strategy
   - Regular updates
   - Early escalation
   - Stakeholder management
   - Progress tracking

Example Answer:
"When managing multiple deadlines, I follow a systematic approach:

1. Initial Organization:
   - Create project timeline
   - Map dependencies
   - Set milestones
   - Identify risks

2. Resource Allocation:
   - Assess team capacity
   - Distribute workload
   - Plan buffer time
   - Arrange backup resources

3. Execution Management:
   - Daily progress tracking
   - Regular team updates
   - Risk mitigation
   - Quality checks

4. Stakeholder Communication:
   - Status reports
   - Early warnings
   - Change requests
   - Success metrics"`
  }
];
