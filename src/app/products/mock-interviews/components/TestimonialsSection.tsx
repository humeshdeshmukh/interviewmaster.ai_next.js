"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialCard = ({ name, role, content, rating }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-6 rounded-2xl bg-white/5 border border-white/10"
  >
    <div className="flex items-center gap-2 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} />
      ))}
    </div>
    <p className="text-white/80 mb-4">{content}</p>
    <div>
      <div className="font-medium text-white">{name}</div>
      <div className="text-sm text-white/60">{role}</div>
    </div>
  </motion.div>
);

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Success Stories</h2>
          <p className="text-white/60">Hear from our successful candidates</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TestimonialCard 
            name="Sarah Chen"
            role="Software Engineer at Google"
            content="The AI feedback helped me identify and improve my weak points. I landed my dream job after just 2 weeks of practice!"
            rating={5}
          />
          <TestimonialCard 
            name="Michael Rodriguez"
            role="Product Manager at Meta"
            content="The behavioral interview practice was incredibly helpful. The AI's suggestions for improving my STAR responses were spot-on."
            rating={5}
          />
          <TestimonialCard 
            name="Emily Thompson"
            role="Data Scientist at Amazon"
            content="The technical interview simulations were very realistic. I felt much more confident during my actual interviews."
            rating={4}
          />
        </div>
      </div>
    </section>
  );
};
