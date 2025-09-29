import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // ✅ allow OAuth popups
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // ✅ prevent embedder isolation errors
          },
        ],
      },
    ];
  },
};

export default nextConfig;
