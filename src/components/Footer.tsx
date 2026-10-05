import { BRAND, LEGAL, NAV } from "@/content/site";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";
import { BackToTop } from "./BackToTop";

/** The close: one invitation, a signal-coloured glow rising from the bottom edge, and the essentials. */
export function Footer() {
  return (
    <footer className="foot" data-scrub="" data-scrub-start="top bottom" data-scrub-end="bottom bottom">
      <div className="foot__panel notch">
        <p className="label">A short call is where it starts</p>
        <h2 className="foot__title" data-reveal>
          <span className="line">
            <span>Let&apos;s talk about</span>
          </span>
          {" "}
          <span className="line">
            <span>
              <em>your practice.</em>
            </span>
          </span>
        </h2>
        <div className="foot__cta">
          <Magnetic>
            <TLink href="/contact" className="btn btn--signal btn--lg" data-cursor="hide">
              Book a call <span aria-hidden>→</span>
            </TLink>
          </Magnetic>
          <a className="arrow-link" href={`mailto:${BRAND.email}`}>
            {BRAND.email}
          </a>
        </div>

        <div className="foot__cols">
          <div>
            <p className="label">What we do</p>
            {NAV.map((n) => (
              <p key={n.href}>
                <TLink href={n.href}>{n.label}</TLink>
              </p>
            ))}
          </div>
          <div>
            <p className="label">Contact</p>
            <p>
              <TLink href="/contact">Enquire</TLink>
            </p>
            <p>
              <a href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>
            </p>
            <p className="muted">{BRAND.responseTime}</p>
          </div>
        </div>
      </div>

      <p className="foot__legal">{LEGAL}</p>
      <div className="foot__base">
        <span>
          © {new Date().getFullYear()} {BRAND.name}
        </span>
        <BackToTop />
      </div>
      <div className="foot__glow" aria-hidden />
    </footer>
  );
}
