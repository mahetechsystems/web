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
        group rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-700
        hover:border-[var(--color-secondary-blue)] hover:shadow-lg hover:-translate-y-1
        active:scale-[0.98]
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] text-white transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-semibold text-[var(--color-text)] transition-colors duration-300 group-hover:text-[var(--color-primary-dark)]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
