// @ts-nocheck
"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChipBanner } from '@/components/ChipBanner';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import {
    Brain,
    Code,
    LineChart,
    MessageSquare,
    Monitor,
    Sparkles,
    Target,
    Trophy,
    Video,
} from 'lucide-react';

const steps = [
    {
        title: "Create Your Profile",
        description: "Set up your personalized interview preparation journey. Choose your target roles, companies, and skill levels to get a customized learning path.",
        icon: <Target className="w-6 h-6" />,
        color: "from-[#fcba28] to-[#FF652F]",
    },
    {
        title: "Practice with AI Mock Interviews",
        description: "Experience realistic interview scenarios with our AI interviewer. Get instant feedback on your responses, body language, and technical accuracy.",
        icon: <Brain className="w-6 h-6" />,
        color: "from-[#FF652F] to-[#fcba28]",
    },
    {
        title: "Master Technical Challenges",
        description: "Solve coding problems, system design questions, and algorithmic challenges in our interactive coding environment with real-time AI assistance.",
        icon: <Code className="w-6 h-6" />,
        color: "from-[#fcba28] to-[#FF652F]",
    },
    {
        title: "Review & Analyze Performance",
        description: "Track your progress with detailed analytics. Identify areas for improvement and get personalized recommendations for better interview performance.",
        icon: <LineChart className="w-6 h-6" />,
        color: "from-[#FF652F] to-[#fcba28]",
    },
];

const features = [
    {
        title: "Real-time Code Analysis",
        description: "Get instant feedback on your code quality, complexity, and performance. Our AI suggests optimizations and best practices.",
        icon: <Monitor className="w-6 h-6" />,
    },
    {
        title: "Video Interview Practice",
        description: "Practice behavioral interviews with AI-powered video analysis that provides feedback on your body language and presentation.",
        icon: <Video className="w-6 h-6" />,
    },
    {
        title: "Smart Question Generation",
        description: "Our AI generates company-specific interview questions based on your target role and experience level.",
        icon: <MessageSquare className="w-6 h-6" />,
    },
    {
        title: "Success Tracking",
        description: "Monitor your improvement over time with detailed performance metrics and achievement badges.",
        icon: <Trophy className="w-6 h-6" />,
    },
];

const StepCard = ({ step, index }: { step: typeof steps[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex flex-col items-start gap-4 p-6 rounded-2xl bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 transition-all duration-300"
        >
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${step.color} text-background`}>
                {step.icon}
            </div>
            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-foreground/70 leading-relaxed">
                    {step.description}
                </p>
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-[#fcba28]/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
    );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-4 p-6 text-center rounded-2xl bg-foreground/5 backdrop-blur-sm hover:bg-foreground/10 transition-all duration-300"
        >
            <div className="p-3 rounded-xl bg-[#fcba28]/20 text-[#fcba28]">
                {feature.icon}
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
            <p className="text-foreground/70">{feature.description}</p>
        </motion.div>
    );
};

export const HowToUse = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    return (
        <section ref={containerRef} className="relative py-20 bg-gradient-to-b from-background to-background/95">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <MaxWidthWrapper>
                <motion.div style={{ opacity, scale }} className="relative">
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <ChipBanner text="HOW IT WORKS" />
                        <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold">
                            Master Your Interview Skills with{" "}
                            <span className="text-[#fcba28]">InterviewMaster.ai</span>
                        </h2>
                        <p className="mt-4 text-lg text-foreground/80 max-w-2xl">
                            Our AI-powered platform provides a comprehensive interview preparation experience, from technical challenges to behavioral assessments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {steps.map((step, index) => (
                            <StepCard key={step.title} step={step} index={index} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-4">
                            Powerful Features for{" "}
                            <span className="text-[#fcba28]">Interview Success</span>
                        </h3>
                        <p className="text-foreground/80 max-w-2xl mx-auto">
                            Our platform is packed with features designed to help you excel in your interviews
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <FeatureCard key={feature.title} feature={feature} index={index} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-6 text-center"
                    >
                        <div className="p-4 rounded-2xl bg-[#fcba28]/20 backdrop-blur-sm">
                            <Sparkles className="w-8 h-8 text-[#fcba28]" />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold">
                            Ready to Transform Your Interview Skills?
                        </h3>
                        <p className="text-foreground/80 max-w-2xl">
                            Join thousands of successful candidates who have mastered their interview skills with InterviewMaster.ai
                        </p>
                        <Button
                            size="lg"
                            className="bg-gradient-to-r from-[#fcba28] to-[#FF652F] text-background hover:opacity-90"
                        >
                            Start Free Trial
                        </Button>
                    </motion.div>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
};
