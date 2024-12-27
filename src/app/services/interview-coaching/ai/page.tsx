"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaMicrophone, FaVideo, FaChartLine, FaLightbulb, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

export default function AIInterviewCoachingPage() {
  const [currentStep, setCurrentStep] = useState<'setup' | 'interview' | 'feedback'>('setup');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);

  const topics = [
    { id: 'behavioral', name: 'Behavioral Questions', icon: FaLightbulb },
    { id: 'technical', name: 'Technical Skills', icon: FaRobot },
    { id: 'communication', name: 'Communication', icon: FaMicrophone },
    { id: 'leadership', name: 'Leadership', icon: FaChartLine }
  ];

  const toggleTopic = (topicId: string) => {
    setSelectedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const startInterview = () => {
    setCurrentStep('interview');
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
  };

  const submitInterview = () => {
    setCurrentStep('feedback');
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
        {currentStep === 'setup' && (
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
                AI Interview Coach
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Practice your interview skills with our AI coach. Get instant feedback and improve your performance.
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-[#fcba28]">Select Topics to Practice</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topics.map(topic => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => toggleTopic(topic.id)}
                      className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                        selectedTopics.includes(topic.id)
                          ? 'border-[#fcba28] bg-[#fcba28]/10'
                          : 'border-white/10 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-8 h-8 text-[#fcba28] mb-4" />
                      <h3 className="text-lg font-semibold">{topic.name}</h3>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={startInterview}
                disabled={selectedTopics.length === 0}
                className="px-8 py-4 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcd978] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Start Interview <FaArrowRight />
              </button>
            </div>
          </motion.div>
        )}

        {currentStep === 'interview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="bg-white/5 p-8 rounded-xl border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Question 1</h2>
              <p className="text-xl text-gray-300 mb-8">
                Tell me about a challenging project you've worked on and how you handled it.
              </p>
              
              <div className="flex items-center justify-center gap-6">
                <button
                  onClick={handleRecording}
                  className={`p-6 rounded-full ${
                    isRecording
                      ? 'bg-red-500 animate-pulse'
                      : 'bg-[#fcba28]'
                  } text-black transition-all duration-300`}
                >
                  <FaMicrophone className="w-8 h-8" />
                </button>
                <button
                  onClick={submitInterview}
                  className="px-6 py-3 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcd978] transition-all duration-300 flex items-center gap-2"
                >
                  Submit Answer <FaArrowRight />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'feedback' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Interview Analysis</h2>
              <p className="text-gray-300">Here's your personalized feedback and areas for improvement.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Content Score</h3>
                <div className="text-4xl font-bold">85%</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Delivery Score</h3>
                <div className="text-4xl font-bold">78%</div>
              </div>
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Structure Score</h3>
                <div className="text-4xl font-bold">92%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Strengths</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                    <span>Clear and concise explanation of the project challenges</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                    <span>Good use of the STAR method in structuring your response</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                    <span>Strong emphasis on your specific contributions</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Areas for Improvement</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-1" />
                    <span>Consider providing more quantifiable results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-1" />
                    <span>Pace could be slightly slower for better clarity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-1" />
                    <span>Include more details about team collaboration</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setCurrentStep('setup')}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl font-semibold hover:bg-[#fcd978] transition-all duration-300"
              >
                Practice Another Question
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
