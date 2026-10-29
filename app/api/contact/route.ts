import { NextResponse } from "next/server";
import { EmailDeliveryError, getEmailConfig, sendContactEmail } from "@/lib/email";
import { validateContact } from "@/lib/validation";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Best-effort rate limit. On serverless hosts each instance has its own memory,
// so this slows casual abuse but is not a hard guarantee.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return json({ ok: false, message: "Too many messages from this connection. Please try again later." }, 429);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return json({ ok: false, message: "Message is too large." }, 413);
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, message: "Invalid request." }, 400);
  }

  // Spam protection: honeypot filled, or submitted impossibly fast. Bots get a silent "success".
  const honeypot = typeof body.company === "string" && body.company.trim() !== "";
  const elapsed = typeof body.elapsed === "number" ? body.elapsed : Number.POSITIVE_INFINITY;
  if (honeypot || elapsed < 2500) {
    return json({ ok: true, message: "Thanks! Your message has been sent." });
  }

  const { values, errors } = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return json({ ok: false, message: "Please fix the highlighted fields.", errors }, 422);
  }

  const config = getEmailConfig();
  if (!config) {
    const dev = process.env.NODE_ENV !== "production";
    return json(
      {
        ok: false,
        code: "not_configured",
        message: dev
          ? "Email delivery isn't configured. Set RESEND_API_KEY and CONTACT_TO_EMAIL in .env.local (see .env.example), then restart the dev server."
          : `The contact form isn't available right now, and your message was not sent. Please email ${site.email} directly.`,
      },
      503,
    );
  }

  try {
    await sendContactEmail(config, values);
  } catch (error) {
    console.error("[contact] delivery failed:", error instanceof EmailDeliveryError ? error.message : "unknown error");
    return json(
      {
        ok: false,
        message: `Your message could not be delivered. Please email ${site.email} directly.`,
      },
      502,
    );
  }

  return json({ ok: true, message: "Thanks! Your message has been sent. I'll get back to you soon." });
}
