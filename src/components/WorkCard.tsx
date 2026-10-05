import type { Work } from "@/content/site";

const KIND_LABEL: Record<Work["kind"], string> = {
  client: "Client work",
  product: "Our product",
};

/**
 * Scene 2. One real piece of work, shown before any sales copy.
 * The image is revealed by a mask on scroll; hover and focus share one treatment.
 * Without an approved screenshot it shows a labelled frame instead of a stand-in image.
 */
export function WorkCard({ work }: { work: Work }) {
  const host = work.liveUrl ? new URL(work.liveUrl).host : "";
  return (
    <article className="wc" data-reveal>
      <div className="wc__media">
        <div className="wc__chrome" aria-hidden>
          <span />
          <span />
          <span />
          <i>{host}</i>
        </div>
        {work.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={work.screenshot.src} alt={work.screenshot.alt} loading="lazy" />
        ) : (
          <div className="wc__pending">
            <span className="wc__pending-name">{work.name}</span>
            <span className="label">Screenshot pending client approval</span>
          </div>
        )}
      </div>

      <div className="wc__body">
        <p className="wc__chips">
          <span className="chip chip--solid">{KIND_LABEL[work.kind]}</span>
          <span className="chip">{work.status}</span>
        </p>
        <h3 className="wc__name">{work.name}</h3>
        <p className="wc__tagline">{work.tagline}</p>
        {work.client && <p className="wc__client muted">{work.client}</p>}
        <p className="wc__summary">{work.summary}</p>
        <dl className="wc__metrics">
          {work.metrics.map((m) => (
            <div key={m.label}>
              <dt>{m.label}</dt>
              <dd>{m.value}</dd>
            </div>
          ))}
        </dl>
        <ul className="wc__tags">
          {work.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {work.liveUrl && (
          <a className="wc__link" href={work.liveUrl} target="_blank" rel="noreferrer" data-cursor="view" data-cursor-label="Visit">
            Visit the live site <span aria-hidden>↗</span>
          </a>
        )}
      </div>
    </article>
  );
}
