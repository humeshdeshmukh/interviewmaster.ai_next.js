import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press & Media",
}

export default function Press() {
  return (
    <div className="container mx-auto p-6 bg-background text-foreground max-w-3xl my-24">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2">Press & Media</h1>

      <section className="mb-8">
        <p className="mb-4">
          We welcome press inquiries and media coverage. Here, you can find the latest news, press releases, and media resources.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Recent Press Releases</h2>
        <ul className="list-disc list-inside mb-4 pl-4">
          <li>
            <Link href="/press-release/2024-launch" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
              Our 2024 Product Launch
            </Link>
          </li>
          <li>
            <Link href="/press-release/2023-update" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">
              Major Update to Our Platform
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#fcba28]">Press Kit</h2>
        <p className="mb-4">
          Download our press kit, including high-resolution images, logos, and other media assets. <Link href="/press-kit" className="text-[#fcba28] hover:text-[#fcba28]/70 hover:underline">Download Press Kit</Link>
        </p>
      </section>
    </div>
  );
}
