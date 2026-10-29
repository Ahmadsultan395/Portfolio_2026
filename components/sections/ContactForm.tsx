"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight } from "@/components/ui/Icons";
import { mailtoLink, site, whatsappLink } from "@/data/site";
import { LIMITS, PROJECT_TYPES, validateContact, type FieldErrors } from "@/lib/validation";

type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const loadedAt = useRef<number>(0);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const { values, errors: fieldErrors } = validateContact({
      name: data.get("name"),
      email: data.get("email"),
      projectType: data.get("projectType"),
      message: data.get("message"),
    });

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus("idle");
      setFeedback("");
      const firstInvalid = (Object.keys(fieldErrors) as (keyof FieldErrors)[])[0];
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("loading");
    setFeedback("");

    // Time since the form first rendered; used server-side as a basic bot signal.
    if (!loadedAt.current) loadedAt.current = Date.now() - 5000;

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          company: data.get("company") ?? "",
          elapsed: Date.now() - loadedAt.current,
        }),
      });
      const json = (await response.json().catch(() => null)) as
        | { ok?: boolean; code?: string; message?: string; errors?: FieldErrors }
        | null;

      if (response.ok && json?.ok) {
        setStatus("success");
        setFeedback(json.message ?? "Thanks! Your message has been sent.");
        form.reset();
        return;
      }
      if (json?.errors) setErrors(json.errors);
      if (json?.code === "not_configured") {
        setStatus("unconfigured");
      } else {
        setStatus("error");
      }
      setFeedback(json?.message ?? "Something went wrong while sending your message.");
    } catch {
      setStatus("error");
      setFeedback("Network error — your message was not sent. Please try again.");
    }
  }

  const describedBy = (field: keyof FieldErrors) => (errors[field] ? `${field}-error` : undefined);
  const showFallback = status === "error" || status === "unconfigured";

  return (
    <form
      className="form"
      onSubmit={onSubmit}
      onFocusCapture={() => {
        if (!loadedAt.current) loadedAt.current = Date.now();
      }}
      noValidate
      aria-label="Contact form"
    >
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
          />
          {errors.name ? (
            <p id="name-error" className="field__error">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
          />
          {errors.email ? (
            <p id="email-error" className="field__error">
              {errors.email}
            </p>
          ) : null}
        </div>
      </div>

      <div className="field">
        <label htmlFor="projectType">What&apos;s this about?</label>
        <select
          id="projectType"
          name="projectType"
          defaultValue=""
          required
          aria-invalid={errors.projectType ? true : undefined}
          aria-describedby={describedBy("projectType")}
        >
          <option value="" disabled>
            Select a topic
          </option>
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <p id="projectType-error" className="field__error">
            {errors.projectType}
          </p>
        ) : null}
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          maxLength={LIMITS.message}
          required
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={describedBy("message")}
        />
        {errors.message ? (
          <p id="message-error" className="field__error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from people and assistive tech, bots tend to fill it */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div role="status" aria-live="polite">
        {feedback ? (
          <div className="form__status" data-kind={status}>
            <p>{feedback}</p>
            {showFallback ? (
              <p style={{ marginTop: "var(--space-2)" }}>
                You can also reach me directly at <a href={mailtoLink}>{site.email}</a> or on{" "}
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
                .
              </p>
            ) : null}
          </div>
        ) : null}
      </div>

      <button type="submit" className="btn btn--primary" disabled={status === "loading"} style={{ justifySelf: "start" }}>
        {status === "loading" ? (
          <>
            <span className="spinner" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowUpRight />
          </>
        )}
      </button>
    </form>
  );
}
