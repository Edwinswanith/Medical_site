import { AROGYA } from "./site";

/*
 * Project pages beyond the original Prof. Hemant Sheth case (which keeps its own page).
 * Facts come from live-site audits (docs/work/); relationship and scope from the user.
 * Never add results, traffic, rankings or testimonials that are not published and approved.
 */

type Img = { src: string; alt: string; w: number; h: number };

export type Project = {
  slug: string;
  label: string; // the status line under the breadcrumbs and on the card
  chips: string[]; // first chip is drawn as the signal chip
  name: string;
  em: string;
  client: string;
  summary: string;
  live: { label: string; href: string };
  hero: Img; // one screen, for cards and social previews
  page: Img & { srcSmall: string }; // the full page strip that scrolls inside the frame
  peek: string; // how far the frame scrolls on its first look (share of the strip's height)
  gallery: (Img & { caption: string; kind: "phone" | "detail" })[];
  facts: { value: string; label: string }[];
  purpose: { title: string; em: string; body: string[] };
  structure: { title: string; em: string; body: string[] };
  built: string[];
  caveat: string;
  closer: { title: string; em: string; body: string; link: { href: string; label: string } };
  seo: { title: string; description: string };
};

export const PROJECTS: Project[] = [
  {
    // Observed 7 Oct 2026 (docs/work/AROGYA_AUDIT.md). Client project, scope confirmed by the user.
    slug: "arogya-studio",
    label: "Client website project",
    chips: ["Client website", "Live preview"],
    name: "Arogya Studio",
    em: "Ayurveda, skin, soul.",
    client: AROGYA.client,
    summary: AROGYA.summary,
    live: AROGYA.live,
    hero: { src: "/media/work/arogya-hero.webp", alt: "Arogya Studio home page: Ancient wisdom, gently translated for modern life, beside an arched image of a brass bowl of marigolds", w: 1200, h: 750 },
    page: { src: AROGYA.page.webp, srcSmall: AROGYA.page.webpSmall, alt: AROGYA.page.alt, w: AROGYA.page.w, h: AROGYA.page.h },
    peek: "-62%",
    gallery: [
      { kind: "phone", src: AROGYA.phone.webp, alt: AROGYA.phone.alt, w: AROGYA.phone.w, h: AROGYA.phone.h, caption: "On a phone: the same story in one column, with booking kept in reach." },
      { kind: "detail", src: AROGYA.details[0].webp, alt: AROGYA.details[0].alt, w: AROGYA.details[0].w, h: AROGYA.details[0].h, caption: "Treatment cards, each with its starting price." },
      { kind: "detail", src: AROGYA.details[1].webp, alt: AROGYA.details[1].alt, w: AROGYA.details[1].w, h: AROGYA.details[1].h, caption: "The three doshas, leading into a seven-question quiz." },
    ],
    facts: AROGYA.facts,
    purpose: {
      title: "The website's",
      em: "purpose.",
      body: [
        "The website explains Ayurveda for people who may be new to it, sets out every treatment with its duration and price, and keeps booking one tap away on WhatsApp.",
        "Arogya Studio is a wellness practice, not a medical provider, and the site says so in its own footer. CogniVerse Studio delivered the design, build, copy, imagery and local search set-up. The facts below describe what was built; they do not measure bookings, rankings or traffic.",
      ],
    },
    structure: {
      title: "A menu sorted by how you",
      em: "feel.",
      body: [
        "Ten treatment pages sit under one treatments and prices menu. A second route groups treatments by need: sleep and calm, stress relief, glow and energy, and whole-life balance.",
        "For visitors who do not know where to start, a seven-question dosha quiz points them towards treatments, and a practitioner section introduces Dr Priyanka Balachandar and her training.",
      ],
    },
    built: AROGYA.built,
    caveat: "The structured data, crawl rules and sitemap support discovery. They are project deliverables; we have not published measured traffic, ranking or booking results for this project.",
    closer: {
      title: "A useful example for",
      em: "wellness and private practices.",
      body: "If people need a treatment or an approach explained before they book, a site can teach first and sell second. We agree the structure around your services and how your patients actually book.",
      link: { href: "/services/medical-websites", label: "See how our websites are planned" },
    },
    seo: {
      title: "Arogya Studio Ayurvedic wellness website project",
      description: "The website built for Arogya Studio in Colindale: 18 pages, 10 treatment pages, a dosha quiz and WhatsApp booking for a practitioner-led Ayurvedic wellness studio.",
    },
  },
  {
    // Observed 8 Oct 2026 (docs/work/COGNIVERSE_AUDIT.md). Scope confirmed by the user (design, build,
    // copy, imagery). SEO left out: the live site has no robots.txt, sitemap or structured data.
    // Not labelled "client": its footer and phone number match the studio's own; see the audit.
    slug: "cogniverse",
    label: "Healthcare technology website",
    chips: ["Built by CogniVerse Studio", "Live"],
    name: "Cogniverse",
    em: "healthcare in virtual reality.",
    client: "Healthcare technology company, London: Incisio for surgical training in VR, and HalaraXR for behavioural assessment in VR",
    summary: "A single-page product site that explains two VR products in plain English: the problem each one answers, how a session works, and how to book a demo.",
    live: { label: "cogniversetech.com", href: "https://cogniversetech.com/" },
    hero: { src: "/media/work/cogniverse-hero.webp", alt: "Cogniverse home page: Making healthcare easier and more affordable, with a clinician in a VR headset and cards for Incisio and HalaraXR", w: 1200, h: 750 },
    page: { src: "/media/work/cogniverse-page-1200.webp", srcSmall: "/media/work/cogniverse-page-640.webp", alt: "The Cogniverse website, top to bottom: the hero, the problem, Incisio, rehearsing a procedure, the session review, the HalaraXR activity and what the team builds", w: 1200, h: 5065 },
    peek: "-58%",
    gallery: [
      { kind: "phone", src: "/media/work/cogniverse-phone.webp", alt: "The Cogniverse website on a phone: hero, the problem, Incisio and HalaraXR", w: 480, h: 4156, caption: "On a phone: the same story, one product at a time." },
      { kind: "detail", src: "/media/work/cogniverse-review.webp", alt: "The Incisio session review card from the Cogniverse website, marked as sample data, with scores for procedure flow, decision-making and instrument handling", w: 680, h: 520, caption: "How a session is reviewed, shown with sample data." },
      { kind: "detail", src: "/media/work/cogniverse-game.webp", alt: "The HalaraXR attention activity on the Cogniverse website: pop the golden bubbles in a park, marked as a concept visual", w: 900, h: 494, caption: "A HalaraXR activity visitors can try in about 20 seconds." },
    ],
    facts: [
      { value: "2", label: "products explained" },
      { value: "4", label: "steps in an Incisio session" },
      { value: "6", label: "capabilities set out" },
    ],
    purpose: {
      title: "The website's",
      em: "purpose.",
      body: [
        "The website introduces a healthcare technology company with two VR products to the people who would use them: medical students, nurses, surgeons and educators for Incisio; clinicians, educators and special educational needs teams for HalaraXR.",
        "CogniVerse Studio delivered the design, build, copy and imagery. The facts below describe what was built; they do not measure demos booked, traffic or adoption.",
      ],
    },
    structure: {
      title: "One page, two products,",
      em: "one story.",
      body: [
        "The page runs as a single story: the problem in operating theatres and in children's assessments, the answer in virtual reality, then each product in turn.",
        "Incisio is explained as four steps from headset on to feedback. HalaraXR is explained through its activities and the report it produces, with one activity visitors can try. The page closes on the capabilities behind both products and a demo request.",
      ],
    },
    built: [
      "Design and build of one long, scroll-led page with anchored sections for the problem, both products, what the team builds and its track record.",
      "Copy throughout: a four-step walkthrough of an Incisio session, and plain-English explanations of HalaraXR's activities and report.",
      "Imagery: operating-theatre and VR concept visuals, each labelled as a concept visual on the page, and a HalaraXR activity visitors can try.",
      "A demo request form that opens a ready-to-send email, with the company's address, phone and LinkedIn alongside.",
    ],
    caveat: "We have not published traffic, demo or adoption results for this project. Claims on the live site about the company's history and funding are the company's own.",
    closer: {
      title: "A useful example for",
      em: "health technology.",
      body: "If your product needs a clinical audience to understand it quickly, a site can walk them through the problem, the session and the evidence in one story. We agree the structure around your product and your buyers.",
      link: { href: "/services/medical-websites", label: "See how our websites are planned" },
    },
    seo: {
      title: "Cogniverse healthcare VR website project",
      description: "The single-page website built for Cogniverse's VR products, Incisio for surgical training and HalaraXR for behavioural assessment: problem, sessions, activities and demo requests.",
    },
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug);
