import { type Service } from "@/types";
import { SITE_CONFIG } from "./constants";

/**
 * Services Data
 *
 * Comprehensive service offerings for Mahe Tech Systems.
 * Each service includes detailed descriptions, key features, outcomes, and SEO keywords.
 *
 * Requirements: 4.1-4.5, 8.1
 */

export const SERVICES: Service[] = [
  {
    id: "startup-execution",
    title: "Startup Execution",
    slug: "startup-execution",
    description:
      "Transform your startup vision into a structured execution plan with systems that scale from day one.",
    longDescription:
      "We partner with founders to build execution systems that turn ideas into market-ready products. Our approach combines strategic planning, rapid prototyping, and systematic execution to help startups move from concept to launch efficiently. We don't just build features—we build the operational foundation that enables sustainable growth.",
    keyFeatures: [
      "Product roadmap development with clear milestones and deliverables",
      "MVP design and rapid prototyping to validate market fit",
      "Technical architecture planning for scalability",
      "Execution framework implementation with weekly sprints",
      "Founder coaching on systems thinking and operational excellence",
      "Resource allocation and team structure recommendations",
    ],
    outcomes: [
      "Clear 90-day execution roadmap with measurable milestones",
      "Validated MVP launched to market within 8-12 weeks",
      "Scalable technical foundation that grows with your business",
      "Operational systems that reduce founder bottlenecks",
      "Structured decision-making frameworks for faster execution",
    ],
    targetKeywords: [
      "startup execution partner India",
      "MVP development for startups",
      "startup systems thinking",
      "founder execution coaching",
      "startup operational excellence",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Startup Execution",
      description:
        "Structured execution partnership for startups, from concept to market-ready product with scalable systems.",
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "India",
      serviceType: "Startup Execution Partnership",
    },
  },
  {
    id: "saas-development",
    title: "SaaS Development",
    slug: "saas-development",
    description:
      "Build robust, scalable SaaS products with modern architecture and best practices from day one.",
    longDescription:
      "We design and develop SaaS applications that are built to scale. Our approach focuses on creating maintainable codebases, implementing robust infrastructure, and establishing development workflows that support rapid iteration. From authentication systems to payment integrations, we handle the complex technical challenges so you can focus on your customers.",
    keyFeatures: [
      "Full-stack SaaS application development with modern frameworks",
      "Multi-tenant architecture design and implementation",
      "User authentication and authorization systems",
      "Payment gateway integration (Stripe, Razorpay)",
      "API design and development with comprehensive documentation",
      "Database design and optimization for performance",
      "Cloud infrastructure setup (AWS, Vercel, Railway)",
      "CI/CD pipeline configuration for automated deployments",
    ],
    outcomes: [
      "Production-ready SaaS application with secure authentication",
      "Scalable infrastructure that handles growth automatically",
      "Clean, maintainable codebase with comprehensive documentation",
      "Automated deployment pipeline for rapid feature releases",
      "Performance-optimized application with sub-2s load times",
    ],
    targetKeywords: [
      "SaaS development India",
      "scalable SaaS architecture",
      "multi-tenant SaaS development",
      "SaaS MVP development",
      "cloud-native SaaS applications",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "SaaS Development",
      description:
        "Full-stack SaaS application development with scalable architecture, modern frameworks, and best practices.",
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "India",
      serviceType: "SaaS Application Development",
    },
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation",
    slug: "digital-transformation",
    description:
      "Modernize legacy systems and processes with digital solutions that improve efficiency and reduce operational overhead.",
    longDescription:
      "We help businesses transition from manual processes and legacy systems to modern digital workflows. Our transformation approach focuses on identifying high-impact areas, designing user-friendly solutions, and implementing changes incrementally to minimize disruption. We build custom tools that fit your specific workflows rather than forcing you into generic software.",
    keyFeatures: [
      "Process audit and digital opportunity assessment",
      "Custom workflow automation tools and dashboards",
      "Legacy system modernization and data migration",
      "Integration with existing tools and platforms",
      "Employee training and change management support",
      "Performance monitoring and optimization systems",
    ],
    outcomes: [
      "Reduced manual work through automated workflows",
      "Real-time visibility into business operations with dashboards",
      "Improved data accuracy and reduced human error",
      "Faster decision-making with accessible data insights",
      "Scalable digital infrastructure that grows with your business",
    ],
    targetKeywords: [
      "digital transformation India",
      "business process automation",
      "legacy system modernization",
      "workflow automation solutions",
      "custom business software",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Digital Transformation",
      description:
        "Modernize legacy systems and automate business processes with custom digital solutions.",
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "India",
      serviceType: "Digital Transformation Consulting",
    },
  },
  {
    id: "growth-automation",
    title: "Growth & Automation",
    slug: "growth-automation",
    description:
      "Scale your operations with intelligent automation systems that handle repetitive tasks and enable data-driven growth.",
    longDescription:
      "We build automation systems that eliminate repetitive work and create leverage in your business. From marketing automation to operational workflows, we design systems that run reliably in the background while you focus on strategic growth. Our approach combines no-code tools, custom integrations, and smart workflows to maximize efficiency.",
    keyFeatures: [
      "Marketing automation setup (email sequences, lead nurturing)",
      "Sales pipeline automation and lead scoring systems",
      "Customer onboarding automation workflows",
      "Data synchronization between tools (Zapier, Make, custom APIs)",
      "Reporting and analytics dashboard creation",
      "A/B testing framework implementation",
      "Growth experiment tracking and analysis systems",
    ],
    outcomes: [
      "Automated lead nurturing that runs 24/7",
      "Reduced time spent on repetitive operational tasks",
      "Data-driven insights for growth decision-making",
      "Consistent customer experience through automated workflows",
      "Scalable systems that handle increased volume without additional headcount",
    ],
    targetKeywords: [
      "growth automation India",
      "marketing automation systems",
      "sales process automation",
      "business workflow automation",
      "operational efficiency automation",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Growth & Automation",
      description:
        "Intelligent automation systems for marketing, sales, and operations that enable scalable growth.",
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "India",
      serviceType: "Growth Automation Services",
    },
  },
  {
    id: "crm-sales-systems",
    title: "CRM & Sales Systems",
    slug: "crm-sales-systems",
    description:
      "Implement and optimize CRM systems that give you complete visibility into your sales pipeline and customer relationships.",
    longDescription:
      "We help businesses implement CRM systems that actually get used. Our approach focuses on designing workflows that match your sales process, integrating with your existing tools, and training your team for adoption. Whether you're implementing a new CRM or optimizing an existing one, we ensure your system becomes a strategic asset rather than unused software.",
    keyFeatures: [
      "CRM selection and implementation (HubSpot, Salesforce, Pipedrive)",
      "Custom sales pipeline design and configuration",
      "Lead capture and routing automation",
      "Email integration and tracking setup",
      "Sales reporting and forecasting dashboards",
      "Team training and adoption support",
      "Integration with marketing tools and communication platforms",
      "Data migration from spreadsheets or legacy systems",
    ],
    outcomes: [
      "Complete visibility into sales pipeline and deal stages",
      "Automated lead capture and follow-up workflows",
      "Accurate sales forecasting based on pipeline data",
      "Improved team collaboration with centralized customer data",
      "Higher conversion rates through systematic follow-up",
    ],
    targetKeywords: [
      "CRM implementation India",
      "sales system optimization",
      "HubSpot implementation partner",
      "sales pipeline automation",
      "CRM consulting services",
    ],
    schema: {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "CRM & Sales Systems",
      description:
        "CRM implementation and optimization services for complete sales pipeline visibility and automation.",
      provider: {
        "@type": "Organization",
        name: SITE_CONFIG.name,
        url: SITE_CONFIG.url,
      },
      areaServed: "India",
      serviceType: "CRM Implementation and Consulting",
    },
  },
];

/**
 * Get a service by slug
 */
export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

/**
 * Get all service slugs for static generation
 */
export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
