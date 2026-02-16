# Calendly Integration Setup

This document explains how to configure the Calendly scheduling widget on the contact page.

## Overview

The contact page includes a Calendly embed widget that allows visitors to schedule consultations directly from the website. The integration includes:

- **Automatic script loading**: The Calendly widget script is loaded dynamically
- **Error handling**: If the script fails to load, a fallback UI is displayed
- **Fallback link**: Users can always access the scheduling page via a direct link
- **Loading state**: A loading indicator is shown while the widget loads

## Configuration

### 1. Get Your Calendly URL

1. Log in to your Calendly account at [calendly.com](https://calendly.com)
2. Navigate to your event type (e.g., "30 Minute Meeting")
3. Copy your scheduling URL (e.g., `https://calendly.com/your-username/30min`)

### 2. Set Environment Variable

Add your Calendly URL to your `.env.local` file:

```bash
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-username/30min
```

**Important**: The environment variable must start with `NEXT_PUBLIC_` to be accessible in the browser.

### 3. Restart Development Server

After updating the environment variable, restart your development server:

```bash
npm run dev
```

## Component Usage

The `CalendlyEmbed` component is used in the contact page:

```tsx
import { CalendlyEmbed } from "@/components/CalendlyEmbed";

<CalendlyEmbed 
  url={calendlyUrl} 
  className="mx-auto" 
/>
```

### Props

- `url` (required): Your Calendly scheduling URL
- `className` (optional): Additional CSS classes for styling

## Error Handling

The component handles three states:

1. **Loading**: Shows a spinner while the Calendly script loads
2. **Success**: Displays the embedded Calendly widget
3. **Error**: Shows a fallback UI with a direct link to your Calendly page

### Error Scenarios

The component will show the error fallback if:

- The Calendly script fails to load (network issues, blocked by ad blocker, etc.)
- The script URL is incorrect or unavailable
- There's a CORS or security policy issue

### Fallback Behavior

When an error occurs, users will see:

- An error icon and message explaining the issue
- A direct link to open your Calendly page in a new tab
- Clear call-to-action to continue scheduling

This ensures users can always book a consultation, even if the embed fails.

## Testing

The component includes comprehensive tests covering:

- Loading state rendering
- Successful widget embedding
- Error handling and fallback display
- Script cleanup on unmount
- Accessibility features

Run tests with:

```bash
npm test -- CalendlyEmbed.test.tsx
```

## Customization

### Widget Height

The default widget height is 700px. To change it, modify the `CalendlyEmbed` component:

```tsx
<div
  className="calendly-inline-widget"
  data-url={url}
  style={{ minWidth: "320px", height: "800px" }} // Change height here
/>
```

### Widget Styling

The widget container can be styled using Tailwind classes via the `className` prop:

```tsx
<CalendlyEmbed 
  url={calendlyUrl} 
  className="mx-auto rounded-xl shadow-lg" 
/>
```

## Troubleshooting

### Widget Not Loading

1. **Check environment variable**: Ensure `NEXT_PUBLIC_CALENDLY_URL` is set correctly
2. **Verify URL format**: The URL should be in the format `https://calendly.com/username/event-type`
3. **Check browser console**: Look for any error messages
4. **Test direct link**: Verify the Calendly URL works when opened directly

### Ad Blockers

Some ad blockers may prevent the Calendly script from loading. The fallback link ensures users can still access your scheduling page.

### CORS Issues

If you encounter CORS errors, ensure your Calendly account settings allow embedding on your domain.

## Requirements Validation

This implementation satisfies:

- **Requirement 11.1**: Calendly scheduling widget embedded on contact page
- **Requirement 16.3**: Error handling for external service failures with fallback content

## Additional Resources

- [Calendly Embed Documentation](https://help.calendly.com/hc/en-us/articles/223147027-Embed-options-overview)
- [Calendly Widget Customization](https://help.calendly.com/hc/en-us/articles/360020052833-Advanced-embed-options)
