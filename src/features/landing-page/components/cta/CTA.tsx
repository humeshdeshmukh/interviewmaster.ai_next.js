import { BuyButton } from "@/components/BuyButton";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";

export const CTA = () => {
    return (
        <section
            id="cta"
            className="relative overflow-hidden bg-neutral-900 border-t-3xl border-neutral-900"
        >
            <MaxWidthWrapper className="relative flex flex-col items-center justify-center space-y-6 py-20 md:py-30">
                <hgroup className="relative z-20 flex items-center flex-col justify-center w-full gap-6">
                    <h2 className="flex-1 font-extrabold text-xl text-center md:text-4xl mb-2 max-w-lg">
                        Ace Your Interviews with Confidence
                    </h2>
                    <p className="flex-1 font-medium text-base text-center md:text-lg max-w-lg w-full mb-8">
                        Unlock the secrets to success in interviews with our
                        expert-guided platform. Transform your skills and land
                        your dream job today.
                    </p>
                </hgroup>

                <BuyButton text="GET STARTED" kit="Interview Master Premium" />
            </MaxWidthWrapper>
        </section>
    );
};

// Alternate CTA (for collecting waitlist emails):
// Uncomment and use this if gathering waitlist emails is the goal
/*
export const CTA = () => {
    return (
        <section
            id="cta"
            className="relative overflow-hidden bg-neutral-900 border-t-3xl border-neutral-900"
        >
            <MaxWidthWrapper className="relative grid grid-cols-1 md:grid-cols-2 space-y-6 py-20 md:py-30">
                <hgroup className="relative z-20 flex items-center md:items-start flex-col justify-center md:justify-start w-full gap-6">
                    <h2 className="flex-1 font-extrabold text-xl text-center md:text-start md:text-4xl mb-2 max-w-lg">
                        Master Every Interview with Ease
                    </h2>
                    <p className="flex-1 font-medium text-base text-center md:text-start md:text-lg max-w-lg w-full mb-8">
                        Join the waitlist today and be among the first to
                        experience a revolution in interview preparation.
                    </p>
                </hgroup>

                <SubscriptionForm />
            </MaxWidthWrapper>
        </section>
    );
};
*/