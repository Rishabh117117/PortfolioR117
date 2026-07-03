import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // the LLM proxy and the chrome-less vendored deck HTML shouldn't index
        disallow: ["/api/", "/greener-hours/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
