import { Reveal } from "@/components/ui/Reveal";
import { Download } from "@/components/ui/Icons";
import { site } from "@/data/site";

export function Resume({ resumeHref }: { resumeHref: string | null }) {
  return (
    <section id="resume" className="section" aria-labelledby="resume-title" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
      <div className="container">
        <Reveal>
          <div className="resume">
            <span className="eyebrow">06 — Resume</span>
            <h2 id="resume-title" className="display resume__title">
              The full story, on paper.
            </h2>
            <p className="resume__text">
              A complete overview of my experience, education and technical skills.
            </p>

            {resumeHref ? (
              <>
                <div className="resume__actions">
                  <a href={resumeHref} download={site.resumeFile} className="btn btn--primary">
                    Download Resume
                    <Download />
                  </a>
                  <a href={resumeHref} target="_blank" rel="noopener noreferrer" className="btn">
                    Open in new tab
                  </a>
                </div>
                <iframe
                  className="resume__preview"
                  src={`${resumeHref}#view=FitH`}
                  title={`${site.name} resume preview`}
                  loading="lazy"
                />
              </>
            ) : (
              <div className="resume__missing" role="note">
                <p>
                  Resume PDF isn&apos;t available here yet. Add your real file at{" "}
                  <code>public/resume/{site.resumeFile}</code> and redeploy — this section will switch to a
                  download button and preview automatically.
                </p>
                <p style={{ marginTop: "var(--space-3)" }}>
                  In the meantime, feel free to <a href="#contact" style={{ color: "var(--accent)", textDecoration: "underline" }}>get in touch</a> and I&apos;ll send it over.
                </p>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
