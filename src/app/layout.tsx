import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { BRAND, HERO } from "@/content/site";
import { Motion } from "@/components/Motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import { ChapterRail } from "@/components/ChapterRail";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${BRAND.name}: your practice’s media partner`, template: `%s · ${BRAND.name}` },
  description: HERO.intro,
};

export const viewport: Viewport = { themeColor: "#0e0f0f" };

// Runs before paint: marks JS as available and skips the intro for return visits.
// Safety net: if the app bundle never runs, reveal everything after 5 s anyway.
const boot = `(function(){var d=document.documentElement,o=function(){d.dataset.ready="";d.dataset.introDone=""};d.dataset.js="";try{if(sessionStorage.getItem("seen-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)o()}catch(e){}setTimeout(o,5000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Motion>
          <Preloader name={BRAND.short} />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <ChapterRail />
        </Motion>
        <Cursor />
      </body>
    </html>
  );
}
