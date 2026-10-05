import { SOCIAL } from "@/content/site";
import { MediaSwap } from "./MediaSwap";

/**
 * Scene 7. A stack of vertical shorts that fans open as it enters the screen
 * (CSS on .is-in), beside the channel table. Each card plays on hover or in view.
 */
export function Social() {
  return (
    <section id="social" className="soc" data-chapter="Social" aria-labelledby="soc-h">
      <div className="soc__head">
        <p className="label">Shorts and social</p>
        <h2 id="soc-h" className="big" data-reveal>
          <span className="line">
            <span>Not just your website.</span>
          </span>
          <span className="line">
            <span>
              Every <em>platform.</em>
            </span>
          </span>
        </h2>
        <p className="soc__intro">{SOCIAL.intro}</p>
      </div>

      <div className="soc__fan" data-scrub="" data-scrub-start="top 90%" data-scrub-end="center 45%">
        {SOCIAL.stack.map((m, i) => (
          <div key={i} className="soc__card" style={{ ["--i" as string]: i, ["--c" as string]: i - (SOCIAL.stack.length - 1) / 2 }}>
            <MediaSwap media={m} trigger="hover" showAiLabel={i === SOCIAL.stack.length - 1} />
          </div>
        ))}
      </div>

      <div className="soc__table">
        <p className="label">Where each film goes</p>
        <ul>
          {SOCIAL.channels.map((c) => (
            <li key={c.name} data-reveal>
              <span className="soc__name">{c.name}</span>
              <span className="soc__what">{c.what}</span>
              <span className="soc__fmt label">{c.format}</span>
            </li>
          ))}
        </ul>
        <ul className="soc__promises">
          {SOCIAL.promises.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
