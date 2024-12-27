"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import {
  partnershipTypes,
  partnerStats,
  partnerBenefits,
  partnershipProcess,
} from "./data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const PartnershipCard = ({
  icon: Icon,
  title,
  description,
  benefits,
}: {
  icon: any;
  title: string;
  description: string;
  benefits: string[];
}) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-[#fcba28]/10">
        <Icon className="w-6 h-6 text-[#fcba28]" />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/60 mb-6">{description}</p>
    <ul className="space-y-2">
      {benefits.map((benefit) => (
        <li key={benefit} className="flex items-center gap-2 text-white/60">
          <Check className="w-4 h-4 text-[#fcba28]" />
          {benefit}
        </li>
      ))}
    </ul>
  </motion.div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: any;
  label: string;
  value: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors text-center"
  >
    <div className="flex justify-center text-[#fcba28] mb-4">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-lg font-semibold text-white/60 mb-2">{label}</h3>
    <p className="text-3xl font-bold text-white mb-2">{value}</p>
    <p className="text-sm text-white/60">{description}</p>
  </motion.div>
);

const ProcessStep = ({
  step,
  title,
  description,
}: {
  step: number;
  title: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="relative flex items-center gap-6"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#fcba28]/10 flex items-center justify-center border border-[#fcba28]/20">
      <span className="text-[#fcba28] font-bold">{step}</span>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-white/60">{description}</p>
    </div>
  </motion.div>
);

export default function PartnersPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Partner With Us
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Join forces with InterviewMaster.AI to revolutionize technical interview preparation.
              Together, we can help more professionals succeed in their career journeys.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] text-black rounded-lg font-semibold hover:bg-[#fcba28]/90 transition-colors"
            >
              Become a Partner <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Stats Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {partnerStats.map((stat) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                description={stat.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Partnership Types Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Partnership Opportunities
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {partnershipTypes.map((type) => (
              <PartnershipCard
                key={type.title}
                icon={type.icon}
                title={type.title}
                description={type.description}
                benefits={type.benefits}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Benefits Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Partner Benefits
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {partnerBenefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeInUp}
                className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-white/60">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Partnership Process Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Partnership Process
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto space-y-8"
          >
            {partnershipProcess.map((step) => (
              <ProcessStep
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Partner?</h2>
            <p className="text-lg text-white/60 mb-8">
              Contact us to explore partnership opportunities and learn how we can work together to
              achieve shared success.
            </p>
            <a
              href="mailto:partnerships@interviewmaster.ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] text-black rounded-lg font-semibold hover:bg-[#fcba28]/90 transition-colors"
            >
              Contact Partnership Team
            </a>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
