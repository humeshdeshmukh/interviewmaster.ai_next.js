"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserTie,
  FaLightbulb,
  FaChartLine,
  FaVideo,
  FaCalendar,
  FaClock,
  FaCheckCircle,
  FaSpinner,
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaBriefcase,
  FaCode
} from 'react-icons/fa';

interface CoachingSession {
  id: string;
  type: 'behavioral' | 'technical' | 'leadership' | 'case-study';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  industry: string;
  role: string;
  duration: number;
  feedback?: any;
}

const sessionTypes = [
  { id: 'behavioral', name: 'Behavioral', icon: FaUserTie },
  { id: 'technical', name: 'Technical', icon: FaCode },
  { id: 'leadership', name: 'Leadership', icon: FaBriefcase },
  { id: 'case-study', name: 'Case Study', icon: FaLightbulb }
];

const experienceLevels = [
  { id: 'entry', name: 'Entry Level', color: 'text-green-400' },
  { id: 'mid', name: 'Mid Level', color: 'text-blue-400' },
  { id: 'senior', name: 'Senior Level', color: 'text-purple-400' },
  { id: 'executive', name: 'Executive', color: 'text-yellow-400' }
];

const industries = [
  'Technology',
  'Finance',
  'Healthcare',
  'Retail',
  'Manufacturing',
  'Consulting'
];

export default function InterviewCoachingPage() {
  const [activeTab, setActiveTab] = useState<'setup' | 'session' | 'feedback'>('setup');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [role, setRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionFeedback, setSessionFeedback] = useState<any>(null);
  const [responses, setResponses] = useState<{ [key: string]: string }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const mockQuestions = {
    behavioral: [
      'Tell me about a time you faced a significant challenge at work.',
      'Describe a situation where you had to lead a team through a difficult project.',
      'How do you handle conflicts with coworkers?'
    ],
    technical: [
      'Explain the concept of dependency injection and its benefits.',
      'How would you design a scalable notification system?',
      'What are the pros and cons of microservices architecture?'
    ],
    leadership: [
      'How do you motivate team members during challenging times?',
      'Describe your approach to strategic planning and execution.',
      'How do you handle underperforming team members?'
    ],
    'case-study': [
      'How would you improve our product\'s user engagement?',
      'Design a strategy to enter a new market segment.',
      'Analyze and propose solutions for declining sales.'
    ]
  };

  const startSession = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // In a real implementation, this would connect to a video call
      // or AI coaching system
      setActiveTab('session');
    } catch (err) {
      setError('Failed to start coaching session. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitSession = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/interview-coaching', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'generateFeedback',
          responses,
          sessionType: selectedType,
          level: selectedLevel
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate feedback');
      }

      const data = await response.json();
      setSessionFeedback(data.feedback);
      setActiveTab('feedback');
    } catch (err) {
      setError('Failed to generate session feedback. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (response: string) => {
    setResponses(prev => ({
      ...prev,
      [currentQuestion]: response
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions[selectedType as keyof typeof mockQuestions].length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitSession();
    }
  };

  const renderSetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Interview Type</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sessionTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-xl text-center transition-all duration-300 ${
                  selectedType === type.id
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                <Icon className="w-6 h-6 mx-auto mb-2" />
                <span className="font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Experience Level</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {experienceLevels.map(level => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedLevel === level.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className={`font-medium ${level.color}`}>
                {level.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Industry</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {industries.map(industry => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedIndustry === industry
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="font-medium">{industry}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Target Role</h3>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Senior Software Engineer"
          className="w-full p-4 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none transition-colors"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={startSession}
          disabled={isLoading || !selectedType || !selectedLevel || !selectedIndustry || !role}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Loading...
            </>
          ) : (
            <>
              <FaVideo /> Start Session
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderSession = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Progress */}
      <div className="flex justify-between items-center">
        <div className="text-gray-300">
          Question {currentQuestion + 1} of {mockQuestions[selectedType as keyof typeof mockQuestions].length}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-medium text-white mb-6">
          {mockQuestions[selectedType as keyof typeof mockQuestions][currentQuestion]}
        </h3>

        <textarea
          value={responses[currentQuestion] || ''}
          onChange={(e) => handleResponse(e.target.value)}
          className="w-full h-48 bg-black/30 text-gray-300 p-4 rounded-lg resize-none"
          placeholder="Type your response here..."
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
        >
          {currentQuestion === mockQuestions[selectedType as keyof typeof mockQuestions].length - 1 ? (
            <>
              Get Feedback <FaCheckCircle />
            </>
          ) : (
            <>
              Next Question <FaArrowRight />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderFeedback = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Overall Performance</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{sessionFeedback.overallScore}/100</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${sessionFeedback.overallScore}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Communication</h3>
          <div className="text-2xl font-bold text-white">
            {sessionFeedback.communicationScore}/100
          </div>
        </div>
        {sessionFeedback.technicalScore && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Technical</h3>
            <div className="text-2xl font-bold text-white">
              {sessionFeedback.technicalScore}/100
            </div>
          </div>
        )}
        {sessionFeedback.leadershipScore && (
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Leadership</h3>
            <div className="text-2xl font-bold text-white">
              {sessionFeedback.leadershipScore}/100
            </div>
          </div>
        )}
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {sessionFeedback.strengths.map((strength: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <FaCheckCircle className="text-green-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Areas for Improvement</h3>
          <ul className="space-y-2">
            {sessionFeedback.improvements.map((improvement: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <FaLightbulb className="text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessionFeedback.recommendations.map((recommendation: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaGraduationCap className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setActiveTab('setup');
            setResponses({});
            setCurrentQuestion(0);
            setSessionFeedback(null);
          }}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <FaCalendar /> Schedule Next Session
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
        >
          <FaChartLine /> Save Feedback
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-purple-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            Interview Coaching
          </h1>
          <p className="text-xl text-gray-300">
            Get personalized coaching and feedback to ace your interviews
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
          {activeTab === 'setup' && renderSetup()}
          {activeTab === 'session' && renderSession()}
          {activeTab === 'feedback' && renderFeedback()}
        </AnimatePresence>
      </div>
    </div>
  );
}
