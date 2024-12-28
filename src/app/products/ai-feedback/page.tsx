'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaDownload,
  FaSpinner
} from 'react-icons/fa';

// Import modular components
import { ResponseTypeSelector } from './components/response-input/ResponseTypeSelector';
import { ExperienceLevelSelector } from './components/response-input/ExperienceLevelSelector';
import { ResponseInput } from './components/response-input/ResponseInput';
import { ScoreCard } from './components/analysis/ScoreCard';
import { FeedbackDetails } from './components/analysis/FeedbackDetails';

interface FeedbackMetrics {
  confidence: number;
  clarity: number;
  technicalAccuracy: number;
  completeness: number;
  relevance: number;
  structure: number;
}

interface DetailedFeedback {
  strengths: string[];
  improvements: string[];
  suggestions: string[];
  resources: string[];
  score: number;
  metrics: FeedbackMetrics;
}

export default function AIFeedbackPage() {
  const [activeTab, setActiveTab] = useState<'input' | 'analysis'>('input');
  const [selectedType, setSelectedType] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [role, setRole] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<DetailedFeedback | null>(null);

  const analyzeFeedback = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock feedback data
      setFeedback({
        score: 85,
        metrics: {
          confidence: 80,
          clarity: 85,
          technicalAccuracy: 90,
          completeness: 75,
          relevance: 95,
          structure: 85
        },
        strengths: [
          'Clear explanation of technical concepts',
          'Well-structured response',
          'Good use of specific examples'
        ],
        improvements: [
          'Could provide more detailed implementation steps',
          'Consider discussing alternative approaches',
          'Add more context about trade-offs'
        ],
        suggestions: [
          'Include specific code examples when discussing implementations',
          'Mention performance considerations',
          'Discuss scalability aspects of your solution',
          'Add error handling scenarios'
        ],
        resources: [
          'System Design Interview - An Insider\'s Guide',
          'Clean Code by Robert C. Martin',
          'Designing Data-Intensive Applications',
          'Advanced Algorithm Courses on Coursera'
        ]
      });
      
      setActiveTab('analysis');
    } catch (err) {
      setError('Failed to analyze response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async () => {
    // Implementation remains the same
  };

  const renderInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      <ResponseTypeSelector
        selectedType={selectedType}
        onSelect={setSelectedType}
      />

      <ExperienceLevelSelector
        selectedLevel={selectedLevel}
        onSelect={setSelectedLevel}
      />

      <ResponseInput
        role={role}
        response={response}
        onRoleChange={setRole}
        onResponseChange={setResponse}
      />

      <div className="flex justify-end">
        <button
          onClick={analyzeFeedback}
          disabled={isLoading || !selectedType || !selectedLevel || !role || !response}
          className="px-8 py-4 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl hover:from-[#fcd978] hover:to-[#fcba28] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-semibold shadow-lg shadow-[#fcba28]/20"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin w-5 h-5" />
              Analyzing...
            </>
          ) : (
            <>
              <FaRobot className="w-5 h-5" />
              Get AI Feedback
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12"
    >
      {feedback && (
        <>
          <ScoreCard
            score={feedback.score}
            metrics={feedback.metrics}
          />

          <FeedbackDetails
            strengths={feedback.strengths}
            improvements={feedback.improvements}
            suggestions={feedback.suggestions}
            resources={feedback.resources}
          />

          <div className="flex justify-between">
            <button
              onClick={() => {
                setActiveTab('input');
                setResponse('');
                setFeedback(null);
              }}
              className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <FaRobot className="w-5 h-5" />
              New Analysis
            </button>
            <button
              onClick={downloadReport}
              className="px-6 py-3 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-xl hover:from-[#fcd978] hover:to-[#fcba28] transition-all duration-300 flex items-center gap-2 font-semibold shadow-lg shadow-[#fcba28]/20"
            >
              <FaDownload className="w-5 h-5" />
              Download Report
            </button>
          </div>
        </>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-[#fcba28]/5" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="w-20 h-20 mx-auto bg-gradient-to-br from-[#fcba28] to-[#fcd978] rounded-2xl p-5 shadow-lg shadow-[#fcba28]/20 mb-8"
          >
            <FaRobot className="w-full h-full text-black" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
              AI Interview Feedback
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Get instant, detailed feedback on your interview responses powered by advanced AI
          </motion.p>
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
          {activeTab === 'input' && renderInput()}
          {activeTab === 'analysis' && renderAnalysis()}
        </AnimatePresence>
      </div>
    </div>
  );
}
