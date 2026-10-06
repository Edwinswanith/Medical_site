import { TLink } from "./TLink";

/**
 * 404 page: navigation to useful next steps.
 * Links to service pages, case study, contact, and home.
 */
export function NotFoundNav() {
  const nextSteps = [
    {
      label: "Services",
      title: "Explore services",
      href: "/services/medical-websites",
    },
    {
      label: "Our work",
      title: "See the case study",
      href: "/work/prof-hemant-sheth",
    },
    {
      label: "Contact",
      title: "Book a call",
      href: "/contact",
    },
    {
      label: "Home",
      title: "Back to start",
      href: "/",
    },
  ];

  return (
    <nav className="pg-nf__nav" aria-label="Suggested pages">
      {nextSteps.map((step) => (
        <TLink key={step.href} href={step.href} className="pg-nf__nav-item notch">
          <div className="pg-nf__nav-label">{step.label}</div>
          <div className="pg-nf__nav-title">{step.title}</div>
        </TLink>
      ))}
    </nav>
  );
}
