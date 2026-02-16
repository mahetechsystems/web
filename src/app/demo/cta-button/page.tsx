import { CTAButton } from "@/components/ui";

export default function CTAButtonDemo() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-[var(--color-text)]">
          CTA Button Component Demo
        </h1>

        {/* Variants Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <CTAButton variant="primary" size="md" href="/contact">
              Primary Button
            </CTAButton>
            <CTAButton variant="secondary" size="md" href="/contact">
              Secondary Button
            </CTAButton>
            <CTAButton variant="outline" size="md" href="/contact">
              Outline Button
            </CTAButton>
          </div>
        </section>

        {/* Sizes Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            Sizes
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton variant="primary" size="sm" href="/contact">
              Small Button
            </CTAButton>
            <CTAButton variant="primary" size="md" href="/contact">
              Medium Button
            </CTAButton>
            <CTAButton variant="primary" size="lg" href="/contact">
              Large Button
            </CTAButton>
          </div>
        </section>

        {/* With Icons Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            With Icons
          </h2>
          <div className="flex flex-wrap gap-4">
            <CTAButton variant="primary" size="md" href="/contact" icon="→">
              Next Step
            </CTAButton>
            <CTAButton variant="secondary" size="md" href="/services" icon="✓">
              Get Started
            </CTAButton>
            <CTAButton variant="outline" size="md" href="/blog" icon="📖">
              Read More
            </CTAButton>
          </div>
        </section>

        {/* Full Width Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            Full Width
          </h2>
          <div className="space-y-4">
            <CTAButton variant="primary" size="md" href="/contact" fullWidth>
              Full Width Primary
            </CTAButton>
            <CTAButton variant="secondary" size="md" href="/contact" fullWidth>
              Full Width Secondary
            </CTAButton>
          </div>
        </section>

        {/* Disabled State Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            Disabled State
          </h2>
          <div className="flex flex-wrap gap-4">
            <CTAButton variant="primary" size="md" href="" disabled>
              Disabled Primary
            </CTAButton>
            <CTAButton variant="secondary" size="md" href="" disabled>
              Disabled Secondary
            </CTAButton>
            <CTAButton variant="outline" size="md" href="" disabled>
              Disabled Outline
            </CTAButton>
          </div>
        </section>

        {/* Combined Examples Section */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-semibold text-[var(--color-text)]">
            Real-World Examples
          </h2>
          <div className="space-y-6">
            {/* Hero CTA */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Hero Section CTAs</h3>
              <p className="mb-4 text-gray-600">
                Primary and secondary actions above the fold
              </p>
              <div className="flex flex-wrap gap-4">
                <CTAButton
                  variant="primary"
                  size="lg"
                  href="/contact"
                  trackingEvent="hero_primary_cta"
                >
                  Schedule a Call
                </CTAButton>
                <CTAButton
                  variant="outline"
                  size="lg"
                  href="/services"
                  trackingEvent="hero_secondary_cta"
                >
                  View Services
                </CTAButton>
              </div>
            </div>

            {/* Card CTA */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Service Card CTA</h3>
              <p className="mb-4 text-gray-600">
                Smaller button for card components
              </p>
              <CTAButton
                variant="secondary"
                size="sm"
                href="/services"
                icon="→"
                trackingEvent="service_card_cta"
              >
                Learn More
              </CTAButton>
            </div>

            {/* Form CTA */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="mb-2 text-xl font-semibold">Form Submit Button</h3>
              <p className="mb-4 text-gray-600">
                Full-width button for forms
              </p>
              <CTAButton
                variant="primary"
                size="md"
                href=""
                fullWidth
                trackingEvent="form_submit"
              >
                Send Message
              </CTAButton>
            </div>
          </div>
        </section>

        {/* Touch Target Info */}
        <section className="rounded-lg bg-blue-50 p-6">
          <h2 className="mb-2 text-xl font-semibold text-[var(--color-text)]">
            ✓ Accessibility Features
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li>• Minimum 44x44px touch targets (WCAG compliant)</li>
            <li>• Keyboard navigation support</li>
            <li>• Focus indicators with proper contrast</li>
            <li>• Smooth hover and active state animations</li>
            <li>• Built-in analytics tracking</li>
            <li>• ARIA attributes for screen readers</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
