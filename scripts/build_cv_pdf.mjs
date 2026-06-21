#!/usr/bin/env node
/**
 * build_cv_pdf.mjs
 * ----------------------------------------------------------------------------
 * Generates two PDFs from the built CV page using a headless browser print:
 *
 *   public/cv/junpenglao-cv-full.pdf     full CV (everything)
 *   public/cv/junpenglao-cv-1pager.pdf   slim 1-page CV
 *
 * The CV page (src/pages/cv/index.astro) ships a print stylesheet. The 1-pager
 * is produced by adding `?slim=1` (or the matching print media) so the page can
 * collapse to one page; both variants are printed via the browser's print-to-PDF.
 *
 * This is OFFLINE / OPTIONAL (P2): it is NOT part of `npm run build` and must
 * never block CI. It degrades gracefully:
 *   1. Use `puppeteer` if installed.
 *   2. Else use `playwright` if installed.
 *   3. Else drive a system Chrome/Chromium via the CDP `--headless --print-to-pdf`.
 *   4. Else print clear manual instructions and exit 0 (non-fatal).
 *
 * Usage:
 *   1. Build the site:   npm run build
 *   2. Serve dist/ OR point this at the built files. By default it serves
 *      `dist/` on an ephemeral port and prints from there.
 *
 *   node scripts/build_cv_pdf.mjs
 *   node scripts/build_cv_pdf.mjs --url http://localhost:4321/cv/   # custom URL
 * ----------------------------------------------------------------------------
 */

import { existsSync, mkdirSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const DIST_DIR = resolve(REPO_ROOT, "dist");
const OUT_DIR = resolve(REPO_ROOT, "public/cv");
const FULL_PDF = resolve(OUT_DIR, "junpenglao-cv-full.pdf");
const SLIM_PDF = resolve(OUT_DIR, "junpenglao-cv-1pager.pdf");

const argv = process.argv.slice(2);
function argVal(name, def) {
  const i = argv.indexOf(name);
  return i >= 0 && argv[i + 1] ? argv[i + 1] : def;
}
const CUSTOM_BASE = argVal("--url", null); // e.g. http://localhost:4321

const FULL_PATH = "/cv/";
const SLIM_PATH = "/cv/?slim=1";

// --- Tiny static file server for dist/ (no deps) ----------------------------

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

function serveDist() {
  return new Promise((resolveServer, rejectServer) => {
    if (!existsSync(DIST_DIR)) {
      return rejectServer(
        new Error(`dist/ not found. Run \`npm run build\` first (cwd: ${REPO_ROOT}).`)
      );
    }
    const server = createServer(async (req, res) => {
      try {
        const { readFile } = await import("node:fs/promises");
        let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        if (urlPath.endsWith("/")) urlPath += "index.html";
        let filePath = resolve(DIST_DIR, "." + urlPath);
        if (!filePath.startsWith(DIST_DIR)) {
          res.writeHead(403);
          return res.end("forbidden");
        }
        if (!existsSync(filePath) && existsSync(filePath + "/index.html")) {
          filePath = filePath + "/index.html";
        }
        const ext = "." + (filePath.split(".").pop() || "");
        const body = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
        res.end(body);
      } catch {
        res.writeHead(404);
        res.end("not found");
      }
    });
    server.listen(0, "127.0.0.1", () => {
      const { port } = server.address();
      resolveServer({ server, base: `http://127.0.0.1:${port}` });
    });
    server.on("error", rejectServer);
  });
}

// --- Browser strategies -----------------------------------------------------

async function tryPuppeteer(targets) {
  let puppeteer;
  try {
    puppeteer = (await import("puppeteer")).default;
  } catch {
    return false;
  }
  console.log("[build_cv_pdf] using puppeteer");
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    for (const t of targets) {
      const page = await browser.newPage();
      await page.goto(t.url, { waitUntil: "networkidle0" });
      await page.emulateMediaType("print");
      await page.pdf({
        path: t.out,
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", bottom: "14mm", left: "16mm", right: "16mm" },
      });
      await page.close();
      console.log(`[build_cv_pdf]   wrote ${rel(t.out)}`);
    }
  } finally {
    await browser.close();
  }
  return true;
}

