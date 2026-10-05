import type { Metadata } from "next";
import { BRAND } from "@/content/site";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Split } from "@/components/Split";

export const metadata: Metadata = { title: "Start a project" };

export default function ContactPage() {
  return (
    <>
      <section className="phero wrap">
        <p className="label">Start a project</p>
        <Split as="h1" className="display-xl" text="Tell us what your practice needs" em="your practice needs" />
        <p className="phero__intro lede" data-reveal>
          A few details is enough. We reply with questions or a short proposal, never an automated sequence.
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
        <EnquiryForm />
      </section>
    </>
  );
}
