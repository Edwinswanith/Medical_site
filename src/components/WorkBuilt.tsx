import { CASE } from "@/content/site";

/** Case study: what was built, one numbered notch card per deliverable, then the results caveat. */
export function WorkBuilt() {
  return (
    <section className="pg-work__built">
      <h2 className="display-m">
        What we <em>built.</em>
      </h2>
      <ol className="pg-work__built-cards">
        {CASE.built.map((line, i) => (
          <li key={line} className="pg-work__built-card notch">
            <span className="pg-work__built-num">0{i + 1}</span>
            <p>{line}</p>
          </li>
        ))}
      </ol>
      <p className="pg-work__caveat">
        The structured content, crawl rules and sitemap support discovery. They are project deliverables; we have not published measured traffic, ranking or enquiry results for this project.
      </p>
    </section>
  );
}
