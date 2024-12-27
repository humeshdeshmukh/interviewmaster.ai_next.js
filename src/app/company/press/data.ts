import { Newspaper, Award, TrendingUp, Users } from "lucide-react";

export const pressReleases = [
  {
    date: "December 26, 2024",
    title: "InterviewMaster.AI Launches Revolutionary AI-Powered Interview Preparation Platform",
    excerpt: "InterviewMaster.AI announces the launch of its cutting-edge platform, revolutionizing how tech professionals prepare for interviews with AI-driven personalized feedback.",
    link: "/press/launch-announcement",
    category: "Product Launch",
  },
  {
    date: "December 15, 2024",
    title: "InterviewMaster.AI Reaches 50,000 Active Users Milestone",
    excerpt: "The rapidly growing interview preparation platform celebrates reaching 50,000 monthly active users across 20+ countries.",
    link: "/press/user-milestone",
    category: "Company News",
  },
  {
    date: "December 1, 2024",
    title: "InterviewMaster.AI Reports 96% Interview Success Rate",
    excerpt: "Platform users report unprecedented success in technical interviews, with 96% receiving job offers after preparation.",
    link: "/press/success-rate",
    category: "Success Stories",
  },
  {
    date: "November 15, 2024",
    title: "InterviewMaster.AI Expands Global Reach",
    excerpt: "The platform now supports tech professionals across 20+ countries, offering localized content and cultural context for interviews.",
    link: "/press/global-expansion",
    category: "Expansion",
  },
];

export const companyStats = [
  {
    icon: Users,
    label: "Active Users",
    value: "50K+",
    description: "Monthly active users preparing for tech interviews",
  },
  {
    icon: Award,
    label: "Success Rate",
    value: "96%",
    description: "Users successfully landing their target roles",
  },
  {
    icon: TrendingUp,
    label: "Growth",
    value: "200%",
    description: "Month-over-month user base growth",
  },
  {
    icon: Newspaper,
    label: "Press Coverage",
    value: "50+",
    description: "Featured in leading tech publications",
  },
];

export const mediaResources = {
  brandAssets: {
    title: "Brand Assets",
    description: "Download official InterviewMaster.AI logos, screenshots, and brand guidelines.",
    items: [
      {
        name: "Logo Package",
        format: "ZIP",
        size: "2.5 MB",
        link: "/press/assets/logo-package.zip",
      },
      {
        name: "Brand Guidelines",
        format: "PDF",
        size: "1.2 MB",
        link: "/press/assets/brand-guidelines.pdf",
      },
      {
        name: "Product Screenshots",
        format: "ZIP",
        size: "5.8 MB",
        link: "/press/assets/screenshots.zip",
      },
    ],
  },
  factSheet: {
    title: "Fact Sheet",
    description: "Key information about InterviewMaster.AI, our mission, and impact.",
    items: [
      {
        title: "Founded",
        value: "2024",
      },
      {
        title: "Headquarters",
        value: "Nagpur, Maharashtra, India",
      },
      {
        title: "Platform Launch",
        value: "September 2024",
      },
      {
        title: "Users",
        value: "50,000+ monthly active users",
      },
      {
        title: "Global Reach",
        value: "20+ countries",
      },
      {
        title: "Success Rate",
        value: "96% interview success rate",
      },
    ],
  },
};

export const pressContacts = {
  media: {
    name: "Media Inquiries",
    email: "press@interviewmaster.ai",
    response: "Response within 24 hours",
  },
  partnerships: {
    name: "Partnership Opportunities",
    email: "partnerships@interviewmaster.ai",
    response: "Response within 48 hours",
  },
};
