"use client";

import dynamic from "next/dynamic";

// Dynamically import CalendlyEmbed with SSR disabled (client-only component)
// This reduces the initial bundle size by code-splitting the Calendly widget
const CalendlyEmbed = dynamic(
  () => import("@/components/CalendlyEmbed").then((mod) => ({ default: mod.CalendlyEmbed })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto rounded-xl border-2 border-gray-200 bg-white p-12 shadow-md">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-secondary-blue)]"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    ),
  }
);

interface CalendlySectionProps {
  url: string;
}

export function CalendlySection({ url }: CalendlySectionProps) {
  return (
    <section id="calendly" className="bg-white py-16 md:py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
              Schedule Your Consultation
            </h2>
            <p className="text-lg text-gray-600">
              Pick a time that works for you. We'll discuss your project goals
              and how we can help you achieve them.
            </p>
          </div>

          {/* Calendly embed with error handling and fallback */}
          <CalendlyEmbed url={url} className="mx-auto" />
        </div>
      </div>
    </section>
  );
}
