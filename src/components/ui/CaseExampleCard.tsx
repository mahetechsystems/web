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
      className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)]">
        <OptimizedImage
          src={caseExample.image.src}
          alt={caseExample.image.alt}
          width={caseExample.image.width}
          height={caseExample.image.height}
          className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Client badge */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
          {caseExample.client}
        </div>

        {/* Title */}
        <h3 className="mb-4 text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-primary-dark)]">
          {caseExample.title}
        </h3>

        {/* Problem */}
        <div className="mb-4 rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
            <svg className="w-4 h-4 text-[var(--color-secondary-blue)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Challenge
          </h4>
          <p className="text-sm text-gray-600 line-clamp-2">{caseExample.problem}</p>
        </div>

        {/* Outcome */}
        <div className="mb-5 rounded-lg bg-gradient-to-br from-green-50 to-blue-50 p-4">
          <h4 className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
            <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Outcome
          </h4>
          <p className="text-sm font-medium text-[var(--color-primary-dark)]">
            {caseExample.outcome}
          </p>
        </div>

        {/* Link */}
        <Link
          href={`/case-studies/${caseExample.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-secondary-blue)] transition-all hover:text-[var(--color-primary-dark)] hover:gap-3"
        >
          Read Full Case Study
          <svg
            className="h-4 w-4 transition-transform"
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
