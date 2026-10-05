import { PRESENTER } from "@/content/site";
import { MediaSwap } from "./MediaSwap";

/** Scene 6. The AI presenter, with consent and disclosure stated as plainly as the offer. */
export function Presenter() {
  return (
    <section id="presenter" className="pre" data-tone="dark" data-chapter="Presenter" aria-labelledby="pre-h">
      <div className="pre__copy">
        <p className="label">Your AI presenter</p>
        <h2 id="pre-h" className="big" data-reveal>
          <span className="line">
            <span>{PRESENTER.title}</span>
          </span>
          <span className="line">
            <span>
              <em>{PRESENTER.titleEm}</em>
            </span>
          </span>
        </h2>
        <p className="pre__intro">{PRESENTER.intro}</p>
        <ol className="pre__steps">
          {PRESENTER.steps.map((s, i) => (
            <li key={s.name} data-reveal style={{ ["--i" as string]: i }}>
              <span className="pre__n">0{i + 1}</span>
              <div>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="pre__disclosure">{PRESENTER.disclosure}</p>
      </div>
      <figure className="pre__media notch" data-reveal>
        <MediaSwap media={PRESENTER.media} trigger="view" showAiLabel={false} />
        <figcaption className="label">AI-generated person. Not a client or a clinician.</figcaption>
      </figure>
    </section>
  );
}
