import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Inter,
  IBM_Plex_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import "./page-themes.css";
import Nav from "@/components/Nav/Nav";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "@/components/Footer/Footer";
import LabelFaceSwitcher from "@/components/LabelFaceSwitcher/LabelFaceSwitcher";

// §2 typography — wired to the design tokens via CSS variables.
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});
/* UNFOLD-POLISH label-face trial — Fraunces loaded globally ONLY while the
   candidates are being compared (candidate B). Delete this load if A or C
   wins (Fraunces then stays page-scoped to Greener Hours). */
const labelSerif = Fraunces({
  subsets: ["latin"],
  variable: "--font-label-serif",
  display: "swap",
});

import { SITE_URL, SOCIALS } from "@/lib/site";

/* Page titles are plain strings — the template suffixes them. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rishabh Salian · Portfolio",
    template: "%s · Rishabh Salian",
  },
  description:
    "Portfolio of Rishabh Salian: industrial design to UX to AI-native products, with four interactive, working prototypes. MS Strategic Design & Management, Parsons. Brooklyn, NY.",
  openGraph: {
    type: "website",
    siteName: "Rishabh Salian · Portfolio",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Rishabh Salian · designer & AI-native product builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: { index: true, follow: true },
};

/* browser chrome matches --paper per theme; the head script + ThemeToggle
   rewrite these metas when a stored choice overrides the OS preference */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#171410" },
    { media: "(prefers-color-scheme: light)", color: "#f4f2ec" },
  ],
};

/* Runs before anything paints (first child of <body>): resolves the theme
   (stored choice, else OS preference), stamps data-theme on <html>, and
   points the theme-color metas at the resolved paper. Keep dependency-free
   and tiny — this is the no-flash guarantee. */
const THEME_BOOT = `try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t;var c=t==="dark"?"#171410":"#f4f2ec";document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){m.setAttribute("content",c)})}catch(e){}`;

/* JSON-LD Person — the machine-readable card behind the whole site. */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishabh Salian",
  jobTitle: "Product Designer / Design Engineer",
  description:
    "Designer who moved from industrial design through UX to building working prototypes of AI-native products.",
  url: SITE_URL,
  email: "mailto:rishabhsalian@ymail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Brooklyn",
    addressRegion: "NY",
    addressCountry: "US",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Parsons School of Design, The New School",
    },
    { "@type": "CollegeOrUniversity", name: "ISDI" },
  ],
  sameAs: [SOCIALS.linkedin, SOCIALS.github],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${labelSerif.variable}`}
      /* the theme boot script stamps data-theme before hydration; React would
         warn about the attribute it didn't server-render (attributes-only,
         this element only — the standard next-themes pattern) */
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_LD) }}
        />
        <a href="#main" className="skipLink">
          Skip to content
        </a>
        <div className="appShell">
          <Nav />
          <Breadcrumbs />
          <main id="main" className="appMain">
            {children}
          </main>
          <Footer />
        </div>
        {/* label-face trial chip — dev builds only; removed at lock-in */}
        {process.env.NODE_ENV !== "production" && <LabelFaceSwitcher />}
      </body>
    </html>
  );
}
