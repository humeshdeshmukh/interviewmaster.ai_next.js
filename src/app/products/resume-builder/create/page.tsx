"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import styles from './CreateResume.module.css'; // Import the custom CSS module

export default function CreateResume() {
  const [resumeData, setResumeData] = useState({
    name: "",
    title: "",
    summary: "",
    experience: [],
    skills: "",
    education: "",
    projects: "",
    contact: "",
    socialLinks: "",
  });

  const [experiences, setExperiences] = useState([{ company: "", role: "", duration: "", description: "" }]);
  const [projects, setProjects] = useState([{ title: "", description: "" }]);

  const handleInputChange = (field: string, value: string) => {
    setResumeData((prev) => ({ ...prev, [field]: value }));
  };

  const handleExperienceChange = (index: number, field: string, value: string) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const handleProjectChange = (index: number, field: string, value: string) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  // Function to generate and download PDF
  const downloadResume = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text(resumeData.name, 20, 20);
    doc.setFontSize(18);
    doc.text(resumeData.title, 20, 30);

    doc.setFontSize(14);
    doc.text(resumeData.summary, 20, 40);

    doc.setFontSize(16);
    doc.text("Work Experience", 20, 60);

    experiences.forEach((exp, index) => {
      doc.setFontSize(12);
      doc.text(`${exp.company} - ${exp.role} (${exp.duration})`, 20, 70 + (index * 20));
      doc.text(exp.description, 20, 80 + (index * 20));
    });

    doc.setFontSize(16);
    doc.text("Skills", 20, 100 + (experiences.length * 20));
    doc.setFontSize(12);
    doc.text(resumeData.skills, 20, 110 + (experiences.length * 20));

    doc.setFontSize(16);
    doc.text("Projects", 20, 130 + (experiences.length * 20));
    projects.forEach((proj, index) => {
      doc.setFontSize(12);
      doc.text(`${proj.title}`, 20, 140 + (index * 20) + (experiences.length * 20));
      doc.text(proj.description, 20, 150 + (index * 20) + (experiences.length * 20));
    });

    doc.save("resume.pdf");
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.formSection}
        initial={{ x: -200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className={styles.title}>Create Your Resume</h1>

        {/* Basic Information */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Name</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Your Full Name"
            value={resumeData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Job Title</label>
          <input
            type="text"
            className={styles.input}
            placeholder="E.g., Software Engineer"
            value={resumeData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Summary</label>
          <textarea
            className={styles.input}
            rows={3}
            placeholder="A brief summary about you"
            value={resumeData.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
          />
        </div>

        {/* Experience */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Work Experience</h2>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.card}>
              <input
                type="text"
                className={styles.input}
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Role/Position"
                value={exp.role}
                onChange={(e) => handleExperienceChange(index, "role", e.target.value)}
              />
              <input
                type="text"
                className={styles.input}
                placeholder="Duration (e.g., Jan 2020 - Dec 2023)"
                value={exp.duration}
                onChange={(e) => handleExperienceChange(index, "duration", e.target.value)}
              />
              <textarea
                className={styles.input}
                rows={2}
                placeholder="Description of your responsibilities"
                value={exp.description}
                onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
              />
            </div>
          ))}
          <button
            className={styles.button}
            onClick={() => setExperiences([...experiences, { company: "", role: "", duration: "", description: "" }])}
          >
            Add More Experience
          </button>
        </div>

        {/* Skills */}
        <div className={styles.inputGroup}>
          <label className={styles.label}>Skills</label>
          <textarea
            className={styles.input}
            rows={3}
            placeholder="E.g., JavaScript, React, Python"
            value={resumeData.skills}
            onChange={(e) => handleInputChange("skills", e.target.value)}
          />
        </div>

        {/* Projects */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Projects</h2>
          {projects.map((proj, index) => (
            <div key={index} className={styles.card}>
              <input
                type="text"
                className={styles.input}
                placeholder="Project Title"
                value={proj.title}
                onChange={(e) => handleProjectChange(index, "title", e.target.value)}
              />
              <textarea
                className={styles.input}
                rows={2}
                placeholder="Description of the project"
                value={proj.description}
                onChange={(e) => handleProjectChange(index, "description", e.target.value)}
              />
            </div>
          ))}
          <button
            className={styles.button}
            onClick={() => setProjects([...projects, { title: "", description: "" }])}
          >
            Add More Projects
          </button>
        </div>

        {/* Download Button */}
        <button className={styles.downloadButton} onClick={downloadResume}>
          Download Resume
        </button>
      </motion.div>

      {/* Right Section: Live Resume Preview */}
      <motion.div
        className={styles.previewSection}
        initial={{ x: 200, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className={styles.title}>Live Resume Preview</h2>
        <div className={styles.previewCard}>
          <h1 className={styles.name}>{resumeData.name}</h1>
          <h2 className={styles.titlePreview}>{resumeData.title}</h2>
          <p className={styles.summary}>{resumeData.summary}</p>

          <h3 className={styles.sectionTitle}>Work Experience</h3>
          {experiences.map((exp, index) => (
            <div key={index} className={styles.experience}>
              <h4 className={styles.company}>{exp.company}</h4>
              <p className={styles.role}>{exp.role} | {exp.duration}</p>
              <p className={styles.description}>{exp.description}</p>
            </div>
          ))}

          <h3 className={styles.sectionTitle}>Skills</h3>
          <p>{resumeData.skills}</p>

          <h3 className={styles.sectionTitle}>Projects</h3>
          {projects.map((proj, index) => (
            <div key={index} className={styles.project}>
              <h4 className={styles.projectTitle}>{proj.title}</h4>
              <p className={styles.projectDescription}>{proj.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
