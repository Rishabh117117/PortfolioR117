/* Public site origin — single source for metadataBase, robots, sitemap, and
   JSON-LD. SITE_URL env (if set on the deploy) wins; the custom domain is the
   fallback (live + wired to Railway since 2026-07-03), so canonicals/OG point
   at the real domain even from the railway.app subdomain. */
export const SITE_URL =
  process.env.SITE_URL?.trim().replace(/\/+$/, "") || "https://rishabhsalian.com";

/* The one LinkedIn/GitHub truth — footer, About, and JSON-LD all
   read from here.

   Two addresses since 2026-07-31, per Rishabh: the New School one leads on
   the About contact block (it's the address applications should use while
   he's a student), with the personal one alongside it. `email` stays the
   personal address because it's the one that outlives graduation — the
   footer and the JSON-LD keep pointing at it, and only About lists both. */
export const SOCIALS = {
  emailSchool: "salir225@newschool.edu",
  email: "rishabhsalian@ymail.com",
  github: "https://github.com/Rishabh117117",
  linkedin: "https://www.linkedin.com/in/rishabh-salian117",
} as const;
