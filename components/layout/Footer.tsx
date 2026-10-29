import { mailtoLink, site, whatsappLink } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p>
          © {year} {site.name}. Designed and built by hand with Next.js.
        </p>
        <nav aria-label="Footer" className="footer__links">
          <a href={mailtoLink}>Email</a>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          {site.github ? (
            <a href={site.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          ) : null}
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </footer>
  );
}
