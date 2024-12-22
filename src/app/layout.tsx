 import "./globals.css";

 import { Analytics } from "@vercel/analytics/react"
 import { cn } from "@/lib/utils";
 import { Noto_Sans } from 'next/font/google';
 import { generateMetadata } from "@/lib/generateMetadata";
 import { ConvexClientProvider } from "@/providers/ConvexAuthProvider";
 import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";

 import NextTopLoader from 'nextjs-toploader';
 import { Header } from "@/components/Header";
 import { Footer } from "@/components/Footer";
 import { Toaster } from "@/components/ui/sonner";

 const font = Noto_Sans({ weight: ['400', '700'], subsets: ['latin'] });

 export const metadata = generateMetadata();

 export default function RootLayout({
   children,
 }: Readonly<{
   children: React.ReactNode;
 }>) {
   return (
     <html lang="en" suppressHydrationWarning>
       <body className={cn(font.className, "antialiased")}>
         <ConvexAuthNextjsServerProvider>
           <ConvexClientProvider>
             <NextTopLoader showSpinner={false} color="#fcba28" />
             <Toaster />
             <Header />
             {children}
             <Footer />
             <Analytics />
           </ConvexClientProvider>
         </ConvexAuthNextjsServerProvider>
       </body>
     </html>
   );
 }

