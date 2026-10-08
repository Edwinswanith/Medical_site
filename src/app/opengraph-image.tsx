import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { BRAND } from "@/content/site";
import { SOCIAL_IMAGE } from "@/lib/social-image";

export const alt = SOCIAL_IMAGE.alt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The share card for LinkedIn, WhatsApp, Slack and search previews, set in the site's display face.
export default async function OpenGraphImage() {
  const display = await readFile(join(process.cwd(), "assets/fonts/archivo-800-extra-condensed.ttf"));
  const icon = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/studio-icon.png"))).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "#f5f8fc", color: "#0b1830", fontFamily: "Archivo", textTransform: "uppercase" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34 }}>
          {/* ImageResponse renders embedded pixels; next/image is unavailable in this renderer. */}
          <img src={icon} width={60} height={60} alt="" />
          {BRAND.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 96, lineHeight: 0.92 }}>
          <span>Websites,</span>
          <span>patient films</span>
          <span>and AI presenters</span>
          <span style={{ color: "#0066b8" }}>for your practice.</span>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "linear-gradient(160deg, #03f5d3 0%, #02e3e4 38%, #0299fa 100%)" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Archivo", data: display, weight: 800, style: "normal" }] },
  );
}
