import { initials } from "@/lib/text";
import { CLINIC, DOCTORS, PRINCIPLES, SERVICES } from "@/content/site";
import { Pulse } from "@/components/Pulse";
import { Marquee } from "@/components/Marquee";
import { Split } from "@/components/Split";
import { ServiceList } from "@/components/ServiceList";
import { Journey } from "@/components/Journey";
import { TLink } from "@/components/TLink";
import { Magnetic } from "@/components/Magnetic";

export default function Home() {
  const letters = CLINIC.name.split("");
  return (
    <>
      <section className="hero" aria-labelledby="hero-h">
        <div className="hero__top">
          <p className="label hero__fade">{CLINIC.fullName}</p>
          <p className="label hero__fade">{CLINIC.hours[0].days} · {CLINIC.hours[0].time}</p>
        </div>

        <h1 id="hero-h" className="hero__word" style={{ ["--n" as string]: letters.length }}>
          <span className="sr-only">{CLINIC.fullName}</span>
          <span aria-hidden>
            {letters.map((c, i) => (
              <span className="hero__char" key={i} style={{ ["--i" as string]: i }}>
                {c}
              </span>
            ))}
          </span>
        </h1>

        <Pulse />

        <div className="hero__foot">
          <p className="hero__tag hero__fade">
            {CLINIC.tagline.split(" ").slice(0, -2).join(" ")}{" "}
            <em>{CLINIC.tagline.split(" ").slice(-2).join(" ")}</em>
          </p>
          <div className="hero__cta hero__fade">
            <Magnetic>
              <TLink href="/contact" className="blob" data-cursor="hide">
                Book a visit
              </TLink>
            </Magnetic>
            <TLink href="/services" className="ulink">
              Explore specialities
            </TLink>
          </div>
          <p className="hero__hint label hero__fade" aria-hidden>
            Move your cursor · Scroll
          </p>
        </div>
      </section>

      <Marquee items={SERVICES.map((s) => s.name)} />

      <section className="intro wrap">
        <p className="label">The clinic</p>
        <Split as="h2" className="display-m intro__text" text={CLINIC.intro} em="one place to come back to." />
      </section>

      <section className="wrap section" aria-labelledby="svc-h">
        <div className="section__head">
          <p className="label">Specialities</p>
          <h2 id="svc-h" className="display-l" data-reveal>
            <span className="line">
              <span>What we</span>
            </span>
            <span className="line">
              <span>
                <em>look after</em>
              </span>
            </span>
          </h2>
        </div>
        <ServiceList services={SERVICES} />
      </section>

      <Journey />

      <section className="wrap section principles" aria-labelledby="pr-h">
        <p className="label">How we work</p>
        <h2 id="pr-h" className="sr-only">
          How we work
        </h2>
        <div className="principles__grid">
          {PRINCIPLES.map((p, i) => (
            <article key={p.title} className="principle" data-reveal style={{ ["--i" as string]: i }}>
              <span className="principle__n">0{i + 1}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="wrap section team-teaser" aria-labelledby="team-h">
        <div className="section__head section__head--row">
          <h2 id="team-h" className="display-l" data-reveal>
            <span className="line">
              <span>
                The <em>team</em>
              </span>
            </span>
          </h2>
          <TLink href="/doctors" className="ulink">
            Meet every doctor ↗
          </TLink>
        </div>
        <div className="docs">
          {DOCTORS.map((d, i) => (
            <article key={i} className="doc" data-reveal style={{ ["--i" as string]: i }}>
              <div className="doc__plate" aria-hidden>
                <span>{initials(d.name)}</span>
              </div>
              <h3>{d.name}</h3>
              <p className="muted">{d.role}</p>
            </article>
          ))}
        </div>
      </section>

      <Marquee items={["Book a visit", "Talk to a doctor", "Get answers"]} reverse />
    </>
  );
}
