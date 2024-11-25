"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { LINKS } from "@/features/landing-page/lib/constants";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { MaxWidthWrapper } from "./MaxWidthWrapper";
import { FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { UserButton } from "../features/auth/components/UserButton";
import { UserButtonLoading } from "../features/auth/components/UserButtonLoading";

export const Header = () => {
    const router = useRouter();
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [dropdownTimer, setDropdownTimer] = useState<NodeJS.Timeout | null>(null);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 100);
    });

    // Function to handle mouse enter with a delay
    const handleMouseEnter = (text: string) => {
        // Clear any existing timer to avoid multiple timers running at once
        if (dropdownTimer) clearTimeout(dropdownTimer);
        // Set a new timer to activate the dropdown after 200ms
        const timer = setTimeout(() => setActiveDropdown(text), 200);
        setDropdownTimer(timer);
    };

    // Function to handle mouse leave with a delay
    const handleMouseLeave = () => {
        // Clear any existing timer on mouse leave
        if (dropdownTimer) clearTimeout(dropdownTimer);
        // Set a new timer to deactivate the dropdown after 200ms
        setDropdownTimer(setTimeout(() => setActiveDropdown(null), 200));
    };

    return (
        <motion.header
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 1.25, ease: "easeInOut" }}
            className={cn(
                "fixed left-0 right-0 top-0 z-50 py-6 bg-background transition-colors duration-300 ease-in-out",
                scrolled && "bg-background/95 backdrop-blur-lg border-b border-background/50"
            )}
        >
            <MaxWidthWrapper>
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <Logo className="flex-shrink-0" />
                        <span className="text-2xl font-bold text-primary tracking-wide md:text-3xl lg:text-4xl">
                            {/* Logo Text (if needed) */}
                        </span>
                    </div>

                    {/* Desktop Links with Dropdowns */}
                    <div className="hidden md:flex flex-1 items-center justify-center gap-10">
                        {LINKS.map((link, index) => (
                            <div
                                key={index}
                                className="relative group"
                                onMouseEnter={() => handleMouseEnter(link.text)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {/* Main Link Button */}
                                <button className="text-white text-xl font-semibold tracking-wide transform transition-all duration-300 ease-in-out hover:text-[#fcba28]">
                                    {link.text}
                                </button>

                                {/* Dropdown Menu */}
                                {activeDropdown === link.text && link.subLinks && (
                                    <div className="absolute left-0 mt-3 bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg py-4 px-6 w-64 shadow-xl transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100">
                                        {link.subLinks.map((subLink, idx) => (
                                            <Link
                                                key={idx}
                                                href={subLink.href}
                                                className="block text-lg py-2 text-gray-200 hover:text-white hover:bg-[#fcba28] rounded-md transform transition-all duration-300 ease-in-out"
                                            >
                                                {subLink.text}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Social Links & Auth Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            target="_blank"
                            href="https://x.com/0dev_vault"
                        >
                            <FaXTwitter className="size-6 text-muted-foreground hover:text-[#fcba28] transition duration-200 ease-in-out" />
                        </Link>
                        <Link
                            target="_blank"
                            href="https://linkedin.com/in/lonzochris/"
                        >
                            <FaLinkedin className="size-6 text-muted-foreground hover:text-[#fcba28] transition duration-200 ease-in-out" />
                        </Link>

                        {/* Auth States */}
                        <AuthLoading>
                            <UserButtonLoading />
                        </AuthLoading>
                        <Unauthenticated>
                            <button
                                onClick={() => router.push("/auth")}
                                className="px-8 py-2 rounded-full tracking-widest uppercase font-bold bg-transparent border-2 border-[#fcba28] hover:bg-[#fcba28] text-[#fcba28] hover:text-background transition duration-200 ease-in-out"
                            >
                                Login
                            </button>
                        </Unauthenticated>
                        <Authenticated>
                            <UserButton />
                        </Authenticated>
                    </div>

                    {/* Mobile Menu */}
                    <MobileMenu />
                </nav>
            </MaxWidthWrapper>
        </motion.header>
    );
};
