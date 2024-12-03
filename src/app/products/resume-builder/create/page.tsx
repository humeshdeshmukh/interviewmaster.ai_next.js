'use client'

import { useState } from 'react'
import { ResumeProvider } from './context/ResumeContext'
import { PersonalInfoForm } from './components/PersonalInfoForm'
import { SummaryForm } from './components/SummaryForm'
import { ExperienceForm } from './components/ExperienceForm'
import { EducationForm } from './components/EducationForm'
import { SkillsForm } from './components/SkillsForm'
import { ProjectsForm } from './components/ProjectsForm'
import { CertificationsForm } from './components/CertificationsForm'
import { AchievementsForm } from './components/AchievementsForm'
import { StandardResumeTemplate } from './components/StandardResumeTemplate'
import { AISuggestions } from './components/AISuggestions'
import { PDFExport } from './components/PDFExport'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { ProgressTracker } from './components/ProgressTracker'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Eye, PenSquare } from 'lucide-react'

export default function ResumeBuilder() {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit')

  return (
    <ResumeProvider>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Create Your FAANG-Ready Resume</h1>
            <p className="text-muted-foreground">
              Build a professional resume that stands out to top tech companies
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <Button variant="outline" onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}>
              {mode === 'edit' ? (
                <>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </>
              ) : (
                <>
                  <PenSquare className="w-4 h-4 mr-2" />
                  Edit
                </>
              )}
            </Button>
            <PDFExport />
          </div>
        </div>

        <ProgressTracker />

        {mode === 'edit' ? (
          <Tabs defaultValue="personal" className="space-y-4 mt-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
              <PersonalInfoForm />
            </TabsContent>
            <TabsContent value="summary">
              <SummaryForm />
            </TabsContent>
            <TabsContent value="experience">
              <ExperienceForm />
            </TabsContent>
            <TabsContent value="education">
              <EducationForm />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsForm />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsForm />
            </TabsContent>
            <TabsContent value="certifications">
              <CertificationsForm />
            </TabsContent>
            <TabsContent value="achievements">
              <AchievementsForm />
            </TabsContent>
          </Tabs>
        ) : (
          <StandardResumeTemplate />
        )}

        <div className="mt-8">
          <AISuggestions />
        </div>
      </div>
    </ResumeProvider>
  )
}

