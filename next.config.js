/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: "https://wellconnectbackend.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
