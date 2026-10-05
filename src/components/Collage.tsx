import { COLLAGE } from "@/content/site";

/**
 * Interlude. Scattered frames drift at different speeds (data-speed parallax),
 * desaturated until hovered, around one quiet line in the centre.
 * Narrow screens: a simple two-column scatter with no drift.
 */
export function Collage() {
  return (
    <section className="col" aria-label="Behind every page">
      <div className="col__field" aria-hidden>
        {COLLAGE.items.map((it, i) => (
          <figure
            key={i}
            className="col__item wipe"
            data-reveal
            data-speed={it.speed}
            style={{ ["--x" as string]: `${it.x}%`, ["--y" as string]: `${it.y}%`, ["--w" as string]: `${it.w}vw`, ["--i" as string]: i % 4 }}
          >
            <img src={it.src} alt="" loading="lazy" />
          </figure>
        ))}
      </div>
      <blockquote className="col__quote" data-reveal>
        <p className="label">Behind every page</p>
        <p className="col__text">
          {COLLAGE.quote} <em>{COLLAGE.quoteEm}</em>
        </p>
      </blockquote>
    </section>
  );
}
