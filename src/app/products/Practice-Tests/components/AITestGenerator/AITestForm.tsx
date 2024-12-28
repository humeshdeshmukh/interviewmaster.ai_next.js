"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCog, FaBrain, FaSpinner, FaLightbulb, FaGraduationCap, FaClock, FaCode } from 'react-icons/fa';
import { useTest } from '../../context/TestContext';

const topics = [
  { id: 'javascript', name: 'JavaScript', concepts: ['ES6+', 'Async/Await', 'Closures', 'Prototypes'] },
  { id: 'react', name: 'React', concepts: ['Hooks', 'Context', 'Components', 'State Management'] },
  { id: 'node', name: 'Node.js', concepts: ['Express', 'APIs', 'Authentication', 'Database'] },
  { id: 'python', name: 'Python', concepts: ['OOP', 'Data Structures', 'Algorithms', 'Django'] }
];

const difficulties = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;

export default function AITestForm() {
  const { dispatch } = useTest();
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<typeof difficulties[number]>('Intermediate');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [selectedConcepts, setSelectedConcepts] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConceptToggle = (concept: string) => {
    setSelectedConcepts(prev =>
      prev.includes(concept)
        ? prev.filter(c => c !== concept)
        : [...prev, concept]
    );
  };

  const handleGenerate = async () => {
    if (!selectedTopic) {
      setError('Please select a topic');
      return;
    }

    setIsGenerating(true);
    setError(null);
    dispatch({ type: 'SET_GENERATING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: selectedTopic,
          difficulty: selectedDifficulty,
          numberOfQuestions,
          specificConcepts: selectedConcepts
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate test');
      }

      const data = await response.json();
      dispatch({ type: 'SET_AI_TEST', payload: data });
      dispatch({ type: 'SET_MODE', payload: 'question' });
    } catch (error) {
      setError('Failed to generate test. Please try again.');
      dispatch({ type: 'SET_ERROR', payload: 'Failed to generate test' });
    } finally {
      setIsGenerating(false);
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-gradient-to-r from-[#fcba28]/20 to-[#fcd978]/20">
          <FaRobot className="w-6 h-6 text-[#fcba28]" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-[#fcba28]">AI Test Generator</h3>
          <p className="text-gray-400">Create a custom test tailored to your needs</p>
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleGenerate(); }} className="space-y-6">
        {/* Topic Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <FaCode className="text-[#fcba28]" /> Select Topic
          </label>
          <div className="grid grid-cols-2 gap-2">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                type="button"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  setSelectedConcepts([]);
                }}
                className={`p-3 rounded-xl text-sm text-center transition-all backdrop-blur-sm border ${
                  selectedTopic === topic.id
                    ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-medium border-transparent'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#fcba28]/30'
                }`}
              >
                {topic.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Concepts */}
        {selectedTopic && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-3"
          >
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <FaLightbulb className="text-[#fcba28]" /> Select Concepts
            </label>
            <div className="flex flex-wrap gap-2">
              {topics.find(t => t.id === selectedTopic)?.concepts.map((concept) => (
                <motion.button
                  key={concept}
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConceptToggle(concept)}
                  className={`px-3 py-1 rounded-full text-sm transition-all backdrop-blur-sm border ${
                    selectedConcepts.includes(concept)
                      ? 'bg-[#fcba28]/20 text-[#fcba28] border-[#fcba28]/30'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#fcba28]/30'
                  }`}
                >
                  {concept}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Difficulty */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <FaGraduationCap className="text-[#fcba28]" /> Difficulty Level
          </label>
          <div className="grid grid-cols-2 gap-2">
            {difficulties.map((difficulty) => (
              <motion.button
                key={difficulty}
                type="button"
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`p-3 rounded-xl text-sm text-center transition-all backdrop-blur-sm border ${
                  selectedDifficulty === difficulty
                    ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black font-medium border-transparent'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:border-[#fcba28]/30'
                }`}
              >
                {difficulty}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Number of Questions */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
            <FaClock className="text-[#fcba28]" /> Number of Questions
          </label>
          <input
            type="range"
            min="5"
            max="30"
            step="5"
            value={numberOfQuestions}
            onChange={(e) => setNumberOfQuestions(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#fcba28]"
          />
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">5</span>
            <span className="text-[#fcba28] font-medium">{numberOfQuestions} questions</span>
            <span className="text-gray-400">30</span>
          </div>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm backdrop-blur-sm"
          >
            {error}
          </motion.div>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isGenerating || !selectedTopic}
          className={`w-full py-3 px-4 rounded-xl font-medium transition-all backdrop-blur-sm ${
            isGenerating || !selectedTopic
              ? 'bg-gray-500/50 cursor-not-allowed text-gray-300'
              : 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-black hover:shadow-lg hover:shadow-[#fcba28]/20'
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <FaSpinner className="animate-spin" />
              Generating Test...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <FaBrain />
              Generate Test
            </span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
