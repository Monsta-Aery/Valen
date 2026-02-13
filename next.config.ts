import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // These two lines tell the browser to look in the /Valen/ folder for your CSS/JS
  basePath: '/Valen',
  assetPrefix: '/Valen',
};

export default nextConfig;
