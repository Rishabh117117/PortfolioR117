import type { MetadataRoute } from "next";
import { FLAGSHIPS } from "@/lib/projects";
import { ARCHIVE_PROJECTS } from "@/lib/archive";
import { SITE_URL } from "@/lib/site";

/* Generated from the same project data that drives routing, so a new
   flagship or archive entry lands in the sitemap automatically. */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/archive`, changeFrequency: "monthly", priority: 0.6 },
  ];
  for (const p of FLAGSHIPS) {
    entries.push({
      url: `${SITE_URL}/work/${p.slug}`,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    entries.push({
      url: `${SITE_URL}/work/${p.slug}/prototype`,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }
  for (const p of ARCHIVE_PROJECTS) {
    entries.push({
      url: `${SITE_URL}/archive/${p.slug}`,
      changeFrequency: "yearly",
      priority: 0.4,
    });
  }
  return entries;
}
