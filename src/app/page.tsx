import { SERVICES } from "@/content/site";
import { FilmHero } from "@/components/FilmHero";
import { WorkReel } from "@/components/WorkReel";
import { Formats } from "@/components/Formats";
import { ServiceReel } from "@/components/ServiceReel";
import { ConceptGallery } from "@/components/ConceptGallery";
import { SearchList } from "@/components/SearchList";
import { Process } from "@/components/Process";
import { Voice } from "@/components/Voice";
import { Marquee } from "@/components/Marquee";

export default function Home() {
  return (
    <>
      <FilmHero />
      <WorkReel />
      <Marquee items={SERVICES.map((s) => s.name)} />
      <Formats />
      <ServiceReel />
      <ConceptGallery />
      <SearchList />
      <Process />
      <Voice />
    </>
  );
}
