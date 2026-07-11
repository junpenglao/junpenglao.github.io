---
title: "Of course it works, it's Bayesian"
description: "How I stopped worrying and learned to love Bayes."
date: 2026-07-11
status: draft
tags: ["ai", "workflow", "bayesian", "agents"]
---

<figure class="fig">
  <img src="/writing/figures/bayesian-bus.webp" alt="Two-guys-on-a-bus meme: the gloomy passenger facing a rock wall is labeled 'Overwhelmed by all the agentic best practices'; the serene passenger facing a sunset is labeled 'Being Bayesian'." width="564" height="500" decoding="async" fetchpriority="high" />
  <figcaption>Step 1: be Bayesian. Step 2: profit.</figcaption>
</figure>

> **TL;DR:** for your Agentic maxxing, run bunch of two-arm A/B on your real task,
> orchestrated by a coordinator agent: a lead agent plans the experiment, both arms do the
> actual work, then lead agent do deep-dive survey on each arms and tell you what works
> what does not. Bonus: lead agent combine conclusion from both arm and make solution to
> your task better.

There is a running joke in the Bayesian community: we will find a Bayesian interpretation
for anything. A new method works? Of course it does, it is fundamentally Bayesian, and give
us an afternoon and we will show you the prior it was assuming all along.

I have been building tools with coding agents for a while, and I keep landing in the same
place: the work goes well exactly when I am being Bayesian about it. So, at the risk of
proving the joke, let me find the interpretation.

The occasion is a good post from the folks at [PyMC Labs](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents)
on self-improving agents. They took a skill-optimization approach and ran it honestly,
across four experiments with [multiple seeds](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#is-a-single-optimization-run-enough-to-trust-the-result)
and the noise floor measured. The finding, roughly: it works when the [validation gate](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#when-does-self-improving-skill-optimization-work)
that scores the agent's work is fast, stable, and graded (a real score, not just pass/fail),
and it [hits a wall](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#experiment-3-real-practitioner-tasks-and-a-wall)
on the slow, ungraded, real-practitioner tasks. Their fix is to [reshape the real task into
a fast synthetic benchmark](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#experiment-4-keep-the-shape-synthesize-the-data)
you can grade against truth.

They are friends and fellow Bayesians, and for the tasks they describe I think they are
right. Here is the other half: what I do when I cannot build that benchmark, which, for a
solo developer or a small team, is most of the time.

## The part that horrifies a frequentist

I do not build a benchmark. I run a small experiment on the real work and read it closely.
No clean control, no metric fixed in advance, N of a handful. Just vibes, and I decide by
reading the traces. Nobody runs an experiment like this. It is faster than a benchmark, and
it beats the people who did.

Here is what that looks like in practice. Right now I am building a skill that lets an agent
proofread my drafts. Every change I make to the skill, I run against a baseline version I
picked, on a few real drafts, and read which pass I trust more. That is the whole experiment.

**Almost no change to my workflow.** I already work with a lead agent that spawns subagents,
so the A/B is one more thing it knows how to do. I wrote it a skill: fork the task into two
arms, run both, survey what each one did.

**No experiment to design.** Designing a good one is where the time goes: the metrics, the
harness, the argument about "good." I skip it. The lead plans the comparison, both
arms do the real task, and I read what comes back and ask why. Small N works when you bring
priors and look at the whole posterior. (An earlier A/B experiment of mine started me
rethinking the abstraction layer of how information reaches an agent, but that is a
post for another day.)

**The arms combine, they do not only compete.** The winner ships either way, so the
evaluation is almost free. But the lead also takes the best of both and hands back something
better than either arm alone, which, if you already run things in parallel, you should be
doing anyway. Nothing is wasted. That is also PyMC Labs'
[sharpest operating rule](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#operating-rules-for-self-improving-agents),
the byproducts outlast any single edit, and the [jax-tap post](/writing/make-print-debugging-great-again/)
tells the same story from the other end.

None of this tests the tool from the outside. It builds the tool *with* the system, updating
as the evidence arrives. Co-evolution, which is sequential updating with extra steps.

## Why not just build the benchmark

Because at the frontier it is the expensive tool, and usually the wrong one. Wrong because
of a trap in the setup: you reach for an agent precisely because the task is ambiguous, and
ambiguous is exactly what resists a clean eval. Synthesize the benchmark and you can define
away the thing you needed help with.

The benchmark is the engineer's move: define "good" precisely enough to optimize, build the
harness, grade the runs. That costs tokens and wall-clock, and much more than that, the
effort of specifying "good" for a task whose scope is fuzzy. A big lab can pay it. A small
team tuning its own workflow usually cannot, and often should not.

The dividing line is scope. If the skill is a checklist the agent runs, tighten it and grade
it, PyMC Labs' approach is exactly right. The trouble is pretending an ambiguous task is a
clear one, because then the gate measures the wrong thing with false confidence.

I did this to myself. Early in tuningfork, a sampler benchmark I work on, I tried to make the
agent judging convergence smarter by piping every best practice into its checklist: R-hat
under 1.01, a z-score on the bias, divergence counts, an ESS bar. Each one is reasonable on
its own. Piled together, they backfired. A healthy sampler trips one check or another often
enough that false positives became a real problem, so the agent failed about a third of the
good runs and gave up early. I had to thin the checklist and lean on reading the runs instead.

Each check you have not earned is a strong prior you forgot you were setting, and a diligent
agent will enforce it, rejecting good work with a straight face.

## The honest boundary

This is small-N advice, for a person or a small team refining their own tools. It scales to
a team. For a product with thousands of users you cannot deep-read every trace, though I
suspect the answer there is not a giant benchmark either, it is to ship something
deliberately vague and let a per-user loop refine it. The same move, one level up.

So, yes. I have taken a perfectly good engineering debate and found the Bayesian
interpretation, exactly as the joke predicts. But I have been at this long enough to know
when a reframe pays rent, and this one does.

Of course it works. It's Bayesian.
