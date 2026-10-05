import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { CLINIC } from "@/content/site";
import { Motion } from "@/components/Motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const display = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-display" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: `${CLINIC.fullName}: ${CLINIC.tagline}`, template: `%s · ${CLINIC.fullName}` },
  description: CLINIC.intro,
};

export const viewport: Viewport = { themeColor: "#0b2422" };

// Runs before paint: marks JS as available and skips the intro for return visits.
const boot = `(function(){var d=document.documentElement;d.dataset.js="";try{if(sessionStorage.getItem("seen-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.ready="";d.dataset.introDone=""}}catch(e){}})()`;

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
          <Preloader name={CLINIC.name} />
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </Motion>
        <Cursor />
      </body>
    </html>
  );
}
