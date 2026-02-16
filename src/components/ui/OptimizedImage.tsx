"use client";

import Image from "next/image";
import { useState } from "react";
import { type OptimizedImage as OptimizedImageProps } from "@/types";

/**
 * OptimizedImage Component
 *
 * A wrapper around Next.js Image component that provides:
 * - WebP/AVIF format support with automatic fallbacks
 * - Lazy loading for below-fold images
 * - Responsive srcset and sizes configuration
 * - Error handling with fallback placeholders
 * - Automatic format optimization
 *
 * Features:
 * - Automatic format selection (AVIF → WebP → original)
 * - Lazy loading by default (eager for priority images)
 * - Responsive image sizing with srcset
 * - Error state with fallback placeholder
 * - Accessibility with alt text
 *
 * Requirements: 1.5, 1.6, 13.4, 16.4
 */

interface OptimizedImageComponentProps extends OptimizedImageProps {
  className?: string;
  fill?: boolean;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  objectPosition?: string;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  formats = ["avif", "webp"],
  sizes,
  loading,
  className,
  fill = false,
  objectFit = "cover",
  objectPosition = "center",
  placeholder = "empty",
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageComponentProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine loading strategy
  // Priority images should load eagerly, others lazy (Requirement 1.6)
  const loadingStrategy = loading || (priority ? "eager" : "lazy");

  // Handle image load error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (onError) {
      onError();
    }
  };

  // Handle image load success
  const handleLoad = () => {
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  };

  // Fallback placeholder when image fails to load (Requirement 16.4)
  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className || ""}`}
        style={{
          width: fill ? "100%" : width,
          height: fill ? "100%" : height,
        }}
        role="img"
        aria-label={alt || "Image failed to load"}
      >
        <div className="text-center p-4">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="mt-2 text-sm">{alt || "Image unavailable"}</p>
        </div>
      </div>
    );
  }

  // Generate responsive sizes if not provided (Requirement 13.4)
  // Provides optimal image sizes for different viewport widths
  const responsiveSizes =
    sizes ||
    (fill
      ? "100vw"
      : width && width > 1200
        ? "(max-width: 640px) 100vw, (max-width: 768px) 90vw, (max-width: 1024px) 80vw, (max-width: 1280px) 70vw, 1200px"
        : width && width > 768
          ? "(max-width: 640px) 100vw, (max-width: 1024px) 90vw, (max-width: 1280px) 80vw, 768px"
          : `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${width}px`);

  // Common props for Next.js Image
  const imageProps = {
    src,
    alt,
    quality,
    priority,
    loading: loadingStrategy,
    sizes: responsiveSizes,
    onLoad: handleLoad,
    onError: handleError,
    className: `${className || ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`,
    placeholder,
    ...(blurDataURL && { blurDataURL }),
  };

  // Render with fill layout
  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{
          objectFit,
          objectPosition,
        }}
      />
    );
  }

  // Render with fixed dimensions
  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
      style={{
        objectFit,
        objectPosition,
      }}
    />
  );
}
