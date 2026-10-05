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
 * The organisation and the site: only facts shown on the page. No address, area served or
 * sameAs until they are confirmed; no LocalBusiness type, because no public office is stated.
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
            url: absolute("/"),
            logo: { "@type": "ImageObject", url: absolute("/logo.png"), width: 512, height: 512 },
            description,
            email: BRAND.email,
            telephone: BRAND.phone.tel,
            contactPoint: { "@type": "ContactPoint", contactType: "sales", email: BRAND.email, telephone: BRAND.phone.tel, availableLanguage: "en" },
          },
          { "@type": "WebSite", "@id": SITE_ID, url: absolute("/"), name: BRAND.name, inLanguage: "en-GB", publisher: { "@id": ORG_ID } },
        ],
      }}
    />
  );
}

/** One page of the site, tied to the site and the organisation. */
export function PageJsonLd({ path, name, description, type = "WebPage" }: { path: string; name: string; description: string; type?: string }) {
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
      }}
    />
  );
}
