import { StickyCTA } from "@/components/ui";

/**
 * Demo page for StickyCTA component
 *
 * This page demonstrates the sticky CTA functionality with:
 * - Long scrollable content to trigger the sticky CTA
 * - Hero section simulation
 * - Multiple content sections
 */

export default function StickyCTADemo() {
  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Hero Section - Simulates the hero that user scrolls past */}
      <section className="h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-primary-dark)] to-[var(--color-secondary-blue)] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sticky CTA Demo
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Scroll down to see the sticky CTA appear after you pass this hero section
          </p>
          <div className="text-lg text-white/80">
            The sticky CTA will appear when you scroll past 600px
          </div>
        </div>
      </section>

      {/* Content Section 1 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text)]">
            How It Works
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text)]/80">
            <p>
              The StickyCTA component uses scroll detection to determine when to appear.
              By default, it shows after scrolling 600 pixels from the top of the page.
            </p>
            <p>
              The component implements several key features:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Smooth fade-in animation with opacity and transform transitions</li>
              <li>Fixed positioning to prevent Cumulative Layout Shift (CLS)</li>
              <li>Respects user's prefers-reduced-motion setting</li>
              <li>Analytics tracking support</li>
              <li>Customizable scroll threshold</li>
              <li>Gradient background for better visibility</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text)]">
            Design Considerations
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text)]/80">
            <p>
              The sticky CTA is designed to enhance conversion without being intrusive:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>No Layout Shift:</strong> Uses fixed positioning and is always in the DOM
                to prevent CLS issues
              </li>
              <li>
                <strong>Smooth Animations:</strong> Fade-in and slide-up effects create a polished
                experience
              </li>
              <li>
                <strong>Accessibility:</strong> Includes aria-hidden attribute when not visible
              </li>
              <li>
                <strong>Performance:</strong> Uses passive scroll listeners for better performance
              </li>
              <li>
                <strong>Responsive:</strong> Adapts to mobile and desktop viewports
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content Section 3 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text)]">
            Usage Example
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text)]/80">
            <p>
              Here's how to use the StickyCTA component in your pages:
            </p>
            <pre className="bg-gray-100 p-6 rounded-lg overflow-x-auto">
              <code className="text-sm">
{`import { StickyCTA } from "@/components/ui";

export default function HomePage() {
  return (
    <>
      {/* Your page content */}
      <section>...</section>
      
      {/* Sticky CTA */}
      <StickyCTA
        text="Get Started"
        href="/contact"
        variant="primary"
        size="md"
        scrollThreshold={600}
        trackingEvent="home_sticky_cta_click"
      />
    </>
  );
}`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Content Section 4 */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text)]">
            Customization Options
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text)]/80">
            <p>
              The component accepts several props for customization:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong>text:</strong> The button text (required)
              </li>
              <li>
                <strong>href:</strong> The destination URL (required)
              </li>
              <li>
                <strong>variant:</strong> Button style - "primary", "secondary", or "outline"
              </li>
              <li>
                <strong>size:</strong> Button size - "sm", "md", or "lg"
              </li>
              <li>
                <strong>icon:</strong> Optional icon to display
              </li>
              <li>
                <strong>scrollThreshold:</strong> Pixels from top before showing (default: 600)
              </li>
              <li>
                <strong>trackingEvent:</strong> Analytics event name
              </li>
              <li>
                <strong>className:</strong> Additional CSS classes
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Content Section 5 - Extra scroll space */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-[var(--color-text)]">
            Keep Scrolling
          </h2>
          <div className="space-y-6 text-lg text-[var(--color-text)]/80">
            <p>
              Notice how the sticky CTA remains visible as you scroll through the content.
              It provides a persistent call-to-action without being obtrusive.
            </p>
            <p>
              The gradient background ensures the button is always readable, even when
              positioned over varying content backgrounds.
            </p>
            <p>
              Try scrolling back up to see the CTA smoothly fade out when you return to
              the hero section.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA Component */}
      <StickyCTA
        text="Schedule a Call"
        href="/contact"
        variant="primary"
        size="md"
        icon="→"
        scrollThreshold={600}
        trackingEvent="demo_sticky_cta_click"
      />
    </div>
  );
}
