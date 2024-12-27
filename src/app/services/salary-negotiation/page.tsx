"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaDollarSign, FaChartLine, FaSpinner, FaBriefcase, FaGraduationCap, FaMapMarkerAlt, FaIndustry, FaCheckCircle, FaTimes } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { SpinningIcons } from '@/components/animation/SpinningIcons';

// Dynamically import SpinningIcons with no SSR to avoid window undefined issues
const DynamicSpinningIcons = dynamic(() => import('@/components/animation/SpinningIcons'), { ssr: false });

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
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' }
];

const commonBenefits = [
  { id: 'health', name: 'Health Insurance' },
  { id: 'remote', name: 'Remote Work' },
  { id: 'development', name: 'Professional Development' },
  { id: 'stock', name: 'Stock Options' },
  { id: '401k', name: '401(k) Match' },
  { id: 'bonus', name: 'Performance Bonus' },
  { id: 'pto', name: 'Paid Time Off' },
  { id: 'wellness', name: 'Wellness Programs' }
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

export default function SalaryNegotiationPage() {
  const [formData, setFormData] = useState<SalaryFormData>({
    role: '',
    experience: 0,
    location: '',
    industry: '',
    currentSalary: 0,
    benefits: [],
    skills: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('form');
  const [error, setError] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Salary') || name === 'experience' ? Number(value) : value
    }));
  };

  const handleBenefitToggle = (benefitId: string) => {
    setFormData(prev => ({
      ...prev,
      benefits: prev.benefits.includes(benefitId)
        ? prev.benefits.filter(b => b !== benefitId)
        : [...prev.benefits, benefitId]
    }));
  };

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const analyzeSalary = async () => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch('/api/salary-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to analyze salary');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setActiveTab('results');
    } catch (err) {
      setError('Failed to analyze salary data. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderSalaryForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
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
                min="0"
                max="50"
              />
            </div>
          </label>

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
        </div>

        <div className="space-y-4">
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
                  <option key={industry.id} value={industry.id}>
                    {industry.icon} {industry.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="text-gray-300">Current Salary</span>
            <div className="mt-1 relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="currentSalary"
                value={formData.currentSalary}
                onChange={handleInputChange}
                className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                placeholder="75000"
                min="0"
              />
            </div>
          </label>

          <label className="block">
            <span className="text-gray-300">Current Offer (Optional)</span>
            <div className="mt-1 relative">
              <FaDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="currentOffer"
                value={formData.currentOffer}
                onChange={handleInputChange}
                className="block w-full pl-10 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                placeholder="85000"
                min="0"
              />
            </div>
          </label>
        </div>
      </div>

      <div>
        <span className="text-gray-300 block mb-3">Current Benefits</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {commonBenefits.map(benefit => (
            <button
              key={benefit.id}
              type="button"
              onClick={() => handleBenefitToggle(benefit.id)}
              className={`p-3 rounded-xl text-sm text-center transition-all duration-300 ${
                formData.benefits.includes(benefit.id)
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {benefit.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="text-gray-300 block mb-3">Key Skills</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {commonSkills.map(skill => (
            <button
              key={skill}
              type="button"
              onClick={() => handleSkillToggle(skill)}
              className={`p-3 rounded-xl text-sm text-center transition-all duration-300 ${
                selectedSkills.includes(skill)
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={analyzeSalary}
          disabled={isAnalyzing || !formData.role || !formData.industry}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <FaSpinner className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <FaChartLine /> Analyze Compensation
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Market Position */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Market Position</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{analysis.marketData.percentile}th percentile</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysis.marketData.percentile}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
        <div className="mt-4 text-gray-300">
          Your compensation is <span className="text-[#fcba28]">{analysis.marketData.competitiveness}</span>
        </div>
      </div>

      {/* Salary Range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Market Low</h3>
          <div className="text-2xl font-bold text-[#fcba28]">
            ${analysis.marketData.marketLow.toLocaleString()}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Market Median</h3>
          <div className="text-2xl font-bold text-[#fcba28]">
            ${analysis.marketData.marketMedian.toLocaleString()}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Market High</h3>
          <div className="text-2xl font-bold text-[#fcba28]">
            ${analysis.marketData.marketHigh.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Negotiation Strategies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analysis.strategies.map((strategy: any, index: number) => (
          <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-4">{strategy.approach}</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-300 font-medium mb-2">Key Points</h4>
                <ul className="space-y-2">
                  {strategy.keyPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-300 font-medium mb-2">Talking Points</h4>
                <ul className="space-y-2">
                  {strategy.talkingPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="text-[#fcba28] flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-gray-300 font-medium mb-2">Risks to Avoid</h4>
                <ul className="space-y-2">
                  {strategy.risksToAvoid.map((risk: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaTimes className="text-red-400 flex-shrink-0 mt-1" />
                      <span className="text-gray-300">{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Analysis */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Benefits Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {analysis.benefitsAnalysis.map((benefit: any, index: number) => (
            <div key={index} className="bg-white/5 p-4 rounded-lg border border-white/10">
              <h4 className="font-medium text-[#fcba28] mb-2">{benefit.category}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-gray-300">{benefit.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Market:</span>
                  <span className="text-gray-300">{benefit.marketComparison}</span>
                </div>
                <div className="mt-2 text-gray-300">
                  <span className="text-[#fcba28]">Tip:</span> {benefit.negotiationTip}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => setActiveTab('form')}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
        >
          Edit Information
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
        >
          Save Analysis
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-green-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Salary Negotiation Assistant
          </h1>
          <p className="text-xl text-gray-300">
            Get data-driven insights to negotiate your compensation package
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center mb-8"
          >
            {error}
          </motion.div>
        )}

        <SpinningIcons />
        <AnimatePresence mode="wait">
          {activeTab === 'form' && renderSalaryForm()}
          {activeTab === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  );
}
