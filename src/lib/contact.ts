import "server-only";

export type Enquiry = {
  name: string;
  org: string;
  email: string;
  phone: string;
  need: string;
  budget: string;
  message: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: "unconfigured" | "failed" };

const text = (e: Enquiry) =>
  [
    `Name: ${e.name}`,
    `Organisation: ${e.org || "(none)"}`,
    `Email: ${e.email}`,
    `Phone: ${e.phone || "(none)"}`,
    `Need: ${e.need || "(not chosen)"}`,
    `Budget: ${e.budget || "(not chosen)"}`,
    "",
    e.message || "(no message)",
  ].join("\n");

/**
 * Sends an enquiry through whichever provider the environment names.
 * Only a real 2xx from the provider counts as delivered.
 */
export async function deliver(e: Enquiry): Promise<DeliveryResult> {
  const provider = process.env.CONTACT_PROVIDER;

  try {
    if (provider === "resend") {
      const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
      if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return { ok: false, reason: "unconfigured" };
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM,
          to: CONTACT_TO.split(",").map((s) => s.trim()),
          reply_to: e.email,
          subject: `Project enquiry: ${e.name}${e.org ? ` (${e.org})` : ""}`,
          text: text(e),
        }),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    }

    if (provider === "webhook") {
      const url = process.env.CONTACT_WEBHOOK_URL;
      if (!url) return { ok: false, reason: "unconfigured" };
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...e, text: text(e), receivedAt: new Date().toISOString() }),
      });
      return res.ok ? { ok: true } : { ok: false, reason: "failed" };
    }
  } catch {
    return { ok: false, reason: "failed" };
  }

  return { ok: false, reason: "unconfigured" };
}
