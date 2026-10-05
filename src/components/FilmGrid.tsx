import { FILMS, TILES } from "@/content/site";
import { MediaSwap } from "./MediaSwap";

/**
 * Films as a hall of tiles. Four columns drift at different speeds as you scroll;
 * hovering a tile opens its film from the cursor and rings it in the signal colour.
 * Touch: each tile plays while it is mostly on screen.
 */
export function FilmGrid() {
  const cols = [0, 1, 2, 3].map((c) => TILES.filter((_, i) => i % 4 === c));
  const speeds = [0.08, -0.14, 0.18, -0.06];
  return (
    <section id="films" className="fg" data-chapter="Films" aria-labelledby="fg-h">
      <div className="fg__head">
        <h2 id="fg-h" className="big" data-reveal>
          <span className="line">
            <span>{FILMS.title}</span>
          </span>
          <span className="line">
            <span>
              <em>{FILMS.titleEm}</em>
            </span>
          </span>
        </h2>
        <div>
          <p className="fg__intro">{FILMS.intro}</p>
          <p className="fg__note label">{FILMS.note}</p>
        </div>
      </div>
      <div className="fg__grid">
        {cols.map((col, c) => (
          <div key={c} className="fg__col" data-speed={speeds[c]}>
            {col.map((t) => (
              <article key={t.title} className="fg__tile notch" data-cursor="view" data-cursor-label="Play">
                <div className="fg__media">
                  <MediaSwap media={t.media} trigger="hover" showAiLabel={false} />
                </div>
                <p className="fg__cap">
                  <span className="label">{t.tag} · Concept</span>
                  <span className="fg__title">{t.title}</span>
                </p>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
