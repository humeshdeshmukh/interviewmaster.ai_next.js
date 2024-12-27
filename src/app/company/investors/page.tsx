"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import {
  companyMetrics,
  growthMetrics,
  marketOpportunity,
  competitiveAdvantages,
  financialHighlights,
  milestones,
  investmentHighlights,
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

const MetricsCard = ({ label, value, growth }: { label: string; value: string; growth: string }) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
  >
    <h3 className="text-lg font-semibold text-white/60 mb-2">{label}</h3>
    <p className="text-3xl font-bold text-white mb-1">{value}</p>
    <p className="text-sm text-[#fcba28]">{growth}</p>
  </motion.div>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
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
    <p className="text-white/60">{description}</p>
  </motion.div>
);

const TimelineItem = ({
  date,
  title,
  description,
}: {
  date: string;
  title: string;
  description: string;
}) => (
  <motion.div variants={fadeInUp} className="relative pl-8 pb-8 last:pb-0">
    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-[#fcba28] to-transparent" />
    <div className="absolute left-[-4px] top-2 h-2 w-2 rounded-full bg-[#fcba28]" />
    <div className="text-sm text-[#fcba28] mb-1">{date}</div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-white/60">{description}</p>
  </motion.div>
);

const FinancialCard = ({
  metric,
  value,
  period,
  description,
}: {
  metric: string;
  value: string;
  period: string;
  description: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
  >
    <h3 className="text-lg font-semibold text-white/60 mb-2">{metric}</h3>
    <div className="flex items-baseline gap-2 mb-2">
      <p className="text-3xl font-bold text-white">{value}</p>
      <p className="text-sm text-[#fcba28]">{period}</p>
    </div>
    <p className="text-white/60 text-sm">{description}</p>
  </motion.div>
);

export default function InvestorsPage() {
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
              Investor Relations
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Join us in revolutionizing technical interview preparation with AI-powered solutions.
              Discover why InterviewMaster.AI is the future of interview success.
            </p>
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Growth Metrics Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {growthMetrics.map((metric) => (
              <MetricsCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                growth={metric.growth}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Market Opportunity Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Market Opportunity
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {marketOpportunity.map((item) => (
              <FeatureCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Competitive Advantages Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Our Competitive Edge
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {competitiveAdvantages.map((advantage) => (
              <FeatureCard
                key={advantage.title}
                icon={advantage.icon}
                title={advantage.title}
                description={advantage.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Financial Highlights Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Financial Highlights
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {financialHighlights.map((highlight) => (
              <FinancialCard
                key={highlight.metric}
                metric={highlight.metric}
                value={highlight.value}
                period={highlight.period}
                description={highlight.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Milestones Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Company Milestones
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            {milestones.map((milestone) => (
              <TimelineItem
                key={milestone.date}
                date={milestone.date}
                title={milestone.title}
                description={milestone.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Investment Highlights Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Why Invest in InterviewMaster.AI
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {investmentHighlights.map((highlight) => (
              <FeatureCard
                key={highlight.title}
                icon={highlight.icon}
                title={highlight.title}
                description={highlight.description}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* CTA Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Ready to Join Our Journey?</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
              Connect with us to learn more about investment opportunities and how you can be part of
              our growth story.
            </p>
            <a
              href="mailto:investors@interviewmaster.ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#fcba28] text-black rounded-lg font-semibold hover:bg-[#fcba28]/90 transition-colors"
            >
              Contact Investor Relations
            </a>
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
