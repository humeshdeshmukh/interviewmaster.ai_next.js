import { Question } from '../../types';

export const communicationQuestions: Question[] = [
  {
    id: 8001,
    title: 'How do you explain complex technical concepts to non-technical stakeholders?',
    description: 'Share your approach to communicating technical information to different audiences.',
    category: 'Non-Tech',
    company: 'Microsoft',
    isBookmarked: false,
    details: `Effective Technical Communication Framework:

1. Audience Analysis
   - Technical background
   - Business context
   - Key concerns
   - Decision-making role

2. Communication Strategies:

   a) Use Analogies
   Example:
   "Database indexing is like a book's index:
   - Without index: Read every page to find information
   - With index: Quickly locate specific topics"

   b) Visual Aids
   \`\`\`
   Technical: Database Schema
   Non-Technical: Simple flowchart
   
   User -> [Search Box] -> [Search Engine] -> [Results]
   \`\`\`

   c) Layered Explanation
   1. High-level overview
   2. Business impact
   3. Technical details (if requested)
   4. Next steps/recommendations

Example Scenario:
"Explaining microservices architecture to business stakeholders:

Business Version:
'Instead of one large application that's difficult to update and maintain, we break it into smaller, independent services. Think of it like a restaurant:
- Kitchen (Order Processing)
- Waitstaff (User Interface)
- Cashier (Payment Service)
Each can be improved without disrupting others.'

Technical Version:
'Microservices architecture with containerized services, API gateway, and event-driven communication...'

Result:
- Stakeholders understood the concept
- Approved the migration plan
- Better aligned on resource needs"

Best Practices:
1. Start with the "why"
2. Use familiar examples
3. Focus on business value
4. Be prepared to dive deeper
5. Check for understanding
6. Document key points`
  },
  {
    id: 8002,
    title: 'Describe a time when you had to deliver difficult news to a client or team member',
    description: 'Share how you handle challenging communications professionally.',
    category: 'Non-Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Framework for Delivering Difficult News:

1. Preparation
   - Gather all facts
   - Anticipate questions
   - Prepare solutions/alternatives
   - Choose appropriate timing
   - Select suitable setting

2. Communication Structure:

   a) Opening
   - Be direct but empathetic
   - State purpose clearly
   - Acknowledge impact

   b) Main Message
   - Present facts
   - Explain reasoning
   - Share mitigation plans
   - Offer alternatives

   c) Next Steps
   - Clear action items
   - Timeline
   - Support available
   - Follow-up plan

Example Scenario:
"Project deadline extension communication:

Email Template:
\`\`\`
Subject: Project Timeline Update - [Project Name]

Dear [Stakeholder],

I'm writing to discuss an important update regarding our [Project Name] timeline.

Current Situation:
- Original deadline: [Date]
- New projected completion: [Date]
- Reason: [Brief explanation]

Impact & Mitigation:
1. [Impact point 1]
   - [Mitigation strategy]
2. [Impact point 2]
   - [Mitigation strategy]

Next Steps:
1. [Action item 1] - [Date]
2. [Action item 2] - [Date]
3. [Action item 3] - [Date]

I'm available to discuss this in detail at your convenience.

Best regards,
[Your name]
\`\`\`

Best Practices:
1. Be transparent
2. Take responsibility
3. Offer solutions
4. Listen actively
5. Document everything
6. Follow up consistently`
  }
];
