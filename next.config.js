/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
        {
            source: "/:any*",
            destination: "/client"
        }
    ]
  },
};

module.exports = nextConfig;
