'use client'

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { Resume, Experience, Education, Skill, Project, Certification } from '../types/resume'

type ResumeAction =
  | { type: 'UPDATE_PERSONAL_INFO'; payload: Partial<Resume['personalInfo']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: { index: number; experience: Experience } }
  | { type: 'REMOVE_EXPERIENCE'; payload: number }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: { index: number; education: Education } }
  | { type: 'REMOVE_EDUCATION'; payload: number }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'REMOVE_SKILL'; payload: number }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: { index: number; project: Project } }
  | { type: 'REMOVE_PROJECT'; payload: number }
  | { type: 'ADD_CERTIFICATION'; payload: Certification }
  | { type: 'REMOVE_CERTIFICATION'; payload: number }
  | { type: 'UPDATE_ACHIEVEMENTS'; payload: string[] }

const initialState: Resume = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
}

const ResumeContext = createContext<{
  state: Resume
  dispatch: React.Dispatch<ResumeAction>
} | null>(null)

function resumeReducer(state: Resume, action: ResumeAction): Resume {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      }
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload }
    case 'ADD_EXPERIENCE':
      return { ...state, experience: [...state.experience, action.payload] }
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp, i) =>
          i === action.payload.index ? action.payload.experience : exp
        ),
      }
    case 'REMOVE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.filter((_, i) => i !== action.payload),
      }
    case 'ADD_EDUCATION':
      return { ...state, education: [...state.education, action.payload] }
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu, i) =>
          i === action.payload.index ? action.payload.education : edu
        ),
      }
    case 'REMOVE_EDUCATION':
      return {
        ...state,
        education: state.education.filter((_, i) => i !== action.payload),
      }
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.payload] }
    case 'REMOVE_SKILL':
      return {
        ...state,
        skills: state.skills.filter((_, i) => i !== action.payload),
      }
    case 'ADD_PROJECT':
      return { ...state, projects: [...state.projects, action.payload] }
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj, i) =>
          i === action.payload.index ? action.payload.project : proj
        ),
      }
    case 'REMOVE_PROJECT':
      return {
        ...state,
        projects: state.projects.filter((_, i) => i !== action.payload),
      }
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, action.payload] }
    case 'REMOVE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.filter((_, i) => i !== action.payload),
      }
    case 'UPDATE_ACHIEVEMENTS':
      return { ...state, achievements: action.payload }
    default:
      return state
  }
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  return (
    <ResumeContext.Provider value={{ state, dispatch }}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}

