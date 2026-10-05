/*
 * Every fact on the site lives in this file.
 * Everything marked PLACEHOLDER must be replaced with the clinic's real details
 * before launch. Do not invent doctors, credentials, numbers or reviews.
 */

export const CLINIC = {
  name: "Meridian", // PLACEHOLDER: clinic name
  fullName: "Meridian Clinic", // PLACEHOLDER
  tagline: "Care that keeps time with you.", // PLACEHOLDER
  intro:
    "A multi-speciality clinic for families and individuals. One team, one record, one place to come back to.", // PLACEHOLDER
  phone: "+00 000 000 0000", // PLACEHOLDER
  emergencyPhone: "", // PLACEHOLDER: leave empty to hide
  email: "hello@example.com", // PLACEHOLDER
  address: ["000 Street Name", "Area, City 000000"], // PLACEHOLDER
  mapUrl: "", // PLACEHOLDER: Google Maps link, empty hides the button
  hours: [
    { days: "Mon to Fri", time: "08:00 to 20:00" }, // PLACEHOLDER
    { days: "Saturday", time: "09:00 to 14:00" }, // PLACEHOLDER
    { days: "Sunday", time: "Closed" }, // PLACEHOLDER
  ],
  social: [] as { label: string; href: string }[], // PLACEHOLDER: e.g. { label: "Instagram", href: "https://..." }
};

export type Service = {
  slug: string;
  name: string;
  short: string;
  body: string;
  includes: string[];
  tone: "mint" | "ink" | "bone";
};

// PLACEHOLDER: replace with the services the clinic actually offers.
export const SERVICES: Service[] = [
  {
    slug: "general-medicine",
    name: "General Medicine",
    short: "Everyday illness, check-ups and the first conversation about anything new.",
    body: "Your first stop for fevers, infections, long-standing conditions and the questions you have been putting off. The doctor who sees you coordinates whatever comes next.",
    includes: ["Consultations", "Chronic condition reviews", "Vaccinations", "Referrals"],
    tone: "mint",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    short: "Heart health, from routine screening to ongoing care.",
    body: "Assessment and follow-up for blood pressure, chest pain, palpitations and known heart conditions, with tests arranged in-house where possible.",
    includes: ["ECG", "Blood pressure management", "Risk screening", "Follow-up plans"],
    tone: "ink",
  },
  {
    slug: "paediatrics",
    name: "Paediatrics",
    short: "Care for babies, children and teenagers.",
    body: "Growth checks, childhood illness, vaccinations and advice for parents, in a setting built to keep children at ease.",
    includes: ["Well-baby checks", "Immunisation schedule", "Childhood illness", "Parent guidance"],
    tone: "bone",
  },
  {
    slug: "womens-health",
    name: "Women's Health",
    short: "Gynaecology and care across every stage of life.",
    body: "Consultations for menstrual health, pregnancy planning, menopause and screening, handled with privacy and time to talk.",
    includes: ["Gynaecology consults", "Antenatal care", "Screening", "Menopause care"],
    tone: "mint",
  },
  {
    slug: "diagnostics",
    name: "Diagnostics",
    short: "Lab tests and imaging, reported back to your doctor.",
    body: "Sample collection and routine tests on site, with results going straight to the doctor who ordered them so nothing falls between the cracks.",
    includes: ["Blood tests", "Urine tests", "ECG", "Imaging referrals"],
    tone: "ink",
  },
  {
    slug: "preventive-health",
    name: "Preventive Health",
    short: "Health checks built around your age and history.",
    body: "Structured check-ups that look for problems early, with a plain-language report and a plan you can follow.",
    includes: ["Annual health checks", "Lifestyle counselling", "Screening packages", "Follow-up review"],
    tone: "bone",
  },
];

// PLACEHOLDER: replace with the real team. Names and roles only, no invented credentials.
export const DOCTORS = [
  { name: "Dr. Name Surname", role: "General Physician", focus: "General Medicine" },
  { name: "Dr. Name Surname", role: "Cardiologist", focus: "Cardiology" },
  { name: "Dr. Name Surname", role: "Paediatrician", focus: "Paediatrics" },
  { name: "Dr. Name Surname", role: "Gynaecologist", focus: "Women's Health" },
];

// How a visit works. Process, not claims, so it is safe to keep as written.
export const JOURNEY = [
  { n: "01", title: "Reach out", body: "Call, or send an enquiry. Tell us what is going on and when suits you." },
  { n: "02", title: "We confirm", body: "The front desk calls back to confirm a time with the right doctor." },
  { n: "03", title: "Your visit", body: "An unhurried consultation. Tests, if needed, are arranged the same day where possible." },
  { n: "04", title: "Follow-up", body: "Results and next steps go back to the same doctor, so your care stays in one place." },
];

// PLACEHOLDER: short values / principles. Edit to match the clinic's voice.
export const PRINCIPLES = [
  { title: "One record", body: "Every visit, test and note lives in one place, read by everyone treating you." },
  { title: "Time to talk", body: "Appointments are scheduled so the doctor can listen first." },
  { title: "Plain language", body: "You leave knowing what was found, what it means and what happens next." },
];

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/doctors", label: "Doctors" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
