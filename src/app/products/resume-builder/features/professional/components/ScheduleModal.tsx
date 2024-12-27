"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, Clock, UserSquare2, ArrowRight } from 'lucide-react';
import { Button } from '../../../components/ui';

interface Writer {
  id: string;
  name: string;
  title: string;
  packages: {
    [key: string]: {
      name: string;
      price: number;
      turnaround: string;
      isPopular: boolean;
    };
  };
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  writer: Writer;
}

const ScheduleModal = ({ isOpen, onClose, writer }: ScheduleModalProps) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  // Generate next 7 days
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const availableTimes = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 rounded-xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Schedule Consultation</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Writer Info */}
        <div className="p-6 border-b border-white/10">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">{writer.name}</h4>
            <p className="text-sm text-white/60">{writer.title}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Package Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Select Package</label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(writer.packages).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPackage(key)}
                  className={`p-4 rounded-lg text-sm transition-all relative ${
                    selectedPackage === key
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {pkg.isPopular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-[#fcba28]/20 text-[#fcba28] px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                  <span className="block font-medium mb-1">{pkg.name}</span>
                  <span className="block text-lg font-semibold">${pkg.price}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Select Date</label>
            <div className="grid grid-cols-4 gap-2">
              {availableDates.map((date) => (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`p-3 rounded-lg text-sm transition-colors ${
                    selectedDate === date
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {formatDate(date)}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Select Time</label>
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg text-sm transition-colors ${
                    selectedTime === time
                      ? 'bg-[#fcba28] text-black'
                      : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <Button
            variant="primary"
            className="w-full"
            onClick={() => {
              // Handle booking logic here
              onClose();
            }}
            disabled={!selectedDate || !selectedTime || !selectedPackage}
          >
            Confirm Booking
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <p className="text-sm text-white/60 text-center mt-4">
            You can reschedule or cancel your appointment up to 24 hours before the scheduled time.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default ScheduleModal;
