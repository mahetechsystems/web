"use client";

import { OptimizedImage } from "./OptimizedImage";
import Link from "next/link";

export interface CaseExample {
  slug: string;
  title: string;
  client: string;
  problem: string;
  outcome: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

interface CaseExampleCardProps {
  caseExample: CaseExample;
  index: number;
}

export function CaseExampleCard({ caseExample, index }: CaseExampleCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <OptimizedImage
          src={caseExample.image.src}
          alt={caseExample.image.alt}
          width={caseExample.image.width}
          height={caseExample.image.height}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client */}
        <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-secondary-blue)]">
          {caseExample.client}
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-primary-dark)]">
          {caseExample.title}
        </h3>

        {/* Problem */}
        <div className="mb-4">
          <h4 className="mb-1 text-sm font-semibold text-gray-700">Challenge</h4>
          <p className="text-sm text-gray-600 line-clamp-2">{caseExample.problem}</p>
        </div>

        {/* Outcome */}
        <div className="mb-4">
          <h4 className="mb-1 text-sm font-semibold text-gray-700">Outcome</h4>
          <p className="text-sm font-medium text-[var(--color-primary-dark)]">
            {caseExample.outcome}
          </p>
        </div>

        {/* Link */}
        <Link
          href={`/case-studies/${caseExample.slug}`}
          className="inline-flex items-center text-sm font-semibold text-[var(--color-secondary-blue)] transition-colors hover:text-[var(--color-primary-dark)]"
        >
          Read Full Case Study
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
