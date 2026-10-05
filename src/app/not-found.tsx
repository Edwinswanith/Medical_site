import { TLink } from "@/components/TLink";

export default function NotFound() {
  return (
    <section className="phero wrap nf">
      <p className="label">404</p>
      <h1 className="display-xl">
        Cut. <em>This page isn&apos;t here.</em>
      </h1>
      <TLink href="/" className="btn btn--outline">Back to the studio</TLink>
    </section>
  );
}
