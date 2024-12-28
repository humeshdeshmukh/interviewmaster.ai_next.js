import { Question } from '../../types';

export const innovationQuestions: Question[] = [
  {
    id: 15001,
    title: 'Describe a time you introduced an innovative solution',
    description: 'Share an experience where you brought innovation to solve a problem.',
    category: 'Non-Tech',
    company: 'Google',
    isBookmarked: false,
    details: `Innovation Framework:

1. Problem Analysis:
\`\`\`typescript
interface Problem {
  description: string;
  impact: {
    business: string[];
    technical: string[];
    users: string[];
  };
  constraints: {
    technical: string[];
    resource: string[];
    time: string[];
  };
  currentSolution?: {
    approach: string;
    limitations: string[];
  };
}

// Example Problem Analysis
const performanceProblem: Problem = {
  description: "High latency in real-time data processing",
  impact: {
    business: [
      "Customer dissatisfaction",
      "Lost revenue",
      "Competitive disadvantage"
    ],
    technical: [
      "System bottlenecks",
      "Resource overutilization",
      "Scalability issues"
    ],
    users: [
      "Slow response times",
      "Data inconsistencies",
      "Poor user experience"
    ]
  },
  constraints: {
    technical: [
      "Legacy system integration",
      "Data consistency requirements"
    ],
    resource: [
      "Limited budget",
      "Team expertise"
    ],
    time: [
      "Must fix within Q2",
      "Minimal downtime allowed"
    ]
  },
  currentSolution: {
    approach: "Synchronous processing pipeline",
    limitations: [
      "Sequential processing",
      "No parallelization",
      "High memory usage"
    ]
  }
};
\`\`\`

2. Innovation Process:
\`\`\`typescript
interface Innovation {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  risks: string[];
  implementation: {
    phases: Phase[];
    timeline: string;
    resources: string[];
  };
  metrics: {
    before: Metrics;
    target: Metrics;
    actual?: Metrics;
  };
}

interface Phase {
  name: string;
  tasks: Task[];
  duration: string;
  dependencies: string[];
}

interface Task {
  name: string;
  owner: string;
  status: 'pending' | 'in-progress' | 'completed';
}

interface Metrics {
  performance: {
    latency: number;
    throughput: number;
  };
  business: {
    userSatisfaction: number;
    costSavings: number;
  };
}

// Example Innovation Solution
const streamProcessingSolution: Innovation = {
  id: "INN-001",
  title: "Event-Driven Stream Processing",
  description: "Implement real-time stream processing using Apache Kafka",
  benefits: [
    "10x lower latency",
    "Improved scalability",
    "Better resource utilization"
  ],
  risks: [
    "Learning curve",
    "Integration complexity",
    "Initial instability"
  ],
  implementation: {
    phases: [
      {
        name: "Research & Design",
        tasks: [
          {
            name: "Architecture design",
            owner: "Tech Lead",
            status: "completed"
          }
        ],
        duration: "2 weeks",
        dependencies: []
      }
    ],
    timeline: "Q2 2024",
    resources: [
      "2 Senior Engineers",
      "1 DevOps Engineer"
    ]
  },
  metrics: {
    before: {
      performance: {
        latency: 5000,
        throughput: 100
      },
      business: {
        userSatisfaction: 3.5,
        costSavings: 0
      }
    },
    target: {
      performance: {
        latency: 500,
        throughput: 1000
      },
      business: {
        userSatisfaction: 4.5,
        costSavings: 100000
      }
    }
  }
};
\`\`\`

Example Answer:
"Implementing Stream Processing Solution:

1. Problem Identification
   - High latency (5s)
   - Poor scalability
   - Resource inefficiency

2. Innovation Process
   a) Research
      - Stream processing patterns
      - Available technologies
      - Success stories
   
   b) Design
      - Event-driven architecture
      - Kafka streams
      - Microservices approach
   
   c) Implementation
      - Proof of concept
      - Gradual migration
      - Performance testing

3. Results
   - Latency reduced to 500ms
   - 10x throughput increase
   - 30% cost reduction
   - Improved scalability

4. Lessons Learned
   - Start small
   - Measure everything
   - Train the team
   - Document decisions"

Best Practices:
1. Problem Understanding
   - Root cause analysis
   - Impact assessment
   - Stakeholder input
   - Constraints mapping

2. Innovation Process
   - Research thoroughly
   - Start small
   - Validate assumptions
   - Measure results

3. Implementation
   - Clear phases
   - Risk management
   - Regular feedback
   - Documentation

4. Success Metrics
   - Define early
   - Measure consistently
   - Adjust targets
   - Share results`
  },
  {
    id: 15002,
    title: 'How do you foster innovation in your team?',
    description: 'Explain your approach to creating an innovative team culture.',
    category: 'Non-Tech',
    company: 'Apple',
    isBookmarked: false,
    details: `Innovation Culture Framework:

1. Innovation Program:
\`\`\`typescript
interface InnovationProgram {
  activities: Activity[];
  resources: Resource[];
  metrics: Metrics;
  rewards: Reward[];
}

interface Activity {
  name: string;
  type: 'hackathon' | 'workshop' | 'research' | 'experiment';
  frequency: string;
  participants: string[];
  outcomes: string[];
}

interface Resource {
  type: string;
  allocation: number;
  budget: number;
}

interface Metrics {
  ideas: number;
  implementations: number;
  impact: Impact[];
}

// Example Implementation
const innovationProgram: InnovationProgram = {
  activities: [
    {
      name: "Quarterly Hackathon",
      type: "hackathon",
      frequency: "quarterly",
      participants: ["developers", "designers", "product"],
      outcomes: [
        "New product features",
        "Process improvements",
        "Technical innovations"
      ]
    }
  ],
  resources: [
    {
      type: "Innovation Time",
      allocation: 20, // 20% of time
      budget: 50000
    }
  ],
  metrics: {
    ideas: 150,
    implementations: 25,
    impact: [
      {
        type: "efficiency",
        value: "30% improvement"
      }
    ]
  },
  rewards: [
    {
      name: "Innovation Award",
      criteria: ["impact", "creativity", "feasibility"],
      prize: "Conference attendance"
    }
  ]
};
\`\`\`

2. Innovation Process:
\`\`\`typescript
class InnovationManager {
  private ideas: Map<string, Idea> = new Map();
  
  submitIdea(idea: Idea): void {
    this.ideas.set(idea.id, {
      ...idea,
      status: 'submitted',
      submittedAt: new Date()
    });
  }
  
  evaluateIdea(id: string): Evaluation {
    const idea = this.ideas.get(id);
    if (!idea) throw new Error('Idea not found');
    
    return {
      impact: this.calculateImpact(idea),
      feasibility: this.assessFeasibility(idea),
      roi: this.calculateROI(idea)
    };
  }
  
  trackProgress(id: string): Progress {
    const idea = this.ideas.get(id);
    if (!idea) throw new Error('Idea not found');
    
    return {
      status: idea.status,
      milestones: idea.milestones,
      metrics: this.getMetrics(idea)
    };
  }
}
\`\`\`

Example Innovation Culture:
"Building Innovation Culture:

1. Regular Activities
   - Weekly innovation time
   - Monthly workshops
   - Quarterly hackathons
   - Annual innovation summit

2. Support Structure
   - Innovation budget
   - Mentorship program
   - Resource allocation
   - Training opportunities

3. Recognition System
   - Innovation awards
   - Implementation bonuses
   - Public recognition
   - Career advancement

4. Process Framework
   - Idea submission
   - Evaluation criteria
   - Implementation path
   - Impact measurement"

Best Practices:
1. Create Safe Space
   - No bad ideas
   - Learn from failures
   - Encourage experimentation
   - Support risk-taking

2. Provide Resources
   - Time allocation
   - Tools and platforms
   - Learning resources
   - Expert access

3. Measure Success
   - Innovation metrics
   - Implementation rate
   - Business impact
   - Team engagement

4. Foster Collaboration
   - Cross-functional teams
   - Knowledge sharing
   - External partnerships
   - Community building`
  }
];
