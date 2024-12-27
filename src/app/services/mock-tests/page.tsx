"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaLightbulb, FaClock, FaCheckCircle, FaTimes, FaChartLine, FaSpinner, FaArrowRight, FaRedo } from 'react-icons/fa';

interface Question {
  id: string;
  type: 'mcq' | 'coding' | 'written';
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  question: string;
  code?: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  timeLimit: number;
}

const categories = [
  { id: 'javascript', name: 'JavaScript', icon: '⚡' },
  { id: 'algorithms', name: 'Algorithms', icon: '🧮' },
  { id: 'system-design', name: 'System Design', icon: '🏗️' },
  { id: 'databases', name: 'Databases', icon: '🗄️' },
  { id: 'frontend', name: 'Frontend Dev', icon: '🎨' },
  { id: 'backend', name: 'Backend Dev', icon: '⚙️' }
];

const difficulties = [
  { id: 'easy', name: 'Easy', color: 'text-green-400' },
  { id: 'medium', name: 'Medium', color: 'text-yellow-400' },
  { id: 'hard', name: 'Hard', color: 'text-red-400' }
];

export default function MockTestsPage() {
  const [activeTab, setActiveTab] = useState<'setup' | 'test' | 'results'>('setup');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [testStartTime, setTestStartTime] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [testAnalysis, setTestAnalysis] = useState<any>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeTab === 'test' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            submitTest();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeTab, timeLeft]);

  const startTest = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/mock-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'getQuestions',
          category: selectedCategory,
          difficulty: selectedDifficulty,
          count: 10
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setTimeLeft(data.questions.reduce((acc: number, q: Question) => acc + q.timeLimit, 0));
      setTestStartTime(Date.now());
      setActiveTab('test');
    } catch (err) {
      setError('Failed to start test. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const submitTest = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const timeSpent = Math.floor((Date.now() - testStartTime) / 1000);
      
      const response = await fetch('/api/mock-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'submitTest',
          answers,
          questions,
          timeSpent
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit test');
      }

      const data = await response.json();
      setTestResult(data.result);
      setTestAnalysis(data.analysis);
      setActiveTab('results');
    } catch (err) {
      setError('Failed to submit test. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitTest();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderSetup = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl text-left transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-[#fcba28] text-black'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              <span className="text-2xl mb-2 block">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Difficulty</h3>
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
          onClick={startTest}
          disabled={isLoading || !selectedCategory || !selectedDifficulty}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" /> Loading...
            </>
          ) : (
            <>
              <FaCode /> Start Test
            </>
          )}
        </button>
      </div>
    </motion.div>
  );

  const renderTest = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Progress and Timer */}
      <div className="flex justify-between items-center">
        <div className="text-gray-300">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="flex items-center gap-2 text-[#fcba28]">
          <FaClock />
          {formatTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-sm ${
            questions[currentQuestion].difficulty === 'easy' ? 'bg-green-500/20 text-green-400' :
            questions[currentQuestion].difficulty === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {questions[currentQuestion].difficulty.charAt(0).toUpperCase() + questions[currentQuestion].difficulty.slice(1)}
          </span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-300">{questions[currentQuestion].category}</span>
        </div>

        <h3 className="text-xl font-medium text-white mb-4">
          {questions[currentQuestion].question}
        </h3>

        {questions[currentQuestion].code && (
          <pre className="bg-black/30 p-4 rounded-lg mb-4 overflow-x-auto">
            <code className="text-gray-300">{questions[currentQuestion].code}</code>
          </pre>
        )}

        {questions[currentQuestion].type === 'mcq' && (
          <div className="space-y-3">
            {questions[currentQuestion].options?.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                  answers[questions[currentQuestion].id] === option
                    ? 'bg-[#fcba28] text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {questions[currentQuestion].type === 'coding' && (
          <textarea
            value={answers[questions[currentQuestion].id] || ''}
            onChange={e => handleAnswer(e.target.value)}
            className="w-full h-64 bg-black/30 text-gray-300 p-4 rounded-lg font-mono"
            placeholder="Write your code here..."
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          onClick={nextQuestion}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
        >
          {currentQuestion === questions.length - 1 ? (
            <>
              Submit Test <FaCheckCircle />
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

  const renderResults = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Test Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">{testResult.score.toFixed(1)}%</div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${testResult.score}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-gray-400">Questions</div>
            <div className="text-xl font-semibold text-white">{testResult.totalQuestions}</div>
          </div>
          <div>
            <div className="text-gray-400">Correct</div>
            <div className="text-xl font-semibold text-green-400">{testResult.correctAnswers}</div>
          </div>
          <div>
            <div className="text-gray-400">Time</div>
            <div className="text-xl font-semibold text-white">{formatTime(testResult.timeSpent)}</div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Speed</h3>
          <div className="text-2xl font-bold text-white">
            {testAnalysis.performance.speed}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Accuracy</h3>
          <div className="text-2xl font-bold text-white">
            {testAnalysis.performance.accuracy}
          </div>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Consistency</h3>
          <div className="text-2xl font-bold text-white">
            {testAnalysis.performance.consistency}
          </div>
        </div>
      </div>

      {/* Strengths and Improvements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {testResult.strengths.map((strength: string, index: number) => (
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
            {testResult.improvements.map((improvement: string, index: number) => (
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
          {testAnalysis.recommendations.map((recommendation: string, index: number) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <FaLightbulb className="text-[#fcba28] flex-shrink-0 mt-1" />
              <span className="text-gray-300">{recommendation}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setActiveTab('setup');
            setAnswers({});
            setCurrentQuestion(0);
            setTestResult(null);
            setTestAnalysis(null);
          }}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <FaRedo /> Take Another Test
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
        >
          <FaChartLine /> Save Results
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
            Mock Tests
          </h1>
          <p className="text-xl text-gray-300">
            Practice with real interview questions and get instant feedback
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
          {activeTab === 'test' && renderTest()}
          {activeTab === 'results' && renderResults()}
        </AnimatePresence>
      </div>
    </div>
  );
}
