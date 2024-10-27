import dynamic from "next/dynamic";
import { Hero } from "@/features/landing-page/components/hero/Hero";

const BannerStacks = dynamic(() => import("@/features/landing-page/components/banner-stacks/BannerStacks"), { ssr: false });
const TimeComparisonTable = dynamic(() => import("@/features/landing-page/components/time-comparison-table/TimeComparisonTable"));
const Features = dynamic(() => import("@/features/landing-page/components/features/Features"));
const HowToUse = dynamic(() => import("@/features/landing-page/components/how-to-use/HowToUse"));
const Pricing = dynamic(() => import("@/features/landing-page/components/pricing/Pricing"), { ssr: false });
const Testimonials = dynamic(() => import("@/features/landing-page/components/testimonials/Testimonials"));
const FAQ = dynamic(() => import("@/features/landing-page/components/faq/FAQ"));
const CTA = dynamic(() => import("@/features/landing-page/components/cta/CTA"));

export default function Home() {
  return (
    <main className="bg-background w-full">
      <Hero />
      <BannerStacks />
      <TimeComparisonTable />
      <Features />
      <HowToUse />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
