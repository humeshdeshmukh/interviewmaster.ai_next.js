// @ts-nocheck
"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { ArrowRight, Clock, Zap, CheckCircle2, XCircle } from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const features = [
  {
    name: "AI-Powered Mock Interviews",
    competitor: { time: "Manual setup", status: false },
    kit: { time: "Instant", status: true },
    description: "Real-time AI interviews with personalized feedback"
  },
  {
    name: "Resume Analysis & Feedback",
    competitor: { time: "24-48 hours", status: false },
    kit: { time: "5 minutes", status: true },
    description: "Comprehensive resume review with AI-powered suggestions"
  },
  {
    name: "Technical Skills Assessment",
    competitor: { time: "2-3 hours", status: false },
    kit: { time: "15 minutes", status: true },
    description: "In-depth evaluation of programming & technical skills"
  },
  {
    name: "Interview Performance Analytics",
    competitor: { time: "Manual tracking", status: false },
    kit: { time: "Real-time", status: true },
    description: "Detailed insights into interview performance metrics"
  },
  {
    name: "Custom Interview Questions",
    competitor: { time: "Hours to prepare", status: false },
    kit: { time: "Auto-generated", status: true },
    description: "AI-generated questions based on job requirements"
  },
  {
    name: "Behavioral Assessment",
    competitor: { time: "1-2 hours", status: false },
    kit: { time: "10 minutes", status: true },
    description: "Advanced behavioral analysis using AI"
  },
  {
    name: "Interview Recording & Analysis",
    competitor: { time: "Manual review", status: false },
    kit: { time: "Automated", status: true },
    description: "AI-powered analysis of interview recordings"
  },
  {
    name: "Practice Interview Sessions",
    competitor: { time: "Limited availability", status: false },
    kit: { time: "24/7 access", status: true },
    description: "Unlimited practice with AI interviewer"
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5 }
  }
};

export const TimeComparisonTable = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background to-background/50">
      <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <MaxWidthWrapper className="relative z-20">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.h2 
              variants={itemVariants}
              className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#fcba28] to-[#FF652F]"
            >
              Why Choose InterviewMaster.ai?
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              Experience the future of interview preparation with our AI-powered platform
            </motion.p>
          </div>

          {/* Comparison Table */}
          <motion.div 
            variants={itemVariants}
            className="relative rounded-2xl border border-[#fcba28]/20 backdrop-blur-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#fcba28]/5 to-transparent" />
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#fcba28]/20">
                    <th className="p-6 text-left text-lg font-medium">Features</th>
                    <th className="p-6 text-center text-lg font-medium">Traditional Methods</th>
                    <th className="p-6 text-center text-lg font-medium">InterviewMaster.ai</th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <motion.tr
                      key={index}
                      variants={itemVariants}
                      className="border-b border-[#fcba28]/10 hover:bg-[#fcba28]/5 transition-colors"
                    >
                      <td className="p-6">
                        <div className="space-y-1">
                          <div className="font-medium">{feature.name}</div>
                          <div className="text-sm text-muted-foreground">{feature.description}</div>
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{feature.competitor.time}</span>
                          </div>
                          {feature.competitor.status ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                      </td>
                      <td className="p-6">
                        <div className="flex flex-col items-center space-y-2">
                          <div className="flex items-center space-x-2 text-[#fcba28]">
                            <Zap className="w-4 h-4" />
                            <span className="font-medium">{feature.kit.time}</span>
                          </div>
                          {feature.kit.status && (
                            <CheckCircle2 className="w-5 h-5 text-[#fcba28]" />
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Summary Card */}
          <motion.div 
            variants={itemVariants}
            className="relative p-8 rounded-2xl border border-[#fcba28]/20 bg-gradient-to-b from-[#fcba28]/5 to-transparent backdrop-blur-xl"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              <h3 className="text-2xl font-bold text-[#fcba28]">Transform Your Interview Process</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                InterviewMaster.ai reduces interview preparation time by up to 90% while providing deeper insights and better candidate evaluation. Our AI-powered platform helps you make better hiring decisions faster.
              </p>
              <div className="flex items-center justify-center gap-4 pt-4">
                <div className="text-center px-6 py-3 rounded-xl bg-[#fcba28]/10 border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28]">90%</div>
                  <div className="text-sm text-muted-foreground">Time Saved</div>
                </div>
                <div className="text-center px-6 py-3 rounded-xl bg-[#fcba28]/10 border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28]">24/7</div>
                  <div className="text-sm text-muted-foreground">Availability</div>
                </div>
                <div className="text-center px-6 py-3 rounded-xl bg-[#fcba28]/10 border border-[#fcba28]/20">
                  <div className="text-3xl font-bold text-[#fcba28]">100%</div>
                  <div className="text-sm text-muted-foreground">AI-Powered</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};
