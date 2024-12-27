"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaMicrophone, FaStop, FaRedo, FaSpinner, FaChartLine, FaStar, FaCheck, FaTimes } from 'react-icons/fa';

interface Question {
  id: string;
  question: string;
  type: string;
  difficulty: string;
  expectedAnswer?: string[];
  followUp?: string[];
}

interface Feedback {
  score: number;
  strengths: string[];
  improvements: string[];
  technicalAccuracy: number;
  communicationClarity: number;
  structuredThinking: number;
  recommendations: string[];
}

export default function AIMockInterviewPage() {
  const [isStarted, setIsStarted] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const topics = [
    { id: 'algorithms', name: 'Algorithms & Data Structures', icon: '🧮' },
    { id: 'system-design', name: 'System Design', icon: '🏗️' },
    { id: 'behavioral', name: 'Behavioral', icon: '🤝' },
    { id: 'frontend', name: 'Frontend Development', icon: '🎨' },
    { id: 'backend', name: 'Backend Development', icon: '⚙️' },
    { id: 'database', name: 'Database Design', icon: '🗄️' }
  ];

  const difficulties = [
    { id: 'entry', name: 'Entry Level', color: 'text-green-400' },
    { id: 'mid', name: 'Mid Level', color: 'text-yellow-400' },
    { id: 'senior', name: 'Senior Level', color: 'text-red-400' }
  ];

  const startInterview = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      // Simulated API call to get questions
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentQuestion({
        id: '1',
        question: "Can you explain how you would design a scalable URL shortening service?",
        type: "system-design",
        difficulty: "mid",
        expectedAnswer: [
          "Discussion of requirements and constraints",
          "API design",
          "Data storage approach",
          "URL shortening algorithm",
          "Scalability considerations"
        ],
        followUp: [
          "How would you handle high traffic?",
          "What if we need analytics?"
        ]
      });
      
      setIsStarted(true);
    } catch (err) {
      setError('Failed to start interview. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    // Implement actual recording logic here
  };

  const stopRecording = async () => {
    setIsRecording(false);
    setIsLoading(true);
    
    try {
      // Simulated API call to process answer
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (questionIndex === 0) {
        setAnswers(prev => ({
          ...prev,
          '1': "The candidate provided a comprehensive answer covering the main components..."
        }));
        
        setCurrentQuestion({
          id: '2',
          question: "How would you handle analytics for this URL shortening service?",
          type: "system-design",
          difficulty: "mid",
          expectedAnswer: [
            "Analytics requirements",
            "Data collection approach",
            "Storage considerations",
            "Processing pipeline"
          ]
        });
        
        setQuestionIndex(1);
      } else {
        setAnswers(prev => ({
          ...prev,
          '2': "The candidate discussed analytics implementation with good depth..."
        }));
        
        // Simulated feedback
        setFeedback({
          score: 85,
          strengths: [
            "Strong understanding of system design principles",
            "Clear communication of technical concepts",
            "Good consideration of scalability"
          ],
          improvements: [
            "Could provide more specific examples",
            "Consider discussing trade-offs in more detail",
            "Add more context about monitoring and alerts"
          ],
          technicalAccuracy: 88,
          communicationClarity: 85,
          structuredThinking: 82,
          recommendations: [
            "Practice explaining complex systems more concisely",
            "Study more about data analytics architectures",
            "Review common scaling patterns"
          ]
        });
      }
    } catch (err) {
      setError('Failed to process answer. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const restartInterview = () => {
    setIsStarted(false);
    setIsRecording(false);
    setCurrentQuestion(null);
    setQuestionIndex(0);
    setAnswers({});
    setFeedback(null);
    setError('');
  };

  const renderSetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Topic</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topics.map(topic => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                selectedTopic === topic.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl mb-2 block">{topic.icon}</span>
              <span className="font-medium">{topic.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Experience Level</h3>
        <div className="grid grid-cols-3 gap-4">
          {difficulties.map(difficulty => (
            <button
              key={difficulty.id}
              onClick={() => setSelectedDifficulty(difficulty.id)}
              className={`p-4 rounded-xl text-center transition-all duration-300 ${
                selectedDifficulty === difficulty.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className={`font-medium ${difficulty.color}`}>
                {difficulty.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={startInterview}
          disabled={isLoading || !selectedTopic || !selectedDifficulty}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Loading...
            </>
          ) : (
            <>
              <FaRobot /> Start Interview
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderInterview = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fcba28]/20 flex items-center justify-center">
            <FaRobot className="text-2xl text-[#fcba28]" />
          </div>
          <div>
            <div className="text-sm text-gray-400">AI Interviewer</div>
            <div className="text-white font-medium">Question {questionIndex + 1}</div>
          </div>
        </div>
        {isRecording && (
          <div className="flex items-center gap-2 text-red-400">
            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse" />
            Recording
          </div>
        )}
      </div>

      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-medium text-white mb-4">
          {currentQuestion?.question}
        </h3>
        {currentQuestion?.expectedAnswer && (
          <div className="text-sm text-gray-400">
            Key points to cover:
            <ul className="mt-2 space-y-1">
              {currentQuestion.expectedAnswer.map((point, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaCheck className="text-[#fcba28]" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={toggleRecording}
          disabled={isLoading}
          className={`p-6 rounded-full transition-all duration-300 ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-[#fcba28] hover:bg-[#fcd978]'
          }`}
        >
          {isLoading ? (
            <FaSpinner className="text-2xl animate-spin" />
          ) : isRecording ? (
            <FaStop className="text-2xl" />
          ) : (
            <FaMicrophone className="text-2xl" />
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
          <h3 className="text-xl font-semibold text-[#fcba28]">Interview Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{feedback?.score}%</div>
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

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Technical Accuracy</h3>
          <div className="text-3xl font-bold text-white">{feedback?.technicalAccuracy}%</div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Communication</h3>
          <div className="text-3xl font-bold text-white">{feedback?.communicationClarity}%</div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Structured Thinking</h3>
          <div className="text-3xl font-bold text-white">{feedback?.structuredThinking}%</div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {feedback?.strengths.map((strength, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <FaCheck className="text-green-400" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Areas for Improvement</h3>
          <ul className="space-y-2">
            {feedback?.improvements.map((improvement, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-300">
                <FaTimes className="text-red-400" />
                {improvement}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedback?.recommendations.map((recommendation, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaStar className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={restartInterview}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#fcd978] transition-all duration-300 flex items-center gap-2"
        >
          <FaRedo /> Practice Again
        </button>
      </div>
    </motion.div>
  );

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
            <FaRobot className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
            AI Mock Interview
          </h1>
          <p className="text-xl text-gray-300">
            Practice with our AI interviewer and get instant feedback
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
          {!isStarted && renderSetup()}
          {isStarted && !feedback && renderInterview()}
          {feedback && renderFeedback()}
        </AnimatePresence>
      </div>
    </div>
  );
}
