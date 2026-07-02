/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The standalone /work index duplicated the landing page. "Work" is now an
      // anchor to the projects section (/#work); keep old shared/indexed /work
      // links resolving with a permanent (301) redirect.
      {
        source: "/work",
        destination: "/#work",
        statusCode: 301,
      },
    ];
  },
};

module.exports = nextConfig;
