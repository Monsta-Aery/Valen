import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Required for static HTML/CSS/JS generation */
  output: 'export',

  /* Disables dynamic image optimization (required for GitHub Pages) */
  images: {
    unoptimized: true,
  },

  /* * If your GitHub URL is https://<username>.github.io/my-portfolio-frontend/
   * you MUST uncomment the line below and use your repo name.
   */
  // basePath: '/my-portfolio-frontend',
};

export default nextConfig;
