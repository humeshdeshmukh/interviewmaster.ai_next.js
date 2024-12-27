"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaVideo, FaStopCircle, FaCog, FaRobot, FaRegClock, FaRegLightbulb, FaDownload, FaChartBar } from 'react-icons/fa';
import { BsArrowRight, BsCheckCircle, BsGear } from 'react-icons/bs';
import { RiSoundModuleLine } from 'react-icons/ri';
import interviewQuestions from './interviewQuestions.json';
import softwareDevQuestions from './questions/software_development.json';
import behavioralQuestions from './questions/behavioral.json';
import systemDesignQuestions from './questions/system_design.json';
import commonQuestions from './questions/common_questions.json';
import { VideoHandler } from '@/utils/videoHandler';

interface Question {
  id: string;
  question: string;
  keyPoints: string[];
  expectedDuration: number;
  difficulty: string;
  followUpQuestions?: string[];
  technicalConcepts?: string[];
  behavioralIndicators?: string[];
  systemComponents?: string[];
  evaluationCriteria?: string[];
  starFormat?: {
    situation: string;
    task: string;
    action: string;
    result: string;
  };
}

interface Settings {
  category: string;
  subcategory: string;
  difficulty: string;
  duration: number;
  enableAIFeedback: boolean;
  enableTranscription: boolean;
}

interface FeedbackMetrics {
  confidence: number;
  clarity: number;
  technicalAccuracy: number;
  communicationScore: number;
  eyeContact: number;
  posture: number;
}

interface VideoPreviewState {
  isPreviewMode: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

export default function VisualSimulation() {
  // Enhanced state management
  const [settings, setSettings] = useState<Settings>({
    category: '',
    subcategory: '',
    difficulty: 'intermediate',
    duration: 180,
    enableAIFeedback: true,
    enableTranscription: true
  });

  const [isRecording, setIsRecording] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [timer, setTimer] = useState(180);
  const [feedback, setFeedback] = useState<FeedbackMetrics | null>(null);
  const [transcription, setTranscription] = useState<string>('');
  const [isSimulationStarted, setIsSimulationStarted] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);

  // New state variables
  const [videoPreview, setVideoPreview] = useState<VideoPreviewState>({
    isPreviewMode: false,
    currentTime: 0,
    duration: 0,
    volume: 1
  });
  
  const [recordings, setRecordings] = useState<{ id: string; blob: Blob; timestamp: Date }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const [showFollowUp, setShowFollowUp] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoHandlerRef = useRef<VideoHandler | null>(null);

  // Get available categories
  const categories = Object.keys(interviewQuestions);

  // Get subcategories based on selected category
  const getSubcategories = () => {
    if (!settings.category) return [];
    return Object.keys(interviewQuestions[settings.category as keyof typeof interviewQuestions]);
  };

  // Initialize video handler
  useEffect(() => {
    videoHandlerRef.current = new VideoHandler();
    initializeVideo();
    
    return () => {
      if (videoHandlerRef.current) {
        videoHandlerRef.current.cleanup();
      }
    };
  }, []);

