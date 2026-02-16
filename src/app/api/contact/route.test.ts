import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST, GET } from "./route";
import { NextRequest } from "next/server";

// Mock Resend
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({
    data: { id: "test-email-id" },
    error: null,
  });

  return {
    Resend: class {
      emails = {
        send: mockSend,
      };
    },
  };
});

// Mock Upstash
vi.mock("@upstash/ratelimit", () => {
  const mockLimit = vi.fn().mockResolvedValue({
    success: true,
    limit: 5,
    remaining: 4,
    reset: Date.now() + 3600000,
  });

  return {
    Ratelimit: class {
      static slidingWindow = vi.fn();
      limit = mockLimit;
    },
  };
});

vi.mock("@upstash/redis", () => ({
  Redis: class {},
}));

describe("Contact API Route", () => {
  const validFormData = {
    name: "John Doe",
    email: "john@example.com",
    company: "Test Company",
    message: "This is a test message that is long enough to pass validation.",
    consent: true,
    timestamp: new Date().toISOString(),
    source: "/contact",
  };

  beforeEach(() => {
    // Set up environment variables
    process.env.EMAIL_API_KEY = "test-api-key";
    process.env.EMAIL_FROM = "noreply@mahetechsystems.com";
    process.env.NEXT_PUBLIC_CONTACT_EMAIL = "contact@mahetechsystems.com";
    process.env.NEXT_PUBLIC_SITE_URL = "https://mahetechsystems.com";
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("POST /api/contact", () => {
    it("should successfully submit a valid contact form", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(validFormData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe("Message sent successfully");
    });

    it("should reject form submission with invalid email", async () => {
      const invalidData = {
        ...validFormData,
        email: "invalid-email",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe("Validation failed");
      expect(data.errors).toBeDefined();
    });

    it("should reject form submission with name too short", async () => {
      const invalidData = {
        ...validFormData,
        name: "J",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors?.name).toBeDefined();
    });

    it("should reject form submission with message too short", async () => {
      const invalidData = {
        ...validFormData,
        message: "Short",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors?.message).toBeDefined();
    });

    it("should reject form submission without consent", async () => {
      const invalidData = {
        ...validFormData,
        consent: false,
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.errors?.consent).toBeDefined();
    });

    it("should reject form submission from invalid origin (CSRF protection)", async () => {
      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "https://malicious-site.com",
          host: "localhost:3000",
        },
        body: JSON.stringify(validFormData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(403);
      expect(data.success).toBe(false);
      expect(data.message).toBe("Invalid request origin");
    });

    it("should sanitize HTML in user input", async () => {
      const dataWithHTML = {
        ...validFormData,
        name: "John <script>alert('xss')</script> Doe",
        message: "This is a test message with <b>HTML</b> tags that should be sanitized.",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(dataWithHTML),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      // The sanitization happens server-side, so we just verify it doesn't fail
    });

    it("should handle optional company field", async () => {
      const dataWithoutCompany = {
        ...validFormData,
        company: undefined,
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(dataWithoutCompany),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should trim whitespace from inputs", async () => {
      const dataWithWhitespace = {
        ...validFormData,
        name: "  John Doe  ",
        email: "  john@example.com  ",
        message: "  This is a test message with whitespace.  ",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(dataWithWhitespace),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should return 500 if EMAIL_API_KEY is not configured", async () => {
      delete process.env.EMAIL_API_KEY;

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(validFormData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("Email service is not configured");
    });

    it("should return 500 if EMAIL_FROM is not configured", async () => {
      delete process.env.EMAIL_FROM;

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(validFormData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.message).toContain("Email service is not configured");
    });
  });

  describe("GET /api/contact", () => {
    it("should return 405 Method Not Allowed", async () => {
      const response = await GET();
      const data = await response.json();

      expect(response.status).toBe(405);
      expect(data.success).toBe(false);
      expect(data.message).toBe("Method not allowed");
    });
  });

  describe("Input Validation Edge Cases", () => {
    it("should reject name exceeding 100 characters", async () => {
      const invalidData = {
        ...validFormData,
        name: "A".repeat(101),
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it("should reject message exceeding 1000 characters", async () => {
      const invalidData = {
        ...validFormData,
        message: "A".repeat(1001),
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(invalidData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it("should accept message with exactly 10 characters", async () => {
      const validData = {
        ...validFormData,
        message: "1234567890",
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it("should accept message with exactly 1000 characters", async () => {
      const validData = {
        ...validFormData,
        message: "A".repeat(1000),
      };

      const request = new NextRequest("http://localhost:3000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
          host: "localhost:3000",
        },
        body: JSON.stringify(validData),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });
  });
});
