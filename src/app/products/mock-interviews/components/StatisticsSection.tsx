"use client";

import { motion } from "framer-motion";
import { MessageSquare, Trophy, BookOpen, Clock } from "lucide-react";

const Statistic = ({ value, label, icon: Icon, color }) => (
  <div className="text-center">
    <div className={`w-12 h-12 ${color} bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3`}>
      <Icon className={`w-6 h-6 ${color}`} />
    </div>
    <div className="text-2xl font-bold text-white mb-1">{value}</div>
    <div className="text-sm text-white/60">{label}</div>
  </div>
);

export const StatisticsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 bg-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Statistic 
            value="50K+"
            label="Interviews Conducted"
            icon={MessageSquare}
            color="text-blue-500"
          />
          <Statistic 
            value="95%"
            label="Success Rate"
            icon={Trophy}
            color="text-yellow-500"
          />
          <Statistic 
            value="200+"
            label="Interview Questions"
            icon={BookOpen}
            color="text-green-500"
          />
          <Statistic 
            value="24/7"
            label="AI Availability"
            icon={Clock}
            color="text-purple-500"
          />
        </div>
      </div>
    </motion.section>
  );
};
