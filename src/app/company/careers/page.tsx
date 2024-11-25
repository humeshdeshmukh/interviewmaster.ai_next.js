import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career",
}

export default function Career() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Career Opportunities</h1>

      <section className="mb-8">
        <p className="mb-4">
          We are always looking for talented individuals to join our team. If you&apos;re passionate about technology and innovation, we want to hear from you!
        </p>
        <p className="mb-4">
          Our company is a fast-paced, dynamic environment where you will have the opportunity to grow your skills and make an impact. Whether you are an experienced developer or just starting out, there is a place for you here.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Open Positions</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Software Engineer</li>
          <li>Product Manager</li>
          <li>Data Scientist</li>
          <li>UI/UX Designer</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Why Work With Us?</h2>
        <p className="mb-4">At our company, we foster a collaborative and inclusive culture that empowers our employees to bring their best ideas forward. We believe in:</p>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>Continuous learning and development</li>
          <li>A healthy work-life balance</li>
          <li>Innovative projects and cutting-edge technologies</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">How to Apply</h2>
        <p className="mb-4">
          To apply for any of the open positions, please send your resume and a cover letter to <Link href="mailto:careers@company.com" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">careers@company.com</Link>.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Equal Opportunity Employer</h2>
        <p className="mb-4">
          We are an Equal Opportunity Employer and do not discriminate based on race, religion, color, gender, age, national origin, disability, or any other characteristic protected by law.
        </p>
      </section>
    </div>
  );
}
