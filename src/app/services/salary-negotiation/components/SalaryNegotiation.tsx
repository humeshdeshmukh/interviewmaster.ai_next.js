"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaSpinner, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaIndustry, FaCheckCircle, FaTimes } from 'react-icons/fa';
import { SalaryFormData } from '../types';
import { industries } from '../constants';

interface SalaryFormData {
  role: string;
  experience: number;
  location: string;
  industry: string;
  currentSalary: number;
  currentOffer?: number;
  benefits: string[];
  skills: string[];
}

const industries = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'retail', name: 'Retail', icon: '🛍️' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
];

const SalaryNegotiation = () => {
  const [formData, setFormData] = useState<SalaryFormData>({
    role: '',
    experience: 0,
    location: '',
    industry: '',
    currentSalary: 0,
    benefits: [],
    skills: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Salary') || name === 'experience' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowResults(true);
  };

  const renderSalaryForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6 bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Job Role
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Years of Experience
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              min="0"
              max="50"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Industry
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Select an industry</option>
              {industries.map(industry => (
                <option key={industry.id} value={industry.id}>
                  {industry.icon} {industry.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Salary
            <input
              type="number"
              name="currentSalary"
              value={formData.currentSalary}
              onChange={handleInputChange}
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin -ml-1 mr-2 h-5 w-5" />
              Analyzing...
            </>
          ) : (
            'Get Negotiation Insights'
          )}
        </button>
      </div>
    </motion.form>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Negotiation Insights</h2>
      {/* Add your results content here */}
      <button
        onClick={() => setShowResults(false)}
        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200"
      >
        Start New Analysis
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Salary Negotiation Assistant
        </h1>
        <p className="text-lg text-gray-600">
          Get personalized insights to negotiate your salary effectively
        </p>
      </div>
      
      <AnimatePresence mode="wait">
        {showResults ? renderResults() : renderSalaryForm()}
      </AnimatePresence>
    </div>
  );
};

export default SalaryNegotiation;
