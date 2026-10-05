/*
 * Every fact on the site lives in this file.
 * Company facts are copied from Tech Cogniverse's own content
 * (Website_threadd/src/content, carried over from the previously published site);
 * `source` keeps the original page path. Do not add a claim, client, metric or
 * testimonial that has no source here.
 */

export const BRAND = {
  name: "Tech Cogniverse",
  short: "Cogniverse",
  // Positioning chosen for this site (user decision, 5 Oct 2026), not a published fact.
  offer: "Websites, patient films and AI presenters for doctors and clinics.",
  offerEm: "for doctors and clinics.",
  intro:
    "We make the things a practice needs to be understood: a fast, honest website, films that explain treatment in plain language, and short clips for the places patients actually look.",
  email: "edwinswanith006@gmail.com", // source: /about
  phone: { display: "+91 9003 020 030", tel: "+919003020030" }, // source: /about
  responseTime: "Typically respond within 24 hours", // source: /about
  founders: "Founded by Suhail and Edwin Swanith.", // source: /about
};

export type WorkStatus = "Launched" | "Production-ready MVP" | "Concept";

export type Work = {
  slug: string;
  name: string;
  tagline: string;
  kind: "client" | "product" | "concept";
  status: WorkStatus;
  client?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  liveUrl?: string;
  /** Real screenshot of the live site. Leave empty until the client approves its use. */
  screenshot?: { src: string; alt: string };
  screenshotPending?: boolean;
  source: string;
};

export const WORK: Work[] = [
  {
    slug: "prof-hemant-sheth",
    name: "Prof. Hemant Sheth",
    tagline: "Robotic & laparoscopic surgeon website",
    kind: "client",
    status: "Launched",
    client: "Consultant Upper GI, Laparoscopic & Robotic Surgeon, London & Hertfordshire, UK",
    summary:
      "A fast, search-optimised practice website for a UK consultant surgeon: treatment information, clinic finder and consultation booking.",
    metrics: [
      { value: "15+", label: "Treatment pages" },
      { value: "4", label: "Specialities" },
    ],
    tags: ["Healthcare website", "Consultation booking", "Technical SEO", "Content verification"],
    liveUrl: "https://londonroboticsurgeon.co.uk/",
    screenshotPending: true, // TODO: add /media/work/prof-hemant-sheth.jpg once the client approves
    source: "Website_threadd projects.ts → londonroboticsurgeon.co.uk (project case study)",
  },
];

/** The hero film. AI-generated, so it is always captioned as such. */
export const HERO_FILM = {
  poster: { webp: "/media/film/hero-poster.webp", jpg: "/media/film/hero-poster.jpg" },
  // H.264 for Safari and Chrome; VP9 WebM where H.264 is unavailable (e.g. open-source Chromium).
  sources: {
    large: { mp4: "/media/film/hero-1080.mp4", webm: "/media/film/hero-1080.webm" },
    small: { mp4: "/media/film/hero-720.mp4", webm: "/media/film/hero-720.webm" },
  },
  caption: "Concept film · AI-generated (Veo 3.1) · illustrative, not a clinical diagram",
  alt: "A slow camera move through a calm consultation room towards a monitor showing a heart illustration.",
};

export const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/contact", label: "Start a project" },
];

export const ENQUIRY = {
  needs: ["Practice website", "Patient film", "AI presenter", "Social clips", "Subtitles & dubbing", "Not sure yet"],
  budgets: ["Under £5k", "£5k–£15k", "£15k–£35k", "£35k+", "Not sure yet"], // source: contact form
};
