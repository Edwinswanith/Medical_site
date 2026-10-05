import type { Metadata } from "next";
import { CLINIC } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/EnquiryForm";

export const metadata: Metadata = { title: "Book a visit" };

export default function ContactPage() {
  const tel = CLINIC.phone.replace(/\s/g, "");
  return (
    <>
      <PageHero
        label="Book a visit"
        title="Tell us when suits you"
        em="suits you"
        intro="Send an enquiry and the front desk will call back to confirm a time. Prefer to talk now? Call us."
      />
      <section className="wrap section book book--page">
        <aside className="book__aside">
          <div>
            <p className="label">Call the desk</p>
            <a className="display-s ulink" href={`tel:${tel}`}>{CLINIC.phone}</a>
          </div>
          <div>
            <p className="label">Email</p>
            <a className="ulink" href={`mailto:${CLINIC.email}`}>{CLINIC.email}</a>
          </div>
          <div>
            <p className="label">Visit</p>
            {CLINIC.address.map((l) => <p key={l}>{l}</p>)}
          </div>
          <div>
            <p className="label">Hours</p>
            <dl className="hours">
              {CLINIC.hours.map((h) => (
                <div key={h.days}>
                  <dt>{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
        <EnquiryForm />
      </section>
    </>
  );
}
