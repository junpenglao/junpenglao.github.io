// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import fs from "node:fs";
import path from "node:path";

// Draft posts are built and reachable by direct URL, but must stay OUT of the
// public sitemap (they're also noindex and off the writing list). Collect draft
// slugs from the content frontmatter so this needs no per-draft maintenance —
// any post whose status is `draft` (the schema default) is auto-excluded.
const WRITING_DIR = "src/content/writing";
const draftSlugs = fs
  .readdirSync(WRITING_DIR)
  .filter((f) => /\.mdx?$/.test(f))
  .filter((f) => {
    const fm =
      fs.readFileSync(path.join(WRITING_DIR, f), "utf8").split(/^---\s*$/m)[1] ?? "";
    const status = fm.match(/^\s*status:\s*["']?(\w+)/m)?.[1] ?? "draft";
    return status === "draft";
  })
  .map((f) => f.replace(/\.mdx?$/, ""));

const isDraftUrl = (page) =>
  draftSlugs.some((slug) => new RegExp(`/writing/${slug}/?$`).test(page));

// https://astro.build/config
export default defineConfig({
  site: "https://junpenglao.xyz",
  integrations: [
    sitemap({
      filter: (page) => !isDraftUrl(page),
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
