import type { Metadata } from "next";
import { CLINIC, PRINCIPLES } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { Split } from "@/components/Split";
import { Journey } from "@/components/Journey";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero label="About" title="A clinic built around the follow-up" em="the follow-up" intro={CLINIC.intro} />

      <section className="wrap section">
        <Split
          as="p"
          className="display-m"
          text="Most care goes wrong between appointments. Results that nobody reads, referrals that go nowhere. We built the clinic to close those gaps."
          em="close those gaps."
        />
      </section>

      <section className="wrap section principles">
        <p className="label">What we hold to</p>
        <div className="principles__grid">
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className="principle" data-reveal style={{ ["--i" as string]: i }}>
              <span className="principle__n">0{i + 1}</span>
              <h2>{p.title}</h2>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <Journey />

      <section className="wrap section visit">
        <div>
          <p className="label">Find us</p>
          {CLINIC.address.map((l) => (
            <p className="display-s" key={l}>{l}</p>
          ))}
          {CLINIC.mapUrl && (
            <a className="ulink" href={CLINIC.mapUrl} target="_blank" rel="noreferrer">
              Get directions ↗
            </a>
          )}
        </div>
        <div>
          <p className="label">Hours</p>
          <dl className="hours">
            {CLINIC.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
