/* Public site origin — single source for metadataBase, robots, sitemap, and
   JSON-LD. SITE_URL is set on the deploy env (also used by /api/ask as the
   OpenRouter attribution referer); the Railway subdomain is the fallback so
   absolute URLs stay correct before a custom domain lands. */
export const SITE_URL =
  process.env.SITE_URL?.trim().replace(/\/+$/, "") ||
  "https://portfolior117-production.up.railway.app";
