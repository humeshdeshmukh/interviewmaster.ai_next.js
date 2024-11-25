// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet Our Team",
}

export default function Team() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Meet Our Team</h1>

      <section className="mb-8">
        <p className="mb-4">
          Our team is made up of talented individuals who are passionate about delivering innovative solutions. Together, we work to bring the best ideas to life.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Our Leadership</h2>
        <div className="grid grid-cols-2 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">John Doe</h3>
            <p className="text-sm">CEO & Founder</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Jane Smith</h3>
            <p className="text-sm">CTO</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Our Team</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Michael Johnson</h3>
            <p className="text-sm">Lead Developer</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Emily Davis</h3>
            <p className="text-sm">Product Manager</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="text-xl font-semibold">Sophia Brown</h3>
            <p className="text-sm">UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
}
