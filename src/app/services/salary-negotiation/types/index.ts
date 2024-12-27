export interface SalaryFormData {
  role: string;
  experience: number;
  location: string;
  industry: string;
  currentSalary: number;
  currentOffer?: number;
  benefits: string[];
  skills: string[];
}

export interface Industry {
  id: string;
  name: string;
  icon: string;
}
