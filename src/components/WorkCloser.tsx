import { TLink } from "./TLink";

/** Case study close: what the project means for the reader's practice, then the next step. */
export function WorkCloser() {
  return (
    <>
      <section className="pg-row pg-row--flush">
        <h2 className="display-m">
          A useful example for <em>your own practice.</em>
        </h2>
        <div className="pg-row__body">
          <p>If you explain several procedures, a treatment directory can help patients find the relevant guide without reading every page. We agree the structure around your specialty and your actual services.</p>
          <TLink className="arrow-link" href="/services/medical-websites">
            See how our medical websites are planned <span aria-hidden>→</span>
          </TLink>
        </div>
      </section>
      <section className="pg-work__closer">
        <h2 className="display-m">
          Discuss your <em>website.</em>
        </h2>
        <div className="pg-work__closer-body">
          <p>We build websites for consultants and practices across the UK. Share your specialty, current site and what patients need to understand so we can agree an appropriate scope.</p>
          <TLink className="btn btn--signal" href="/contact">
            Discuss your project <span aria-hidden>→</span>
          </TLink>
        </div>
      </section>
    </>
  );
}
