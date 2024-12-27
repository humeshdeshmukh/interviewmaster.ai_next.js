"use client";

import { useState } from 'react';
import { Button, Card, PageContainer, FeatureCard, StatCard } from './components/ui';
import { motion } from 'framer-motion';
import { 
    ArrowRight, FileText, UserCog, LightbulbIcon, CheckCircle2, 
    Trophy, Brain, Users, Sparkles
} from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        title: 'AI Resume Builder',
        description: 'Create a professional resume instantly with our AI-powered tools. Get real-time suggestions and ATS optimization.',
        icon: Brain,
        href: '/products/resume-builder/features/ai',
        features: [
            'Smart content suggestions',
            'ATS keyword optimization',
            'Professional formatting',
            'Industry-specific templates'
        ],
        color: '#fcba28'
    },
    {
        title: 'Professional Service',
        description: 'Work with certified resume experts who understand your industry and career goals.',
        icon: UserCog,
        href: '/products/resume-builder/features/professional',
        features: [
            'One-on-one consultation',
            'Industry-specific expertise',
            'Unlimited revisions',
            'Interview preparation'
        ],
        color: '#4CAF50'
    },
    {
        title: 'Resume Tips & Resources',
        description: 'Access our comprehensive library of expert tips, templates, and industry insights.',
        icon: LightbulbIcon,
        href: '/products/resume-builder/features/tips',
        features: [
            'Industry best practices',
            'Keyword optimization guides',
            'Format templates',
            'Career advancement tips'
        ],
        color: '#2196F3'
    }
];

const stats = [
    { 
        icon: FileText, 
        value: '50,000+', 
        label: 'Resumes Created',
        description: 'Trusted by professionals worldwide'
    },
    { 
        icon: Trophy, 
        value: '98%', 
        label: 'Success Rate',
        description: 'Of users land interviews'
    },
    { 
        icon: Users, 
        value: '30,000+', 
        label: 'Happy Users',
        description: 'And growing every day'
    },
];

export default function ResumeBuilderPage() {
    return (
        <PageContainer
            badge={{
                icon: Sparkles,
                text: "AI-Powered Resume Builder"
            }}
            title={{
                main: "Build Your Perfect",
                highlight: "Resume",
                end: "with AI"
            }}
            description="Create a professional resume that stands out with our AI-powered tools and expert guidance"
        >
            <div className="space-y-20">
                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Button href="/products/resume-builder/features/ai" variant="primary" icon>
                        Start Building <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button href="/products/resume-builder/features/professional" variant="secondary">
                        Professional Service
                    </Button>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                        >
                            <Card className="p-6 hover:bg-white/5 transition-colors">
                                <StatCard
                                    icon={stat.icon}
                                    value={stat.value}
                                    label={stat.label}
                                    description={stat.description}
                                    delay={0.4 + index * 0.1}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <div className="space-y-12">
                    <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-3xl font-bold text-center"
                    >
                        Choose Your Path
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, index) => (
                            <Link key={service.title} href={service.href} className="group">
                                <Card className="h-full p-6 space-y-6 hover:bg-white/5 transition-colors">
                                    <FeatureCard
                                        icon={service.icon}
                                        title={service.title}
                                        description={service.description}
                                        color={service.color}
                                        delay={0.5 + index * 0.1}
                                    />
                                    <ul className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={featureIndex}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                                                className="flex items-center gap-2 text-sm text-white/60"
                                            >
                                                <CheckCircle2 className="w-4 h-4" style={{ color: service.color }} />
                                                {feature}
                                            </motion.li>
                                        ))}
                                    </ul>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Trust Indicators */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-col gap-3"
                >
                    {[
                        "AI-powered resume analysis and optimization",
                        "Professional templates for every industry",
                        "Expert guidance and real-time feedback",
                        "24/7 customer support",
                        "100% satisfaction guarantee"
                    ].map((text, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9 + index * 0.1 }}
                            className="flex items-center gap-2 text-sm text-white/60"
                        >
                            <CheckCircle2 className="w-4 h-4 text-[#fcba28]" />
                            {text}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageContainer>
    );
}
