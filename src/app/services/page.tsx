"use client";

import { motion } from "framer-motion";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { CTAButton } from "@/components/ui/CTAButton";
import { SERVICES } from "@/lib/services-data";
import { StructuredData } from "@/components/seo";
import { fadeInUp, staggerContainer, staggerItem, getViewportAnimation } from "@/lib/animations";

export default function ServicesPage() {
  // Generate schema markup for all services
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: service.schema,
    })),
  };

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen focus:outline-none">
      {/* Schema.org structured data for SEO (Requirement 4.7) */}
      <StructuredData data={servicesSchema} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] text-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Your Startup Execution Partner in India
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mb-8">
            We're not a marketing agency, development shop, or consultant. We're
            your structured execution partner—building systems that work, from
            startup execution to enterprise transformation. Partner with India's
            leading execution-focused tech systems company.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton
              href="/contact"
              variant="secondary"
              size="lg"
              trackingEvent="services_hero_cta_contact"
            >
              Start a Project
            </CTAButton>
            <CTAButton
              href="/case-studies"
              variant="outline"
              size="lg"
              trackingEvent="services_hero_cta_case_studies"
              className="bg-white/10 border-white text-white hover:bg-white hover:text-[var(--color-primary-dark)]"
            >
              View Case Studies
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Section Header */}
          <motion.div {...getViewportAnimation(fadeInUp)} className="mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl">
              We offer five core services designed to help founders and businesses
              execute with structure and scale with systems. Each service is
              outcome-focused and built on proven execution frameworks.
            </p>
          </motion.div>

          {/* Service Cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="space-y-8 md:space-y-12"
          >
            {SERVICES.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white">
        <motion.div {...getViewportAnimation(fadeInUp)} className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-primary-dark)] mb-4">
            Ready to Build Systems That Work?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a structured execution plan that
            delivers results. Book a free consultation to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton
              href="/contact"
              variant="primary"
              size="lg"
              trackingEvent="services_bottom_cta_contact"
            >
              Schedule a Consultation
            </CTAButton>
            <CTAButton
              href="/about"
              variant="outline"
              size="lg"
              trackingEvent="services_bottom_cta_about"
            >
              Learn About Our Approach
            </CTAButton>
          </div>
        </motion.div>
      </section>

      {/* Internal Linking Section - SEO Requirement 8.4 */}
      <section className="py-12 md:py-16 bg-[var(--color-background)]">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <motion.h2 {...getViewportAnimation(fadeInUp)} className="text-2xl md:text-3xl font-bold text-[var(--color-primary-dark)] mb-8 text-center">
            Explore More
          </motion.h2>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-3 gap-6"
          >
            {/* About Link */}
            <motion.a
              variants={staggerItem}
              href="/about"
              className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-2 group-hover:text-[var(--color-secondary-blue)] transition-colors">
                About Our Approach
              </h3>
              <p className="text-gray-600 mb-4">
                Learn about our systems thinking philosophy and how we partner
                with founders as a structured execution partner in India.
              </p>
              <span className="text-[var(--color-secondary-blue)] font-medium group-hover:underline">
                Read our story →
              </span>
            </motion.a>

            {/* Case Studies Link */}
            <motion.a
              variants={staggerItem}
              href="/case-studies"
              className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-2 group-hover:text-[var(--color-secondary-blue)] transition-colors">
                Case Studies
              </h3>
              <p className="text-gray-600 mb-4">
                See how we've helped startups and businesses execute with
                structure through our proven execution frameworks.
              </p>
              <span className="text-[var(--color-secondary-blue)] font-medium group-hover:underline">
                View case studies →
              </span>
            </motion.a>

            {/* Contact Link */}
            <motion.a
              variants={staggerItem}
              href="/contact"
              className="group p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <h3 className="text-xl font-semibold text-[var(--color-primary-dark)] mb-2 group-hover:text-[var(--color-secondary-blue)] transition-colors">
                Get Started
              </h3>
              <p className="text-gray-600 mb-4">
                Ready to transform your startup or business with structured
                execution? Schedule a free consultation to discuss your project.
              </p>
              <span className="text-[var(--color-secondary-blue)] font-medium group-hover:underline">
                Contact us →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
