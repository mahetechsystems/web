import { OptimizedImage } from "@/components/ui";
import { generateBlurDataURL } from "@/lib/image-utils";

// Generate blur data URL on the server side
const blurDataURL = generateBlurDataURL(800, 600);

export default function OptimizedImageDemo() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            OptimizedImage Component Demo
          </h1>
          <p className="text-gray-600">
            Showcasing WebP/AVIF optimization, lazy loading, responsive sizing, and error handling
          </p>
        </div>

        {/* Priority Image (Above the Fold) */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Priority Image (Above the Fold)</h2>
          <p className="text-gray-600 mb-4">
            This image loads eagerly with priority flag. Use for hero images and above-the-fold content.
          </p>
          <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
            <OptimizedImage
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop"
              alt="Developer workspace with laptop and code"
              width={1200}
              height={800}
              priority
              fill
              objectFit="cover"
            />
          </div>
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`<OptimizedImage
  src="/hero.jpg"
  alt="Hero image"
  width={1200}
  height={800}
  priority
  fill
  objectFit="cover"
/>`}
          </pre>
        </section>

        {/* Lazy Loaded Images */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Lazy Loaded Images (Below the Fold)</h2>
          <p className="text-gray-600 mb-4">
            These images load lazily as you scroll. Default behavior for better performance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop"
                alt="Code on laptop screen"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">Fixed dimensions</p>
            </div>
            <div>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
                alt="Developer coding"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">Lazy loaded</p>
            </div>
            <div>
              <OptimizedImage
                src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop"
                alt="Tech workspace"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">Auto WebP/AVIF</p>
            </div>
          </div>
        </section>

        {/* Responsive Sizing */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Responsive Sizing</h2>
          <p className="text-gray-600 mb-4">
            Custom sizes for different breakpoints. Resize your browser to see the effect.
          </p>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop"
            alt="Code editor with colorful syntax"
            width={1200}
            height={600}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            className="rounded-lg w-full h-auto"
          />
          <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-x-auto">
{`sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"`}
          </pre>
        </section>

        {/* Error Handling */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            Graceful fallback when images fail to load. Try this broken image URL:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <OptimizedImage
                src="/broken-image-url.jpg"
                alt="This image will fail to load"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">Fallback placeholder with alt text</p>
            </div>
            <div>
              <OptimizedImage
                src="/another-broken-image.jpg"
                alt=""
                width={400}
                height={300}
                className="rounded-lg"
              />
              <p className="mt-2 text-sm text-gray-600">Fallback with generic message</p>
            </div>
          </div>
        </section>

        {/* With Blur Placeholder */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Blur Placeholder</h2>
          <p className="text-gray-600 mb-4">
            Better loading experience with blur placeholders:
          </p>
          <OptimizedImage
            src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&h=600&fit=crop"
            alt="Programming code"
            width={800}
            height={600}
            placeholder="blur"
            blurDataURL={blurDataURL}
            className="rounded-lg"
          />
        </section>

        {/* Different Object Fit Options */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Object Fit Options</h2>
          <p className="text-gray-600 mb-4">
            Different ways to fit images in containers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
                  alt="Technology"
                  width={400}
                  height={600}
                  fill
                  objectFit="cover"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">object-fit: cover</p>
            </div>
            <div>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
                  alt="Technology"
                  width={400}
                  height={600}
                  fill
                  objectFit="contain"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">object-fit: contain</p>
            </div>
            <div>
              <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=600&fit=crop"
                  alt="Technology"
                  width={400}
                  height={600}
                  fill
                  objectFit="scale-down"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600 text-center">object-fit: scale-down</p>
            </div>
          </div>
        </section>

        {/* Performance Info */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-900">Performance Features</h2>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Automatic Format Optimization:</strong> Serves AVIF → WebP → Original based on browser support</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Smart Lazy Loading:</strong> Below-fold images load only when entering viewport</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Responsive Srcset:</strong> Automatically generates multiple sizes for different devices</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Error Handling:</strong> Graceful fallbacks prevent broken image icons</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">✅</span>
              <span><strong>Loading States:</strong> Smooth opacity transitions for better UX</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
