import { deliver, type Enquiry } from "@/lib/contact";

const LIMITS: Record<keyof Enquiry, number> = {
  name: 120,
  org: 160,
  email: 200,
  phone: 40,
  need: 80,
  budget: 40,
  message: 2000,
};

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill every field.
  if (typeof body.company === "string" && body.company.trim()) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const e = {} as Enquiry;
  for (const k of Object.keys(LIMITS) as (keyof Enquiry)[]) {
    const v = typeof body[k] === "string" ? (body[k] as string).trim() : "";
    if (v.length > LIMITS[k]) return Response.json({ error: `${k} is too long.` }, { status: 400 });
    e[k] = v;
  }
  if (!e.name || !e.email) return Response.json({ error: "Name and email are required." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) {
    return Response.json({ error: "Please check the email address." }, { status: 400 });
  }
  if (e.phone && !/^[+\d][\d\s()-]{6,}$/.test(e.phone)) {
    return Response.json({ error: "Please check the phone number." }, { status: 400 });
  }
  if (body.consent !== true) return Response.json({ error: "Please confirm we may contact you." }, { status: 400 });

  const result = await deliver(e);
  if (result.ok) return Response.json({ ok: true });
  return Response.json({ error: result.reason }, { status: result.reason === "unconfigured" ? 503 : 502 });
}
