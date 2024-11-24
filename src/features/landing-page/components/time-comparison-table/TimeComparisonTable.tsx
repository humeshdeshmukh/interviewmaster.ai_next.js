"use client";

import {
    motion,
    useInView,
    useAnimation,
} from 'framer-motion';
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"

const tasks = [
    { name: "Setting up user authentication and candidate profiles", scratch: "5 hours", kit: "15 minutes" },
    { name: "Creating and designing interview question templates", scratch: "7+ hours", kit: "30 minutes" },
    { name: "Integrating payment systems for subscription plans", scratch: "6 hours", kit: "20 minutes" },
    { name: "Building automated email systems for candidate feedback", scratch: "5 hours", kit: "20 minutes" },
    { name: "Configuring the database for scalable candidate data", scratch: "5 hours", kit: "10 minutes" },
    { name: "Implementing multi-user role management", scratch: "2 hours", kit: "10 minutes" },
    { name: "Ensuring mobile responsiveness for interview forms", scratch: "3 hours", kit: "Already optimized" },
    { name: "Adding SEO for interview-related keywords", scratch: "2 hours", kit: "Pre-configured" },
    { name: "Setting up analytics to monitor platform usage", scratch: "4 hours", kit: "10 minutes" },
]

export const TimeComparisonTable = () => {
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.01 }
            }
        }
    };

    return (
        <section id="time-comparison-table" className="min-h-screen flex items-center justify-center bg-[#272727] p-4">
            <MaxWidthWrapper className="relative z-20 w-full max-w-4xl space-y-8 pb-16 pt-32">
                <h2 className="text-3xl font-bold text-center text-[#f9f4da]">InterviewMaster.ai: Time-Saving Features</h2>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-[#FF652F] text-[#f9f4da]">
                                <th className="p-3 text-left">Task</th>
                                <th className="p-3 text-center">Building From Scratch</th>
                                <th className="p-3 text-center">Using InterviewMaster.ai</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-[#272727]" : "bg-[#2f2f2f]"}>
                                    <td className="p-3 text-[#f9f4da] border-b border-[#3f3f3f]">{task.name}</td>
                                    <td className="p-3 text-center text-[#CFCFCF] border-b border-[#3f3f3f]">{task.scratch}</td>
                                    <td className="p-3 text-center text-[#fcba28] font-semibold border-b border-[#3f3f3f]">{task.kit}</td>
                                </tr>
                            ))}
                            <tr className="bg-[#2f2f2f] font-bold">
                                <td className="p-3 text-[#f9f4da]">Total Time Spent</td>
                                <td className="p-3 text-center text-[#CFCFCF]">30+ hours</td>
                                <td className="p-3 text-center text-[#fcba28]">Less than 2 hours</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="bg-[#3f3f3f] p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-[#f38ba3] mb-4">Time Saved: 30+ hours</h3>
                    <p className="text-[#f9f4da] leading-relaxed">
                        With <strong>InterviewMaster.ai</strong>, recruiters and hiring managers can drastically reduce setup and configuration time 
                        from over 30 hours to less than 2 hours, enabling them to 
                        <strong className="underline text-[#fcba28]">focus on finding and nurturing top talent quickly and efficiently.</strong>
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[#f9f4da]">
                    <span className="text-lg line-through">Building From Scratch</span>
                    <ArrowRight className="text-[#FF652F] w-8 h-8 rotate-90 md:rotate-0" />
                    <div ref={ref} className="relative inline-block">
                        <span className="text-lg font-bold text-[#fcba28] z-10 relative px-2 py-1">
                            Using InterviewMaster.ai
                        </span>
                        <motion.svg
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            width="200%"
                            height="200%"
                            viewBox="0 0 360 80"
                            initial="hidden"
                            animate={controls}
                        >
                            <motion.path
                                d="M20,40 C20,10 340,0 340,40 C340,70 20,80 20,40"
                                fill="transparent"
                                strokeWidth="2"
                                stroke="#FF652F"
                                variants={draw}
                                custom={0}
                            />
                        </motion.svg>
                    </div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}
