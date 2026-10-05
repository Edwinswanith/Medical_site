import { CLINIC, NAV, SERVICES } from "@/content/site";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";
import { BackToTop } from "./BackToTop";

export function Footer() {
  const tel = CLINIC.phone.replace(/\s/g, "");
  return (
    <footer className="footer">
      <div className="footer__cta">
        <p className="label">Ready when you are</p>
        <h2 className="display-l" data-reveal>
          <span className="line">
            <span>Let&apos;s look</span>
          </span>
          <span className="line">
            <span>
              <em>after you.</em>
            </span>
          </span>
        </h2>
        <div className="footer__cta-actions">
          <Magnetic>
            <TLink href="/contact" className="blob" data-cursor="hide">
              Book a visit
            </TLink>
          </Magnetic>
          <a className="footer__phone" href={`tel:${tel}`}>
            or call {CLINIC.phone}
          </a>
        </div>
      </div>

      <div className="footer__grid">
        <div>
          <p className="label">Visit</p>
          {CLINIC.address.map((l) => (
            <p key={l}>{l}</p>
          ))}
          {CLINIC.mapUrl && (
            <a className="ulink" href={CLINIC.mapUrl} target="_blank" rel="noreferrer">
              Directions ↗
            </a>
          )}
        </div>
        <div>
          <p className="label">Hours</p>
          {CLINIC.hours.map((h) => (
            <p key={h.days}>
              {h.days} <span className="muted">{h.time}</span>
            </p>
          ))}
        </div>
        <div>
          <p className="label">Specialities</p>
          {SERVICES.map((s) => (
            <p key={s.slug}>
              <TLink className="ulink" href={`/services/${s.slug}`}>
                {s.name}
              </TLink>
            </p>
          ))}
        </div>
        <div>
          <p className="label">Clinic</p>
          {NAV.map((n) => (
            <p key={n.href}>
              <TLink className="ulink" href={n.href}>
                {n.label}
              </TLink>
            </p>
          ))}
          {CLINIC.social.map((s) => (
            <p key={s.href}>
              <a className="ulink" href={s.href} target="_blank" rel="noreferrer">
                {s.label} ↗
              </a>
            </p>
          ))}
        </div>
      </div>

      {CLINIC.emergencyPhone ? (
        <p className="footer__note">
          In an emergency call <a href={`tel:${CLINIC.emergencyPhone}`}>{CLINIC.emergencyPhone}</a> or go to the
          nearest emergency department.
        </p>
      ) : (
        <p className="footer__note">
          This website is not for emergencies. If you need urgent help, call your local emergency number or go to
          the nearest emergency department.
        </p>
      )}

      <div className="footer__base">
        <span>
          © {new Date().getFullYear()} {CLINIC.fullName}
        </span>
        <BackToTop />
      </div>
      <div className="footer__word" aria-hidden style={{ ["--n" as string]: CLINIC.name.length }}>
        {CLINIC.name}
      </div>
    </footer>
  );
}
