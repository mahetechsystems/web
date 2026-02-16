import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navigation, Footer } from "@/components/layout";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { GoogleAnalytics, MicrosoftClarity } from "@/components/analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mahe Tech Systems - Structured Execution Partner for Founders",
  description:
    "Transform your startup vision into reality with systematic execution. Expert SaaS development, digital transformation, and growth automation for Indian founders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "";
  const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "";

  return (
    <html lang="en">
      <body 
        className={`${inter.variable} ${dmSans.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Analytics 4 */}
        <GoogleAnalytics measurementId={measurementId} />
        
        {/* Microsoft Clarity */}
        <MicrosoftClarity projectId={clarityProjectId} />
        
        {/* Skip to content link for keyboard navigation */}
        <SkipToContent />
        
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
