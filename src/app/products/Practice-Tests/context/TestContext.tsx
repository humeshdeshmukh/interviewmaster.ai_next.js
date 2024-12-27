"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Test, Question } from '../utils/testLoader';

interface TestState {
  mode: 'categories' | 'tests' | 'question' | 'results';
  tests: Test[];
  selectedTest: Test | null;
  currentQuestion: number;
  userAnswers: { [key: string]: number };
  timeRemaining: number;
  isGenerating: boolean;
  error: string | null;
}

type TestAction =
  | { type: 'SET_TESTS'; payload: Test[] }
  | { type: 'SELECT_TEST'; payload: Test }
  | { type: 'SET_MODE'; payload: TestState['mode'] }
  | { type: 'ANSWER_QUESTION'; payload: { questionId: string; answer: number } }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'RESET_TEST' }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_SELECTED_TEST' };

const initialState: TestState = {
  mode: 'categories',
  tests: [],
  selectedTest: null,
  currentQuestion: 0,
  userAnswers: {},
  timeRemaining: 0,
  isGenerating: false,
  error: null
};

function testReducer(state: TestState, action: TestAction): TestState {
  switch (action.type) {
    case 'SET_TESTS':
      return {
        ...state,
        tests: action.payload,
        mode: 'tests'
      };

    case 'SELECT_TEST':
      return {
        ...state,
        selectedTest: action.payload,
        currentQuestion: 0,
        userAnswers: {},
        timeRemaining: action.payload.timeLimit * 60,
        mode: 'question'
      };

    case 'SET_MODE':
      return {
        ...state,
        mode: action.payload
      };

    case 'ANSWER_QUESTION':
      return {
        ...state,
        userAnswers: {
          ...state.userAnswers,
          [action.payload.questionId]: action.payload.answer
        }
      };

    case 'NEXT_QUESTION':
      if (!state.selectedTest) return state;
      return {
        ...state,
        currentQuestion: Math.min(
          state.currentQuestion + 1,
          state.selectedTest.questions.length - 1
        )
      };

    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestion: Math.max(state.currentQuestion - 1, 0)
      };

    case 'UPDATE_TIME':
      if (action.payload <= 0) {
        return {
          ...state,
          timeRemaining: 0,
          mode: 'results'
        };
      }
      return {
        ...state,
        timeRemaining: action.payload
      };

    case 'RESET_TEST':
      return {
        ...state,
        currentQuestion: 0,
        userAnswers: {},
        timeRemaining: state.selectedTest ? state.selectedTest.timeLimit * 60 : 0,
        mode: 'question'
      };

    case 'SET_GENERATING':
      return {
        ...state,
        isGenerating: action.payload
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };

    case 'CLEAR_SELECTED_TEST':
      return {
        ...state,
        selectedTest: null,
        currentQuestion: 0,
        userAnswers: {},
        timeRemaining: 0
      };

    default:
      return state;
  }
}

const TestContext = createContext<{
  state: TestState;
  dispatch: React.Dispatch<TestAction>;
} | null>(null);

export function TestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(testReducer, initialState);

  return (
    <TestContext.Provider value={{ state, dispatch }}>
      {children}
    </TestContext.Provider>
  );
}

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error('useTest must be used within a TestProvider');
  }
  return context;
}
