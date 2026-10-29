import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="expertise" className="section" aria-labelledby="expertise-title">
      <div className="container">
        <SectionHeading
          id="expertise-title"
          index="02"
          label="Expertise"
          title={
            <>
              Technical <em>arsenal</em>
            </>
          }
          lead="The tools and technologies I work with, organized by the role they play in a project."
        />
        <ul className="index">
          {skillCategories.map((category, i) => (
            <li key={category.id}>
              <Reveal>
                <div className="index__row">
                  <span className="index__num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="index__title">{category.title}</h3>
                    <p className="index__blurb">{category.blurb}</p>
                  </div>
                  <ul className="index__items" aria-label={`${category.title} technologies`}>
                    {category.items.map((item) => (
                      <li key={item} className="chip">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
