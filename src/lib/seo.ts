import type { Metadata } from "next";
import { BRAND } from "@/content/site";
import { alt as ogAlt, size as ogSize } from "@/app/opengraph-image";

/**
 * Per-page metadata: canonical, Open Graph and Twitter in one place. Next merges metadata
 * shallowly, so each page needs the whole openGraph object, not just the fields it changes.
 */
export function pageMetadata({ path, title, description, absoluteTitle = false }: { path: string; title: string; description: string; absoluteTitle?: boolean }): Metadata {
  const full = `${title} | ${BRAND.name}`;
  return {
    title: absoluteTitle ? { absolute: full } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: BRAND.name, locale: "en_GB", url: path, title: full, description, images: [{ url: "/opengraph-image", ...ogSize, alt: ogAlt }] },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
