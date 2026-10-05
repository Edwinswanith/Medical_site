import { TESTIMONIAL } from "@/content/site";
import { Split } from "./Split";

/** Scene 8. The one real testimonial, with its context stated plainly. */
export function Voice() {
  return (
    <section className="vo wrap section" aria-label="Client feedback">
      <figure>
        <Split as="blockquote" className="vo__quote" text={`“${TESTIMONIAL.quote}”`} em="They build fast, and they build properly.”" />
        <figcaption data-reveal>
          <strong>{TESTIMONIAL.name}</strong>, {TESTIMONIAL.role}
          <span className="label vo__ctx">{TESTIMONIAL.context}</span>
        </figcaption>
      </figure>
    </section>
  );
}
