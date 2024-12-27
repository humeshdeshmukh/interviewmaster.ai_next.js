export interface Ebook {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  downloadUrl: string;
  pages: number;
  format: string;
  fileSize: string;
  language: string;
  publishDate: string;
  rating: number;
  downloads: number;
}

export const ebookCategories = [
  {
    id: 'algorithms',
    name: 'Algorithms & Data Structures',
    icon: 'FaCode',
    color: '#fcba28'
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: 'FaServer',
    color: '#7B61FF'
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    icon: 'FaDesktop',
    color: '#FF6B6B'
  },
  {
    id: 'backend',
    name: 'Backend Development',
    icon: 'FaDatabase',
    color: '#00C48C'
  },
  {
    id: 'behavioral',
    name: 'Behavioral Interviews',
    icon: 'FaUserTie',
    color: '#FF9F43'
  }
];

export const ebooks: Ebook[] = [
  {
    id: 'ctci-latest',
    title: 'Cracking the Coding Interview',
    description: 'The most comprehensive guide to preparing for technical interviews. Covers algorithms, data structures, system design, and behavioral questions.',
    coverImage: '/images/ebooks/ctci.jpg',
    author: 'Gayle Laakmann McDowell',
    category: 'algorithms',
    tags: ['algorithms', 'data structures', 'interview prep'],
    downloadUrl: 'https://github.com/Avinash987/Coding/blob/master/Cracking-the-Coding-Interview-6th-Edition-189-Programming-Questions-and-Solutions.pdf',
    pages: 708,
    format: 'PDF',
    fileSize: '8.3 MB',
    language: 'English',
    publishDate: '2015-07-01',
    rating: 4.8,
    downloads: 150000
  },
  {
    id: 'system-design-primer',
    title: 'System Design Primer',
    description: 'Learn how to design large-scale systems. Prep for the system design interview. Includes real-world examples and architecture patterns.',
    coverImage: '/images/ebooks/system-design.jpg',
    author: 'Donne Martin',
    category: 'system-design',
    tags: ['system design', 'architecture', 'scalability'],
    downloadUrl: 'https://github.com/donnemartin/system-design-primer',
    pages: 500,
    format: 'GitHub/PDF',
    fileSize: '5.2 MB',
    language: 'English',
    publishDate: '2023-01-15',
    rating: 4.9,
    downloads: 120000
  },
  {
    id: 'grokking-algorithms',
    title: 'Grokking Algorithms',
    description: 'An illustrated guide for programmers and other curious people. Learn algorithms in a visual and intuitive way.',
    coverImage: '/images/ebooks/grokking.jpg',
    author: 'Aditya Bhargava',
    category: 'algorithms',
    tags: ['algorithms', 'beginners', 'visual learning'],
    downloadUrl: 'https://github.com/KevinOfNeu/ebooks/blob/master/Grokking%20Algorithms.pdf',
    pages: 256,
    format: 'PDF',
    fileSize: '6.1 MB',
    language: 'English',
    publishDate: '2016-05-01',
    rating: 4.7,
    downloads: 85000
  },
  {
    id: 'clean-code',
    title: 'Clean Code',
    description: 'A handbook of agile software craftsmanship. Learn how to write clean, maintainable, and efficient code.',
    coverImage: '/images/ebooks/clean-code.jpg',
    author: 'Robert C. Martin',
    category: 'backend',
    tags: ['code quality', 'best practices', 'software engineering'],
    downloadUrl: 'https://github.com/dev-marko/clean-code-book/blob/master/Clean.Code.A.Handbook.of.Agile.Software.Craftsmanship.pdf',
    pages: 464,
    format: 'PDF',
    fileSize: '7.8 MB',
    language: 'English',
    publishDate: '2008-08-01',
    rating: 4.9,
    downloads: 200000
  },
  {
    id: 'design-patterns',
    title: 'Design Patterns',
    description: 'Elements of Reusable Object-Oriented Software. The classic book on software design patterns.',
    coverImage: '/images/ebooks/design-patterns.jpg',
    author: 'Gang of Four',
    category: 'backend',
    tags: ['design patterns', 'object-oriented', 'architecture'],
    downloadUrl: 'https://github.com/TushaarGVS/Design-Patterns-Mentorship/blob/master/Erich%20Gamma%2C%20Richard%20Helm%2C%20Ralph%20Johnson%2C%20John%20M.%20Vlissides-Design%20Patterns_%20Elements%20of%20Reusable%20Object-Oriented%20Software%20%20-Addison-Wesley%20Professional%20(1994).pdf',
    pages: 395,
    format: 'PDF',
    fileSize: '6.5 MB',
    language: 'English',
    publishDate: '1994-10-31',
    rating: 4.7,
    downloads: 180000
  },
  {
    id: 'you-dont-know-js',
    title: "You Don't Know JS",
    description: 'Deep dive into the core mechanisms of JavaScript. Perfect for frontend developers preparing for interviews.',
    coverImage: '/images/ebooks/ydkjs.jpg',
    author: 'Kyle Simpson',
    category: 'frontend',
    tags: ['javascript', 'frontend', 'web development'],
    downloadUrl: 'https://github.com/getify/You-Dont-Know-JS',
    pages: 1200,
    format: 'GitHub/PDF',
    fileSize: '12.4 MB',
    language: 'English',
    publishDate: '2020-01-15',
    rating: 4.8,
    downloads: 250000
  },
  {
    id: 'behavioral-interviews',
    title: 'Decode and Conquer',
    description: 'Answers to Product Management Interviews. Great resource for behavioral and product sense questions.',
    coverImage: '/images/ebooks/decode.jpg',
    author: 'Lewis C. Lin',
    category: 'behavioral',
    tags: ['behavioral', 'product management', 'soft skills'],
    downloadUrl: 'https://www.amazon.com/Decode-Conquer-Answers-Management-Interviews/dp/0615930417',
    pages: 348,
    format: 'PDF/Kindle',
    fileSize: '4.9 MB',
    language: 'English',
    publishDate: '2013-12-05',
    rating: 4.6,
    downloads: 75000
  }
];
