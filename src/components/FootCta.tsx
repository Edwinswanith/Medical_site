"use client";

import { usePathname } from "next/navigation";
import { BRAND } from "@/content/site";
import { TLink } from "./TLink";
import { Magnetic } from "./Magnetic";

/** The footer's call to action. On /contact the form is already on the page, so only the email stays. */
export function FootCta() {
  const onContact = usePathname() === "/contact";
  return (
    <div className="foot__cta">
      {!onContact && (
        <Magnetic>
          <TLink href="/contact" className="btn btn--signal btn--lg" data-cursor="hide">
            Book a call <span aria-hidden>→</span>
          </TLink>
        </Magnetic>
      )}
      <a className="arrow-link" href={`mailto:${BRAND.email}`}>
        {BRAND.email}
      </a>
    </div>
  );
}
