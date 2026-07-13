import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav/Nav";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import Footer from "@/components/Footer/Footer";

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

import { SITE_URL, SOCIALS } from "@/lib/site";

/* Page titles are plain strings — the template suffixes them. */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rishabh Salian · Portfolio",
    template: "%s · Rishabh Salian",
  },
  description:
    "Portfolio of Rishabh Salian: industrial design to UX to AI-native products, with four live, working demos. MS Strategic Design & Management, Parsons. Brooklyn, NY.",
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

/* JSON-LD Person — the machine-readable card behind the whole site. */
const PERSON_LD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rishabh Salian",
  jobTitle: "Product Designer / Design Engineer",
  description:
    "Designer who moved from industrial design through UX to building AI-native products end to end.",
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
  sameAs: [SOCIALS.linkedin, SOCIALS.github, SOCIALS.behance],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
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
      </body>
    </html>
  );
}
