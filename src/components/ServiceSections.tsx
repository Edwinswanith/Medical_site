import { SOCIAL, TILES } from "@/content/site";
import type { ServicePageContent } from "@/content/services";
import { MediaSwap } from "./MediaSwap";

/*
 * The middle of a service page. All four share one skeleton; two sections are given their own
 * form so each page reads as its own product: the AI presenter shows its consent pathway and
 * puts consent in a statement band, and social content shows one film becoming every format.
 * A section falls back to the plain row if its copy changes.
 */

// one 16:9 film (the subtitled concept) and two vertical clips, in the order of SOCIAL.formats
const FORMAT_MEDIA = [TILES.find((t) => t.tag === "Post")?.media, SOCIAL.stack[1], SOCIAL.stack[2]];
const needsYou = (item: string) => /consent|approv|review/i.test(item);

export function Narrative({ service }: { service: ServicePageContent }) {
  return service.sections.map((section) => {
    if (service.slug === "social-content" && section.heading === "One topic, several useful formats") {
      return <Formats key={section.heading} heading={section.heading} body={section.body} />;
    }
    if (service.slug === "ai-presenter" && section.heading === "Consent comes first") {
      return <Statement key={section.heading} heading={section.heading} body={section.body} />;
    }
    return (
      <section key={section.heading} className="sp-narrative wrap">
        <h2 className="display-m">{section.heading}</h2>
        <p className="sp-narrative-body">{section.body}</p>
      </section>
    );
  });
}

/** The first sentence set large on navy, the rest beneath it. */
function Statement({ heading, body }: { heading: string; body: string }) {
  const [lead, ...rest] = body.split(/(?<=\.)\s+/);
  return (
    <section className="sp-statement" data-tone="dark" aria-labelledby="sp-statement-h">
      <div className="sp-statement__in wrap">
        <h2 id="sp-statement-h" className="label">
          {heading}
        </h2>
        <p className="sp-statement__lead">{lead}</p>
        {rest.length > 0 && <p className="sp-statement__rest">{rest.join(" ")}</p>}
      </div>
    </section>
  );
}

/** One film, then the same topic reframed for phones and cut short, and where each version goes. */
function Formats({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="sp-formats wrap" aria-labelledby="sp-formats-h">
      <div className="sp-formats__copy">
        <h2 id="sp-formats-h" className="display-m">
          {heading}
        </h2>
        <p className="sp-narrative-body">{body}</p>
      </div>
      <div className="sp-formats__stage">
        {SOCIAL.formats.map((f, i) => {
          const media = FORMAT_MEDIA[i];
          if (!media) return null;
          return (
            <figure key={f.format} className="sp-formats__item">
              <div className={i === 0 ? "sp-film notch" : "sp-phone"}>
                <MediaSwap media={media} trigger={i === 0 ? "view" : "hover"} />
              </div>
              <figcaption>
                <b>{f.format}</b> {f.use}
              </figcaption>
            </figure>
          );
        })}
      </div>
      <ul className="sp-formats__channels" aria-label="Where each version goes">
        {SOCIAL.channels.map((c) => (
          <li key={c.name}>
            <span className="sp-formats__name">{c.name}</span>
            <span>{c.what}</span>
            <span className="label">{c.format}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** What is included: cards, or for the AI presenter, the path from recording to film with each sign-off marked. */
export function Included({ service }: { service: ServicePageContent }) {
  if (service.slug !== "ai-presenter") {
    return (
      <section className="sp-section wrap">
        <h2 className="display-m">What is included</h2>
        <ol className="sp-deliverables">
          {service.includes.map((item, i) => (
            <li key={item} className="sp-deliverable notch">
              <span className="sp-deliverable-num">0{i + 1}</span>
              <p className="sp-deliverable-text">{item}</p>
            </li>
          ))}
        </ol>
      </section>
    );
  }
  return (
    <section className="sp-section wrap">
      <div className="sp-path__head">
        <h2 className="display-m">What is included</h2>
        <p className="sp-path__note">From one recording session to a published film. The steps marked “Your sign-off” wait for you.</p>
      </div>
      <ol className="sp-path">
        {service.includes.map((item, i) => (
          <li key={item} className="sp-path__step" data-signoff={needsYou(item) || undefined}>
            <span className="sp-path__num">0{i + 1}</span>
            <p className="sp-path__text">{item}</p>
            {needsYou(item) && <span className="sp-path__gate label">Your sign-off</span>}
          </li>
        ))}
      </ol>
    </section>
  );
}
