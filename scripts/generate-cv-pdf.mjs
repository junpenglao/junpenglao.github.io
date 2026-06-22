/**
 * Generate the two downloadable CV PDFs from the rendered /cv page.
 *
 *   - public/cv/junpenglao-cv-full.pdf     everything
 *   - public/cv/junpenglao-cv-1pager.pdf   slim 1-pager (.slim on <html>)
 *
 * Single source of truth is src/data/cv.ts -> the HTML CV page -> these PDFs,
 * using the print rules in src/styles/cv-print.css (A4 @page, DOI-as-text,
 * site chrome stripped, data-slim="hide" dropped for the 1-pager).
 *
 * Usage: build the site and serve it, then run this against that server.
 *   npm run build
 *   npm run preview &           # serves dist on http://localhost:4321
 *   npm run cv:pdf              # or: CV_BASE_URL=http://host:port npm run cv:pdf
 *
 * Output lands in public/cv/, so a subsequent `npm run build` copies the PDFs
 * into dist/cv/ and the "Download CV" links resolve.
 */
import { chromium } from "playwright";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const BASE = (process.env.CV_BASE_URL || "http://127.0.0.1:4321").replace(/\/$/, "");
const OUT_DIR = path.resolve(process.cwd(), "public/cv");

const targets = [
  { file: "junpenglao-cv-full.pdf", slim: false },
];

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.emulateMedia({ media: "print" });
  for (const t of targets) {
    await page.goto(`${BASE}/cv/`, { waitUntil: "networkidle" });
    if (t.slim) {
      await page.evaluate(() => document.documentElement.classList.add("slim"));
    }
    const out = path.join(OUT_DIR, t.file);
    await page.pdf({ path: out, preferCSSPageSize: true, printBackground: false });
    console.log(`wrote ${path.relative(process.cwd(), out)}`);
  }
} finally {
  await browser.close();
}
