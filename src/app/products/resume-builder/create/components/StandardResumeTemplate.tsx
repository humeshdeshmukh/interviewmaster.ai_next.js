'use client'

import { useResume } from '../context/ResumeContext'
import { Badge } from '@/components/ui/badge'

export function StandardResumeTemplate() {
  const { state } = useResume()

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      <header className="border-b-2 border-gray-300 pb-4 mb-4">
        <h1 className="text-3xl font-bold text-gray-800">
          {state.personalInfo.firstName} {state.personalInfo.lastName}
        </h1>
        <p className="text-lg text-gray-600">{state.personalInfo.title}</p>
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
          <span>{state.personalInfo.email}</span>
          <span>{state.personalInfo.phone}</span>
          <span>{state.personalInfo.location}</span>
          {state.personalInfo.linkedin && (
            <a href={state.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
          )}
          {state.personalInfo.github && (
            <a href={state.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
          )}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Professional Summary</h2>
        <p className="text-gray-700">{state.summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
        {state.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">{exp.position}</h3>
            <p className="text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate}</p>
            <ul className="list-disc list-inside mt-2 text-gray-700">
              {exp.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
        {state.education.map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-lg font-medium text-gray-800">{edu.degree} in {edu.field}</h3>
            <p className="text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
            {edu.gpa && <p className="text-gray-700">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {state.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {skill.name}
            </Badge>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Projects</h2>
        {state.projects.map((project, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
            <p className="text-gray-700">{project.description}</p>
            <p className="text-gray-600 mt-1">
              <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
            </p>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h2>
        {state.certifications.map((cert, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-lg font-medium text-gray-800">{cert.name}</h3>
            <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Achievements</h2>
        <ul className="list-disc list-inside text-gray-700">
          {state.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </section>
    </div>
  )
}

