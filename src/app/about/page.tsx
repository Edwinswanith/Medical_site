import { PageJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { SEO } from "@/content/site";
import { AboutHero } from "@/components/AboutHero";
import { AboutTogether } from "@/components/AboutTogether";
import { AboutProcess } from "@/components/AboutProcess";
import { AboutPrinciples } from "@/components/AboutPrinciples";
import { AboutShethPreview } from "@/components/AboutShethPreview";
import { AboutCta } from "@/components/AboutCta";

const { title, description } = SEO.about;
export const metadata = pageMetadata({ path: "/about", title, description });

export default function AboutPage() {
  return (
    <>
      <PageJsonLd path="/about" type="AboutPage" name={title} description={description} />
      <AboutHero />
      {/* A founder/team section goes here once real names, photos and bios are supplied. */}
      <AboutTogether />
      <AboutProcess />
      <AboutPrinciples />
      <AboutShethPreview />
      <AboutCta />
    </>
  );
}
