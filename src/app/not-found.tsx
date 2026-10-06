import { NotFoundNav } from "@/components/NotFoundNav";

export default function NotFound() {
  return (
    <section className="phero wrap">
      <p className="label">404</p>
      <h1 className="display-xl">
        Cut. <em>This page isn&apos;t here.</em>
      </h1>
      <NotFoundNav />
    </section>
  );
}
