import fs from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

function findFile(dir: string, baseNames: string[], exts: string[]): string | null {
  for (const base of baseNames) {
    for (const ext of exts) {
      const rel = path.posix.join(dir, `${base}.${ext}`);
      if (fs.existsSync(path.join(PUBLIC_DIR, rel))) return `/${rel}`;
    }
  }
  return null;
}

const IMAGE_EXTS = ["webp", "jpg", "jpeg", "png", "avif"];

/** public/images/portrait.(webp|jpg|jpeg|png|avif) — null when you haven't added it yet. */
export function getPortrait(): string | null {
  return findFile("images", ["portrait"], IMAGE_EXTS);
}

/** public/images/projects/<slug>.(webp|jpg|jpeg|png|avif) — null falls back to a CSS graphic. */
export function getProjectImage(slug: string): string | null {
  return findFile("images/projects", [slug], IMAGE_EXTS);
}

/** public/resume/<file> — null when the PDF hasn't been added yet. */
export function getResume(fileName: string): string | null {
  const rel = path.posix.join("resume", fileName);
  return fs.existsSync(path.join(PUBLIC_DIR, rel)) ? `/${rel}` : null;
}
