"use client";

import { useEffect, useState } from "react";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export function CalendlyEmbed({ url, className = "" }: CalendlyEmbedProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      setIsLoading(false);
    };

    script.onerror = () => {
      console.error("Failed to load Calendly script");
      setHasError(true);
      setIsLoading(false);
    };

    document.body.appendChild(script);

    // Cleanup
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Error fallback UI
  if (hasError) {
    return (
      <div className={`rounded-xl border-2 border-gray-200 bg-white p-8 shadow-md ${className}`}>
        <div className="text-center">
          <div className="mb-4 inline-flex rounded-full bg-red-100 p-4">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            Unable to Load Calendar
          </h3>
          <p className="mb-6 text-gray-600">
            We're having trouble loading the scheduling widget. Please use the direct link below to book your consultation.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-lg bg-[var(--color-secondary-blue)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--color-primary-dark)]"
          >
            Open Scheduling Page
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className={`rounded-xl border-2 border-gray-200 bg-white p-12 shadow-md ${className}`}>
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[var(--color-secondary-blue)]"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  // Calendly embed
  return (
    <div className={className}>
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
}
