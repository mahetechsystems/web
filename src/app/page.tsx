"use client";

import { motion } from "framer-motion";
import { StructuredData } from "@/components/seo";
import { CTAButton, ProblemCard, ExecutionBlock, SystemFramework, CaseExampleCard, CaseExample, StickyCTA } from "@/components/ui";
import {
  generateOrganizationSchema,
  generateWebSiteSchema,
} from "@/lib/seo";
import { fadeInUp, staggerContainer, getViewportAnimation } from "@/lib/animations";

// Featured case examples data
const featuredCaseExamples: CaseExample[] = [
  {
    slug: "saas-platform-transformation",
    title: "SaaS Platform Transformation",
    client: "FinTech Startup",
    problem:
      "Struggling with a monolithic architecture that couldn't scale. Customer onboarding took 2 weeks, and the system crashed during peak usage.",
    outcome:
      "Reduced onboarding time to 2 hours, achieved 99.9% uptime, and scaled to 10x user base without infrastructure changes.",
    image: {
      src: "/images/case-studies/saas-transformation.svg",
      alt: "SaaS platform dashboard showing improved performance metrics",
      width: 600,
      height: 400,
    },
  },
  {
    slug: "crm-automation-system",
    title: "CRM & Sales Automation",
    client: "B2B Services Company",
    problem:
      "Sales team spending 60% of time on manual data entry and follow-ups. No visibility into pipeline health or conversion metrics.",
    outcome:
      "Automated 80% of manual tasks, increased sales team productivity by 3x, and improved conversion rate by 45%.",
    image: {
      src: "/images/case-studies/crm-automation.svg",
      alt: "CRM automation dashboard with sales pipeline visualization",
      width: 600,
      height: 400,
    },
  },
  {
    slug: "digital-transformation-retail",
    title: "Digital Transformation for Retail",
    client: "Multi-Brand Retailer",
    problem:
      "Disconnected systems across inventory, sales, and customer data. No unified view of business operations or customer behavior.",
    outcome:
      "Integrated 5 systems into unified platform, reduced inventory costs by 30%, and increased customer retention by 25%.",
    image: {
      src: "/images/case-studies/retail-transformation.svg",
      alt: "Retail analytics dashboard showing unified business metrics",
      width: 600,
      height: 400,
    },
  },
];

