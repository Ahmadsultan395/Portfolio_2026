import type { CSSProperties } from "react";
import Image from "next/image";
import { Parallax } from "@/components/ui/Parallax";
import { ArrowUpRight, Download } from "@/components/ui/Icons";
import { site } from "@/data/site";

interface HeroProps {
  portraitSrc: string | null;
  /** Public path of the resume PDF, or null if it hasn't been added yet. */
  resumeHref: string | null;
}

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero({ portraitSrc, resumeHref }: HeroProps) {
  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__portrait">
          <Parallax strength={16} className="hero__parallax">
            <div className="portrait">
              <div className="portrait__halo" aria-hidden="true" />
              <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
              <span className="portrait__corner portrait__corner--tr" aria-hidden="true" />
              <div className="portrait__frame">
                {portraitSrc ? (
                  <Image
                    src={portraitSrc}
                    alt={`Portrait of ${site.name}`}
                    fill
                    priority
                    sizes="(max-width: 900px) 86vw, 46vw"
                    className="portrait__img"
                  />
                ) : (
                  <div className="portrait__fallback" role="img" aria-label={`${site.name} monogram`}>
                    <span>{site.monogram}</span>
                  </div>
                )}
              </div>
              <span className="portrait__tag">{site.coordinates}</span>
              <svg className="portrait__arc" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="1" />
                <circle cx="60" cy="60" r="38" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          </Parallax>
        </div>

        <h1 id="hero-title" className="hero__name" aria-label={`${site.name}, ${site.role}`}>
          <span className="line" aria-hidden="true">
            <span style={delay(100)}>Muhammad</span>
          </span>
          <span className="line line--outline" aria-hidden="true">
            <span style={delay(240)}>Ahmad</span>
          </span>
        </h1>

        <div className="hero__copy">
          {site.availability.show ? (
            <p className="status fade-up" style={delay(300)}>
              <span className="status__dot" aria-hidden="true" />
              {site.availability.label}
            </p>
          ) : null}
          <p className="hero__role fade-up" style={delay(380)}>
            {site.role}
          </p>
          <p className="hero__headline fade-up" style={delay(460)}>
            {site.headline}
          </p>
          <p className="hero__intro fade-up" style={delay(540)}>
            {site.intro}
          </p>

          <div className="hero__ctas fade-up" style={delay(620)}>
            <a href="#projects" className="btn btn--primary">
              Explore My Work
              <ArrowUpRight />
            </a>
            <a
              href={resumeHref ?? "#resume"}
              className="btn"
              {...(resumeHref ? { download: site.resumeFile } : {})}
            >
              Download Resume
              <Download />
            </a>
            <a href="#contact" className="btn">
              Let&apos;s Connect
              <ArrowUpRight />
            </a>
          </div>

          <dl className="hero__meta fade-up" style={delay(700)}>
            <div>
              <dt>Based in</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>Experience</dt>
              <dd>{site.experienceLabel}</dd>
            </div>
            <div>
              <dt>Currently</dt>
              <dd>{site.currentlyAt}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
