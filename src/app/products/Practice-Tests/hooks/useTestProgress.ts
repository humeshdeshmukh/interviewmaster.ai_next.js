'use client';
import { useState, useEffect } from 'react';

interface TestProgress {
    testId: string;
    score: number;
    completedAt: string;
    timeSpent: number;
    correctAnswers: number;
    totalQuestions: number;
    answers: Record<string, string>;
}

export const useTestProgress = (testId: string) => {
    const [progress, setProgress] = useState<TestProgress | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProgress = () => {
            try {
                const savedProgress = localStorage.getItem(`test_progress_${testId}`);
                if (savedProgress) {
                    setProgress(JSON.parse(savedProgress));
                }
            } catch (err) {
                setError('Failed to load test progress');
                console.error('Error loading test progress:', err);
            } finally {
                setLoading(false);
            }
        };

        loadProgress();
    }, [testId]);

    const saveProgress = (newProgress: TestProgress) => {
        try {
            localStorage.setItem(`test_progress_${testId}`, JSON.stringify(newProgress));
            setProgress(newProgress);
        } catch (err) {
            setError('Failed to save test progress');
            console.error('Error saving test progress:', err);
        }
    };

    const clearProgress = () => {
        try {
            localStorage.removeItem(`test_progress_${testId}`);
            setProgress(null);
        } catch (err) {
            setError('Failed to clear test progress');
            console.error('Error clearing test progress:', err);
        }
    };

    return {
        progress,
        loading,
        error,
        saveProgress,
        clearProgress,
    };
};

export default useTestProgress;
