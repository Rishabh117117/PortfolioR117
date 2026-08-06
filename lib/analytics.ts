/* Umami — self-hosted on Railway at analytics.rishabhsalian.com, Postgres-backed
   (umami-software/umami, MIT). Cookieless by design: no cookies, no
   localStorage, no IP retained, which is what keeps the site consent-banner-free
   for EU visitors. Session replay and heatmaps ship in the same image and are
   deliberately NOT enabled — those are the features that would trigger a
   consent obligation, and the question this is here to answer (did the studios I
   applied to open the portfolio?) is answered by UTM links instead.

   Why the id lives in the environment rather than in this file: the website has
   to exist inside Umami before it has an id, and Rishabh creates it there with
   his own admin password. Paste the id into NEXT_PUBLIC_UMAMI_WEBSITE_ID on the
   Railway service and tracking starts on the next boot. Until then nothing
   renders and the site behaves exactly as it did before. */
export const UMAMI_WEBSITE_ID =
  process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim() || "";

/* The first-party path the tracker is served from and posts back to. The
   rewrites in next.config.js map it onto the Umami host; the <script> tag in
   app/layout.tsx points at it. Both have to agree, so change it in both places
   or not at all. */
export const UMAMI_BASE_PATH = "/stats";

/* Only events whose hostname matches are recorded. This is the switch that
   keeps our own traffic out of the numbers: localhost during development and
   the portfolior117-production.up.railway.app origin both fail the check, so
   checking the live build on the Railway URL records nothing. Visiting
   rishabhsalian.com still counts — Umami has no way to know a visitor is you,
   and no analytics tool does. */
export const UMAMI_DOMAINS = "rishabhsalian.com";

export const analyticsEnabled = UMAMI_WEBSITE_ID.length > 0;
