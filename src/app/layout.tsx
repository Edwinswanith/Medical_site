import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { BRAND, SEO } from "@/content/site";
import { SITE_URL } from "@/lib/site-url";
import { SiteJsonLd } from "@/components/JsonLd";
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
  metadataBase: new URL(SITE_URL),
  title: { default: `${SEO.home.title} | ${BRAND.name}`, template: `%s | ${BRAND.name}` },
  description: SEO.home.description,
  applicationName: BRAND.name,
  openGraph: { type: "website", siteName: BRAND.name, locale: "en_GB" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { themeColor: "#f5f8fc" };

// Runs before paint: marks JS as available; reduced motion skips the intro.
// Safety net: if the app bundle never runs, reveal everything after 10 s anyway.
const boot = `(function(){var d=document.documentElement,o=function(){d.dataset.ready="";d.dataset.introDone="";d.dataset.motionFallback="";d.classList.remove("is-locked")};d.dataset.js="";try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)o()}catch(e){}setTimeout(function(){if(!d.hasAttribute("data-motion-ready")||!d.hasAttribute("data-intro-done"))o()},10000)})()`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <SiteJsonLd description={SEO.home.description} />
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
