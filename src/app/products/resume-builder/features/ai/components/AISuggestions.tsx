"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, MessageSquare, Check, X, ChevronRight,
  AlertTriangle, ThumbsUp, Lightbulb, Copy
} from 'lucide-react';
import { Button } from '../../../components/ui';
import type { AIAssistResponse } from '../types';

interface AISuggestionsProps {
  suggestions: AIAssistResponse;
  onApply: (content: any) => void;
  onDismiss: () => void;
  isVisible: boolean;
}

export const AISuggestions = ({ 
  suggestions, 
  onApply, 
  onDismiss,
  isVisible 
}: AISuggestionsProps) => {
  const [selectedSuggestion, setSelectedSuggestion] = useState<number | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 right-0 m-6 w-96 bg-gray-900 rounded-lg shadow-xl border border-white/10 overflow-hidden"
        >
          {/* Header */}
          <div className="px-4 py-3 bg-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#fcba28]" />
              <h3 className="font-medium">AI Suggestions</h3>
            </div>
            <button
              onClick={onDismiss}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 max-h-[60vh] overflow-y-auto">
            {/* Improvements */}
            {suggestions.improvements.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/60 mb-2">Suggested Improvements</h4>
                <div className="space-y-2">
                  {suggestions.improvements.map((improvement, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm bg-white/5 p-3 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{improvement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Examples */}
            {suggestions.examples.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/60 mb-2">Examples</h4>
                <div className="space-y-2">
                  {suggestions.examples.map((example, index) => (
                    <div
                      key={index}
                      className="group relative flex items-start gap-2 text-sm bg-white/5 p-3 rounded-lg"
                    >
                      <Lightbulb className="w-4 h-4 text-[#fcba28] shrink-0 mt-0.5" />
                      <span>{example}</span>
                      <button
                        onClick={() => handleCopy(example, index)}
                        className="absolute right-2 top-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded transition-all"
                      >
                        {copiedIndex === index ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            {suggestions.keywords.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/60 mb-2">Recommended Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/5 text-sm rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Formatting Issues */}
            {suggestions.formatting.issues.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-white/60 mb-2">Formatting Issues</h4>
                <div className="space-y-2">
                  {suggestions.formatting.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm bg-white/5 p-3 rounded-lg"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Generated Content */}
            {suggestions.generatedContent && (
              <div>
                <h4 className="text-sm font-medium text-white/60 mb-2">AI Generated Content</h4>
                <div className="space-y-2">
                  {Array.isArray(suggestions.generatedContent) ? (
                    suggestions.generatedContent.map((content, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSuggestion(index)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedSuggestion === index
                            ? 'bg-[#fcba28] text-black'
                            : 'bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Version {index + 1}</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                        <p className="mt-1 text-sm opacity-80">{content}</p>
                      </button>
                    ))
                  ) : (
                    <div className="bg-white/5 p-3 rounded-lg">
                      <p className="text-sm">{suggestions.generatedContent}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-4 py-3 bg-white/5 flex items-center justify-between">
            <Button
              variant="secondary"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                if (Array.isArray(suggestions.generatedContent) && selectedSuggestion !== null) {
                  onApply(suggestions.generatedContent[selectedSuggestion]);
                } else if (suggestions.generatedContent) {
                  onApply(suggestions.generatedContent);
                }
              }}
              disabled={!suggestions.generatedContent}
            >
              Apply Changes
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
