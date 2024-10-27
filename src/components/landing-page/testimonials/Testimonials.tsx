"use client";

import Link from "next/link";
import Image from 'next/image';
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

import {
    Star,
    Play,
    Smile,
    Pause,
    Rocket,
    Volume2,
    VolumeX,
    Sparkles,
} from 'lucide-react';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from "@/components/ui/card";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"


interface TestimonialData {
    name: string;
    review: string;
    rating: number;
}

export const Testimonials = () => {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true })
    const [testimonials, setTestimonials] = useState<TestimonialData[]>(
        Array(3).fill({ name: '', review: '', rating: 0 })
    )

    const handleInputChange = (index: number, field: keyof TestimonialData, value: string | number) => {
        const newTestimonials = [...testimonials]
        newTestimonials[index] = { ...newTestimonials[index], [field]: value }
        setTestimonials(newTestimonials)
    }

    const handleStarClick = (index: number, rating: number) => {
        handleInputChange(index, 'rating', rating)
    }

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }
    return (
        <section id="how-to-use" className="relative overflow-hidden">
            <MaxWidthWrapper className="relative flex flex-col items-center py-20 md:py-32">
                {/* Testimonials Header */}
                <div className="flex flex-col justify-center items-center gap-4 max-w-xl mb-4 md:mb-6">
                    <ChipBanner text="HEARTFELT TRUTH(s)" />
                    <h2 className="flex-1 font-extrabold text-xl text-center md:text-3xl lg:text-5xl">
                        Outstanding <strong className="text-[#fcba28]">results</strong> require outstanding <strong className="text-[#fcba28]">people</strong>
                    </h2>
                </div>
                <p className="flex-1 font-medium text-base text-center justify-center md:text-lg  max-w-lg w-full">
                    If you are ready to transform ideas int reality quickly, then you&apos;ll fit right in here!
                </p>

                {/* HowToUse Video */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="lg:col-span-2 lg:row-span-1"
                    >
                        <Card className="overflow-hidden h-fit bg-[#fcba28]/90 border-b-8 border-r-8 rounded-2xl border-neutral-900">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <video
                                        ref={videoRef}
                                        className="size-50 object-cover"
                                    >
                                        <source src="/brett-testimonial.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={togglePlay}
                                            className="bg-[#FF652F] text-background hover:bg-[#FF652F]/90"
                                        >
                                            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            onClick={toggleMute}
                                            className="bg-[#FF652F] text-background hover:bg-[#FF652F]/90"
                                        >
                                            {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4 flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-6 w-6 text-[#FF652F]" fill="currentColor" />
                                        ))}
                                    </div>
                                    <blockquote className="mb-4 text-lg font-medium italic text-background">
                                        &quot;I&apos;ve never had a website that communicates just how badass my work is.&quot;
                                    </blockquote>
                                    <div className="flex items-center">
                                        <Image
                                            width={50}
                                            height={50}
                                            alt="Brett Bailey"
                                            src={process.env.S3_BUCKET!}
                                            className="mr-4 rounded-full object-cover"
                                        />
                                        <div>
                                            <p className="font-semibold text-background">Brett Bailey</p>
                                            <p className="text-sm text-background/80">Founder of Brett Bailey Men&apos; Coaching</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                        >
                            <Card className="relative h-full bg-foreground border-b-8 border-r-8 rounded-2xl border-background ">
                                <CardContent className="flex h-full flex-col items-start justify-center p-6">
                                    {testimonial.name ? (
                                        <Sparkles className="mb-4 size-12 text-background transform" />
                                    ) : (
                                        <Smile className="mb-4 size-12 text-background transform " />
                                    )}
                                    <h3 className="mb-2 text-2xl font-bold text-background uppercase transform">
                                        {testimonial.name || "This could be totally you!"}
                                    </h3>
                                    <p className="text-background italic text-lg transform mb-4">
                                        {testimonial.review || "Picture your success, right next to your awesome app!"}
                                    </p>
                                    <div className="space-y-4 w-full">
                                        <div className="flex items-center space-x-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Button
                                                    size="sm"
                                                    key={star}
                                                    variant="ghost"
                                                    className={`p-0 ${star <= testimonial.rating ? 'text-[#FF652F]' : 'text-background'}`}
                                                    onClick={() => handleStarClick(index, star)}
                                                >
                                                    <Star className="h-6 w-6" fill={star <= testimonial.rating ? 'currentColor' : 'none'} />
                                                </Button>
                                            ))}
                                        </div>
                                        <Input
                                            placeholder="Your Awesome Name"
                                            value={testimonial.name}
                                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                                            className="bg-foreground/50 border-background text-background placeholder-background/50"
                                        />
                                        <Textarea
                                            placeholder="Share your epic experience!"
                                            value={testimonial.review}
                                            onChange={(e) => handleInputChange(index, 'review', e.target.value)}
                                            className="bg-foreground/50 border-background text-background placeholder-background/50"
                                        />
                                        <Button
                                            asChild
                                            variant="secondary"
                                            className="mt-auto bg-[#fcba28] text-background hover:bg-[#fcba28]/90 rounded-full text-lg font-bold px-6 py-3 w-full"
                                        >
                                            <Link href="#cta">
                                            GRAB YOUR SPOT
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Card className="h-full bg-[#0ba95b] border-b-8 border-r-8 rounded-2xl border-neutral-900">
                            <CardContent className="flex h-full flex-col items-start justify-between p-6">
                                <div>
                                    <Rocket className="mb-4 h-12 w-12 text-foreground" />
                                    <h3 className="mb-2 text-2xl font-bold text-foreground uppercase transform">Ready to blast off?</h3>
                                    <p className="text-foreground italic text-lg transform mb-4">
                                        My client list soon will be hotter than a supernova! Don&apos;t be left floating in space!
                                    </p>
                                </div>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="secondary"
                                    className="mt-auto bg-[#f38ba3] text-[#272727] hover:bg-[#f38ba3]/90 rounded-full text-lg font-bold px-6 py-3 w-full"
                                >
                                    <Link href="#cta">
                                        LAUNCH YOUR JOURNEY
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </MaxWidthWrapper>
        </section>
    )
}

// Instructions
/*

The Testimonials component showcases real user experiences with your product. 

Testimonial Structure:
Each testimonial should follow this general format:
1. Client's initial problem or challenge
2. How your product provided a solution
3. Specific results or benefits the client experienced
4. Overall satisfaction or recommendation

Video Testimonials:
   TODO: If possible, include video testimonials for higher impact.
   TODO: Ensure good video and audio quality.
   TODO: Keep videos concise (30-60 seconds) and focused.
   TODO: You can download this in YouTube for free or use other cloud services to store the videos. 
   TODO: Its not ideal to add them in your public file because it will slow down your website.

Image Testimonials:
   TODO: If possible, include image testimonials for higher impact.
   TODO: Ensure good image quality this could be coming from (Twitter, Facebook, LinkedIn etc...).
*/