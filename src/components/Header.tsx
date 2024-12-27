/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { 
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaFile,
  FaUserTie,
  FaRobot,
  FaChartLine,
  FaCircleQuestion,
  FaClipboard,
  FaComments,
  FaPen,
  FaListCheck,
  FaChalkboard,
  FaCircleUser,
  FaHandshake,
  FaBook,
  FaNewspaper,
  FaVideo,
  FaDesktop,
  FaEnvelope,
  FaUsers,
  FaCalendar,
  FaUserGraduate,
  FaTrophy,
  FaCode,
  FaBuilding,
  FaInfo,
  FaBriefcase,
  FaCube,
  FaGear
} from 'react-icons/fa6';

import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import { UserButton } from '../features/auth/components/UserButton';
import { UserButtonLoading } from '../features/auth/components/UserButtonLoading';

// Social Links
const socialLinks = [
  { href: 'https://x.com/interviewmaster', icon: FaTwitter, label: 'Twitter' },
  { href: 'https://linkedin.com/company/interviewmaster', icon: FaLinkedin, label: 'LinkedIn' },
  { href: 'https://facebook.com/interviewmaster', icon: FaFacebook, label: 'Facebook' },
  { href: 'https://instagram.com/interviewmaster', icon: FaInstagram, label: 'Instagram' },
  { href: 'https://github.com/interviewmaster', icon: FaGithub, label: 'GitHub' },
];

// Navigation Menus with icons
const navigationMenus = [
  {
    title: 'Products',
    icon: FaCube,
    links: [
      { href: '/products/resume-builder', label: 'Resume Builder', icon: FaFile, description: 'Create professional resumes with AI assistance' },
      { href: '/products/mock-interviews', label: 'Mock Interviews', icon: FaUserTie, description: 'Practice with AI-powered interview simulations' },
      { href: '/products/ai-feedback', label: 'AI Feedback', icon: FaRobot, description: 'Get instant feedback on your interview responses' },
      { href: '/products/skills-analyzer', label: 'Skills Analyzer', icon: FaChartLine, description: 'Analyze and improve your technical skills' },
      { href: '/products/interview-questions', label: 'Interview Questions', icon: FaCircleQuestion, description: 'Access curated interview questions' },
      { href: '/products/Practice-Tests', label: 'Practice Tests', icon: FaClipboard, description: 'Take industry-specific practice tests' },
    ],
  },
  {
    title: 'Services',
    icon: FaGear,
    links: [
      { href: '/services/consultation', label: 'Career Consultation', icon: FaComments, description: 'Get expert career guidance' },
      { href: '/services/cv-revision', label: 'CV Revision', icon: FaPen, description: 'Professional CV review and optimization' },
      { href: '/services/mock-tests', label: 'Mock Tests', icon: FaListCheck, description: 'Practice with real interview scenarios' },
      { href: '/services/interview-coaching', label: 'Interview Coaching', icon: FaChalkboard, description: 'One-on-one interview preparation' },
      { href: '/services/personal-branding', label: 'Personal Branding', icon: FaCircleUser, description: 'Build your professional brand' },
      { href: '/services/salary-negotiation', label: 'Salary Negotiation', icon: FaHandshake, description: 'Learn effective negotiation strategies' },
    ],
  },
  {
    title: 'Resources',
    icon: FaBook,
    links: [
      { href: '/resources/blog', label: 'Blog', icon: FaNewspaper, description: 'Latest articles and insights' },
      { href: '/resources/faq', label: 'FAQ', icon: FaCircleQuestion, description: 'Frequently asked questions' },
      { href: '/resources/ebooks', label: 'Ebooks & Guides', icon: FaBook, description: 'In-depth learning materials' },
      { href: '/resources/tutorials', label: 'Tutorials', icon: FaVideo, description: 'Step-by-step video guides' },
      { href: '/resources/webinars', label: 'Webinars', icon: FaDesktop, description: 'Live and recorded sessions' },
      { href: '/resources/newsletters', label: 'Newsletters', icon: FaEnvelope, description: 'Stay updated with our newsletter' },
    ],
  },
  {
    title: 'Community',
    icon: FaUsers,
    links: [
      { href: '/community/forums', label: 'Forums', icon: FaComments, description: 'Join the discussion' },
      { href: '/community/events', label: 'Events', icon: FaCalendar, description: 'Upcoming community events' },
      { href: '/community/mentorship', label: 'Mentorship', icon: FaUserGraduate, description: 'Connect with mentors' },
      { href: '/community/success-stories', label: 'Success Stories', icon: FaTrophy, description: 'Community achievements' },
      { href: '/community/meetups', label: 'Meetups', icon: FaHandshake, description: 'Local community gatherings' },
      { href: '/community/hackathons', label: 'Hackathons', icon: FaCode, description: 'Coding competitions' },
    ],
  },
  {
    title: 'Company',
    icon: FaBuilding,
    links: [
      { href: '/company/about', label: 'About Us', icon: FaInfo, description: 'Our story and mission' },
      { href: '/company/careers', label: 'Careers', icon: FaBriefcase, description: 'Join our team' },
      { href: '/company/partners', label: 'Partners', icon: FaHandshake, description: 'Our trusted partners' },
      { href: '/company/contact', label: 'Contact Us', icon: FaEnvelope, description: 'Get in touch' },
      { href: '/company/press', label: 'Press', icon: FaNewspaper, description: 'Media coverage' },
      { href: '/company/investors', label: 'Investors', icon: FaChartLine, description: 'Investment opportunities' },
    ],
  },
];

