"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "How does the AI interview simulation work?",
    answer: "Our AI uses advanced natural language processing to understand your responses and provide real-time feedback on content, delivery, and body language through your device's camera and microphone."
  },
  {
    question: "What types of interviews can I practice?",
    answer: "We offer technical (coding, system design), behavioral (STAR method), and leadership interview simulations across various industries and roles."
  },
  {
    question: "Is my practice data secure?",
    answer: "Yes, all your interview recordings and data are encrypted and stored securely. We follow strict privacy guidelines and never share your information."
  },
  {
    question: "Can I practice specific company interviews?",
    answer: "Yes, we have company-specific interview templates that mirror the actual interview process of major tech companies."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-white/60">Everything you need to know about our platform</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
              <p className="text-white/60">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
