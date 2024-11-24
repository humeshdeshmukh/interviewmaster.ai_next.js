import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { RiNotionFill } from "react-icons/ri";
import { BuyButton } from "@/components/BuyButton";
import { ChipBanner } from "@/components/ChipBanner";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

const packages = [
    {
        name: "Basic Interview Package",
        originalPrice: 129,
        price: 79,
        features: [
            "AI-Powered Question Generation",
            "Resume Insights",
            "Basic Mock Interviews",
            "Performance Analytics",
            "Interview Preparation Guide",
            "Access to 10 Mock Interviews",
        ],
    },
    {
        name: "Pro Interview Package",
        originalPrice: 199,
        price: 149,
        popular: true,
        features: [
            { text: "Everything in Basic, PLUS:", icon: "Zap" },
            { text: "Custom Mock Interviews by Experts", icon: "Notion" },
            "Advanced Analytics Dashboard",
            "Unlimited Mock Interviews",
            "Personalized Feedback",
            "Real-Time AI Suggestions",
            "Priority Support",
        ],
    },
];

export const Pricing = () => {
    return (
        <section id="pricing" className="relative overflow-hidden">
            <MaxWidthWrapper className="flex flex-col items-center py-20 md:py-32">
                <div className="flex flex-col justify-center items-center gap-4 max-w-xl mb-4 md:mb-6">
                    <ChipBanner text="PRICING" />
                    <h2 className="flex-1 font-extrabold text-xl text-center md:text-3xl lg:text-5xl">
                        Flexible Plans for Your Career Growth
                    </h2>
                </div>
                <p className="flex-1 font-medium text-base text-center justify-center md:text-lg max-w-lg w-full">
                    Take the next step in your career with <strong>Interview Master.ai</strong>. Choose a plan that fits your goals and access cutting-edge AI-driven tools.
                </p>

                <article className="mt-16 grid max-w-lg grid-cols-1 gap-8 mx-auto lg:max-w-none lg:grid-cols-2">
                    {packages.map((pkg) => (
                        <div
                            key={pkg.name}
                            className={cn(
                                "relative flex flex-col justify-between rounded-3xl p-8 shadow-xl xl:p-10",
                                pkg.popular
                                    ? "bg-foreground text-background ring-4 ring-[#6b50e5]"
                                    : "bg-neutral-900 text-foreground"
                            )}
                        >
                            {pkg.popular && (
                                <div className="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2">
                                    <p className="rounded-full uppercase font-foreground bg-[#6b50e5] px-4 py-1 text-xs font-semibold leading-5 text-primary shadow-md">
                                        Most Popular
                                    </p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-lg font-semibold leading-8 mb-4">{pkg.name}</h3>
                                <div className="mt-6 flex items-baseline gap-x-2 mb-2">
                                    <span className="text-sm line-through opacity-50">${pkg.originalPrice}</span>
                                    <span className="text-4xl font-black">${pkg.price}</span>
                                    <span className="text-sm font-semibold">USD</span>
                                </div>
                                <p className="text-sm leading-6 opacity-70 font-semibold">
                                    ONE TIME PAYMENT
                                </p>
                                <ul role="list" className="mt-8 space-y-3 text-sm leading-6">
                                    {pkg.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className={cn(
                                                "flex gap-x-3 font-medium",
                                                pkg.popular && "font-semibold"
                                            )}
                                        >
                                            {typeof feature === "string" ? (
                                                <>
                                                    <Check
                                                        className={cn(
                                                            "h-6 w-5 flex-none",
                                                            pkg.popular
                                                                ? "text-background"
                                                                : "text-foreground"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {feature}
                                                </>
                                            ) : feature.icon === "Zap" ? (
                                                <>
                                                    <Zap
                                                        className={cn(
                                                            "h-6 w-5 flex-none animate-pulse font-bold",
                                                            pkg.popular
                                                                ? "text-[#fcba28]"
                                                                : "text-foreground"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {feature.text}
                                                </>
                                            ) : feature.icon === "Notion" ? (
                                                <>
                                                    <RiNotionFill
                                                        className={cn(
                                                            "h-6 w-5 flex-none",
                                                            pkg.popular
                                                                ? "text-background"
                                                                : "text-foreground"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    {feature.text}
                                                </>
                                            ) : null}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 flex flex-col items-center">
                                <BuyButton
                                    text="GET STARTED"
                                    kit={pkg.name as "Basic Interview Package" | "Pro Interview Package"}
                                />
                                <p className="text-sm font-bold text-center text-foreground mt-2">
                                    Empower Your Job Search
                                </p>
                            </div>
                        </div>
                    ))}
                </article>
            </MaxWidthWrapper>
        </section>
    );
};
