"use client";

import { useEffect, useRef, useState } from "react";

export interface ProblemCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  index?: number;
}

export function ProblemCard({ title, description, icon, index = 0 }: ProblemCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`
        group relative rounded-xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-700
        hover:border-[var(--color-secondary-blue)] hover:shadow-xl hover:-translate-y-2
        active:scale-[0.98]
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
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
          {icon}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-xl font-bold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary-dark)]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
