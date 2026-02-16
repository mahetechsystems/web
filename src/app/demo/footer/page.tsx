import { Footer } from "@/components/layout";

export default function FooterDemoPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Page Content */}
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-primary-dark)]">
              Footer Component Demo
            </h1>
            <p className="mt-4 text-lg text-[var(--color-text)]">
              This page demonstrates the Footer component with all its features.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--color-primary-dark)]">
              Features
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--color-text)]">
              <li>Company branding and tagline</li>
              <li>Navigation links to all main pages</li>
              <li>Contact information (location, email, WhatsApp)</li>
              <li>Social media links (LinkedIn, Twitter, GitHub)</li>
              <li>Legal links (Privacy Policy, Terms of Service)</li>
              <li>Copyright notice with dynamic year</li>
              <li>Fully responsive layout (mobile, tablet, desktop)</li>
              <li>Accessible with proper ARIA labels and semantic HTML</li>
              <li>Keyboard navigation support with visible focus indicators</li>
              <li>Touch-friendly targets (44x44px minimum)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--color-primary-dark)]">
              Accessibility Features
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--color-text)]">
              <li>Semantic HTML with proper footer role</li>
              <li>ARIA labels for navigation sections</li>
              <li>Screen reader friendly link descriptions</li>
              <li>Proper heading hierarchy (H2, H3)</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>External links with security attributes (rel="noopener noreferrer")</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-[var(--color-primary-dark)]">
              Responsive Design
            </h2>
            <ul className="list-inside list-disc space-y-2 text-[var(--color-text)]">
              <li>Mobile: Single column layout</li>
              <li>Tablet: Two column layout</li>
              <li>Desktop: Four column layout</li>
              <li>Bottom bar adapts from vertical to horizontal layout</li>
            </ul>
          </div>

          {/* Spacer to push footer down */}
          <div className="h-32" />
        </div>
      </main>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}
