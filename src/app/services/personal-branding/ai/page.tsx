"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaLinkedin, FaTwitter, FaGithub, FaChartLine, FaLightbulb, FaHashtag, FaSpinner } from 'react-icons/fa';

export default function AIPersonalBrandingPage() {
  const [currentStep, setCurrentStep] = useState<'profile' | 'analysis' | 'recommendations'>('profile');
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    industry: '',
    experience: '',
    linkedin: '',
    twitter: '',
    github: '',
    bio: ''
  });

  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Marketing',
    'Design',
    'Other'
  ];

  const experienceLevels = [
    '0-2 years',
    '3-5 years',
    '6-10 years',
    '10+ years'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const analyzeProfile = () => {
    setCurrentStep('analysis');
    // Simulate API call
    setTimeout(() => {
      setCurrentStep('recommendations');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {currentStep === 'profile' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6">
                <FaRobot className="w-8 h-8 text-[#fcba28]" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                AI Personal Brand Builder
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Let our AI analyze and optimize your professional profiles for maximum impact
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Professional Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Senior Software Engineer"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Industry</label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  >
                    <option value="">Select Experience</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaLinkedin className="inline mr-2" />
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaTwitter className="inline mr-2" />
                    Twitter Profile URL
                  </label>
                  <input
                    type="url"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaGithub className="inline mr-2" />
                    GitHub Profile URL
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="https://github.com/username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Professional Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] h-32 resize-none"
                    placeholder="Write a brief professional bio..."
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={analyzeProfile}
                className="px-8 py-4 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcd978] transition-all duration-300 flex items-center gap-2"
              >
                Analyze My Brand <FaChartLine />
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 'analysis' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FaSpinner className="w-12 h-12 text-[#fcba28] mx-auto mb-6 animate-spin" />
            <h2 className="text-2xl font-bold mb-4">Analyzing Your Brand</h2>
            <p className="text-gray-300">Our AI is analyzing your profiles and generating personalized recommendations...</p>
          </motion.div>
        )}

        {currentStep === 'recommendations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Your Brand Analysis</h2>
              <p className="text-gray-300">Here's what our AI found about your personal brand</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Brand Score</h3>
                <div className="text-4xl font-bold">85%</div>
                <p className="text-gray-300 mt-2">Strong professional presence</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Profile Reach</h3>
                <div className="text-4xl font-bold">10k+</div>
                <p className="text-gray-300 mt-2">Monthly profile views</p>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Engagement</h3>
                <div className="text-4xl font-bold">4.8%</div>
                <p className="text-gray-300 mt-2">Average engagement rate</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Profile Optimization</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Add more industry-specific keywords to your bio</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Include quantifiable achievements in your experience</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Update your profile picture to a professional headshot</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Content Strategy</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <FaHashtag className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Use trending industry hashtags: #TechLeadership #Innovation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaHashtag className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Share more thought leadership content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaHashtag className="text-[#fcba28] flex-shrink-0 mt-1" />
                    <span>Engage with industry influencers' content</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('profile')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Update Profile
              </button>
              <button
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcd978] transition-all duration-300"
              >
                Download Report
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
