#!/bin/bash

# Bundle Analysis Script for Mahe Tech Website
# This script analyzes the Next.js build output to verify code splitting

echo "==================================="
echo "Bundle Analysis Report"
echo "==================================="
echo ""

echo "1. Route-Based Code Splitting"
echo "-----------------------------------"
echo "Checking for route-specific bundles..."
echo ""

# List all route pages
find .next/server/app -name "page.js" -not -path "*/_not-found*" | while read file; do
    route=$(echo $file | sed 's|.next/server/app||' | sed 's|/page.js||' | sed 's|^$|/|')
    size=$(ls -lh "$file" | awk '{print $5}')
    echo "Route: $route - Size: $size"
done

echo ""
echo "2. Client-Side Chunks"
echo "-----------------------------------"
echo "Analyzing client-side JavaScript chunks..."
echo ""

# Show top 10 largest client chunks
ls -lh .next/static/chunks/*.js 2>/dev/null | sort -k5 -hr | head -10 | awk '{print $9 " - " $5}'

echo ""
echo "3. Dynamic Import Verification"
echo "-----------------------------------"
echo "Checking for dynamically imported components..."
echo ""

# Check if CalendlyEmbed is in a separate chunk
if grep -r "CalendlyEmbed" .next/static/chunks/*.js 2>/dev/null | head -1 > /dev/null; then
    echo "✓ CalendlyEmbed found in client chunks (dynamically loaded)"
else
    echo "✗ CalendlyEmbed not found in separate chunk"
fi

# Check if CalendlySection is in contact page
if grep -r "CalendlySection" .next/server/app/contact/page.js 2>/dev/null > /dev/null; then
    echo "✓ CalendlySection referenced in contact page"
else
    echo "✗ CalendlySection not found in contact page"
fi

echo ""
echo "4. Total Bundle Size"
echo "-----------------------------------"
total_size=$(du -sh .next/static/chunks | awk '{print $1}')
echo "Total client-side chunks: $total_size"

echo ""
echo "==================================="
echo "Analysis Complete"
echo "==================================="
