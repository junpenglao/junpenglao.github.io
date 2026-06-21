// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://junpenglao.xyz",
  integrations: [
    sitemap({
      // Keep draft posts out of the public sitemap. Draft pages are also
      // marked noindex and excluded from the writing list; this stops search
      // engines from discovering unfinished work via the sitemap.
      filter: (page) =>
        !/\/writing\/knowledge-as-process-reply\/?$/.test(page),
    }),
  ],
  build: {
    inlineStylesheets: "auto",
  },
});
