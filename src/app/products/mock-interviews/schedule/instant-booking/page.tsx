'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCode,
  FaSpinner,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import { formatTime, formatDate } from '@/utils/interviewScheduler';
import { InterviewTypeSelector } from './components/InterviewTypeSelector';
import { InterviewerSelector } from './components/InterviewerSelector';
import { TimeSlotSelector } from './components/TimeSlotSelector';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Interviewer {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  timezone: string;
}

interface InterviewType {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

export default function InstantBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<InterviewType | null>(null);
  const [selectedInterviewer, setSelectedInterviewer] = useState<Interviewer | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [interviewTypes, setInterviewTypes] = useState<InterviewType[]>([]);
  const [interviewers, setInterviewers] = useState<Interviewer[]>([]);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  useEffect(() => {
    fetchInterviewTypes();
    fetchInterviewers();
  }, []);

  const fetchInterviewTypes = async () => {
    // Temporary mock data
    setInterviewTypes([
      {
        id: '1',
        name: 'Technical Interview',
        duration: 60,
        price: 99,
        description: 'In-depth technical assessment with coding challenges'
      },
      {
        id: '2',
        name: 'System Design',
        duration: 90,
        price: 149,
        description: 'Architecture and system design discussion'
      },
      {
        id: '3',
        name: 'Behavioral Interview',
        duration: 45,
        price: 79,
        description: 'Focus on soft skills and past experiences'
      }
    ]);
  };

  const fetchInterviewers = async () => {
    // Temporary mock data
    setInterviewers([
      {
        id: '1',
        name: 'John Smith',
        expertise: ['JavaScript', 'React', 'Node.js'],
        rating: 4.9,
        timezone: 'EST'
      },
      {
        id: '2',
        name: 'Sarah Johnson',
        expertise: ['System Design', 'Java', 'Cloud Architecture'],
        rating: 4.8,
        timezone: 'PST'
      },
      {
        id: '3',
        name: 'Michael Chen',
        expertise: ['Python', 'Machine Learning', 'Data Structures'],
        rating: 4.7,
        timezone: 'GMT'
      }
    ]);
  };

  const fetchAvailableSlots = async () => {
    if (!selectedInterviewer || !selectedDate) return;
    
    setIsLoading(true);
    try {
      // Temporary mock data
      const mockSlots = Array.from({ length: 8 }, (_, i) => ({
        id: `slot-${i}`,
        startTime: new Date(selectedDate + 'T' + (9 + i) + ':00:00').toISOString(),
        endTime: new Date(selectedDate + 'T' + (10 + i) + ':00:00').toISOString(),
        isAvailable: Math.random() > 0.3
      }));
      setAvailableSlots(mockSlots);
    } catch (err) {
      setError('Failed to load available slots');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedInterviewer && selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedInterviewer, selectedDate]);

  const handleBooking = async () => {
    if (!selectedType || !selectedInterviewer || !selectedSlot) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBookingComplete(true);
    } catch (err) {
      setError('Failed to book interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/products/mock-interviews/schedule" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-200"
          >
            <FaArrowLeft className="w-5 h-5 mr-2" />
            Back to Schedule Options
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block p-4 rounded-full bg-[#fcba28]/20 mb-6"
          >
            <FaCalendarAlt className="w-8 h-8 text-[#fcba28]" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
          >
            Instant Interview Booking
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-8"
          >
            Book your interview session instantly with our expert interviewers
          </motion.p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= stepNumber
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/10 text-white'
                  }`}
                >
                  {step > stepNumber ? (
                    <FaCheckCircle className="w-5 h-5" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      step > stepNumber ? 'bg-[#fcba28]' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center">
              {error}
            </div>
          )}

          {/* Step Content */}
          <div className="space-y-8">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Select Interview Type</h2>
                <InterviewTypeSelector
                  interviewTypes={interviewTypes}
                  selectedType={selectedType}
                  onSelect={(type) => {
                    setSelectedType(type);
                    setStep(2);
                  }}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Choose Your Interviewer</h2>
                <InterviewerSelector
                  interviewers={interviewers}
                  selectedInterviewer={selectedInterviewer}
                  onSelect={(interviewer) => {
                    setSelectedInterviewer(interviewer);
                    setStep(3);
                  }}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Select Time Slot</h2>
                <TimeSlotSelector
                  availableSlots={availableSlots}
                  selectedSlot={selectedSlot}
                  selectedDate={selectedDate}
                  onSelectSlot={(slot) => {
                    setSelectedSlot(slot);
                    setStep(4);
                  }}
                  onSelectDate={setSelectedDate}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                {bookingComplete ? (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto bg-[#fcba28]/20 rounded-full flex items-center justify-center mb-6">
                      <FaCheckCircle className="w-8 h-8 text-[#fcba28]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Booking Confirmed!</h2>
                    <p className="text-gray-400 mb-8">
                      Your interview has been scheduled successfully. Check your email for details.
                    </p>
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200"
                    >
                      View My Interviews
                      <FaArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                ) : (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Confirm Booking</h2>
                    {selectedType && selectedInterviewer && selectedSlot && (
                      <div className="space-y-4 text-left mb-8">
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FaCode className="w-5 h-5 text-[#fcba28]" />
                            <span className="text-white">{selectedType.name}</span>
                          </div>
                          <span className="text-[#fcba28]">${selectedType.price}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FaUser className="w-5 h-5 text-[#fcba28]" />
                            <span className="text-white">{selectedInterviewer.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaStar className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-white">{selectedInterviewer.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                          <div className="flex items-center gap-3">
                            <FaClock className="w-5 h-5 text-[#fcba28]" />
                            <div className="text-white">
                              <div>{formatDate(selectedDate)}</div>
                              <div className="text-sm text-gray-400">
                                {formatTime(selectedSlot.startTime)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaGlobe className="w-4 h-4 text-[#fcba28]" />
                            <span className="text-white">{selectedInterviewer.timezone}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <button
                      onClick={handleBooking}
                      disabled={isLoading}
                      className="w-full px-6 py-3 bg-[#fcba28] text-black rounded-lg hover:bg-[#fcd978] transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <FaArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Navigation Buttons */}
          {!bookingComplete && step > 1 && (
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors duration-200 flex items-center gap-2"
              >
                <FaArrowLeft className="w-4 h-4" />
                Previous
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
