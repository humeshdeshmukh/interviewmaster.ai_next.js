'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Mic, Play, Pause, RefreshCw, Download, Settings, Video } from 'lucide-react';

interface VideoRecorderProps {
  onRecordingComplete?: (blob: Blob) => void;
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const recorder = new MediaRecorder(mediaStream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        if (onRecordingComplete) {
          onRecordingComplete(blob);
        }
      };

    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const startRecording = () => {
    if (mediaRecorder && !isRecording) {
      mediaRecorder.start(1000);
      setIsRecording(true);
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setDuration(0);
    }
  };

  const resetRecording = () => {
    setRecordedChunks([]);
    setDuration(0);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    startCamera();
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg">
      <div className="relative">
        <div className="aspect-video rounded-lg overflow-hidden bg-black/50 mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {/* Recording indicator */}
          {isRecording && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-1 rounded-full text-sm">
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              {formatDuration(duration)}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          {!isRecording ? (
            <button
              onClick={() => {
                if (!stream) startCamera();
                startRecording();
              }}
              className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Start Recording
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  onClick={resumeRecording}
                  className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Resume
                </button>
              ) : (
                <button
                  onClick={pauseRecording}
                  className="px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 font-medium flex items-center gap-2"
                >
                  <Pause className="w-5 h-5" />
                  Pause
                </button>
              )}
              <button
                onClick={stopRecording}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Stop
              </button>
            </>
          )}
          <button
            onClick={resetRecording}
            className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 font-medium flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
