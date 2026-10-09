/*
 * Every fact on the site lives in this file.
 *
 * Sources:
 *  - Tech Cogniverse records (Website_threadd/src/content, carried over from the previously published site)
 *  - Plainsight Medical (plainsight-medical.vercel.app), a studio of CogniVerse: wording, section order,
 *    the 12 specialty templates and the Prof. Hemant Sheth case study.
 *
 * Approved for this site (user, 5 Oct 2026): the Prof. Sheth website case study, the specialty
 * templates, the package wording, and the numbers "16 films ready" and "75 topics across 14 specialties".
 * NOT approved: Plainsight's films, the HeartLink case, Dr Harmandeep Singh's AI presenter footage,
 * and the library films. Do not add them without a new approval.
 * Every AI-generated visual says so on the page.
 */

export const BRAND = {
  name: "CogniVerse Studio", // brand kit tokens v1.1 (user, 5 Oct 2026)
  short: "CogniVerse",
  legalName: "CogniVerse Ltd", // footer copyright (user, 5 Oct 2026)
  logo: "CogniVerse Studio",
  domain: "cogniversestudio.com", // user, 5 Oct 2026
  email: "info@cogniversestudio.com", // user, 5 Oct 2026
  phone: { display: "+44 (0)7436 194150", tel: "+447436194150" }, // user, 5 Oct 2026
  responseTime: "Typically respond within 24 hours", // Tech Cogniverse /about
  // UK company websites must show these (Companies Act trading disclosures). Awaiting the
  // details from the user; the footer shows them once they are filled in.
  registration: null as null | { number: string; place: string; office: string },
};

/* ───────────── Search and sharing ───────────── */

// Titles and descriptions per page. Each one restates what is visible on that page, nothing more.
export const SEO = {
  home: {
    title: "Websites and patient films for UK clinicians",
    description:
      "Websites, patient education films, AI presenters and social content for clinicians and practices across the UK. Explore our services and real website work.",
  },
  privacy: {
    title: "Privacy notice",
    description:
      "How CogniVerse Studio uses business enquiry details, what this website collects, its cookie policy and how to contact us about your privacy rights.",
  },
  about: {
    title: "About our healthcare media studio",
    description:
      "CogniVerse Studio works with clinicians across the UK on websites, patient films and social content. See our approval process and the Prof. Hemant Sheth project.",
  },
  work: {
    title: "Healthcare website work and specialty templates",
    description:
      "Websites we built for Prof. Hemant Sheth, Arogya Studio and Cogniverse, and the 12 specialty templates we use as starting points for UK clinicians and practices.",
  },
  services: {
    title: "Healthcare websites, films and social content UK",
    description:
      "Explore CogniVerse Studio's medical websites, patient education films, consent-based AI presenters and social content for UK consultants and private practices.",
  },
  project: {
    title: "Prof. Hemant Sheth consultant website project",
    description:
      "Explore the consultant website built for Prof. Hemant Sheth: 22 pages, 10 procedure guides, four treatment groups and a clear route through his surgical services.",
  },
  contact: {
    title: "Book a call about your practice",
    description:
      "Tell us about your practice: your specialty, what you have today and your timelines. We reply with questions or a short proposal, typically within 24 hours.",
  },
};

/* ───────────── Media ───────────── */

export type Media = {
  still: { webp: string; jpg: string; w: number; h: number };
  video?: { mp4: string; webm: string };
  alt: string;
  ai: boolean;
};

const gen = (name: string, w: number, h: number, alt: string): Media => ({
  still: { webp: `/media/gen/${name}.webp`, jpg: `/media/gen/${name}.jpg`, w, h },
  video: { mp4: `/media/gen/${name}.mp4`, webm: `/media/gen/${name}.webm` },
  alt,
  ai: true,
});

