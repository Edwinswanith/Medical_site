import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/content/site";
import { PageHero } from "@/components/PageHero";
import { TLink } from "@/components/TLink";
import { EnquiryForm } from "@/components/EnquiryForm";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SERVICES.find((x) => x.slug === slug);
  return s ? { title: s.name, description: s.short } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = SERVICES.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = SERVICES[i];
  const next = SERVICES[(i + 1) % SERVICES.length];

  return (
    <>
      <PageHero label={`Speciality 0${i + 1} / 0${SERVICES.length}`} title={s.name} intro={s.short} />

      <section className="wrap section detail">
        <div className="detail__body">
          <p className="label">About this service</p>
          <p className="lede" data-reveal>{s.body}</p>
        </div>
        <div className="detail__list">
          <p className="label">Includes</p>
          <ul>
            {s.includes.map((x, k) => (
              <li key={x} data-reveal style={{ ["--i" as string]: k }}>
                <span className="detail__tick" aria-hidden>✚</span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap section book" id="book">
        <div>
          <p className="label">Book</p>
          <h2 className="display-m">
            Ask about <em>{s.name.toLowerCase()}</em>
          </h2>
          <p className="muted">Send your details and the desk will call to confirm a time.</p>
        </div>
        <EnquiryForm preset={s.name} />
      </section>

      <TLink href={`/services/${next.slug}`} className="nextlink" data-cursor="view" data-cursor-label="Next">
        <span className="label">Next speciality</span>
        <span className="nextlink__name">{next.name}</span>
      </TLink>
    </>
  );
}
