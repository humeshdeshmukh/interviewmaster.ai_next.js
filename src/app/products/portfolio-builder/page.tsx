"use client"
import React, { useState } from 'react';

const PortfolioBuilderPage = () => {
  // State to store user input
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');
  const [contact, setContact] = useState('');
  
  // State to store the generated portfolio data
  const [portfolio, setPortfolio] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here, generate the portfolio content based on the input data
    const generatedPortfolio = `
      <h1>${name}'s Portfolio</h1>
      <h3>Bio:</h3>
      <p>${bio}</p>
      <h3>Skills:</h3>
      <ul>
        ${skills.split(',').map((skill, index) => `<li key="${index}">${skill.trim()}</li>`).join('')}
      </ul>
      <h3>Contact Information:</h3>
      <p>${contact}</p>
    `;
    
    setPortfolio(generatedPortfolio);
  };

  // Download portfolio as HTML file
  const downloadPortfolio = () => {
    if (portfolio) {
      const blob = new Blob([portfolio], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${name}_Portfolio.html`;
      link.click();
    }
  };

  return (
    <div className="portfolio-builder-container" style={{ padding: '20px' }}>
      <h1>Portfolio Builder</h1>
      
      {/* Portfolio Builder Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio"
            required
            style={{ padding: '8px', width: '100%', height: '100px' }}
          />
        </div>

        <div>
          <label htmlFor="skills">Skills (comma-separated):</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. JavaScript, React, CSS"
            required
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <div>
          <label htmlFor="contact">Contact Info:</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Email or Phone"
            required
            style={{ padding: '8px', width: '100%' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer' }}>
          Generate Portfolio
        </button>
      </form>

      {/* Displaying the generated portfolio */}
      {portfolio && (
        <div>
          <h2>Your Generated Portfolio:</h2>
          <div dangerouslySetInnerHTML={{ __html: portfolio }} />
          <button
            onClick={downloadPortfolio}
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Download Portfolio
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioBuilderPage;