const dropdownClasses = cn(
  'absolute hidden group-hover:flex flex-col mt-4 w-[480px] py-6 px-4 rounded-2xl shadow-2xl',
  'backdrop-blur-2xl bg-background/80 border border-border/10',
  'transition-all duration-350 transform scale-98 group-hover:scale-100 opacity-0 group-hover:opacity-100 z-50',
  'before:content-[""] before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-white/5 before:to-white/5 before:backdrop-blur-xl before:-z-10'
);

const menuItemClasses = cn(
  'relative flex items-start gap-4 p-4 rounded-xl transition-all duration-350',
  'hover:bg-[#fcba28]/5 hover:backdrop-blur-lg',
  'before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-b before:from-[#fcba28]/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300',
  'hover:before:opacity-100'
);

export const Header = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  // Increased timeout duration
  const HOVER_TIMEOUT = 300; // 300ms for smoother interaction

  // Mount check with increased timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsMounted(true);
    }, HOVER_TIMEOUT);

    return () => {
      setIsMounted(false);
      clearTimeout(timeout);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Click outside handler
  useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMounted]);

  // Scroll listener
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!isMounted) return;
    const shouldBeScrolled = latest > 100;
    if (scrolled !== shouldBeScrolled) {
      setScrolled(shouldBeScrolled);
    }
  });

  // Enhanced menu hover handler with delay
  const handleMenuHover = useCallback((index: number | null) => {
    if (!isMounted || isNavigating) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (index === null) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, HOVER_TIMEOUT);
    } else {
      setActiveMenu(index);
    }
  }, [isMounted, isNavigating, HOVER_TIMEOUT]);

  // Navigation handler
  const handleMenuClick = useCallback((href: string) => {
    if (isNavigating) return;
    
    setIsNavigating(true);
    setActiveMenu(null);
    
    try {
      router.push(href);
    } finally {
      // Reset navigation state after a short delay
      setTimeout(() => {
        setIsNavigating(false);
      }, 100);
    }
  }, [router, isNavigating]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, href?: string) => {
    if (!isMounted || isNavigating) return;
    
    if (event.key === 'Enter' && href) {
      handleMenuClick(href);
    } else if (event.key === 'Escape') {
      setActiveMenu(null);
    }
  }, [handleMenuClick, isMounted, isNavigating]);

  if (!isMounted) {
    return (
      <div className="fixed left-0 right-0 top-0 z-50 py-4 md:py-6 bg-background">
        <MaxWidthWrapper>
          <nav className="flex items-center justify-between">
            <Logo className="flex-shrink-0" />
          </nav>
        </MaxWidthWrapper>
      </div>
    );
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: '-100%' }}
      animate={{ opacity: 1, y: '0%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-2xl border-b border-border/10 shadow-lg'
          : 'bg-background'
      )}
    >
      <MaxWidthWrapper>
        <nav className="flex items-center h-20" role="navigation" ref={menuRef}>
          {/* Logo with hover effect */}
          <motion.div 
            className="flex items-center mr-16"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Logo className="flex-shrink-0" />
          </motion.div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-between flex-1">
            <ul className="flex items-center gap-12" role="menubar">
              {navigationMenus.map((menu, idx) => (
                <div
                  key={idx}
                  className="relative group"
                  onMouseEnter={() => handleMenuHover(idx)}
                  onMouseLeave={() => handleMenuHover(null)}
                  role="menuitem"
                  onKeyDown={(e) => handleKeyDown(e)}
                  tabIndex={0}
                >
                  <motion.button
                    className="flex items-center gap-2 py-2 text-base text-muted-foreground hover:text-[#fcba28] font-medium transition-all duration-300 group"
                    aria-expanded={activeMenu === idx}
                    aria-haspopup="true"
                    aria-label={menu.title}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {menu.icon && (
                      <menu.icon className="text-lg opacity-70 group-hover:opacity-100 group-hover:text-[#fcba28] transition-colors" />
                    )}
                    {menu.title}
                  </motion.button>

                  <AnimatePresence mode="wait">
                    {activeMenu === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className={dropdownClasses}
                        role="menu"
                      >
                        <div className="relative grid grid-cols-1 gap-1 px-2">
                          {menu.links.map((link, linkIdx) => (
                            <motion.div
                              key={linkIdx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: linkIdx * 0.05 }}
                              className="group/item"
                            >
                              <Link
                                href={link.href}
                                onClick={() => handleMenuClick(link.href)}
                                onKeyDown={(e) => handleKeyDown(e, link.href)}
                                className={menuItemClasses}
                                role="menuitem"
                                tabIndex={0}
                              >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fcba28]/5 group-hover/item:bg-[#fcba28]/10 text-[#fcba28] transition-colors">
                                  {link.icon && <link.icon className="h-5 w-5" />}
                                </span>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-white group-hover/item:text-[#fcba28] transition-colors mb-1">
                                    {link.label}
                                  </div>
                                  {link.description && (
                                    <div className="text-xs text-muted-foreground group-hover/item:text-white/70 transition-colors line-clamp-2">
                                      {link.description}
                                    </div>
                                  )}
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </ul>

            {/* Desktop Social Links & User Actions */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    target="_blank"
                    href={social.href}
                    aria-label={social.label}
                    className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-white/10 transition-all duration-300"
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground hover:text-[#fcba28] transition-colors" />
                  </Link>
                </motion.div>
              ))}
              <div className="h-6 w-px bg-border/10" />
              <AuthLoading>
                <UserButtonLoading />
              </AuthLoading>
              <Unauthenticated>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isNavigating && router.push('/auth')}
                  className="px-5 py-2 rounded-lg font-medium bg-[#fcba28] text-background hover:bg-[#fcba28]/90 transition-all duration-300"
                >
                  Sign in
                </motion.button>
              </Unauthenticated>
              <Authenticated>
                <UserButton />
              </Authenticated>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-4 ml-auto">
            <AuthLoading>
              <UserButtonLoading />
            </AuthLoading>
            <Unauthenticated>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => !isNavigating && router.push('/auth')}
                className="px-4 py-1.5 text-sm rounded-lg font-medium bg-[#fcba28] text-background hover:bg-[#fcba28]/90 transition-all duration-300"
              >
                Sign in
              </motion.button>
            </Unauthenticated>
            <Authenticated>
              <UserButton />
            </Authenticated>
            <div className="h-6 w-px bg-border/10" />
            <MobileMenu />
          </div>
        </nav>
      </MaxWidthWrapper>
    </motion.header>
  );
};
