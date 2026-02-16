import Link from "next/link";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/mahe-tech-systems", icon: "linkedin" },
  { label: "Twitter", href: "https://twitter.com/mahetechsystems", icon: "twitter" },
  { label: "GitHub", href: "https://github.com/mahetechsystems", icon: "github" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-[var(--color-primary-dark)] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Mahe Tech Systems</h2>
            <p className="text-sm text-gray-300">
              A structured execution partner for founders. Building systems that drive growth and outcomes.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Navigation</h3>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact</h3>
            <address className="not-italic text-sm text-gray-300">
              <p className="mb-2">Bangalore, India</p>
              <p className="mb-2">
                <a
                  href="mailto:hello@mahetechsystems.com"
                  className="transition-colors hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
                >
                  hello@mahetechsystems.com
                </a>
              </p>
              <p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
                >
                  WhatsApp: +91 98765 43210
                </a>
              </p>
            </address>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Follow Us</h3>
            <nav aria-label="Social media links">
              <ul className="flex space-x-4">
                {socialLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
                      aria-label={`Visit our ${link.label} page`}
                    >
                      <span className="sr-only">{link.label}</span>
                      {/* Icon placeholder - replace with actual icons */}
                      <span className="text-sm font-semibold" aria-hidden="true">
                        {link.icon.charAt(0).toUpperCase()}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-gray-300">
              © {currentYear} Mahe Tech Systems. All rights reserved.
            </p>

            {/* Legal Links */}
            <nav aria-label="Legal links">
              <ul className="flex space-x-6">
                {legalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-300 transition-colors hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[var(--color-primary-dark)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
