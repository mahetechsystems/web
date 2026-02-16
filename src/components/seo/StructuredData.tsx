/**
 * StructuredData Component
 *
 * This component renders JSON-LD structured data for SEO.
 * It should be used in page components to add Schema.org markup.
 *
 * Requirements: 7.8
 *
 * @example
 * ```tsx
 * import { StructuredData } from "@/components/seo";
 * import { generateBlogPostingSchema } from "@/lib/seo";
 *
 * export default function BlogPost() {
 *   const schema = generateBlogPostingSchema({...});
 *   return (
 *     <>
 *       <StructuredData data={schema} />
 *       <article>...</article>
 *     </>
 *   );
 * }
 * ```
 */

interface StructuredDataProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
}
