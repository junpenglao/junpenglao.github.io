/**
 * Journey timeline data — Home centerpiece.
 *
 * TWO PARALLEL LANES (a Gantt-style swimlane, not a fork):
 *   - "career": a segmented line of roles in sequence (Psychologist →
 *     Neuroscientist → Industry data scientist → Researcher of knowledge → ?).
 *   - "oss": a parallel segmented line for the open-source Bayesian work
 *     (2013–present), stacked below and overlapping its time span.
 * `colStart`/`colEnd` are 1-based CSS grid-column lines on a shared time axis.
 *
 * Each era has a SHORT summary; the narrative detail lives in cards. The renderer
 * orders cards: tagged "Note" cards first (a Note may set a meaningful `tag` such
 * as "Method" instead of the generic type), then other artifacts, then a single
 * grouped "Papers" card. Papers map by WHEN THE WORK HAPPENED (the face-perception
 * work, in print 2012→2024, all sits in the Neuroscientist era). Full list on /cv.
 *
 * CONFIDENTIALITY: the "Researcher of knowledge" and "?" segments are a
 * DIRECTION/THESIS only — never name a company or title; no collaborator names
 * tied to the agent pivot. No end date on the industry segment, no departure.
 */

export type ArtifactType =
  | "Paper"
  | "Note"
  | "Thesis"
  | "Tool"
  | "Library"
  | "Book"
  | "Essay"
  | "Post"
  | "Teaching"
  | "Next";

export type Lane = "career" | "oss";

export interface PaperRef {
  title: string;
  venue: string;
  link?: string;
}

export interface Artifact {
  type: ArtifactType;
  title: string;
  blurb: string;
  link?: string;
  /** Optional display label that overrides the type tag (used for Notes). */
  tag?: string;
  /** For Library cards: the associated paper, shown inside the same box. */
  paper?: PaperRef;
  /** If set, the artifact is collected into a grouped card with this label. */
  group?: string;
}

export interface Era {
  id: string;
  title: string;
  place: string;
  period: string;
  summary: string;
  lane: Lane;
  /** 1-based CSS grid-column lines on the shared time axis. */
  colStart: number;
  colEnd: number;
  artifacts: Artifact[];
}

