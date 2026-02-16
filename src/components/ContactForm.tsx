"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { ContactForm as ContactFormData } from "@/types";
import { trackFormSubmission } from "@/lib/analytics";

// Zod validation schema
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().max(100, "Company name must not exceed 100 characters").optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to continue",
  }),
});

type FormData = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
          source: typeof window !== "undefined" ? window.location.pathname : "/contact",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setSubmitStatus("success");
      reset();

      // Track form submission in analytics
      trackFormSubmission("contact", "contact-form");
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl bg-white p-8 shadow-lg md:p-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--color-text)] transition-all duration-200 focus:outline-none focus:ring-2 hover:border-[var(--color-secondary-blue)] ${
              errors.name
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-[var(--color-secondary-blue)] focus:ring-[var(--color-secondary-blue)]"
            }`}
            placeholder="Your full name"
            disabled={isSubmitting}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--color-text)] transition-all duration-200 focus:outline-none focus:ring-2 hover:border-[var(--color-secondary-blue)] ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-[var(--color-secondary-blue)] focus:ring-[var(--color-secondary-blue)]"
            }`}
            placeholder="your.email@example.com"
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Company Field (Optional) */}
        <div>
          <label htmlFor="company" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            Company <span className="text-sm font-normal text-gray-500">(Optional)</span>
          </label>
          <input
            id="company"
            type="text"
            {...register("company")}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--color-text)] transition-all duration-200 focus:outline-none focus:ring-2 hover:border-[var(--color-secondary-blue)] ${
              errors.company
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-[var(--color-secondary-blue)] focus:ring-[var(--color-secondary-blue)]"
            }`}
            placeholder="Your company name"
            disabled={isSubmitting}
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.company.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            {...register("message")}
            rows={6}
            className={`w-full rounded-lg border px-4 py-3 text-[var(--color-text)] transition-all duration-200 focus:outline-none focus:ring-2 hover:border-[var(--color-secondary-blue)] ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-[var(--color-secondary-blue)] focus:ring-[var(--color-secondary-blue)]"
            }`}
            placeholder="Tell us about your project, goals, and how we can help..."
            disabled={isSubmitting}
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Consent Checkbox */}
        <div>
          <div className="flex items-start">
            <div className="flex h-6 items-center">
              <input
                id="consent"
                type="checkbox"
                {...register("consent")}
                className={`h-5 w-5 rounded border-gray-300 text-[var(--color-secondary-blue)] transition-all duration-200 hover:border-[var(--color-secondary-blue)] focus:ring-2 focus:ring-[var(--color-secondary-blue)] focus:ring-offset-2 ${
                  errors.consent ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="consent" className="text-sm text-gray-700">
                I agree to the{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[var(--color-secondary-blue)] hover:text-[var(--color-primary-dark)] hover:underline"
                >
                  privacy policy
                </a>{" "}
                and consent to being contacted about my inquiry. <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-500" role="alert">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Success Message */}
        {submitStatus === "success" && (
          <div
            className="rounded-lg bg-green-50 p-4 text-green-800"
            role="alert"
            aria-live="polite"
          >
            <div className="flex items-start">
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Message sent successfully!</h3>
                <p className="mt-1 text-sm">
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === "error" && (
          <div
            className="rounded-lg bg-red-50 p-4 text-red-800"
            role="alert"
            aria-live="assertive"
          >
            <div className="flex items-start">
              <svg
                className="mr-3 h-6 w-6 flex-shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 className="font-semibold">Failed to send message</h3>
                <p className="mt-1 text-sm">
                  {errorMessage || "Please try again or contact us directly via email or WhatsApp."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-gradient-to-r from-[var(--color-secondary-blue)] to-[var(--color-accent-blue)] px-8 py-4 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>

        {/* Required Fields Note */}
        <p className="text-center text-sm text-gray-500">
          <span className="text-red-500">*</span> Required fields
        </p>
      </form>
    </div>
  );
}
