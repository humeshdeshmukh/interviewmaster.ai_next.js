"use client";

import { Brain, Users, Target, ArrowRight } from "lucide-react";

const InterviewTrack = ({ title, description, icon: Icon, color, difficulty, duration }) => (
  <div className="relative group cursor-pointer">
    <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 group-hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-4">
        <Icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${color} bg-opacity-20`}>{difficulty}</span>
          <span className="text-xs text-white/60">{duration}</span>
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-white/60 mb-4">{description}</p>
      <div className="flex items-center text-white/80 hover:text-white transition-colors">
        <span className="text-sm">Start Track</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  </div>
);

export const InterviewTracksSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Choose Your Interview Track</h2>
          <p className="text-white/60">Specialized practice sessions tailored to your career goals</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <InterviewTrack 
            title="Technical Interviews"
            description="Master coding challenges and system design questions"
            icon={Brain}
            color="text-blue-500"
            difficulty="Advanced"
            duration="60 min"
          />
          <InterviewTrack 
            title="Behavioral Interviews"
            description="Perfect your STAR responses and soft skills"
            icon={Users}
            color="text-green-500"
            difficulty="Intermediate"
            duration="45 min"
          />
          <InterviewTrack 
            title="Leadership Interviews"
            description="Demonstrate executive presence and vision"
            icon={Target}
            color="text-purple-500"
            difficulty="Expert"
            duration="60 min"
          />
        </div>
      </div>
    </section>
  );
};
