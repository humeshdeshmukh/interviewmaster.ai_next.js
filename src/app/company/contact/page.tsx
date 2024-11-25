import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
}

export default function Contact() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Contact Us</h1>

      <section className="mb-8">
        <p className="mb-4">
          We&apos;d love to hear from you! Whether you have a question, need support, or want to collaborate, feel free to reach out.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Contact Information</h2>
        <ul className="list-none mb-4 pl-4">
          <li className="mb-2">
            <strong>Email:</strong> <Link href="mailto:contact@company.com" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">contact@company.com</Link>
          </li>
          <li className="mb-2">
            <strong>Phone:</strong> <Link href="tel:+1234567890" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">+1 (234) 567-890</Link>
          </li>
          <li className="mb-2">
            <strong>Address:</strong> 123 Main St, City, Country
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Follow Us</h2>
        <ul className="flex space-x-4">
          <li>
            <Link href="https://twitter.com/yourcompany" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
              Twitter
            </Link>
          </li>
          <li>
            <Link href="https://facebook.com/yourcompany" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
              Facebook
            </Link>
          </li>
          <li>
            <Link href="https://linkedin.com/company/yourcompany" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
              LinkedIn
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
