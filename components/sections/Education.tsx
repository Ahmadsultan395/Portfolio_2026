import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { activities, education, interests } from "@/data/experience";

export function Education() {
  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <SectionHeading
          id="education-title"
          index="05"
          label="Education"
          title={
            <>
              Where I <em>studied</em>
            </>
          }
        />
        <div className="edu">
          {education.map((item) => (
            <Reveal key={item.institution}>
              <div className="edu__row">
                <span className="edu__year">{item.year}</span>
                <h3 className="edu__degree">{item.degree}</h3>
                <p className="edu__inst">{item.institution}</p>
                <p className="edu__score">{item.score}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="edu__extras">
            <span>Beyond class</span>
            {activities.map((a) => (
              <span key={a} className="chip">
                {a}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="interests" style={{ marginTop: "var(--space-8)" }}>
            <span className="interests__label">Off the clock</span>
            <ul className="interests__list">
              {interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
