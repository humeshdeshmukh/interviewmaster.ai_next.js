import { Question } from '../../types';

export const algorithmQuestions: Question[] = [
  {
    id: 5001,
    title: 'Implement a Binary Search Algorithm',
    description: 'Explain and implement binary search algorithm.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `Binary Search is an efficient algorithm for searching a sorted array by repeatedly dividing the search interval in half.

Time Complexity: O(log n)
Space Complexity: O(1)

Implementation:
\`\`\`typescript
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Example usage:
const arr = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(arr, 7)); // Output: 3
console.log(binarySearch(arr, 10)); // Output: -1
\`\`\`

Key Points:
1. Array must be sorted
2. Each iteration halves the search space
3. More efficient than linear search for large datasets
4. Commonly used in real-world applications

Common Pitfalls:
1. Using on unsorted array
2. Integer overflow in mid calculation
3. Off-by-one errors in boundary conditions`
  },
  {
    id: 5002,
    title: 'Implement Merge Sort',
    description: 'Explain and implement the merge sort algorithm.',
    category: 'Tech',
    company: 'Amazon',
    isBookmarked: false,
    details: `Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.

Time Complexity: O(n log n)
Space Complexity: O(n)

Implementation:
\`\`\`typescript
function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  return merge(mergeSort(left), mergeSort(right));
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

// Example usage:
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(mergeSort(arr));
// Output: [11, 12, 22, 25, 34, 64, 90]
\`\`\`

Key Features:
1. Stable sorting algorithm
2. Guaranteed O(n log n) performance
3. Parallelizable
4. Works well with linked lists

Use Cases:
1. External sorting
2. Custom sort requirements
3. When stable sort is required
4. Sorting linked lists`
  },
  {
    id: 5003,
    title: 'Graph DFS and BFS',
    description: 'Implement and explain Depth-First Search and Breadth-First Search algorithms.',
    category: 'Tech',
    company: 'Microsoft',
    isBookmarked: false,
    details: `Graph traversal algorithms are fundamental for solving many complex problems.

1. Depth-First Search (DFS):
\`\`\`typescript
class Graph {
  private adjacencyList: Map<number, number[]>;

  constructor() {
    this.adjacencyList = new Map();
  }

  addVertex(vertex: number) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }

  addEdge(vertex1: number, vertex2: number) {
    this.adjacencyList.get(vertex1)?.push(vertex2);
    this.adjacencyList.get(vertex2)?.push(vertex1);
  }

  dfs(start: number): number[] {
    const visited = new Set<number>();
    const result: number[] = [];

    const dfsHelper = (vertex: number) => {
      visited.add(vertex);
      result.push(vertex);

      this.adjacencyList.get(vertex)?.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          dfsHelper(neighbor);
        }
      });
    };

    dfsHelper(start);
    return result;
  }

  bfs(start: number): number[] {
    const visited = new Set<number>();
    const queue: number[] = [start];
    const result: number[] = [];

    visited.add(start);

    while (queue.length) {
      const vertex = queue.shift()!;
      result.push(vertex);

      this.adjacencyList.get(vertex)?.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }

    return result;
  }
}

// Example usage:
const graph = new Graph();
[0, 1, 2, 3, 4].forEach(v => graph.addVertex(v));
graph.addEdge(0, 1);
graph.addEdge(0, 2);
graph.addEdge(1, 3);
graph.addEdge(2, 4);

console.log(graph.dfs(0)); // [0, 1, 3, 2, 4]
console.log(graph.bfs(0)); // [0, 1, 2, 3, 4]
\`\`\`

Comparison:
1. DFS
   - Uses stack (recursive or explicit)
   - Goes deep before wide
   - Good for:
     * Path finding
     * Topological sorting
     * Cycle detection

2. BFS
   - Uses queue
   - Explores level by level
   - Good for:
     * Shortest path
     * Level-order traversal
     * Network broadcasting

Time Complexity: O(V + E)
Space Complexity: O(V)
where V is vertices and E is edges`
  }
];
