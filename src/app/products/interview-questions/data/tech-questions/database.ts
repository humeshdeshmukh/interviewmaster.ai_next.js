import { Question } from '../../types';

export const databaseQuestions: Question[] = [
  {
    id: 12001,
    title: 'Database Normalization and Design',
    description: 'Explain database normalization forms and demonstrate good database design practices.',
    type: 'Tech',
    category: 'Database',
    difficulty: 'Hard',
    company: 'Oracle',
    isBookmarked: false,
    tags: ['SQL', 'Database Design', 'Normalization'],
    likes: 234,
    views: 3421,
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03',
    details: `Database Normalization and Design Best Practices:

1. Normalization Forms:
   - 1NF: Atomic values, no repeating groups
   - 2NF: 1NF + no partial dependencies
   - 3NF: 2NF + no transitive dependencies
   - BCNF: 3NF + every determinant is a candidate key

Example Schema Design:
\`\`\`sql
-- E-commerce Database Schema

-- Users Table (1NF)
CREATE TABLE users (
  user_id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Profiles (2NF)
CREATE TABLE user_profiles (
  user_id UUID PRIMARY KEY REFERENCES users(user_id),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  address_line1 VARCHAR(255),
  address_line2 VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  country VARCHAR(100),
  postal_code VARCHAR(20)
);

-- Products (3NF)
CREATE TABLE products (
  product_id UUID PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES product_categories(category_id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Categories (3NF)
CREATE TABLE product_categories (
  category_id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_category_id UUID REFERENCES product_categories(category_id)
);

-- Orders (BCNF)
CREATE TABLE orders (
  order_id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(user_id),
  status VARCHAR(50) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items (BCNF)
CREATE TABLE order_items (
  order_id UUID REFERENCES orders(order_id),
  product_id UUID REFERENCES products(product_id),
  quantity INTEGER NOT NULL,
  price_at_time DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
\`\`\`

NoSQL Example (MongoDB):
\`\`\`javascript
// User Document
{
  _id: ObjectId("..."),
  email: "user@example.com",
  profile: {
    firstName: "John",
    lastName: "Doe",
    address: {
      line1: "123 Main St",
      city: "San Francisco",
      state: "CA",
      country: "USA"
    }
  },
  orders: [
    {
      orderId: ObjectId("..."),
      date: ISODate("2024-01-03"),
      items: [
        {
          productId: ObjectId("..."),
          name: "Product A",
          quantity: 2,
          price: 29.99
        }
      ],
      total: 59.98
    }
  ]
}
\`\`\`

Best Practices:
1. Use appropriate data types
2. Implement proper indexing
3. Maintain referential integrity
4. Consider query patterns
5. Plan for scalability
6. Document relationships
7. Use meaningful naming
8. Add proper constraints`
  }
];
