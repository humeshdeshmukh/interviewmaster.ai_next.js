'use client'

import { useState } from 'react'
import { useResume } from '../context/ResumeContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Trash2 } from 'lucide-react'

export function CertificationsForm() {
  const { state, dispatch } = useResume()
  const [newCertification, setNewCertification] = useState({ name: '', issuer: '', date: '' })

  const handleAddCertification = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'ADD_CERTIFICATION', payload: newCertification })
    setNewCertification({ name: '', issuer: '', date: '' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Certifications</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddCertification} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certName">Certification Name</Label>
            <Input
              id="certName"
              value={newCertification.name}
              onChange={(e) => setNewCertification({ ...newCertification, name: e.target.value })}
              placeholder="AWS Certified Solutions Architect"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certIssuer">Issuer</Label>
            <Input
              id="certIssuer"
              value={newCertification.issuer}
              onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })}
              placeholder="Amazon Web Services"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="certDate">Date</Label>
            <Input
              id="certDate"
              type="date"
              value={newCertification.date}
              onChange={(e) => setNewCertification({ ...newCertification, date: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Certification
          </Button>
        </form>

        <div className="mt-8 space-y-4">
          {state.certifications.map((cert, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer} | {cert.date}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: index })}
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

