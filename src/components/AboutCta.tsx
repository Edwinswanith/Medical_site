import { BRAND } from "@/content/site";
import { TLink } from "./TLink";

/**
 * About page closing CTA: call to action with contact info and button.
 */
export function AboutCta() {
  return (
    <section className="pg-cta wrap">
      <h2 className="display-m">Start with a <em>short call.</em></h2>
      <p className="pg-cta__intro">
        Tell us your specialty, what you have today and the work you need. Please share business details only, without patient information. {BRAND.responseTime}.
      </p>
      <div className="pg-cta__contact">
        <a className="ulink" href={`mailto:${BRAND.email}`}>
          {BRAND.email}
        </a>
        <span aria-hidden>·</span>
        <a className="ulink" href={`tel:${BRAND.phone.tel}`}>
          {BRAND.phone.display}
        </a>
      </div>
      <TLink className="btn btn--signal" href="/contact">
        Book a call <span aria-hidden>→</span>
      </TLink>
    </section>
  );
}
