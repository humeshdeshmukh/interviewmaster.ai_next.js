/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { Authenticated, Unauthenticated, AuthLoading } from 'convex/react';
import { FaTwitter, FaLinkedin, FaFacebook, FaInstagram, FaGithub } from 'react-icons/fa6';
import { LuBookOpen, LuBriefcase, LuGraduationCap, LuUsers, LuBuilding, LuSearch } from 'react-icons/lu';
import { Button } from './ui/button';

import { Logo } from './Logo';
import { NavLink } from './NavLink';
import { MobileMenu } from './MobileMenu';
import { MaxWidthWrapper } from './MaxWidthWrapper';
import { UserButton } from '../features/auth/components/UserButton';
import { UserButtonLoading } from '../features/auth/components/UserButtonLoading';

// Navigation configuration
const navigationConfig = {
  socialLinks: [
    { href: 'https://x.com/interviewmaster', icon: FaTwitter, label: 'Twitter', hoverColor: 'hover:text-[#1DA1F2]' },
    { href: 'https://linkedin.com/company/interviewmaster', icon: FaLinkedin, label: 'LinkedIn', hoverColor: 'hover:text-[#0077B5]' },
    { href: 'https://facebook.com/interviewmaster', icon: FaFacebook, label: 'Facebook', hoverColor: 'hover:text-[#4267B2]' },
    { href: 'https://instagram.com/interviewmaster', icon: FaInstagram, label: 'Instagram', hoverColor: 'hover:text-[#E4405F]' },
    { href: 'https://github.com/interviewmaster', icon: FaGithub, label: 'GitHub', hoverColor: 'hover:text-[#333]' },
  ],
  navigationMenus: [
    {
      title: 'Products',
      icon: LuBookOpen,
      links: [
        { href: '/products/resume-builder', label: 'Resume Builder', description: 'Create professional resumes with AI assistance' },
        { href: '/products/mock-interviews', label: 'Mock Interviews', description: 'Practice with AI-powered interview simulations' },
        { href: '/products/ai-feedback', label: 'AI Feedback', description: 'Get instant feedback on your interview responses' },
        { href: '/products/skills-analyzer', label: 'Skills Analyzer', description: 'Assess your technical and soft skills' },
        { href: '/products/interview-questions', label: 'Interview Questions', description: 'Access our curated question bank' },
        { href: '/products/Practice-Tests', label: 'Practice Tests', description: 'Test your knowledge with our assessments' },
      ],
    },
    {
      title: 'Services',
      icon: LuBriefcase,
      links: [
        { href: '/services/consultation', label: 'Career Consultation', description: 'Get expert career guidance' },
        { href: '/services/cv-revision', label: 'CV Revision', description: 'Professional CV review and optimization' },
        { href: '/services/mock-tests', label: 'Mock Tests', description: 'Industry-specific mock interviews' },
        { href: '/services/interview-coaching', label: 'Interview Coaching', description: 'One-on-one interview preparation' },
        { href: '/services/personal-branding', label: 'Personal Branding', description: 'Build your professional brand' },
        { href: '/services/salary-negotiation', label: 'Salary Negotiation', description: 'Learn effective negotiation strategies' },
      ],
    },
    {
      title: 'Resources',
      icon: LuGraduationCap,
      links: [
        { href: '/resources/blog', label: 'Blog', description: 'Latest interview tips and trends' },
        { href: '/resources/faq', label: 'FAQ', description: 'Common interview questions answered' },
        { href: '/resources/ebooks', label: 'Ebooks & Guides', description: 'Comprehensive interview guides' },
        { href: '/resources/tutorials', label: 'Tutorials', description: 'Step-by-step interview preparation' },
        { href: '/resources/webinars', label: 'Webinars', description: 'Live and recorded training sessions' },
        { href: '/resources/newsletters', label: 'Newsletters', description: 'Weekly interview insights' },
      ],
    },
    {
      title: 'Community',
      icon: LuUsers,
      links: [
        { href: '/community/forums', label: 'Forums', description: 'Connect with fellow job seekers' },
        { href: '/community/events', label: 'Events', description: 'Join our community events' },
        { href: '/community/mentorship', label: 'Mentorship', description: 'Find a mentor or become one' },
        { href: '/community/success-stories', label: 'Success Stories', description: 'Read inspiring success stories' },
        { href: '/community/meetups', label: 'Meetups', description: 'Network at local meetups' },
        { href: '/community/hackathons', label: 'Hackathons', description: 'Participate in coding challenges' },
      ],
    },
    {
      title: 'Company',
      icon: LuBuilding,
      links: [
        { href: '/company/about', label: 'About Us', description: 'Learn about our mission' },
        { href: '/company/careers', label: 'Careers', description: 'Join our growing team' },
        { href: '/company/partners', label: 'Partners', description: 'Our trusted partners' },
        { href: '/company/contact', label: 'Contact Us', description: 'Get in touch with us' },
        { href: '/company/press', label: 'Press', description: 'Latest news and updates' },
        { href: '/company/investors', label: 'Investors', description: 'Investment opportunities' },
      ],
    },
  ],
};

