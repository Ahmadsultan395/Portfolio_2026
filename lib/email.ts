import type { ContactInput } from "./validation";

interface EmailConfig {
  apiKey: string;
  to: string;
  from: string;
}

/** Returns null when required environment variables are missing. */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  if (!apiKey || !to) return null;
  return {
    apiKey,
    to,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio Contact <onboarding@resend.dev>",
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export class EmailDeliveryError extends Error {}

/** Sends the message through Resend's HTTP API (no extra dependency, server-side only). */
export async function sendContactEmail(config: EmailConfig, input: ContactInput): Promise<void> {
  const subject = `Portfolio inquiry: ${input.projectType} — ${input.name}`.slice(0, 200);
  const html = `
    <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
      <h2 style="margin:0 0 12px">New portfolio message</h2>
      <p><strong>Name:</strong> ${escapeHtml(input.name)}<br/>
      <strong>Email:</strong> ${escapeHtml(input.email)}<br/>
      <strong>Topic:</strong> ${escapeHtml(input.projectType)}</p>
      <hr style="border:none;border-top:1px solid #ddd"/>
      <p style="white-space:pre-wrap">${escapeHtml(input.message)}</p>
    </div>`;
  const text = `New portfolio message\n\nName: ${input.name}\nEmail: ${input.email}\nTopic: ${input.projectType}\n\n${input.message}`;

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: config.from,
        to: [config.to],
        reply_to: input.email,
        subject,
        html,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    throw new EmailDeliveryError("The email provider could not be reached.");
  }

  if (!response.ok) {
    throw new EmailDeliveryError(`The email provider rejected the request (status ${response.status}).`);
  }
}
