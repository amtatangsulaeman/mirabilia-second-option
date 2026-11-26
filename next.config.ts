import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Keep old URLs from the previous site working (and passing SEO value).
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/promotion---25---off", destination: "/promotion", permanent: true },
      { source: "/coming-soon", destination: "/champion-lakes", permanent: true },
      // Revision Nov 2026: new sitemap
      { source: "/about-us", destination: "/our-story", permanent: true },
      { source: "/our-family", destination: "/our-story", permanent: true },
      { source: "/ccs-information", destination: "/childcare-subsidy#claim", permanent: true },
    ];
  },
};

export default nextConfig;
