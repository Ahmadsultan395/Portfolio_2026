import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="04"
          label="Experience"
          title={
            <>
              Career <em>timeline</em>
            </>
          }
        />
        <ol className="timeline">
          {experience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <Reveal>
                <article className={`job${job.current ? " job--current" : ""}`}>
                  <p className="job__period">{job.period}</p>
                  <div>
                    <h3 className="job__role">{job.role}</h3>
                    <p className="job__company">
                      <strong>{job.company}</strong> — {job.location}
                      {job.mode ? `, ${job.mode.toLowerCase()}` : ""}
                    </p>
                    <ul className="job__points" style={{ marginTop: "var(--space-4)" }}>
                      {job.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
