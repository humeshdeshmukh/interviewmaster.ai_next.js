"use client";

import dynamic from 'next/dynamic';
import { Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

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

// Lazy load feature components with enhanced loading states
const TowerBento = dynamic(() => import('./TowerBento').then(mod => ({ default: mod.TowerBento })), {
    loading: () => (
        <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[400px] backdrop-blur-sm" />
    ),
    ssr: true,
});

const SquareBento1 = dynamic(() => import('./SquareBento1').then(mod => ({ default: mod.SquareBento1 })), {
    loading: () => (
        <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
    ),
    ssr: true,
});

const SquareBento2 = dynamic(() => import('./SquareBento2').then(mod => ({ default: mod.SquareBento2 })), {
    loading: () => (
        <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
    ),
    ssr: true,
});

const RectangularBento = dynamic(() => import('./RectangularBento').then(mod => ({ default: mod.RectangularBento })), {
    loading: () => (
        <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
    ),
    ssr: true,
});

const Highlights = dynamic(() => import('./Highlights').then(mod => ({ default: mod.Highlights })), {
    loading: () => (
        <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-20 w-full rounded-xl backdrop-blur-sm" />
    ),
    ssr: true,
});

export const Features = () => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id="features" className="relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
            <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            
            <motion.div
                ref={containerRef}
                style={{ opacity, scale }}
                className="relative z-10"
            >
                <MaxWidthWrapper className="relative flex flex-col items-center py-20 md:py-32">
                    {/* Section Header */}
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="relative z-20 flex items-center flex-col md:flex-row flex-wrap justify-center md:justify-between w-full gap-6"
                    >
                        <motion.div 
                            variants={itemVariants}
                            className="flex flex-col justify-center items-center md:justify-start md:items-start gap-4 max-w-xl"
                        >
                            <ChipBanner text="GET READY FOR YOUR NEXT INTERVIEW!" className="animate-bounce-slow" />
                            <h2 className="flex-1 font-extrabold text-xl text-center md:text-start md:text-2xl lg:text-3xl bg-gradient-to-r from-white to-white/80 bg-clip-text">
                                I spent <span className="text-[#fcba28] animate-pulse">1 WEEK</span> perfecting this interview prep platform, so you don&apos;t have to. Let me help you ace your interviews!
                            </h2>
                        </motion.div>

                        <motion.p 
                            variants={itemVariants}
                            className="flex-1 font-medium text-base text-center md:text-start md:text-lg justify-end max-w-lg w-full mt-0 md:mt-12 text-white/80"
                        >
                            With Interview Master, you&apos;ll have everything you need: practice questions, interview feedback, live mock interviews, and more. Focus on your interview success, not the prep.
                        </motion.p>
                    </motion.div>

                    {/* Section Bento Grid */}
                    <motion.article 
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-12 my-10 md:my-20 border-b border-foreground/10 pb-10 md:pb-20"
                    >
                        {/* Main feature section */}
                        <motion.div variants={itemVariants} className="lg:col-span-4">
                            <Suspense fallback={
                                <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[400px] backdrop-blur-sm" />
                            }>
                                <TowerBento />
                            </Suspense>
                        </motion.div>

                        {/* Supporting feature columns */}
                        <motion.div 
                            variants={itemVariants}
                            className="cols-span-1 grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-2"
                        >
                            <Suspense fallback={
                                <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
                            }>
                                <SquareBento1 />
                            </Suspense>
                            <Suspense fallback={
                                <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
                            }>
                                <SquareBento2 />
                            </Suspense>
                            <Suspense fallback={
                                <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-full w-full rounded-xl min-h-[200px] backdrop-blur-sm" />
                            }>
                                <RectangularBento />
                            </Suspense>
                        </motion.div>
                    </motion.article>

                    {/* Section Highlights */}
                    <motion.div variants={itemVariants}>
                        <Suspense fallback={
                            <div className="animate-pulse bg-gradient-to-br from-neutral-900/50 to-neutral-800/50 h-20 w-full rounded-xl backdrop-blur-sm" />
                        }>
                            <Highlights />
                        </Suspense>
                    </motion.div>
                </MaxWidthWrapper>
            </motion.div>
        </section>
    );
}

/**
 * Features Component
 * 
 * This section highlights the key features of the Interview Master platform using
 * an interactive bento grid layout. Each feature is encapsulated in its own component 
 * and loaded lazily for improved performance and user experience.
 *
 * Layout Structure:
 * - TowerBento: Main feature showcase (4 columns)
 * - SquareBento1 & 2: Secondary features (2 columns each)
 * - RectangularBento: Tech stack display (2 columns)
 *
 * Performance Optimizations:
 * - Dynamically imported components to reduce initial bundle size
 * - Implements loading states for smoother UX during component load
 * - Uses skeleton loaders (pulse animations) to improve perceived performance
 *
 * @example
 * ```tsx
 * <Features />
 * ```
 *
 * Note: Each bento component is lazily loaded. Proper loading states are ensured
 * while components are being fetched and rendered.
 */
