import { PRESENTER } from "@/content/site";
import { MediaSwap } from "./MediaSwap";

/**
 * The AI presenter. A full-bleed frame grows out of a narrow strip as you scroll
 * (--r on the sticky section), the title lands over its lower edge, then consent
 * and disclosure follow as plainly as the offer.
 */
export function Presenter() {
  return (
    <section id="presenter" className="pre" data-chapter="Presenter" aria-labelledby="pre-h">
      <div className="pre__grow" data-scrub data-scrub-start="top top" data-scrub-end="bottom bottom">
        <div className="pre__stage">
          <div className="pre__frame">
            <MediaSwap media={PRESENTER.media} trigger="view" showAiLabel={false} />
            <span className="pre__ai label">AI-generated person. Not a client or a clinician.</span>
          </div>
          <h2 id="pre-h" className="pre__title big">
            {PRESENTER.title} <em>{PRESENTER.titleEm}</em>
          </h2>
        </div>
      </div>
      <div className="pre__body">
        <p className="pre__intro">{PRESENTER.intro}</p>
        <ol className="pre__steps">
          {PRESENTER.steps.map((s, i) => (
            <li key={s.name} data-reveal style={{ ["--i" as string]: i }}>
              <span className="pre__n">0{i + 1}</span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="pre__disclosure">{PRESENTER.disclosure}</p>
      </div>
    </section>
  );
}
