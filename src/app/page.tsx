import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Templates } from "@/components/Templates";
import { Collage } from "@/components/Collage";
import { Geo } from "@/components/Geo";
import { Numbers } from "@/components/Numbers";
import { FilmGrid } from "@/components/FilmGrid";
import { Presenter } from "@/components/Presenter";
import { Social } from "@/components/Social";
import { Case } from "@/components/Case";
import { Process } from "@/components/Process";
import { Packages } from "@/components/Packages";

// Section order follows Plainsight; the motion and visual language follow On Track.
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Templates />
      <Collage />
      <Geo />
      <Numbers />
      <FilmGrid />
      <Presenter />
      <Social />
      <Case />
      <Process />
      <Packages />
    </>
  );
}
