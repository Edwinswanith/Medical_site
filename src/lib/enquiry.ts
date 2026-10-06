export type Enquiry = {
  name: string; org: string; email: string; phone: string;
  need: string; budget: string; message: string;
};

export const ENQUIRY_LIMITS: Record<keyof Enquiry, number> = {
  name: 120, org: 160, email: 200, phone: 40, need: 80, budget: 40, message: 2000,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s()-]{6,}$/;

/** One field's problem in plain words, or "" when it is fine. The form shows these as you go; the server applies the same rules. */
export function fieldError(name: string, raw: string): string {
  const value = raw.trim();
  const limit = ENQUIRY_LIMITS[name as keyof Enquiry];
  if (limit && value.length > limit) return `Please keep this under ${limit} characters.`;
  if (name === "name" && !value) return "Please add your name.";
  if (name === "email") return !value ? "Please add your email address." : EMAIL.test(value) ? "" : "Please check the email address.";
  if (name === "phone" && value && !PHONE.test(value)) return "Please check the phone number.";
  return "";
}

export function validateEnquiry(body: unknown): { ok: true; enquiry: Enquiry } | { ok: false; error: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, error: "Invalid request." };
  const values = body as Record<string, unknown>;
  if (values.company) return { ok: false, error: "Invalid request." };
  const enquiry = {} as Enquiry;
  for (const key of Object.keys(ENQUIRY_LIMITS) as (keyof Enquiry)[]) {
    const value = values[key];
    if (value != null && typeof value !== "string") return { ok: false, error: "Invalid request." };
    const trimmed = typeof value === "string" ? value.trim() : "";
    if (trimmed.length > ENQUIRY_LIMITS[key]) return { ok: false, error: `${key} is too long.` };
    enquiry[key] = trimmed;
  }
  if (!enquiry.name || !enquiry.email) return { ok: false, error: "Name and email are required." };
  if (!EMAIL.test(enquiry.email)) return { ok: false, error: "Please check the email address." };
  if (enquiry.phone && !PHONE.test(enquiry.phone)) return { ok: false, error: "Please check the phone number." };
  if (values.consent !== true) return { ok: false, error: "Please confirm we may contact you." };
  return { ok: true, enquiry };
}
