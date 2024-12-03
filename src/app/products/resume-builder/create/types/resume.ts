export interface Education {
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    gpa?: string
    achievements: string[]
  }
  
  export interface Experience {
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    highlights: string[]
    technologies: string[]
  }
  
  export interface Project {
    name: string
    description: string
    technologies: string[]
    link?: string
    highlights: string[]
  }
  
  export interface Skill {
    name: string
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
    category: 'Technical' | 'Soft' | 'Language' | 'Tool'
  }
  
  export interface Resume {
    personalInfo: {
      firstName: string
      lastName: string
      email: string
      phone: string
      location: string
      portfolio?: string
      linkedin?: string
      github?: string
    }
    summary: string
    experience: Experience[]
    education: Education[]
    skills: Skill[]
    projects: Project[]
    achievements: string[]
  }
  
  