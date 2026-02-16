"use client";

import { useEffect, useRef, useState } from "react";

export interface ExecutionBlockProps {
  title: string;
  description: string;
  outcomes: string[];
  index?: number;
}

export function ExecutionBlock({ title, description, outcomes, index = 0 }: ExecutionBlockProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (blockRef.current) {
      observer.observe(blockRef.current);
    }

    return () => {
      if (blockRef.current) {
        observer.unobserve(blockRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={blockRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        group relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-700
        hover:border-[var(--color-secondary-blue)] hover:shadow-xl hover:-translate-y-1
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[var(--color-primary-dark)]/5 to-[var(--color-secondary-blue)]/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative">
        {/* Number badge */}
        <div className="mb-6 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] text-lg font-bold text-white shadow-md transition-all duration-300 group-hover:scale-110">
          {index + 1}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-2xl font-bold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary-dark)]">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-6 text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Divider */}
        <div className="mb-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Outcomes */}
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-[var(--color-secondary-blue)]">
            Key Outcomes
          </h4>
          <ul className="space-y-3">
            {outcomes.map((outcome, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 text-gray-700"
              >
                {/* Checkmark icon */}
                <svg
                  className={`mt-0.5 h-5 w-5 flex-shrink-0 transition-all duration-300 ${
                    isHovered ? "text-[var(--color-accent-blue)] scale-110" : "text-[var(--color-secondary-blue)]"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="leading-relaxed">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
