'use client'

import { useResume } from '../context/ResumeContext'
import { Progress } from '@/components/ui/progress'

export function ProgressTracker() {
  const { state } = useResume()

  const calculateProgress = () => {
    let progress = 0
    const totalSteps = 7 // Personal Info, Summary, Experience, Education, Skills, Projects, Certifications

    if (state.personalInfo.firstName && state.personalInfo.lastName) progress++
    if (state.summary) progress++
    if (state.experience.length > 0) progress++
    if (state.education.length > 0) progress++
    if (state.skills.length > 0) progress++
    if (state.projects.length > 0) progress++
    if (state.certifications.length > 0) progress++

    return (progress / totalSteps) * 100
  }

  return (
    <div className="w-full">
      <Progress value={calculateProgress()} className="w-full" />
      <p className="text-sm text-muted-foreground mt-2">
        Resume Completion: {Math.round(calculateProgress())}%
      </p>
    </div>
  )
}

