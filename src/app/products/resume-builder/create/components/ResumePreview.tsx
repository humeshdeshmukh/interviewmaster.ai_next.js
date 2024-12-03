'use client'

import { useResume } from '../context/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function ResumePreview() {
  const { state } = useResume()

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {state.personalInfo.firstName} {state.personalInfo.lastName}
        </CardTitle>
        <div className="text-sm text-muted-foreground">
          {state.personalInfo.email} | {state.personalInfo.phone} | {state.personalInfo.location}
        </div>
        {state.personalInfo.linkedin && (
          <a href={state.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
            LinkedIn
          </a>
        )}
        {state.personalInfo.github && (
          <a href={state.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline ml-4">
            GitHub
          </a>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
          <p className="text-sm">{state.summary}</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          {state.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{exp.position}</h3>
              <div className="text-sm text-muted-foreground">{exp.company} | {exp.startDate} - {exp.endDate}</div>
              <ul className="list-disc list-inside text-sm mt-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          {state.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
              <div className="text-sm text-muted-foreground">{edu.institution} | {edu.startDate} - {edu.endDate}</div>
              {edu.gpa && <div className="text-sm">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill, index) => (
              <Badge key={index} variant="secondary">{skill.name}</Badge>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          {state.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-medium">{project.name}</h3>
              <p className="text-sm">{project.description}</p>
              <div className="text-sm mt-1">
                <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  )
}

