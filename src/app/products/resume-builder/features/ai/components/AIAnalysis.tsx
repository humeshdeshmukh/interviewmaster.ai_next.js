"use client";

import { motion } from 'framer-motion';
import { 
  TrendingUp, AlertTriangle, CheckCircle2, Target, 
  Lightbulb, ArrowRight, RefreshCcw
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { AIAnalysis as AIAnalysisType } from '../types';

interface AIAnalysisProps {
  analysis: AIAnalysisType;
  onRefresh: () => void;
  isLoading?: boolean;
}

export const AIAnalysis = ({ analysis, onRefresh, isLoading }: AIAnalysisProps) => {
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
            <p className="text-xs text-white/40">Last updated: Just now</p>
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

      {/* Keyword Analysis */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Target className="w-5 h-5 text-[#fcba28]" />
          Keyword Analysis
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Found Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordMatch.found.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-500/20 text-green-500 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Missing Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {analysis.keywordMatch.missing.map((keyword, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white/5 rounded-xl p-6">
        <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
          <Lightbulb className="w-5 h-5 text-[#fcba28]" />
          AI Suggestions
        </h3>
        <div className="space-y-4">
          {analysis.suggestions.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h4 className="font-medium mb-2">{section.section}</h4>
              <ul className="space-y-2">
                {section.suggestions.map((suggestion, sIndex) => (
                  <li key={sIndex} className="flex items-start gap-2 text-sm text-white/80">
                    <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
                    {suggestion}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
