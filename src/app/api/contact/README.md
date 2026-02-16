# Contact Form API

This API endpoint handles contact form submissions with comprehensive validation, sanitization, and security features.

## Endpoint

`POST /api/contact`

## Features

- ✅ Server-side validation using Zod
- ✅ Input sanitization to prevent XSS attacks
- ✅ CSRF protection via origin validation
- ✅ Rate limiting (5 requests per hour per IP)
- ✅ Email delivery via Resend
- ✅ Comprehensive error handling

## Request Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Optional Company Name",
  "message": "Your message here (min 10 chars, max 1000 chars)",
  "consent": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "source": "/contact"
}
```

### Field Validation

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| name | string | Yes | 2-100 characters, trimmed |
| email | string | Yes | Valid email format, trimmed, lowercase |
| company | string | No | Max 100 characters, trimmed |
| message | string | Yes | 10-1000 characters, trimmed |
| consent | boolean | Yes | Must be `true` |
| timestamp | string | No | ISO date string |
| source | string | No | Page path where form was submitted |

## Response

### Success Response (200)

```json
{
  "success": true,
  "message": "Message sent successfully",
  "id": "email-id-from-resend"
}
```

### Validation Error (400)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Please enter a valid email address"],
    "message": ["Message must be at least 10 characters"]
  }
}
```

### CSRF Error (403)

```json
{
  "success": false,
  "message": "Invalid request origin"
}
```

### Rate Limit Error (429)

```json
{
  "success": false,
  "message": "Too many requests. Please try again later.",
  "limit": 5,
  "remaining": 0,
  "reset": 1234567890
}
```

### Server Error (500)

```json
{
  "success": false,
  "message": "An unexpected error occurred. Please try again later."
}
```

## Environment Variables

### Required

```env
EMAIL_API_KEY=your-resend-api-key
EMAIL_FROM=noreply@yourdomain.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Optional (for rate limiting)

```env
UPSTASH_REDIS_REST_URL=your-upstash-redis-url
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token
```

If Redis is not configured, rate limiting will be disabled.

## Security Features

### 1. CSRF Protection

The API validates the `origin` header to ensure requests come from allowed origins:
- Production site URL (from `NEXT_PUBLIC_SITE_URL`)
- Same host as the request
- `localhost:3000` for development

### 2. Input Sanitization

All user input is sanitized to prevent XSS attacks:
- Removes `<` and `>` characters
- Removes `javascript:` protocol
- Removes event handlers like `onclick=`
- Trims whitespace

### 3. Rate Limiting

When Redis is configured, the API limits requests to:
- 5 requests per hour per IP address
- Uses sliding window algorithm
- Returns rate limit info in 429 responses

### 4. Validation

All input is validated using Zod schemas:
- Type checking
- Length constraints
- Format validation (email)
- Required field enforcement

## Email Template

The API sends a formatted HTML email with:
- Contact details (name, email, company)
- Message content
- Submission metadata (timestamp, source page)
- Branded styling matching the website design

## Testing

Run the test suite:

```bash
npm test -- src/app/api/contact/route.test.ts
```

The test suite covers:
- Valid form submissions
- Validation errors for all fields
- CSRF protection
- Input sanitization
- Rate limiting (when configured)
- Error handling
- Edge cases (boundary values)

## Usage Example

```typescript
const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    company: "Acme Inc",
    message: "I'm interested in your services.",
    consent: true,
    timestamp: new Date().toISOString(),
    source: window.location.pathname,
  }),
});

const data = await response.json();

if (data.success) {
  console.log("Message sent successfully!");
} else {
  console.error("Error:", data.message);
}
```

## Troubleshooting

### Email not sending

1. Verify `EMAIL_API_KEY` is set correctly
2. Verify `EMAIL_FROM` is a verified domain in Resend
3. Check Resend dashboard for delivery status
4. Check server logs for error messages

### Rate limiting not working

1. Verify `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set
2. Check Upstash dashboard for connection issues
3. Rate limiting is optional - the API works without it

### CSRF errors in development

Make sure requests are coming from `http://localhost:3000` or add your development URL to the allowed origins in the code.

## Requirements Validation

This implementation satisfies the following requirements:

- **11.4**: Form submission sends inquiry to configured email ✅
- **17.2**: Server-side validation and input sanitization ✅
- **17.3**: CSRF protection implemented ✅

Additional features implemented:
- Rate limiting to prevent abuse
- Comprehensive error handling
- Detailed logging for debugging
- HTML email templates
- Full test coverage
