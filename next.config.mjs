/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/fundraiser",
        destination: "https://api.example.com/fundraiser",
      },
    ];
  },
};
export default nextConfig;
