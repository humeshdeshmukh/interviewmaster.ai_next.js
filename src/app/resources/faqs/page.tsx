import Link from 'next/link';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs",
};

export default function faqpage() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Frequently Asked Questions</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">General Questions</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">What is InterviewMaster?</h3>
            <p>
              InterviewMaster is a platform designed to help individuals prepare for interviews through guided practice,
              mock interviews, and insightful resources. We offer tools for both job seekers and interviewers to enhance
              the interview process.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Who can use InterviewMaster?</h3>
            <p>
              InterviewMaster is for anyone who is preparing for a job interview. Whether you are a fresh graduate,
              seasoned professional, or an interviewer looking to enhance your skills, our platform offers resources
              for everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Account & Access</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How do I create an account?</h3>
            <p>
              To create an account, click on the "Sign Up" button on our homepage. You can sign up using your email or
              through Google authentication.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">I forgot my password. What should I do?</h3>
            <p>
              If you forgot your password, click on the "Forgot Password" link on the login page. You will receive an
              email with instructions to reset your password.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Services & Features</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">What services does InterviewMaster offer?</h3>
            <p>
              We provide various services, including mock interviews, personalized feedback, coding challenges, and
              interview preparation resources across various industries.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Can I book a mock interview?</h3>
            <p>
              Yes, you can book a mock interview through your dashboard. You can choose the industry, role, and
              difficulty level for the mock interview.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Contact & Support</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium mb-2">How can I contact customer support?</h3>
            <p>
              If you need assistance, you can reach out to our customer support team by sending an email to{' '}
              <Link href="mailto:support@interviewmaster.ai" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                support@interviewmaster.ai
              </Link>.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Where can I find more resources?</h3>
            <p>
              We provide a range of free resources on our website, including blog posts, webinars, and tutorials. Visit our{' '}
              <Link href="/resources" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
                Resources page
              </Link> for more information.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
