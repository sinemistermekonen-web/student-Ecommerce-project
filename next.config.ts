import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Enables AI agent feedback in development mode.
    // Added automatically by Next.js for IDE integration.
    agentFeedback: true,
  },

  // Cache components between requests to speed up repeated navigation.
  // Reduces server work when the same components are rendered for different users.
  cacheComponents: true,

  // Enable partial prefetching so only the visible part of a page is
  // fetched on hover, reducing bandwidth and improving perceived speed.
  partialPrefetching: true,

  // No remote image hosts are configured because all product images are
  // stored locally in public/images/. If images were loaded from an
  // external CDN, the allowed hosts would be listed here under
  // images.remotePatterns.
};

export default nextConfig;
