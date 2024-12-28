"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, CheckCircle2, AlertCircle, 
  ArrowRight, Sparkles, RefreshCcw
} from 'lucide-react';
import { Button } from '../../../components/ui';

interface ContentAnalyzerProps {
  content: string;
  onSuggestions?: (suggestions: string[]) => void;
  isLoading?: boolean;
}

interface AnalysisResult {
  score: number;
  issues: {
    type: 'error' | 'warning' | 'info';
    message: string;
  }[];
  suggestions: string[];
  metrics: {
    wordCount: number;
    sentenceCount: number;
    bulletPoints: number;
    actionVerbs: number;
    technicalTerms: number;
  };
}

const mockAnalysis: AnalysisResult = {
  score: 85,
  issues: [
    {
      type: 'warning',
      message: 'Consider starting bullets with strong action verbs'
    },
    {
      type: 'info',
      message: 'Good use of quantifiable achievements'
    }
  ],
  suggestions: [
    'Add more specific metrics and achievements',
    'Include relevant technical skills',
    'Keep bullet points concise and impactful'
  ],
  metrics: {
    wordCount: 150,
    sentenceCount: 8,
    bulletPoints: 5,
    actionVerbs: 3,
    technicalTerms: 4
  }
};

export const ContentAnalyzer = ({ 
  content, 
  onSuggestions,
  isLoading 
}: ContentAnalyzerProps) => {
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API call
    const analyzeContent = async () => {
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysis(mockAnalysis);
      onSuggestions?.(mockAnalysis.suggestions);
    };

    if (content.length > 0) {
      analyzeContent();
    }
  }, [content, onSuggestions]);

  if (!analysis) return null;

  return (
    <div className="space-y-4">
      {/* Score */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-white/10"
              />
              <circle
                cx="32"
                cy="32"
                r="24"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 24}`}
                strokeDashoffset={`${2 * Math.PI * 24 * (1 - analysis.score / 100)}`}
                className="text-[#fcba28] transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">{analysis.score}</span>
            </div>
          </div>
          <div>
            <p className="text-sm">
              {analysis.score >= 80 ? 'Excellent content!' :
               analysis.score >= 60 ? 'Good content with room for improvement' :
               'Needs improvement'}
            </p>
            <p className="text-xs text-white/40">Updated just now</p>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => setShowMetrics(!showMetrics)}
          className="!p-2"
        >
          <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Issues */}
      <div className="space-y-2">
        {analysis.issues.map((issue, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-start gap-2 p-3 rounded-lg ${
              issue.type === 'error' ? 'bg-red-500/10' :
              issue.type === 'warning' ? 'bg-yellow-500/10' :
              'bg-white/5'
            }`}
          >
            {issue.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            ) : issue.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            )}
            <span className="text-sm">{issue.message}</span>
          </motion.div>
        ))}
      </div>

      {/* Metrics */}
      {showMetrics && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white/5 rounded-lg p-4"
        >
          <h4 className="text-sm font-medium mb-3">Content Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-white/60">Word Count</p>
              <p className="text-lg font-medium">{analysis.metrics.wordCount}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Sentences</p>
              <p className="text-lg font-medium">{analysis.metrics.sentenceCount}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Bullet Points</p>
              <p className="text-lg font-medium">{analysis.metrics.bulletPoints}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Action Verbs</p>
              <p className="text-lg font-medium">{analysis.metrics.actionVerbs}</p>
            </div>
            <div>
              <p className="text-sm text-white/60">Technical Terms</p>
              <p className="text-lg font-medium">{analysis.metrics.technicalTerms}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Suggestions */}
      <div>
        <h4 className="text-sm font-medium text-white/60 mb-2">Suggestions</h4>
        <div className="space-y-2">
          {analysis.suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-2"
            >
              <ArrowRight className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="text-sm">{suggestion}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Assist Button */}
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => onSuggestions?.(analysis.suggestions)}
      >
        <Sparkles className="w-4 h-4" />
        Get AI Suggestions
      </Button>
    </div>
  );
};
