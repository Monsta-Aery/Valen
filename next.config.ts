import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Required for Next.js to generate static HTML, CSS, and JS files (instead of a server) */
  output: 'export',

  /* * Recommended for static exports: 
   * Disables the built-in image optimization API which requires a Node.js server.
   */
  images: {
    unoptimized: true,
  },

  /* * If your repository name is NOT 'username.github.io' (e.g., it's 'my-repo'), 
   * you MUST uncomment the line below and add your repository name:
   */
  // basePath: '/your-repo-name', 
};

export default nextConfig;
