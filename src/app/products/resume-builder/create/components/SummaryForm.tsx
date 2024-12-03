'use client'

import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useState } from 'react'

export function SummaryForm() {
  const { state, dispatch } = useResume()
  const [summary, setSummary] = useState(state.summary)

  const handleSaveSummary = () => {
    dispatch({ type: 'UPDATE_SUMMARY', payload: summary })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Experienced software engineer with a strong background in developing scalable web applications. Proficient in multiple programming languages and frameworks, with a track record of delivering high-quality code on time. Passionate about solving complex problems and continuously learning new technologies."
            className="min-h-[150px]"
          />
          <Button onClick={handleSaveSummary} className="w-full">
            Save Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

