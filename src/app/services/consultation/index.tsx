import React, { useState } from 'react';

const ConsultationPage = () => {
  // State to handle form input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulating a form submission
    console.log({
      name,
      email,
      message,
      appointmentDate,
    });

    // Reset form after submission
    setName('');
    setEmail('');
    setMessage('');
    setAppointmentDate('');
    setIsSubmitted(true);
  };

  return (
    <div className="consultation-container" style={{ padding: '20px' }}>
      <h1>Consultation</h1>
      <p>Welcome to the consultation page. Please fill in the details below to schedule your consultation.</p>

      {/* Form for consultation */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
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

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{ padding: '8px', width: '100%' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message or reason for consultation"
              required
              style={{ padding: '8px', width: '100%', height: '100px' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="appointmentDate">Preferred Appointment Date:</label>
            <input
              type="date"
              id="appointmentDate"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              required
              style={{ padding: '8px', width: '100%' }}
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
            Schedule Consultation
          </button>
        </form>
      ) : (
        <div>
          <h2>Thank you for your request!</h2>
          <p>Your consultation request has been submitted. We will get back to you shortly.</p>
        </div>
      )}
    </div>
  );
};

export default ConsultationPage;
