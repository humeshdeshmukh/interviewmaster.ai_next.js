import { CTA } from "@/components/landing-page/cta/CTA";
import { FAQ } from "@/components/landing-page/faq/FAQ";
import { Hero } from "@/components/landing-page/hero/Hero";
import { Pricing } from "@/components/landing-page/pricing/Pricing";
import { Features } from "@/components/landing-page/features/Features";
import { HowToUse } from "@/components/landing-page/how-to-use/HowToUse";
import { Testimonials } from "@/components/landing-page/testimonials/Testimonials";
import { BannerStacks } from "@/components/landing-page/banner-stacks/BannerStacks";
import { TimeComparisonTable } from "@/components/landing-page/time-comparison-table/TimeComparisonTable";

// This is the homepage where you add all the components for your landing page
// When you create your components for landing page go to @/components/landing-page the ncreate a folder for your component to organized them

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