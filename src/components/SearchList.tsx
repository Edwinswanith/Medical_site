import { SEARCH } from "@/content/site";

/** Scene 6. Concrete technical deliverables, not ranking promises. */
export function SearchList() {
  return (
    <section id="search" className="se wrap section" data-chapter="Search" aria-labelledby="se-h">
      <div className="se__head">
        <p className="label">Built to be found</p>
        <h2 id="se-h" className="display-l" data-reveal>
          <span className="line">
            <span>Found by</span>
          </span>
          <span className="line">
            <span>
              <em>patients.</em>
            </span>
          </span>
        </h2>
        <p className="se__intro">{SEARCH.intro}</p>
      </div>
      <ol className="se__list">
        {SEARCH.items.map((item, i) => (
          <li key={item} data-reveal style={{ ["--i" as string]: i }}>
            <span className="se__n">0{i + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
