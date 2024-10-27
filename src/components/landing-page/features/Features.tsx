"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ChipBanner } from "../../ChipBanner";
import { MaxWidthWrapper } from "../../MaxWidthWrapper";

// I use lazy loading (dynamic imports) for the feature components to optimize initial page load time. This technique:
// - Improves performance by loading components only when needed
// - Reduces the initial bundle size, leading to faster page loads
// - Provides a smoother user experience, especially on slower connections
const TowerBento = dynamic(() => import('./TowerBento').then(mod => ({ default: mod.TowerBento })), {
    loading: () => <div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[400px]" />,
    ssr: true
});

const SquareBento1 = dynamic(() => import('./SquareBento1').then(mod => ({ default: mod.SquareBento1 })), {
    loading: () => <div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />,
    ssr: true
});

const SquareBento2 = dynamic(() => import('./SquareBento2').then(mod => ({ default: mod.SquareBento2 })), {
    loading: () => <div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />,
    ssr: true
});

const RectangularBento = dynamic(() => import('./RectangularBento').then(mod => ({ default: mod.RectangularBento })), {
    loading: () => <div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />,
    ssr: true
});

const Highlights = dynamic(() => import('./Highlights').then(mod => ({ default: mod.Highlights })), {
    loading: () => <div className="animate-pulse bg-neutral-900 h-20 w-full rounded-lg" />,
    ssr: true
});


export const Features = () => {
    return (
        <section id="features" className="relative overflow-hidden">
            <MaxWidthWrapper className="relative flex flex-col items-center py-20 md:py-32">
                {/* Section Header */}
                <hgroup className="relative z-20 flex items-center flex-col md:flex-row flex-wrap justify-center md:justify-between w-full gap-6">
                    <div className="flex flex-col justify-center items-center md:justify-start md:items-start gap-4 max-w-xl">
                        <ChipBanner text="READY TO LAUNCH YET???" />
                        <h2 className="flex-1 font-extrabold text-xl text-center md:text-start md:text-2xl lg:text-3xl">
                            I spent <span className="text-[#fcba28]">1 WEEK</span> perfecting this landing page, so you don&apos;t have to. Let me save you time today!
                        </h2>
                    </div>

                    <p className="flex-1 font-medium text-base text-center md:text-start md:text-lg justify-end max-w-lg w-full mt-0 md:mt-12">
                        With our SaaS kit, you&apos;ll have everything you need: Next.js latest version, payment integration, authentication, database, and more. Simply copy, paste, and start building. Focus on your app&apos;s success, not the setup.
                    </p>
                </hgroup>
                {/* Section Bento Grid */}
                <article className="grid grid-cols-1 gap-4 lg:grid-cols-12 my-10 md:my-20 border-b border-foreground/50 pb-10 md:pb-20">
                    {/* Add the long column here */}
                    <Suspense fallback={<div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[400px]" />}>
                        <TowerBento />
                    </Suspense>
                    {/* Add the rest of short column here */}
                    <div className="cols-span-1 grid grid-cols-2 gap-4 lg:col-span-8 lg:grid-cols-2">
                        <Suspense fallback={<div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />}>
                            <SquareBento1 />
                        </Suspense>
                        <Suspense fallback={<div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />}>
                            <SquareBento2 />
                        </Suspense>
                        <Suspense fallback={<div className="animate-pulse bg-neutral-900 h-full w-full rounded-lg min-h-[200px]" />}>
                            <RectangularBento />
                        </Suspense>
                    </div>
                </article>
                {/* Section Highlights */}
                <Suspense fallback={<div className="animate-pulse bg-neutral-900 h-20 w-full rounded-lg" />}>
                    <Highlights />
                </Suspense>
            </MaxWidthWrapper>
        </section>
    )
}

// Instructions
/*

This component showcases the key features and components of your product. It aims to:
- Give users a clear understanding of what your product offers
- Familiarize potential customers with the product's interface and functionality
- Create an interactive and visually appealing representation of your product

Key Aspects:
1. Visual Appeal: Use engaging visuals, animations, or interactive elements to capture attention.
2. Interactivity: Implement hover effects, click interactions, or mini-demos to let users experience the product.
3. Clear Explanations: Provide concise, benefit-focused descriptions for each feature.
4. Consistent Branding: Ensure the design aligns with your overall brand aesthetic.

Define Your Key Features:
   TODO:  Identify 4-6 core features that best represent your product's value.
   TODO:  For each feature, determine the best way to visually represent it (e.g., screenshot, animation, interactive demo).

Create Individual Feature Components:
   TODO:  Develop separate components for each feature (e.g., TowerBento, SquareBento1, etc.).
   TODO:  Each component should be visually appealing and, if possible, interactive.
   TODO:  Include clear, concise descriptions of the feature's benefits.

*/