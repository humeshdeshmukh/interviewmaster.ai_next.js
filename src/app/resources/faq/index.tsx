import React from "react";
import { motion } from "framer-motion";

const FAQPage = () => {
  const faqs = [
    {
      question: "What is this website about?",
      answer:
        "This website is a platform to explore FAQs and learn more about our services.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can contact our support team via the 'Contact Us' page or email us at support@example.com.",
    },
    {
      question: "What services do you offer?",
      answer:
        "We offer a variety of services including development, consulting, and more.",
    },
  ];

  return (
    <div className="bg-background w-full">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-20 text-center"
      >
        <h1 className="text-5xl font-extrabold">FAQs</h1>
        <p className="text-xl mt-4">Got questions? We’ve got answers!</p>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform translate-y-4 rounded-t-lg" />
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 space-y-10">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold">{faq.question}</h2>
            <p className="mt-4 text-gray-600">{faq.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
