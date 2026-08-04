/**
 * Site configuration for "Motif of the Mind" — junpenglao.xyz
 *
 * REVEAL_FLAGGED gated the rekursiv.ai move while it was unannounced. Flipped
 * true at the 2026-08-04 reveal; flagged items now render. Kept as a switch so
 * any future unannounced item can reuse the same *.secret.ts mechanism.
 */
export const REVEAL_FLAGGED = true as const;

export const SITE = {
  name: "Junpeng Lao",
  wordmark: "Motif of the Mind",
  url: "https://junpenglao.xyz",
  domain: "junpenglao.xyz",
  email: "junpenglao@gmail.com",
  description:
    "Bayesian computation, probabilistic programming, and thinking with AI agents: observe, update, repeat, until it lands. Built in the open, with a community I care about.",
  tagline: "Well-calibrated, occasionally airborne.",
  locale: "en",
} as const;

export type NavItem = { label: string; href: string };

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "CV", href: "/cv/" },
  { label: "Work", href: "/work/" },
  { label: "Writing", href: "/writing/" },
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
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/junpeng-lao/",
    handle: "junpeng-lao",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/relatableriding",
    handle: "relatableriding",
  },
  { label: "Email", href: "mailto:junpenglao@gmail.com", handle: "junpenglao@gmail.com" },
];

/** Giscus comments (GitHub Discussions). Threads are filed under the
 *  Announcements category; requires the giscus app installed on the repo. */
export const COMMENTS = {
  enabled: true,
  repo: "junpenglao/junpenglao.github.io",
  repoId: "R_kgDOAugFcQ",
  category: "Announcements",
  categoryId: "DIC_kwDOAugFcc4C_rsr",
} as const;
