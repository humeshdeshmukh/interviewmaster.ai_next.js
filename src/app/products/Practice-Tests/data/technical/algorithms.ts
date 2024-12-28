import { Test } from '../../utils/types';

export const algorithmTests: Test[] = [
  {
    id: 'algo-beginner',
    title: 'Basic Algorithm Concepts',
    description: 'Test your knowledge of fundamental algorithmic concepts and basic problem-solving strategies.',
    difficulty: 'beginner',
    timeLimit: 30,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'algorithms',
    questions: [
      {
        id: 'algo-b-1',
        text: 'What is the time complexity of searching for an element in a sorted array using Binary Search?',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 'O(log n)',
        explanation: 'Binary Search repeatedly divides the search space in half, resulting in a logarithmic time complexity of O(log n).'
      },
      {
        id: 'algo-b-2',
        text: 'Which sorting algorithm has the best average-case time complexity?',
        options: ['Bubble Sort', 'Quick Sort', 'Selection Sort', 'Insertion Sort'],
        correctAnswer: 'Quick Sort',
        explanation: 'Quick Sort has an average time complexity of O(n log n) and performs well in practice due to its efficient partitioning strategy.'
      },
      {
        id: 'algo-b-3',
        text: 'What data structure would you use to implement a First-In-First-Out (FIFO) collection?',
        options: ['Stack', 'Queue', 'Tree', 'Hash Table'],
        correctAnswer: 'Queue',
        explanation: 'A Queue is designed for FIFO operations where elements are added at the end and removed from the front.'
      },
      {
        id: 'algo-b-4',
        text: 'What is the space complexity of an array-based implementation of a stack?',
        options: ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'A stack implemented using an array requires space proportional to the number of elements stored.'
      },
      {
        id: 'algo-b-5',
        text: 'Which of these is NOT a characteristic of a good hash function?',
        options: [
          'Uniform distribution',
          'Predictable sequence',
          'Fast computation',
          'Minimal collisions'
        ],
        correctAnswer: 'Predictable sequence',
        explanation: 'A good hash function should produce unpredictable, seemingly random output to minimize clustering and collisions.'
      },
      {
        id: 'algo-b-6',
        text: 'What is the primary advantage of using a linked list over an array?',
        options: [
          'Constant time access to elements',
          'Memory efficiency',
          'Dynamic size',
          'Cache efficiency'
        ],
        correctAnswer: 'Dynamic size',
        explanation: 'Linked lists can grow or shrink dynamically without needing to reallocate and copy elements.'
      },
      {
        id: 'algo-b-7',
        text: 'Which algorithm is best suited for finding the shortest path in an unweighted graph?',
        options: [
          'Depth-First Search',
          'Breadth-First Search',
          'Dijkstra's Algorithm',
          'Binary Search'
        ],
        correctAnswer: 'Breadth-First Search',
        explanation: 'BFS explores all vertices at the current depth before moving to vertices at the next depth level, making it perfect for finding shortest paths in unweighted graphs.'
      },
      {
        id: 'algo-b-8',
        text: 'What is the purpose of a sentinel node in a linked list?',
        options: [
          'To store data',
          'To mark the middle of the list',
          'To simplify edge cases',
          'To increase performance'
        ],
        correctAnswer: 'To simplify edge cases',
        explanation: 'A sentinel node serves as a dummy node that simplifies edge cases by ensuring the list is never empty and reducing special case handling.'
      },
      {
        id: 'algo-b-9',
        text: 'Which of these operations is NOT O(1) for a hash table with chaining?',
        options: [
          'Insertion',
          'Deletion',
          'Finding all elements',
          'Looking up an element'
        ],
        correctAnswer: 'Finding all elements',
        explanation: 'While most hash table operations are O(1), finding all elements requires traversing the entire structure, which is O(n).'
      },
      {
        id: 'algo-b-10',
        text: 'What is the main disadvantage of using recursion over iteration?',
        options: [
          'Code readability',
          'Stack overflow risk',
          'Time complexity',
          'Code maintainability'
        ],
        correctAnswer: 'Stack overflow risk',
        explanation: 'Recursive solutions can lead to stack overflow for large inputs due to the overhead of maintaining the call stack.'
      }
    ]
  },
  {
    id: 'algo-intermediate',
    title: 'Intermediate Algorithms',
    description: 'Challenge yourself with more complex algorithmic problems and optimization techniques.',
    difficulty: 'intermediate',
    timeLimit: 45,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'algorithms',
    questions: [
      {
        id: 'algo-i-1',
        text: 'What is the time complexity of the Floyd-Warshall algorithm for finding all-pairs shortest paths?',
        options: ['O(V²)', 'O(V³)', 'O(V × E)', 'O(V × log V)'],
        correctAnswer: 'O(V³)',
        explanation: 'Floyd-Warshall uses three nested loops over all vertices, resulting in a cubic time complexity.'
      },
      {
        id: 'algo-i-2',
        text: 'Which data structure would be most efficient for implementing a least recently used (LRU) cache?',
        options: [
          'Array',
          'Hash Map with Doubly Linked List',
          'Binary Search Tree',
          'Queue'
        ],
        correctAnswer: 'Hash Map with Doubly Linked List',
        explanation: 'This combination provides O(1) access time and efficient removal/insertion of elements.'
      },
      {
        id: 'algo-i-3',
        text: 'What is the space complexity of a recursive implementation of merge sort?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctAnswer: 'O(n)',
        explanation: 'Merge sort requires additional space proportional to the input size for merging arrays.'
      },
      {
        id: 'algo-i-4',
        text: 'Which algorithm would you use to find the minimum spanning tree of a weighted graph?',
        options: [
          'Depth-First Search',
          'Breadth-First Search',
          'Kruskal's Algorithm',
          'Floyd-Warshall'
        ],
        correctAnswer: 'Kruskal's Algorithm',
        explanation: 'Kruskal's Algorithm efficiently finds the minimum spanning tree by greedily selecting edges of minimum weight.'
      },
      {
        id: 'algo-i-5',
        text: 'What is the purpose of the Union-Find data structure?',
        options: [
          'Sorting elements',
          'Finding shortest paths',
          'Detecting cycles in graphs',
          'Managing disjoint sets'
        ],
        correctAnswer: 'Managing disjoint sets',
        explanation: 'Union-Find efficiently maintains disjoint sets and supports operations to merge sets and find set representatives.'
      },
      {
        id: 'algo-i-6',
        text: 'Which technique would you use to optimize a recursive solution with overlapping subproblems?',
        options: [
          'Greedy algorithm',
          'Dynamic programming',
          'Divide and conquer',
          'Backtracking'
        ],
        correctAnswer: 'Dynamic programming',
        explanation: 'Dynamic programming stores solutions to subproblems to avoid redundant calculations.'
      },
      {
        id: 'algo-i-7',
        text: 'What is the time complexity of building a heap from an array of n elements?',
        options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(n²)'],
        correctAnswer: 'O(n)',
        explanation: 'While inserting one element takes O(log n), building a heap from bottom-up takes linear time.'
      },
      {
        id: 'algo-i-8',
        text: 'Which data structure would you use to efficiently find the k-th largest element in a stream?',
        options: [
          'Array',
          'Min Heap',
          'Max Heap',
          'Binary Search Tree'
        ],
        correctAnswer: 'Min Heap',
        explanation: 'A min heap of size k can maintain the k largest elements, with the k-th largest at the root.'
      },
      {
        id: 'algo-i-9',
        text: 'What is the primary advantage of using a B-tree over a binary search tree?',
        options: [
          'Simpler implementation',
          'Better cache performance',
          'Lower space complexity',
          'Faster single-element access'
        ],
        correctAnswer: 'Better cache performance',
        explanation: 'B-trees are designed to minimize disk I/O and provide better cache performance through their multi-way branching structure.'
      },
      {
        id: 'algo-i-10',
        text: 'Which algorithm would you use to find strongly connected components in a directed graph?',
        options: [
          'Breadth-First Search',
          'Kosaraju's Algorithm',
          'Prim's Algorithm',
          'Bellman-Ford'
        ],
        correctAnswer: 'Kosaraju's Algorithm',
        explanation: 'Kosaraju's Algorithm efficiently finds strongly connected components using two DFS passes.'
      }
    ]
  },
  {
    id: 'algo-advanced',
    title: 'Advanced Algorithm Concepts',
    description: 'Master complex algorithmic problems and advanced optimization techniques.',
    difficulty: 'advanced',
    timeLimit: 60,
    totalQuestions: 10,
    category: 'technical',
    subcategory: 'algorithms',
    questions: [
      {
        id: 'algo-a-1',
        text: 'What is the time complexity of finding the maximum flow in a network using the Ford-Fulkerson algorithm?',
        options: [
          'O(VE)',
          'O(E × max flow)',
          'O(V²E)',
          'O(VE²)'
        ],
        correctAnswer: 'O(E × max flow)',
        explanation: 'Ford-Fulkerson's runtime depends on the maximum flow value and the number of edges.'
      },
      {
        id: 'algo-a-2',
        text: 'Which data structure would you use to implement a persistent binary search tree?',
        options: [
          'Path copying',
          'Fat nodes',
          'Both A and B',
          'Regular BST with timestamps'
        ],
        correctAnswer: 'Both A and B',
        explanation: 'Both path copying and fat nodes are valid techniques for implementing persistent data structures.'
      },
      {
        id: 'algo-a-3',
        text: 'What is the space complexity of the Aho-Corasick algorithm for pattern matching?',
        options: [
          'O(m)',
          'O(m × Σ)',
          'O(n)',
          'O(n + m)'
        ],
        correctAnswer: 'O(m × Σ)',
        explanation: 'The automaton requires space proportional to the pattern length (m) and alphabet size (Σ).'
      },
      {
        id: 'algo-a-4',
        text: 'Which technique would you use to maintain order statistics in a BST with O(log n) operations?',
        options: [
          'AVL tree',
          'Red-black tree with size augmentation',
          'B-tree',
          'Splay tree'
        ],
        correctAnswer: 'Red-black tree with size augmentation',
        explanation: 'Augmenting a red-black tree with size information allows efficient order statistic operations.'
      },
      {
        id: 'algo-a-5',
        text: 'What is the primary advantage of using a Skip List over a balanced BST?',
        options: [
          'Lower space complexity',
          'Simpler implementation',
          'Better worst-case guarantees',
          'More cache-friendly'
        ],
        correctAnswer: 'Simpler implementation',
        explanation: 'Skip Lists provide similar average-case performance with much simpler implementation and maintenance.'
      },
      {
        id: 'algo-a-6',
        text: 'Which algorithm would you use to find the maximum matching in a bipartite graph?',
        options: [
          'Hopcroft-Karp',
          'Ford-Fulkerson',
          'Hungarian algorithm',
          'Any of the above'
        ],
        correctAnswer: 'Any of the above',
        explanation: 'All these algorithms can find maximum matching in bipartite graphs, though with different complexities.'
      },
      {
        id: 'algo-a-7',
        text: 'What is the time complexity of computing the Lowest Common Ancestor (LCA) using the Tarjan's offline algorithm?',
        options: [
          'O(n)',
          'O(n + q)',
          'O(n log n)',
          'O(q log n)'
        ],
        correctAnswer: 'O(n + q)',
        explanation: 'Tarjan's offline algorithm processes all queries in O(n + q) time using Union-Find.'
      },
      {
        id: 'algo-a-8',
        text: 'Which data structure would you use to implement a range-update range-query operation efficiently?',
        options: [
          'Segment Tree',
          'Fenwick Tree',
          'Lazy Segment Tree',
          'Binary Indexed Tree'
        ],
        correctAnswer: 'Lazy Segment Tree',
        explanation: 'Lazy Segment Tree supports range updates and queries with O(log n) complexity through lazy propagation.'
      },
      {
        id: 'algo-a-9',
        text: 'What is the space complexity of storing all shortest paths in a dense graph using Johnson's algorithm?',
        options: [
          'O(V)',
          'O(E)',
          'O(V²)',
          'O(VE)'
        ],
        correctAnswer: 'O(V²)',
        explanation: 'Storing all pairs shortest paths requires quadratic space regardless of the algorithm used.'
      },
      {
        id: 'algo-a-10',
        text: 'Which technique would you use to maintain dynamic connectivity in a graph with O(log n) operations?',
        options: [
          'Union-Find',
          'Link-Cut Trees',
          'Euler Tour Trees',
          'Both B and C'
        ],
        correctAnswer: 'Both B and C',
        explanation: 'Both Link-Cut Trees and Euler Tour Trees can maintain dynamic connectivity efficiently.'
      }
    ]
  }
];
