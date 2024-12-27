"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaRobot, FaChartLine, FaSpinner, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaIndustry, FaCheckCircle, FaTimes, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

interface FormData {
  role: string;
  experience: number;
  location: string;
  industry: string;
  currentSalary: number;
  targetSalary?: number;
  skills: string[];
  benefits: string[];
}

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Manufacturing',
  'Retail',
  'Education',
  'Consulting',
  'Other'
];

const commonSkills = [
  'Leadership',
  'Project Management',
  'Communication',
  'Problem Solving',
  'Technical Skills',
  'Analytics',
  'Team Management',
  'Strategic Planning'
];

const benefits = [
  'Health Insurance',
  'Remote Work',
  'Stock Options',
  '401(k)',
  'Flexible Hours',
  'Professional Development',
  'Paid Time Off',
  'Performance Bonus'
];

export default function AIConsultation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    role: '',
    experience: 0,
    location: '',
    industry: '',
    currentSalary: 0,
    skills: [],
    benefits: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Salary') || name === 'experience' ? Number(value) : value
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleBenefitToggle = (benefit: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter(b => b !== benefit)
        : [...prev.benefits, benefit]
    }));
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
      </div>

      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <div className="flex items-center mb-8">
          <Link href="/services/salary-negotiation" className="text-gray-400 hover:text-white transition-colors">
            <FaArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold ml-4">AI Salary Analysis</h1>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Basic Info', 'Skills', 'Benefits', 'Analysis'].map((step, index) => (
              <div
                key={step}
                className={`text-sm ${currentStep > index + 1 ? 'text-[#fcba28]' : 'text-gray-400'}`}
              >
                {step}
              </div>
            ))}
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#fcba28] transition-all duration-500"
              style={{ width: `${(currentStep - 1) * 33.33}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-300">Job Role</span>
                  <div className="mt-1 relative">
                    <FaBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                      placeholder="Software Engineer"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-300">Years of Experience</span>
                  <div className="mt-1 relative">
                    <FaGraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                      placeholder="5"
                    />
                  </div>
                </label>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-300">Location</span>
                  <div className="mt-1 relative">
                    <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </label>

                <label className="block">
                  <span className="text-gray-300">Industry</span>
                  <div className="mt-1 relative">
                    <FaIndustry className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                    >
                      <option value="">Select Industry</option>
                      {industries.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Skills */}
        {currentStep === 2 && (
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {commonSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`p-3 rounded-xl text-sm text-center transition-all duration-300 ${
                    formData.skills.includes(skill)
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300"
              >
                Next Step
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Benefits */}
        {currentStep === 3 && (
          <motion.div
            variants={itemVariants}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {benefits.map(benefit => (
                <button
                  key={benefit}
                  onClick={() => handleBenefitToggle(benefit)}
                  className={`p-3 rounded-xl text-sm text-center transition-all duration-300 ${
                    formData.benefits.includes(benefit)
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {benefit}
                </button>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={isAnalyzing}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    Generate Analysis
                    <FaChartLine />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Results */}
        {currentStep === 4 && (
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            {/* Market Position */}
            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Market Position</h3>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-[#fcba28]"
                />
              </div>
              <div className="mt-4 text-gray-300">
                Your profile is in the <span className="text-[#fcba28]">75th percentile</span> for your role and location
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
                <ul className="space-y-3">
                  {formData.skills.slice(0, 3).map((skill, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-green-400" />
                      <span className="text-gray-300">{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Areas to Highlight</h3>
                <ul className="space-y-3">
                  {formData.benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <FaCheckCircle className="text-[#fcba28]" />
                      <span className="text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/services/salary-negotiation/professional">
                <button className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300">
                  Get Professional Help
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
