import type { Metadata } from "next";
import { SERVICES } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { TLink } from "@/components/TLink";

export const metadata: Metadata = { title: "Specialities" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Specialities"
        title="Everything under one roof"
        em="one roof"
        intro="Six specialities that share one record, so the doctor in front of you knows what the last one found."
      />
      <section className="wrap section">
        <div className="tiles">
          {SERVICES.map((s, i) => (
            <TLink
              key={s.slug}
              href={`/services/${s.slug}`}
              className="tile"
              data-tone={s.tone}
              data-reveal
              data-cursor="view"
              data-cursor-label="Open"
              style={{ ["--i" as string]: i % 3 }}
            >
              <span className="tile__n">0{i + 1}</span>
              <h2>{s.name}</h2>
              <p>{s.short}</p>
              <span className="tile__arrow" aria-hidden>↗</span>
            </TLink>
          ))}
        </div>
      </section>
    </>
  );
}
