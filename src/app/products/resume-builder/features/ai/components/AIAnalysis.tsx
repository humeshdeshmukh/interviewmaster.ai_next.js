"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, Target, 
  Lightbulb, ArrowRight, RefreshCcw, FileText,
  Brain, Eye, Zap, BarChart4
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { AIAnalysis as AIAnalysisType } from '../types';

interface AIAnalysisProps {
  analysis: AIAnalysisType;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const AIAnalysis = ({ analysis, onRefresh, isLoading }: AIAnalysisProps) => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'ats' | 'impact' | 'industry'
  >('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FileText },
    { id: 'ats', label: 'ATS', icon: Brain },
    { id: 'impact', label: 'Impact', icon: Zap },
    { id: 'industry', label: 'Industry', icon: BarChart4 }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Score */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Resume Score</h3>
                <Button
                  variant="secondary"
                  onClick={onRefresh}
                  className="!p-2"
                  disabled={isLoading}
                >
                  <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysis.score / 100)}`}
                      className="text-[#fcba28] transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analysis.score}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">
                    Your resume is {analysis.score >= 80 ? 'excellent' :
                      analysis.score >= 60 ? 'good' :
                      analysis.score >= 40 ? 'fair' : 'needs improvement'}
                  </p>
                  <p className="text-xs text-white/40">Last updated: {analysis.lastUpdated}</p>
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <TrendingUp className="w-5 h-5 text-green-500" />
                Strengths
              </h3>
              <ul className="space-y-2">
                {analysis.strengths.map((strength, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                    <span>{strength}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2">
                {analysis.improvements.map((improvement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2"
                  >
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <span>{improvement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'ats':
        return (
          <div className="space-y-6">
            {/* ATS Score */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">ATS Optimization Score</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysis.atsOptimization.score / 100)}`}
                      className="text-[#fcba28] transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analysis.atsOptimization.score}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">
                    Your resume's ATS compatibility is {
                      analysis.atsOptimization.score >= 80 ? 'excellent' :
                      analysis.atsOptimization.score >= 60 ? 'good' :
                      'needs improvement'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Format Issues */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Format Issues</h3>
              <ul className="space-y-2">
                {analysis.atsOptimization.format.issues.map((issue, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Content Issues */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Content Issues</h3>
              <ul className="space-y-2">
                {analysis.atsOptimization.content.issues.map((issue, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 text-sm"
                  >
                    <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                    <span>{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="space-y-6">
            {/* Impact Score */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Impact Score</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysis.impact.score / 100)}`}
                      className="text-[#fcba28] transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analysis.impact.score}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">
                    Your resume's impact strength is {
                      analysis.impact.score >= 80 ? 'excellent' :
                      analysis.impact.score >= 60 ? 'good' :
                      'needs improvement'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Strong Phrases */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Strong Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.impact.strongPhrases.map((phrase, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>

            {/* Weak Phrases */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Weak Phrases</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.impact.weakPhrases.map((phrase, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm"
                  >
                    {phrase}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'industry':
        return (
          <div className="space-y-6">
            {/* Industry Fit */}
            <div className="bg-white/5 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Industry Fit</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      className="text-white/10"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="36"
                      stroke="currentColor"
                      strokeWidth="6"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 36}`}
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - analysis.industryFit.score / 100)}`}
                      className="text-[#fcba28] transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{analysis.industryFit.score}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-white/60">
                    Your resume's fit for {analysis.industryFit.targetIndustry} is {
                      analysis.industryFit.score >= 80 ? 'excellent' :
                      analysis.industryFit.score >= 60 ? 'good' :
                      'needs improvement'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Matching Skills */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Matching Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.industryFit.matchingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Missing Skills</h3>
              <div className="flex flex-wrap gap-2">
                {analysis.industryFit.missingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex items-center gap-2 p-1 bg-white/5 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === tab.id
                ? 'bg-[#fcba28] text-black'
                : 'hover:bg-white/10'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
