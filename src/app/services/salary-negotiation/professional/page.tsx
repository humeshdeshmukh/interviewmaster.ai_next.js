"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaUserTie, FaCalendarAlt, FaClock, FaVideo, FaPhone, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
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

interface ConsultationFormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: 'video' | 'phone';
  notes: string;
}

const availableTimes = [
  '09:00 AM',
  '10:00 AM',
  '11:00 AM',
  '02:00 PM',
  '03:00 PM',
  '04:00 PM'
];

const consultationFeatures = [
  {
    title: 'Personalized Strategy',
    description: 'Custom negotiation plan based on your unique situation'
  },
  {
    title: 'Market Insights',
    description: 'Deep dive into industry-specific compensation trends'
  },
  {
    title: 'Mock Negotiations',
    description: 'Practice sessions to build confidence and refine approach'
  },
  {
    title: 'Follow-up Support',
    description: '30 days of email support post-consultation'
  }
];

export default function ProfessionalConsultation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<ConsultationFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: 'video',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setCurrentStep(3);
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
          <h1 className="text-3xl font-bold ml-4">Professional Consultation</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {['Package Details', 'Schedule', 'Confirmation'].map((step, index) => (
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
              style={{ width: `${(currentStep - 1) * 50}%` }}
            />
          </div>
        </div>

        {/* Step 1: Package Details */}
        {currentStep === 1 && (
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {consultationFeatures.map((feature, index) => (
                <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10">
                  <h3 className="text-lg font-semibold text-[#fcba28] mb-2">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-[#fcba28]">Professional Package</h3>
                <span className="text-2xl font-bold text-[#fcba28]">$149</span>
              </div>
              <p className="text-gray-300 mb-6">
                Comprehensive consultation package including all features above
              </p>
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300"
              >
                Schedule Consultation
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Scheduling Form */}
        {currentStep === 2 && (
          <motion.div
            variants={itemVariants}
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
                  />
                </label>

                <label className="block">
                  <span className="text-gray-300">Email</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-300">Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-gray-300">Preferred Date</span>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                  />
                </label>

                <label className="block">
                  <span className="text-gray-300">Preferred Time</span>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                  >
                    <option value="">Select Time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </label>

                <div className="space-y-2">
                  <span className="text-gray-300 block">Consultation Type</span>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                      className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                        formData.type === 'video'
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <FaVideo />
                      Video Call
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, type: 'phone' }))}
                      className={`p-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                        formData.type === 'phone'
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <FaPhone />
                      Phone Call
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <label className="block">
              <span className="text-gray-300">Additional Notes</span>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={4}
                className="mt-1 block w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-gray-200"
                placeholder="Any specific topics you'd like to discuss..."
              />
            </label>

            <div className="flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'Scheduling...' : 'Schedule Consultation'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {currentStep === 3 && (
          <motion.div
            variants={itemVariants}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#fcba28]/20 mb-4">
              <FaCheckCircle className="w-8 h-8 text-[#fcba28]" />
            </div>
            
            <h2 className="text-2xl font-bold text-[#fcba28]">Consultation Scheduled!</h2>
            
            <div className="bg-white/5 p-6 rounded-xl border border-white/10 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-[#fcba28]" />
                  <span className="text-gray-300">{formData.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-[#fcba28]" />
                  <span className="text-gray-300">{formData.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  {formData.type === 'video' ? (
                    <FaVideo className="text-[#fcba28]" />
                  ) : (
                    <FaPhone className="text-[#fcba28]" />
                  )}
                  <span className="text-gray-300">
                    {formData.type === 'video' ? 'Video Call' : 'Phone Call'}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-300">
              We've sent a confirmation email to {formData.email} with all the details.
            </p>

            <Link href="/services/salary-negotiation">
              <button className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300">
                Back to Dashboard
              </button>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
