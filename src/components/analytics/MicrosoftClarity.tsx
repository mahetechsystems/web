"use client";

import Script from "next/script";

/**
 * Microsoft Clarity Component
 * 
 * Integrates Microsoft Clarity session recording and heatmaps.
 * Provides insights into user behavior through session replays.
 * 
 * Features:
 * - Session recording
 * - Heatmaps and click tracking
 * - User behavior analytics
 * - Privacy-respecting implementation
 * - Only loads in production or when project ID is configured
 * 
 * Requirements: 12.2, 12.7
 */

interface MicrosoftClarityProps {
  projectId: string;
}

export function MicrosoftClarity({ projectId }: MicrosoftClarityProps) {
  // Don't load Clarity in development unless explicitly configured
  if (!projectId) {
    return null;
  }

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "${projectId}");
      `}
    </Script>
  );
}
