import type { Metadata } from "next";
import { BRAND, SEO } from "@/content/site";
import { PageJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/privacy", ...SEO.privacy });

// Plain-language notice for the enquiry form. Every statement must stay true of the code:
// no cookies, no analytics, fonts self-hosted, form data sent only to the configured provider.
const UPDATED = "5 October 2026";

export default function PrivacyPage() {
  const mail = <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>;
  return (
    <>
      <PageJsonLd path="/privacy" name={SEO.privacy.title} description={SEO.privacy.description} />
      <section className="phero wrap">
        <p className="label">Privacy</p>
        <h1 className="display-xl">
          Privacy <em>notice</em>
        </h1>
        <p className="phero__intro lede">What happens to the details you send us, in plain English.</p>
      </section>
      <section className="wrap section legal">
        <p className="label">Last updated {UPDATED}</p>

        <h2>Who we are</h2>
        <p>
          {BRAND.name} makes websites, patient films and social content for clinicians. We are responsible for the
          details you send us through this site. Contact us about anything in this notice at {mail} or on{" "}
          <a className="ulink" href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>.
        </p>

        <h2>What we collect</h2>
        <p>Only what you type into the enquiry form:</p>
        <ul>
          <li>your name, and your practice or organisation if you give it;</li>
          <li>your email address, and your phone number if you give it;</li>
          <li>what you need, your budget band, and your message.</li>
        </ul>
        <p>
          The form asks for business details only. Please do not include any information about patients. If you
          email or call us, we receive what you choose to send in the same way.
        </p>

        <h2>Why we use it</h2>
        <p>
          To reply to your enquiry and, if you want to go ahead, to prepare a proposal. Our lawful basis is our
          legitimate interest in answering people who contact us, and taking steps at your request before a contract.
          We do not add you to a mailing list or send marketing without asking you first.
        </p>

        <h2>Who handles it</h2>
        <p>
          The form passes your enquiry to the email or messaging service we use to receive it, which delivers it to
          our team. The site is hosted by Vercel, whose servers process standard technical data (such as IP addresses
          in security logs) to run and protect the site. We do not sell your details or share them for advertising.
        </p>
        <p>
          If your details are handled outside the UK, we make sure the safeguards required by UK data protection law
          are in place.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep an enquiry for as long as we need it to reply and follow up. If you become a client, it becomes part
          of your client record. Otherwise we delete it when it is no longer needed. Ask us at any time and we will
          delete it sooner.
        </p>

        <h2>Cookies</h2>
        <p>
          This site does not set cookies and does not use analytics or advertising trackers. Fonts are served from this
          site, not from a third party.
        </p>

        <h2>Your rights</h2>
        <p>
          Under UK GDPR you can ask to see the details we hold about you, correct them, delete them, restrict or object
          to how we use them, or receive a copy. Email {mail}. If you are unhappy with how we have handled your
          details, you can complain to the Information Commissioner&apos;s Office at{" "}
          <a className="ulink" href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a> or on 0303 123 1113.
        </p>
      </section>
    </>
  );
}
