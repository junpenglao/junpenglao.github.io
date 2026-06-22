/**
 * Work — the /work page: two prominent threads (areas) plus a grayed,
 * text-only "roots" note for the cognitive-science past.
 *
 * CONFIDENTIALITY: items with `flagged: true` are UNANNOUNCED and MUST NOT
 * render unless REVEAL_FLAGGED is true (it defaults to false). The public
 * filter is: items where `public === true` AND (`!flagged || REVEAL_FLAGGED`).
 *
 * Flagged items are NOT stored in this tracked, public file — they live only in
 * the gitignored sibling work.secret.ts. "sagent" is understated open-source
 * only — never tied to any company/role.
 */

export type AreaId = "bayesian" | "agents";

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
  /** Which thread the card sits under on /work. */
  area?: AreaId;
  /** Whether the item is shown publicly at all. */
  public: boolean;
  /** Gated behind REVEAL_FLAGGED. Default false. */
  flagged?: boolean;
}

/** The two prominent threads, in display order. */
export interface WorkArea {
  id: AreaId;
  title: string;
  framing: string;
}

export const AREAS: WorkArea[] = [
  {
    id: "agents",
    title: "Thinking with AI agents — knowledge as process",
    framing:
      "Could LLMs generate <strong><em>real</em></strong> knowledge? Yes — but there's an even lower-hanging fruit: explaining and correcting one surfaces your own tacit knowledge — working with an agent is a form of teaching, and teaching is how you find out what you actually know. I'm building and writing to test that in public.",
  },
  {
    id: "bayesian",
    title: "Probabilistic programming & Bayesian computation",
    framing:
      "Making rigorous Bayesian inference composable, fast, and genuinely usable — maintained in the open, with a community I care about.",
  },
];

/** Grayed, text-only block: the cognitive-science roots and the older,
 *  admittedly-speculative questions that fed the knowledge-as-process thread. */
export const ROOTS = {
  title: "Roots — cognitive science",
  body:
    "Before Bayesian computation I trained as a cognitive scientist — a PhD and postdoc studying how culture shapes visual perception. Underneath the experiments were larger, less testable questions I never stopped turning over: how a mind models other minds, and how cognition and consciousness might arise from computation. They were closer to philosophy than experiment then, and still are. The LLM/agentic era has pulled them back into the light, so I'm slowly writing them down — clearly marked as speculation.",
  tool: {
    label: "iMap4",
    href: "https://github.com/iBMLab/iMap4",
    note: "a toolbox for statistical fixation mapping of eye-movement data",
  },
  caveat: "Speculative · not peer-reviewed · revisiting, not predicting.",
} as const;

export const WORK: WorkItem[] = [
  {
    title: "BlackJAX",
    role: "Sole developer & curator",
    blurb:
      "Composable, fast Bayesian inference in JAX — samplers as building blocks, with the sampling-book companion of tutorials and worked recipes.",
    links: [
      { label: "GitHub", href: "https://github.com/blackjax-devs/blackjax" },
      { label: "sampling-book", href: "https://blackjax-devs.github.io/sampling-book/" },
    ],
    tags: ["Bayesian", "JAX", "open-source"],
    area: "bayesian",
    public: true,
  },
  {
    title: "PyMC",
    role: "Core developer",
    blurb:
      "A leading probabilistic programming library in Python for Bayesian modeling and inference.",
    links: [{ label: "Website", href: "https://www.pymc.io/" }],
    tags: ["Bayesian", "PPL", "open-source"],
    area: "bayesian",
    public: true,
  },
  {
    title: "TensorFlow Probability",
    role: "Contributor",
    blurb: "Probabilistic reasoning and statistical analysis — contributions to tfp.mcmc.",
    links: [{ label: "Website", href: "https://www.tensorflow.org/probability" }],
    tags: ["Bayesian", "MCMC", "open-source"],
    area: "bayesian",
    public: true,
  },
  {
    title: "Bayesian Modeling and Computation in Python",
    role: "Co-author",
    blurb:
      "A hands-on book on Bayesian modeling and computation (Martin, Kumar, Lao; CRC Press, 2021).",
    links: [{ label: "Book site", href: "https://bayesiancomputationbook.com" }],
    tags: ["book", "Bayesian"],
    area: "bayesian",
    public: true,
  },
  {
    title: "agent-team",
    role: "Creator",
    blurb:
      "A disciplined multi-agent workflow for developing the BlackJAX ecosystem — roles plus a worklog of threads, decisions, and lessons as a knowledge substrate.",
    links: [{ label: "GitHub", href: "https://github.com/blackjax-devs/agent-team" }],
    tags: ["agents", "open-source"],
    area: "agents",
    public: true,
  },
  {
    title: "sagent",
    role: "Open-source contributor",
    blurb: "Multi-provider agent CLI and Python library.",
    links: [{ label: "GitHub", href: "https://github.com/rekursiv-ai/sagent" }],
    tags: ["agents", "open-source"],
    area: "agents",
    public: true,
  },
  {
    title: "tuningfork",
    role: "Creator",
    blurb:
      "A sampler benchmark built on the garden of forking paths: the branches that fail aren't waste, they're knowledge. Failure path as knowledge.",
    links: [{ label: "GitHub", href: "https://github.com/blackjax-devs/tuningfork" }],
    tags: ["Bayesian", "benchmark", "open-source"],
    area: "agents",
    public: true,
  },

  // ----- FLAGGED items are UNANNOUNCED and intentionally NOT in this tracked,
  // public file. They live only in the gitignored sibling work.secret.ts
  // (export const SECRET_WORK: WorkItem[]), which /work merges in via
  // import.meta.glob and renders ONLY when REVEAL_FLAGGED === true. Never put
  // unannounced names / titles / links in this committed file.
];
