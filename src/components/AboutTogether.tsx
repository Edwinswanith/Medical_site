import { TLink } from "./TLink";

/** About: why one partner, as an editorial row (heading left, copy right). */
export function AboutTogether() {
  return (
    <section className="pg-row wrap">
      <h2 className="display-m">
        Bring the work <em>together.</em>
      </h2>
      <div className="pg-row__body">
        <p>Your website, films and social channels need to explain the same practice clearly. We plan the pages, procedure topics and formats together, so a full film on your website can also become a short for your social channels.</p>
        <p>You can commission films for your current site, a website with films, or the Full media partner option. An AI presenter is optional and requires signed consent.</p>
        <TLink className="arrow-link" href="/services">
          Explore the services <span aria-hidden>→</span>
        </TLink>
      </div>
    </section>
  );
}
