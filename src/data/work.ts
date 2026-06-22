/**
 * Work items — rendered as cards on /work.
 *
 * CONFIDENTIALITY: items with `flagged: true` are UNANNOUNCED and MUST NOT
 * render unless REVEAL_FLAGGED is true (it defaults to false). The public
 * filter is: items where `public === true` AND (`!flagged || REVEAL_FLAGGED`).
 *
 * Flagged items are NOT stored in this tracked, public file — they live only in
 * the gitignored sibling work.secret.ts. "sagent" is understated open-source
 * only — never tied to any company/role.
 */

export interface WorkLink {
  label: string;
  href: string;
}

export interface WorkItem {
  title: string;
  role: string;
  blurb: string;
  links: WorkLink[];
  tags: string[];
  /** Whether the item is shown publicly at all. */
  public: boolean;
  /** Gated behind REVEAL_FLAGGED. Default false. */
  flagged?: boolean;
}

export const WORK: WorkItem[] = [
  {
    title: "BlackJAX",
    role: "Sole developer & curator",
    blurb:
      "Composable, fast Bayesian inference in JAX — samplers as building blocks. Plus tuningfork and sampling-book.",
    links: [
      { label: "GitHub", href: "https://github.com/blackjax-devs/blackjax" },
      { label: "sampling-book", href: "https://blackjax-devs.github.io/sampling-book/" },
    ],
    tags: ["Bayesian", "JAX", "open-source"],
    public: true,
  },
  {
    title: "PyMC",
    role: "Core developer",
    blurb:
      "A leading probabilistic programming library in Python for Bayesian modeling and inference.",
    links: [{ label: "Website", href: "https://www.pymc.io/" }],
    tags: ["Bayesian", "PPL", "open-source"],
    public: true,
  },
  {
    title: "TensorFlow Probability",
    role: "Contributor",
    blurb: "Probabilistic reasoning and statistical analysis — contributions to tfp.mcmc.",
    links: [{ label: "Website", href: "https://www.tensorflow.org/probability" }],
    tags: ["Bayesian", "MCMC", "open-source"],
    public: true,
  },
  {
    title: "Bayesian Modeling and Computation in Python",
    role: "Co-author",
    blurb:
      "A hands-on book on Bayesian modeling and computation (Martin, Kumar, Lao; CRC Press, 2021).",
    links: [{ label: "Book site", href: "https://bayesiancomputationbook.com" }],
    tags: ["book", "Bayesian"],
    public: true,
  },
  {
    title: "iMap4",
    role: "Creator",
    blurb:
      "Open-source toolbox for statistical fixation mapping of eye-movement data.",
    links: [{ label: "GitHub", href: "https://github.com/iBMLab/iMap4" }],
    tags: ["eye-tracking", "statistics", "open-source"],
    public: true,
  },
  {
    title: "sagent",
    role: "Open-source contributor",
    blurb: "Multi-provider agent CLI and Python library.",
    links: [{ label: "GitHub", href: "https://github.com/rekursiv-ai/sagent" }],
    tags: ["agents", "open-source"],
    public: true,
  },

  // ----- FLAGGED items are UNANNOUNCED and intentionally NOT in this tracked,
  // public file. They live only in the gitignored sibling work.secret.ts
  // (export const SECRET_WORK: WorkItem[]), which /work merges in via
  // import.meta.glob and renders ONLY when REVEAL_FLAGGED === true. Never put
  // unannounced names / titles / links in this committed file.
];
