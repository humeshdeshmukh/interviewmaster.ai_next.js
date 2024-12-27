"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaReact, FaNodeJs } from 'react-icons/fa';

const SpinningIcons = () => {
  return (
    <div className="flex justify-center items-center h-[200px]">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="flex gap-4"
      >
        <FaGithub className="w-8 h-8" />
        <FaReact className="w-8 h-8 text-blue-400" />
        <FaNodeJs className="w-8 h-8 text-green-600" />
      </motion.div>
    </div>
  );
};

export default SpinningIcons;
