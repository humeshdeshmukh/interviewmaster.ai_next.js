'use client';
import React, { useEffect, useState } from 'react';

interface TimerProps {
    duration: number; // in seconds
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);

    useEffect(() => {
        if (timeLeft === 0) {
            onTimeUp();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const getColorClass = () => {
        if (timeLeft <= 60) return 'text-red-500';
        if (timeLeft <= 180) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-lg p-4">
            <div className="text-2xl font-bold tracking-wider">
                <span className={getColorClass()}>{formatTime(timeLeft)}</span>
            </div>
        </div>
    );
};

export default Timer;