export default function Home() {
  // Generate structured data for the homepage
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      {/* Add structured data to the page */}
      <StructuredData data={[organizationSchema, websiteSchema]} />

      <main id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--color-background)] focus:outline-none">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-secondary-blue)] to-[var(--color-accent-blue)] min-h-[85vh] flex items-center">
          {/* Geometric pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Animated gradient orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

          <div className="container relative mx-auto px-6 py-24 md:py-32 lg:py-40">
            <div className="mx-auto max-w-5xl text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/30"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Trusted by Ambitious Founders
              </motion.div>

              {/* Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-7xl tracking-tight"
              >
                Your Structured Execution Partner for{" "}
                <span className="bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Startup Success
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-10 text-lg text-white/90 md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
              >
                We don't just build software. We design systems, execute with precision, 
                and deliver measurable outcomes for founders who need more than promises.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              >
                <CTAButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  trackingEvent="hero_primary_cta_click"
                  className="bg-white text-[var(--color-primary-dark)] hover:bg-white/90 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
                >
                  Schedule a Call
                </CTAButton>
                <CTAButton
                  href="/services"
                  variant="outline"
                  size="lg"
                  trackingEvent="hero_secondary_cta_click"
                  className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)] backdrop-blur-sm"
                >
                  Explore Services
                </CTAButton>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80 text-sm"
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>10+ Projects Delivered</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>99.9% Uptime Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  <span>3x Faster Execution</span>
                </div>
              </motion.div>
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

        {/* Problem Section */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <div className="mx-auto max-w-7xl">
            {/* Section Header */}
            <motion.div {...getViewportAnimation(fadeInUp)} className="mb-16 text-center">
              <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary-blue)]">
                The Challenge
              </span>
              <h2 className="mb-6 text-3xl font-bold text-[var(--color-text)] md:text-4xl lg:text-5xl">
                The Founder's Execution Gap
              </h2>
              <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
                You have the vision. You know what needs to be done. But execution is where most startups stumble.
              </p>
            </motion.div>

            {/* Problem Cards Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            >
              <ProblemCard
                title="Scattered Priorities"
                description="Too many ideas, not enough focus. You're building features instead of systems, reacting instead of executing strategically."
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                }
                index={0}
              />
              <ProblemCard
                title="Technical Debt"
                description="Quick fixes and rushed launches have created a fragile foundation. Every new feature risks breaking something else."
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                }
                index={1}
              />
              <ProblemCard
                title="Execution Bottlenecks"
                description="Your team is capable, but without clear systems and processes, progress is slow and inconsistent."
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                index={2}
              />
              <ProblemCard
                title="No Measurable Progress"
                description="You're busy, but are you moving forward? Without clear metrics and outcomes, it's hard to know if you're winning."
                icon={
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                }
                index={3}
              />
            </motion.div>
          </div>
        </section>

        {/* Execution Blocks Section */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-28">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden opacity-5">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[var(--color-secondary-blue)] rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[var(--color-primary-dark)] rounded-full blur-3xl" />
          </div>

          <div className="container relative mx-auto px-6">
            <div className="mx-auto max-w-7xl">
              {/* Section Header */}
              <motion.div {...getViewportAnimation(fadeInUp)} className="mb-16 text-center">
                <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary-blue)]">
                  Our Approach
                </span>
                <h2 className="mb-6 text-3xl font-bold text-[var(--color-text)] md:text-4xl lg:text-5xl">
                  How We Execute
                </h2>
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
                  We bring structure to chaos. Our execution framework transforms your vision into measurable outcomes through systematic design and disciplined implementation.
                </p>
              </motion.div>

              {/* Execution Blocks Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                <ExecutionBlock
                  title="System Design"
                  description="We architect scalable systems that grow with your business. Every decision is documented, every component is purposeful, and every integration is planned."
                  outcomes={[
                    "Clear technical roadmap aligned with business goals",
                    "Scalable architecture that handles growth",
                    "Reduced technical debt through thoughtful design",
                  ]}
                  index={0}
                />
                <ExecutionBlock
                  title="Structured Execution"
                  description="We break down complex projects into manageable phases with clear milestones. You always know what's being built, why it matters, and when it ships."
                  outcomes={[
                    "Predictable delivery timelines",
                    "Transparent progress tracking",
                    "Risk mitigation through phased rollouts",
                  ]}
                  index={1}
                />
                <ExecutionBlock
                  title="Measurable Outcomes"
                  description="We define success metrics upfront and track them relentlessly. Every feature ships with analytics, every system has monitoring, every outcome is measured."
                  outcomes={[
                    "Data-driven decision making",
                    "Clear ROI on every initiative",
                    "Continuous optimization based on real metrics",
                  ]}
                  index={2}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* System Framework Section */}
        <section className="container mx-auto px-6 py-20 md:py-28">
          <motion.div {...getViewportAnimation(fadeInUp)} className="mb-16 text-center">
            <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary-blue)]">
              The Process
            </span>
          </motion.div>
          <motion.div {...getViewportAnimation(fadeInUp)}>
            <SystemFramework
            title="Our Execution Framework"
            steps={[
              {
                number: 1,
                title: "Discovery & Analysis",
                description: "We start by understanding your business goals, technical constraints, and success metrics. No assumptions—just structured discovery that uncovers what actually matters.",
              },
              {
                number: 2,
                title: "System Design",
                description: "We architect a scalable solution with clear documentation and technical specifications. Every decision is documented, every component is purposeful.",
              },
              {
                number: 3,
                title: "Phased Execution",
                description: "We build in structured phases with regular checkpoints and transparent progress tracking. You always know what's being built, why it matters, and when it ships.",
              },
              {
                number: 4,
                title: "Measurement & Optimization",
                description: "We track outcomes, gather data, and continuously optimize for better results. Every feature ships with analytics, every system has monitoring.",
              },
            ]}
          />
          </motion.div>
        </section>

        {/* Case Examples Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-7xl">
              {/* Section Header */}
              <motion.div {...getViewportAnimation(fadeInUp)} className="mb-16 text-center">
                <span className="inline-block mb-4 text-sm font-semibold uppercase tracking-wider text-[var(--color-secondary-blue)]">
                  Success Stories
                </span>
                <h2 className="mb-6 text-3xl font-bold text-[var(--color-text)] md:text-4xl lg:text-5xl">
                  Proven Results, Real Impact
                </h2>
                <p className="mx-auto max-w-3xl text-lg md:text-xl text-gray-600 leading-relaxed">
                  We measure success by outcomes, not outputs. Here's how we've helped founders transform their vision into measurable results.
                </p>
              </motion.div>

              {/* Case Examples Grid */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              >
                {featuredCaseExamples.map((caseExample, index) => (
                  <CaseExampleCard
                    key={caseExample.slug}
                    caseExample={caseExample}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* View All Link */}
              <motion.div {...getViewportAnimation(fadeInUp)} className="mt-12 text-center">
                <CTAButton
                  href="/case-studies"
                  variant="outline"
                  size="lg"
                  trackingEvent="case_examples_view_all_click"
                >
                  View All Case Studies
                </CTAButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-primary-dark)] via-[var(--color-secondary-blue)] to-[var(--color-accent-blue)] py-20 md:py-28">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="container relative mx-auto px-6">
            <motion.div {...getViewportAnimation(fadeInUp)} className="mx-auto max-w-4xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                Ready to Transform Your Execution?
              </h2>
              <p className="mb-10 text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
                Let's discuss how structured execution can help you achieve your goals faster and with greater confidence.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <CTAButton
                  href="/contact"
                  variant="primary"
                  size="lg"
                  trackingEvent="final_cta_click"
                  className="bg-white text-[var(--color-primary-dark)] hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
                >
                  Schedule a Free Consultation
                </CTAButton>
                <CTAButton
                  href="/case-studies"
                  variant="outline"
                  size="lg"
                  trackingEvent="final_cta_case_studies_click"
                  className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)]"
                >
                  View Case Studies
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Sticky CTA - appears after scrolling past hero section */}
      <StickyCTA
        text="Schedule a Call"
        href="/contact"
        variant="primary"
        size="md"
        scrollThreshold={600}
        trackingEvent="sticky_cta_click"
      />
    </>
  );
}
