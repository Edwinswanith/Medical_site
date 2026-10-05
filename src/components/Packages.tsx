import { PACKAGES } from "@/content/site";
import { TLink } from "./TLink";

/** Scene 10 (light). Three ways to begin; the middle one carries the signal colour. */
export function Packages() {
  return (
    <section id="begin" className="pkg" data-chapter="Begin" aria-labelledby="pkg-h">
      <div className="pkg__head">
        <p className="label">Ways to start</p>
        <h2 id="pkg-h" className="big" data-reveal>
          <span className="line">
            <span>
              Three ways to <em>begin.</em>
            </span>
          </span>
        </h2>
        <p className="pkg__intro">Each is quoted for your practice after a short call.</p>
      </div>
      <div className="pkg__grid">
        {PACKAGES.map((p, i) => (
          <article key={p.name} className="pkg__card notch" data-featured={!!p.featured} data-reveal style={{ ["--i" as string]: i }}>
            <p className="label">{p.n}</p>
            <h3>{p.name}</h3>
            <p className="pkg__fit">{p.fit}</p>
            <ul>
              {p.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
            <TLink href="/contact" className={`btn ${p.featured ? "btn--signal" : "btn--outline"}`}>
              Talk about this <span aria-hidden>→</span>
            </TLink>
          </article>
        ))}
      </div>
    </section>
  );
}
