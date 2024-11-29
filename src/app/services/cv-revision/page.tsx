"use client"
import React, { useState } from 'react';

const CvRevisionPage = () => {
  // State to handle file upload and user feedback
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCvFile(e.target.files[0]);
    }
  };

  // Handle feedback change
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission (in real use, send data to backend)
    console.log('CV file:', cvFile);
    console.log('Feedback:', feedback);

    // Reset form after submission
    setCvFile(null);
    setFeedback('');
    setIsSubmitted(true);
  };

  return (
    <div className="cv-revision-container" style={{ padding: '20px' }}>
      <h1>CV Revision</h1>
      <p>Welcome to the CV revision page. Please upload your CV and provide any feedback for revision.</p>

      {/* Form for CV upload and feedback */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <div>
            <label htmlFor="cvUpload">Upload your CV (PDF, DOCX, etc.):</label>
            <input
              type="file"
              id="cvUpload"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              required
              style={{ padding: '8px', width: '100%' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="feedback">Provide your feedback for revision:</label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Enter your feedback or revision requests here"
              required
              style={{ padding: '8px', width: '100%', height: '100px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              marginTop: '20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Submit Revision Request
          </button>
        </form>
      ) : (
        <div>
          <h2>Thank you for your submission!</h2>
          <p>Your CV revision request has been submitted. Our team will review your CV and feedback shortly.</p>
        </div>
      )}
    </div>
  );
};

export default CvRevisionPage;
