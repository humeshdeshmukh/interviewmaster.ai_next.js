"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MdEmail } from "react-icons/md";
import { TbEaseInOut } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";
import { PiCreditCardFill } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaDatabase, FaRocket } from "react-icons/fa6";

const highlights = [
  {
    title: "Advanced Interview Simulations",
    description:
      "Prepare for your next job interview with real-world interview simulations, powered by AI-driven question generation and feedback.",
    icon: <RiNextjsFill className="text-4xl" />,
    gradient: "from-blue-500 to-blue-600"
  },
  {
    title: "Personalized Feedback",
    description:
      "Receive personalized, detailed feedback after each interview practice session, highlighting areas for improvement and suggesting resources.",
    icon: <MdEmail className="text-4xl" />,
    gradient: "from-purple-500 to-purple-600"
  },
  {
    title: "Seamless Payment Solutions",
    description:
      "Easily upgrade your plan with seamless payments through Stripe or Lemon Squeezy, providing access to premium features and courses.",
    icon: <PiCreditCardFill className="text-4xl" />,
    gradient: "from-green-500 to-green-600"
  },
  {
    title: "Secure User Authentication",
    description:
      "Sign in securely using your preferred method, whether it's email, Google, or LinkedIn, with multi-factor authentication for added protection.",
    icon: <IoShieldCheckmark className="text-4xl" />,
    gradient: "from-yellow-500 to-yellow-600"
  },
  {
    title: "Comprehensive Skill Database",
    description:
      "Access a growing database of interview questions, coding challenges, and mock interviews tailored to various roles and industries.",
    icon: <FaDatabase className="text-4xl" />,
    gradient: "from-red-500 to-red-600"
  },
  {
    title: "Progress Tracking & Analytics",
    description:
      "Track your progress over time with detailed analytics, helping you identify areas for improvement and celebrate your growth.",
    icon: <FaRocket className="text-4xl" />,
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    title: "Interactive Learning Modules",
    description:
      "Engage with interactive tutorials and coding challenges that enhance your interview preparation, making learning fun and effective.",
    icon: <SiGoogleanalytics className="text-4xl" />,
    gradient: "from-pink-500 to-pink-600"
  },
  {
    title: "Easy Navigation & User Experience",
    description:
      "Enjoy a simple, intuitive interface that makes it easy to navigate between courses, practice tests, and your personalized dashboard.",
    icon: <TbEaseInOut className="text-4xl" />,
    gradient: "from-cyan-500 to-cyan-600"
  },
];

const Highlights = () => {
  const containerRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10 max-w-7xl mx-auto"
    >
      {highlights.map((feature, index) => (
        <Highlight key={feature.title} {...feature} index={index} />
      ))}
    </motion.div>
  );
};

const Highlight = ({
  title,
  description,
  icon,
  index,
  gradient
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
  gradient: string;
}) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      className={cn(
        "flex flex-col items-center lg:border-r py-8 relative group/feature dark:border-neutral-800 rounded-xl backdrop-blur-sm",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {/* Background Gradient */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover/feature:opacity-5 transition-opacity duration-300 rounded-xl bg-gradient-to-br",
        gradient
      )} />

      {/* Icon Container */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="mb-4 relative z-10 p-3 rounded-lg bg-gradient-to-br from-background/80 to-background"
      >
        <div className="text-[#fcba28] transform group-hover/feature:scale-110 transition-transform duration-300">
          {icon}
        </div>
      </motion.div>

      {/* Title */}
      <div className="text-lg font-semibold mb-2 relative z-10 px-4">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-gradient-to-b from-[#fcba28] to-amber-600 group-hover/feature:scale-y-110 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
          {title}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-foreground/70 group-hover/feature:text-foreground/90 max-w-xs relative z-10 px-6 text-center transition-colors duration-200">
        {description}
      </p>

      {/* Hover Border Effect */}
      <div className="absolute inset-0 rounded-xl border border-foreground/10 group-hover/feature:border-[#fcba28]/20 transition-colors duration-300" />
    </motion.div>
  );
};

export { Highlights };
export default Highlights;