export const Header = () => {
  const router = useRouter();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mount after initial render to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handler with debounce
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const shouldBeScrolled = latest > 100;
    if (scrolled !== shouldBeScrolled) {
      setScrolled(shouldBeScrolled);
    }
  });

  // Memoized handlers
  const handleSearchToggle = useCallback(() => {
    setShowSearch(prev => !prev);
  }, []);

  const handleSearchClose = useCallback(() => {
    setShowSearch(false);
  }, []);

  // Don't render until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16',
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      )}
      initial={false}
    >
      <MaxWidthWrapper className="h-full">
        <nav className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex-shrink-0 w-[200px]">
            <Link href="/" className="flex items-center space-x-2 group">
              <Logo className="w-8 h-8 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-semibold text-lg tracking-tight">
                <span className="text-primary"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4 space-x-1">
            {navigationConfig.navigationMenus.map((menu, idx) => (
              <NavigationItem key={idx} menu={menu} />
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2 flex-shrink-0 w-[200px] justify-end">
            <SearchButton onClick={handleSearchToggle} />
            <SocialLinks />
            <AuthSection router={router} />
            <MobileMenuButton />
          </div>
        </nav>
      </MaxWidthWrapper>

      {/* Search Overlay */}
      <AnimatePresence mode="wait">
        {showSearch && (
          <SearchOverlay onClose={handleSearchClose} />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Extracted components
const NavigationItem = ({ menu }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative px-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        className={cn(
          "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
          "hover:bg-white/10 active:scale-95",
          "text-sm font-medium"
        )}
      >
        <menu.icon className="w-4 h-4" />
        <span>{menu.title}</span>
      </button>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'absolute top-full left-1/2 -translate-x-1/2 pt-2',
              'w-[380px] p-4 rounded-xl shadow-lg',
              'bg-background/95 backdrop-blur-xl border border-white/10',
              'grid grid-cols-1 gap-2'
            )}
          >
            {menu.links.map((link, linkIdx) => (
              <Link
                key={linkIdx}
                href={link.href}
                className={cn(
                  "flex flex-col space-y-1 p-3 rounded-lg",
                  "hover:bg-white/5 transition-colors duration-200",
                  "group/link"
                )}
              >
                <span className="font-medium text-sm group-hover/link:text-primary transition-colors">
                  {link.label}
                </span>
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {link.description}
                </span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SearchButton = ({ onClick }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={onClick}
    className="hidden md:flex"
    aria-label="Search"
  >
    <LuSearch className="w-4 h-4" />
  </Button>
);

const SocialLinks = () => (
  <div className="hidden xl:flex items-center">
    {navigationConfig.socialLinks.map((social, idx) => (
      <Link
        key={idx}
        href={social.href}
        target="_blank"
        className={cn(
          "p-2 rounded-lg transition-all duration-200",
          "hover:bg-white/5",
          social.hoverColor
        )}
        aria-label={social.label}
      >
        <social.icon className="w-4 h-4" />
      </Link>
    ))}
  </div>
);

const AuthSection = ({ router }) => (
  <div className="flex items-center space-x-2">
    <AuthLoading>
      <UserButtonLoading />
    </AuthLoading>
    <Authenticated>
      <UserButton />
    </Authenticated>
    <Unauthenticated>
      <Button
        variant="default"
        size="sm"
        className="bg-primary text-primary-foreground hover:bg-primary/90"
        onClick={() => router.push('/login')}
      >
        Sign In
      </Button>
    </Unauthenticated>
  </div>
);

const MobileMenuButton = () => (
  <div className="lg:hidden">
    <MobileMenu />
  </div>
);

const SearchOverlay = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
    className="absolute top-full left-0 right-0 p-4 border-t border-white/10"
  >
    <MaxWidthWrapper>
      <div className={cn(
        "flex items-center space-x-4 h-12 px-4 rounded-lg",
        "bg-background/95 backdrop-blur-xl",
        "border border-white/10 shadow-lg"
      )}>
        <LuSearch className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search everything..."
          className={cn(
            "flex-1 bg-transparent border-none",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-0"
          )}
          autoFocus
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </MaxWidthWrapper>
  </motion.div>
);