export const HERO_FILM = {
  poster: { webp: "/media/film/hero-poster.webp", jpg: "/media/film/hero-poster.jpg" },
  sources: {
    large: { mp4: "/media/film/hero-1080.mp4", webm: "/media/film/hero-1080.webm" },
    small: { mp4: "/media/film/hero-720.mp4", webm: "/media/film/hero-720.webm" },
    phone: { mp4: "/media/film/hero-480.mp4", webm: "/media/film/hero-480.webm" }, // ~0.4 MB, for touch devices
  },
  vertical: gen("hero-vertical", 720, 1280, "The same scene framed vertically for social video."),
};

/* ───────────── 1. Hero (Plainsight wording) ───────────── */

export const HERO = {
  kicker: ["Websites", "Patient films", "AI presenter", "Social"],
  titleA: "Your practice’s",
  titleB: "media",
  titleEm: "partner.",
  intro:
    "CogniVerse Studio makes websites, patient education films, consent-based AI presenters and social content for clinicians and practices across the UK. One partner for your website and content for Instagram, TikTok, YouTube and Facebook.",
};

/* ───────────── 2. What we do ───────────── */

// Words wrapped in *asterisks* are set in upright serif capitals, the way On Track mixes its type.
export const STATEMENT = "One partner for *everything* your patients *see.* Websites, films *and* shorts, *made* to be *found* and *trusted.*";

// Small cards under the hero title. Only approved facts.
export const HERO_STATS = [
  { label: "Specialty templates", value: "12" },
  { label: "Films ready", value: "16" },
  { label: "Topics", value: "75 · 14 specialties" },
];

// Interlude collage: real template screenshots plus labelled concept stills, drifting at different speeds.
export const COLLAGE = {
  quote: "Your time is one call, one recording session, and two reviews per film.",
  quoteEm: "We do the rest.",
  items: [
    { src: "/media/templates/neurology.webp", alt: "", speed: -0.3, x: 2, y: 4, w: 26 },
    { src: "/media/gen/svc-films.webp", alt: "", speed: 0.4, x: 31, y: 2, w: 17 },
    { src: "/media/templates/orthopaedics.webp", alt: "", speed: -0.12, x: 66, y: 6, w: 30 },
    { src: "/media/gen/concept-dental.webp", alt: "", speed: 0.55, x: 51, y: 22, w: 10 },
    { src: "/media/templates/respiratory.webp", alt: "", speed: 0.22, x: 6, y: 36, w: 18 },
    { src: "/media/gen/svc-presenter.webp", alt: "", speed: -0.45, x: 78, y: 40, w: 19 },
    { src: "/media/templates/ophthalmology.webp", alt: "", speed: 0.3, x: 4, y: 66, w: 24 },
    { src: "/media/gen/concept-cardiology.webp", alt: "", speed: -0.25, x: 33, y: 70, w: 11 },
    { src: "/media/templates/private-gp.webp", alt: "", speed: 0.12, x: 50, y: 74, w: 22 },
    { src: "/media/gen/svc-subtitles.webp", alt: "", speed: -0.35, x: 77, y: 72, w: 20 },
  ],
};

export const SERVICES = [
  {
    id: "websites",
    name: "Websites",
    line: "Built for your specialty, and built to be found: on Google, and by the AI assistants patients now ask.",
    media: gen("svc-websites", 1280, 720, "A laptop on a clinic reception desk showing an abstract website."),
    href: "/services/medical-websites",
  },
  {
    id: "films",
    name: "Patient films",
    line: "Two to three minutes in plain English, embedded on the page where the patient needs them.",
    media: gen("svc-films", 1280, 720, "A cinema camera set up in a consultation room."),
    href: "/services/patient-films",
  },
  {
    id: "presenter",
    name: "Your AI presenter",
    line: "An AI clone of you presents each film with your own face and voice, from one recording session.",
    media: gen("svc-presenter", 1280, 720, "An AI-generated presenter on a monitor. Not a real person."),
    href: "/services/ai-presenter",
  },
  {
    id: "social",
    name: "Social content",
    line: "Every film cut into shorts, and your channels managed across Instagram, TikTok, YouTube and Facebook.",
    media: gen("svc-social", 1280, 720, "A phone in a waiting room playing a vertical clip."),
    href: "/services/social-content",
  },
];

