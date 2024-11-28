import React, { useState } from 'react';

const salaryNegotiationPage = () => {
  const [showTips, setShowTips] = useState(false);

  const tips = [
    "Do your research: Understand the typical salary range for your position and experience.",
    "Know your worth: Highlight your skills, experience, and the value you bring to the company.",
    "Be prepared to negotiate: Be ready with clear and reasonable expectations.",
    "Understand the full compensation package: Don't just focus on salary; consider bonuses, benefits, and stock options.",
    "Be confident but flexible: Approach negotiations with confidence, but be open to discussions."
  ];

  const handleToggleTips = () => {
    setShowTips((prevState) => !prevState);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Salary Negotiation Guide</h1>
      <p>Welcome to the salary negotiation page! Here are some tips to help you successfully negotiate your salary during job offers and reviews.</p>

      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleToggleTips}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {showTips ? "Hide Tips" : "Show Salary Negotiation Tips"}
        </button>
      </div>

      {showTips && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
          <h3>Top Salary Negotiation Tips</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
            {tips.map((tip, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h2>Salary Negotiation Simulator</h2>
        <p>Use the salary negotiation simulator below to practice your negotiation skills in different scenarios.</p>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => alert("Simulate Salary Negotiation - (Feature Coming Soon)")}>
          Start Salary Negotiation Simulation
        </button>
      </div>
    </div>
  );
};

export default salaryNegotiationPage;
