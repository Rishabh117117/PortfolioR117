/* Umami's host. The tracker is proxied through this app (see rewrites below) so
   the beacon is served first-party from rishabhsalian.com/stats/* instead of
   from the analytics subdomain. Third-party analytics hostnames sit on the
   standard blocker lists — static.cloudflareinsights.com already does, which is
   part of why the Cloudflare numbers undercount real visitors — and a
   first-party path isn't something a generic list can target.

   Keep the /stats prefix in sync with UMAMI_BASE_PATH in lib/analytics.ts. */
const UMAMI_HOST =
  process.env.UMAMI_HOST?.trim().replace(/\/+$/, "") ||
  "https://analytics.rishabhsalian.com";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/stats/script.js", destination: `${UMAMI_HOST}/script.js` },
      { source: "/stats/api/send", destination: `${UMAMI_HOST}/api/send` },
    ];
  },
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
