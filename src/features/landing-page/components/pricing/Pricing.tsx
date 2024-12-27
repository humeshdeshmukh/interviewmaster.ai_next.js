'use client';

// @ts-nocheck
import { cn } from "@/lib/utils";
import { Check, Zap, Star, Sparkles, Crown } from "lucide-react";
import { BuyButton } from "@/components/BuyButton";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { motion } from "framer-motion";

const packages = [
    {
        name: "Basic Prep",
        tagline: "Perfect for beginners",
        originalPrice: 49,
        price: 19,
        features: [
            "50+ Practice Interview Questions",
            "Basic AI Interview Simulator",
            "Interview Preparation Guides",
            "Resume Template Library",
            "Email Support",
            "Basic Performance Analytics",
            "Interview Recording (up to 5)",
            "Community Forum Access",
        ],
        icon: Star,
    },
    {
        name: "Pro Interview",
        tagline: "Most Popular for Job Seekers",
        originalPrice: 149,
        price: 49,
        popular: true,
        features: [
            { text: "Everything in Basic, PLUS:", icon: "Zap" },
            { text: "Unlimited AI Mock Interviews", icon: "Zap" },
            { text: "Real-time Interview Feedback", icon: "Sparkles" },
            { text: "Advanced Analytics Dashboard", icon: "Sparkles" },
            "Company-specific Interview Prep",
            "Resume ATS Optimization",
            "1-on-1 Mock Interview Session",
            "Priority Support",
            "Interview Strategy Planning",
            "Custom Interview Scenarios",
        ],
        icon: Sparkles,
    },
    {
        name: "Elite Success",
        tagline: "For Serious Career Growth",
        originalPrice: 299,
        price: 99,
        features: [
            { text: "Everything in Pro, PLUS:", icon: "Crown" },
            { text: "Personal Interview Coach", icon: "Crown" },
            { text: "Career Strategy Sessions", icon: "Crown" },
            "Industry Expert Mock Interviews",
            "Behavioral Interview Mastery",
            "Technical Interview Deep Dives",
            "Salary Negotiation Training",
            "Executive Presence Coaching",
            "Lifetime Access to Updates",
            "VIP Support Response",
        ],
        icon: Crown,
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-background">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <MaxWidthWrapper className="relative flex flex-col items-center py-16 md:py-24">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col justify-center items-center gap-4 max-w-xl mb-4 md:mb-6"
                >
                    <ChipBanner text="PRICING PLANS" />
                    <h2 className="flex-1 font-extrabold text-center md:text-2xl lg:text-4xl bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                        Invest in Your Interview Success
                    </h2>
                    <p className="text-center text-white/60 max-w-lg">
                        Choose the perfect plan to elevate your interview skills and land your dream job. All plans include lifetime access.
                    </p>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-12 grid max-w-lg grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-3"
                >
                    {packages.map((pkg, index) => {
                        const Icon = pkg.icon;
                        return (
                            <motion.div
                                key={pkg.name}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.2 }}
                                className={cn(
                                    "relative flex flex-col justify-between rounded-2xl p-8 shadow-2xl backdrop-blur-sm",
                                    pkg.popular
                                        ? "bg-gradient-to-br from-[#fcba28]/20 to-[#FF652F]/20 ring-2 ring-[#fcba28]"
                                        : "bg-white/5"
                                )}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                        <p className="rounded-full bg-gradient-to-r from-[#fcba28] to-[#FF652F] px-4 py-1 text-xs font-bold uppercase tracking-wider text-background shadow-lg">
                                            Most Popular
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <Icon className={cn(
                                            "h-6 w-6",
                                            pkg.popular ? "text-[#fcba28]" : "text-white/70"
                                        )} />
                                        <div>
                                            <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
                                            <p className="text-sm text-white/60">{pkg.tagline}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-baseline gap-x-2 mb-6">
                                        <span className="text-sm line-through opacity-50 text-white/50">${pkg.originalPrice}</span>
                                        <span className="text-4xl font-black text-white">${pkg.price}</span>
                                        <span className="text-sm font-medium text-white/70">USD</span>
                                    </div>

                                    <ul role="list" className="mb-8 space-y-3 text-sm">
                                        {pkg.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center gap-3">
                                                {typeof feature === 'string' ? (
                                                    <>
                                                        <Check className={cn(
                                                            "h-5 w-5",
                                                            pkg.popular ? "text-[#fcba28]" : "text-white/70"
                                                        )} />
                                                        <span className="text-white/80">{feature}</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        {feature.icon === "Zap" && (
                                                            <Zap className="h-5 w-5 text-[#fcba28] animate-pulse" />
                                                        )}
                                                        {feature.icon === "Sparkles" && (
                                                            <Sparkles className="h-5 w-5 text-[#fcba28]" />
                                                        )}
                                                        {feature.icon === "Crown" && (
                                                            <Crown className="h-5 w-5 text-[#fcba28]" />
                                                        )}
                                                        <span className="text-white/80">{feature.text}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="space-y-4">
                                    <BuyButton 
                                        text={pkg.popular ? "GET STARTED NOW" : "SELECT PLAN"}
                                        kit={pkg.name as "Basic Prep" | "Pro Interview" | "Elite Success"}
                                        className={cn(
                                            "w-full justify-center",
                                            pkg.popular && "bg-gradient-to-r from-[#fcba28] to-[#FF652F] text-background hover:from-[#fcba28]/90 hover:to-[#FF652F]/90"
                                        )}
                                    />
                                    <p className="text-xs text-center text-white/60">
                                        30-day money-back guarantee
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <p className="text-white/60">
                        Need a custom plan for your organization?{" "}
                        <a href="#contact" className="text-[#fcba28] hover:underline">
                            Contact us
                        </a>
                    </p>
                </motion.div>
            </MaxWidthWrapper>
        </section>
    );
};
