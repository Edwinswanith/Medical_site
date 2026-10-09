import Image from "next/image";
import { FOUNDERS } from "@/content/team";

/** About: the founders, as an editorial row (heading left, portraits right). Names, titles and links only. */
export function AboutFounders() {
  return (
    <section className="pg-row wrap" aria-labelledby="founders-h">
      <h2 id="founders-h" className="display-m">
        The <em>founders.</em>
      </h2>
      <ul className="pg-founders">
        {FOUNDERS.map((f) => (
          <li key={f.id} id={f.id} className="pg-founder">
            <div className="pg-founder__photo">
              <Image src={f.photo.src} alt={f.photo.alt} width={f.photo.w} height={f.photo.h} sizes="(max-width: 899px) 45vw, 22vw" />
            </div>
            <h3 className="pg-founder__name">{f.name}</h3>
            <p className="pg-founder__role">
              {f.title} · {f.area}
            </p>
            <a className="arrow-link" href={f.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden>↗</span>
              <span className="sr-only"> profile of {f.name} (opens in a new tab)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
