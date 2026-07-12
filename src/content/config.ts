import { defineCollection, z } from "astro:content";

/**
 * "writing" content collection.
 *
 * status: draft | working | stable
 *   - The public Writing list MUST exclude status === "draft".
 *   - DocMeta shows status + last-updated on the post page.
 *
 * type: essay | post
 *   - "essay": longer, evergreen, canonical pieces. Surfaced in the "Essays" block
 *     at the top of /writing. Reserve for thesis-level work (e.g. knowledge-as-process).
 *   - "post": shorter, timely notes — the reverse-chronological stream. Default.
 */
const writing = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    /** Last meaningful revision; used by DocMeta. Defaults to `date` if omitted. */
    updated: z.coerce.date().optional(),
    status: z.enum(["draft", "working", "stable"]).default("draft"),
    type: z.enum(["essay", "post"]).default("post"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { writing };
