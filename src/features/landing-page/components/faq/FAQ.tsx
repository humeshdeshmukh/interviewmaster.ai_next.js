"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { FiChevronDown } from "react-icons/fi";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const questions = [
    {
        id: 1,
        question: "What is InterviewMaster.ai?",
        answer: "InterviewMaster.ai is an advanced platform designed to help you excel in interviews by offering expert-curated questions, AI-driven feedback, and tailored learning resources."
    },
    {
        id: 2,
        question: "How does InterviewMaster.ai help with interview preparation?",
        answer: "Our platform provides interactive mock interviews, instant feedback, and personalized tips to improve your performance, ensuring you're ready for real-world challenges."
    },
    {
        id: 3,
        question: "Is InterviewMaster.ai suitable for all experience levels?",
        answer: "Yes! Whether you're a fresher or an experienced professional, our tools are designed to enhance your interview skills at any stage of your career."
    },
    {
        id: 4,
        question: "Can I track my progress over time?",
        answer: "Absolutely! Our platform includes detailed analytics and progress tracking to help you monitor improvements and focus on areas needing attention."
    },
    {
        id: 5,
        question: "What types of interviews does this platform cover?",
        answer: "InterviewMaster.ai covers technical, HR, behavioral, and domain-specific interviews tailored to various industries and roles."
    },
    {
        id: 6,
        question: "Is there a free trial available?",
        answer: "Yes, we offer a free trial to explore the platform’s features. Upgrade to unlock premium content and advanced tools."
    },
    {
        id: 7,
        question: "What kind of support is available for users?",
        answer: "You can contact our support team at humeshdeshmukh0@gmail.com for assistance with any questions or technical issues."
    },
    {
        id: 8,
        question: "Is InterviewMaster.ai accessible on mobile devices?",
        answer: "Yes! Our platform is fully optimized for mobile and desktop, ensuring you can practice anywhere, anytime."
    },
    {
        id: 9,
        question: "How often are the resources updated?",
        answer: "Our team regularly updates the content to reflect the latest industry trends and ensure relevance to current hiring practices."
    }
];

export const FAQ = () => {
    return (
        <section className="px-4 py-12">
            <MaxWidthWrapper>
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <hgroup className="flex flex-col gap-2 mt-6">
                        <h3 className="mb-4 text-3xl text-center md:text-start font-bold">
                            Frequently Asked Questions
                        </h3>
                        <p className="font-medium text-base text-center md:text-start md:text-lg max-w-md">
                            Have questions about InterviewMaster.ai? I’m here to assist. If your query isn’t covered here, reach out at{" "}
                            <Link
                                className="text-[#fcba28] font-bold hover:underline"
                                href="mailto:humeshdeshmukh0@gmail.com"
                            >
                                humeshdeshmukh0@gmail.com
                            </Link>.
                        </p>
                    </hgroup>
                    <aside>
                        {questions.map((q, i) => (
                            <Question key={i} title={q.question} defaultOpen={q.id === 1}>
                                {q.answer}
                            </Question>
                        ))}
                    </aside>
                </article>
            </MaxWidthWrapper>
        </section>
    );
};

const Question = ({
    title,
    children,
    defaultOpen = false,
}: {
    title: string;
    defaultOpen?: boolean;
    children: React.ReactNode;
}) => {
    const [ref, { height }] = useMeasure();
    const [open, setOpen] = useState(defaultOpen);

    return (
        <motion.div
            animate={open ? "open" : "closed"}
            className="border-b-[1px] border-b-slate-300"
        >
            <button
                onClick={() => setOpen((pv) => !pv)}
                className="flex w-full items-center justify-between gap-4 py-6"
            >
                <span className="text-[#fcba28] text-left text-lg font-bold">
                    {title}
                </span>
                <motion.span
                    variants={{
                        open: { rotate: "180deg" },
                        closed: { rotate: "0deg" },
                    }}
                >
                    <FiChevronDown className="text-2xl text-[#fcba28]" />
                </motion.span>
            </button>
            <motion.div
                initial={false}
                animate={{
                    height: open ? height : "0px",
                    marginBottom: open ? "24px" : "0px",
                }}
                className="overflow-hidden text-foreground"
            >
                <p ref={ref}>{children}</p>
            </motion.div>
        </motion.div>
    );
};
