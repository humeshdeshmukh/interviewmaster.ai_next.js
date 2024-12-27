"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot,
  FaCode,
  FaChartLine,
  FaLightbulb,
  FaSpinner,
  FaCheckCircle,
  FaDownload,
  FaShare,
  FaStar,
  FaExclamationTriangle,
  FaGraduationCap,
  FaBriefcase
} from 'react-icons/fa';

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

const responseTypes = [
  { id: 'technical', name: 'Technical', icon: FaCode },
  { id: 'behavioral', name: 'Behavioral', icon: FaBriefcase },
  { id: 'system-design', name: 'System Design', icon: FaLightbulb }
];

const experienceLevels = [
  { id: 'entry', name: 'Entry Level', color: 'text-green-400' },
  { id: 'mid', name: 'Mid Level', color: 'text-blue-400' },
  { id: 'senior', name: 'Senior Level', color: 'text-purple-400' },
  { id: 'expert', name: 'Expert Level', color: 'text-yellow-400' }
];

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
      const analysisResponse = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'analyze',
          response,
          type: selectedType,
          level: selectedLevel,
          role
        })
      });

      if (!analysisResponse.ok) {
        throw new Error('Failed to analyze feedback');
      }

      const data = await analysisResponse.json();
      setFeedback(data.feedback);
      setActiveTab('analysis');
    } catch (err) {
      setError('Failed to analyze response. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReport = async () => {
    let url: string | undefined;
    let downloadLink: HTMLAnchorElement | undefined;
    
    try {
      const reportResponse = await fetch('/api/ai-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'generateReport',
          feedback,
          type: selectedType,
          level: selectedLevel,
          role
        })
      });

      if (!reportResponse.ok) {
        throw new Error('Failed to generate report');
      }

      const data = await reportResponse.json();
      
      // Create and download the report
      const blob = new Blob([data.report], { type: 'text/markdown' });
      url = window.URL.createObjectURL(blob);
      downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'interview-feedback-report.md';
      downloadLink.style.display = 'none';
      document.body.appendChild(downloadLink);
      
      // Trigger download
      downloadLink.click();
      
    } catch (err) {
      setError('Failed to download report. Please try again.');
      console.error(err);
    } finally {
      // Cleanup after a short delay to ensure download starts
      setTimeout(() => {
        if (downloadLink && document.body.contains(downloadLink)) {
          document.body.removeChild(downloadLink);
        }
        if (url) {
          window.URL.revokeObjectURL(url);
        }
      }, 100);
    }
  };

  const renderInput = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Response Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {responseTypes.map(type => {
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
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Target Role</h3>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="e.g., Senior Software Engineer"
          className="w-full p-4 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none transition-colors"
        />
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Your Response</h3>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Paste your interview response here..."
          className="w-full h-64 p-4 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none transition-colors resize-none"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={analyzeFeedback}
          disabled={isLoading || !selectedType || !selectedLevel || !role || !response}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <FaRobot /> Get AI Feedback
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
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Overall Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{feedback?.score}/100</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${feedback?.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {feedback?.metrics && Object.entries(feedback.metrics).map(([key, value]) => (
          <div key={key} className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-[#fcba28] mb-4 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <div className="text-2xl font-bold text-white">
              {Math.round(value)}%
            </div>
          </div>
        ))}
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {feedback?.strengths.map((strength, index) => (
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
            {feedback?.improvements.map((improvement, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaExclamationTriangle className="text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Suggestions */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback?.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaLightbulb className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{suggestion}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Recommended Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback?.resources.map((resource, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaGraduationCap className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{resource}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setActiveTab('input');
            setResponse('');
            setFeedback(null);
          }}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <FaRobot /> New Analysis
        </button>
        <button
          onClick={downloadReport}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
        >
          <FaDownload /> Download Report
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
            AI Interview Feedback
          </h1>
          <p className="text-xl text-gray-300">
            Get instant, detailed feedback on your interview responses
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
          {activeTab === 'input' && renderInput()}
          {activeTab === 'analysis' && renderAnalysis()}
        </AnimatePresence>
      </div>
    </div>
  );
}
