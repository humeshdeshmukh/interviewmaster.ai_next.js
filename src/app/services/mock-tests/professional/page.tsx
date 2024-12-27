"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaCalendarAlt, FaClock, FaCheckCircle, FaArrowRight, FaLinkedin, FaGithub, FaCode } from 'react-icons/fa';

export default function ProfessionalMockInterviewPage() {
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    experience: '',
    targetRole: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const plans = {
    basic: {
      price: '$79',
      features: [
        '45-minute mock interview',
        'Detailed feedback document',
        'Performance evaluation',
        'Improvement suggestions',
        'Interview recording'
      ]
    },
    premium: {
      price: '$149',
      features: [
        'Everything in Basic',
        '90-minute mock interview',
        'Two practice rounds',
        'Interview strategy session',
        'Follow-up consultation'
      ]
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log({ plan: selectedPlan, ...formData });
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <FaUserTie className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Professional Mock Interview
          </h1>
          <p className="text-xl text-gray-300">
            Practice with experienced tech interviewers from top companies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Plans Section */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold mb-6">Choose Your Plan</h2>
            
            {/* Basic Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedPlan('basic')}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedPlan === 'basic'
                  ? 'border-[#fcba28] bg-[#fcba28]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Basic Plan</h3>
                <span className="text-2xl font-bold text-[#fcba28]">{plans.basic.price}</span>
              </div>
              <ul className="space-y-3">
                {plans.basic.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <FaCheckCircle className="text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Premium Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => setSelectedPlan('premium')}
              className={`cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedPlan === 'premium'
                  ? 'border-[#fcba28] bg-[#fcba28]/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Premium Plan</h3>
                <span className="text-2xl font-bold text-[#fcba28]">{plans.premium.price}</span>
              </div>
              <ul className="space-y-3">
                {plans.premium.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <FaCheckCircle className="text-[#fcba28]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Process Timeline */}
            <div className="p-6 rounded-xl bg-white/5 border border-white/10">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaCode className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Book Your Session</h4>
                    <p className="text-gray-400">Choose a time slot that works for you</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaClock className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Mock Interview</h4>
                    <p className="text-gray-400">Practice with experienced interviewer</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-[#fcba28]/20">
                    <FaCalendarAlt className="text-[#fcba28]" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Feedback Session</h4>
                    <p className="text-gray-400">Get detailed feedback and improvement plan</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/5 p-8 rounded-xl border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6">Schedule Your Interview</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Years of Experience</label>
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaLinkedin className="inline mr-2" />
                    LinkedIn Profile
                  </label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <FaGithub className="inline mr-2" />
                    GitHub Profile
                  </label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    placeholder="GitHub URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Target Role</label>
                <input
                  type="text"
                  name="targetRole"
                  value={formData.targetRole}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                  placeholder="e.g., Senior Software Engineer"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Date</label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Time</label>
                  <input
                    type="time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Additional Information</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-[#fcba28] h-32 resize-none"
                  placeholder="Any specific areas you'd like to focus on?"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Schedule Interview
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
