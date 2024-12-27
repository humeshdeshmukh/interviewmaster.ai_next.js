"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaCog, FaBrain, FaSpinner } from 'react-icons/fa';
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
      
      if (data.error) {
        throw new Error(data.error);
      }

      dispatch({ type: 'SET_TESTS', payload: [data.test] });
      dispatch({ type: 'SELECT_TEST', payload: data.test });
      dispatch({ type: 'SET_MODE', payload: 'question' });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to generate test');
      dispatch({
        type: 'SET_ERROR',
        payload: 'Failed to generate test. Please try again.'
      });
    } finally {
      setIsGenerating(false);
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 rounded-lg bg-[#fcba28]/20">
            <FaRobot className="w-6 h-6 text-[#fcba28]" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">AI Test Generator</h3>
            <p className="text-gray-400">Create a custom practice test tailored to your needs</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Topic Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-[#fcba28]"
            >
              <option value="">Select a topic</option>
              {topics.map(topic => (
                <option key={topic.id} value={topic.id}>{topic.name}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`p-3 rounded-lg border transition-all ${
                    selectedDifficulty === difficulty
                      ? 'bg-[#fcba28] text-black border-[#fcba28]'
                      : 'bg-white/5 text-white border-white/10 hover:border-white/20'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Questions */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Questions
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="5"
              value={numberOfQuestions}
              onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center mt-2 text-gray-400">{numberOfQuestions} questions</div>
          </div>

          {/* Specific Concepts */}
          {selectedTopic && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Specific Concepts (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {topics
                  .find(t => t.id === selectedTopic)
                  ?.concepts.map(concept => (
                    <button
                      key={concept}
                      onClick={() => handleConceptToggle(concept)}
                      className={`px-3 py-1 rounded-full text-sm transition-all ${
                        selectedConcepts.includes(concept)
                          ? 'bg-[#fcba28] text-black'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {concept}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!selectedTopic || isGenerating}
            className="w-full py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <FaSpinner className="animate-spin" />
                Generating Test...
              </>
            ) : (
              <>
                <FaBrain />
                Generate Custom Test
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
