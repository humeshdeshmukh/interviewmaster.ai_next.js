"use client";

import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCheckCircle } from "react-icons/fa";

const ResumeBuilderPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    summary: "",
    experience: [{ company: "", role: "", description: "", duration: "" }],
    education: [{ institution: "", degree: "", year: "" }],
    skills: [""],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index?: number, field?: string) => {
    const { name, value } = e.target;

    if (index !== undefined && field) {
      const section = formData[name as keyof typeof formData] as any[];
      section[index][field] = value;
      setFormData({ ...formData, [name]: section });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addField = (section: string) => {
    const updatedSection = [...(formData[section as keyof typeof formData] as any[])];
    updatedSection.push(section === "skills" ? "" : {});
    setFormData({ ...formData, [section]: updatedSection });
  };

  const removeField = (section: string, index: number) => {
    const updatedSection = [...(formData[section as keyof typeof formData] as any[])];
    updatedSection.splice(index, 1);
    setFormData({ ...formData, [section]: updatedSection });
  };

  const downloadResume = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    // Header
    doc.setFontSize(22);
    doc.text(formData.fullName || "Your Name", 105, 20, { align: "center" });

    // Contact Details
    doc.setFontSize(12);
    doc.text(`${formData.email || "Email"} | ${formData.phone || "Phone"} | ${formData.address || "Address"}`, 105, 30, { align: "center" });

    // Summary
    if (formData.summary) {
      doc.setFontSize(16);
      doc.text("Summary", 10, 40);
      doc.setFontSize(12);
      doc.text(doc.splitTextToSize(formData.summary, 180), 10, 50);
    }

    // Experience
    if (formData.experience.some((exp) => exp.company)) {
      doc.setFontSize(16);
      doc.text("Experience", 10, 70);
      let y = 80;
      formData.experience.forEach((exp) => {
        if (exp.company) {
          doc.setFontSize(14);
          doc.text(`${exp.role || "Role"} at ${exp.company || "Company"} (${exp.duration || "Duration"})`, 10, y);
          doc.setFontSize(12);
          doc.text(doc.splitTextToSize(exp.description || "Description", 180), 10, y + 6);
          y += 20;
        }
      });
    }

    // Education
    if (formData.education.some((edu) => edu.institution)) {
      doc.setFontSize(16);
      doc.text("Education", 10, 110);
      let y = 120;
      formData.education.forEach((edu) => {
        if (edu.institution) {
          doc.setFontSize(14);
          doc.text(`${edu.degree || "Degree"}, ${edu.institution || "Institution"} (${edu.year || "Year"})`, 10, y);
          y += 10;
        }
      });
    }

    // Skills
    if (formData.skills.some((skill) => skill)) {
      doc.setFontSize(16);
      doc.text("Skills", 10, 140);
      doc.setFontSize(12);
      let skillsText = formData.skills.filter((skill) => skill).join(", ");
      doc.text(doc.splitTextToSize(skillsText || "Skills", 180), 10, 150);
    }

    doc.save(`${formData.fullName || "resume"}.pdf`);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Resume Builder</h1>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        {/* Input Section */}
        <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
          <h2>Basic Information</h2>
          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleInputChange}
            style={inputStyle}
          />
          <textarea
            name="summary"
            placeholder="Professional Summary"
            value={formData.summary}
            onChange={handleInputChange}
            style={{ ...inputStyle, height: "100px" }}
          />

          {/* Experience */}
          <h2>Experience</h2>
          {formData.experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                name="experience"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => handleInputChange(e, index, "company")}
                style={inputStyle}
              />
              <input
                name="experience"
                placeholder="Role"
                value={exp.role}
                onChange={(e) => handleInputChange(e, index, "role")}
                style={inputStyle}
              />
              <textarea
                name="experience"
                placeholder="Description"
                value={exp.description}
                onChange={(e) => handleInputChange(e, index, "description")}
                style={{ ...inputStyle, height: "80px" }}
              />
              <input
                name="experience"
                placeholder="Duration"
                value={exp.duration}
                onChange={(e) => handleInputChange(e, index, "duration")}
                style={inputStyle}
              />
              <button onClick={() => removeField("experience", index)} style={buttonStyle("red")}>
                Remove Experience
              </button>
            </div>
          ))}
          <button onClick={() => addField("experience")} style={buttonStyle("green")}>
            Add Experience
          </button>

          {/* Education */}
          <h2>Education</h2>
          {formData.education.map((edu, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                name="education"
                placeholder="Institution"
                value={edu.institution}
                onChange={(e) => handleInputChange(e, index, "institution")}
                style={inputStyle}
              />
              <input
                name="education"
                placeholder="Degree"
                value={edu.degree}
                onChange={(e) => handleInputChange(e, index, "degree")}
                style={inputStyle}
              />
              <input
                name="education"
                placeholder="Year"
                value={edu.year}
                onChange={(e) => handleInputChange(e, index, "year")}
                style={inputStyle}
              />
              <button onClick={() => removeField("education", index)} style={buttonStyle("red")}>
                Remove Education
              </button>
            </div>
          ))}
          <button onClick={() => addField("education")} style={buttonStyle("green")}>
            Add Education
          </button>

          {/* Skills */}
          <h2>Skills</h2>
          {formData.skills.map((skill, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <input
                name="skills"
                placeholder="Skill"
                value={skill}
                onChange={(e) => handleInputChange(e, index)}
                style={inputStyle}
              />
              <button onClick={() => removeField("skills", index)} style={buttonStyle("red")}>
                Remove Skill
              </button>
            </div>
          ))}
          <button onClick={() => addField("skills")} style={buttonStyle("green")}>
            Add Skill
          </button>
        </div>

        {/* Resume Preview */}
        <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px", borderRadius: "5px" }}>
          <h2>Resume Preview</h2>
          <p>
            <strong>Name:</strong> {formData.fullName || "Your Name"}
          </p>
          <p>
            <strong>Email:</strong> {formData.email || "Email"}
          </p>
          <p>
            <strong>Phone:</strong> {formData.phone || "Phone"}
          </p>
          <p>
            <strong>Address:</strong> {formData.address || "Address"}
          </p>
          <h3>Summary</h3>
          <p>{formData.summary || "Summary"}</p>
          <h3>Experience</h3>
          <ul>
            {formData.experience.map((exp, index) => (
              <li key={index}>
                <strong>{exp.role || "Role"}</strong> at <strong>{exp.company || "Company"}</strong>{" "}
                ({exp.duration || "Duration"})
                <p>{exp.description || "Description"}</p>
              </li>
            ))}
          </ul>
          <h3>Education</h3>
          <ul>
            {formData.education.map((edu, index) => (
              <li key={index}>
                <strong>{edu.degree || "Degree"}</strong>, {edu.institution || "Institution"} ({edu.year || "Year"})
              </li>
            ))}
          </ul>
          <h3>Skills</h3>
          <ul>
            {formData.skills.map((skill, index) => (
              <li key={index}>{skill || "Skill"}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Download Button */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={downloadResume} style={buttonStyle("blue")}>
          Download Resume
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const buttonStyle = (color: string) => ({
  padding: "10px 20px",
  backgroundColor: color,
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  marginRight: "10px",
});

export default ResumeBuilderPage;
