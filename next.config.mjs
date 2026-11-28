/** @type {import('next').NextConfig} */
// STATIC_EXPORT=1 builds a plain static site in ./out for GitHub Pages
// (hasnainauto.com). Without it, the config is unchanged (dev / Vercel).
const isStaticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  ...(isStaticExport
    ? { output: 'export', trailingSlash: true }
    : {}),
  images: {
    // GitHub Pages has no image optimizer, so serve images as-is there.
    unoptimized: isStaticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Redirects need a server; on GitHub Pages /products has static fallback pages instead.
  ...(isStaticExport
    ? {}
    : {
        async redirects() {
          return [
            { source: '/products', destination: '/shop', permanent: true },
            { source: '/products/:path*', destination: '/shop', permanent: true },
          ];
        },
      }),
};

export default nextConfig;
