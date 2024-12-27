"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase, FaList, FaCheck } from 'react-icons/fa';
import { submitToGoogleForm, sendEmailNotification } from '@/utils/consultationHandler';

const consultationTypes = [
  {
    id: 'career',
    title: 'Career Guidance',
    description: 'Get expert advice on career paths and opportunities',
    icon: '👔'
  },
  {
    id: 'interview',
    title: 'Interview Preparation',
    description: 'Personalized coaching for job interviews',
    icon: '🎯'
  },
  {
    id: 'resume',
    title: 'Resume Review',
    description: 'Professional review and optimization of your resume',
    icon: '📝'
  },
  {
    id: 'skills',
    title: 'Skills Assessment',
    description: 'Evaluate and improve your technical skills',
    icon: '💡'
  }
];

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)',
  'Senior Level (6-10 years)',
  'Expert Level (10+ years)'
];

const goalOptions = [
  'Career Transition',
  'Skill Development',
  'Leadership Growth',
  'Salary Negotiation',
  'Job Search Strategy',
  'Interview Preparation',
  'Resume Building',
  'Personal Branding'
];

const referralSources = [
  'Google Search',
  'Social Media',
  'Friend/Colleague',
  'Professional Network',
  'Other'
];

export default function ConsultationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    experience: '',
    goals: [] as string[],
    heardFrom: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Submit to Google Form
      const googleFormSuccess = await submitToGoogleForm(formData);
      
      // Send email notification
      const emailSuccess = await sendEmailNotification(formData);

      if (googleFormSuccess && emailSuccess) {
        setSubmitSuccess(true);
      } else {
        throw new Error('Failed to submit consultation request');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.email && formData.phone;
      case 2:
        return formData.consultationType && formData.experience;
      case 3:
        return formData.preferredDate && formData.preferredTime;
      default:
        return true;
    }
  };

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaUser /> Full Name
          </span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
            placeholder="John Doe"
          />
        </label>

        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaEnvelope /> Email Address
          </span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
            placeholder="john@example.com"
          />
        </label>

        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaPhone /> Phone Number
          </span>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
            placeholder="+1 (555) 000-0000"
          />
        </label>

        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaBuilding /> Company (Optional)
          </span>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
            placeholder="Company Name"
          />
        </label>

        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaBriefcase /> Job Title (Optional)
          </span>
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
            placeholder="Software Engineer"
          />
        </label>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {consultationTypes.map(type => (
          <div
            key={type.id}
            className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
              formData.consultationType === type.id
                ? 'bg-[#fcba28]/20 border-[#fcba28]'
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}
            onClick={() => setFormData(prev => ({ ...prev, consultationType: type.id }))}
          >
            <div className="text-3xl mb-4">{type.icon}</div>
            <h3 className="text-lg font-semibold text-[#fcba28] mb-2">{type.title}</h3>
            <p className="text-gray-300">{type.description}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <label className="block">
          <span className="text-gray-300">Experience Level</span>
          <select
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
          >
            <option value="">Select Experience Level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </label>

        <div>
          <span className="text-gray-300 block mb-3">Career Goals (Select all that apply)</span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {goalOptions.map(goal => (
              <button
                key={goal}
                type="button"
                onClick={() => handleGoalToggle(goal)}
                className={`p-3 rounded-xl text-sm text-center transition-all duration-300 ${
                  formData.goals.includes(goal)
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaCalendar /> Preferred Date
          </span>
          <input
            type="date"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
          />
        </label>

        <label className="block">
          <span className="text-gray-300 flex items-center gap-2">
            <FaClock /> Preferred Time
          </span>
          <input
            type="time"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
          />
        </label>
      </div>

      <label className="block">
        <span className="text-gray-300">How did you hear about us?</span>
        <select
          name="heardFrom"
          value={formData.heardFrom}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
        >
          <option value="">Select an option</option>
          {referralSources.map(source => (
            <option key={source} value={source}>{source}</option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-gray-300">Additional Message</span>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
          className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200 focus:border-[#fcba28] focus:ring-[#fcba28] focus:ring-opacity-50"
          placeholder="Tell us more about your goals and expectations..."
        />
      </label>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
        <FaCheck className="text-3xl text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-[#fcba28] mb-4">Consultation Request Submitted!</h2>
      <p className="text-gray-300 mb-8">
        Thank you for your interest! We'll get back to you within 24 hours to confirm your consultation.
      </p>
      <button
        onClick={() => window.location.href = '/'}
        className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
      >
        Back to Home
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        {!submitSuccess ? (
          <>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
                Book a Consultation
              </h1>
              <p className="text-xl text-gray-300">
                Get personalized guidance from our expert career consultants
              </p>
            </div>

            {/* Progress Steps */}
            <div className="flex justify-between items-center mb-12 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2"></div>
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                    step === currentStep
                      ? 'bg-[#fcba28] text-black'
                      : step < currentStep
                      ? 'bg-green-500 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}
                >
                  {step < currentStep ? <FaCheck /> : step}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}

              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500">
                  {error}
                </div>
              )}

              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    Previous
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateCurrentStep()}
                    className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !validateCurrentStep()}
                    className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          renderSuccess()
        )}
      </div>
    </div>
  );
}
