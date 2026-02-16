/**
 * Image utility functions for server-side use
 */

/**
 * Generate a blur placeholder data URL for images
 * This function should be called on the server side (in Server Components)
 * 
 * @param width - Image width in pixels
 * @param height - Image height in pixels
 * @returns Base64-encoded SVG data URL
 * 
 * @example
 * ```tsx
 * // In a Server Component
 * const blurDataURL = generateBlurDataURL(800, 600);
 * 
 * <OptimizedImage
 *   src="/image.jpg"
 *   alt="Image"
 *   width={800}
 *   height={600}
 *   placeholder="blur"
 *   blurDataURL={blurDataURL}
 * />
 * ```
 */
export function generateBlurDataURL(width: number, height: number): string {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="#f3f4f6"/>
    </svg>
  `;
  
  const base64 = Buffer.from(svg).toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}
