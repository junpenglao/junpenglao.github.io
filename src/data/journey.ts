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
 * The Google era closed in 2026 and the final segment names rekursiv.ai
 * (revealed 2026-08-04); the "Researcher of knowledge" segment stays a
 * direction/thesis, which is what the rekursiv role makes into a job.
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
      "I started in psychology with Freud, then turned pretty quickly toward the scientific method.",
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
      "My PhD at Glasgow and postdoc at Fribourg focused on how culture shapes visual perception, using eye-tracking, EEG, and fMRI. The work kept appearing in print through 2024.",
    artifacts: [
      {
        type: "Note",
        tag: "Method",
        title: "Simulate, reason, revise",
        blurb:
          "At Glasgow I learned MATLAB and leaned on bootstrap and permutation methods for mixed-effect models (iMap4 grew out of that). I was never a write-the-proof type: my instinct was to simulate, reason, revise. That became my hands-on primer for MCMC. With an fMRI scanner in the basement, collecting large datasets was the easy part. Making sense of them meant cumbersome, manual GLM pipelines and inspecting run after run by hand. That is where I built an intuition for the geometry of parameter space.",
      },
      {
        type: "Note",
        tag: "Fribourg",
        title: "Eye-tracking & the replication crisis",
        blurb:
          "At Fribourg I ran our lab's analytics, mostly for eye-tracking work, and got pulled into psychology's reproducibility reckoning. That was the context for 'Justify Your Alpha'.",
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
      "I taught myself Python and Bayesian statistics around 2013. That grew into a second vocation: PyMC, TensorFlow Probability, BlackJAX, and a book.",
    artifacts: [
      {
        type: "Note",
        tag: "Community",
        title: "Built the PyMC community",
        blurb:
          "Around 2013, I was the lead researcher in our lab, responsible for data analytics. I taught myself Python and Bayesian statistics by building models in PyMC. I started contributing, and the core devs recognized me as one of their own. I set up the PyMC Discourse and spent years answering modeling questions. That work built my reputation and gave me a wide-angle view of how people get stuck across very different fields. Workshops and talks followed; later I co-supervised a PhD that carried these methods into cosmology.",
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
    period: "2018–2026",
    lane: "career",
    colStart: 4,
    colEnd: 5,
    summary:
      "Eight years at Google, ending as a Staff Data Scientist leading a team of four, working mainly on forecasting at scale.",
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
        title: "Manager and the 'Bayesian guy'",
        blurb:
          "After the pandemic I moved into management. Three of the four data scientists on my team were promoted to senior roles, and I stayed the unofficial 'Bayesian guy' teams called when a model misbehaved.",
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
      "Most of my attention now is on knowledge as process: how it gets generated when you work with AI agents.",
    artifacts: [
      {
        type: "Note",
        tag: "The turn",
        title: "From skeptic to convinced",
        blurb:
          "I was skeptical of the LLM wave until I started building with agents in early 2026 and quickly found I had more ideas than time. The thread I keep pulling on is how knowledge gets generated when you work this way.",
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
    title: "rekursiv.ai",
    place: "Zurich / remote",
    period: "Sept 2026 →",
    lane: "career",
    colStart: 6,
    colEnd: 7,
    summary:
      "Founding Scientist / Chief Epistemologist at rekursiv.ai, building AI Scientists that autonomously create knowledge.",
    artifacts: [
      {
        type: "Next",
        title: "Founding Scientist / Chief Epistemologist",
        blurb:
          "Not just agents, but scientists: rekursiv builds AI Scientists that hypothesize, design and run experiments, interpret results, and review each other's work.",
        link: "https://rekursiv.ai",
      },
    ],
  },
];
