#!/usr/bin/env node
// Voice lint: a deterministic backstop for the no-em-dash voice rule.
//
// ERROR (fails the build): the em-dash. The owner's voice has a 0.0% em-dash rate
// across 4,448 tweets, so a — in a post is by definition not him.
// WARN (advisory, never fails): the softer LLM tells the voice profile bans —
// "X, not Y" used as a landing, restating tails, and the en-dash. These have false
// positives, so they print but do not block; the real judgment is the /voice pass.
//
// Fenced/inline code and (for the advisory checks) HTML are masked first, so the
// post's own code block that literally contains the string "X, not Y" as an example
// is not flagged. Masking blanks characters in place, so line/col stay accurate.
//
// Scope: BLOG POSTS ONLY (src/content/writing). The em-dash rule is a post rule;
// the rest of the site (page copy, timeline, CV data) may use em-dashes freely.
//
// Usage: node scripts/voice-lint.mjs [file ...]   (defaults to blog posts)

import fs from "node:fs";
import path from "node:path";

const WRITING_DIR = "src/content/writing";

// --- targets -------------------------------------------------------------
function defaultTargets() {
  const files = [];
  if (fs.existsSync(WRITING_DIR)) {
    for (const f of fs.readdirSync(WRITING_DIR)) {
      if (/\.mdx?$/.test(f)) files.push(path.join(WRITING_DIR, f));
    }
  }
  return files;
}
const targets = (process.argv.slice(2).length ? process.argv.slice(2) : defaultTargets())
  .filter((f) => /\.mdx?$/.test(f) && fs.existsSync(f));

// --- masking helpers -----------------------------------------------------
function rangesOf(text, re) {
  const out = [];
  if (re.global) {
    for (const m of text.matchAll(re)) out.push([m.index, m.index + m[0].length]);
  } else {
    const m = text.match(re);
    if (m && m.index != null) out.push([m.index, m.index + m[0].length]);
  }
  return out;
}
function mask(text, ranges) {
  const a = [...text];
  for (const [s, e] of ranges)
    for (let i = s; i < e; i++) if (a[i] !== "\n") a[i] = " ";
  return a.join("");
}
function lineColAt(text, idx) {
  let line = 1, last = -1;
  for (let i = 0; i < idx; i++) if (text[i] === "\n") { line++; last = i; }
  return { line, col: idx - last };
}
function snippet(text, idx, len) {
  const s = Math.max(0, idx - 28), e = Math.min(text.length, idx + len + 28);
  return text.slice(s, e).replace(/\n/g, " ").trim();
}

// --- checks --------------------------------------------------------------
const FRONTMATTER = /^---\n[\s\S]*?\n---\n/;
const FENCE = /```[\s\S]*?```/g;
const INLINE = /`[^`\n]*`/g;
const HTML = /<[^>]+>/g;

const EM_DASH = /[—―]/g;          // — (em dash), ― (horizontal bar)
const EN_DASH = /–/g;                   // – (en dash)
const X_NOT_Y = /,\s+not\s+[^.!?\n]{1,60}[.!?]/g; // "..., not ...." landing
const TAILS = new RegExp(
  [
    "which is (?:the )?(?:real )?(?:lesson|point|moral|whole point|takeaway|thing)",
    "that is (?:the )?(?:whole )?(?:point|moral|lesson|takeaway)",
    "the real (?:lesson|point|moral|takeaway)",
    "which is to say",
    "needless to say",
    "it goes without saying",
    "at the end of the day",
    "the fact (?:of the matter )?is",
  ].join("|"),
  "gi"
);
// Telegraphing transitions: "Now the honest part." and family. Announcing a beat instead
// of just landing it is a recognizable LLM tell. Cut the signpost, say the thing.
const TELEGRAPHS = new RegExp(
  [
    "now (?:for )?the (?:honest|hard|fun|good|real|best|worst|interesting|tricky|important|surprising) part",
    "here'?s the (?:honest|hard|fun|good|real|interesting|tricky|important|surprising) part",
    "(?:and )?(?:now|here'?s) the honest part",
    "the honest part",
    "let'?s be honest",
    "(?:but )?here'?s the (?:thing|kicker|rub|catch)",
  ].join("|"),
  "gi"
);
// Claude-isms: stock phrases the owner would never write. Flat ban list (case-insensitive).
const CLAUDEISMS = /\b(load-bearing|the honest take|changes the picture significantly|the smoking gun)\b/gi;

let errors = 0, warns = 0;
for (const file of targets) {
  const text = fs.readFileSync(file, "utf8");
  const fm = rangesOf(text, FRONTMATTER);
  const fences = rangesOf(text, FENCE);
  const emText = mask(text, fences);                       // em-dash: code masked, frontmatter kept
  const proseText = mask(text, [
    ...fm, ...fences, ...rangesOf(text, INLINE), ...rangesOf(text, HTML),
  ]);                                                      // advisories: prose only

  const hits = [];
  for (const m of emText.matchAll(EM_DASH))
    hits.push(["error", m.index, m[0].length, "em-dash — (banned: 0% in his voice; use a period/comma/colon/parenthesis)"]);
  for (const m of proseText.matchAll(EN_DASH))
    hits.push(["warn", m.index, m[0].length, "en-dash – (use a hyphen for ranges)"]);
  for (const m of proseText.matchAll(X_NOT_Y))
    hits.push(["warn", m.index, m[0].length, `"X, not Y" antithesis — flag if it is a paragraph landing`]);
  for (const m of proseText.matchAll(TAILS))
    hits.push(["warn", m.index, m[0].length, `restating tail "${m[0]}" — land flat instead`]);
  for (const m of proseText.matchAll(TELEGRAPHS))
    hits.push(["warn", m.index, m[0].length, `telegraphing transition "${m[0]}" - cut the signpost, just say the thing`]);
  for (const m of proseText.matchAll(CLAUDEISMS))
    hits.push(["warn", m.index, m[0].length, `Claude-ism "${m[0]}" - the owner would not write this; cut or replace`]);

  if (!hits.length) continue;
  hits.sort((a, b) => a[1] - b[1]);
  console.log(`\n${file}`);
  for (const [level, idx, len, msg] of hits) {
    const { line, col } = lineColAt(text, idx);
    const tag = level === "error" ? "ERROR" : "warn ";
    console.log(`  ${tag} ${line}:${col}  ${msg}\n         «${snippet(text, idx, len)}»`);
    console.log(`::${level === "error" ? "error" : "warning"} file=${file},line=${line},col=${col}::${msg}`);
    if (level === "error") errors++; else warns++;
  }
}

console.log(`\nvoice-lint: ${errors} error(s), ${warns} warning(s) across ${targets.length} file(s).`);
if (errors) {
  console.log("Em-dashes are a hard rule. Remove them, then re-run.");
  process.exit(1);
}
