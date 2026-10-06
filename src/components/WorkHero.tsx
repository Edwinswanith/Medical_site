import { CASE } from "@/content/site";
import { Breadcrumbs } from "./Breadcrumbs";

/** Case study hero copy; the live-site screenshot sits beside it (WorkScreenshot). */
export function WorkHero() {
  return (
    <div className="pg-work__hero editorial-hero">
      <Breadcrumbs
        items={[
          { label: "Home", path: "/" },
          { label: "Work", path: "/work" },
          { label: "Prof. Hemant Sheth project", path: "/work/prof-hemant-sheth" },
        ]}
      />
      <p className="label">Client website project</p>
      <h1 className="display-xl">
        Prof. Hemant Sheth: <em>a specialty website.</em>
      </h1>
      <p className="phero__intro lede">
        {CASE.client}. {CASE.summary}
      </p>
      <a className="arrow-link" href={CASE.live.href} target="_blank" rel="noreferrer">
        Visit the live website <span aria-hidden>↗</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