export const JOURNEY: Era[] = [
  {
    id: "psychologist",
    title: "Psychologist",
    place: "China",
    period: "–2009",
    lane: "career",
    colStart: 1,
    colEnd: 2,
    summary:
      "Where it started: psychology, and a quick turn from Freud toward the scientific method.",
    artifacts: [
      {
        type: "Note",
        tag: "Origin",
        title: "Testing a black box",
        blurb:
          "It began with Freud and the meaning of dreams (a cliché) but the scientific side of psychology drew me in fast: how do you observe, test, and theorize about a black box without being fooled by your own blind spots? I was a beginner in statistics, but already taken with how a well-designed experiment can surface a reliable signal from mostly noise.",
      },
      {
        type: "Paper",
        title: "Control deprivation and styles of thinking",
        blurb: "Journal of Personality and Social Psychology, 2012",
        link: "/cv/papers/Zhou_et_al_2011.pdf",
      },
    ],
  },
  {
    id: "neuroscientist",
    title: "Neuroscientist",
    place: "Glasgow → Fribourg",
    period: "2009–2018",
    lane: "career",
    colStart: 2,
    colEnd: 4,
    summary:
      "PhD at Glasgow and a postdoc at Fribourg: how culture shapes visual perception, through eye-tracking, EEG and fMRI. The work continued to appear in print through 2024.",
    artifacts: [
      {
        type: "Note",
        tag: "Method",
        title: "Simulate, reason, revise",
        blurb:
          "At Glasgow I learned MATLAB and leaned on bootstrap and permutation methods for mixed-effect models (iMap4 grew out of that). Never a write-the-proof type: my instinct was to simulate, reason, revise, a hands-on primer for MCMC. With an fMRI scanner in the basement, collecting large datasets was the easy part; making sense of them was the work: cumbersome, manual GLM pipelines, and run after run of inspecting data by hand, which is where I built an intuition for the geometry of parameter space.",
      },
      {
        type: "Note",
        tag: "Fribourg",
        title: "Eye-tracking & the replication crisis",
        blurb:
          "At Fribourg I ran the lab's analytics and worked mostly in eye-tracking, and was drawn into psychology's reproducibility reckoning, the context behind 'Justify Your Alpha'.",
      },
      {
        type: "Thesis",
        title: "Tracking the temporal dynamics of cultural perceptual diversity",
        blurb: "PhD, University of Glasgow, 2014",
        link: "https://theses.gla.ac.uk/5055/2/2014LaoPhD.pdf",
      },
      {
        type: "Tool",
        title: "iMap4",
        blurb:
          "Open-source toolbox for statistical fixation mapping (Behavior Research Methods, 2017).",
        link: "/archive/Projects/imap4.html",
      },
      {
        type: "Teaching",
        title: "University teaching & workshops",
        blurb:
          "Cognitive neuroscience, statistics, and (later) Bayesian PyMC3 workshops.",
        link: "/archive/Teaching/index.html",
      },
      {
        type: "Paper",
        title: "Culture modulates the temporal dynamics of global/local processing",
        blurb: "Culture and Brain, 2013",
        link: "/cv/papers/Lao_Vizioli_Caldara_2013.pdf",
      },
      {
        type: "Paper",
        title: "Mapping female bodily features of attractiveness",
        blurb: "Scientific Reports, 2016",
        link: "/cv/papers/Bovet_et_al_2016.pdf",
      },
      {
        type: "Paper",
        title: "Residual perception of biological motion in cortical blindness",
        blurb: "Neuropsychologia, 2016",
        link: "/cv/papers/Ruffieux_et_al_2016.pdf",
      },
      {
        type: "Paper",
        title: "Culture shapes 7-month-olds' perceptual strategies",
        blurb: "Current Biology, 2016",
        link: "/cv/papers/Geangu_et_al_2016.pdf",
      },
      {
        type: "Paper",
        title: "Fear boosts the early neural coding of faces",
        blurb: "Social Cognitive and Affective Neuroscience, 2017",
        link: "/cv/papers/Turano_et_al_2017.pdf",
      },
      {
        type: "Paper",
        title: "Tracking facial-expression recognition across the life span",
        blurb: "Journal of Vision, 2018",
        link: "/cv/papers/Richoz_et_al_2018.pdf",
      },
      {
        type: "Paper",
        title: "Temporal multivariate pattern analysis (tMVPA)",
        blurb: "Journal of Neuroscience Methods, 2018",
        link: "/cv/papers/Vizioli_et_al_2018.pdf",
      },
      {
        type: "Paper",
        title: "Justify Your Alpha",
        blurb: "Nature Human Behaviour, 2018",
        link: "/cv/papers/Lakens_et_al_2018.pdf",
      },
      {
        type: "Paper",
        title: "Neural representations of faces are tuned to eye movements",
        blurb: "Journal of Neuroscience, 2019",
        link: "/cv/papers/Stacchi_et_al_2019.pdf",
      },
      {
        type: "Paper",
        title: "Recognizing facial expressions of emotion amid noise",
        blurb: "Journal of Vision, 2024",
        link: "/cv/papers/Richoz_et_al_2024.pdf",
      },
    ],
  },
  {
    id: "bayesian",
    title: "Bayesian statistician, open-source developer, mentor",
    place: "",
    period: "2013–present",
    lane: "oss",
    colStart: 3,
    colEnd: 7,
    summary:
      "Taught myself Python and Bayesian statistics around 2013, and it became a second vocation: PyMC, TensorFlow Probability, BlackJAX, and a book.",
    artifacts: [
      {
        type: "Note",
        tag: "Community",
        title: "Built the PyMC community",
        blurb:
          "Around 2013, running a lab's analytics, I taught myself Python and Bayesian statistics by building PyMC models, then started contributing, and the core devs recognized me as one of their own. I set up the PyMC Discourse and spent years answering modeling questions, which built a reputation and a wide-angle view of how people get stuck across very different fields. Workshops and talks followed; later, co-supervising a PhD that carried these methods into cosmology.",
      },
      {
        type: "Library",
        title: "PyMC",
        blurb: "Core developer.",
        link: "https://www.pymc.io/",
        paper: {
          title: "PyMC: a modern, comprehensive probabilistic programming framework",
          venue: "PeerJ Computer Science, 2023",
          link: "https://peerj.com/articles/cs-1516/",
        },
      },
      {
        type: "Library",
        title: "TensorFlow Probability",
        blurb: "Contributor: tfp.mcmc.",
        link: "https://www.tensorflow.org/probability",
        paper: {
          title: "tfp.mcmc: modern MCMC tools built for modern hardware",
          venue: "arXiv, 2020",
          link: "https://arxiv.org/abs/2002.01184",
        },
      },
      {
        type: "Library",
        title: "BlackJAX",
        blurb: "Sole developer and curator: composable Bayesian inference in JAX.",
        link: "https://github.com/blackjax-devs/blackjax",
        paper: {
          title: "BlackJAX: composable Bayesian inference in JAX",
          venue: "arXiv, 2024",
          link: "https://arxiv.org/abs/2402.10797",
        },
      },
      {
        type: "Book",
        title: "Bayesian Modeling and Computation in Python",
        blurb: "Co-author, Chapman & Hall/CRC, 2021.",
        link: "https://bayesiancomputationbook.com",
        group: "Publication",
      },
      {
        type: "Paper",
        title: "MADNESS deblender: MAP with deep neural networks for source separation",
        blurb: "Astronomy & Astrophysics, 2025",
        link: "https://doi.org/10.1051/0004-6361/202451887",
        group: "Publication",
      },
      {
        type: "Paper",
        title: "Bayesian multi-band fitting of alerts for kilonovae detection",
        blurb: "arXiv, 2023",
        link: "https://arxiv.org/abs/2311.04845",
        group: "Publication",
      },
      {
        type: "Paper",
        title:
          "Probabilistic modelling of developmental neurotoxicity based on a simplified adverse outcome pathway network",
        blurb: "Computational Toxicology, 2022",
        link: "/cv/papers/Spînu_et_al_2021.pdf",
        group: "Publication",
      },
    ],
  },
  {
    id: "industry",
    title: "Industry data scientist",
    place: "Zurich",
    period: "2018–present",
    lane: "career",
    colStart: 4,
    colEnd: 5,
    summary:
      "Joined Google in 2018, now a Staff Data Scientist leading a team of four, working mainly on forecasting at scale.",
    artifacts: [
      {
        type: "Note",
        tag: "TensorFlow Probability",
        title: "NUTS in a static graph",
        blurb:
          "By the end of my second postdoc I was tired of running the same experiment with the setup nudged, so I joined Google in 2018, and quickly fell in with the TensorFlow Probability team on the side (a generous '20%'). My main contribution was getting a dynamic-termination NUTS sampler to behave inside a static graph, the basis of the tfp.mcmc paper.",
      },
      {
        type: "Note",
        tag: "COVID → day job",
        title: "Bayesian time series",
        blurb:
          "When COVID hit, that work pulled me into Bayesian time-series modeling, and it fed straight back into the day job: forecasting with structural time series and linear-Gaussian state-space models, at scale. (The book came together around then, too.)",
      },
      {
        type: "Note",
        tag: "Leading",
        title: "Manager, and the 'Bayesian guy'",
        blurb:
          "After the pandemic I moved into management. Three of the four data scientists on my team have since been promoted into senior roles, and I'm still the unofficial 'Bayesian guy' teams call when a model misbehaves.",
      },
      {
        type: "Paper",
        title: "Estimating COVID-19 infection rates with Bayesian mobility models",
        blurb: "medRxiv, 2020",
        link: "https://www.medrxiv.org/content/10.1101/2020.08.06.20169664v1",
      },
      {
        type: "Paper",
        title: "tfp.mcmc: modern MCMC tools built for modern hardware",
        blurb: "arXiv, 2020",
        link: "https://arxiv.org/abs/2002.01184",
      },
    ],
  },
  {
    id: "researcher-of-knowledge",
    title: "Researcher of knowledge",
    place: "",
    period: "2026 →",
    lane: "career",
    colStart: 5,
    colEnd: 6,
    summary:
      "Knowledge as process: how knowledge gets generated when you work with AI agents. Where most of my attention is now.",
    artifacts: [
      {
        type: "Note",
        tag: "The turn",
        title: "From skeptic to convinced",
        blurb:
          "I was a skeptic about the LLM wave, until I started building with agents in early 2026 and quickly found I had more ideas than time. The question I keep pulling at: how knowledge gets generated when you work in this new paradigm.",
      },
      {
        type: "Tool",
        title: "tuningfork",
        blurb: "A sampler benchmark that captures the failure path, not just the result.",
      },
      {
        type: "Tool",
        title: "agent-team",
        blurb: "A multi-agent workflow for developing the BlackJAX ecosystem.",
      },
      {
        type: "Essay",
        title:
          "Knowledge as Process: human-LLM dialogue as externalized expertise",
        blurb: "In progress.",
      },
    ],
  },
  {
    id: "next",
    title: "?",
    place: "",
    period: "Sept 2026",
    lane: "career",
    colStart: 6,
    colEnd: 7,
    summary: "A new chapter begins. More soon.",
    artifacts: [
      {
        type: "Next",
        title: "Something new is taking shape",
        blurb: "Watch this space, September 2026.",
      },
    ],
  },
];
