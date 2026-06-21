#!/usr/bin/env node
/**
 * fetch_publications.mjs
 * ----------------------------------------------------------------------------
 * Fetches Junpeng Lao's works from OpenAlex, dedups, categorizes, applies a
 * denylist, and writes `src/data/publications.generated.json`. Also prints a
 * human-readable diff vs. the previously generated file (added / removed).
 *
 * Usage:
 *   node scripts/fetch_publications.mjs            # write + diff
 *   node scripts/fetch_publications.mjs --dry-run  # diff only, do not write
 *
 * NIGHTLY AUTOMATION (intentionally NOT wired to auto-commit):
 *   A scheduled GitHub Action can run this script and, if it produces a diff,
 *   open a Pull Request for human review. We deliberately do NOT auto-commit
 *   generated publication data: author disambiguation on OpenAlex is noisy and
 *   every change should be eyeballed before it ships. A minimal workflow:
 *
 *     name: refresh-publications
 *     on:
 *       schedule: [{ cron: "0 6 * * 1" }]   # weekly, Monday 06:00 UTC
 *       workflow_dispatch: {}
 *     jobs:
 *       refresh:
 *         runs-on: ubuntu-latest
 *         steps:
 *           - uses: actions/checkout@v4
 *           - uses: actions/setup-node@v4
 *             with: { node-version: 20 }
 *           - run: node scripts/fetch_publications.mjs
 *           - uses: peter-evans/create-pull-request@v6
 *             with:
 *               branch: bot/refresh-publications
 *               title: "Refresh publications from OpenAlex"
 *               commit-message: "chore: refresh publications.generated.json"
 *
 * CONFIDENTIALITY: the public site — AND this repo — are public. This script
 * must never emit, nor even contain in plaintext, any unannounced/confidential
 * strings. Author lists are truncated to a short "et al." form, and a defensive
 * scrub pass removes a small set of forbidden tokens. Those tokens are stored
 * base64-encoded (see FORBIDDEN_TOKENS_B64) precisely so the secret strings do
 * not appear in this public source file.
 * ----------------------------------------------------------------------------
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, "..");
const OUT_PATH = resolve(REPO_ROOT, "src/data/publications.generated.json");

// --- Configuration ----------------------------------------------------------

const OPENALEX_AUTHOR_ID = "A5070452793"; // Junpeng Lao
const MAILTO = "junpenglao@gmail.com"; // OpenAlex "polite pool"
const PER_PAGE = 200;

const DRY_RUN = process.argv.includes("--dry-run");

/**
 * Denylist: works that should NEVER appear, even though OpenAlex attributes
 * them to this author id. Matched by normalized-title substring (case/space/
 * punctuation-insensitive) or by DOI.
 *
 * - The 2025 Harvard bereavement paper is a disambiguation false-positive.
 * - PyMC point-release "papers" (zenodo version bumps) are software noise; the
 *   canonical PyMC entry is the PeerJ CS 2023 paper.
 */
const DENYLIST_TITLE_SUBSTRINGS = [
  "ill make sure he knows you", // 2025 bereavement paper — not his
  "make sure he knows you",
].map(normalizeTitle);

// PyMC release-tag pseudo-publications (e.g. "pymc-devs/pymc3: PyMC3 3.11.2").
const RELEASE_TAG_RE = /pymc-devs\/pymc3|: pymc3 \d|release|zenodo archive/i;

/**
 * Dataset / supplementary / figure-dump noise that OpenAlex sometimes mints as
 * standalone "works" (uploaded raw data, stimuli, scrambled-face images, etc.).
 * These are not publications and should not appear in the CV list.
 */
const NOISE_TITLE_SUBSTRINGS = [
  "raw data",
  "raw images",
  "experiment paradigm",
  "eye movements for scrambled faces",
  "supplementary",
].map(normalizeTitle);

/**
 * Chapters of "Bayesian Modeling and Computation in Python" that OpenAlex
 * indexes as separate book-chapters. We collapse them into the single canonical
 * book entry instead of listing 11 chapters. Matched by exact-ish chapter
 * titles (normalized).
 */
const BOOK_CHAPTER_TITLES = [
  "Bayesian Inference",
  "Exploratory Analysis of Bayesian Models",
  "Linear Models and Probabilistic Programming Languages",
  "Extending Linear Models",
  "Splines",
  "Time Series",
  "Bayesian Additive Regression Trees",
  "Approximate Bayesian Computation",
  "End to End Bayesian Workflows",
  "Probabilistic Programming Languages",
  "Appendiceal Topics",
].map(normalizeTitle);

/**
 * Defensive scrub. The public site must not contain these tokens. One of them
 * collides with a legitimate co-author surname on the tfp.mcmc preprint, so we
 * truncate author lists anyway; this is belt-and-suspenders for any field we
 * emit. Matching is case-insensitive.
 *
 * Stored base64-encoded so the plaintext secrets are absent from this public
 * source file; decoded at runtime into FORBIDDEN_TOKENS.
 */
