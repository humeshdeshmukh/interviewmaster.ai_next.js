import Link from "next/link";

export const metadata = {
  title: "About Us - Interview Master.ai",
  description: "Discover the story behind Interview Master.ai, our mission, vision, and the team that makes it happen.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">About Us</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Who We Are</h2>
        <p className="mb-4">
          At <strong>Interview Master.ai</strong>, we are dedicated to empowering individuals and organizations to excel in the competitive job market. 
          Our platform combines cutting-edge AI technology with expert-driven insights to offer unparalleled resources for career growth, skill development, and hiring solutions.
        </p>
        <p className="mb-4">
          Our journey is rooted in a commitment to innovation and impact, striving to make career progression accessible to everyone.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Our Mission</h2>
        <p className="mb-4">
          To bridge the gap between talent and opportunity by providing innovative tools and resources that simplify the job-seeking and recruitment process.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Our Vision</h2>
        <p className="mb-4">
          To be the global leader in AI-driven career services, fostering success for individuals and organizations worldwide.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Our Team</h2>
        <p className="mb-4">
          Our team consists of passionate experts in technology, human resources, and career coaching. Together, we strive to create a platform that drives real impact and success.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li className="mb-2">Comprehensive tools for resume building, mock interviews, and skill assessment.</li>
          <li className="mb-2">AI-powered insights to boost your career or streamline hiring processes.</li>
          <li>A user-friendly platform designed to cater to your unique needs.</li>
        </ul>
        <p>
          To learn more about our features, visit our{' '}
          <Link href="/features" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
            Features Page
          </Link>.
        </p>
      </section>
    </div>
  );
}
