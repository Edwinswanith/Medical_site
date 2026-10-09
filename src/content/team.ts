/*
 * Founders, exactly as published at https://airalexo.in/founders (checked 9 Oct 2026):
 * name, area, portrait and LinkedIn profile. Titles at CogniVerse Studio confirmed by the user
 * (9 Oct 2026): Edwin Swanith is the founder, Raghul Senthilnathan the co-founder (the Aira page
 * lists both as co-founders of Aira). The bios on that page describe their roles at Aira, so none
 * are reproduced here. Added at the founders' request (9 Oct 2026).
 * Only these two founders appear on this site.
 */
export type Founder = {
  id: string;
  name: string;
  title: string;
  area: string;
  photo: { src: string; w: number; h: number; alt: string };
  linkedin: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "edwin-swanith",
    name: "Edwin Swanith",
    title: "Founder",
    area: "Technology & Integrations",
    photo: { src: "/media/team/edwin-swanith.webp", w: 600, h: 750, alt: "Portrait of Edwin Swanith, Founder" },
    linkedin: "https://www.linkedin.com/in/edwinswanith/",
  },
  {
    id: "raghul-senthilnathan",
    name: "Raghul Senthilnathan",
    title: "Co-founder",
    area: "Product & Design",
    photo: { src: "/media/team/raghul-senthilnathan.webp", w: 600, h: 942, alt: "Portrait of Raghul Senthilnathan, Co-founder" },
    linkedin: "https://www.linkedin.com/in/raghul-snn/",
  },
];
