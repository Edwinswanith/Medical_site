import { SERVICES, STATEMENT } from "@/content/site";
import { ScrubText } from "./ScrubText";
import { MediaSwap } from "./MediaSwap";
import { TLink } from "./TLink";

/** Scene 2. The promise, lit word by word, then the four services as clipped-corner cards. */
export function Services() {
  return (
    <section id="services" className="svc" data-chapter="Services" aria-labelledby="svc-h">
      <p className="label svc__label">What we do</p>
      <ScrubText className="svc__statement" text={STATEMENT} />
      <span id="svc-h" className="sr-only">
        What we do
      </span>
      <div className="svc__grid">
        {SERVICES.map((s, i) => (
          <TLink key={s.id} href={s.href} className="svc__card notch" data-reveal data-cursor="view" data-cursor-label="Explore" style={{ ["--i" as string]: i }}>
            <div className="wipe" data-reveal style={{ ["--i" as string]: i }}>
              <MediaSwap media={s.media} trigger="hover" sizes="(max-width: 899px) 45vw, 23vw" />
            </div>
            <span className="svc__n">0{i + 1}</span>
            <h3 className="svc__name">{s.name}</h3>
            <p className="svc__line">{s.line}</p>
            <span className="svc__more">
              See it <span aria-hidden>↘</span>
            </span>
          </TLink>
        ))}
      </div>
    </section>
  );
}
