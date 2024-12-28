'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Camera, ArrowLeft } from 'lucide-react';
import { VideoRecorder } from './components/VideoRecorder';
import { QuestionPrompt } from './components/QuestionPrompt';
import { FeedbackPanel } from './components/FeedbackPanel';

export default function PracticePage() {
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);

  const handleRecordingComplete = (blob: Blob) => {
    setRecordedBlob(blob);
    // Here you would typically upload the blob to your server
    // and get AI feedback
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/products/mock-interviews/visual-simulation" className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Main
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <Camera className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Practice Mode
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Record yourself answering interview questions and get AI-powered feedback
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Question Prompt */}
          <div className="lg:col-span-1">
            <QuestionPrompt />
          </div>

          {/* Middle Column - Video Recorder */}
          <div className="lg:col-span-1">
            <VideoRecorder onRecordingComplete={handleRecordingComplete} />
          </div>

          {/* Right Column - Feedback */}
          <div className="lg:col-span-1">
            <FeedbackPanel />
          </div>
        </div>
      </div>
    </div>
  );
}
