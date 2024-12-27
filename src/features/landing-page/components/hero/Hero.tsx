"use client";

import { LeftHero } from "./LeftHero";
import { RightHero } from "./RightHero";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const BackgroundGradient = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
    
    return (
        <motion.div ref={ref} style={{ opacity }} className="absolute inset-0 overflow-hidden">
            <motion.div
                animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    repeatType: "reverse",
                }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,#fcba2810_0%,transparent_65%)] blur-3xl"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#fcba2815_0%,transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,#fcba2815_0%,transparent_50%)]" />
        </motion.div>
    );
};

const GridPattern = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    
    return (
        <motion.div ref={ref} style={{ y }} className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,#fcba2815,transparent)]" />
        </motion.div>
    );
};

const FloatingShapes = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            {/* Geometric shapes */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-[#fcba28]/20 backdrop-blur-3xl"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-1/4 left-1/4 w-48 h-48 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl rotate-12"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.15, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="absolute top-1/3 left-1/3 w-32 h-32 rounded-lg border border-[#fcba28]/20 backdrop-blur-3xl -rotate-45"
            />
        </div>
    );
};

export const Hero = () => {
    return (
        <section className="relative min-h-screen bg-background overflow-hidden">
            {/* Background Effects */}
            <BackgroundGradient />
            <GridPattern />
            <FloatingShapes />

            {/* Content */}
            <div className="relative z-10">
                <MaxWidthWrapper>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-screen py-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="flex-1 w-full"
                        >
                            <LeftHero />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="flex-1 w-full"
                        >
                            <RightHero />
                        </motion.div>
                    </div>
                </MaxWidthWrapper>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-[#fcba28]/30 flex items-start justify-center p-2"
                >
                    <motion.div
                        animate={{ height: ["20%", "80%", "20%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 bg-[#fcba28]/50 rounded-full"
                    />
                </motion.div>
            </motion.div>
        </section>
    );
};