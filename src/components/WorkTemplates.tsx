import Image from "next/image";
import { TEMPLATES } from "@/content/site";
import { TLink } from "./TLink";

/** The twelve specialty templates as a gallery: each opening screen in a small browser frame. */
export function WorkTemplates() {
  return (
    <section className="wk-section wrap" aria-labelledby="wk-tpl-h">
      <div className="wk-tpl__head">
        <h2 id="wk-tpl-h" className="display-m">
          Twelve specialty <em>templates.</em>
        </h2>
        <p className="wk-tpl__intro">
          Starting points for your own services and content. Each is organised around the conditions you treat, and the page plan is agreed with you.{" "}
          <TLink className="ulink" href="/services/medical-websites">
            About our medical websites
          </TLink>
          .
        </p>
      </div>
      <ol className="wk-tpl">
        {TEMPLATES.map((t, i) => (
          <li key={t.slug} className="wk-tpl__item">
            <div className="wk-tpl__frame notch">
              <div className="chrome" aria-hidden>
                <span />
                <span />
                <span />
              </div>
              <Image src={t.img.webp} alt={`${t.name} template, opening screen`} width={1200} height={724} sizes="(max-width: 640px) 45vw, (max-width: 1100px) 30vw, 22vw" />
            </div>
            <p className="wk-tpl__name">
              <span className="wk-tpl__num">{String(i + 1).padStart(2, "0")}</span> {t.name}
            </p>
            <p className="wk-tpl__line">{t.line}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
