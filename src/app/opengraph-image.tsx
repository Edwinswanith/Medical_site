import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND } from "@/content/site";

export const alt = `${BRAND.name}: websites, patient films and AI presenters for clinicians`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card for LinkedIn, WhatsApp, Slack and search previews, set in the site's display face.
export default async function OpenGraphImage() {
  const display = await readFile(join(process.cwd(), "assets/fonts/archivo-800-extra-condensed.ttf"));
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f4f2ec", color: "#15181a", fontFamily: "Archivo", textTransform: "uppercase" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
          <svg width="52" height="52" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="9" fill="#15181a" />
            <path d="M13 10.5v11l9-5.5z" fill="#f2461e" />
          </svg>
          {BRAND.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.92 }}>
          <span>Websites,</span>
          <span>patient films</span>
          <span>and AI presenters</span>
          <span style={{ color: "#b8300f" }}>for your practice.</span>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#f2461e" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: display, weight: 800, style: "normal" }] },
  );
}
