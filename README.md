# Muhammad Ahmad — Developer Portfolio

A premium, animated developer portfolio built with **Next.js (App Router) + TypeScript**. Obsidian-black and neon-lime by default, with a fully designed light theme.

## What's included

- **Hero** with cinematic portrait composition, staggered text reveal, gentle parallax, status chip, CTAs (Explore My Work, Download Resume, Let's Connect)
- **About**, **Technical Arsenal** (10 categories as an interactive index), **Featured Projects** (4 prominent + 6 in an index), **Experience** timeline, **Education**, interests, **Resume** (download + PDF preview), **Contact** (details + real server-side form)
- Dark/light theme with no flash on load, saved preference, system-preference fallback
- Floating navigation with active-section highlight and a keyboard-accessible mobile menu (Escape closes, focus is trapped)
- `prefers-reduced-motion` support, semantic HTML, visible focus states, skip link
- SEO: metadata, Open Graph, JSON-LD, sitemap, robots, MA monogram favicon
- Fonts are self-hosted (`@fontsource`), so there are no external font requests

## Project structure

```
app/
  layout.tsx          Root layout, metadata, no-flash theme script
  page.tsx            Page composition
  globals.css         Component styles
  api/contact/route.ts  Contact form endpoint (serverless)
  icon.svg · sitemap.ts · robots.ts
components/
  layout/             Navbar, ThemeToggle, Footer
  sections/           Hero, Ticker, About, Skills, Projects, Experience, Education, Resume, Contact, ContactForm
  ui/                 Reveal, Parallax, SectionHeading, Icons
data/                 ALL content lives here (typed): site, navigation, skills, projects, experience
lib/                  validation (shared client/server), email delivery, asset detection
styles/theme.css      Central design tokens (colours, type, spacing, radii, shadows, motion)
public/
  images/             portrait.jpg goes here (+ projects/ screenshots)
  resume/             Muhammad-Ahmad-Resume.pdf goes here
```

To change text, links or projects, edit the files in `data/`. To change colours, edit `styles/theme.css` only.

## Add your portrait

1. Save your photo as `public/images/portrait.jpg` (`.jpeg`, `.png`, `.webp`, `.avif` also work).
2. Best results: portrait orientation (~4:5), at least 1000px wide, subject in the upper half.
3. Restart `npm run dev` (or redeploy). Until then, an "MA" monogram is shown.

Optional project screenshots: `public/images/projects/<slug>.webp` (slugs listed in `public/images/README.md`). Without them, a CSS-generated graphic is used.

## Add your resume

Save the real PDF as `public/resume/Muhammad-Ahmad-Resume.pdf`. The hero button and Resume section switch to a real download and preview automatically. The file name is set in `data/site.ts` (`resumeFile`).

## Run locally

```bash
npm install
cp .env.example .env.local     # then fill in values (see below)
npm run dev                    # http://localhost:3000
```

Checks: `npm run lint`, `npm run typecheck`, `npm run build`.

## Contact form email delivery (Resend)

The form posts to `/api/contact`, which validates server-side, applies spam protection (honeypot field, minimum fill time, basic per-IP rate limit) and sends the email through **Resend's HTTP API**. No secret ever reaches the browser. No database is used.

Setup:

1. Create a free account at <https://resend.com> and create an API key.
2. Set these environment variables (names only; see `.env.example`):

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | yes | Resend API key (server-side only) |
| `CONTACT_TO_EMAIL` | yes | Inbox that receives messages |
| `CONTACT_FROM_EMAIL` | no | Sender, e.g. `Portfolio <contact@yourdomain.com>`. Defaults to Resend's shared `onboarding@resend.dev` |
| `NEXT_PUBLIC_SITE_URL` | recommended | Your live URL (used for sitemap, robots, Open Graph) |

Notes — please verify current terms, because quotas, verification rules and policies can change:

- With the shared `onboarding@resend.dev` sender, Resend only delivers to the email address you signed up with, so set `CONTACT_TO_EMAIL` to that address while testing.
- To send from your own address you must add and verify a domain in Resend (DNS records).
- Resend currently offers a free tier with monthly/daily limits; check their pricing page for today's numbers.
- If the variables are missing, the form shows a clear message (with setup hints in development) plus direct email and WhatsApp links. It never claims a message was sent when it wasn't.
- The in-memory rate limit is best-effort on serverless hosting (each instance has its own memory).

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
# create an empty repo on github.com first (no README), then:
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

`.env.local` is git-ignored, so secrets are never committed. Confirm with `git status` before committing.

## Deploy on Vercel

1. Sign in at <https://vercel.com> with GitHub and click **Add New → Project**.
2. Import your repository. Framework preset: **Next.js** (auto-detected). Keep default build settings.
3. Before deploying, open **Environment Variables** and add `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, optionally `CONTACT_FROM_EMAIL`, and `NEXT_PUBLIC_SITE_URL` (your final URL).
4. Click **Deploy**.
5. Redeploy later by pushing to `main`. If you only change environment variables, use **Deployments → ⋯ → Redeploy**.

## Manual checklist

- [ ] Add `public/images/portrait.jpg`
- [ ] Add `public/resume/Muhammad-Ahmad-Resume.pdf`
- [ ] Create a Resend account/API key and set the environment variables (locally and on Vercel)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real URL
- [ ] Add your real GitHub URL in `data/site.ts` (`github`) — it's hidden until set
- [ ] Review the availability chip text in `data/site.ts` (or set `show: false`)
- [ ] Add a `contribution` line per project in `data/projects.ts` if you want it displayed
- [ ] Add project screenshots (optional)
- [ ] Send a real test message through the deployed form and confirm it arrives
- [ ] If you want proficiency levels (e.g. "daily use" vs "working knowledge") in Technical Arsenal, add them in `data/skills.ts`
