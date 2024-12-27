"use client";

import { motion } from 'framer-motion';
import { FaLinkedin, FaTwitter, FaGithub, FaUserTie, FaChartLine } from 'react-icons/fa';

const iconVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
  hover: { scale: 1.2, rotate: 360, transition: { duration: 0.5 } }
};

const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function SpinningIcons() {
  const icons = [
    { Icon: FaLinkedin, color: '#0077B5' },
    { Icon: FaTwitter, color: '#1DA1F2' },
    { Icon: FaGithub, color: '#333' },
    { Icon: FaUserTie, color: '#fcba28' },
    { Icon: FaChartLine, color: '#28a745' }
  ];

  return (
    <motion.div
      className="flex justify-center items-center gap-8"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {icons.map(({ Icon, color }, index) => (
        <motion.div
          key={index}
          variants={iconVariants}
          whileHover="hover"
          className="p-4 bg-white/10 rounded-full"
        >
          <Icon className="w-8 h-8" style={{ color }} />
        </motion.div>
      ))}
    </motion.div>
  );
}
