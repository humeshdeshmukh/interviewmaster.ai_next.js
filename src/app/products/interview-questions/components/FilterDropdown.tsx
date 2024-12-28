'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

interface FilterDropdownProps {
  label: string;
  value: string;
  options: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onChange: (value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  value,
  options,
  isOpen,
  setIsOpen,
  onChange,
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:border-[#fcba28] transition-colors min-w-[140px]"
      >
        <span className="flex-1 text-left">
          <span className="block text-xs text-gray-400">{label}</span>
          <span className="block truncate">{value}</span>
        </span>
        <FaChevronDown
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 py-2 bg-[#1a1a1a] rounded-lg border border-white/10 shadow-xl"
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-2 text-left hover:bg-white/5 transition-colors ${
                  value === option ? 'text-[#fcba28]' : 'text-white'
                }`}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
