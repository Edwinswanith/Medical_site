import { BRAND } from "@/content/site";
import { absolute } from "@/lib/site-url";

/** Stable entity ids, so every page points at the same organisation and site. */
export const ORG_ID = absolute("/#organization");
export const SITE_ID = absolute("/#website");

/** Renders schema.org JSON-LD. `<` is escaped so content can never close the script tag. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/**
 * The organisation and the site: only facts shown on the page. UK coverage is confirmed;
 * no address or sameAs is supplied, and no public office is stated.
 */
export function SiteJsonLd({ description }: { description: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": ORG_ID,
            name: BRAND.name,
            legalName: BRAND.legalName,
            url: absolute("/"),
            logo: { "@type": "ImageObject", url: absolute("/brand/mark.png"), width: 256, height: 256 },
            description,
            email: BRAND.email,
            telephone: BRAND.phone.tel,
            areaServed: { "@type": "Country", name: "United Kingdom" },
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: BRAND.email, telephone: BRAND.phone.tel, availableLanguage: "en" },
          },
          { "@type": "WebSite", "@id": SITE_ID, url: absolute("/"), name: BRAND.name, inLanguage: "en-GB", publisher: { "@id": ORG_ID } },
        ],
      }}
    />
  );
}

/** One page of the site, tied to the site and the organisation. */
export function PageJsonLd({ path, name, description, type = "WebPage", mainEntity, breadcrumbs = false, image }: {
  path: string; name: string; description: string; type?: string; mainEntity?: string; breadcrumbs?: boolean;
  image?: { webp: string; w: number; h: number; alt: string };
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": type,
        "@id": `${absolute(path)}#webpage`,
        url: absolute(path),
        name,
        description,
        inLanguage: "en-GB",
        isPartOf: { "@id": SITE_ID },
        about: { "@id": ORG_ID },
        ...(breadcrumbs ? { breadcrumb: { "@id": `${absolute(path)}#breadcrumbs` } } : {}),
        ...(image ? { primaryImageOfPage: { "@type": "ImageObject", url: absolute(image.webp), width: image.w, height: image.h, caption: image.alt } } : {}),
        ...(mainEntity ? { mainEntity: { "@id": mainEntity } } : {}),
      }}
    />
  );
}

/** A directory whose listed destinations and labels are visible on the same page. */
export function ItemListJsonLd({ path, fragment, name, items }: {
  path: string; fragment: string; name: string; items: { name: string; path: string }[];
}) {
  return <JsonLd data={{
    "@context": "https://schema.org", "@type": "ItemList", "@id": `${absolute(path)}#${fragment}`,
    name, numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name, url: absolute(item.path),
    })),
  }} />;
}
