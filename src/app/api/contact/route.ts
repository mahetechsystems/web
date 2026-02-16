import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getApiCacheHeader } from "@/lib/cache";

// Initialize Resend client
const resend = new Resend(process.env.EMAIL_API_KEY);

// Initialize rate limiter (if Redis is configured)
let ratelimit: Ratelimit | null = null;
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });

  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 h"), // 5 requests per hour per IP
    analytics: true,
  });
}

// Validation schema matching the frontend
const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  company: z
    .string()
    .trim()
    .max(100, "Company name must not exceed 100 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters"),
  consent: z.boolean().refine((val) => val === true, {
    message: "You must accept the privacy policy to continue",
  }),
  timestamp: z.string().optional(),
  source: z.string().optional(),
});

// CSRF token validation
function validateCSRFToken(request: NextRequest): boolean {
  // In production, implement proper CSRF token validation
  // For now, we'll check the origin header
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin) {
    return false;
  }

  // Allow requests from the same origin
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_SITE_URL,
    `https://${host}`,
    `http://${host}`,
    "http://localhost:3000",
  ];

  return allowedOrigins.some((allowed) => origin.startsWith(allowed || ""));
}

// Sanitize input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // Remove < and > to prevent HTML injection
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers like onclick=
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection
    if (!validateCSRFToken(request)) {
      return NextResponse.json(
        { success: false, message: "Invalid request origin" },
        { status: 403 }
      );
    }

    // Rate Limiting
    if (ratelimit) {
      const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
      const { success: rateLimitSuccess, limit, remaining, reset } = await ratelimit.limit(ip);

      if (!rateLimitSuccess) {
        return NextResponse.json(
          {
            success: false,
            message: "Too many requests. Please try again later.",
            limit,
            remaining,
            reset,
          },
          { status: 429 }
        );
      }
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Sanitize user input
    const sanitizedData = {
      name: sanitizeInput(data.name),
      email: data.email, // Email is already validated by Zod
      company: data.company ? sanitizeInput(data.company) : undefined,
      message: sanitizeInput(data.message),
      consent: data.consent,
      timestamp: data.timestamp || new Date().toISOString(),
      source: data.source || "unknown",
    };

    // Validate email service is configured
    if (!process.env.EMAIL_API_KEY) {
      console.error("EMAIL_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact us directly.",
        },
        { status: 500 }
      );
    }

    if (!process.env.EMAIL_FROM) {
      console.error("EMAIL_FROM is not configured");
      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured. Please contact us directly.",
        },
        { status: 500 }
      );
    }

    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: process.env.NEXT_PUBLIC_CONTACT_EMAIL || process.env.EMAIL_FROM,
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #5F8FB4 0%, #7BA5C8 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            
            <div style="background: #f8fafc; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #1F3A5F; margin-top: 0; font-size: 20px; border-bottom: 2px solid #5F8FB4; padding-bottom: 10px;">Contact Details</h2>
                
                <div style="margin: 20px 0;">
                  <p style="margin: 10px 0;"><strong style="color: #1F3A5F; display: inline-block; width: 120px;">Name:</strong> ${sanitizedData.name}</p>
                  <p style="margin: 10px 0;"><strong style="color: #1F3A5F; display: inline-block; width: 120px;">Email:</strong> <a href="mailto:${sanitizedData.email}" style="color: #5F8FB4; text-decoration: none;">${sanitizedData.email}</a></p>
                  ${sanitizedData.company ? `<p style="margin: 10px 0;"><strong style="color: #1F3A5F; display: inline-block; width: 120px;">Company:</strong> ${sanitizedData.company}</p>` : ""}
                  <p style="margin: 10px 0;"><strong style="color: #1F3A5F; display: inline-block; width: 120px;">Source:</strong> ${sanitizedData.source}</p>
                  <p style="margin: 10px 0;"><strong style="color: #1F3A5F; display: inline-block; width: 120px;">Submitted:</strong> ${new Date(sanitizedData.timestamp).toLocaleString()}</p>
                </div>

                <h2 style="color: #1F3A5F; margin-top: 30px; font-size: 20px; border-bottom: 2px solid #5F8FB4; padding-bottom: 10px;">Message</h2>
                <div style="background: #f8fafc; padding: 20px; border-radius: 6px; margin-top: 15px; border-left: 4px solid #5F8FB4;">
                  <p style="margin: 0; white-space: pre-wrap; word-wrap: break-word;">${sanitizedData.message}</p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                  <p style="margin: 0; font-size: 14px; color: #6b7280;">
                    <strong>Note:</strong> The user has consented to being contacted about their inquiry.
                  </p>
                </div>
              </div>

              <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; font-size: 12px; color: #6b7280;">
                  This email was sent from the Mahe Tech Systems contact form
                </p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Contact Details:
- Name: ${sanitizedData.name}
- Email: ${sanitizedData.email}
${sanitizedData.company ? `- Company: ${sanitizedData.company}` : ""}
- Source: ${sanitizedData.source}
- Submitted: ${new Date(sanitizedData.timestamp).toLocaleString()}

Message:
${sanitizedData.message}

Note: The user has consented to being contacted about their inquiry.
      `,
    });

    if (emailResult.error) {
      console.error("Failed to send email:", emailResult.error);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send email. Please try again or contact us directly.",
        },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
        id: emailResult.data?.id,
      },
      { 
        status: 200,
        headers: {
          'Cache-Control': getApiCacheHeader('contact'),
        },
      }
    );
  } catch (error) {
    console.error("Contact form submission error:", error);

    // Don't expose internal errors to the client
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}
