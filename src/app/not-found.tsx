import { TLink } from "@/components/TLink";

export default function NotFound() {
  return (
    <section className="phero wrap nf">
      <p className="label">404</p>
      <h1 className="display-xl">
        Flatline. <em>This page isn&apos;t here.</em>
      </h1>
      <TLink href="/" className="blob blob--ink">Back to the clinic</TLink>
    </section>
  );
}
