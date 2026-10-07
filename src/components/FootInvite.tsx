"use client";

import { usePathname } from "next/navigation";
import { FootCta } from "./FootCta";

/** The footer's invitation. Left out on /contact, where the form is the page; the footer keeps its links. */
export function FootInvite() {
  if (usePathname() === "/contact") return null;
  return (
    <>
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
      <FootCta />
    </>
  );
}
