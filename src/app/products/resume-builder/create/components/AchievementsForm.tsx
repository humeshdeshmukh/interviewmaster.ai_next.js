'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export function AchievementsForm() {
  const { state, dispatch } = useResume()
  const [newAchievement, setNewAchievement] = useState('')

  const handleAddAchievement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: [...state.achievements, newAchievement] })
    setNewAchievement('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Achievements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddAchievement} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="achievement">Achievement</Label>
            <Input
              id="achievement"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="Increased team productivity by 30% through process improvements"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          {state.achievements.map((achievement, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <p>{achievement}</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'UPDATE_ACHIEVEMENTS', payload: state.achievements.filter((_, i) => i !== index) })}
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

