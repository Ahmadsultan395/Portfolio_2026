import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Resume } from "@/components/sections/Resume";
import { Skills } from "@/components/sections/Skills";
import { Ticker } from "@/components/sections/Ticker";
import { site } from "@/data/site";
import { getPortrait, getResume } from "@/lib/assets";

export default function HomePage() {
  // Resolved at build time: drop your files into /public and redeploy.
  const portrait = getPortrait();
  const resume = getResume(site.resumeFile);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressCountry: "PK",
    },
    sameAs: [site.linkedin, ...(site.github ? [site.github] : [])],
    url: site.siteUrl,
  };

  return (
    <>
      <Navbar />
      <main>
        <Hero portraitSrc={portrait} resumeHref={resume} />
        <Ticker />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Resume resumeHref={resume} />
        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
