/**
 * Curriculum vitae data — Junpeng Lao.
 *
 * Self-contained and typed. This is the SINGLE source of truth for /cv (v1);
 * it does NOT depend on the OpenAlex pipeline. Extracted from the legacy
 * cv/index.html and cv/papers/index.html.
 *
 * CONFIDENTIALITY: This file is committed to a PUBLIC repo and rendered into
 * PUBLIC HTML. It MUST NOT contain any unannounced career move. The industry
 * era is "Data Scientist, Google (2018–present)" with NO end date and NO
 * departure, no unannounced title, no unannounced affiliation.
 *
 * Paper PDFs are migrated to /public/cv/papers/<file> by the Pipelines agent;
 * reference them at /cv/papers/<file>. External PDFs keep their absolute URLs.
 */

export interface ContactLink {
  label: string;
  href: string;
  /** Optional short display value (e.g. handle / email). */
  display?: string;
}

export interface EducationEntry {
  degree: string;
  field?: string;
  institution: string;
  location?: string;
  period: string;
  note?: string;
}

export interface PositionEntry {
  role: string;
  organization: string;
  location?: string;
  /** Use "2018–present" style; NEVER an end date on the current industry era. */
  period: string;
  note?: string;
}

export interface BookEntry {
  authors: string;
  year: string;
  title: string;
  publisher: string;
  href?: string;
}

export interface SoftwareEntry {
  name: string;
  role: string;
  blurb: string;
  href?: string;
}

export interface Publication {
  authors: string;
  year: string;
  title: string;
  /** Journal / venue, italicised in the render. */
  venue: string;
  doi?: string;
  /** Primary PDF link. Internal paths look like /cv/papers/<file>. */
  pdf?: string;
  /** Optional supplementary-information link. */
  sup?: string;
  /** Optional preprint / alternate link. */
  link?: { label: string; href: string };
  /** Author-position footnote, e.g. "joint first authors". */
  contribution?: string;
}

export interface CV {
  name: string;
  postnominal: string;
  headline: string;
  location: string;
  contacts: ContactLink[];
  bio: string[];
  positions: PositionEntry[];
  education: EducationEntry[];
  books: BookEntry[];
  software: SoftwareEntry[];
  preprints: Publication[];
  publications: Publication[];
  downloads: { label: string; href: string }[];
}