  const initializeVideo = async () => {
    try {
      if (videoHandlerRef.current) {
        const stream = await videoHandlerRef.current.initializeStream();
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }
      }
    } catch (error) {
      console.error("Failed to initialize video:", error);
    }
  };

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, timer]);

  // Load questions based on settings
  const loadQuestions = () => {
    if (settings.category && settings.subcategory && settings.difficulty) {
      const categoryQuestions = interviewQuestions[settings.category as keyof typeof interviewQuestions]
        [settings.subcategory][settings.difficulty];
      setQuestions(categoryQuestions);
      setCurrentQuestion(categoryQuestions[0]);
    }
  };

  // Load questions based on category
  const loadQuestionsByCategory = (category: string) => {
    switch (category) {
      case 'software_development':
        return softwareDevQuestions;
      case 'behavioral':
        return behavioralQuestions;
      case 'system_design':
        return systemDesignQuestions;
      case 'common':
        return commonQuestions;
      default:
        return {};
    }
  };

  const startSimulation = () => {
    loadQuestions();
    setIsSimulationStarted(true);
    setQuestionIndex(0);
    setTimer(settings.duration);
  };

  // Enhanced recording functions
  const startRecording = async () => {
    try {
      if (videoHandlerRef.current) {
        videoHandlerRef.current.startRecording((blob: Blob) => {
          setVideoBlob(blob);
          if (previewVideoRef.current) {
            previewVideoRef.current.src = URL.createObjectURL(blob);
            setVideoPreview(prev => ({
              ...prev,
              isPreviewMode: true
            }));
          }
          generateAIFeedback();
        });
        setIsRecording(true);
      }
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = () => {
    if (videoHandlerRef.current) {
      videoHandlerRef.current.stopRecording();
      setIsRecording(false);
    }
  };

  const generateAIFeedback = () => {
    // Simulate AI feedback generation
    setFeedback({
      confidence: Math.random() * 100,
      clarity: Math.random() * 100,
      technicalAccuracy: Math.random() * 100,
      communicationScore: Math.random() * 100,
      eyeContact: Math.random() * 100,
      posture: Math.random() * 100
    });
    setTranscription("Your response has been analyzed. You provided a comprehensive answer that covered most key points...");
  };

  const downloadRecording = () => {
    if (videoBlob) {
      const url = URL.createObjectURL(videoBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `interview-q${questionIndex + 1}.webm`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setCurrentQuestion(questions[questionIndex + 1]);
      setFeedback(null);
      setTranscription('');
      setTimer(settings.duration);
      setVideoBlob(null);
    }
  };

  // Video preview controls
  const handleVideoTimeUpdate = () => {
    if (previewVideoRef.current) {
      setVideoPreview(prev => ({
        ...prev,
        currentTime: previewVideoRef.current?.currentTime || 0,
        duration: previewVideoRef.current?.duration || 0
      }));
    }
  };

  const handleVolumeChange = (value: number) => {
    setVideoPreview(prev => ({ ...prev, volume: value }));
    if (previewVideoRef.current) {
      previewVideoRef.current.volume = value;
    }
  };

  const handleVideoSeek = (value: number) => {
    if (previewVideoRef.current) {
      previewVideoRef.current.currentTime = value;
    }
  };

  // Render video preview
  const renderVideoPreview = () => {
    if (!videoPreview.isPreviewMode) return null;

    return (
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Recording Preview</h3>
        <video
          ref={previewVideoRef}
          className="w-full rounded-xl"
          controls
          onTimeUpdate={handleVideoTimeUpdate}
        />
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">
              {Math.floor(videoPreview.currentTime / 60)}:
              {Math.floor(videoPreview.currentTime % 60).toString().padStart(2, '0')} /
              {Math.floor(videoPreview.duration / 60)}:
              {Math.floor(videoPreview.duration % 60).toString().padStart(2, '0')}
            </span>
            <input
              type="range"
              min={0}
              max={videoPreview.duration}
              value={videoPreview.currentTime}
              onChange={(e) => handleVideoSeek(Number(e.target.value))}
              className="flex-1 h-2 bg-white/10 rounded-full"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300">Volume</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={videoPreview.volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="flex-1 h-2 bg-white/10 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  };

  // Render follow-up questions
  const renderFollowUpQuestions = () => {
    if (!showFollowUp || !currentQuestion?.followUpQuestions) return null;

    return (
      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
        <h4 className="text-[#fcba28] font-semibold mb-3">Follow-up Questions:</h4>
        <ul className="space-y-2">
          {currentQuestion.followUpQuestions.map((question, index) => (
            <li key={index} className="text-gray-300 flex items-start gap-2">
              <span className="text-[#fcba28]">•</span>
              {question}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-white pt-20 px-4 md:px-8">
      {/* Animated background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-b from-blue-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-[#fcba28]/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {!isSimulationStarted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#fcba28] via-[#fcd978] to-[#fcba28] text-transparent bg-clip-text">
                Professional Interview Simulator
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Practice with our AI-powered interviewer and receive detailed feedback on your performance
              </p>
            </div>

            {/* Settings Panel */}
            <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white/5 border border-white/10">
              <h2 className="text-2xl font-semibold text-[#fcba28] mb-6 flex items-center gap-2">
                <BsGear />
                Interview Configuration
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Category
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-gray-200"
                    value={settings.category}
                    onChange={(e) => setSettings({ ...settings, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Subcategory
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-gray-200"
                    value={settings.subcategory}
                    onChange={(e) => setSettings({ ...settings, subcategory: e.target.value })}
                  >
                    <option value="">Select Subcategory</option>
                    {getSubcategories().map((subcategory) => (
                      <option key={subcategory} value={subcategory}>
                        {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Difficulty
                  </label>
                  <select
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-gray-200"
                    value={settings.difficulty}
                    onChange={(e) => setSettings({ ...settings, difficulty: e.target.value })}
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-300">
                    Answer Duration (seconds)
                  </label>
                  <input
                    type="number"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-gray-200"
                    value={settings.duration}
                    onChange={(e) => setSettings({ ...settings, duration: parseInt(e.target.value) })}
                    min={60}
                    max={600}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startSimulation}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={!settings.category || !settings.subcategory}
                >
                  <FaRobot className="text-xl" />
                  <span>Start Interview</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Panel - Video and Controls */}
            <div className="space-y-6">
              <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                ></video>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-semibold text-[#fcba28] mb-4 flex items-center gap-2">
                  <FaCog />
                  Controls
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                      isRecording
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-[#fcba28] hover:bg-[#e29f1e] text-black'
                    }`}
                  >
                    {isRecording ? (
                      <>
                        <FaStopCircle /> Stop Recording
                      </>
                    ) : (
                      <>
                        <FaMicrophone /> Start Recording
                      </>
                    )}
                  </button>

                  {videoBlob && (
                    <button
                      onClick={downloadRecording}
                      className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-[#1c6bff] hover:bg-[#155bb5] rounded-xl font-medium transition-all duration-300"
                    >
                      <FaDownload /> Download Recording
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[#fcba28] flex items-center gap-2">
                    <FaRegClock />
                    Time Remaining
                  </h3>
                  <span className={`font-mono text-xl ${timer < 30 ? 'text-red-500' : 'text-gray-300'}`}>
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')} /
                    {Math.floor(settings.duration / 60)}:{(settings.duration % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-[#fcba28] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${(timer / settings.duration) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Center Panel - Question and Feedback */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                key={questionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-[#fcba28]">
                    Question {questionIndex + 1} of {questions.length}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-sm">
                    {settings.difficulty}
                  </span>
                </div>
                
                <p className="text-xl text-gray-200 mb-6">
                  {currentQuestion?.question}
                </p>

                <div className="space-y-4">
                  <h4 className="text-[#fcba28] font-semibold">Key Points to Cover:</h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {currentQuestion?.keyPoints.map((point, index) => (
                      <li key={index} className="text-gray-300">{point}</li>
                    ))}
                  </ul>
                </div>

                {feedback && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-8 space-y-6"
                  >
                    <h4 className="flex items-center gap-2 text-[#fcba28] font-semibold">
                      <FaChartBar />
                      Performance Analysis
                    </h4>
                    
                    {Object.entries(feedback).map(([metric, value]) => (
                      <div key={metric}>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300 capitalize">
                            {metric.replace(/([A-Z])/g, ' $1').trim()}
                          </span>
                          <span className="text-[#fcba28]">{Math.round(value)}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${value}%` }}
                            transition={{ duration: 1 }}
                            className="h-full bg-[#fcba28]"
                          />
                        </div>
                      </div>
                    ))}

                    {transcription && (
                      <div className="mt-6 p-4 rounded-xl bg-white/5 border border-[#fcba28]/30">
                        <h4 className="flex items-center gap-2 text-[#fcba28] font-semibold mb-2">
                          <FaRegLightbulb />
                          AI Feedback
                        </h4>
                        <p className="text-gray-300">{transcription}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>

              {feedback && questionIndex < questions.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextQuestion}
                  className="w-full inline-flex items-center justify-center gap-2 py-4 bg-[#1c6bff] hover:bg-[#155bb5] rounded-xl font-semibold transition-all duration-300"
                >
                  Next Question <BsArrowRight />
                </motion.button>
              )}

              {feedback && questionIndex === questions.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 rounded-2xl bg-green-500/20 border border-green-500/30 text-center"
                >
                  <BsCheckCircle className="text-3xl text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Interview Complete!</h3>
                  <p className="text-gray-300 mb-4">
                    You've completed all the questions. Great job!
                  </p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-all duration-300"
                  >
                    Start New Interview
                  </button>
                </motion.div>
              )}
            </div>

            {/* Video Preview */}
            {renderVideoPreview()}

            {/* Follow-up Questions */}
            {renderFollowUpQuestions()}
          </div>
        )}
      </div>
    </div>
  );
}
