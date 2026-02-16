"use client";

import { useEffect, useRef, useState } from "react";

export interface FrameworkStep {
  number: number;
  title: string;
  description: string;
}

export interface SystemFrameworkProps {
  title: string;
  steps: FrameworkStep[];
}

export function SystemFramework({ title, steps }: SystemFrameworkProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const frameworkRef = useRef<HTMLDivElement>(null);

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

    if (frameworkRef.current) {
      observer.observe(frameworkRef.current);
    }

    return () => {
      if (frameworkRef.current) {
        observer.unobserve(frameworkRef.current);
      }
    };
  }, []);

  return (
    <div ref={frameworkRef} className="w-full">
      {/* Section Title */}
      <div className="mb-12 text-center">
        <h2
          className={`
            text-3xl font-bold text-[var(--color-text)] transition-all duration-700 md:text-4xl
            ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}
          `}
        >
          {title}
        </h2>
      </div>

      {/* Framework Visual */}
      <div className="relative mx-auto max-w-5xl">
        {/* Connection Lines (SVG) */}
        <svg
          className="absolute inset-0 h-full w-full"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          {steps.map((_, index) => {
            if (index === steps.length - 1) return null;
            
            const isEven = index % 2 === 0;
            const startX = isEven ? "25%" : "75%";
            const endX = isEven ? "75%" : "25%";
            const startY = `${(index / (steps.length - 1)) * 100}%`;
            const endY = `${((index + 1) / (steps.length - 1)) * 100}%`;

            return (
              <line
                key={`line-${index}`}
                x1={startX}
                y1={startY}
                x2={endX}
                y2={endY}
                stroke="var(--color-secondary-blue)"
                strokeWidth="2"
                strokeDasharray="8,4"
                className={`
                  transition-all duration-1000
                  ${isVisible ? "opacity-30" : "opacity-0"}
                `}
                style={{
                  transitionDelay: `${index * 200 + 400}ms`,
                }}
              />
            );
          })}
        </svg>

        {/* Framework Steps */}
        <div className="relative space-y-16 py-8" style={{ zIndex: 1 }}>
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={step.number}
                className={`
                  flex items-center gap-8
                  ${isEven ? "flex-row" : "flex-row-reverse"}
                `}
              >
                {/* Content Side */}
                <div
                  className={`
                    flex-1 transition-all duration-700
                    ${isVisible ? "translate-x-0 opacity-100" : isEven ? "-translate-x-8 opacity-0" : "translate-x-8 opacity-0"}
                  `}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                  }}
                >
                  <div
                    className={`
                      rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300
                      hover:border-[var(--color-secondary-blue)] hover:shadow-md
                      ${activeStep === step.number ? "border-[var(--color-secondary-blue)] shadow-md" : ""}
                    `}
                    onMouseEnter={() => setActiveStep(step.number)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <h3 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Number Circle */}
                <div
                  className={`
                    flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full
                    bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)]
                    text-2xl font-bold text-white shadow-lg transition-all duration-700
                    ${isVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"}
                    ${activeStep === step.number ? "scale-110 shadow-xl" : ""}
                  `}
                  style={{
                    transitionDelay: `${index * 200 + 200}ms`,
                  }}
                >
                  {step.number}
                </div>

                {/* Spacer for opposite side */}
                <div className="flex-1" />
              </div>
            );
          })}
        </div>

        {/* Decorative Elements */}
        <div
          className={`
            absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-secondary-blue)] to-[var(--color-accent-blue)]
            opacity-20 transition-all duration-1000
            ${isVisible ? "scale-y-100" : "scale-y-0"}
          `}
          style={{
            transformOrigin: "top",
            transitionDelay: "200ms",
          }}
        />
        <div
          className={`
            absolute -right-4 top-0 h-full w-1 bg-gradient-to-b from-[var(--color-primary-dark)] via-[var(--color-secondary-blue)] to-[var(--color-accent-blue)]
            opacity-20 transition-all duration-1000
            ${isVisible ? "scale-y-100" : "scale-y-0"}
          `}
          style={{
            transformOrigin: "top",
            transitionDelay: "200ms",
          }}
        />
      </div>
    </div>
  );
}
