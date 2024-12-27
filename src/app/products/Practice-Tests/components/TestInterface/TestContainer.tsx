"use client";

import { useState, useEffect } from 'react';
import { useTest } from '../../context/TestContext';
import TestQuestion from './TestQuestion';
import TestResults from './TestResults';
import LoadingSpinner from '../LoadingSpinner';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFlag } from 'react-icons/fa';

interface TestProgress {
  answers: { [key: string]: number };
  skipped: string[];
  flagged: string[];
  timeSpent: number;
  startTime: number;
}

export default function TestContainer() {
  const { state, dispatch } = useTest();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState<TestProgress>({
    answers: {},
    skipped: [],
    flagged: [],
    timeSpent: 0,
    startTime: Date.now()
  });
  const [showResults, setShowResults] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (state.selectedTest) {
      setTimeLeft(state.selectedTest.timeLimit * 60);
      setCurrentQuestionIndex(0);
      setProgress({
        answers: {},
        skipped: [],
        flagged: [],
        timeSpent: 0,
        startTime: Date.now()
      });
      setShowResults(false);
      setSelectedAnswer(null);
    }
  }, [state.selectedTest]);

  useEffect(() => {
    if (!showResults && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showResults, timeLeft]);

  if (!state.selectedTest) {
    return <LoadingSpinner />;
  }

  const currentQuestion = state.selectedTest.questions[currentQuestionIndex];
  const totalQuestions = state.selectedTest.questions.length;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setProgress((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [currentQuestion.id]: answerIndex
      }
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(progress.answers[state.selectedTest!.questions[currentQuestionIndex - 1].id] ?? null);
    }
  };

  const handleFlag = () => {
    setProgress((prev) => {
      const newFlagged = prev.flagged.includes(currentQuestion.id)
        ? prev.flagged.filter(id => id !== currentQuestion.id)
        : [...prev.flagged, currentQuestion.id];
      return {
        ...prev,
        flagged: newFlagged
      };
    });
  };

  if (showResults) {
    return (
      <TestResults
        test={state.selectedTest}
        answers={progress.answers}
        timeSpent={Math.floor((Date.now() - progress.startTime) / 1000)}
        onRetry={() => {
          dispatch({ type: 'CLEAR_SELECTED_TEST' });
        }}
      />
    );
  }

  return (
    <div className="pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-[#1e1e1e] rounded-xl p-8 shadow-lg"
      >
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => dispatch({ type: 'CLEAR_SELECTED_TEST' })}
            className="flex items-center text-gray-300 hover:text-[#fcba28] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to Tests
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-gray-300">
              Time: <span className="text-white">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="text-gray-300">
              Progress: <span className="text-white">{currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#fcba28]">Question {currentQuestionIndex + 1}</h2>
            <button
              onClick={handleFlag}
              className={`p-2 rounded-lg transition-colors ${
                progress.flagged.includes(currentQuestion.id)
                  ? "bg-[#fcba28] text-black"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
              title={progress.flagged.includes(currentQuestion.id) ? "Unflag question" : "Flag question for review"}
            >
              <FaFlag />
            </button>
          </div>
          <TestQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswer={handleAnswer}
          />
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
          >
            {currentQuestionIndex < totalQuestions - 1 ? "Next" : "Finish Test"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
