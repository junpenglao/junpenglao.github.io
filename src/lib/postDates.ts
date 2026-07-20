import { execSync } from "node:child_process";
import type { CollectionEntry } from "astro:content";

// Last-updated is git-driven: the file's last commit date, so editing and
// committing a post IS the update (no frontmatter to babysit). A frontmatter
// `updated` still wins when present, to pin a date and ignore mechanical
// commits. Needs full git history at build time (deploy.yml: fetch-depth: 0);
// falls back to the publish date if git is unavailable. Shared by the post
// page and the writing list so both agree on the same date.
function gitLastUpdated(id: string): Date | null {
  try {
    const d = execSync(`git log -1 --format=%cs -- "src/content/writing/${id}"`, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    return d ? new Date(`${d}T00:00:00Z`) : null;
  } catch {
    return null;
  }
}

export function lastUpdated(post: CollectionEntry<"writing">): Date {
  return post.data.updated ?? gitLastUpdated(post.id) ?? post.data.date;
}
