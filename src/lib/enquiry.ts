export type Enquiry = {
  name: string; org: string; email: string; phone: string;
  need: string; budget: string; message: string;
};

export const ENQUIRY_LIMITS: Record<keyof Enquiry, number> = {
  name: 120, org: 160, email: 200, phone: 40, need: 80, budget: 40, message: 2000,
};

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
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) return { ok: false, error: "Please check the email address." };
  if (enquiry.phone && !/^[+\d][\d\s()-]{6,}$/.test(enquiry.phone)) return { ok: false, error: "Please check the phone number." };
  if (values.consent !== true) return { ok: false, error: "Please confirm we may contact you." };
  return { ok: true, enquiry };
}
