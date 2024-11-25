import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Mock Interviews",
};

export default function AIMockInterviews() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">AI Mock Interviews</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Prepare Like a Pro</h2>
        <p className="mb-4">
          Our AI-powered mock interviews simulate real-life interview scenarios. This is your opportunity to
          practice with tailored questions, receive valuable feedback, and improve your interview skills for
          better career prospects.
        </p>
        <p className="mb-4">
          Whether you're preparing for a tech interview or a managerial role, our AI mock interviews can
          help you get ready for the big day. Get started today by selecting your desired interview track.
        </p>
        <Link href="/get-started" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
          Get Started Now
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Features of AI Mock Interviews</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Realistic interview simulations for multiple industries</li>
          <li>AI-powered feedback and performance analysis</li>
          <li>Multiple question difficulty levels to match your skill</li>
          <li>Detailed reports and tips for improvement</li>
        </ul>
        <p className="mb-4">
          Our platform utilizes the latest AI technologies to make the mock interview process as close to the real
          experience as possible. With our feedback system, you will understand your strengths and areas for
          improvement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">How It Works</h2>
        <ol className="list-decimal list-inside mb-4 pl-4">
          <li>Select the interview track that best fits your desired role.</li>
          <li>Participate in a series of mock interview sessions.</li>
          <li>Receive AI-powered feedback and tips for improvement.</li>
          <li>Track your progress over time and refine your skills.</li>
        </ol>
        <p className="mb-4">
          Our easy-to-use interface makes it simple to start and track your progress. Whether you're a beginner
          or a seasoned professional, we have interview tracks for all skill levels.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How do I get started with AI Mock Interviews?</h3>
            <p>
              To get started, simply{' '}
              <Link href="/get-started" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                sign up here
              </Link> and choose your interview track. You'll be able to practice whenever you're ready.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">What industries can I practice interviews for?</h3>
            <p>
              Our AI mock interviews are available for various industries, including tech, business, healthcare, and more.
              You can choose the industry that fits your career goals.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Is feedback provided after each mock interview?</h3>
            <p>
              Yes, our AI system provides feedback after each mock interview, highlighting your performance strengths
              and offering tips for areas of improvement.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Contact Us</h2>
        <p>
          If you have more questions or need assistance, feel free to{' '}
          <Link href="mailto:support@interviewmaster.ai" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
            contact us
          </Link>.
        </p>
      </section>
    </div>
  );
}
