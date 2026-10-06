import { CASE } from "@/content/site";

/**
 * Case study facts: large display numbers showing project scope.
 */
export function WorkFacts() {
  return (
    <div className="pg-work__facts">
      {CASE.facts.map((fact) => (
        <div key={fact.label} className="pg-work__fact">
          <div className="pg-work__fact-value">{fact.value}</div>
          <div className="pg-work__fact-label">{fact.label}</div>
        </div>
      ))}
    </div>
  );
}
