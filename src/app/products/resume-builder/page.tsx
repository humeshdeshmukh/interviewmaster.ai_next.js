/* eslint-disable react/no-unescaped-entities */
"use client"; // For Next.js 13+ to enable client-side rendering

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { motion } from "framer-motion";
import TemplateSelector from "./components/TemplateSelector";
import ResumeAnalyzer from "./components/ResumeAnalyzer";
import SectionEditor from "./components/SectionEditor";
import ResumeTips from "./components/ResumeTips";
import ProfessionalWriter from "./components/ProfessionalWriter";

// Resume data interface
interface ResumeData {
  template: string;
  sections: Array<{
    id: string;
    type: 'personal' | 'summary' | 'experience' | 'education' | 'skills' | 'projects';
    title: string;
    content: any;
    order: number;
  }>;
}

const defaultSections = [
  {
    id: 'personal',
    type: 'personal',
    title: 'Personal Information',
    content: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: ''
    },
    order: 0
  },
  {
    id: 'summary',
    type: 'summary',
    title: 'Professional Summary',
    content: '',
    order: 1
  },
  {
    id: 'experience',
    type: 'experience',
    title: 'Work Experience',
    content: [],
    order: 2
  },
  {
    id: 'education',
    type: 'education',
    title: 'Education',
    content: [],
    order: 3
  },
  {
    id: 'skills',
    type: 'skills',
    title: 'Skills',
    content: [],
    order: 4
  },
  {
    id: 'projects',
    type: 'projects',
    title: 'Projects',
    content: [],
    order: 5
  }
];

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    template: '',
    sections: defaultSections
  });
  const [activeSection, setActiveSection] = useState<'builder' | 'tips' | 'writer'>('builder');
  const [step, setStep] = useState<'template' | 'content' | 'preview'>('template');

  const handleTemplateSelect = (template: any) => {
    setResumeData(prev => ({ ...prev, template: template.id }));
    setStep('content');
  };

  const handleSectionUpdate = (updatedSections: any) => {
    setResumeData(prev => ({ ...prev, sections: updatedSections }));
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("Resume", 20, 20);

    let y = 40;
    resumeData.sections.forEach(section => {
      doc.setFont("helvetica", "bold");
      doc.text(section.title, 20, y);
      y += 10;

      if (typeof section.content === 'string') {
        doc.setFont("helvetica", "normal");
        doc.text(section.content, 20, y);
        y += 10;
      } else if (Array.isArray(section.content)) {
        section.content.forEach((item: any) => {
          Object.entries(item).forEach(([key, value]) => {
            if (key !== 'id') {
              doc.setFont("helvetica", "normal");
              doc.text(`${value}`, 20, y);
              y += 10;
            }
          });
        });
      } else if (typeof section.content === 'object') {
        Object.entries(section.content).forEach(([key, value]) => {
          if (key !== 'id') {
            doc.setFont("helvetica", "normal");
            doc.text(`${key}: ${value}`, 20, y);
            y += 10;
          }
        });
      }
    });

    doc.save("resume.pdf");
  };

  const generateDOCX = () => {
    const doc = new Document({
      sections: [
        {
          children: resumeData.sections.map(section => 
            new Paragraph({
              children: [
                new TextRun({ text: section.title, bold: true }),
                new TextRun({ text: '\n' }),
                ...formatContentForDOCX(section.content)
              ],
            })
          ),
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'resume.docx';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const formatContentForDOCX = (content: any): TextRun[] => {
    if (typeof content === 'string') {
      return [new TextRun({ text: content }), new TextRun({ text: '\n' })];
    }
    
    if (Array.isArray(content)) {
      return content.flatMap(item => 
        Object.entries(item)
          .filter(([key]) => key !== 'id')
          .map(([_, value]) => new TextRun({ text: `${value}\n` }))
      );
    }
    
    if (typeof content === 'object') {
      return Object.entries(content)
        .filter(([key]) => key !== 'id')
        .map(([key, value]) => new TextRun({ text: `${key}: ${value}\n` }));
    }
    
    return [];
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-8">
      <div className="max-w-screen-xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-center mb-8 text-[#fcba28]"
        >
          Resume Builder
        </motion.h1>

        <div className="flex justify-center gap-4 mb-12">
          {(['builder', 'tips', 'writer'] as const).map((section) => (
            <Button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`px-6 py-3 rounded-lg shadow-md ${
                activeSection === section
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {section === 'builder'
                ? 'Build Resume'
                : section === 'tips'
                ? 'Resume Tips'
                : 'Hire Writer'}
            </Button>
          ))}
        </div>

        {activeSection === 'builder' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {step === 'template' && (
              <TemplateSelector
                onSelect={handleTemplateSelect}
                selectedId={resumeData.template}
              />
            )}

            {step === 'content' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <SectionEditor
                    sections={resumeData.sections}
                    onUpdate={handleSectionUpdate}
                  />
                </div>
                <div className="lg:col-span-1">
                  <ResumeAnalyzer content={resumeData.sections.reduce((acc, section) => ({
                    ...acc,
                    [section.type]: section.content
                  }), {})} />
                </div>
              </div>
            )}

            <div className="flex justify-center gap-4 mt-8">
              {step !== 'template' && (
                <Button
                  onClick={() => setStep('template')}
                  className="px-6 py-3 bg-gray-600 text-white text-lg rounded-lg shadow-md"
                >
                  Back to Templates
                </Button>
              )}
              
              {step === 'content' && (
                <>
                  <Button
                    onClick={generatePDF}
                    className="px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md"
                  >
                    <Download className="inline w-5 h-5 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    onClick={generateDOCX}
                    className="px-6 py-3 bg-green-600 text-white text-lg rounded-lg shadow-md"
                  >
                    <Download className="inline w-5 h-5 mr-2" />
                    Download DOCX
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {activeSection === 'tips' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ResumeTips />
          </motion.div>
        )}

        {activeSection === 'writer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfessionalWriter />
          </motion.div>
        )}
      </div>
    </div>
  );
}
