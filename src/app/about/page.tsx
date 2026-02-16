"use client";

import { motion } from "framer-motion";
import {
  generatePersonSchema,
  generateOrganizationSchema,
} from "@/lib/seo";
import { StructuredData } from "@/components/seo";
import { CTAButton } from "@/components/ui";
import { fadeInUp, staggerContainer, staggerItem, getViewportAnimation } from "@/lib/animations";

export default function AboutPage() {
  // Generate structured data for the founder
  const founderSchema = generatePersonSchema({
    name: "Founder Name", // TODO: Replace with actual founder name
    jobTitle: "Founder & CEO",
    description:
      "Systems thinker and execution specialist helping founders transform vision into measurable outcomes.",
    url: "/about",
  });

  // Generate Organization schema for the company
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      {/* Add structured data to the page */}
      <StructuredData data={[founderSchema, organizationSchema]} />

      <div className="min-h-screen bg-[var(--color-background)]" id="main-content" tabIndex={-1}>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-secondary-blue)] to-[var(--color-accent-blue)]">
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          <div className="container relative mx-auto px-6 py-20 md:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                Built on Systems Thinking, Driven by Execution
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                We're not a marketing agency. We're not a development shop. We're
                your structured execution partner—transforming founder vision into
                measurable outcomes through systematic design and disciplined
                implementation.
              </p>
            </div>
          </div>

          {/* Bottom wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z"
                fill="var(--color-background)"
              />
            </svg>
          </div>
        </section>

        {/* Founder Story Section */}
        <section className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div {...getViewportAnimation(fadeInUp)} className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                The Story Behind Mahe Tech Systems
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6 text-lg leading-relaxed text-gray-700"
            >
              <motion.p variants={staggerItem}>
                Mahe Tech Systems was born from a simple observation: most startups
                don't fail because of bad ideas—they fail because of poor execution.
                Founders have vision, ambition, and drive, but they often lack the
                structured systems needed to transform those qualities into
                measurable outcomes.
              </motion.p>

              <motion.p variants={staggerItem}>
                After years of working with startups across India and globally, I
                noticed a pattern. Founders would hire developers who wrote code.
                They'd hire consultants who gave advice. They'd hire agencies who
                ran campaigns. But what they really needed was someone who could
                design systems, execute with precision, and deliver results that
                moved the business forward.
              </motion.p>

              <motion.p variants={staggerItem}>
                That's why I founded Mahe Tech Systems—not as another development
                shop or consulting firm, but as a structured execution partner.
                We bring systems thinking to every project, breaking down complex
                challenges into manageable components, designing scalable solutions,
                and executing with the discipline that founders need but rarely find.
              </motion.p>

              <motion.p variants={staggerItem}>
                Every engagement starts with understanding your business goals, not
                just your technical requirements. We don't build features—we build
                systems that drive outcomes. We don't deliver projects—we deliver
                measurable results. And we don't disappear after launch—we optimize
                continuously based on real data.
              </motion.p>
            </motion.div>

            {/* Founder Credentials */}
            <motion.div {...getViewportAnimation(fadeInUp)} className="mt-12 rounded-xl bg-white p-8 shadow-md">
              <h3 className="mb-6 text-2xl font-bold text-[var(--color-text)]">
                Background & Expertise
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h4 className="mb-2 font-semibold text-[var(--color-primary-dark)]">
                    Technical Foundation
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>10+ years in software architecture and system design</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Built and scaled SaaS platforms serving 100K+ users
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Expert in modern tech stacks: React, Node.js, Python, AWS
                      </span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold text-[var(--color-primary-dark)]">
                    Business Acumen
                  </h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Advised 50+ startups on execution strategy</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Deep understanding of Indian startup ecosystem
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-[var(--color-secondary-blue)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Track record of delivering measurable ROI for clients
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Vision & Mission Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto max-w-6xl"
            >
              <div className="grid gap-12 md:grid-cols-2">
                {/* Vision */}
                <motion.div variants={staggerItem} className="rounded-xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] p-8 text-white shadow-lg">
                  <div className="mb-4 inline-flex rounded-full bg-white/20 p-3">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
                  <p className="text-lg leading-relaxed text-white/90">
                    To become the most trusted execution partner for ambitious
                    founders across India, known for transforming vision into
                    measurable outcomes through systematic design and disciplined
                    implementation. We envision a future where every founder has
                    access to structured execution expertise that accelerates their
                    path to success.
                  </p>
                </motion.div>

                {/* Mission */}
                <motion.div variants={staggerItem} className="rounded-xl bg-gradient-to-br from-[var(--color-secondary-blue)] to-[var(--color-accent-light)] p-8 text-white shadow-lg">
                  <div className="mb-4 inline-flex rounded-full bg-white/20 p-3">
                    <svg
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
                  <p className="text-lg leading-relaxed text-white/90">
                    To empower founders with structured execution systems that
                    bridge the gap between vision and reality. We design scalable
                    solutions, execute with precision, and deliver measurable
                    results that move businesses forward. Every engagement is an
                    opportunity to prove that systematic thinking and disciplined
                    execution are the keys to startup success.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Systems Thinking Philosophy Section */}
        <section className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div {...getViewportAnimation(fadeInUp)} className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                Our Systems Thinking Philosophy
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Systems thinking isn't just a methodology—it's how we approach
                every challenge, design every solution, and measure every outcome.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-8"
            >
              {/* Philosophy Point 1 */}
              <motion.div variants={staggerItem} className="rounded-xl border-l-4 border-[var(--color-secondary-blue)] bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  1. Everything is a System
                </h3>
                <p className="text-gray-700">
                  Your business isn't a collection of isolated features or
                  functions—it's an interconnected system where every component
                  affects every other component. We design solutions that
                  acknowledge these connections, ensuring that improvements in one
                  area don't create problems in another. This holistic view is what
                  separates sustainable growth from short-term fixes.
                </p>
              </motion.div>

              {/* Philosophy Point 2 */}
              <motion.div variants={staggerItem} className="rounded-xl border-l-4 border-[var(--color-secondary-blue)] bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  2. Structure Enables Speed
                </h3>
                <p className="text-gray-700">
                  Chaos feels fast, but it's actually slow. When you have clear
                  systems, documented processes, and structured workflows, you move
                  faster with less friction. We invest time upfront in designing the
                  right structure because we know it pays dividends in execution
                  speed, team alignment, and outcome quality.
                </p>
              </motion.div>

              {/* Philosophy Point 3 */}
              <motion.div variants={staggerItem} className="rounded-xl border-l-4 border-[var(--color-secondary-blue)] bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  3. Measure What Matters
                </h3>
                <p className="text-gray-700">
                  You can't improve what you don't measure. Every system we design
                  includes clear metrics that tie directly to business outcomes. We
                  don't track vanity metrics—we track the numbers that tell you
                  whether you're winning or losing, and we use that data to
                  continuously optimize for better results.
                </p>
              </motion.div>

              {/* Philosophy Point 4 */}
              <motion.div variants={staggerItem} className="rounded-xl border-l-4 border-[var(--color-secondary-blue)] bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  4. Execution is Everything
                </h3>
                <p className="text-gray-700">
                  Ideas are worthless without execution. Strategy is meaningless
                  without implementation. We're obsessed with execution because
                  that's where value is created. Our systems thinking approach
                  ensures that execution isn't chaotic or reactive—it's structured,
                  predictable, and continuously improving.
                </p>
              </motion.div>

              {/* Philosophy Point 5 */}
              <motion.div variants={staggerItem} className="rounded-xl border-l-4 border-[var(--color-secondary-blue)] bg-white p-6 shadow-md">
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  5. Scalability by Design
                </h3>
                <p className="text-gray-700">
                  Every system we build is designed to scale. Not just technically,
                  but operationally. We think about what happens when you have 10x
                  the users, 10x the data, or 10x the team size. Scalability isn't
                  an afterthought—it's baked into every architectural decision,
                  every process design, and every implementation choice.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div {...getViewportAnimation(fadeInUp)} className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                Ready to Work Together?
              </h2>
              <p className="mb-8 text-lg text-white/90 md:text-xl">
                If you're a founder who values structured execution, measurable
                outcomes, and systematic thinking, let's talk about how we can help
                you achieve your goals.
              </p>
              <CTAButton
                href="/contact"
                variant="primary"
                size="lg"
                trackingEvent="about_cta_click"
                className="bg-white text-[var(--color-primary-dark)] hover:bg-white/90"
              >
                Schedule a Consultation
              </CTAButton>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