export const CV: CV = {
  name: "Junpeng Lao",
  postnominal: "PhD",
  headline:
    "Bayesian computation & probabilistic programming — core developer of PyMC, contributor to TensorFlow Probability, sole developer and curator of the BlackJAX ecosystem.",
  location: "Zurich, Switzerland",

  contacts: [
    { label: "Email", href: "mailto:junpenglao@gmail.com", display: "junpenglao@gmail.com" },
    {
      label: "Google Scholar",
      href: "https://scholar.google.com/citations?user=J-KhWL8AAAAJ",
      display: "J-KhWL8AAAAJ",
    },
    { label: "GitHub", href: "https://github.com/junpenglao", display: "junpenglao" },
    { label: "Web", href: "https://junpenglao.xyz", display: "junpenglao.xyz" },
  ],

  bio: [
    "Junpeng Lao works on Bayesian computation and probabilistic programming. He is a core developer of PyMC, a contributor to TensorFlow Probability (tfp.mcmc), and the sole developer and curator of the BlackJAX ecosystem for composable Bayesian inference in JAX.",
    "He co-authored Bayesian Modeling and Computation in Python (Martin, Kumar & Lao; CRC Press, 2021), a hands-on guide to modern Bayesian workflow.",
    "He trained as a cognitive scientist — a PhD at the University of Glasgow and a postdoc at the University of Fribourg studying how culture shapes visual perception — before moving into industry data science at Google, where he is now a Staff Data Scientist. He is increasingly preoccupied with how knowledge gets made when working with AI agents — knowledge as process.",
  ],

  positions: [
    {
      role: "Staff Data Scientist",
      organization: "Google",
      location: "Zurich, Switzerland",
      period: "2018–present",
      note: "Forecasting for Trust & Safety (Bayesian structural time series, linear-Gaussian state-space models); leading a small data-science team.",
    },
    {
      role: "Postdoctoral Researcher",
      organization: "University of Fribourg",
      location: "Fribourg, Switzerland",
      period: "2014–2018",
      note: "Eye-movement, EEG and fMRI studies of cultural diversity in visual perception (iBMLab).",
    },
  ],

  education: [
    {
      degree: "PhD",
      field: "Psychology / Cognitive Neuroscience",
      institution: "University of Glasgow",
      location: "Glasgow, UK",
      period: "2009–2014",
      note: "Thesis: Tracking the temporal dynamics of cultural perceptual diversity.",
    },
    {
      degree: "BSc",
      field: "Psychology",
      institution: "Sun Yat-sen University",
      location: "Guangzhou, China",
      period: "–2009",
    },
  ],

  books: [
    {
      authors: "Martin, O. A., Kumar, R., & Lao, J.",
      year: "2021",
      title: "Bayesian Modeling and Computation in Python",
      publisher: "Chapman and Hall/CRC",
      href: "https://bayesiancomputationbook.com/welcome.html",
    },
  ],

  software: [
    {
      name: "BlackJAX",
      role: "Sole developer & curator",
      blurb: "The BlackJAX ecosystem — composable, fast Bayesian inference in JAX, samplers as building blocks.",
      href: "https://github.com/blackjax-devs/blackjax",
    },
    {
      name: "PyMC",
      role: "Core developer",
      blurb: "A leading probabilistic programming library in Python for Bayesian modeling.",
      href: "https://www.pymc.io/",
    },
    {
      name: "TensorFlow Probability",
      role: "Contributor",
      blurb: "Probabilistic reasoning and statistical analysis — contributions to tfp.mcmc.",
      href: "https://www.tensorflow.org/probability",
    },
    {
      name: "iMap4",
      role: "Creator",
      blurb: "Open-source toolbox for statistical fixation mapping of eye-movement data.",
      href: "https://github.com/iBMLab/iMap4",
    },
    {
      name: "tuningfork",
      role: "Creator",
      blurb: "A sampler-benchmark suite in the BlackJAX ecosystem — captures the failure path, not just the result.",
      href: "https://github.com/blackjax-devs/tuningfork",
    },
  ],

  preprints: [
    {
      authors:
        "Cabezas, A., Corenflos, A., Lao, J., Louf, R., Carnec, A., Chaudhari, K., et al.",
      year: "2024",
      title: "BlackJAX: composable Bayesian inference in JAX",
      venue: "arXiv preprint arXiv:2402.10797",
      link: { label: "arXiv", href: "https://arxiv.org/abs/2402.10797" },
    },
    {
      authors:
        "Biswas, B., Lao, J., Aubourg, E., Boucaud, A., Guinot, A., Ishida, E. E., & Roucelle, C.",
      year: "2023",
      title: "Bayesian multi-band fitting of alerts for kilonovae detection",
      venue: "arXiv preprint arXiv:2311.04845",
      link: { label: "arXiv", href: "https://arxiv.org/abs/2311.04845" },
    },
    {
      authors:
        "Liu, L., Vikram, S., Lao, J., Ben, X., D'Amour, A., O'Banion, S., … & Hoffman, M. D.",
      year: "2020",
      title:
        "Estimating the Changing Infection Rate of COVID-19 Using Bayesian Models of Mobility",
      venue: "medRxiv",
      doi: "10.1101/2020.08.06.20169664",
      link: {
        label: "medRxiv",
        href: "https://www.medrxiv.org/content/10.1101/2020.08.06.20169664v1",
      },
    },
    {
      authors:
        "Lao, J., Suter, C., Langmore, I., Chimisov, C., Saxena, A., Sountsov, P., Moore, D., Saurous, R. A., Hoffman, M. D., et al.",
      year: "2020",
      title: "tfp.mcmc: Modern Markov Chain Monte Carlo Tools Built for Modern Hardware",
      venue: "arXiv preprint arXiv:2002.01184",
      link: { label: "arXiv", href: "https://arxiv.org/abs/2002.01184" },
    },
    {
      authors: "Kochurov, M., Carroll, C., Wiecki, T., & Lao, J.",
      year: "2019",
      title:
        "PyMC4: Exploiting Coroutines for Implementing a Probabilistic Programming Framework",
      venue: "NeurIPS Workshop on Program Transformations for Machine Learning",
      link: { label: "PDF", href: "https://openreview.net/pdf?id=rkgzj5Za8H" },
    },
    {
      authors: "Lao, J.",
      year: "2016",
      title:
        "Reproducible Research with End-to-end Machine Inference Using Deep Learning and Bayesian Statistics",
      venue: "Journal of Brief Ideas",
      doi: "10.5281/zenodo.203086",
      link: {
        label: "Brief Ideas",
        href: "http://beta.briefideas.org/ideas/dc4f3d8981cbea107f013cbb8f2f2cb7",
      },
    },
  ],

  publications: [
    {
      authors:
        "Biswas, B., Aubourg, E., Boucaud, A., Guinot, A., Lao, J., & Roucelle, C.",
      year: "2025",
      title:
        "MADNESS deblender: Maximum A posteriori with Deep NEural networks for Source Separation",
      venue: "Astronomy & Astrophysics, 700, A129",
      doi: "10.1051/0004-6361/202451887",
      pdf: "/cv/papers/Biswas_et_al_2025.pdf",
    },
    {
      authors:
        "Richoz, A-R., Stacchi, L., Schaller, P., Lao, J., Papinutto, M., Ticcinelli, V., & Caldara, R.",
      year: "2024",
      title: "Recognizing facial expressions of emotion amid noise: A dynamic advantage",
      venue: "Journal of Vision, 24(1):7",
      doi: "10.1167/jov.24.1.7",
      pdf: "/cv/papers/Richoz_et_al_2024.pdf",
    },
    {
      authors:
        "Abril-Pla, O., Andreani, V., Carroll, C., Dong, L., Fonnesbeck, C. J., Kochurov, M., Kumar, R., Lao, J., Luhmann, C. C., Martin, O. A., & Osthege, M.",
      year: "2023",
      title:
        "PyMC: a modern, and comprehensive probabilistic programming framework in Python",
      venue: "PeerJ Computer Science, 9:e1516",
      doi: "10.7717/peerj-cs.1516",
      pdf: "https://peerj.com/articles/cs-1516.pdf",
    },
    {
      authors: "Rodger, H., Sokhn, N., Lao, J., Liu, Y., & Caldara, R.",
      year: "2023",
      title:
        "Developmental eye movement strategies for decoding facial expressions of emotion",
      venue: "Journal of Experimental Child Psychology, 229",
      doi: "10.1016/j.jecp.2022.105622",
      pdf: "/cv/papers/Rodger_et_al_2023.pdf",
    },
    {
      authors:
        "Spînu, N., Cronin, M. T., Lao, J., Bal-Price, A., Campia, I., Enoch, S. J., … & Worth, A. P.",
      year: "2022",
      title:
        "Probabilistic Modelling of Developmental Neurotoxicity based on a Simplified Adverse Outcome Pathway Network",
      venue: "Computational Toxicology, 100206",
      doi: "10.1016/j.comtox.2021.100206",
      pdf: "/cv/papers/Spînu_et_al_2021.pdf",
    },
    {
      authors:
        "Rodger, H., Lao, J., Stoll, C., Richoz, A-R., Pascalis, O., Dye, M., & Caldara, R.",
      year: "2021",
      title:
        "The recognition of facial expressions of emotion in deaf and hearing individuals",
      venue: "Heliyon, 7(5)",
      doi: "10.1016/j.heliyon.2021.e07018",
      pdf: "/cv/papers/Rodger_et_al_2021.pdf",
      contribution: "joint first authors",
    },
    {
      authors: "Papinutto, M., Lao, J., Lalanne, D., & Caldara, R.",
      year: "2020",
      title: "Watchers do not follow the eye movements of Walkers",
      venue: "Vision Research, 176, 130–140",
      doi: "10.1016/j.visres.2020.08.001",
      pdf: "/cv/papers/Papinutto_et_al_2020.pdf",
    },
    {
      authors:
        "Stoll, C., Rodger, H., Lao, J., Richoz, A-R., Pascalis, O., Dye, M., & Caldara, R.",
      year: "2019",
      title: "Quantifying Facial Expression Intensity and Signal Use in Deaf Signers",
      venue: "Journal of Deaf Studies and Deaf Education, 24, 346–355",
      doi: "10.1093/deafed/enz023",
      pdf: "/cv/papers/Stoll_et_al_2019.pdf",
      contribution: "joint first authors",
    },
    {
      authors: "Stacchi, L., Ramon, M., Lao, J., & Caldara, R.",
      year: "2019",
      title: "Neural Representations of Faces are Tuned to Eye Movements",
      venue: "Journal of Neuroscience, 2968(18)",
      doi: "10.1523/JNEUROSCI.2968-18.2019",
      pdf: "/cv/papers/Stacchi_et_al_2019.pdf",
    },
    {
      authors:
        "Nicholls, V. I., Jean-Charles, G., Lao, J., de Lissa, P., Caldara, R., & Miellet, S.",
      year: "2019",
      title: "Developing attentional control in naturalistic dynamic road crossing situations",
      venue: "Scientific Reports, 9(4176)",
      doi: "10.1038/s41598-019-39737-7",
      pdf: "/cv/papers/Nicholls_et_al_2019.pdf",
    },
    {
      authors:
        "Luisier, A-C., Petitpierre, G., Bérod, A. C., Richoz, A-R., Lao, J., Caldara, R., & Bensafi, M.",
      year: "2019",
      title:
        "Visual and Hedonic Perception of Food Stimuli in Children with Autism Spectrum Disorders and their Relationship to Food Neophobia",
      venue: "Perception",
      doi: "10.1177/0301006619828300",
      pdf: "/cv/papers/Luisier_et_al_2019.pdf",
    },
    {
      authors:
        "Wyssen, A., Lao, J., Rodger, H., Humbel, N., Lennertz, J., Schuck, K., Isenschmid, B., Milos, G., Trier, S., Whinyates, K., & Assion, H. J.",
      year: "2019",
      title: "Facial Emotion Recognition Abilities in Women Experiencing Eating Disorders",
      venue: "Psychosomatic Medicine, 81(2), 155–164",
      doi: "10.1097/PSY.0000000000000664",
      pdf: "/cv/papers/Wyssen_et_al_2019.pdf",
    },
    {
      authors: "Lüthold, P., Lao, J., He, L., Zhou, X., & Caldara, R.",
      year: "2019",
      title: "Waldo reveals cultural differences in return fixations",
      venue: "Visual Cognition, 26(10), 817–830",
      doi: "10.1080/13506285.2018.1561567",
      pdf: "/cv/papers/Lüthold_et_al_2019.pdf",
    },
    {
      authors:
        "Han, C., Wang, H., Fasolt, V., Hahn, A., Holzleitner, I. J., Lao, J., … & Jones, B.",
      year: "2018",
      title:
        "No clear evidence for correlations between handgrip strength and sexually dimorphic acoustic properties of voices",
      venue: "American Journal of Human Biology, e23178",
      doi: "10.1002/ajhb.23178",
      pdf: "/cv/papers/Han_et_al_2018.pdf",
    },
    {
      authors: "Eulerich, M., Theis, J. C., Lao, J., & Ramon, M.",
      year: "2018",
      title:
        "Do Fine Feathers Make a Fine Bird? The Influence of Attractiveness on Fraud-Risk Judgments by Internal Auditors",
      venue: "International Journal of Auditing, 1–13",
      doi: "10.1111/ijau.12137",
      pdf: "/cv/papers/Eulerich_et_al_2018.pdf",
    },
    {
      authors: "Richoz, A-R., Lao, J., Pascalis, O., & Caldara, R.",
      year: "2018",
      title:
        "Tracking the recognition of static and dynamic facial expressions of emotion across the life span",
      venue: "Journal of Vision, 18(9), 5",
      doi: "10.1167/18.9.5",
      pdf: "/cv/papers/Richoz_et_al_2018.pdf",
      sup: "/cv/papers/Richoz_et_al_2018_sup.pdf",
    },
    {
      authors:
        "Jones, B. C., Hahn, A. C., Fisher, C. I., Wang, H., Kandrik, M., Lao, J., Han, C., … & DeBruine, L. M.",
      year: "2018",
      title:
        "No compelling evidence that more physically attractive young adult women have higher estradiol or progesterone",
      venue: "Psychoneuroendocrinology, 98, 1–5",
      doi: "10.1016/j.psyneuen.2018.07.026",
      pdf: "/cv/papers/Jones_et_al_2018.pdf",
    },
    {
      authors: "Vizioli, L., Bratch, A., Lao, J., Ugurbil, K., Muckli, L., & Yacoub, E.",
      year: "2018",
      title:
        "Temporal multivariate pattern analysis (tMVPA): A single trial approach exploring the temporal dynamics of the BOLD signal",
      venue: "Journal of Neuroscience Methods, 308, 74–87",
      doi: "10.1016/j.jneumeth.2018.06.029",
      pdf: "/cv/papers/Vizioli_et_al_2018.pdf",
      contribution: "equal contribution",
    },
    {
      authors: "Rodger, H., Lao, J., & Caldara, R.",
      year: "2018",
      title: "Quantifying facial expression signal and intensity use during development",
      venue: "Journal of Experimental Child Psychology, 174, 41–59",
      doi: "10.1016/j.jecp.2018.05.005",
      pdf: "/cv/papers/Rodger_et_al_2018.pdf",
    },
    {
      authors: "Ramon, M., Sokhn, N., Lao, J., & Caldara, R.",
      year: "2018",
      title:
        "Decisional space determines saccadic reaction times in healthy observers and acquired prosopagnosia",
      venue: "Cognitive Neuropsychology",
      doi: "10.1080/02643294.2018.1469482",
      pdf: "/cv/papers/Ramon_et_al_2018.pdf",
    },
    {
      authors: "Malaspina, M., Albonico, A., Lao, J., Caldara, R., & Daini, R.",
      year: "2018",
      title: "Mapping self-face recognition strategies in congenital prosopagnosia",
      venue: "Neuropsychology, 32(2), 123–137",
      doi: "10.1037/neu0000414",
      pdf: "/cv/papers/Malaspina_et_al_2018.pdf",
    },
    {
      authors: "Lakens, D., Adolfi, F. G., …, Lao, J., …, Zwaan, R. A.",
      year: "2018",
      title: "Justify Your Alpha",
      venue: "Nature Human Behaviour, 2, 168–171",
      doi: "10.1038/s41562-018-0311-x",
      pdf: "/cv/papers/Lakens_et_al_2018.pdf",
      link: { label: "preprint v1", href: "https://osf.io/27mrw/?show=revision" },
    },
    {
      authors:
        "Turano, M. T., Lao, J., Richoz, A-R., de Lissa, P., Degosciu, S. B., Viggiano, M. P., & Caldara, R.",
      year: "2017",
      title: "Fear boosts the early neural coding of faces",
      venue: "Social Cognitive and Affective Neuroscience, 12(12), 1959–1971",
      doi: "10.1093/scan/nsx110",
      pdf: "/cv/papers/Turano_et_al_2017.pdf",
      contribution: "joint first authors",
    },
    {
      authors:
        "Stoll, C., Palluel-Germain, R., Caldara, R., Lao, J., Dye, M. W. G., Aptel, F., & Pascalis, O.",
      year: "2017",
      title: "Face Recognition is Shaped by the Use of Sign Language",
      venue: "Journal of Deaf Studies and Deaf Education, 23(1), 62–70",
      doi: "10.1093/deafed/enx034",
      pdf: "/cv/papers/Stoll_et_al_2017.pdf",
    },
    {
      authors: "Papinutto, M., Lao, J., Ramon, M., Caldara, R., & Miellet, S.",
      year: "2017",
      title: "The Facespan — the perceptual span for face recognition",
      venue: "Journal of Vision, 17(5), 16",
      doi: "10.1167/17.5.16",
      pdf: "/cv/papers/Papinutto_et_al_2017.pdf",
      sup: "/cv/papers/Papinutto_et_al_2017_sup.pdf",
    },
    {
      authors: "Garcia-Burgos, D., Lao, J., Munsch, S., & Caldara, R.",
      year: "2017",
      title:
        "Visual attention to food cues is differentially modulated by gustatory-hedonic and post-ingestive attributes",
      venue: "Food Research International, 97, 199–208",
      doi: "10.1016/j.foodres.2017.04.011",
      pdf: "/cv/papers/Garcia-Burgos_et_al_2017.pdf",
    },
    {
      authors: "Lao, J., Miellet, S., Pernet, C., Sokhn, N., & Caldara, R.",
      year: "2017",
      title:
        "iMap4: An Open Source Toolbox for the Statistical Fixation Mapping of Eye Movement data with Linear Mixed Modeling",
      venue: "Behavior Research Methods, 49, 559–575",
      doi: "10.3758/s13428-016-0737-x",
      pdf: "/cv/papers/Lao_et_al_2016.pdf",
    },
    {
      authors:
        "Ruffieux, N., Ramon, M., Lao, J., Colombo, F., Stacchi, L., Borruat, F-X., Accolla, E., Annoni, J-M., & Caldara, R.",
      year: "2016",
      title: "Residual Perception of Biological Motion in Cortical Blindness",
      venue: "Neuropsychologia, 93, 301–311",
      doi: "10.1016/j.neuropsychologia.2016.11.009",
      pdf: "/cv/papers/Ruffieux_et_al_2016.pdf",
      contribution: "joint first authors",
    },
    {
      authors:
        "Geangu, E., Ichikawa, H., Lao, J., Kanazawa, S., Yamaguchi, M. K., Caldara, R., & Turati, C.",
      year: "2016",
      title:
        "Culture shapes 7-month-olds' perceptual strategies in discriminating facial expressions of emotion",
      venue: "Current Biology, 26, R663–R664",
      doi: "10.1016/j.cub.2016.05.072",
      pdf: "/cv/papers/Geangu_et_al_2016.pdf",
      sup: "/cv/papers/Geangu_et_al_2016_sup.pdf",
      contribution: "joint first authors and joint last authors",
    },
    {
      authors: "Bovet, J., Lao, J., Bartholomée, O., Caldara, R., & Raymond, M.",
      year: "2016",
      title: "Mapping female bodily features of attractiveness",
      venue: "Scientific Reports, 6, 18551",
      doi: "10.1038/srep18551",
      pdf: "/cv/papers/Bovet_et_al_2016.pdf",
      sup: "/cv/papers/Bovet_et_al_2016_sup.pdf",
    },
    {
      authors: "Miellet, S., Lao, J., & Caldara, R.",
      year: "2014",
      title:
        "An appropriate use of iMap produces correct statistical results: a reply to McManus (2013)",
      venue: "Perception, 43, 451–457",
      doi: "10.1068/p7682",
      pdf: "/cv/papers/Miellet_Lao_Caldara_2014.pdf",
    },
    {
      authors: "Lao, J., Vizioli, L., & Caldara, R.",
      year: "2013",
      title: "Culture modulates the temporal dynamics of global/local processing",
      venue: "Culture and Brain, 1(2), 158–174",
      doi: "10.1007/s40167-013-0012-2",
      pdf: "/cv/papers/Lao_Vizioli_Caldara_2013.pdf",
    },
    {
      authors:
        "Romeo, M., Vizioli, L., Breukink, M., Aganloo, K., Lao, J., Cotrufo, S., Caldara, R., & Morley, S.",
      year: "2013",
      title:
        "A Functional Magnetic Resonance Imaging Paradigm to Identify Distinct Cortical Areas of Facial Function: A Reliable Localizer",
      venue: "Plastic and Reconstructive Surgery, 131(4), 527e–533e",
      doi: "10.1097/PRS.0b013e3182818b68",
      pdf: "/cv/papers/Romeo_et_al_2013.pdf",
    },
    {
      authors: "Miellet, S., Zhou, X., He, L., Lao, J., & Caldara, R.",
      year: "2012",
      title:
        "When East meets West: gaze-contingent Blindspots abolish cultural diversity in eye movements for faces",
      venue: "Journal of Eye Movement Research, 5, 1–12",
      doi: "10.16910/jemr.5.2.5",
      pdf: "/cv/papers/Miellet_et_al_2012.pdf",
    },
    {
      authors: "Zhou, X., He, L., Yang, Q., Lao, J., & Baumeister, R. F.",
      year: "2012",
      title: "Control deprivation and styles of thinking",
      venue: "Journal of Personality and Social Psychology, 102(3), 460",
      doi: "10.1037/a0026316",
      pdf: "/cv/papers/Zhou_et_al_2011.pdf",
    },
  ],

  downloads: [
    { label: "Download CV (PDF)", href: "/cv/junpenglao-cv-full.pdf" },
  ],
};
