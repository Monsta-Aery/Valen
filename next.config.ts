import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for static export to GitHub Pages
  output: 'export',

  // Required for static hosting
  images: {
    unoptimized: true,
  },

  // Tells Next.js the site is in a subfolder (Repo Name)
  basePath: '/Valen',

  // Tells the HTML where to find CSS/JS files
  assetPrefix: '/Valen',

  // Ensures paths like /Valen/ are resolved correctly
  trailingSlash: true,
};

export default nextConfig;
