import { BRAND, NAV } from "@/content/site";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";
import { BackToTop } from "./BackToTop";

export function Footer() {
  return (
    <footer className="footer" data-tone="dark">
      <div className="footer__cta">
        <p className="label">Have a practice to explain?</p>
        <h2 className="display-l" data-reveal>
          <span className="line">
            <span>Let&apos;s make it</span>
          </span>
          <span className="line">
            <span>
              <em>easy to understand.</em>
            </span>
          </span>
        </h2>
        <div className="footer__cta-actions">
          <Magnetic>
            <TLink href="/contact" className="blob" data-cursor="hide">
              Start a project
            </TLink>
          </Magnetic>
          <a className="footer__phone" href={`mailto:${BRAND.email}`}>
            or email {BRAND.email}
          </a>
        </div>
      </div>

      <div className="footer__grid">
        <div>
          <p className="label">Contact</p>
          <p>
            <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </p>
          <p>
            <a className="ulink" href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>
          </p>
          <p className="muted">{BRAND.responseTime}</p>
        </div>
        <div>
          <p className="label">Studio</p>
          <p>{BRAND.founders}</p>
        </div>
        <div>
          <p className="label">Site</p>
          {[{ href: "/", label: "Home" }, ...NAV].map((n) => (
            <p key={n.href}>
              <TLink className="ulink" href={n.href}>
                {n.label}
              </TLink>
            </p>
          ))}
        </div>
      </div>

      <p className="footer__note">
        Films and imagery marked as AI-generated are concept work made to show a format. They are not
        client footage or clinical diagrams.
      </p>

      <div className="footer__base">
        <span>
          © {new Date().getFullYear()} {BRAND.name}
        </span>
        <BackToTop />
      </div>
      <div className="footer__word" aria-hidden style={{ ["--n" as string]: BRAND.short.length }}>
        {BRAND.short}
      </div>
    </footer>
  );
}
