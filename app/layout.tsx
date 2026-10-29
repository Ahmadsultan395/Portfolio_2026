import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "@fontsource/anton/latin-400.css";
import "@fontsource-variable/inter/wght.css";
import "../styles/theme.css";
import "./globals.css";

const title = `${site.name} — ${site.role}`;
const description = `${site.name} is a ${site.role} based in ${site.location}. ${site.intro}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: `%s | ${site.name}` },
  description,
  applicationName: `${site.name} Portfolio`,
  authors: [{ name: site.name }],
  keywords: ["Next.js developer", "React developer", "TypeScript", "Frontend developer", "Lahore", "Pakistan", "Portfolio"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${site.name} Portfolio`,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080908" },
    { media: "(prefers-color-scheme: light)", color: "#F5F6F0" },
  ],
};

/**
 * Runs before first paint so the correct theme is applied with no flash.
 * Saved choice wins; otherwise dark is the default unless the system explicitly prefers light.
 */
const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#about" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
