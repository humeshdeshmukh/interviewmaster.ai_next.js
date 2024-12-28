import { Question } from '../../types';

export const testingQuestions: Question[] = [
  {
    id: 10001,
    title: 'Testing Pyramid and Test Types',
    description: 'Explain different types of testing and the testing pyramid concept.',
    category: 'Tech',
    company: 'Microsoft',
    isBookmarked: false,
    details: `The Testing Pyramid is a visual representation of how different types of tests should be distributed in your testing strategy.

Testing Pyramid Levels:
1. Unit Tests (Base) - Most numerous
2. Integration Tests (Middle)
3. E2E Tests (Top) - Least numerous

Example Implementation:

1. Unit Tests (Jest):
\`\`\`typescript
// Function to test
function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Unit tests
describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should sum all item prices', () => {
    const items = [
      { id: 1, price: 10 },
      { id: 2, price: 20 }
    ];
    expect(calculateTotal(items)).toBe(30);
  });

  it('should handle decimal prices', () => {
    const items = [
      { id: 1, price: 10.5 },
      { id: 2, price: 20.3 }
    ];
    expect(calculateTotal(items)).toBeCloseTo(30.8);
  });
});
\`\`\`

2. Integration Tests (Supertest):
\`\`\`typescript
import request from 'supertest';
import app from './app';
import { db } from './database';

describe('User API', () => {
  beforeAll(async () => {
    await db.migrate.latest();
  });

  afterAll(async () => {
    await db.destroy();
  });

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        name: 'John Doe',
        email: 'john@example.com'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('John Doe');
  });
});
\`\`\`

3. E2E Tests (Cypress):
\`\`\`typescript
describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login successfully', () => {
    cy.get('[data-testid="email-input"]')
      .type('user@example.com');
    
    cy.get('[data-testid="password-input"]')
      .type('password123');
    
    cy.get('[data-testid="login-button"]')
      .click();
    
    cy.url().should('include', '/dashboard');
    cy.get('[data-testid="welcome-message"]')
      .should('contain', 'Welcome');
  });

  it('should show error for invalid credentials', () => {
    cy.get('[data-testid="email-input"]')
      .type('wrong@example.com');
    
    cy.get('[data-testid="password-input"]')
      .type('wrongpass');
    
    cy.get('[data-testid="login-button"]')
      .click();
    
    cy.get('[data-testid="error-message"]')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  });
});
\`\`\`

Best Practices:

1. Test Organization:
\`\`\`typescript
// Group related tests
describe('UserService', () => {
  describe('create', () => {
    it('should create user with valid data', () => {});
    it('should validate required fields', () => {});
    it('should handle duplicate emails', () => {});
  });

  describe('update', () => {
    it('should update existing user', () => {});
    it('should validate update data', () => {});
    it('should handle non-existent user', () => {});
  });
});
\`\`\`

2. Test Data Management:
\`\`\`typescript
// Test data factories
const createTestUser = (overrides = {}) => ({
  id: 1,
  name: 'Test User',
  email: 'test@example.com',
  ...overrides
});

// Use in tests
it('should update user name', () => {
  const user = createTestUser();
  const updated = updateUser(user, { name: 'New Name' });
  expect(updated.name).toBe('New Name');
});
\`\`\`

3. Mocking:
\`\`\`typescript
// Mock external service
jest.mock('./emailService', () => ({
  sendEmail: jest.fn().mockResolvedValue(true)
}));

// Use in test
it('should send welcome email', async () => {
  const emailService = require('./emailService');
  await createUser({ email: 'test@example.com' });
  expect(emailService.sendEmail).toHaveBeenCalled();
});
\`\`\`

Testing Strategy Tips:
1. Write tests first (TDD)
2. Keep tests focused
3. Use meaningful descriptions
4. Test edge cases
5. Maintain test independence
6. Regular test maintenance`
  },
  {
    id: 10002,
    title: 'Test-Driven Development (TDD)',
    description: 'Explain TDD process and demonstrate with examples.',
    category: 'Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Test-Driven Development (TDD) is a software development process where tests are written before the actual code.

TDD Cycle:
1. Red - Write failing test
2. Green - Write minimal code to pass
3. Refactor - Improve code quality

Example TDD Process:

1. First Test:
\`\`\`typescript
// Step 1: Write failing test
describe('ShoppingCart', () => {
  it('should start empty', () => {
    const cart = new ShoppingCart();
    expect(cart.getItems()).toHaveLength(0);
  });
});
\`\`\`

2. Initial Implementation:
\`\`\`typescript
// Step 2: Make it pass
class ShoppingCart {
  private items: Item[] = [];

  getItems(): Item[] {
    return this.items;
  }
}
\`\`\`

3. Add Item Test:
\`\`\`typescript
// Step 3: Add more functionality
describe('ShoppingCart', () => {
  it('should add items', () => {
    const cart = new ShoppingCart();
    const item = { id: 1, name: 'Book', price: 10 };
    cart.addItem(item);
    expect(cart.getItems()).toHaveLength(1);
    expect(cart.getItems()[0]).toEqual(item);
  });
});
\`\`\`

4. Implement Add Item:
\`\`\`typescript
class ShoppingCart {
  private items: Item[] = [];

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }
}
\`\`\`

5. Calculate Total Test:
\`\`\`typescript
describe('ShoppingCart', () => {
  it('should calculate total', () => {
    const cart = new ShoppingCart();
    cart.addItem({ id: 1, name: 'Book', price: 10 });
    cart.addItem({ id: 2, name: 'Pen', price: 5 });
    expect(cart.getTotal()).toBe(15);
  });
});
\`\`\`

6. Final Implementation:
\`\`\`typescript
class ShoppingCart {
  private items: Item[] = [];

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateQuantity(id: number, quantity: number): void {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
    }
  }
}
\`\`\`

TDD Benefits:
1. Better design
2. Fewer bugs
3. Built-in documentation
4. Confidence in changes

Best Practices:
1. Small, focused tests
2. Clear test names
3. One assertion per test
4. Independent tests
5. Fast execution`
  }
];
