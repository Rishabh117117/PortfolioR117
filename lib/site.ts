/* Public site origin — single source for metadataBase, robots, sitemap, and
   JSON-LD. SITE_URL env (if set on the deploy) wins; the custom domain is the
   fallback (live + wired to Railway since 2026-07-03), so canonicals/OG point
   at the real domain even from the railway.app subdomain. */
export const SITE_URL =
  process.env.SITE_URL?.trim().replace(/\/+$/, "") || "https://rishabhsalian.com";

/* The one LinkedIn/GitHub/Behance truth — footer, About, and JSON-LD all
   read from here. */
export const SOCIALS = {
  email: "rishabhsalian@ymail.com",
  github: "https://github.com/Rishabh117117",
  behance: "https://behance.net/rishabhsalian",
  linkedin: "https://www.linkedin.com/in/rishabh-salian-000000",
} as const;
