'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaKeyboard } from 'react-icons/fa';

interface ResponseInputProps {
  role: string;
  response: string;
  onRoleChange: (role: string) => void;
  onResponseChange: (response: string) => void;
}

export const ResponseInput: React.FC<ResponseInputProps> = ({
  role,
  response,
  onRoleChange,
  onResponseChange
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Target Role</h3>
        <div className="relative">
          <div className="absolute left-4 top-4 text-[#fcba28]">
            <FaBriefcase className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            placeholder="e.g., Senior Software Engineer"
            className="w-full p-4 pl-12 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Your Response</h3>
        <div className="relative">
          <div className="absolute left-4 top-4 text-[#fcba28]">
            <FaKeyboard className="w-5 h-5" />
          </div>
          <motion.div
            initial={false}
            animate={{
              height: response.split('\n').length > 10 ? '400px' : '250px'
            }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <textarea
              value={response}
              onChange={(e) => onResponseChange(e.target.value)}
              placeholder="Paste your interview response here..."
              className="w-full h-full p-4 pl-12 rounded-xl bg-white/5 text-white border border-white/10 focus:border-[#fcba28] focus:outline-none transition-colors resize-none"
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {response.length} characters
            </div>
          </motion.div>
        </div>
        <p className="text-sm text-gray-400">
          Provide as much detail as possible for more accurate feedback
        </p>
      </div>
    </div>
  );
};
