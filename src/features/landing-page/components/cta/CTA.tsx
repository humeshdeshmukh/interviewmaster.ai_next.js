"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { BuyButton } from "@/components/BuyButton";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { FaRocket } from "react-icons/fa6";
import { IoCheckmarkCircle } from "react-icons/io5";

export const CTA = () => {
    const router = useRouter();
    const containerRef = useRef(null);
    
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const features = [
        "Access to AI-Powered Mock Interviews",
        "Real-time Feedback & Analysis",
        "Industry-Specific Questions",
        "Performance Analytics"
    ];

    const handleGetStarted = () => {
        router.push("/products/mock-interviews");
    };

    return (
        <section id="cta" className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#fcba28]/10 via-transparent to-amber-600/10 animate-pulse" />

            <motion.div
                ref={containerRef}
                style={{ opacity, scale }}
                className="relative z-10"
            >
                <MaxWidthWrapper className="relative flex flex-col items-center justify-center space-y-8 py-24 md:py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative z-20 flex items-center flex-col justify-center w-full gap-6"
                    >
                        {/* Icon */}
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            className="p-4 rounded-2xl bg-gradient-to-br from-[#fcba28] to-amber-600 shadow-lg mb-4"
                        >
                            <FaRocket className="text-4xl text-white" />
                        </motion.div>

                        {/* Heading */}
                        <h2 className="flex-1 font-extrabold text-3xl md:text-5xl text-center mb-2 max-w-2xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            Ready to Ace Your Next Interview?
                        </h2>

                        {/* Description */}
                        <p className="flex-1 font-medium text-lg md:text-xl text-center text-white/80 max-w-2xl w-full mb-8">
                            Start practicing with our AI-powered mock interviews and get instant feedback to improve your performance.
                        </p>

                        {/* Features List */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, staggerChildren: 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center space-x-2"
                                >
                                    <IoCheckmarkCircle className="text-[#fcba28] text-xl" />
                                    <span className="text-white/80">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative group"
                        >
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#fcba28] to-amber-600 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-200" />
                            <button
                                onClick={handleGetStarted}
                                className="relative px-8 py-4 bg-[#fcba28] hover:bg-amber-600 text-black font-bold rounded-xl transition-all duration-200 shadow-lg"
                            >
                                Start Mock Interview
                            </button>
                        </motion.div>
                    </motion.div>
                </MaxWidthWrapper>
            </motion.div>
        </section>
    );
};