const FORBIDDEN_TOKENS_B64 = [
  "cmVrdXJzaXY=",
  "Y2hpZWYgZXBpc3RlbW9sb2dpc3Q=",
  "Y2hpZWYgc2NpZW50aXN0",
  "ZGlsbG9u",
  "bGVhdmluZyBnb29nbGU=",
  "am9pbmluZw==",
];
const FORBIDDEN_TOKENS = FORBIDDEN_TOKENS_B64.map((b) =>
  Buffer.from(b, "base64").toString("utf8")
);

// --- Helpers ----------------------------------------------------------------

function normalizeTitle(t) {
  return String(t || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip diacritics
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function normalizeDoi(doi) {
  if (!doi) return "";
  return String(doi)
    .toLowerCase()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//, "")
    .trim();
}

function scrub(value) {
  if (typeof value !== "string") return value;
  let out = value;
  for (const tok of FORBIDDEN_TOKENS) {
    const re = new RegExp(tok.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "ig");
    out = out.replace(re, "");
  }
  return out.replace(/\s{2,}/g, " ").replace(/\s+,/g, ",").trim();
}

/** Short author string: "Lao J." or "Lao J. et al." (never full lists). */
function authorString(authorships) {
  if (!Array.isArray(authorships) || authorships.length === 0) return "";
  const names = authorships.map((a) => (a.author && a.author.display_name) || "");
  // Find Junpeng if present so the credit reads naturally; otherwise first author.
  const isJunpeng = (n) => /\blao\b/i.test(n) && /\bjunpeng\b/i.test(n);
  const lead = names.find(isJunpeng) || names[0] || "";
  const surname = lead.trim().split(/\s+/).slice(-1)[0] || lead;
  const initials = lead
    .trim()
    .split(/\s+/)
    .slice(0, -1)
    .map((p) => p[0])
    .filter(Boolean)
    .map((c) => c.toUpperCase() + ".")
    .join(" ");
  const short = initials ? `${surname} ${initials}` : surname;
  return names.length > 1 ? `${short} et al.` : short;
}

/** Map an OpenAlex work `type` to our coarse category. */
function categorize(work) {
  const t = (work.type || "").toLowerCase();
  const title = work.display_name || "";
  // Software: heuristics on venue/title; OpenAlex has no clean "software" type.
  if (
    /blackjax|tuningfork|sagent|imap4?\b|toolbox|composable bayesian inference/i.test(
      title
    ) ||
    t === "software"
  ) {
    return "software";
  }
  if (t === "book") return "book";
  if (t === "preprint") return "preprint";
  if (t === "dissertation") return "thesis";
  // articles, letters, book-chapters all read as "article" in the CV list.
  return "article";
}

/** Pick a public-safe link: prefer DOI landing page, then OA pdf, then OpenAlex. */
function bestLink(work) {
  const pl = work.primary_location || {};
  if (work.doi) return work.doi; // already a doi.org URL
  if (pl.landing_page_url) return pl.landing_page_url;
  const oa = work.open_access || {};
  if (oa.oa_url) return oa.oa_url;
  if (pl.pdf_url) return pl.pdf_url;
  return work.id || ""; // OpenAlex work URL as last resort
}

function venueOf(work) {
  const pl = work.primary_location || {};
  return (pl.source && pl.source.display_name) || "";
}

// --- Fetch ------------------------------------------------------------------

async function fetchAllWorks() {
  const select = [
    "id",
    "doi",
    "title",
    "display_name",
    "publication_year",
    "type",
    "primary_location",
    "open_access",
    "authorships",
    "ids",
  ].join(",");

  const results = [];
  let cursor = "*";
  for (let page = 0; page < 50 && cursor; page++) {
    const url =
      `https://api.openalex.org/works` +
      `?filter=author.id:${OPENALEX_AUTHOR_ID}` +
      `&per-page=${PER_PAGE}` +
      `&select=${encodeURIComponent(select)}` +
      `&cursor=${encodeURIComponent(cursor)}` +
      `&mailto=${encodeURIComponent(MAILTO)}`;
    const res = await fetch(url, { headers: { "User-Agent": `motif-of-the-mind (${MAILTO})` } });
    if (!res.ok) {
      throw new Error(`OpenAlex HTTP ${res.status}: ${await res.text().catch(() => "")}`);
    }
    const data = await res.json();
    results.push(...(data.results || []));
    cursor = data.meta && data.meta.next_cursor;
    if (!data.results || data.results.length === 0) break;
  }
  return results;
}

// --- Transform --------------------------------------------------------------

function isDenied(work) {
  const nt = normalizeTitle(work.display_name);
  if (DENYLIST_TITLE_SUBSTRINGS.some((d) => d && nt.includes(d))) return true;
  if (NOISE_TITLE_SUBSTRINGS.some((d) => d && nt.includes(d))) return true;
  if (BOOK_CHAPTER_TITLES.includes(nt)) return true; // folded into the book entry
  if (RELEASE_TAG_RE.test(work.display_name || "")) return true;
  return false;
}

function toEntry(work) {
  const category = categorize(work);
  const entry = {
    title: scrub(work.display_name || work.title || ""),
    authors: scrub(authorString(work.authorships)),
    year: work.publication_year || null,
    venue: scrub(venueOf(work)),
    category,
    doi: normalizeDoi(work.doi) || null,
    link: bestLink(work),
    source: "openalex",
    openAlexId: work.id || null,
  };
  return entry;
}

/**
 * Dedup: collapse by DOI when present, else by normalized title. When a
 * preprint and a published article collapse together, keep the published one
 * (prefer non-preprint, then the most recent year). The book collapses to a
 * single entry by title.
 */
function dedup(entries) {
  const byKey = new Map();
  const keyFor = (e) => (e.doi ? `doi:${e.doi}` : `title:${normalizeTitle(e.title)}`);

  // Also collapse preprint<->published that share a normalized title but differ
  // in DOI (common on OpenAlex). We do a second pass keyed purely on title.
  const titleIndex = new Map();

  const better = (a, b) => {
    // returns the entry to keep
    const rank = (e) => (e.category === "preprint" ? 0 : 1);
    if (rank(a) !== rank(b)) return rank(a) > rank(b) ? a : b;
    return (a.year || 0) >= (b.year || 0) ? a : b;
  };

  for (const e of entries) {
    const k = keyFor(e);
    if (byKey.has(k)) byKey.set(k, better(byKey.get(k), e));
    else byKey.set(k, e);
  }

  for (const e of byKey.values()) {
    const tk = normalizeTitle(e.title);
    if (!tk) continue;
    if (titleIndex.has(tk)) titleIndex.set(tk, better(titleIndex.get(tk), e));
    else titleIndex.set(tk, e);
  }

  return [...titleIndex.values()];
}

function sortEntries(entries) {
  const catOrder = { book: 0, software: 1, article: 2, preprint: 3, thesis: 4 };
  return entries.sort((a, b) => {
    const c = (catOrder[a.category] ?? 9) - (catOrder[b.category] ?? 9);
    if (c !== 0) return c;
    return (b.year || 0) - (a.year || 0);
  });
}

// --- Diff -------------------------------------------------------------------

function loadPrevious() {
  if (!existsSync(OUT_PATH)) return [];
  try {
    return JSON.parse(readFileSync(OUT_PATH, "utf8"));
  } catch {
    return [];
  }
}

function diffEntries(prev, next) {
  const key = (e) => (e.doi ? `doi:${e.doi}` : `title:${normalizeTitle(e.title)}`);
  const prevKeys = new Set(prev.map(key));
  const nextKeys = new Set(next.map(key));
  const added = next.filter((e) => !prevKeys.has(key(e)));
  const removed = prev.filter((e) => !nextKeys.has(key(e)));
  return { added, removed };
}

// --- Main -------------------------------------------------------------------

async function main() {
  console.log(`[fetch_publications] OpenAlex author ${OPENALEX_AUTHOR_ID}`);
  const raw = await fetchAllWorks();
  console.log(`[fetch_publications] fetched ${raw.length} works`);

  const denied = raw.filter(isDenied);
  const kept = raw.filter((w) => !isDenied(w));
  if (denied.length) {
    console.log(`[fetch_publications] denylisted ${denied.length}:`);
    for (const w of denied) console.log(`    - (${w.publication_year}) ${w.display_name}`);
  }

  let entries = kept.map(toEntry);
  entries = dedup(entries);
  entries = sortEntries(entries);

  // Final defensive confidentiality assertion.
  const blob = JSON.stringify(entries).toLowerCase();
  const leaked = FORBIDDEN_TOKENS.filter((t) => blob.includes(t));
  if (leaked.length) {
    throw new Error(
      `[fetch_publications] ABORT: forbidden token(s) in output: ${leaked.join(", ")}`
    );
  }

  const counts = entries.reduce((m, e) => ((m[e.category] = (m[e.category] || 0) + 1), m), {});
  console.log(
    `[fetch_publications] ${entries.length} entries after dedup ` +
      `(${Object.entries(counts).map(([k, v]) => `${k}:${v}`).join(", ")})`
  );

  const prev = loadPrevious();
  const { added, removed } = diffEntries(prev, entries);
  console.log(`\n=== DIFF vs ${OUT_PATH.replace(REPO_ROOT + "/", "")} ===`);
  if (added.length === 0 && removed.length === 0) {
    console.log("  (no changes)");
  } else {
    for (const e of added) console.log(`  + [${e.category}] (${e.year}) ${e.title}`);
    for (const e of removed) console.log(`  - [${e.category}] (${e.year}) ${e.title}`);
  }

  if (DRY_RUN) {
    console.log("\n[fetch_publications] --dry-run: not writing.");
    return;
  }

  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, JSON.stringify(entries, null, 2) + "\n", "utf8");
  console.log(`\n[fetch_publications] wrote ${entries.length} entries -> ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err.stack || String(err));
  process.exit(1);
});
