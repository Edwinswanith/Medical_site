import { CASE } from "@/content/site";
import Image from "next/image";
import { TLink } from "./TLink";

/**
 * About page: preview link to the Sheth case study.
 * Shows a visual teaser of the live project with key facts and a CTA.
 */
export function AboutShethPreview() {
  return (
    <section className="pg-sheth wrap">
      <div className="pg-sheth__content">
        <p className="label">Real work, in use</p>
        <h2 className="display-m">
          See a real <em>website project.</em>
        </h2>
        <p className="pg-sheth__intro">
          Our approved Prof. Hemant Sheth project includes 22 pages, 10 procedure guides and four treatment groups for a consultant surgeon serving London and Hertfordshire.
        </p>
        <div className="pg-sheth__facts">
          {CASE.facts.map((fact) => (
            <div key={fact.label}>
              <div className="pg-sheth__value">{fact.value}</div>
              <div className="pg-sheth__label">{fact.label}</div>
            </div>
          ))}
        </div>
        <TLink className="arrow-link" href="/work/prof-hemant-sheth">
          Read about the project <span aria-hidden>→</span>
        </TLink>
      </div>
      <div className="pg-sheth__preview notch">
        <Image
          src={CASE.shot.webp}
          alt={CASE.shot.alt}
          width={CASE.shot.w}
          height={CASE.shot.h}
          sizes="(max-width: 899px) 90vw, 50vw"
        />
      </div>
    </section>
  );
}
