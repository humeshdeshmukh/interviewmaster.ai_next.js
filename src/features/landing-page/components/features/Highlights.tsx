import { cn } from "@/lib/utils";
import { MdEmail } from "react-icons/md";
import { TbEaseInOut } from "react-icons/tb";
import { RiNextjsFill } from "react-icons/ri";
import { PiCreditCardFill } from "react-icons/pi";
import { SiGoogleanalytics } from "react-icons/si";
import { IoShieldCheckmark } from "react-icons/io5";
import { FaDatabase, FaRocket } from "react-icons/fa6";

export const Highlights = () => {
  const highlights = [
    {
      title: "Next.js Performance",
      description:
        "Enhance your app's speed and performance with the power of Next.js, built for optimized web development.",
      icon: <RiNextjsFill className="size-8" />,
    },
    {
      title: "Seamless Email Automation",
      description:
        "Effortlessly automate your email campaigns and user notifications with Resend integration.",
      icon: <MdEmail className="size-8" />,
    },
    {
      title: "Payment Gateways",
      description:
        "Integrate secure payment systems like Stripe or Lemon Squeezy for smooth online transactions.",
      icon: <PiCreditCardFill className="size-8" />,
    },
    {
      title: "Robust Authentication",
      description:
        "Ensure secure login for users with powerful authentication systems like NextAuth or Clerk.",
      icon: <IoShieldCheckmark className="size-8" />,
    },
    {
      title: "Customizable Databases",
      description:
        "Choose from multiple database solutions to match your app's unique needs, ensuring flexibility and scalability.",
      icon: <FaDatabase className="size-8" />,
    },
    {
      title: "SEO Excellence",
      description:
        "Maximize your site's reach with automatic SEO enhancements built into Next.js for higher search engine rankings.",
      icon: <FaRocket className="size-8" />,
    },
    {
      title: "Comprehensive Analytics",
      description:
        "Gain valuable insights into user interactions and behavior with seamless integrations of Google Analytics and Microsoft Clarity.",
      icon: <SiGoogleanalytics className="size-8" />,
    },
    {
      title: "User-Friendly Interface",
      description:
        "Experience the ease of use akin to Apple's design, with a premium, seamless interface.",
      icon: <TbEaseInOut className="size-8" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
      {highlights.map((feature, index) => (
        <Highlight key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
};

const Highlight = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-background pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-background pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-[#fcba28]">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-foreground group-hover/feature:bg-[#fcba28] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
          {title}
        </span>
      </div>
      <p className="text-sm text-foreground max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
