'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaBrain, FaChartLine, FaPlus, FaTrash, FaStar, FaGraduationCap, FaSpinner } from 'react-icons/fa';
import { skillCategories, experienceLevels, proficiencyLevels, assessmentTypes, skillMetrics } from './constants/skills';
import { SkillAnalyzer, type SkillAssessment, type AnalysisResult } from './services/skill-analyzer';
import { theme } from './constants/theme';

export default function SkillsAnalyzer() {
  const [activeTab, setActiveTab] = useState<'input' | 'analysis'>('input');
  const [selectedMode, setSelectedMode] = useState<'quick' | 'detailed' | 'ai'>('quick');
  const [skills, setSkills] = useState<SkillAssessment[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const addSkill = () => {
    setSkills([
      ...skills,
      {
        skillId: '',
        proficiencyLevel: 1,
        yearsOfExperience: 0,
        lastUsed: new Date().toISOString().split('T')[0],
        confidenceLevel: 1,
        projects: []
      }
    ]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, updates: Partial<SkillAssessment>) => {
    setSkills(
      skills.map((skill, i) => (i === index ? { ...skill, ...updates } : skill))
    );
  };

  const analyzeSkills = async () => {
    setIsLoading(true);
    try {
      if (selectedMode === 'ai') {
        // AI-powered analysis would go here
        // For now, we'll use the standard analyzer
        const analyzer = new SkillAnalyzer();
        const result = analyzer.analyzeSkills(skills);
        setAnalysisResult(result);
      } else {
        const analyzer = new SkillAnalyzer();
        const result = analyzer.analyzeSkills(skills);
        setAnalysisResult(result);
      }
      setActiveTab('analysis');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSkillInput = (skill: SkillAssessment, index: number) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[#fcba28]">Skill {index + 1}</h3>
        <button
          onClick={() => removeSkill(index)}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <FaTrash />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Skill Category & Name
          </label>
          <select
            value={skill.skillId}
            onChange={(e) => updateSkill(index, { skillId: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
          >
            <option value="">Select a skill</option>
            {skillCategories.map((category) => (
              <optgroup key={category.id} label={category.name}>
                {category.topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            max="30"
            value={skill.yearsOfExperience}
            onChange={(e) =>
              updateSkill(index, { yearsOfExperience: Number(e.target.value) })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Proficiency Level
          </label>
          <select
            value={skill.proficiencyLevel}
            onChange={(e) =>
              updateSkill(index, { proficiencyLevel: Number(e.target.value) })
            }
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
          >
            {proficiencyLevels.map((level) => (
              <option key={level.id} value={level.id}>
                {level.name} - {level.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Used
          </label>
          <input
            type="date"
            value={skill.lastUsed}
            onChange={(e) => updateSkill(index, { lastUsed: e.target.value })}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
          />
        </div>

        {selectedMode === 'detailed' && (
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Related Projects (comma-separated)
            </label>
            <input
              type="text"
              value={skill.projects?.join(', ') || ''}
              onChange={(e) =>
                updateSkill(index, {
                  projects: e.target.value.split(',').map((s) => s.trim())
                })
              }
              placeholder="Project1, Project2, Project3"
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-[#fcba28] focus:outline-none transition-colors"
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  const renderAnalysis = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Overall Score */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-[#fcba28]">Overall Score</h3>
          <div className="text-3xl font-bold text-[#fcba28]">
            {Math.round(analysisResult?.overallScore || 0)}/100
          </div>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${analysisResult?.overallScore || 0}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-[#fcba28]"
          />
        </div>
      </div>

      {/* Category Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(analysisResult?.categoryScores || {}).map(
          ([category, score]) => {
            const categoryInfo = skillCategories.find((c) => c.id === category);
            return (
              <div
                key={category}
                className="bg-white/5 p-6 rounded-xl border border-white/10"
              >
                <h3 className="text-lg font-semibold text-[#fcba28] mb-4">
                  {categoryInfo?.name || category}
                </h3>
                <div className="text-2xl font-bold text-white">
                  {Math.round(score)}/100
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Strengths and Areas for Improvement */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">Strengths</h3>
          <ul className="space-y-2">
            {analysisResult?.strengths.map((strength, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaStar className="text-yellow-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">
            Areas for Improvement
          </h3>
          <ul className="space-y-2">
            {analysisResult?.areasForImprovement.map((area, index) => (
              <li key={index} className="flex items-start gap-2">
                <FaGraduationCap className="text-blue-400 flex-shrink-0 mt-1" />
                <span className="text-gray-300">{area}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">
            Market Relevance
          </h3>
          <div className="text-2xl font-bold text-white mb-2">
            {Math.round(analysisResult?.marketRelevance || 0)}%
          </div>
          <p className="text-gray-300">
            Based on current industry demand and trends
          </p>
        </div>
        <div className="bg-white/5 p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-semibold text-[#fcba28] mb-4">
            Growth Potential
          </h3>
          <div className="text-2xl font-bold text-white mb-2">
            {Math.round(analysisResult?.growthPotential || 0)}%
          </div>
          <p className="text-gray-300">
            Opportunities for skill development and career growth
          </p>
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-6">
          Recommended Learning Path
        </h3>
        <div className="space-y-4">
          {analysisResult?.learningPath.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 p-4 rounded-lg border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-white">{item.skill}</h4>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.priority === 'high'
                      ? 'bg-red-500/20 text-red-400'
                      : item.priority === 'medium'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {item.priority} priority
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                Estimated time: {item.timeEstimate}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                {item.resources.map((resource, i) => (
                  <li key={i}>{resource}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          onClick={() => {
            setActiveTab('input');
            setAnalysisResult(null);
          }}
          className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
        >
          <FaPlus /> New Analysis
        </button>
      </div>
    </motion.div>
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
            Skills Analyzer
          </h1>
          <p className="text-xl text-gray-300">
            Analyze your skills and get personalized recommendations
          </p>
        </div>

        {activeTab === 'input' && (
          <div className="space-y-8">
            {/* Analysis Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assessmentTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedMode(type.id as 'quick' | 'detailed' | 'ai')}
                  className={`p-6 rounded-xl text-center transition-all duration-300 ${
                    selectedMode === type.id
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-background/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm opacity-80">{type.description}</p>
                  <p className="text-xs mt-2 opacity-60">{type.duration}</p>
                </button>
              ))}
            </div>

            {/* Skills Input */}
            <div className="space-y-4">
              <AnimatePresence>
                {skills.map((skill, index) => renderSkillInput(skill, index))}
              </AnimatePresence>

              <button
                onClick={addSkill}
                className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 text-white/60 hover:border-[#fcba28] hover:text-[#fcba28] transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus /> Add Skill
              </button>
            </div>

            {/* Analysis Button */}
            <div className="flex justify-end">
              <button
                onClick={analyzeSkills}
                disabled={skills.length === 0 || isLoading}
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    {selectedMode === 'ai' ? <FaBrain /> : <FaChartLine />}{' '}
                    Analyze Skills
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'analysis' && analysisResult && renderAnalysis()}
      </div>
    </div>
  );
}