/* ───────────── 3. Websites that get found: the 12 approved templates ───────────── */

export const TEMPLATES = [
  { slug: "cardiology", name: "Cardiology", line: "Clear answers about your heart." },
  { slug: "orthopaedics", name: "Orthopaedics", line: "Back to the things you love doing." },
  { slug: "neurology", name: "Neurology", line: "Understanding what your symptoms mean." },
  { slug: "ophthalmology", name: "Ophthalmology", line: "See clearly again." },
  { slug: "respiratory", name: "Respiratory", line: "Breathe easier." },
  { slug: "upper-gi-hpb", name: "Upper GI & HPB", line: "Keyhole surgery, clearly explained." },
  { slug: "urology", name: "Urology", line: "Straight answers, in confidence." },
  { slug: "colorectal", name: "Colorectal", line: "Bowel symptoms, taken seriously." },
  { slug: "spinal-surgery", name: "Spinal", line: "Back pain, properly assessed." },
  { slug: "ent-maxillofacial", name: "ENT & maxillofacial", line: "Ear, nose and throat care for all ages." },
  { slug: "hand-and-wrist", name: "Hand & wrist", line: "Your hands, working again." },
  { slug: "private-gp", name: "Private GP", line: "Time with a doctor who knows you." },
].map((t) => ({ ...t, img: { webp: `/media/templates/${t.slug}.webp`, jpg: `/media/templates/${t.slug}.jpg` } }));

/* ───────────── 4. Found by AI assistants ───────────── */

export const GEO = {
  title: "Help search engines and AI assistants",
  titleEm: "read, check and quote.",
  intro:
    "GEO means generative engine optimisation: making your practice easier for search and answer systems to understand, retrieve and verify. Readable pages and clear facts support discovery; they cannot guarantee rankings or recommendations from Google, ChatGPT, Gemini or Perplexity.",
  pillars: [
    { name: "Readable", body: "Every film ships with its full transcript, so what you say on screen exists as text an assistant can read." },
    { name: "Checkable", body: "Your GMC number, appointments and hospitals stated once, consistently, with the sources behind each page named." },
    { name: "Structured", body: "Markup that tells a machine this is a physician, this is a procedure, this is a film and how long it runs." },
    { name: "Open", body: "Crawl rules that let AI search assistants read your site, rather than blocking them by default." },
    { name: "Watched", body: "A regular check of what Google and the main assistants actually say when asked about you." },
  ],
  demo: {
    ask: "Is it normal for my knee to feel stiff after a knee replacement?",
    answer: "Yes. Stiffness and swelling are common in the first weeks after a knee replacement, and usually ease with your exercises.",
    cite: "yourname.co.uk · Recovery after knee replacement: film and transcript",
  },
  // Further patient questions for the picker. Illustrations of the format, not
  // medical advice: general wording, to be approved like any patient copy.
  more: [
    {
      ask: "What happens at a first cardiology appointment?",
      answer: "Usually a conversation about your symptoms and history, an examination, and sometimes a test such as an ECG. Your consultant then explains the next steps.",
      cite: "yourname.co.uk · Your first appointment: film and transcript",
    },
    {
      ask: "Will I be awake during cataract surgery?",
      answer: "Usually, yes. Most cataract operations use local anaesthetic, so you stay awake but should not feel pain. Your surgeon talks you through it beforehand.",
      cite: "yourname.co.uk · Cataract surgery, step by step: film and transcript",
    },
  ],
};

/* ───────────── 5. Films: approved numbers + concept footage ───────────── */

