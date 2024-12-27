"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaChartLine, FaLightbulb, FaHashtag, FaCheck, FaSpinner, FaStar } from 'react-icons/fa';

interface BrandingData {
  name: string;
  industry: string;
  linkedin: string;
  twitter: string;
  github: string;
  experience: string;
  goals: string[];
}

const industries = [
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'marketing', name: 'Marketing', icon: '📢' },
  { id: 'design', name: 'Design', icon: '🎨' }
];

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Mid Level (3-5 years)',
  'Senior Level (6-10 years)',
  'Expert Level (10+ years)'
];

const brandingGoals = [
  'Thought Leadership',
  'Career Advancement',
  'Industry Recognition',
  'Network Building',
  'Job Opportunities',
  'Client Acquisition',
  'Speaking Engagements',
  'Content Creation'
];

export default function PersonalBrandingPage() {
  const [formData, setFormData] = useState<BrandingData>({
    name: '',
    industry: '',
    linkedin: '',
    twitter: '',
    github: '',
    experience: '',
    goals: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [error, setError] = useState('');
  const [contentIdeas, setContentIdeas] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const analyzeBranding = async () => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      const response = await fetch('/api/branding-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to analyze branding');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
      setContentIdeas(data.contentIdeas);
      setHashtags(data.hashtags);
      setActiveTab('results');
    } catch (err) {
      setError('Failed to analyze branding. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderProfileForm = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300">Full Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
              placeholder="John Doe"
            />
          </label>

          <label className="block">
            <span className="text-gray-300">Industry</span>
            <select
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
            >
              <option value="">Select Industry</option>
              {industries.map(industry => (
                <option key={industry.id} value={industry.id}>
                  {industry.icon} {industry.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-gray-300">Experience Level</span>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
            >
              <option value="">Select Experience Level</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-gray-300 flex items-center gap-2">
              <FaLinkedin /> LinkedIn Profile
            </span>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
              placeholder="linkedin.com/in/username"
            />
          </label>

          <label className="block">
            <span className="text-gray-300 flex items-center gap-2">
              <FaTwitter /> Twitter Handle
            </span>
            <input
              type="text"
              name="twitter"
              value={formData.twitter}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
              placeholder="@username"
            />
          </label>

          <label className="block">
            <span className="text-gray-300 flex items-center gap-2">
              <FaGithub /> GitHub Profile
            </span>
            <input
              type="text"
              name="github"
              value={formData.github}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
              placeholder="github.com/username"
            />
          </label>
        </div>
      </div>

      <div>
        <span className="text-gray-300 block mb-3">Branding Goals (Select all that apply)</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandingGoals.map(goal => (
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

      <div className="flex justify-end">
        <button
          onClick={analyzeBranding}
          disabled={isAnalyzing || !formData.name || !formData.industry}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <FaSpinner className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <FaChartLine /> Analyze Personal Brand
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
      {/* Score Card */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Brand Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{analysis.score}%</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysis.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
      </div>

      {/* Social Media Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(analysis.socialMedia).map(([platform, data]: [string, any]) => (
          <div key={platform} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              {platform === 'linkedin' && <FaLinkedin className="text-2xl text-[#0077b5]" />}
              {platform === 'twitter' && <FaTwitter className="text-2xl text-[#1da1f2]" />}
              {platform === 'github' && <FaGithub className="text-2xl text-white" />}
              <h3 className="text-lg font-semibold capitalize">{platform}</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Followers</span>
                <span className="text-[#fcba28]">{data.metrics.followers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Engagement</span>
                <span className="text-[#fcba28]">{data.metrics.engagement}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Posts</span>
                <span className="text-[#fcba28]">{data.metrics.posts}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Content Ideas */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Content Ideas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contentIdeas.map((idea, index) => (
            <div
              key={index}
              className="p-4 bg-white/5 rounded-lg border border-white/10 flex items-start gap-3"
            >
              <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-1" />
              <span className="text-gray-300">{idea}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Hashtags */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Recommended Hashtags</h3>
        <div className="flex flex-wrap gap-3">
          {hashtags.map((hashtag, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-2"
            >
              <FaHashtag className="text-[#fcba28]" />
              <span className="text-gray-300">{hashtag.slice(1)}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(analysis.recommendations).map(([category, items]: [string, any]) => (
          <div key={category} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-4 capitalize">{category}</h3>
            <ul className="space-y-3">
              {items.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-2">
                  <FaStar className="text-yellow-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Personal Branding Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Enhance your professional presence and build a strong personal brand
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

        <AnimatePresence mode="wait">
          {activeTab === 'profile' && renderProfileForm()}
          {activeTab === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  );
}
