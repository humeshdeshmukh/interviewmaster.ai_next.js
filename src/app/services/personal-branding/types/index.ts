export interface PersonalBrandingFormData {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  currentRole: string;
  targetRole: string;
  goals: string;
  message?: string;
}

export interface AIBrandingFormData {
  name: string;
  title: string;
  industry: string;
  experience: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  bio: string;
}

export interface BrandingPackage {
  name: string;
  price: string;
  duration: string;
  features: string[];
}

export interface BrandAnalysis {
  brandScore: number;
  profileReach: string;
  engagementRate: string;
  recommendations: {
    profile: string[];
    content: string[];
  };
}

export interface AIBrandingState {
  step: 'profile' | 'analysis' | 'recommendations';
  formData: AIBrandingFormData;
  analysis?: BrandAnalysis;
}

export interface ProfessionalBrandingState {
  selectedPackage: 'essential' | 'premium';
  formData: PersonalBrandingFormData;
  bookingDetails: {
    preferredDate: string;
    preferredTime: string;
  };
}
