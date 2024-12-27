"use client";

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUpload, FaFileAlt, FaCheck, FaTimes, FaSpinner, FaDownload, FaChartBar, FaLightbulb, FaStar } from 'react-icons/fa';

interface Analysis {
  score: number;
  feedback: {
    strengths: string[];
    improvements: string[];
    keywords: string[];
    formatting: string[];
    content: string[];
  };
  recommendations: {
    skills: string[];
    experience: string[];
    education: string[];
    overall: string[];
  };
}

export default function CVRevisionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile?.type === 'application/pdf' || droppedFile?.type === 'application/msword' || 
        droppedFile?.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      setFile(droppedFile);
      await analyzeCV(droppedFile);
    } else {
      setError('Please upload a PDF or Word document');
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      await analyzeCV(selectedFile);
    }
  };

  const analyzeCV = async (cvFile: File) => {
    setIsAnalyzing(true);
    setError('');
    
    try {
      const formData = new FormData();
      formData.append('file', cvFile);

      const response = await fetch('/api/cv-analysis', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to analyze CV');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      setError('Failed to analyze CV. Please try again.');
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderScoreCard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 p-6 rounded-xl border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-[#fcba28]">CV Score</h3>
        <div className="text-3xl font-bold text-[#fcba28]">{analysis?.score}%</div>
      </div>
      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${analysis?.score}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-[#fcba28]"
        />
      </div>
    </motion.div>
  );

  const renderFeedbackSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Strengths</h3>
        <ul className="space-y-2">
          {analysis?.feedback.strengths.map((strength, index) => (
            <li key={index} className="flex items-center gap-2 text-green-400">
              <FaCheck className="flex-shrink-0" />
              <span className="text-gray-300">{strength}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/5 p-6 rounded-xl border border-white/10"
      >
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Improvements</h3>
        <ul className="space-y-2">
          {analysis?.feedback.improvements.map((improvement, index) => (
            <li key={index} className="flex items-center gap-2 text-yellow-400">
              <FaLightbulb className="flex-shrink-0" />
              <span className="text-gray-300">{improvement}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(analysis?.recommendations || {}).map(([category, items]) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4 capitalize">{category}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-300">
                <FaStar className="flex-shrink-0 text-yellow-400 mt-1" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
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
            CV Revision & Analysis
          </h1>
          <p className="text-xl text-gray-300">
            Get expert analysis and recommendations to improve your CV
          </p>
        </div>

        {!file && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
              isDragging
                ? 'border-[#fcba28] bg-[#fcba28]/10'
                : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx"
              className="hidden"
            />
            
            <FaUpload className="text-4xl text-[#fcba28] mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Drop your CV here</h3>
            <p className="text-gray-400 mb-6">or</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
            >
              Browse Files
            </button>
            <p className="text-sm text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX
            </p>
          </motion.div>
        )}

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaSpinner className="text-4xl text-[#fcba28] mx-auto mb-4 animate-spin" />
            <h3 className="text-xl font-semibold">Analyzing your CV...</h3>
            <p className="text-gray-400 mt-2">This may take a few moments</p>
          </motion.div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center mt-6"
          >
            {error}
          </motion.div>
        )}

        {analysis && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {['overview', 'recommendations', 'detailed analysis'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  {renderScoreCard()}
                  {renderFeedbackSection()}
                </motion.div>
              )}

              {activeTab === 'recommendations' && (
                <motion.div
                  key="recommendations"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  {renderRecommendations()}
                </motion.div>
              )}

              {activeTab === 'detailed analysis' && (
                <motion.div
                  key="detailed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.feedback.keywords.map((keyword, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Formatting</h3>
                    <ul className="space-y-2">
                      {analysis.feedback.formatting.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <FaCheck className="text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Content</h3>
                    <ul className="space-y-2">
                      {analysis.feedback.content.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300">
                          <FaCheck className="text-green-400" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-6 py-3 bg-white/5 text-gray-300 rounded-xl hover:bg-white/10 transition-all duration-300 flex items-center gap-2"
              >
                <FaUpload /> Upload New CV
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 flex items-center gap-2"
              >
                <FaDownload /> Download Analysis
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
