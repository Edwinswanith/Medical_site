import Image from "next/image";
import { BRAND, TEMPLATES } from "@/content/site";
import { Breadcrumbs } from "./Breadcrumbs";

const [front, back] = [TEMPLATES[1], TEMPLATES[0]];

/**
 * About hero: the statement on the left; on the right, two of the specialty
 * templates overlapping in browser frames, a quiet echo of the home hero.
 */
export function AboutHero() {
  return (
    <section className="pg-about__hero-wrap">
      <div className="pg-about__hero editorial-hero">
        <Breadcrumbs items={[{ label: "Home", path: "/" }, { label: "About", path: "/about" }]} />
        <h1 className="display-xl">
          A healthcare media studio for <em>your practice.</em>
        </h1>
        <p className="phero__intro lede">
          {BRAND.name} makes websites, patient education films, AI presenters and social content for consultants and private practices. We work with clients across the United Kingdom.
        </p>
      </div>
      <div className="pg-about__stack" aria-hidden>
        {[back, front].map((t, i) => (
          <figure key={t.slug} className={`pg-about__site pg-about__site--${i ? "front" : "back"} notch`}>
            <div className="chrome">
              <span />
              <span />
              <span />
              <i>yourname.co.uk</i>
            </div>
            <Image src={t.img.webp} alt="" width={1200} height={750} sizes="(max-width: 899px) 80vw, 36vw" />
          </figure>
        ))}
      </div>
    </section>
  );
}
