import { deliver } from "@/lib/contact";
import { validateEnquiry } from "@/lib/enquiry";

async function boundedText(req: Request) {
  const reader = req.body?.getReader();
  if (!reader) return "";
  const decoder = new TextDecoder();
  let length = 0, text = "";
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 16000) { await reader.cancel(); return null; }
      text += decoder.decode(value, { stream: true });
    }
    return text + decoder.decode();
  } finally { reader.releaseLock(); }
}

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type") || "";
  const native = contentType.startsWith("application/x-www-form-urlencoded") || contentType.startsWith("multipart/form-data");
  const reply = (status: number, state: "sent" | "invalid" | "unavailable", error?: string) => {
    // Native forms use POST/redirect/GET; no personal details are placed in a URL.
    if (native) return new Response(null, { status: 303, headers: { Location: `/contact?enquiry=${state}`, "Cache-Control": "no-store" } });
    return Response.json(error ? { error } : { ok: true }, { status, headers: { "Cache-Control": "no-store" } });
  };
  if (Number(req.headers.get("content-length")) > 16000) return reply(413, "invalid", "Request is too large.");
  let body: unknown;
  try {
    const raw = await boundedText(req);
    if (raw === null) return reply(413, "invalid", "Request is too large.");
    if (native) {
      const form = await new Request(req.url, { method: "POST", headers: { "Content-Type": contentType }, body: raw }).formData();
      body = { ...Object.fromEntries(form), consent: form.get("consent") === "on" };
    } else if (contentType.startsWith("application/json")) body = JSON.parse(raw);
    else return reply(415, "invalid", "Unsupported request format.");
  } catch {
    return reply(400, "invalid", "Invalid request.");
  }
  const result = validateEnquiry(body);
  if (!result.ok) return reply(400, "invalid", result.error);
  const delivery = await deliver(result.enquiry);
  if (delivery.ok) return reply(200, "sent");
  return reply(delivery.reason === "unconfigured" ? 503 : 502, "unavailable", "We couldn't send this online. Please use the email link on our contact page.");
}