export const NUMBERS = [
  { value: "16", label: "films ready", media: gen("concept-cardiology", 720, 1280, "Concept still, AI-generated.") },
  { value: "75", label: "topics across 14 specialties", media: gen("concept-orthopaedics", 720, 1280, "Concept still, AI-generated.") },
  { value: "Any", label: "topic made to order", media: gen("concept-dental", 720, 1280, "Concept still, AI-generated.") },
];

export const TILES = [
  { title: "Explaining a heart procedure", tag: "Cardiology", media: gen("concept-cardiology", 720, 1280, "Concept, AI-generated.") },
  { title: "Recovery after knee surgery", tag: "Orthopaedics", media: gen("concept-orthopaedics", 720, 1280, "Concept, AI-generated.") },
  { title: "An implant appointment", tag: "Dental", media: gen("concept-dental", 720, 1280, "Concept, AI-generated.") },
  { title: "Aftercare at home", tag: "Dermatology", media: gen("concept-dermatology", 720, 1280, "Concept, AI-generated.") },
  { title: "From the consultation room", tag: "Production", media: gen("hero-vertical", 720, 1280, "Concept, AI-generated.") },
  { title: "On set with your team", tag: "Filming", media: gen("svc-films", 1280, 720, "Concept, AI-generated.") },
  { title: "Cut for the feed", tag: "Shorts", media: gen("svc-social", 1280, 720, "Concept, AI-generated.") },
  { title: "Subtitles and dubbing", tag: "Post", media: gen("svc-subtitles", 1280, 720, "Concept, AI-generated.") },
];

export const FILMS = {
  title: "Two to three minutes, in plain",
  titleEm: "English.",
  intro:
    "Patient films scripted from NHS and NICE guidance and signed off by the clinician. They sit inside your website, on the page where the patient needs them.",
  note: "Footage on this page is AI-generated concept work. Client films are shown on request.",
  reel: [
    { title: "Explaining a heart procedure", tag: "Cardiology", media: gen("concept-cardiology", 720, 1280, "Glowing heart illustration. Concept, AI-generated.") },
    { title: "Recovery after knee surgery", tag: "Orthopaedics", media: gen("concept-orthopaedics", 720, 1280, "Knee joint model. Concept, AI-generated.") },
    { title: "What happens at an implant appointment", tag: "Dental", media: gen("concept-dental", 720, 1280, "Tooth model. Concept, AI-generated.") },
    { title: "Aftercare you can rewatch at home", tag: "Dermatology", media: gen("concept-dermatology", 720, 1280, "Skin texture in raking light. Concept, AI-generated.") },
    { title: "From consultation room to film", tag: "Production", media: gen("hero-vertical", 720, 1280, "Consultation room. Concept, AI-generated.") },
  ],
};

/* ───────────── 6. AI presenter ───────────── */

export const PRESENTER = {
  title: "Presented by you, in your",
  titleEm: "own voice.",
  intro:
    "We create an AI clone of you. It appears on camera and narrates the whole film in your voice, so patients meet the consultant they are about to see.",
  steps: [
    { name: "Consent first", body: "You sign a consent form before anything is recorded." },
    { name: "One recording session", body: "A single short session captures your face and your voice." },
    { name: "You approve every word", body: "Your clone only speaks scripts you have reviewed and signed off." },
  ],
  disclosure:
    "Each film says on screen that it is presented by an AI avatar. Your face and voice stay yours, and the clone is deleted on request.",
  media: gen("svc-presenter", 1280, 720, "An AI-generated presenter. Not a real person or a client."),
};

/* ───────────── 7. Every platform ───────────── */

