/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    remotePatterns: [
      {
        protocol: 'http', // or 'https' if your localhost supports it
        hostname: 'localhost',
        port: '3000', // Leave empty if using default ports (80 for HTTP, 443 for HTTPS)
      },
      {
        protocol: 'http', // or 'https' if your localhost supports it
        hostname: 'localhost',
        port: '3001', // Leave empty if using default ports (80 for HTTP, 443 for HTTPS)
      },
      {
        protocol: 'http', // or 'https' if your localhost supports it
        hostname: 'localhost',
        port: '3002', // Leave empty if using default ports (80 for HTTP, 443 for HTTPS)
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
=======
    domains: ['localhost', 'i.pravatar.cc'],
>>>>>>> 4b9036a50a2baee3dd8b036beda4580b983bed59
  },
  reactStrictMode: false,
};

export default nextConfig;
