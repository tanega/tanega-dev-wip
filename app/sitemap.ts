import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function localePath(locale: string, path: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${BASE}${prefix}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    entries.push(
      { url: localePath(locale, "/"), lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    );
  }

  return entries;
}
