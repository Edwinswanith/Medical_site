import type { Metadata } from "next";
import { initials } from "@/lib/text";
import { DOCTORS } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { TLink } from "@/components/TLink";

export const metadata: Metadata = { title: "Doctors" };

export default function DoctorsPage() {
  return (
    <>
      <PageHero
        label="Doctors"
        title="People who remember you"
        em="remember you"
        intro="The same doctors, visit after visit. Ask for someone by name when you book."
      />
      <section className="wrap section">
        <div className="docs docs--full">
          {DOCTORS.map((d, i) => (
            <article key={i} className="doc" data-reveal style={{ ["--i" as string]: i % 4 }}>
              <div className="doc__plate" aria-hidden>
                <span>{initials(d.name)}</span>
              </div>
              <h2>{d.name}</h2>
              <p className="muted">{d.role}</p>
              <p className="label doc__focus">{d.focus}</p>
            </article>
          ))}
        </div>
        <div className="center">
          <TLink href="/contact" className="blob blob--ink">Book with a doctor</TLink>
        </div>
      </section>
    </>
  );
}
