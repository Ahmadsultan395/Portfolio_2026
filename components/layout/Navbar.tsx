"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, observedSections } from "@/data/navigation";
import { site } from "@/data/site";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const headerRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const firstPanelLink = useRef<HTMLAnchorElement>(null);

  // Floating bar gains depth after the first scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link of the section currently in view.
  useEffect(() => {
    const targets = observedSections
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // Mobile menu: Escape to close, focus trap, scroll lock.
  useEffect(() => {
    if (!open) return;
    const burger = burgerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstPanelLink.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burger?.focus();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((el) => el.offsetParent !== null || el === document.activeElement);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={`nav${scrolled ? " nav--scrolled" : ""}`}>
      <div className="nav__bar container">
        <a href="#top" className="nav__logo" aria-label={`${site.name} — back to top`} onClick={() => setOpen(false)}>
          {site.monogram}
          <span>.</span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="nav__link"
                  aria-current={active === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav__actions">
          <ThemeToggle />
          <a href="#contact" className="btn btn--primary btn--small nav__cta">
            Let&apos;s connect
          </a>
          <button
            ref={burgerRef}
            type="button"
            className="icon-btn burger"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className="nav__panel" data-open={open} inert={!open}>
        <nav aria-label="Mobile">
          {navItems.map((item, i) => (
            <a
              key={item.id}
              ref={i === 0 ? firstPanelLink : undefined}
              href={item.href}
              className="panel-link"
              onClick={() => setOpen(false)}
            >
              <small>0{i + 1}</small>
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
