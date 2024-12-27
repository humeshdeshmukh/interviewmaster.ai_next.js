// @ts-nocheck
"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from "next/link";
import Image from 'next/image';
import { useState, useRef, memo, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

import {
    Star,
    Play,
    Pause,
    Volume2,
    VolumeX,
    Quote,
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

// Memoized components for better performance
const StarRating = memo(({ rating }: { rating: number }) => (
    <div className="flex gap-1">
        {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 text-[#FF652F]" fill="currentColor" />
        ))}
    </div>
));
StarRating.displayName = 'StarRating';

const TestimonialCard = memo(({ testimonial }: { testimonial: typeof testimonialData[0] }) => (
    <Card className="h-full bg-foreground/5 hover:bg-foreground/10 transition-colors duration-300 backdrop-blur-sm border-none shadow-lg">
        <CardContent className="p-6 flex flex-col h-full">
            <Quote className="w-8 h-8 text-[#fcba28] mb-4" />
            <StarRating rating={testimonial.rating} />
            <blockquote className="my-4 text-lg italic text-foreground/90">
                &quot;{testimonial.review}&quot;
            </blockquote>
            <div className="flex items-center mt-auto pt-4 border-t border-foreground/10">
                <div className="relative w-10 h-10">
                    <Image
                        fill
                        alt={testimonial.name}
                        src={testimonial.image}
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="ml-3">
                    <p className="font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/70">{testimonial.role}</p>
                </div>
            </div>
        </CardContent>
    </Card>
));
TestimonialCard.displayName = 'TestimonialCard';

// Optimized testimonial data
const testimonialData = [
    {
        name: "Sarah Johnson",
        role: "Software Engineer at Google",
        review: "InterviewMaster.ai transformed my interview preparation. The AI-powered mock interviews and real-time feedback helped me land my dream job at Google.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Michael Chen",
        role: "Senior Developer at Microsoft",
        review: "The technical interview preparation on InterviewMaster.ai is outstanding. The platform's coding challenges and system design scenarios are incredibly realistic.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Emma Rodriguez",
        role: "Product Manager at Amazon",
        review: "From behavioral questions to case studies, InterviewMaster.ai covered everything I needed. The personalized feedback was instrumental in my interview success.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "David Patel",
        role: "Full Stack Developer at Meta",
        review: "The mock interviews and instant AI feedback helped me identify and improve my weak areas. I felt much more confident during my actual interviews.",
        rating: 5,
        image: "/avatar.png"
    },
    {
        name: "Lisa Wang",
        role: "Data Scientist at Netflix",
        review: "InterviewMaster.ai's machine learning focused interview prep was exactly what I needed. The platform's comprehensive coverage helped me ace my technical rounds.",
        rating: 5,
        image: "/avatar.png"
    }
];

const VideoTestimonial = memo(({ isPlaying, isMuted, onPlayClick, onMuteClick }: {
    isPlaying: boolean;
    isMuted: boolean;
    onPlayClick: () => void;
    onMuteClick: () => void;
}) => (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-black/5">
        <video className="w-full h-full object-cover">
            <source src="/coming-soon-clip.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 hover:bg-black/30" />
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <Button
                size="icon"
                variant="secondary"
                onClick={onPlayClick}
                className="bg-white/90 hover:bg-white transition-colors duration-300"
            >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
                size="icon"
                variant="secondary"
                onClick={onMuteClick}
                className="bg-white/90 hover:bg-white transition-colors duration-300"
            >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
        </div>
    </div>
));
VideoTestimonial.displayName = 'VideoTestimonial';

export const Testimonials = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    const togglePlay = useCallback(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Auto-play was prevented, handle silently
                        setIsPlaying(false);
                    });
                }
            }
            setIsPlaying(!isPlaying);
        }
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    }, [isMuted]);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.muted = isMuted;
        }
        return () => {
            if (video) {
                video.pause();
            }
        };
    }, [isMuted]);

    return (
        <section ref={sectionRef} className="relative py-20 bg-gradient-to-b from-background to-background/95">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <MaxWidthWrapper>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center justify-center mb-12"
                >
                    <ChipBanner text="SUCCESS STORIES" />
                    <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-center">
                        Trusted by <span className="text-[#fcba28]">Industry Leaders</span>
                    </h2>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto text-center">
                        Join thousands of professionals who have transformed their careers with InterviewMaster.ai
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Featured Video Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                        className="col-span-1 md:col-span-2 lg:col-span-1"
                    >
                        <Card className="h-full bg-[#fcba28]/10 hover:bg-[#fcba28]/20 transition-colors duration-300 backdrop-blur-sm border-none shadow-lg">
                            <CardContent className="p-6 flex flex-col h-full">
                                <VideoTestimonial
                                    isPlaying={isPlaying}
                                    isMuted={isMuted}
                                    onPlayClick={togglePlay}
                                    onMuteClick={toggleMute}
                                />
                                <div className="mt-6">
                                    <StarRating rating={5} />
                                    <blockquote className="my-4 text-lg italic text-foreground/90">
                                        &quot;InterviewMaster.ai's AI-powered mock interviews completely transformed our hiring process. The quality of candidates improved significantly.&quot;
                                    </blockquote>
                                    <div className="flex items-center">
                                        <div className="relative w-10 h-10">
                                            <Image
                                                fill
                                                alt="John Doe"
                                                src="/avatar.png"
                                                className="rounded-full object-cover"
                                            />
                                        </div>
                                        <div className="ml-3">
                                            <p className="font-medium text-foreground">Alex Thompson</p>
                                            <p className="text-sm text-foreground/70">Technical Director, Apple</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Text Testimonials */}
                    {testimonialData.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                            transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                        >
                            <TestimonialCard testimonial={testimonial} />
                        </motion.div>
                    ))}
                </div>
            </MaxWidthWrapper>
        </section>
    );
};
