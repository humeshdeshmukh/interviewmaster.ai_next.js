import { Metadata } from 'next';
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@/lib/analytics/Analytics";
import NextTopLoader from 'nextjs-toploader';
import { ConvexClientProvider } from "@/providers/ConvexAuthProvider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Noto_Sans } from 'next/font/google';
import { cn } from "@/lib/utils";
import { generateMetadata } from "@/lib/generateMetadata";

import "./globals.css";

const font = Noto_Sans({ weight: ['400', '700'], subsets: ['latin'] });

export const metadata: Metadata = generateMetadata();

export default function ResourcesPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, "antialiased")}>
          <ConvexClientProvider>
            {/* Loader for the top of the page */}
            <NextTopLoader showSpinner={false} color="#fcba28" />
            <Toaster />
            <Header />
            <main className="container mx-auto px-6 py-10">
              <h1 className="text-4xl font-bold text-center mb-8">Resources</h1>
              <section className="space-y-8">
                {/* Add your resource content here */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Guides</h2>
                  <p>
                    Explore our comprehensive guides to get the most out of your experience.
                    Learn best practices, tips, and tricks to maximize your productivity.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">Documentation</h2>
                  <p>
                    Access our detailed documentation to understand how to use all the features and tools available on our platform.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
                  <p>
                    Have questions? Check out our Frequently Asked Questions section to find answers to common inquiries.
                  </p>
                </div>
              </section>
            </main>
            <Footer />
          </ConvexClientProvider>
        </body>
        <Analytics />
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
