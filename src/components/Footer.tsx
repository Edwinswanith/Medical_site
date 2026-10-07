import { BRAND, NAV } from "@/content/site";
import { TLink } from "./TLink";
import { FootInvite } from "./FootInvite";
import { BackToTop } from "./BackToTop";

/** The close: one invitation, a signal-coloured glow rising from the bottom edge, and the essentials. */
export function Footer() {
  return (
    <footer className="foot" data-tone="dark" data-scrub="" data-scrub-start="top bottom" data-scrub-end="bottom bottom">
      <div className="foot__panel notch">
        <FootInvite />

        <div className="foot__cols">
          <div>
            <p className="label">What we do</p>
            {NAV.map((n) => (
              <p key={n.href}>
                <TLink href={n.href}>{n.label}</TLink>
              </p>
            ))}
            <p><TLink href="/services">All services</TLink></p>
            <p><TLink href="/about">About the studio</TLink></p>
          </div>
          <div>
            <p className="label">Contact</p>
            <p>
              <TLink href="/contact">Enquire</TLink>
            </p>
            <p><a href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
            <p>
              <a href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>
            </p>
            <p className="muted">{BRAND.responseTime}</p>
            <p>{BRAND.name} works with clinicians and practices across the UK.</p>
          </div>
        </div>
      </div>

      <div className="foot__base">
        <span>
          © {new Date().getFullYear()} {BRAND.legalName} · <TLink href="/privacy">Privacy</TLink>
          {BRAND.registration && (
            <small className="foot__reg">
              Registered in {BRAND.registration.place}, company no. {BRAND.registration.number}. Registered office: {BRAND.registration.office}.
            </small>
          )}
        </span>
        <BackToTop />
      </div>
      <div className="foot__glow" aria-hidden />
    </footer>
  );
}
