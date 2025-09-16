import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "loviers-beauty-hub.vercel.app"],
    formats: ["image/avif", "image/webp"]
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "@heroicons/react"],
    optimizeCss: true
  }
};

export default nextConfig;
