'use client'

import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, X } from 'lucide-react'

export function SkillsForm() {
  const { state, dispatch } = useResume()

  const handleAddSkill = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    dispatch({
      type: 'ADD_SKILL',
      payload: {
        name: formData.get('skillName') as string,
        level: formData.get('skillLevel') as 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert',
        category: formData.get('skillCategory') as 'Technical' | 'Soft' | 'Language' | 'Tool',
      },
    })
    
    e.currentTarget.reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddSkill} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="skillName">Skill Name</Label>
              <Input id="skillName" name="skillName" required placeholder="React.js" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skillLevel">Skill Level</Label>
              <Select name="skillLevel" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="skillCategory">Category</Label>
            <Select name="skillCategory" required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technical">Technical</SelectItem>
                <SelectItem value="Soft">Soft</SelectItem>
                <SelectItem value="Language">Language</SelectItem>
                <SelectItem value="Tool">Tool</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </form>

        <div className="mt-8">
          <h4 className="font-semibold mb-4">Your Skills</h4>
          <div className="flex flex-wrap gap-2">
            {state.skills.map((skill, index) => (
              <div key={index} className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm">
                {skill.name}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-4 w-4 ml-2 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                  onClick={() => dispatch({ type: 'REMOVE_SKILL', payload: index })}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

