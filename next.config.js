/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Pages call ${BASE}/api/... where BASE=/api-proxy → /api-proxy/api/...
        // Services call api.get("/stories") where baseURL=/api-proxy/api → /api-proxy/api/stories
        // Both converge here and proxy to the Render backend without CORS.
        source: "/api-proxy/api/:path*",
        destination: "https://wellconnectbackend.onrender.com/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