async function tryPlaywright(targets) {
  let chromium;
  try {
    chromium = (await import("playwright")).chromium;
  } catch {
    try {
      chromium = (await import("playwright-core")).chromium;
    } catch {
      return false;
    }
  }
  console.log("[build_cv_pdf] using playwright");
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext();
    for (const t of targets) {
      const page = await ctx.newPage();
      await page.goto(t.url, { waitUntil: "networkidle" });
      await page.emulateMedia({ media: "print" });
      await page.pdf({
        path: t.out,
        format: "A4",
        printBackground: true,
        margin: { top: "14mm", bottom: "14mm", left: "16mm", right: "16mm" },
      });
      await page.close();
      console.log(`[build_cv_pdf]   wrote ${rel(t.out)}`);
    }
  } finally {
    await browser.close();
  }
  return true;
}

function findSystemChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    "google-chrome-stable",
    "google-chrome",
    "chromium",
    "chromium-browser",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
  ].filter(Boolean);
  for (const c of candidates) {
    const which = spawnSync(process.platform === "win32" ? "where" : "which", [c], {
      encoding: "utf8",
    });
    if (which.status === 0 && which.stdout.trim()) return which.stdout.trim().split("\n")[0];
    if (c.startsWith("/") && existsSync(c)) return c;
  }
  return null;
}

function trySystemChrome(targets) {
  const chrome = findSystemChrome();
  if (!chrome) return false;
  console.log(`[build_cv_pdf] using system Chrome: ${chrome}`);
  for (const t of targets) {
    const args = [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      `--print-to-pdf=${t.out}`,
      t.url,
    ];
    const r = spawnSync(chrome, args, { stdio: "inherit", timeout: 60000 });
    if (r.status !== 0) {
      console.warn(`[build_cv_pdf]   chrome exited ${r.status} for ${t.url}`);
      return false;
    }
    console.log(`[build_cv_pdf]   wrote ${rel(t.out)}`);
  }
  return true;
}

function printManualInstructions() {
  console.log(
    [
      "",
      "[build_cv_pdf] No headless browser available — skipping PDF generation (non-fatal).",
      "",
      "To produce the CV PDFs, do ONE of the following, then re-run this script:",
      "  • npm i -D puppeteer            (downloads a bundled Chromium)",
      "  • npm i -D playwright && npx playwright install chromium",
      "  • install Google Chrome / Chromium and ensure it is on PATH",
      "    (or set CHROME_PATH=/path/to/chrome)",
      "",
      "Or generate manually from a running preview:",
      "  1. npm run build && npm run preview",
      "  2. Open http://localhost:4321/cv/  -> Print -> Save as PDF",
      `     -> ${rel(FULL_PDF)}`,
      "  3. Open http://localhost:4321/cv/?slim=1 -> Print -> Save as PDF",
      `     -> ${rel(SLIM_PDF)}`,
      "",
    ].join("\n")
  );
}

function rel(p) {
  return p.replace(REPO_ROOT + "/", "");
}

// --- Main -------------------------------------------------------------------

async function main() {
  mkdirSync(OUT_DIR, { recursive: true });

  let stop = () => {};
  let base = CUSTOM_BASE;
  if (!base) {
    try {
      const { server, base: served } = await serveDist();
      base = served;
      stop = () => server.close();
      console.log(`[build_cv_pdf] serving dist/ at ${base}`);
    } catch (e) {
      console.warn(`[build_cv_pdf] ${e.message}`);
      printManualInstructions();
      return; // exit 0 — optional step
    }
  }

  const targets = [
    { url: base + FULL_PATH, out: FULL_PDF },
    { url: base + SLIM_PATH, out: SLIM_PDF },
  ];

  try {
    const ok =
      (await tryPuppeteer(targets)) ||
      (await tryPlaywright(targets)) ||
      trySystemChrome(targets);

    if (!ok) {
      printManualInstructions();
      return; // non-fatal
    }

    for (const t of targets) {
      if (existsSync(t.out)) {
        console.log(`[build_cv_pdf] ✓ ${rel(t.out)} (${(statSync(t.out).size / 1024).toFixed(0)} KB)`);
      }
    }
  } finally {
    stop();
  }
}

main().catch((err) => {
  // Optional step: warn but never fail the pipeline.
  console.warn(`[build_cv_pdf] non-fatal error: ${err.message}`);
  printManualInstructions();
  process.exit(0);
});
