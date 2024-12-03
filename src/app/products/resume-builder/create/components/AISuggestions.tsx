'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export function AISuggestions() {
  const { state } = useResume()
  const [suggestions, setSuggestions] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const generateSuggestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/generate-suggestions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })
      const data = await response.json()
      setSuggestions(data.suggestions)
    } catch (error) {
      console.error('Error generating suggestions:', error)
      setSuggestions('An error occurred while generating suggestions. Please try again.')
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI-Powered Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={generateSuggestions} disabled={loading} className="w-full mb-4">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Suggestions...
            </>
          ) : (
            'Generate Suggestions'
          )}
        </Button>
        {suggestions && (
          <div className="mt-4 p-4 bg-muted rounded-md">
            <h3 className="font-semibold mb-2">Suggestions:</h3>
            <p className="text-sm whitespace-pre-wrap">{suggestions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

