"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";

// Custom hook for intersection observer
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isInView];
};

// Array of tech stacks with logos and descriptions
const stacks = [
  {
    name: "NextJS",
    url: "/logo-stacks/next-js.svg",
    description: "React Framework",
    color: "from-[#000000] to-[#1a1a1a]"
  },
  {
    name: "TailwindCSS",
    url: "/logo-stacks/tailwindcss.svg",
    description: "Utility-First CSS",
    color: "from-[#38bdf8] to-[#0ea5e9]"
  },
  {
    name: "Framer Motion",
    url: "/logo-stacks/framer-motion.svg",
    description: "Animation Library",
    color: "from-[#ff0066] to-[#cc0052]"
  },
  {
    name: "Convex",
    url: "/logo-stacks/convex.svg",
    description: "Backend Platform",
    color: "from-[#ff4d00] to-[#cc3d00]"
  },
  {
    name: "Stripe",
    url: "/logo-stacks/stripe.svg",
    description: "Payment Processing",
    color: "from-[#635bff] to-[#4f48cc]"
  }
];

export const BannerStacks = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="banner-stacks" className="relative overflow-hidden py-16 bg-gradient-to-r from-background/80 to-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Glow Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-transparent to-amber-600/10 animate-pulse" />

      <MaxWidthWrapper>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative z-20 flex flex-col items-center gap-12"
        >
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#fcba28] to-amber-600 bg-clip-text text-transparent">
              Powered by Advanced Technology
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Built with cutting-edge tools and frameworks to deliver the best interview preparation experience
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-5 gap-8 w-full"
          >
            {stacks.map((stack, index) => (
              <motion.div
                key={stack.name}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="group relative flex flex-col items-center"
              >
                {/* Card Background with Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stack.color} opacity-0 group-hover:opacity-5 rounded-xl transition-opacity duration-300`} />
                
                {/* Logo Container */}
                <div className="relative w-20 h-20 mb-4">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl transform -rotate-6 group-hover:rotate-0 transition-transform duration-300" />
                  <div className="relative w-full h-full bg-white rounded-xl shadow-lg p-4 transform group-hover:scale-105 transition-transform duration-300">
                    <Image
                      fill
                      src={stack.url}
                      alt={`${stack.name} logo`}
                      className="object-contain p-2"
                    />
                  </div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-1">
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-[#fcba28] transition-colors duration-300">
                    {stack.name}
                  </h3>
                  <p className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors duration-300">
                    {stack.description}
                  </p>
                </div>

                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#fcba28] to-amber-600 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};
