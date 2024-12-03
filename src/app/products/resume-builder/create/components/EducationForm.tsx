'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export function EducationForm() {
  const { state, dispatch } = useResume()
  const [achievements, setAchievements] = useState<string>('')

  const handleAddEducation = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: formData.get('institution') as string,
        degree: formData.get('degree') as string,
        field: formData.get('field') as string,
        startDate: formData.get('startDate') as string,
        endDate: formData.get('endDate') as string,
        gpa: formData.get('gpa') as string,
        achievements: achievements.split('\n').filter(a => a.trim()),
      },
    })
    
    e.currentTarget.reset()
    setAchievements('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddEducation} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="institution">Institution</Label>
              <Input id="institution" name="institution" required placeholder="Stanford University" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="degree">Degree</Label>
              <Input id="degree" name="degree" required placeholder="Bachelor of Science" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input id="field" name="field" required placeholder="Computer Science" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input id="startDate" name="startDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input id="endDate" name="endDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gpa">GPA (Optional)</Label>
              <Input id="gpa" name="gpa" placeholder="3.8" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="achievements">Achievements & Activities</Label>
            <Textarea
              id="achievements"
              value={achievements}
              onChange={(e) => setAchievements(e.target.value)}
              placeholder="• Dean's List 2019-2022&#10;• President of Computer Science Club&#10;• Hackathon Winner"
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Education
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          {state.education.map((edu, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{edu.degree} in {edu.field}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.startDate} - {edu.endDate}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: index })}
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

