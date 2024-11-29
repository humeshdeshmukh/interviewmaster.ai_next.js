'use client';  // This marks the component as a Client Component

import React, { useState } from 'react';

const aiFeedbackPage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Simulate AI feedback (You can replace this with an API call)
  const getAIResponse = async (input: string) => {
    setLoading(true);
    setFeedback(''); // Clear previous feedback

    try {
      // Simulate a call to an API (e.g., OpenAI GPT) to get feedback
      // You can replace this with an actual API call
      const simulatedResponse = `AI feedback for: "${input}" will be shown here.`;
      setTimeout(() => {
        setFeedback(simulatedResponse);
        setLoading(false);
      }, 1000); // Simulate delay (API call)
    } catch (error) {
      setFeedback('Error getting feedback from AI.');
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim()) {
      getAIResponse(userInput);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>AI Feedback Page</h1>

      {/* User Input */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="userInput" style={{ marginBottom: '8px', fontWeight: 'bold' }}>
          Ask a Question:
        </label>
        <textarea
          id="userInput"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          rows={4}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            marginBottom: '20px',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s',
          }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get AI Feedback'}
        </button>
      </form>

      {/* AI Feedback */}
      {feedback && (
        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px', border: '1px solid #ccc' }}>
          <h3 style={{ fontWeight: 'bold' }}>AI Feedback:</h3>
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default aiFeedbackPage;
