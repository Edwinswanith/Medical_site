/*
 * Every fact on the site lives in this file.
 * Company facts are copied from Tech Cogniverse's own content
 * (Website_threadd/src/content, carried over from the previously published site);
 * `source` keeps the original page path. Do not add a claim, client, metric or
 * testimonial that has no source here. Every AI-generated visual says so on the page.
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

/* ───────────── Media ───────────── */

export type Media = {
  still: { webp: string; jpg: string; w: number; h: number };
  video?: { mp4: string; webm: string };
  alt: string;
  ai: boolean; // AI-generated: captioned on the page
};

const gen = (name: string, w: number, h: number, alt: string): Media => ({
  still: { webp: `/media/gen/${name}.webp`, jpg: `/media/gen/${name}.jpg`, w, h },
  video: { mp4: `/media/gen/${name}.mp4`, webm: `/media/gen/${name}.webm` },
  alt,
  ai: true,
});

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

/* ───────────── Work (real) ───────────── */

export type WorkStatus = "Launched" | "Production-ready MVP";

export type Work = {
  slug: string;
  name: string;
  tagline: string;
  kind: "client" | "product";
  status: WorkStatus;
  client?: string;
  summary: string;
  metrics: { value: string; label: string }[];
  tags: string[];
  liveUrl?: string;
  /** Real screenshot only. Leave empty until it exists and its use is approved. */
  screenshot?: { src: string; alt: string };
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
    // TODO: add a screenshot once the client approves its use.
    source: "Website_threadd projects.ts → londonroboticsurgeon.co.uk (project case study)",
  },
  {
    slug: "mediconsult",
    name: "MediConsult",
    tagline: "AI healthcare platform",
    kind: "product",
    status: "Production-ready MVP",
    summary:
      "Healthcare operations platform for patients and doctors, combining consultation, scheduling, documents, prescriptions, and communication workflows.",
    metrics: [{ value: "2", label: "User groups: patients & doctors" }],
    tags: ["Voice consultations", "Scheduling", "Prescriptions"],
    // TODO: copy doctor-ai-1200.webp from Website_threadd/public/media/work.
    source: "Website_threadd projects.ts → /work/doctor-ai",
  },
  {
    slug: "caption-cc",
    name: "Caption CC",
    tagline: "Subtitles & dubbing for code-switched video",
    kind: "product",
    status: "Production-ready MVP",
    summary:
      "AI media workflow that converts Tamil-English code-switched videos into English subtitles and optional dubbed video output.",
    metrics: [
      { value: "2", label: "Languages bridged" },
      { value: "10 min", label: "Videos handled" },
    ],
    tags: ["Subtitles", "AI dubbing", "Video pipeline"],
    // TODO: copy caption-cc-1200.webp from Website_threadd/public/media/work.
    source: "Website_threadd projects.ts → /work/caption-cc",
  },
];

/* ───────────── One story, three formats ───────────── */

export const FORMATS = {
  vertical: gen("hero-vertical", 720, 1280, "The same consultation-room scene, framed vertically for social video."),
  beats: [
    { n: "01", title: "On the website", body: "The explanation lives on the page patients find first, beside booking." },
    { n: "02", title: "As a patient film", body: "The same story, told properly: paced, captioned, and reviewed by the clinician." },
    { n: "03", title: "As a short clip", body: "Cut down for the feeds and messages where patients actually watch." },
  ],
};

/* ───────────── Services ───────────── */

export type Service = { slug: string; name: string; line: string; media: Media; evidence?: string };

