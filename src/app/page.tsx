import { WORK } from "@/content/site";
import { FilmHero } from "@/components/FilmHero";
import { WorkCard } from "@/components/WorkCard";

export default function Home() {
  const [lead] = WORK;
  return (
    <>
      <FilmHero />

      <section id="work" className="wrap section work" aria-labelledby="work-h">
        <div className="section__head">
          <p className="label">Selected work</p>
          <h2 id="work-h" className="display-l" data-reveal>
            <span className="line">
              <span>Proof first.</span>
            </span>
            <span className="line">
              <span>
                <em>Then the pitch.</em>
              </span>
            </span>
          </h2>
        </div>
        <WorkCard work={lead} />
      </section>
    </>
  );
}
