import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  lead?: string;
}

export function SectionHeading({ id, index, label, title, lead }: SectionHeadingProps) {
  return (
    <div className="section-head">
      <Reveal>
        <span className="eyebrow">
          {index} — {label}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="display section-head__title">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={160}>
          <p className="section-head__lead">{lead}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
