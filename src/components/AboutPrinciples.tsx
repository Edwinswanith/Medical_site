/** Each card is one sentence of the studio's existing clinical and AI policy, nothing added. */
const PRINCIPLES = [
  { title: "Sources named", body: "Scripts are drafted from NHS, NICE and specialist sources for your review. Sources are named on each film." },
  { title: "Your sign-off", body: "Nothing is published without your sign-off." },
  { title: "No patient data", body: "We use no patient data in production." },
  { title: "Consent for clones", body: "Clinician clones require signed consent and carry an on-screen AI-avatar disclosure." },
];

/** About: clinical content and AI disclosure, as four notch cards and a note on the concept footage. */
export function AboutPrinciples() {
  return (
    <section className="pg-principles wrap">
      <h2 className="display-m">
        Clinical content and <em>AI disclosure.</em>
      </h2>
      <ul className="pg-principles__grid">
        {PRINCIPLES.map((p, i) => (
          <li key={p.title} className="pg-principles__card notch">
            <span className="pg-principles__n label">0{i + 1}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </li>
        ))}
      </ul>
      <p className="pg-principles__note">The AI-generated concept footage on this website illustrates the approach. It is labelled separately from our approved client website work.</p>
    </section>
  );
}
