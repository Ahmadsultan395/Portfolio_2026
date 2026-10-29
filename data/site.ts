export interface Site {
  name: string;
  monogram: string;
  role: string;
  headline: string;
  intro: string;
  location: string;
  coordinates: string;
  email: string;
  phone: string;
  /** International number, digits only (used for wa.me links). */
  whatsappNumber: string;
  linkedin: string;
  /** Set to your real GitHub profile URL to show it. Left null on purpose: no verified URL was supplied. */
  github: string | null;
  /** Flip `show` to false to hide the availability chip. Edit the label to match reality. */
  availability: { show: boolean; label: string };
  experienceLabel: string;
  currentlyAt: string;
  siteUrl: string;
  resumeFile: string;
}

export const site: Site = {
  name: "Muhammad Ahmad",
  monogram: "MA",
  role: "Frontend / Next.js / React Developer",
  headline: "Building digital experiences that make an impact.",
  intro:
    "Frontend engineer with roughly three years of experience crafting responsive, scalable interfaces in Next.js, React and TypeScript, working side by side with backend developers to integrate APIs and ship products people actually use.",
  location: "Lahore, Pakistan",
  coordinates: "31.5204° N · 74.3587° E",
  email: "ahmad395sultan@gmail.com",
  phone: "+92 312 0685288",
  whatsappNumber: "923120685288",
  linkedin: "https://www.linkedin.com/in/muhammad-ahmad-b9214b271/",
  github: null,
  availability: { show: true, label: "Open to new conversations" },
  experienceLabel: "~3 years",
  currentlyAt: "Digital Adaptation",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  resumeFile: "Muhammad-Ahmad-Resume.pdf",
};

export const whatsappLink = `https://wa.me/${site.whatsappNumber}`;
export const mailtoLink = `mailto:${site.email}`;
export const telLink = `tel:${site.phone.replace(/\s/g, "")}`;
