import { PROCESS } from "@/content/site";

/**
 * How it works, as a stats board: a sticky title, then five big numbered rows that
 * rise in turn. The last number gets a hand-drawn ring as it crosses the screen.
 */
export function Process() {
  const last = PROCESS.steps.length - 1;
  return (
    <section id="process" className="prc" data-chapter="Process" aria-labelledby="prc-h">
      <div className="prc__head">
        <p className="label">How it works</p>
        <h2 id="prc-h" className="big" data-reveal>
          <span className="line">
            <span>{PROCESS.title}</span>
          </span>
          {" "}
          <span className="line">
            <span>
              <em>{PROCESS.titleEm}</em>
            </span>
          </span>
        </h2>
        <p className="prc__intro">{PROCESS.intro}</p>
        <ul className="prc__safe">
          {PROCESS.safeguards.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
      <ol className="prc__rows">
        {PROCESS.steps.map((s, i) => (
          <li key={s.n} className="prc__row" data-reveal>
            {i === last ? (
              <span className="prc__n" data-scrub="" data-scrub-start="top 85%" data-scrub-end="top 40%">
                {s.n}
                <svg className="scribble scribble--ring" viewBox="0 0 200 160" preserveAspectRatio="none" aria-hidden>
                  <path pathLength={1} d="M30 90 C 20 40, 110 10, 165 40 C 200 65, 185 130, 110 145 C 50 155, 15 120, 35 80 C 45 62, 70 50, 95 46" />
                </svg>
              </span>
            ) : (
              <span className="prc__n">{s.n}</span>
            )}
            <div>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
