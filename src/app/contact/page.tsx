import { generateMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/seo";
import { ContactForm } from "@/components/ContactForm";
import { CalendlySection } from "@/components/CalendlySection";
import type { Location } from "@/types";

// Generate SEO metadata for the Contact page
export const metadata = generateMetadata({
  title: "Contact Us - Get in Touch with Mahe Tech Systems",
  description:
    "Ready to transform your startup vision into reality? Contact Mahe Tech Systems for structured execution, SaaS development, and growth automation. Multiple ways to connect.",
  canonical: "/contact",
  ogType: "website",
  ogImage: "/images/contact-og.jpg",
  twitterCard: "summary_large_image",
  keywords: [
    "contact mahe tech",
    "startup execution partner",
    "schedule consultation",
    "get in touch",
    "contact form",
    "business inquiry",
  ],
});

// Location information
const location: Location = {
  address: "Mahe Tech Systems",
  city: "Bangalore",
  country: "India",
  mapUrl: "https://maps.google.com", // TODO: Replace with actual map URL
};

// Calendly URL - Replace with your actual Calendly URL
const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/your-username/30min";

// WhatsApp number - Configure in environment variables
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

export default function ContactPage() {
  // Generate Organization ContactPoint schema
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mahe Tech Systems",
    url: "https://mahetechsystems.com",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Business Inquiries",
      email: "hello@mahetechsystems.com",
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: location.city,
      addressCountry: location.country,
    },
  };

  return (
    <>
      {/* Add structured data to the page */}
      <StructuredData data={contactSchema} />

      <div id="main-content" tabIndex={-1} className="min-h-screen bg-[var(--color-background)] focus:outline-none">
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
                Let's Build Something Great Together
              </h1>
              <p className="text-lg text-white/90 md:text-xl">
                Ready to transform your vision into measurable outcomes? Choose your
                preferred way to connect with us.
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

        {/* Contact Methods Section */}
        <section className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                Get in Touch
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Choose the method that works best for you. We're here to help you
                achieve your goals.
              </p>
            </div>

            {/* Contact Options Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Schedule a Call */}
              <div className="rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--color-secondary-blue)]/10 p-4">
                  <svg
                    className="h-8 w-8 text-[var(--color-secondary-blue)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  Schedule a Call
                </h3>
                <p className="mb-4 text-gray-600">
                  Book a free 30-minute consultation to discuss your project and
                  explore how we can help.
                </p>
                <a
                  href="#calendly"
                  className="inline-flex items-center font-semibold text-[var(--color-secondary-blue)] hover:text-[var(--color-primary-dark)]"
                >
                  View calendar
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* Send a Message */}
              <div className="rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--color-secondary-blue)]/10 p-4">
                  <svg
                    className="h-8 w-8 text-[var(--color-secondary-blue)]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  Send a Message
                </h3>
                <p className="mb-4 text-gray-600">
                  Fill out our contact form and we'll get back to you within 24
                  hours.
                </p>
                <a
                  href="#contact-form"
                  className="inline-flex items-center font-semibold text-[var(--color-secondary-blue)] hover:text-[var(--color-primary-dark)]"
                >
                  Go to form
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>

              {/* WhatsApp */}
              <div className="rounded-xl bg-white p-8 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 inline-flex rounded-full bg-[var(--color-secondary-blue)]/10 p-4">
                  <svg
                    className="h-8 w-8 text-[var(--color-secondary-blue)]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-xl font-bold text-[var(--color-text)]">
                  WhatsApp
                </h3>
                <p className="mb-4 text-gray-600">
                  Prefer instant messaging? Reach out to us on WhatsApp for quick
                  questions.
                </p>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center font-semibold text-[var(--color-secondary-blue)] hover:text-[var(--color-primary-dark)]"
                >
                  Start chat
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Calendly Section */}
        <CalendlySection url={calendlyUrl} />

        {/* Contact Form Section - Placeholder */}
        <section id="contact-form" className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                Send Us a Message
              </h2>
              <p className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Form Component */}
            <ContactForm />
          </div>
        </section>

        {/* Location Information Section */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-6xl">
              <div className="mb-12 text-center">
                <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                  Our Location
                </h2>
                <p className="text-lg text-gray-600">
                  Based in India, serving founders globally
                </p>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Location Details */}
                <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] p-8 text-white shadow-lg">
                  <h3 className="mb-6 text-2xl font-bold">Contact Information</h3>

                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Address</h4>
                        <p className="text-white/90">
                          {location.address}
                          <br />
                          {location.city}, {location.country}
                        </p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Email</h4>
                        <a
                          href="mailto:hello@mahetechsystems.com"
                          className="text-white/90 hover:text-white"
                        >
                          hello@mahetechsystems.com
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Phone</h4>
                        <a
                          href="tel:+919876543210"
                          className="text-white/90 hover:text-white"
                        >
                          +91 98765 43210
                        </a>
                      </div>
                    </div>

                    {/* Business Hours */}
                    <div className="flex items-start">
                      <div className="mr-4 flex-shrink-0">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold">Business Hours</h4>
                        <p className="text-white/90">
                          Monday - Friday: 9:00 AM - 6:00 PM IST
                          <br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Placeholder */}
                <div className="rounded-xl bg-gray-100 shadow-lg">
                  <div className="flex h-full min-h-[400px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
                    <div className="text-center">
                      <svg
                        className="mx-auto mb-4 h-16 w-16 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                        />
                      </svg>
                      <p className="text-lg font-semibold text-gray-700">
                        Google Maps
                      </p>
                      <p className="mt-2 text-gray-500">
                        Interactive map will be embedded here
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container mx-auto px-6 py-16 md:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-[var(--color-text)] md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to common questions about working with us
              </p>
            </div>

            <div className="space-y-6">
              {/* FAQ 1 */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
                  What's the best way to get started?
                </h3>
                <p className="text-gray-700">
                  Schedule a free 30-minute consultation using our Calendly link
                  above. We'll discuss your project goals, challenges, and explore
                  how we can help you achieve measurable outcomes.
                </p>
              </div>

              {/* FAQ 2 */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
                  What information should I prepare for our first call?
                </h3>
                <p className="text-gray-700">
                  Come prepared with your business goals, current challenges, and
                  any specific outcomes you're looking to achieve. The more context
                  you provide, the more valuable our conversation will be.
                </p>
              </div>

              {/* FAQ 3 */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
                  How quickly can you respond to inquiries?
                </h3>
                <p className="text-gray-700">
                  We typically respond to all inquiries within 24 hours during
                  business days. For urgent matters, WhatsApp is the fastest way to
                  reach us.
                </p>
              </div>

              {/* FAQ 4 */}
              <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-text)]">
                  Do you work with international clients?
                </h3>
                <p className="text-gray-700">
                  Yes! While we're based in India, we work with founders and
                  businesses globally. We're experienced in remote collaboration and
                  can accommodate different time zones.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