export const SOCIAL = {
  title: "Not just your website. Every",
  titleEm: "platform.",
  intro:
    "Each film is cut into vertical shorts, and we manage your patient-education content across Instagram, TikTok, YouTube and Facebook, so every channel carries the same clinically approved message.",
  channels: [
    { name: "Instagram", what: "Reels and Stories", format: "9:16" },
    { name: "TikTok", what: "Shorts with an opening hook", format: "9:16" },
    { name: "YouTube", what: "The full film, plus Shorts", format: "16:9 · 9:16" },
    { name: "Facebook", what: "The full film, plus Reels", format: "16:9 · 9:16" },
  ],
  // The social-content page's formats section: each version and where it goes, restating the
  // approved copy in services.ts (social-content sections).
  formats: [
    { format: "16:9", use: "The full film, for your website or YouTube channel" },
    { format: "9:16", use: "Reframed for Reels, Stories and Shorts" },
    { format: "30–60 s", use: "Shorts that introduce the topic" },
  ],
  promises: [
    "Every film reframed for vertical viewing and cut into shorts of 30 to 60 seconds.",
    "Captions burned in for silent viewing, with your logo and colours.",
    "A posting plan agreed with you, and nothing published without your sign-off.",
  ],
  stack: [
    gen("hero-vertical", 720, 1280, "Vertical concept clip, AI-generated."),
    gen("concept-cardiology", 720, 1280, "Vertical concept clip, AI-generated."),
    gen("concept-orthopaedics", 720, 1280, "Vertical concept clip, AI-generated."),
    gen("concept-dental", 720, 1280, "Vertical concept clip, AI-generated."),
  ],
};

/* ───────────── 8. Work (approved case only) ───────────── */

export const CASE = {
  name: "Prof. Hemant Sheth",
  em: "robotic surgeon.",
  client: "Consultant Upper GI, Laparoscopic & Hepatobiliary Surgeon, London and Hertfordshire",
  summary:
    "A website that explains what he does in the terms patients search for, organised by operation and designed around clear patient journeys.",
  live: { label: "londonroboticsurgeon.co.uk", href: "https://londonroboticsurgeon.co.uk/" },
  shot: { webp: "/media/work/sheth-home.webp", jpg: "/media/work/sheth-home.jpg", w: 1200, h: 1250, alt: "Home page of Prof. Hemant Sheth’s website" },
  facts: [
    { value: "22", label: "pages" },
    { value: "10", label: "procedure guides" },
    { value: "4", label: "treatment groups" },
  ],
  built: [
    "A treatment directory in four groups: upper GI, hepatobiliary, hernia and appendicectomy.",
    "A robotic surgery explainer, with a comparison page for patients weighing up their options.",
    "Structured data, an llms.txt file, crawl rules that welcome AI crawlers, and an XML sitemap.",
  ],
  source: "Plainsight /work/prof-hemant-sheth; Tech Cogniverse projects.ts",
};

// Second case. Site facts observed on the live site, 7 Oct 2026 (docs/work/AROGYA_AUDIT.md).
// Client relationship and scope (design, build, copy, imagery, SEO) confirmed by the user, 7 Oct 2026.
// A wellness practice, not a medical provider: its own footer says its treatments are not medical treatment.
export const AROGYA = {
  name: "Arogya Studio,",
  em: "Ayurveda, skin, soul.",
  client: "Ayurvedic wellness studio run by Dr Priyanka Balachandar, Colindale, North West London",
  summary:
    "A calm, practitioner-led site that explains Ayurveda in plain English, sets out every treatment with its price, and leads to a booking on WhatsApp.",
  live: { label: "arogya-studio-preview.vercel.app", href: "https://arogya-studio-preview.vercel.app/" },
  page: {
    webp: "/media/work/arogya-page-1200.webp",
    webpSmall: "/media/work/arogya-page-640.webp",
    jpg: "/media/work/arogya-page.jpg",
    w: 1200,
    h: 5092,
    alt: "Arogya Studio home page, top to bottom: the hero, What is Ayurveda, the treatment cards, the three doshas, Dr Priyanka and membership",
  },
  phone: { webp: "/media/work/arogya-phone.webp", jpg: "/media/work/arogya-phone.jpg", w: 480, h: 5195, alt: "Arogya Studio on a phone: hero, Ayurveda, treatments, doshas and practitioner" },
  details: [
    { key: "rail", webp: "/media/work/arogya-rail.webp", jpg: "/media/work/arogya-rail.jpg", w: 1000, h: 399, alt: "Treatment cards from the Arogya Studio site: head spa, Shiroabhyanga head massage and Shirodhara, each with its starting price" },
    { key: "dosha", webp: "/media/work/arogya-dosha.webp", jpg: "/media/work/arogya-dosha.jpg", w: 900, h: 330, alt: "The three dosha cards on the Arogya Studio site: Vata, Pitta and Kapha" },
  ],
  facts: [
    { value: "18", label: "pages" },
    { value: "10", label: "treatment pages" },
    { value: "7", label: "dosha quiz questions" },
  ],
  built: [
    "Design, build and copy for an 18-page site: ten treatment pages, a treatments and prices menu, membership, gift vouchers and a dosha quiz.",
    "Imagery throughout: warm still lifes and treatment scenes, set under the arched frames that run through the site.",
    "Local search for Colindale: day spa and FAQ structured data, an XML sitemap, open crawl rules, and WhatsApp booking kept in reach.",
  ],
};

