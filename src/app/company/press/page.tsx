"use client";

import { motion } from "framer-motion";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Download, ArrowRight, Mail } from "lucide-react";
import { pressReleases, companyStats, mediaResources, pressContacts } from "./data";

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

const PressReleaseCard = ({
  date,
  title,
  excerpt,
  link,
  category,
}: {
  date: string;
  title: string;
  excerpt: string;
  link: string;
  category: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
  >
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <span className="text-sm text-[#fcba28] mb-2">{date}</span>
        <span className="text-sm text-white/40 ml-4 px-2 py-1 rounded-full border border-white/10">
          {category}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#fcba28] transition-colors">
        {title}
      </h3>
      <p className="text-white/60 mb-6 flex-grow">{excerpt}</p>
      <a
        href={link}
        className="inline-flex items-center text-[#fcba28] hover:text-[#fcba28]/80 transition-colors gap-2"
      >
        Read More <ArrowRight className="w-4 h-4" />
      </a>
    </div>
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

const ResourceCard = ({
  name,
  format,
  size,
  link,
}: {
  name: string;
  format: string;
  size: string;
  link: string;
}) => (
  <motion.a
    href={link}
    variants={fadeInUp}
    className="group flex items-center justify-between hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-4 transition-colors"
  >
    <div className="flex items-center gap-4">
      <div className="p-2 rounded-lg bg-[#fcba28]/10">
        <Download className="w-5 h-5 text-[#fcba28]" />
      </div>
      <div>
        <h3 className="text-white group-hover:text-[#fcba28] transition-colors">{name}</h3>
        <p className="text-sm text-white/40">
          {format} • {size}
        </p>
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-[#fcba28] transition-colors" />
  </motion.a>
);

const ContactCard = ({
  name,
  email,
  response,
}: {
  name: string;
  email: string;
  response: string;
}) => (
  <motion.div
    variants={fadeInUp}
    className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-2 rounded-lg bg-[#fcba28]/10">
        <Mail className="w-6 h-6 text-[#fcba28]" />
      </div>
      <h3 className="text-xl font-semibold text-white">{name}</h3>
    </div>
    <a
      href={`mailto:${email}`}
      className="text-lg text-[#fcba28] hover:text-[#fcba28]/80 transition-colors block mb-2"
    >
      {email}
    </a>
    <p className="text-white/60 text-sm">{response}</p>
  </motion.div>
);

export default function PressPage() {
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
              Press & Media
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-12">
              Get the latest news and updates about InterviewMaster.AI. For press inquiries, please
              contact our media team.
            </p>
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
            {companyStats.map((stat) => (
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

      {/* Press Releases Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Latest News
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {pressReleases.map((release) => (
              <PressReleaseCard
                key={release.title}
                date={release.date}
                title={release.title}
                excerpt={release.excerpt}
                link={release.link}
                category={release.category}
              />
            ))}
          </motion.div>
        </MaxWidthWrapper>
      </section>

      {/* Media Resources Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Media Resources
          </motion.h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Brand Assets */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {mediaResources.brandAssets.title}
              </h3>
              <p className="text-white/60 mb-6">{mediaResources.brandAssets.description}</p>
              <div className="space-y-4">
                {mediaResources.brandAssets.items.map((item) => (
                  <ResourceCard
                    key={item.name}
                    name={item.name}
                    format={item.format}
                    size={item.size}
                    link={item.link}
                  />
                ))}
              </div>
            </motion.div>

            {/* Fact Sheet */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="group hover:bg-white/[0.1] bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl p-6 transition-colors"
            >
              <h3 className="text-2xl font-semibold text-white mb-4">
                {mediaResources.factSheet.title}
              </h3>
              <p className="text-white/60 mb-6">{mediaResources.factSheet.description}</p>
              <div className="space-y-4">
                {mediaResources.factSheet.items.map((item) => (
                  <div key={item.title} className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">{item.title}</span>
                    <span className="text-white font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* Press Contacts Section */}
      <section className="relative py-16">
        <MaxWidthWrapper>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-12 text-center"
          >
            Press Contacts
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          >
            <ContactCard
              name={pressContacts.media.name}
              email={pressContacts.media.email}
              response={pressContacts.media.response}
            />
            <ContactCard
              name={pressContacts.partnerships.name}
              email={pressContacts.partnerships.email}
              response={pressContacts.partnerships.response}
            />
          </motion.div>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
