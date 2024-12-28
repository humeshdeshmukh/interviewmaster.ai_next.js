import { Question } from '../../types';

export const projectManagementQuestions: Question[] = [
  {
    id: 13001,
    title: 'Risk Management in Projects',
    description: 'Explain your approach to identifying and managing project risks.',
    type: 'Non-Tech',
    category: 'Project Management',
    difficulty: 'Hard',
    company: 'Microsoft',
    isBookmarked: false,
    tags: ['Risk Management', 'Project Planning', 'Mitigation Strategies'],
    likes: 245,
    views: 3567,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Risk Management Framework:

1. Risk Identification Process:
\`\`\`typescript
interface Risk {
  id: string;
  description: string;
  probability: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  category: 'Technical' | 'Schedule' | 'Resource' | 'Scope';
  mitigation: string;
  contingency: string;
  owner: string;
  status: 'Open' | 'Mitigated' | 'Closed';
}

interface RiskRegister {
  projectId: string;
  risks: Risk[];
  lastUpdated: Date;
  
  addRisk(risk: Risk): void;
  updateRisk(id: string, updates: Partial<Risk>): void;
  getRisksByCategory(category: Risk['category']): Risk[];
  getHighPriorityRisks(): Risk[];
}

class ProjectRiskManager implements RiskRegister {
  projectId: string;
  risks: Risk[];
  lastUpdated: Date;

  constructor(projectId: string) {
    this.projectId = projectId;
    this.risks = [];
    this.lastUpdated = new Date();
  }

  addRisk(risk: Risk): void {
    this.risks.push(risk);
    this.lastUpdated = new Date();
  }

  updateRisk(id: string, updates: Partial<Risk>): void {
    const index = this.risks.findIndex(r => r.id === id);
    if (index !== -1) {
      this.risks[index] = { ...this.risks[index], ...updates };
      this.lastUpdated = new Date();
    }
  }

  getRisksByCategory(category: Risk['category']): Risk[] {
    return this.risks.filter(r => r.category === category);
  }

  getHighPriorityRisks(): Risk[] {
    return this.risks.filter(
      r => r.probability === 'High' && r.impact === 'High'
    );
  }
}
\`\`\`

Example Answer:
"I follow a systematic approach to risk management:

1. Risk Identification
   - Team brainstorming
   - Historical analysis
   - Expert consultation
   - Stakeholder input

2. Risk Assessment
   - Probability evaluation
   - Impact analysis
   - Priority assignment
   - Category classification

3. Risk Mitigation
   - Strategy development
   - Resource allocation
   - Owner assignment
   - Timeline creation

4. Risk Monitoring
   - Regular reviews
   - Metric tracking
   - Status updates
   - Stakeholder communication

Best Practices:
1. Regular risk reviews
2. Clear ownership assignment
3. Documented mitigation plans
4. Stakeholder communication
5. Contingency planning
6. Metrics tracking
7. Knowledge sharing
8. Process improvement"`
  },
  {
    id: 13002,
    title: 'Handling Scope Creep',
    description: 'How do you manage and control scope creep in your projects?',
    type: 'Non-Tech',
    category: 'Project Management',
    difficulty: 'Medium',
    company: 'Amazon',
    isBookmarked: false,
    tags: ['Scope Management', 'Change Control', 'Project Planning'],
    likes: 189,
    views: 2876,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Scope Management Framework:

1. Scope Definition:
\`\`\`typescript
interface ProjectScope {
  objectives: string[];
  deliverables: Deliverable[];
  constraints: Constraint[];
  assumptions: string[];
  exclusions: string[];
}

interface Deliverable {
  id: string;
  name: string;
  description: string;
  acceptance_criteria: string[];
  due_date: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

interface Constraint {
  type: 'Time' | 'Budget' | 'Resources' | 'Quality';
  description: string;
  impact: 'Low' | 'Medium' | 'High';
}

class ScopeManager {
  private scope: ProjectScope;
  private changes: ChangeRequest[];

  constructor(initialScope: ProjectScope) {
    this.scope = initialScope;
    this.changes = [];
  }

  addChangeRequest(change: ChangeRequest): void {
    this.changes.push(change);
  }

  evaluateChange(change: ChangeRequest): ChangeImpact {
    return {
      schedule: this.calculateScheduleImpact(change),
      budget: this.calculateBudgetImpact(change),
      resources: this.calculateResourceImpact(change),
      risk: this.assessRiskImpact(change)
    };
  }

  updateScope(approvedChange: ChangeRequest): void {
    this.scope = this.applyChange(this.scope, approvedChange);
    this.notifyStakeholders(approvedChange);
  }
}
\`\`\`

Example Answer:
"I manage scope creep through a structured approach:

1. Clear Initial Scope
   - Detailed requirements
   - Documented assumptions
   - Defined boundaries
   - Stakeholder sign-off

2. Change Control Process
   - Formal request system
   - Impact analysis
   - Stakeholder review
   - Documentation

3. Communication Strategy
   - Regular updates
   - Stakeholder alignment
   - Expectation management
   - Progress tracking

Best Practices:
1. Clear documentation
2. Regular scope reviews
3. Stakeholder engagement
4. Change control process
5. Impact analysis
6. Priority management
7. Communication plan
8. Resource planning"`
  },
  {
    id: 13003,
    title: 'Agile Project Management',
    description: 'How do you implement and manage Agile methodologies in your projects?',
    type: 'Non-Tech',
    category: 'Project Management',
    difficulty: 'Medium',
    company: 'Google',
    isBookmarked: false,
    tags: ['Agile', 'Scrum', 'Sprint Planning', 'Retrospectives'],
    likes: 312,
    views: 4521,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Agile Project Management Framework:

1. Sprint Management:
\`\`\`typescript
interface SprintConfig {
  duration: number; // in weeks
  capacity: number; // in story points
  team: TeamMember[];
  goals: string[];
}

interface UserStory {
  id: string;
  title: string;
  description: string;
  points: number;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Backlog' | 'Sprint' | 'In Progress' | 'Review' | 'Done';
  assignee?: TeamMember;
  acceptance_criteria: string[];
}

class SprintManager {
  private backlog: UserStory[];
  private currentSprint: Sprint;
  private sprintHistory: Sprint[];

  planSprint(stories: UserStory[], config: SprintConfig): Sprint {
    const sprintCapacity = this.calculateCapacity(config);
    const selectedStories = this.selectStories(stories, sprintCapacity);
    return new Sprint(selectedStories, config);
  }

  trackProgress(): SprintMetrics {
    return {
      completedPoints: this.calculateCompletedPoints(),
      remainingPoints: this.calculateRemainingPoints(),
      burndownData: this.generateBurndownData(),
      velocity: this.calculateVelocity()
    };
  }
}
\`\`\`

2. Scrum Ceremonies:
\`\`\`typescript
interface ScrumMeeting {
  type: 'Daily' | 'Planning' | 'Review' | 'Retrospective';
  date: Date;
  duration: number;
  attendees: TeamMember[];
  agenda: string[];
  outcomes: string[];
}

class ScrumMaster {
  facilitateDailyStandup(): DailyUpdate[] {
    return this.team.map(member => ({
      member,
      yesterday: member.getYesterdayTasks(),
      today: member.getTodayPlan(),
      blockers: member.getBlockers()
    }));
  }

  conductRetrospective(): RetroOutcome {
    return {
      went_well: this.collectFeedback('positive'),
      to_improve: this.collectFeedback('negative'),
      action_items: this.defineActionItems(),
      metrics: this.calculateSprintMetrics()
    };
  }
}
\`\`\`

Example Answer:
"I implement Agile methodologies using these key practices:

1. Sprint Planning
   - Backlog grooming
   - Story point estimation
   - Capacity planning
   - Goal setting

2. Daily Execution
   - Stand-up meetings
   - Task board updates
   - Blocker resolution
   - Progress tracking

3. Sprint Reviews
   - Demo preparation
   - Stakeholder feedback
   - Acceptance testing
   - Documentation

4. Retrospectives
   - Team feedback
   - Process improvement
   - Action items
   - Metrics review

Best Practices:
1. Regular ceremonies
2. Clear communication
3. Visible progress
4. Quick adaptation
5. Team empowerment
6. Continuous improvement"`
  },
  {
    id: 13004,
    title: 'Stakeholder Management',
    description: 'How do you manage stakeholder expectations and communication in complex projects?',
    type: 'Non-Tech',
    category: 'Project Management',
    difficulty: 'Hard',
    company: 'Meta',
    isBookmarked: false,
    tags: ['Stakeholder Management', 'Communication', 'Leadership'],
    likes: 278,
    views: 3890,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Stakeholder Management Framework:

1. Stakeholder Analysis:
\`\`\`typescript
interface Stakeholder {
  id: string;
  name: string;
  role: string;
  influence: 'High' | 'Medium' | 'Low';
  interest: 'High' | 'Medium' | 'Low';
  preferences: {
    communicationFrequency: 'Daily' | 'Weekly' | 'Monthly';
    reportingFormat: 'Detailed' | 'Summary' | 'Dashboard';
    meetingPreference: 'One-on-One' | 'Group' | 'Email';
  };
  concerns: string[];
}

class StakeholderManager {
  private stakeholders: Map<string, Stakeholder>;
  private communicationPlan: CommunicationPlan;

  analyzeStakeholders(): StakeholderMatrix {
    return {
      highInfluenceHighInterest: this.getStakeholdersByCategory('manage_closely'),
      highInfluenceLowInterest: this.getStakeholdersByCategory('keep_satisfied'),
      lowInfluenceHighInterest: this.getStakeholdersByCategory('keep_informed'),
      lowInfluenceLowInterest: this.getStakeholdersByCategory('monitor')
    };
  }

  createCommunicationPlan(): CommunicationPlan {
    return this.stakeholders.reduce((plan, stakeholder) => ({
      ...plan,
      [stakeholder.id]: this.generateStakeholderStrategy(stakeholder)
    }), {});
  }
}
\`\`\`

2. Communication Management:
\`\`\`typescript
interface CommunicationPlan {
  stakeholderId: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  channel: 'Email' | 'Meeting' | 'Report' | 'Dashboard';
  format: 'Detailed' | 'Summary';
  owner: string;
  nextScheduled: Date;
}

class CommunicationManager {
  private plans: CommunicationPlan[];
  private templates: Map<string, Template>;

  generateReport(stakeholder: Stakeholder): Report {
    const template = this.templates.get(stakeholder.preferences.reportingFormat);
    return {
      summary: this.generateExecutiveSummary(),
      progress: this.calculateProgress(),
      risks: this.identifyRisks(),
      nextSteps: this.planNextSteps()
    };
  }

  scheduleUpdates(): void {
    this.plans.forEach(plan => {
      this.scheduler.schedule({
        type: plan.channel,
        date: plan.nextScheduled,
        stakeholder: plan.stakeholderId,
        content: this.generateContent(plan)
      });
    });
  }
}
\`\`\`

Example Answer:
"I manage stakeholders using a comprehensive approach:

1. Stakeholder Identification
   - Role analysis
   - Influence mapping
   - Interest assessment
   - Preference gathering

2. Communication Strategy
   - Tailored approaches
   - Regular updates
   - Clear escalation paths
   - Feedback loops

3. Expectation Management
   - Clear objectives
   - Regular alignment
   - Progress visibility
   - Risk communication

4. Relationship Building
   - Trust development
   - Active listening
   - Proactive engagement
   - Issue resolution

Best Practices:
1. Regular engagement
2. Clear communication
3. Expectation setting
4. Proactive updates
5. Issue transparency
6. Feedback incorporation
7. Relationship maintenance
8. Documentation"`
  },
  {
    id: 13005,
    title: 'Project Resource Management',
    description: 'How do you manage and optimize resource allocation in projects?',
    type: 'Non-Tech',
    category: 'Project Management',
    difficulty: 'Medium',
    company: 'Apple',
    isBookmarked: false,
    tags: ['Resource Management', 'Team Management', 'Capacity Planning'],
    likes: 198,
    views: 2987,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Resource Management Framework:

1. Resource Planning:
\`\`\`typescript
interface Resource {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: number; // hours per week
  cost: number; // per hour
  assignments: Assignment[];
}

interface Assignment {
  projectId: string;
  taskId: string;
  startDate: Date;
  endDate: Date;
  hoursPerWeek: number;
  status: 'Planned' | 'Active' | 'Completed';
}

class ResourceManager {
  private resources: Resource[];
  private projects: Project[];

  calculateUtilization(resource: Resource): Utilization {
    return {
      assigned: this.getAssignedHours(resource),
      available: resource.availability,
      utilizationRate: this.calculateRate(resource),
      forecast: this.forecastUtilization(resource)
    };
  }

  optimizeAllocation(): AllocationPlan {
    return {
      assignments: this.balanceWorkload(),
      conflicts: this.identifyConflicts(),
      recommendations: this.generateRecommendations()
    };
  }
}
\`\`\`

2. Capacity Planning:
\`\`\`typescript
interface CapacityPlan {
  period: 'Week' | 'Month' | 'Quarter';
  teams: TeamCapacity[];
  projects: ProjectDemand[];
  gaps: ResourceGap[];
}

class CapacityPlanner {
  private teams: Team[];
  private demand: ProjectDemand[];

  forecastCapacity(period: DateRange): CapacityForecast {
    return {
      available: this.calculateAvailableCapacity(period),
      required: this.calculateRequiredCapacity(period),
      gap: this.identifyCapacityGaps(period),
      recommendations: this.generateRecommendations(period)
    };
  }

  optimizeTeamStructure(): TeamOptimization {
    return {
      currentStructure: this.analyzeCurrentStructure(),
      recommendations: this.recommendChanges(),
      implementation: this.planImplementation()
    };
  }
}
\`\`\`

Example Answer:
"I manage resources using these key strategies:

1. Resource Planning
   - Skill mapping
   - Availability tracking
   - Cost optimization
   - Allocation planning

2. Capacity Management
   - Workload analysis
   - Utilization tracking
   - Gap identification
   - Forecast planning

3. Team Optimization
   - Skill development
   - Cross-training
   - Performance monitoring
   - Career growth

4. Resource Balancing
   - Workload distribution
   - Conflict resolution
   - Priority management
   - Efficiency improvement

Best Practices:
1. Regular monitoring
2. Clear allocation
3. Skill development
4. Conflict resolution
5. Performance tracking
6. Cost optimization
7. Team satisfaction
8. Documentation"`
  }
];
