'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export function ProjectsForm() {
  const { state, dispatch } = useResume()
  const [highlights, setHighlights] = useState<string>('')
  const [technologies, setTechnologies] = useState<string>('')

  const handleAddProject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        name: formData.get('projectName') as string,
        description: formData.get('description') as string,
        link: formData.get('projectLink') as string,
        highlights: highlights.split('\n').filter(h => h.trim()),
        technologies: technologies.split(',').map(t => t.trim()).filter(Boolean),
      },
    })
    
    e.currentTarget.reset()
    setHighlights('')
    setTechnologies('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddProject} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input id="projectName" name="projectName" required placeholder="AI-powered Resume Builder" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              required
              placeholder="A web application that helps job seekers create professional resumes..."
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectLink">Project Link (Optional)</Label>
            <Input id="projectLink" name="projectLink" placeholder="https://github.com/yourusername/project" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="highlights">Key Highlights</Label>
            <Textarea
              id="highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="• Implemented machine learning algorithms for resume analysis&#10;• Achieved 95% user satisfaction rate&#10;• Reduced resume creation time by 50%"
              className="min-h-[100px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <Input
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Node.js, TensorFlow, AWS"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          {state.projects.map((project, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">{project.description}</p>
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        View Project
                      </a>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'REMOVE_PROJECT', payload: index })}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

