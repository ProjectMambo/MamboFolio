/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',      // Crucial for GitHub Pages
  images: {
    unoptimized: true,   // Required for static export
  },
  // If your URL is username.github.io/MamboFolio, add:
  // basePath: '/MamboFolio', 
};

export default nextConfig;