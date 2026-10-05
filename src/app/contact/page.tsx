import type { Metadata } from "next";
import { BRAND, SEO } from "@/content/site";
import { PageJsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Split } from "@/components/Split";

export const metadata: Metadata = pageMetadata({ path: "/contact", ...SEO.contact });

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ enquiry?: string }> }) {
  const { enquiry } = await searchParams;
  return (
    <>
      <PageJsonLd path="/contact" type="ContactPage" name={SEO.contact.title} description={SEO.contact.description} />
      <section className="phero wrap">
        <p className="label">Book a call</p>
        <Split as="h1" className="display-xl" text="Tell us what your practice needs" em="your practice needs" />
        <p className="phero__intro lede" data-reveal>
          Websites, patient films, AI presenters and social content for practices across the UK. A few details is enough. We reply with questions or a short proposal.
        </p>
      </section>
      <section className="wrap section book book--page">
        <aside className="book__aside">
          <div>
            <p className="label">Email</p>
            <a className="display-s ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          </div>
          <div>
            <p className="label">Call</p>
            <a className="ulink" href={`tel:${BRAND.phone.tel}`}>{BRAND.phone.display}</a>
          </div>
          <p className="muted">{BRAND.responseTime}</p>
        </aside>
        <div>
          {enquiry === "sent" ? <div className="form__done" role="status"><p className="display-m">Thank you. <em>We&apos;ll be in touch.</em></p><p>{BRAND.responseTime}.</p></div> : <>
            {(enquiry === "invalid" || enquiry === "unavailable") && <p className="enquiry-notice" role="alert">{enquiry === "invalid" ? "Please check your name, email and permission to contact you, then try again." : "We couldn't send this online right now."} You can also email <a className="ulink" href={`mailto:${BRAND.email}`}>{BRAND.email}</a>.</p>}
            <EnquiryForm />
          </>}
        </div>
      </section>
    </>
  );
}