export const SERVICES: Service[] = [
  {
    slug: "websites",
    name: "Practice websites",
    line: "Fast, search-ready sites with booking, treatment pages and a process that keeps unverified claims off the page.",
    media: gen("svc-websites", 1280, 720, "A laptop on a clinic reception desk showing an abstract website layout."),
    evidence: "Delivered: Prof. Hemant Sheth",
  },
  {
    slug: "films",
    name: "Patient films",
    line: "Calm, clear explainers of a treatment or a visit, scripted with you and reviewed before release.",
    media: gen("svc-films", 1280, 720, "A cinema camera set up in a consultation room."),
  },
  {
    slug: "presenters",
    name: "AI presenters",
    line: "A consistent on-screen guide for your content, made only with written consent and always disclosed as AI.",
    media: gen("svc-presenter", 1280, 720, "An AI-generated presenter on an edit-suite monitor. Not a real person."),
  },
  {
    slug: "social",
    name: "Social clips",
    line: "Short vertical cuts of your films for Reels, Shorts and WhatsApp, captioned for sound-off viewing.",
    media: gen("svc-social", 1280, 720, "A phone in a waiting room playing a vertical clip."),
  },
  {
    slug: "subtitles",
    name: "Subtitles & dubbing",
    line: "Accurate subtitles and optional dubbing, including mixed-language speech.",
    media: gen("svc-subtitles", 1280, 720, "A video editing timeline with an audio waveform."),
    evidence: "Built: Caption CC",
  },
];

/* ───────────── Specialty concepts (not client work) ───────────── */

export const CONCEPTS: { name: string; line: string; media: Media }[] = [
  { name: "Cardiology", line: "Explaining a heart procedure before the consultation.", media: gen("concept-cardiology", 720, 1280, "A glowing heart illustration. Concept, AI-generated.") },
  { name: "Dental", line: "What happens at an implant appointment, step by step.", media: gen("concept-dental", 720, 1280, "A tooth model on a stone plinth. Concept, AI-generated.") },
  { name: "Dermatology", line: "Aftercare guidance patients can rewatch at home.", media: gen("concept-dermatology", 720, 1280, "Macro skin texture in raking light. Concept, AI-generated.") },
  { name: "Orthopaedics", line: "Recovery after knee surgery, week by week.", media: gen("concept-orthopaedics", 720, 1280, "A knee joint model on a stone plinth. Concept, AI-generated.") },
];

/* ───────────── Found by search: real deliverables from the Sheth build ───────────── */

export const SEARCH = {
  intro: "No ranking promises. These are the technical pieces we actually ship, as on the Prof. Hemant Sheth site.",
  items: [
    "Server-side rendering and prerendering",
    "A unique title, description, canonical and H1 per page",
    "An automatic sitemap",
    "Physician, MedicalWebPage and FAQPage structured data",
    "Short answer summaries for AI answer engines",
    "Type checks, tests and an SEO audit on every build; a failure stops the release",
  ],
  source: "Website_threadd projects.ts → prof-hemant-sheth, section 'SEO, AEO and GEO'",
};

/* ───────────── Process & proof (source: /process, /about) ───────────── */

export const PROCESS = [
  { step: "01", title: "Scope", body: "20-minute call, then a 2-page proposal. Fixed scope, fixed price, and 50% advance to begin." },
  { step: "02", title: "Build", body: "Demo every Friday. You watch it take shape week by week. No black box." },
  { step: "03", title: "Launch", body: "Deployed, tested, documented, and handed over properly." },
  { step: "04", title: "Grow", body: "Monthly retainer for iterations, fixes, monitoring, and new features after launch." },
];
export const PROCESS_PROMISE = "No hourly billing. No open-ended scope. No disappearing for a month.";

export const TESTIMONIAL = {
  quote:
    "They took our AI note editor from concept to a working product, with visible progress every single week. They build fast, and they build properly.",
  name: "Conroy Brown",
  role: "Intuitive Neurons",
  context: "AI note editor, SaaS MVP. Not a healthcare project.",
};

/* ───────────── Navigation ───────────── */

export const CHAPTERS = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "formats", label: "Formats" },
  { id: "services", label: "Services" },
  { id: "concepts", label: "Concepts" },
  { id: "search", label: "Search" },
  { id: "process", label: "Process" },
];

export const NAV = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/contact", label: "Start a project" },
];

export const ENQUIRY = {
  needs: ["Practice website", "Patient film", "AI presenter", "Social clips", "Subtitles & dubbing", "Not sure yet"],
  budgets: ["Under £5k", "£5k–£15k", "£15k–£35k", "£35k+", "Not sure yet"], // source: contact form
};
