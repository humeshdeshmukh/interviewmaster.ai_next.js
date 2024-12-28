'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBriefcase, FaLightbulb } from 'react-icons/fa';

interface ResponseType {
  id: string;
  name: string;
  icon: any;
  description: string;
}

const responseTypes: ResponseType[] = [
  {
    id: 'technical',
    name: 'Technical',
    icon: FaCode,
    description: 'Coding, algorithms, and technical problem-solving'
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    icon: FaBriefcase,
    description: 'Past experiences, soft skills, and situational responses'
  },
  {
    id: 'system-design',
    name: 'System Design',
    icon: FaLightbulb,
    description: 'Architecture, scalability, and system components'
  }
];

interface ResponseTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export const ResponseTypeSelector: React.FC<ResponseTypeSelectorProps> = ({
  selectedType,
  onSelect
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-[#fcba28] mb-4">Response Type</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {responseTypes.map(type => {
          const Icon = type.icon;
          return (
            <motion.button
              key={type.id}
              onClick={() => onSelect(type.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-6 rounded-xl text-center transition-all duration-300 ${
                selectedType === type.id
                  ? 'bg-gradient-to-br from-[#fcba28] to-[#fcd978] text-black shadow-lg shadow-[#fcba28]/20'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-semibold text-lg mb-2">{type.name}</h4>
              <p className="text-sm opacity-80">{type.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
