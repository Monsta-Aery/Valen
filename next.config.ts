import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Mandatory for GitHub Pages (Static Site Generation)
  output: 'export',

  // 2. Mandatory because GitHub Pages doesn't have a server to resize images
  images: {
    unoptimized: true,
  },

  // 3. FIX FOR 404: Tell Next.js the repository name
  basePath: '/Valen',

  // 4. Ensure internal links and assets use the correct sub-folder path
  assetPrefix: '/Valen',
};

export default nextConfig;
