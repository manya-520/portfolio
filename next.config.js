/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/work/actual",
        destination: "/work/actual/onboarding-2",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
