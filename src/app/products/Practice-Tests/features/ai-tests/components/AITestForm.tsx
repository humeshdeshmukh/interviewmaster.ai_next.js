"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const topics = [
  'Data Structures',
  'Algorithms',
  'System Design',
  'Object-Oriented Programming',
  'Database Design',
  'Web Development',
  'Cloud Computing',
  'Machine Learning',
  'Security'
];

const difficulties = [
  { value: 'beginner', label: 'Beginner', description: 'Fundamental concepts and basic problems' },
  { value: 'intermediate', label: 'Intermediate', description: 'Advanced concepts and moderate complexity' },
  { value: 'advanced', label: 'Advanced', description: 'Complex problems and expert-level concepts' }
];

export default function AITestForm() {
  const [formData, setFormData] = useState({
    topics: [] as string[],
    difficulty: '',
    duration: '60',
    questionCount: '10'
  });
  const [loading, setLoading] = useState(false);

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement AI test generation logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
      console.log('Generating test with:', formData);
    } catch (error) {
      console.error('Error generating test:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Topics */}
      <div>
        <label className="block text-lg font-medium text-white mb-4">Select Topics</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {topics.map((topic) => (
            <motion.button
              key={topic}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleTopicToggle(topic)}
              className={`p-3 rounded-xl text-left transition-all ${
                formData.topics.includes(topic)
                  ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-gray-900'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              } border border-white/10`}
            >
              {topic}
            </motion.button>
          ))}
        </div>
        {formData.topics.length === 0 && (
          <p className="mt-2 text-sm text-red-400">Please select at least one topic</p>
        )}
      </div>

      {/* Difficulty */}
      <div>
        <label className="block text-lg font-medium text-white mb-4">Select Difficulty</label>
        <div className="grid md:grid-cols-3 gap-4">
          {difficulties.map((diff) => (
            <motion.button
              key={diff.value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData(prev => ({ ...prev, difficulty: diff.value }))}
              className={`p-4 rounded-xl text-left transition-all ${
                formData.difficulty === diff.value
                  ? 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-gray-900'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              } border border-white/10`}
            >
              <div className="font-medium mb-1">{diff.label}</div>
              <div className="text-sm opacity-80">{diff.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Duration and Question Count */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="duration" className="block text-lg font-medium text-white mb-4">
            Test Duration (minutes)
          </label>
          <select
            id="duration"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#fcba28]"
          >
            <option value="30">30 minutes</option>
            <option value="60">60 minutes</option>
            <option value="90">90 minutes</option>
            <option value="120">120 minutes</option>
          </select>
        </div>

        <div>
          <label htmlFor="questionCount" className="block text-lg font-medium text-white mb-4">
            Number of Questions
          </label>
          <select
            id="questionCount"
            value={formData.questionCount}
            onChange={(e) => setFormData(prev => ({ ...prev, questionCount: e.target.value }))}
            className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#fcba28]"
          >
            <option value="5">5 questions</option>
            <option value="10">10 questions</option>
            <option value="15">15 questions</option>
            <option value="20">20 questions</option>
          </select>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading || formData.topics.length === 0 || !formData.difficulty}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`w-full p-4 rounded-xl text-center font-medium transition-all ${
          loading || formData.topics.length === 0 || !formData.difficulty
            ? 'bg-gray-500/50 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#fcba28] to-[#fcd978] text-gray-900 hover:shadow-lg hover:shadow-[#fcba28]/20'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <FaSpinner className="animate-spin mr-2" />
            Generating Test...
          </span>
        ) : (
          'Generate AI Test'
        )}
      </motion.button>
    </form>
  );
}
