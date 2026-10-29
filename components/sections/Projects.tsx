import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "@/components/ui/Icons";
import { featuredProjects, indexProjects, type Project } from "@/data/projects";
import { getProjectImage } from "@/lib/assets";

function initials(name: string): string {
  const words = name.replace(/[()/]/g, " ").split(/\s+/).filter(Boolean);
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function Visual({ project, index }: { project: Project; index: number }) {
  const screenshot = getProjectImage(project.slug);
  if (screenshot) {
    return (
      <Image
        src={screenshot}
        alt={`${project.name} website screenshot`}
        fill
        sizes="(max-width: 900px) 92vw, 50vw"
        loading="lazy"
      />
    );
  }
  return (
    <div className={`pv pv--${(index % 4) + 1}`} aria-hidden="true">
      <div className="pv__bg" />
      <div className="pv__mark">
        {initials(project.name)}
        <small>{project.tags[0]}</small>
      </div>
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const wide = project.size === "wide";
  const flip = wide && index % 2 === 1;
  const cls = `fp ${wide ? "fp--wide" : "fp--half"}${flip ? " fp--flip" : ""}`;

  return (
    <Reveal className={wide ? "fp-wrap fp-wrap--wide" : "fp-wrap"} delay={(index % 2) * 90}>
      <article className={cls} style={{ height: "100%" }}>
        <div className="fp__visual">
          <Visual project={project} index={index} />
        </div>
        <div className="fp__body">
          <div style={{ display: "grid", gap: "var(--space-4)" }}>
            <span className="fp__num">{String(index + 1).padStart(2, "0")} / Featured</span>
            <h3 className="fp__title">{project.name}</h3>
            <p className="fp__desc">{project.description}</p>
            <ul className="fp__list">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            {project.contribution ? (
              <p className="fp__contrib">
                <strong>My contribution:</strong> {project.contribution}
              </p>
            ) : null}
            <ul className="fp__chips" aria-label="Technologies">
              {(project.stack ?? project.tags).map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="fp__foot">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--small"
              >
                Visit live site
                <ArrowUpRight />
                <span className="sr-only"> — {project.name} (opens in a new tab)</span>
              </a>
            ) : (
              <span className="badge">No public URL</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          id="projects-title"
          index="03"
          label="Projects"
          title={
            <>
              Selected <em>work</em>
            </>
          }
          lead="Real products I've helped build, with live links wherever one exists."
        />

        <div className="featured">
          {featuredProjects.map((project, i) => (
            <FeaturedCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        <div className="pindex">
          <div className="pindex__title">
            <h3 className="display" style={{ fontSize: "var(--fs-h3)" }}>
              More projects
            </h3>
            <span className="eyebrow">{indexProjects.length} sites</span>
          </div>
          <ul>
            {indexProjects.map((project, i) => (
              <li key={project.slug}>
                <Reveal>
                  <article className="prow">
                    <span className="prow__num">{String(featuredProjects.length + i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4 className="prow__name" style={{ margin: 0 }}>
                        {project.name}
                      </h4>
                      <p className="prow__desc">{project.description}</p>
                    </div>
                    <ul className="prow__tags" aria-label="Categories">
                      {(project.stack ?? project.tags).map((t) => (
                        <li key={t} className="chip">
                          {t}
                        </li>
                      ))}
                    </ul>
                    {project.url ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="prow__link stretched"
                      >
                        Visit site
                        <ArrowUpRight />
                        <span className="sr-only"> — {project.name} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="badge">No public URL</span>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
