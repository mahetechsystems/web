import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "./ContactForm";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock window.gtag for analytics
const mockGtag = vi.fn();
(global as any).window = { gtag: mockGtag };

describe("ContactForm", () => {
  beforeEach(() => {
    mockFetch.mockClear();
    mockGtag.mockClear();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/privacy policy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("displays validation error for invalid email", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid-email");
    await user.tab(); // Trigger onBlur validation

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it("displays validation error for short name", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText(/name/i);
    await user.type(nameInput, "A");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/name must be at least 2 characters/i)).toBeInTheDocument();
    });
  });

  it("displays validation error for short message", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    await user.type(messageInput, "Short");
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText(/message must be at least 10 characters/i)).toBeInTheDocument();
    });
  });

  it("displays validation error when consent is not checked", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    // Fill in valid data
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");

    // Submit without checking consent
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/you must accept the privacy policy to continue/i)
      ).toBeInTheDocument();
    });
  });

  it("submits form successfully with valid data", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill in all required fields
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/company/i), "Acme Corp");
    await user.type(screen.getByLabelText(/message/i), "This is a test message for the contact form");
    await user.click(screen.getByLabelText(/privacy policy/i));

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    // Verify fetch was called with correct data
    expect(mockFetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("John Doe"),
      })
    );

    // Verify analytics tracking
    expect(mockGtag).toHaveBeenCalledWith("event", "form_submission", {
      event_category: "Contact",
      event_label: "Contact Form",
    });
  });

  it("preserves form input on submission error", async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    render(<ContactForm />);

    const nameValue = "John Doe";
    const emailValue = "john@example.com";
    const messageValue = "This is a test message for the contact form";

    // Fill in form
    await user.type(screen.getByLabelText(/name/i), nameValue);
    await user.type(screen.getByLabelText(/email/i), emailValue);
    await user.type(screen.getByLabelText(/message/i), messageValue);
    await user.click(screen.getByLabelText(/privacy policy/i));

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(/failed to send message/i)).toBeInTheDocument();
    });

    // Verify form inputs are preserved
    expect(screen.getByLabelText(/name/i)).toHaveValue(nameValue);
    expect(screen.getByLabelText(/email/i)).toHaveValue(emailValue);
    expect(screen.getByLabelText(/message/i)).toHaveValue(messageValue);
  });

  it("displays error message when API returns error", async () => {
    const user = userEvent.setup();
    const errorMessage = "Server error occurred";
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: errorMessage }),
    });

    render(<ContactForm />);

    // Fill in form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");
    await user.click(screen.getByLabelText(/privacy policy/i));

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for error message
    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("disables form fields while submitting", async () => {
    const user = userEvent.setup();
    // Mock a slow response
    mockFetch.mockImplementationOnce(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => ({ success: true }),
              }),
            100
          )
        )
    );

    render(<ContactForm />);

    // Fill in form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");
    await user.click(screen.getByLabelText(/privacy policy/i));

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Check that button shows loading state
    expect(screen.getByRole("button", { name: /sending/i })).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });
  });

  it("clears form after successful submission", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });

    render(<ContactForm />);

    // Fill in form
    await user.type(screen.getByLabelText(/name/i), "John Doe");
    await user.type(screen.getByLabelText(/email/i), "john@example.com");
    await user.type(screen.getByLabelText(/message/i), "This is a test message");
    await user.click(screen.getByLabelText(/privacy policy/i));

    // Submit form
    await user.click(screen.getByRole("button", { name: /send message/i }));

    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    });

    // Verify form is cleared
    expect(screen.getByLabelText(/name/i)).toHaveValue("");
    expect(screen.getByLabelText(/email/i)).toHaveValue("");
    expect(screen.getByLabelText(/message/i)).toHaveValue("");
    expect(screen.getByLabelText(/privacy policy/i)).not.toBeChecked();
  });

  it("validates company field length", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const companyInput = screen.getByLabelText(/company/i);
    const longCompanyName = "A".repeat(101); // 101 characters
    await user.type(companyInput, longCompanyName);
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/company name must not exceed 100 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("validates message maximum length", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const messageInput = screen.getByLabelText(/message/i);
    const longMessage = "A".repeat(1001); // 1001 characters
    await user.type(messageInput, longMessage);
    await user.tab();

    await waitFor(() => {
      expect(
        screen.getByText(/message must not exceed 1000 characters/i)
      ).toBeInTheDocument();
    });
  });

  it("has accessible form labels", () => {
    render(<ContactForm />);

    // Check that all inputs have associated labels
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const companyInput = screen.getByLabelText(/company/i);
    const messageInput = screen.getByLabelText(/message/i);
    const consentInput = screen.getByLabelText(/privacy policy/i);

    expect(nameInput).toHaveAttribute("id");
    expect(emailInput).toHaveAttribute("id");
    expect(companyInput).toHaveAttribute("id");
    expect(messageInput).toHaveAttribute("id");
    expect(consentInput).toHaveAttribute("id");
  });

  it("displays error messages with proper ARIA attributes", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const emailInput = screen.getByLabelText(/email/i);
    await user.type(emailInput, "invalid");
    await user.tab();

    await waitFor(() => {
      const errorMessage = screen.getByText(/please enter a valid email address/i);
      expect(errorMessage).toHaveAttribute("role", "alert");
    });
  });
});
