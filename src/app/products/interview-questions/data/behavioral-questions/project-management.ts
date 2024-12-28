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

2. Risk Assessment Matrix:
\`\`\`
Impact
   ^
H  | M H H
M  | L M H
L  | L L M
   +---------> Probability
    L M H
\`\`\`

3. Risk Monitoring System:
\`\`\`typescript
interface RiskMetrics {
  totalRisks: number;
  highPriorityRisks: number;
  mitigatedRisks: number;
  openRisks: number;
  risksByCategory: Record<Risk['category'], number>;
}

class RiskMonitor {
  private riskRegister: RiskRegister;

  constructor(riskRegister: RiskRegister) {
    this.riskRegister = riskRegister;
  }

  calculateMetrics(): RiskMetrics {
    const risks = this.riskRegister.risks;
    return {
      totalRisks: risks.length,
      highPriorityRisks: this.riskRegister.getHighPriorityRisks().length,
      mitigatedRisks: risks.filter(r => r.status === 'Mitigated').length,
      openRisks: risks.filter(r => r.status === 'Open').length,
      risksByCategory: this.calculateRisksByCategory()
    };
  }

  private calculateRisksByCategory(): Record<Risk['category'], number> {
    const categories: Risk['category'][] = [
      'Technical',
      'Schedule',
      'Resource',
      'Scope'
    ];
    
    return categories.reduce((acc, category) => ({
      ...acc,
      [category]: this.riskRegister.getRisksByCategory(category).length
    }), {} as Record<Risk['category'], number>);
  }

  generateReport(metrics: RiskMetrics): string {
    return \`Risk Summary Report
------------------
Total Risks: \${metrics.totalRisks}
High Priority: \${metrics.highPriorityRisks}
Mitigated: \${metrics.mitigatedRisks}
Open: \${metrics.openRisks}

Risks by Category:
- Technical: \${metrics.risksByCategory.Technical}
- Schedule: \${metrics.risksByCategory.Schedule}
- Resource: \${metrics.risksByCategory.Resource}
- Scope: \${metrics.risksByCategory.Scope}\`;
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

Real Example:
In my last project, we identified a high-risk dependency on a third-party API:

1. Risk Details:
   - Description: API provider announcing deprecation
   - Impact: High (core functionality affected)
   - Probability: High (confirmed timeline)
   - Category: Technical

2. Mitigation Strategy:
   - Created API abstraction layer
   - Researched alternative providers
   - Developed migration plan
   - Set up monitoring system

3. Outcome:
   - Successful migration to new API
   - Zero downtime during transition
   - Improved system resilience
   - Documentation updated

4. Lessons Learned:
   - Early risk identification critical
   - Regular vendor assessment needed
   - Technical debt monitoring important
   - Communication plan essential

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
    // Update scope based on approved change
    this.scope = this.applyChange(this.scope, approvedChange);
    this.notifyStakeholders(approvedChange);
  }
}
\`\`\`

2. Change Control Process:
\`\`\`typescript
interface ChangeRequest {
  id: string;
  type: 'Scope' | 'Schedule' | 'Budget' | 'Resources';
  description: string;
  justification: string;
  requestedBy: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'Approved' | 'Rejected';
  submissionDate: Date;
}

interface ChangeImpact {
  schedule: number; // Days added/removed
  budget: number; // Cost impact
  resources: ResourceRequirement[];
  risk: Risk[];
}

class ChangeControlBoard {
  private members: string[];
  private threshold: number;

  evaluateChange(change: ChangeRequest): boolean {
    const votes = this.collectVotes(change);
    return this.calculateApproval(votes);
  }

  documentDecision(change: ChangeRequest, approved: boolean): void {
    change.status = approved ? 'Approved' : 'Rejected';
    this.updateChangeLog(change);
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

Real Example:
In a recent web application project:

1. Initial Scope:
   - User authentication
   - Basic CRUD operations
   - Report generation
   - Mobile responsiveness

2. Change Requests:
   - Real-time notifications
   - Social media integration
   - Advanced analytics
   - Custom theming

3. Management Approach:
   - Documented each request
   - Analyzed impacts
   - Prioritized changes
   - Adjusted timeline/budget

4. Results:
   - Core features delivered on time
   - Critical changes incorporated
   - Non-essential items phased
   - Client satisfaction maintained

Best Practices:
1. Clear documentation
2. Regular scope reviews
3. Stakeholder engagement
4. Change control process
5. Impact analysis
6. Priority management
7. Communication plan
8. Resource planning"`
  }
];
