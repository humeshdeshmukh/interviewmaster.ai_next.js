'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { usePDF } from 'react-to-pdf'
import { ResumePreview } from './ResumePreview'

export function PDFExport() {
  const targetRef = useRef<HTMLDivElement>(null)
  const { toPDF, targetRef: pdfTargetRef } = usePDF({ filename: 'resume.pdf' })

  return (
    <div>
      <Button onClick={() => toPDF()} className="mb-4">
        <Download className="w-4 h-4 mr-2" />
        Download PDF
      </Button>
      <div ref={targetRef}>
        <ResumePreview />
      </div>
    </div>
  )
}

