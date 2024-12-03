'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export function ExperienceForm() {
  const { state, dispatch } = useResume()
  const [highlights, setHighlights] = useState<string>('')
  const [technologies, setTechnologies] = useState<string>('')

  const handleAddExperience = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        company: formData.get('company') as string,
        position: formData.get('position') as string,
        location: formData.get('location') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        current: formData.get('current') === 'true',
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
        <CardTitle>Professional Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddExperience} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required placeholder="FAANG Company" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input id="position" name="position" required placeholder="Senior Software Engineer" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" required placeholder="San Francisco, CA" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="highlights">Key Achievements</Label>
            <Textarea
              id="highlights"
              value={highlights}
              onChange={(e) => setHighlights(e.target.value)}
              placeholder="• Developed scalable microservices architecture&#10;• Improved system performance by 40%&#10;• Led team of 5 engineers"
              className="min-h-[150px]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <Input
              id="technologies"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
              placeholder="React, Node.js, AWS, TypeScript"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Experience
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          {state.experience.map((exp, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} - {exp.endDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'REMOVE_EXPERIENCE', payload: index })}
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

