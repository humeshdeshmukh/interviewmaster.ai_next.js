import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ambassadors",
};

export default function Ambassadors() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Ambassadors</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Become an Ambassador</h2>
        <p className="mb-4">
          Join our ambassador program and help us spread the word about InterviewMaster. As an ambassador, you
          will receive exclusive benefits, access to our community, and a chance to collaborate with like-minded
          individuals.
        </p>
        <p className="mb-4">
          For more details on how to get involved, please visit our{' '}
          <Link href="/get-involved" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
            Get Involved page
          </Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Benefits of Being an Ambassador</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Exclusive ambassador-only content</li>
          <li>Access to special events and webinars</li>
          <li>Networking opportunities with industry professionals</li>
          <li>Special discounts on InterviewMaster products and services</li>
        </ul>
        <p className="mb-4">
          Our ambassador program is designed to reward individuals who are passionate about helping others and
          advancing the mission of InterviewMaster. If you&apos;re ready to take the next step, we&apos;d love to have you on board!
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How do I apply to become an ambassador?</h3>
            <p>
              To apply, simply fill out the ambassador application form available on our{' '}
              <Link href="/application" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                application page
              </Link>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">What are the eligibility requirements?</h3>
            <p>
              Anyone passionate about InterviewMaster and willing to spread the word through various channels such
              as social media, blogs, or events can apply. There are no specific qualifications required.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Do I get paid for being an ambassador?</h3>
            <p>
              The ambassador program offers exclusive benefits but is a volunteer-based role. However, you will
              receive various perks such as discounts, early access, and special events.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
