'use client'

import { useResume } from '../context/ResumeContext'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function PersonalInfoForm() {
  const { state, dispatch } = useResume()

  const handleChange = (field: keyof Resume['personalInfo']) => (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: e.target.value },
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={state.personalInfo.firstName}
              onChange={handleChange('firstName')}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={state.personalInfo.lastName}
              onChange={handleChange('lastName')}
              placeholder="Doe"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={state.personalInfo.email}
            onChange={handleChange('email')}
            placeholder="john.doe@example.com"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={state.personalInfo.phone}
            onChange={handleChange('phone')}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={state.personalInfo.location}
            onChange={handleChange('location')}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={state.personalInfo.linkedin || ''}
            onChange={handleChange('linkedin')}
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub</Label>
          <Input
            id="github"
            value={state.personalInfo.github || ''}
            onChange={handleChange('github')}
            placeholder="https://github.com/johndoe"
          />
        </div>
      </CardContent>
    </Card>
  )
}

