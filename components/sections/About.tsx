import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/experience";
import { site } from "@/data/site";

export function About() {
  const degree = education[0];
  const facts = [
    { label: "Based in", value: site.location },
    { label: "Currently", value: `Next.js / React.js Developer at ${site.currentlyAt}` },
    { label: "Education", value: `${degree.degree}, ${degree.institution} (${degree.year})` },
    { label: "Focus", value: "Responsive, scalable, high-quality interfaces" },
  ];

  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="01"
          label="About"
          title={
            <>
              Frontend, <em>by craft.</em>
            </>
          }
        />
        <div className="about">
          <div className="about__main">
            <Reveal>
              <p className="about__statement">
                I turn product requirements into interfaces that feel <em>fast, polished</em> and
                dependable.
              </p>
            </Reveal>
            <div className="about__body">
              <Reveal delay={80}>
                <p>
                  My journey began in June 2023 as a frontend intern at Itify (SMC Private) Limited,
                  writing HTML/CSS layouts, solving cross-browser quirks and building CRUD features.
                  From there I moved into React and, today, into production Next.js work.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p>
                  At Digital Adaptation I build dynamic interfaces with Next.js, React.js and
                  TypeScript on top of Firebase services, styled with Tailwind CSS and Material UI,
                  with ongoing attention to API integration and performance.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  I work closely with designers and backend developers, integrating REST APIs and
                  turning real requirements into responsive, scalable, high-quality interfaces.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={120}>
            <dl className="about__facts">
              {facts.map((fact) => (
                <div key={fact.label} className="about__fact">
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
