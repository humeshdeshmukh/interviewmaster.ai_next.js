import Image from "next/image"
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper"

// TODO: Add logo selection for InterviewMaster.ai
// TODO: Or add companies that use InterviewMaster.ai's services here
const stacks = [
    {
        name: "NextJS",
        url: "/logo-stacks/next-js.svg"
    },
    {
        name: "TailwindCSS",
        url: "/logo-stacks/tailwindcss.svg"
    },
    {
        name: "Framer Motion",
        url: "/logo-stacks/framer-motion.svg"
    },
    {
        name: "Convex",
        url: "/logo-stacks/convex.svg"
    },
    {
        name: "Stripe",
        url: "/logo-stacks/stripe.svg"
    }
];

export const BannerStacks = () => {
    return (
        <section id="banner-stacks" className="relative overflow-hidden">
            <MaxWidthWrapper className="relative z-20 flex items-center flex-col md:flex-row justify-center gap-6 py-10">
                <p className="text-foreground/50 font-bold">POWERED BY</p>
                <aside className="flex items-center flex-col md:flex-row flex-wrap gap-8">
                    {stacks.map((stack, index) => (
                        <div key={index} className="flex items-center flex-col md:flex-row gap-2 hover:scale-105 transition-all duration-200 ease-linear">
                            <Image
                                width={50}
                                height={50}
                                src={stack.url}
                                alt={`${stack.name} logo`}
                            />
                            <p className="font-bold tracking-widest text-lg">{stack.name}</p>
                        </div>
                    ))}
                </aside>
            </MaxWidthWrapper>
        </section>
    )
}

// Instructions
/*
This component displays logos of popular technologies or companies used by InterviewMaster.ai. It serves to:
1. Build credibility and trust with potential customers.
2. Demonstrate the high-quality tech stack behind InterviewMaster.ai.
3. Showcase the trusted tools that power InterviewMaster.ai's services.
4. Use recognizable brands to establish trust and legitimacy.

Logo Preparation:
   TODO: Use vector formats (SVG) for logos when possible for crisp rendering at all sizes.
*/
