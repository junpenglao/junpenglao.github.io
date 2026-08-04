/**
 * Work — the /work page: two prominent threads (areas) plus a grayed,
 * text-only "roots" note for the cognitive-science past.
 *
 * Items render in array order within their area, so the first entry of an area
 * is that area's lead card.
 *
 * Any item with `flagged: true` is UNANNOUNCED and renders only when
 * REVEAL_FLAGGED is true. The public filter is: `public === true` AND
 * (`!flagged || REVEAL_FLAGGED`). Flagged items are never stored in this
 * tracked, public file; they live only in the gitignored work.secret.ts.
 * There are none at present (the rekursiv move was revealed 2026-08-04).
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

export const FEATURED_WORK = {
  title: "rekursiv.ai",
  headline: "Autonomous science discovery with AI",
  role: "Founding Scientist / Chief Epistemologist",
  blurb:
    "We're building a cockpit for autonomous research: teams of AI Scientists that form hypotheses, design evals, run experiments, and review each other's work. Every claim is traced back to evidence.",
  links: [
    { label: "Explore rekursiv.ai", href: "https://rekursiv.ai" },
    {
      label: "See what an AI team discovered",
      href: "https://rekursiv.ai/blog/pushing-limits-arc-agi/",
    },
  ],
} as const;

/** The two prominent threads, in display order. */
export interface WorkArea {
  id: AreaId;
  title: string;
  framing: string;
}

export const AREAS: WorkArea[] = [
  {
    id: "agents",
    title: "Thinking with AI agents: knowledge as process",
    framing:
      "Can LLMs generate <strong><em>real</em></strong> knowledge? Yes. But explaining something to an agent, then correcting its answer, also surfaces your own tacit knowledge. Working with an agent is a form of teaching, and teaching is how you find out what you actually know. I'm building and writing in public to test that.",
  },
  {
    id: "bayesian",
    title: "Probabilistic programming & Bayesian computation",
    framing:
      "I work on making rigorous Bayesian inference composable, fast, and genuinely usable. The tools are built in the open, with a community I care about.",
  },
];

/** Grayed, text-only block: the cognitive-science roots and the older,
 *  admittedly-speculative questions that fed the knowledge-as-process thread. */
export const ROOTS = {
  title: "Roots: cognitive science",
  body:
    "Before Bayesian computation, I trained as a cognitive scientist. My PhD and postdoc focused on how culture shapes visual perception. Underneath the experiments were larger, less testable questions I never stopped turning over: how a mind models other minds, and how cognition and consciousness might arise from computation. They were closer to philosophy than experiment then, and still are. Working with LLMs and agents has brought me back to those questions, so I'm slowly writing them down (clearly marked as speculation).",
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
      "Fast, composable Bayesian inference in JAX: samplers as building blocks, plus a companion sampling-book of tutorials and worked recipes.",
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
    blurb: "Probabilistic reasoning and statistical analysis: contributions to tfp.mcmc.",
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
    title: "tuningfork",
    role: "Creator",
    blurb:
      "A sampler benchmark built around the garden of forking paths. It records the branches that fail, because the failure path is knowledge too.",
    links: [{ label: "GitHub", href: "https://github.com/blackjax-devs/tuningfork" }],
    tags: ["Bayesian", "benchmark", "open-source"],
    area: "agents",
    public: true,
  },
  {
    title: "agent-team",
    role: "Creator",
    blurb:
      "A disciplined multi-agent workflow for developing the BlackJAX ecosystem: explicit roles, plus a worklog that keeps the threads, decisions, and lessons agents would otherwise lose.",
    links: [{ label: "GitHub", href: "https://github.com/blackjax-devs/agent-team" }],
    tags: ["agents", "open-source"],
    area: "agents",
    public: true,
  },
  {
    title: "memoires",
    role: "Creator",
    blurb:
      "An expert-curated catalog of Bayesian modeling knowledge, distilled from years of community forums. Evidence is graded and contradictions stay visible, so an agent can consult the hard-won answers instead of deriving them again.",
    links: [{ label: "GitHub", href: "https://github.com/arcueil/memoires" }],
    tags: ["Bayesian", "agents", "open-source"],
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

  // ----- Any FUTURE unannounced item stays out of this tracked, public file.
  // It lives only in a gitignored sibling work.secret.ts (export const
  // SECRET_WORK: WorkItem[]), which /work merges in via import.meta.glob and
  // renders ONLY when REVEAL_FLAGGED === true.
];

/** Public inline links used in area framing text. */
export const AREA_LINKS = {
  // "Yes" in the agents-area framing → proof that LLMs can generate real knowledge.
  agentsYes:
    "https://rekursiv.ai/blog/an-ai-team-invented-an-algorithm-i-wouldnt-have/",
} as const;
