import { WORK } from "@/content/site";
import { WorkCard } from "./WorkCard";

/** Scene 2. Real work only: the launched client site leads, our own products follow. */
export function WorkReel() {
  const [lead, ...rest] = WORK;
  return (
    <section id="work" className="wrap section work" data-chapter="Work" aria-labelledby="work-h">
      <div className="section__head">
        <p className="label">Selected work</p>
        <h2 id="work-h" className="display-l" data-reveal>
          <span className="line">
            <span>Proof first.</span>
          </span>
          <span className="line">
            <span>
              <em>Then the pitch.</em>
            </span>
          </span>
        </h2>
      </div>
      <WorkCard work={lead} />
      <div className="work__more">
        {rest.map((w, i) => (
          <article key={w.slug} className="wm" data-reveal style={{ ["--i" as string]: i }}>
            <p className="wc__chips">
              <span className="chip chip--solid">{w.kind === "client" ? "Client work" : "Our product"}</span>
              <span className="chip">{w.status}</span>
            </p>
            <h3 className="wm__name">{w.name}</h3>
            <p className="wc__tagline">{w.tagline}</p>
            <p className="wm__summary">{w.summary}</p>
            <dl className="wc__metrics">
              {w.metrics.map((m) => (
                <div key={m.label}>
                  <dt>{m.label}</dt>
                  <dd>{m.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
