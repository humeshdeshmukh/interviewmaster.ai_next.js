'use client';
import { useState, useEffect, useCallback } from 'react';

interface UseTimerProps {
    initialTime: number;
    onTimeUp?: () => void;
}

export const useTimer = ({ initialTime, onTimeUp }: UseTimerProps) => {
    const [time, setTime] = useState(initialTime);
    const [isRunning, setIsRunning] = useState(false);
    const [timeSpent, setTimeSpent] = useState(0);

    const start = useCallback(() => {
        setIsRunning(true);
    }, []);

    const pause = useCallback(() => {
        setIsRunning(false);
    }, []);

    const reset = useCallback(() => {
        setTime(initialTime);
        setIsRunning(false);
        setTimeSpent(0);
    }, [initialTime]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime <= 1) {
                        setIsRunning(false);
                        onTimeUp?.();
                        return 0;
                    }
                    return prevTime - 1;
                });
                setTimeSpent((prev) => prev + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, time, onTimeUp]);

    return {
        time,
        isRunning,
        timeSpent,
        start,
        pause,
        reset,
    };
};

export default useTimer;
