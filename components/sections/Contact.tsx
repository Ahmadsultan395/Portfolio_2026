import { Reveal } from "@/components/ui/Reveal";
import { mailtoLink, site, telLink, whatsappLink } from "@/data/site";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const items: { label: string; value: string; href?: string; external?: boolean }[] = [
    { label: "Email", value: site.email, href: mailtoLink },
    { label: "Phone", value: site.phone, href: telLink },
    { label: "WhatsApp", value: site.phone, href: whatsappLink, external: true },
    { label: "LinkedIn", value: "linkedin.com/in/muhammad-ahmad", href: site.linkedin, external: true },
    ...(site.github
      ? [{ label: "GitHub", value: site.github.replace(/^https?:\/\//, ""), href: site.github, external: true }]
      : []),
    { label: "Location", value: site.location },
  ];

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container contact">
        <div>
          <Reveal>
            <span className="eyebrow">07 — Contact</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="contact-title" className="display contact__big" style={{ marginTop: "var(--space-5)" }}>
              Let&apos;s build <em>something</em> great.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <dl className="contact__list">
              {items.map((item) => {
                const content = (
                  <>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </>
                );
                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="contact__item"
                    {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="contact__item">
                    {content}
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}
