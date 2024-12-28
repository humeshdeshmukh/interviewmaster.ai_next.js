import { Question } from '../../types';

export const frontendQuestions: Question[] = [
  {
    id: 1001,
    title: 'Explain React Virtual DOM',
    description: 'Understand the concept of Virtual DOM in React and its benefits.',
    category: 'Tech',
    company: 'Facebook',
    isBookmarked: false,
    details: `The Virtual DOM is a programming concept where an ideal, or "virtual", representation of a UI is kept in memory and synced with the "real" DOM by a library such as ReactDOM.

Key Points:
1. Virtual DOM is a lightweight copy of the actual DOM
2. React uses a diffing algorithm to compare Virtual DOM with real DOM
3. Only necessary updates are made to the real DOM
4. This process is called Reconciliation

Example:
\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

When state changes, React:
1. Creates new Virtual DOM tree
2. Compares with previous Virtual DOM
3. Calculates minimal changes needed
4. Updates only changed elements in real DOM`
  },
  {
    id: 1002,
    title: 'CSS Box Model',
    description: 'Explain the CSS Box Model and its components.',
    category: 'Tech',
    company: 'Google',
    isBookmarked: false,
    details: `The CSS Box Model is a fundamental concept that describes how elements are rendered in web pages.

Components:
1. Content - The actual content of the element
2. Padding - Clear space around the content
3. Border - A border around the padding
4. Margin - Clear space outside the border

Example:
\`\`\`css
.box {
  /* Content */
  width: 300px;
  height: 200px;
  
  /* Padding */
  padding: 20px;
  
  /* Border */
  border: 2px solid black;
  
  /* Margin */
  margin: 10px;
}
\`\`\`

Total width calculation:
width + left padding + right padding + left border + right border + left margin + right margin

Box-sizing:
\`\`\`css
/* Makes width/height include padding and border */
* {
  box-sizing: border-box;
}
\`\`\``
  }
  // Add more frontend questions here
];
