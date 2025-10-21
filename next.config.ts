import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "168.119.50.22",
        port: "",
        pathname: "/**", // allow all images from your backend
      },
    ],
  },
};

export default nextConfig;