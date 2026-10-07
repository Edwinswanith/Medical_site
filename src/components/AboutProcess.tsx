import { PROCESS } from "@/content/site";

/**
 * About page process: the approval-based workflow as numbered steps.
 * Reuses the same visual pattern as the home page Process section.
 */
export function AboutProcess() {
  return (
    <section className="pg-process wrap">
      <div className="pg-process__intro">
        <h2 className="display-m">You approve the <em>work.</em></h2>
        <p className="pg-process__desc">{PROCESS.intro}</p>
      </div>
      <ol className="pg-process__steps">
        {PROCESS.steps.map((step) => (
          <li key={step.n} className="pg-process__step">
            <span className="pg-process__num">{step.n}</span>
            <div>
              <h3>{step.name}</h3>
              <p>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
