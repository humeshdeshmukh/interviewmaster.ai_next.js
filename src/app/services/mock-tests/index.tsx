import React, { useState } from 'react';

interface MockTest {
  id: number;
  title: string;
  description: string;
  duration: number; // in minutes
}

const mockTestsPage = () => {
  // Sample mock tests data
  const mockTests: MockTest[] = [
    { id: 1, title: 'Coding Fundamentals', description: 'Test your basic coding skills with algorithms and data structures.', duration: 30 },
    { id: 2, title: 'JavaScript Proficiency', description: 'Evaluate your understanding of JavaScript concepts and syntax.', duration: 45 },
    { id: 3, title: 'React Mastery', description: 'Challenge your knowledge in React, including hooks, components, and state management.', duration: 60 },
  ];

  // State to manage the selected test
  const [selectedTest, setSelectedTest] = useState<MockTest | null>(null);

  const handleTestSelection = (test: MockTest) => {
    setSelectedTest(test);
  };

  const handleTestStart = () => {
    if (selectedTest) {
      // This is where you can route to the test or start it (e.g., navigating to a test page)
      alert(`Starting the test: ${selectedTest.title}`);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Mock Tests</h1>
      <p>Welcome to the mock tests page. Choose a test to start your practice!</p>

      <div style={{ marginTop: '20px' }}>
        <h2>Available Mock Tests</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {mockTests.map((test) => (
            <div
              key={test.id}
              style={{
                padding: '15px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: selectedTest?.id === test.id ? '#e0f7fa' : '#fff',
                cursor: 'pointer',
              }}
              onClick={() => handleTestSelection(test)}
            >
              <h3>{test.title}</h3>
              <p>{test.description}</p>
              <p>Duration: {test.duration} minutes</p>
            </div>
          ))}
        </div>
      </div>

      {selectedTest && (
        <div style={{ marginTop: '20px' }}>
          <h3>Selected Test: {selectedTest.title}</h3>
          <button
            onClick={handleTestStart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Start Test
          </button>
        </div>
      )}
    </div>
  );
};

export default mockTestsPage;