/* ───────────── 9. How it works ───────────── */

export const PROCESS = {
  title: "You approve. We do",
  titleEm: "the rest.",
  intro: "Your time is one call, one recording session if you want an AI presenter, and two reviews per film: the script, then the final cut.",
  steps: [
    { n: "01", name: "A short call", body: "We learn your specialty, your patients and the procedures you explain most often." },
    { n: "02", name: "A plan", body: "The pages, the film topics and the channels, agreed together as one batch." },
    { n: "03", name: "Scripts and design", body: "Scripts are drafted from NHS, NICE and specialist sources. You review them once and sign them off." },
    { n: "04", name: "Production", body: "We build the site, make the films and, if you want one, record your AI presenter." },
    { n: "05", name: "Sign-off and launch", body: "You approve the final films and pages. Then we publish, and keep your channels supplied." },
  ],
  safeguards: ["Sources named on every film", "Nothing published without your sign-off", "No patient data, ever", "An AI clone only with signed consent"],
};

/* ───────────── 10. Three ways to begin ───────────── */

export const PACKAGES = [
  {
    n: "Option 01",
    name: "Films for your site",
    fit: "You already have a website you are happy with.",
    items: ["A batch of films on the procedures you explain most", "Each as a 16:9 master, a 9:16 vertical and a short", "Transcript and markup for your web team to add"],
  },
  {
    n: "Most complete start",
    name: "Website with films",
    fit: "You want a site that patients and AI assistants can find.",
    items: ["A website built for search and your specialty", "A film embedded on each agreed procedure page", "Structured data, transcripts and an XML sitemap built in"],
    featured: true,
  },
  {
    n: "Option 03",
    name: "Full media partner",
    fit: "You want all of it handled, and kept going.",
    items: ["Website and film library", "Your AI presenter, in your own voice", "Shorts and channels managed across four platforms"],
  },
];

/* ───────────── Navigation ───────────── */

export const CHAPTERS = [
  { id: "intro", label: "Intro" },
  { id: "services", label: "Services" },
  { id: "work", label: "Work" },
  { id: "websites", label: "Websites" },
  { id: "geo", label: "Found" },
  { id: "films", label: "Films" },
  { id: "presenter", label: "Presenter" },
  { id: "social", label: "Social" },
  { id: "process", label: "Process" },
  { id: "begin", label: "Begin" },
];

export const NAV = [
  { href: "/work", label: "Work" },
  { href: "/services/medical-websites", label: "Websites" },
  { href: "/services/patient-films", label: "Films" },
  { href: "/services/ai-presenter", label: "AI presenter" },
  { href: "/services/social-content", label: "Social" },
];

export const ENQUIRY = {
  needs: ["Films for my site", "Website with films", "Full media partner", "AI presenter", "Not sure yet"],
  budgets: ["Under £5k", "£5k–£15k", "£15k–£35k", "£35k+", "Not sure yet"], // Tech Cogniverse contact form
};
