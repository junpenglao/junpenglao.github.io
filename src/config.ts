/**
 * Site configuration for "Motif of the Mind" — junpenglao.xyz
 *
 * REVEAL_FLAGGED gates UNANNOUNCED content. It MUST default to false.
 * No flagged content may render while this is false; flagged items live only in
 * gitignored *.secret.ts files. Check this flag before rendering any `flagged` item.
 */
export const REVEAL_FLAGGED = false as const;

export const SITE = {
  name: "Junpeng Lao",
  wordmark: "Motif of the Mind",
  url: "https://junpenglao.xyz",
  domain: "junpenglao.xyz",
  email: "junpenglao@gmail.com",
  description:
    "Bayesian computation, probabilistic programming, and thinking with AI agents — observe, update, repeat, until it lands. Built in the open, with a community I care about.",
  tagline: "Well-calibrated, occasionally airborne.",
  locale: "en",
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Writing", href: "/writing/" },
  { label: "Work", href: "/work/" },
  { label: "CV", href: "/cv/" },
];

export type SocialLink = { label: string; href: string; handle?: string };

export const SOCIALS: SocialLink[] = [
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=J-KhWL8AAAAJ",
    handle: "J-KhWL8AAAAJ",
  },
  { label: "GitHub", href: "https://github.com/junpenglao", handle: "junpenglao" },
  {
    label: "Instagram",
    href: "https://instagram.com/relatableriding",
    handle: "relatableriding",
  },
  { label: "Email", href: "mailto:junpenglao@gmail.com", handle: "junpenglao@gmail.com" },
];

/** Giscus comments — configured but DISABLED by default. Build agents: fill TODOs. */
export const COMMENTS = {
  enabled: false,
  // TODO(repo owner): set giscus repo / category ids before enabling.
  repo: "", // e.g. "junpenglao/junpenglao.github.io"
  repoId: "", // TODO
  category: "", // TODO
  categoryId: "", // TODO
} as const;
