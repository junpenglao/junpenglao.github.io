/**
 * Journey timeline data — Home centerpiece.
 *
 * TWO PARALLEL LANES (a Gantt-style swimlane, not a fork):
 *   - "career": a segmented line of roles in sequence (Psychologist →
 *     Neuroscientist → Industry data scientist → Researcher of knowledge → ?).
 *   - "oss": a parallel segmented line for the open-source Bayesian work
 *     (2016–present), stacked BELOW and overlapping its time span.
 * `colStart`/`colEnd` are 1-based CSS grid-column lines on a shared time axis;
 * abutting segments form one continuous, role-segmented line per lane.
 *
 * CONFIDENTIALITY: the "Researcher of knowledge" and "?" segments are a
 * DIRECTION/THESIS only — never name a company or title. "sagent" appears only as
 * public open-source the owner contributes to (the open-source GitHub org link is
 * owner-approved). No end date on the industry segment, and no departure language.
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

export interface Artifact {
  type: ArtifactType;
  title: string;
  blurb: string;
  link?: string;
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
    summary: "Began in psychology: how we read other minds, and faces.",
    artifacts: [
      {
        type: "Paper",
        title: "Social judgments from faces are universal (2010)",
        blurb: "How people infer character and intention from faces.",
      },
      {
        type: "Paper",
        title: "Control deprivation and styles of thinking (JPSP)",
        blurb: "How a loss of control reshapes the way people reason.",
      },
      {
        type: "Note",
        title: "Trained as a psychologist",
        blurb: "Hooked on perception and social cognition.",
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
      "PhD (Glasgow) and postdoc (Fribourg): how culture shapes visual perception — eye-tracking, EEG, fMRI.",
    artifacts: [
      {
        type: "Thesis",
        title:
          "Tracking the temporal dynamics of cultural perceptual diversity (PhD, 2014)",
        blurb: "Doctoral work on the time course of culture in perception.",
      },
      {
        type: "Paper",
        title:
          "Cultural Diversity in Eye Movements is Shaped by Nurture not Nature (2016)",
        blurb: "Evidence that experience, not biology, drives gaze differences.",
      },
      {
        type: "Tool",
        title: "iMap4",
        blurb:
          "Open-source toolbox for statistical fixation mapping of eye-movement data.",
        link: "/archive/Projects/imap4.html",
      },
      {
        type: "Teaching",
        title: "University teaching & workshops",
        blurb:
          "Cognitive neuroscience, statistics, and (later) Bayesian PyMC3 workshops.",
        link: "/archive/Teaching/index.html",
      },
    ],
  },
  {
    id: "bayesian",
    title: "Bayesian statistician & open-source developer",
    place: "",
    period: "2016–present",
    lane: "oss",
    colStart: 3,
    colEnd: 7,
    summary:
      "Fell for Bayesian computation, running alongside the day job: PyMC core dev, TensorFlow Probability, co-authored a book.",
    artifacts: [
      {
        type: "Library",
        title: "PyMC",
        blurb: "Core developer.",
        link: "https://www.pymc.io/",
      },
      {
        type: "Library",
        title: "TensorFlow Probability",
        blurb: "tfp.mcmc.",
        link: "https://www.tensorflow.org/probability",
      },
      {
        type: "Book",
        title: "Bayesian Modeling and Computation in Python (CRC Press, 2021)",
        blurb: "Co-author.",
        link: "https://bayesiancomputationbook.com",
      },
      {
        type: "Post",
        title: "Marginal Likelihood in Python and PyMC3",
        blurb: "A deep dive into computing marginal likelihoods.",
        link: "/archive/Blogs/posts/2017-11-22-Marginal_likelihood_in_PyMC3.html",
      },
      {
        type: "Post",
        title: "Out-of-sample prediction with missing data",
        blurb: "Linear models, missing data, and posterior prediction.",
        link: "/archive/Blogs/posts/2017-10-23-OOS_missing.html",
      },
      {
        type: "Post",
        title: "Mixture models as hypothesis testing",
        blurb: "Reframing mixture estimation as model comparison.",
        link: "/archive/Blogs/posts/2016-12-07-Mixture_model_estimation_as_hypothesis_testing.html",
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
    summary: "Applied data science and forecasting at scale, in industry (at Google).",
    artifacts: [
      {
        type: "Paper",
        title:
          "Estimating the Changing Infection Rate of COVID-19 with Bayesian Models of Mobility (2020)",
        blurb: "Bayesian modeling of mobility to track infection dynamics.",
      },
      {
        type: "Library",
        title: "BlackJAX",
        blurb: "Composable Bayesian inference in JAX (lead maintainer).",
        link: "https://github.com/blackjax-devs/blackjax",
      },
      {
        type: "Note",
        title: "Large-scale forecasting",
        blurb: "Applied machine learning at scale.",
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
      "Knowledge as process: working with AI agents to generate knowledge that did not exist before.",
    artifacts: [
      {
        type: "Tool",
        title: "BlackJAX + tuningfork",
        blurb: "Capturing the failure path, not just the result.",
      },
      {
        type: "Tool",
        title: "sagent",
        blurb: "Open-source multi-provider agent CLI and Python library (contributor).",
        link: "https://github.com/rekursiv-ai/sagent",
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
        blurb: "Watch this space — September 2026.",
      },
    ],
  },
];
