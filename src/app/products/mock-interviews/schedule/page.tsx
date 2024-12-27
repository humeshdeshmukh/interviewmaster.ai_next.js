"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCode,
  FaDollarSign,
  FaSpinner,
  FaCheckCircle,
  FaStar,
  FaGlobe,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import { formatTime, formatDate } from '@/utils/interviewScheduler';
import { ManualBookingForm, timezones, experienceLevels } from '@/utils/manualScheduling';

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

export default function SchedulePage() {
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

  const [schedulingMode, setSchedulingMode] = useState<'instant' | 'manual'>('instant');
  const [manualForm, setManualForm] = useState<ManualBookingForm>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    interviewType: '',
    currentRole: '',
    targetRole: '',
    experience: '',
    specialRequirements: '',
    timezone: ''
  });
  const [manualFormSubmitted, setManualFormSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  useEffect(() => {
    fetchInterviewTypes();
    fetchInterviewers();
  }, []);

  const fetchInterviewTypes = async () => {
    try {
      const response = await fetch('/api/interview-scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getInterviewTypes' })
      });
      const data = await response.json();
      if (data.success) {
        setInterviewTypes(data.interviewTypes);
      }
    } catch (err) {
      setError('Failed to load interview types');
    }
  };

  const fetchInterviewers = async () => {
    try {
      const response = await fetch('/api/interview-scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'getInterviewers' })
      });
      const data = await response.json();
      if (data.success) {
        setInterviewers(data.interviewers);
      }
    } catch (err) {
      setError('Failed to load interviewers');
    }
  };

  const fetchAvailableSlots = async () => {
    if (!selectedInterviewer || !selectedDate) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/interview-scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'getSlots',
          interviewerId: selectedInterviewer.id,
          date: selectedDate
        })
      });
      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.slots);
      }
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
      const response = await fetch('/api/interview-scheduler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bookInterview',
          bookingDetails: {
            interviewerId: selectedInterviewer.id,
            interviewType: selectedType.id,
            dateTime: selectedSlot.startTime,
            timezone: selectedInterviewer.timezone,
            candidateId: 'mock-candidate-id' // In real app, get from auth
          }
        })
      });
      
      const data = await response.json();
      if (data.success) {
        setBookingComplete(true);
        setStep(4);
      } else {
        throw new Error(data.error);
      }
    } catch (err) {
      setError('Failed to book interview. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/manual-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(manualForm)
      });

      const data = await response.json();
      if (data.success) {
        setManualFormSubmitted(true);
        setReferenceNumber(data.reference);
      } else {
        setError(Array.isArray(data.errors) ? data.errors.join(', ') : data.error);
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderInterviewTypes = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {interviewTypes.map(type => (
        <button
          key={type.id}
          onClick={() => {
            setSelectedType(type);
            setStep(2);
          }}
          className={`p-6 rounded-xl text-left transition-all duration-300 ${
            selectedType?.id === type.id
              ? 'bg-[#fcba28] text-black'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{type.name}</h3>
            <div className="flex items-center gap-2">
              <FaDollarSign />
              <span className="font-bold">{type.price}</span>
            </div>
          </div>
          <p className="text-sm mb-4">{type.description}</p>
          <div className="flex items-center gap-2 text-sm">
            <FaClock />
            <span>{type.duration} minutes</span>
          </div>
        </button>
      ))}
    </motion.div>
  );

  const renderInterviewers = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {interviewers.map(interviewer => (
        <button
          key={interviewer.id}
          onClick={() => {
            setSelectedInterviewer(interviewer);
            setStep(3);
          }}
          className={`p-6 rounded-xl text-left transition-all duration-300 ${
            selectedInterviewer?.id === interviewer.id
              ? 'bg-[#fcba28] text-black'
              : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center">
              <FaUser className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{interviewer.name}</h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  <FaStar className="text-yellow-400" />
                  <span className="ml-1">{interviewer.rating}</span>
                </div>
                <span className="text-sm">
                  <FaGlobe className="inline mr-1" />
                  {interviewer.timezone}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {interviewer.expertise.map(skill => (
              <span
                key={skill}
                className="px-2 py-1 text-sm rounded-full bg-white/10"
              >
                {skill}
              </span>
            ))}
          </div>
        </button>
      ))}
    </motion.div>
  );

  const renderDateSelection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="bg-white/5 p-6 rounded-xl">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Select Date</h3>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          className="w-full p-4 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none"
        />
      </div>

      {selectedDate && (
        <div className="bg-white/5 p-6 rounded-xl">
          <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Available Time Slots</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <FaSpinner className="animate-spin text-[#fcba28] w-8 h-8" />
            </div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableSlots.map(slot => (
                <button
                  key={slot.id}
                  onClick={() => {
                    setSelectedSlot(slot);
                    handleBooking();
                  }}
                  className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="text-center">
                    <div className="font-semibold text-[#fcba28]">
                      {formatTime(slot.startTime)}
                    </div>
                    <div className="text-sm text-gray-400">
                      {formatTime(slot.endTime)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 py-8">
              No available slots for this date
            </div>
          )}
        </div>
      )}
    </motion.div>
  );

  const renderConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 p-8 rounded-xl text-center"
    >
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
        <FaCheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-[#fcba28] mb-4">
        Interview Scheduled!
      </h2>
      <p className="text-gray-300 mb-6">
        Your {selectedType?.name} interview is scheduled for{' '}
        {selectedSlot && formatDate(selectedSlot.startTime)} at{' '}
        {selectedSlot && formatTime(selectedSlot.startTime)}
      </p>
      <div className="bg-white/5 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-[#fcba28] mb-2">Interviewer</h3>
        <p className="text-gray-300">{selectedInterviewer?.name}</p>
        <p className="text-sm text-gray-400">Timezone: {selectedInterviewer?.timezone}</p>
      </div>
      <button
        onClick={() => {
          setStep(1);
          setSelectedType(null);
          setSelectedInterviewer(null);
          setSelectedDate('');
          setSelectedSlot(null);
          setBookingComplete(false);
        }}
        className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
      >
        Schedule Another Interview
      </button>
    </motion.div>
  );

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3].map((stepNumber) => (
        <div
          key={stepNumber}
          className="flex items-center"
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= stepNumber ? 'bg-[#fcba28] text-black' : 'bg-white/10 text-gray-400'
            }`}
          >
            {stepNumber}
          </div>
          {stepNumber < 3 && (
            <div
              className={`w-16 h-0.5 ${
                step > stepNumber ? 'bg-[#fcba28]' : 'bg-white/10'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderSchedulingModeSelection = () => (
    <div className="flex gap-4 justify-center mb-12">
      <button
        onClick={() => setSchedulingMode('instant')}
        className={`px-6 py-3 rounded-xl transition-all duration-300 ${
          schedulingMode === 'instant'
            ? 'bg-[#fcba28] text-black'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'
        }`}
      >
        Instant Booking
      </button>
      <button
        onClick={() => setSchedulingMode('manual')}
        className={`px-6 py-3 rounded-xl transition-all duration-300 ${
          schedulingMode === 'manual'
            ? 'bg-[#fcba28] text-black'
            : 'bg-white/5 text-gray-300 hover:bg-white/10'
        }`}
      >
        Manual Scheduling
      </button>
    </div>
  );

  const renderManualForm = () => (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleManualSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Name</label>
          <input
            type="text"
            value={manualForm.name}
            onChange={(e) => setManualForm({ ...manualForm, name: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            value={manualForm.email}
            onChange={(e) => setManualForm({ ...manualForm, email: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Phone</label>
          <input
            type="tel"
            value={manualForm.phone}
            onChange={(e) => setManualForm({ ...manualForm, phone: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Interview Type</label>
          <select
            value={manualForm.interviewType}
            onChange={(e) => setManualForm({ ...manualForm, interviewType: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          >
            <option value="">Select Type</option>
            {interviewTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Preferred Date</label>
          <input
            type="date"
            value={manualForm.preferredDate}
            onChange={(e) => setManualForm({ ...manualForm, preferredDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Preferred Time</label>
          <input
            type="time"
            value={manualForm.preferredTime}
            onChange={(e) => setManualForm({ ...manualForm, preferredTime: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alternate Date</label>
          <input
            type="date"
            value={manualForm.alternateDate}
            onChange={(e) => setManualForm({ ...manualForm, alternateDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Alternate Time</label>
          <input
            type="time"
            value={manualForm.alternateTime}
            onChange={(e) => setManualForm({ ...manualForm, alternateTime: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Current Role</label>
          <input
            type="text"
            value={manualForm.currentRole}
            onChange={(e) => setManualForm({ ...manualForm, currentRole: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Target Role</label>
          <input
            type="text"
            value={manualForm.targetRole}
            onChange={(e) => setManualForm({ ...manualForm, targetRole: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Experience Level</label>
          <select
            value={manualForm.experience}
            onChange={(e) => setManualForm({ ...manualForm, experience: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          >
            <option value="">Select Experience</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Timezone</label>
          <select
            value={manualForm.timezone}
            onChange={(e) => setManualForm({ ...manualForm, timezone: e.target.value })}
            className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
            required
          >
            <option value="">Select Timezone</option>
            {timezones.map(tz => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Special Requirements</label>
        <textarea
          value={manualForm.specialRequirements}
          onChange={(e) => setManualForm({ ...manualForm, specialRequirements: e.target.value })}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-[#fcba28] focus:outline-none"
          rows={4}
          placeholder="Any specific requirements or preferences..."
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isLoading ? (
            <>
              <FaSpinner className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Request'
          )}
        </button>
      </div>
    </motion.form>
  );

  const renderManualConfirmation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white/5 p-8 rounded-xl text-center max-w-2xl mx-auto"
    >
      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
        <FaCheckCircle className="w-8 h-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-[#fcba28] mb-4">
        Request Received!
      </h2>
      <p className="text-gray-300 mb-6">
        Thank you for your interview request. Our team will contact you within 24 hours to confirm your schedule.
      </p>
      <div className="bg-white/5 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-[#fcba28] mb-2">Reference Number</h3>
        <p className="text-gray-300 font-mono">{referenceNumber}</p>
      </div>
      <button
        onClick={() => {
          setManualFormSubmitted(false);
          setManualForm({
            name: '',
            email: '',
            phone: '',
            preferredDate: '',
            preferredTime: '',
            alternateDate: '',
            alternateTime: '',
            interviewType: '',
            currentRole: '',
            targetRole: '',
            experience: '',
            specialRequirements: '',
            timezone: ''
          });
        }}
        className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300"
      >
        Submit Another Request
      </button>
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
            Schedule Mock Interview
          </h1>
          <p className="text-xl text-gray-300">
            Choose your preferred scheduling method
          </p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-center mb-8"
          >
            {error}
          </motion.div>
        )}

        {renderSchedulingModeSelection()}

        <AnimatePresence mode="wait">
          {schedulingMode === 'instant' && !bookingComplete && (
            <>
              {renderStepIndicator()}
              {step === 1 && renderInterviewTypes()}
              {step === 2 && renderInterviewers()}
              {step === 3 && renderDateSelection()}
            </>
          )}
          {schedulingMode === 'instant' && bookingComplete && renderConfirmation()}
          {schedulingMode === 'manual' && !manualFormSubmitted && renderManualForm()}
          {schedulingMode === 'manual' && manualFormSubmitted && renderManualConfirmation()}
        </AnimatePresence>

        {schedulingMode === 'instant' && !bookingComplete && step > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-between"
          >
            <button
              onClick={() => setStep(step - 1)}
              className="px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <FaArrowLeft /> Back
            </button>
            {step < 3 && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !selectedType) ||
                  (step === 2 && !selectedInterviewer)
                }
                className="px-6 py-3 bg-[#fcba28] text-black rounded-xl hover:bg-[#e29f1e] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next <FaArrowRight />
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
