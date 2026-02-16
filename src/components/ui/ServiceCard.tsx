"use client";

import { type Service } from "@/types";
import { cn } from "@/lib/utils";

/**
 * ServiceCard Component
 *
 * Displays a service offering with title, description, key features, and outcomes.
 * Used on the Services page to showcase each service offering.
 *
 * Features:
 * - Responsive card layout
 * - Hover effects
 * - Semantic HTML structure
 * - Accessible content
 *
 * Requirements: 4.1-4.5, 7.1
 */

interface ServiceCardProps {
  service: Service;
  className?: string;
}

export function ServiceCard({ service, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-lg border-2 border-gray-200 p-6 md:p-8 transition-all duration-200 hover:border-[var(--color-secondary-blue)] hover:shadow-lg",
        className
      )}
      id={service.slug}
    >
      {/* Service Title */}
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-4">
        {service.title}
      </h2>

      {/* Short Description */}
      <p className="text-lg text-gray-700 mb-6">{service.description}</p>

      {/* Long Description */}
      <div className="mb-6">
        <p className="text-base text-gray-600 leading-relaxed">
          {service.longDescription}
        </p>
      </div>

      {/* Key Features */}
      {service.keyFeatures.length > 0 && (
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-3">
            What We Deliver
          </h3>
          <ul className="space-y-2">
            {service.keyFeatures.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <span
                  className="text-[var(--color-secondary-blue)] mt-1 flex-shrink-0"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Outcomes */}
      {service.outcomes.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-3">
            Expected Outcomes
          </h3>
          <ul className="space-y-2">
            {service.outcomes.map((outcome, index) => (
              <li key={index} className="flex items-start gap-2">
                <span
                  className="text-[var(--color-secondary-blue)] mt-1 flex-shrink-0"
                  aria-hidden="true"
                >
                  →
                </span>
                <span className="text-gray-700">{outcome}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
