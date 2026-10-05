import { Split } from "./Split";

/** Opening block for inner pages: a label, a large two-line title and an intro. */
export function PageHero({
  label,
  title,
  em,
  intro,
  children,
}: {
  label: string;
  title: string;
  em?: string;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="phero wrap">
      <p className="label phero__label">{label}</p>
      <Split as="h1" className="display-xl" text={title} em={em} />
      {intro && <p className="phero__intro lede" data-reveal>{intro}</p>}
      {children}
      <svg className="phero__trace" viewBox="0 0 1200 60" preserveAspectRatio="none" aria-hidden>
        <path d="M0 30 H520 L540 22 L556 30 L570 30 L582 4 L596 56 L606 30 L650 30 L668 18 L688 30 H1200" pathLength={1} />
      </svg>
    </section>
  );
}
