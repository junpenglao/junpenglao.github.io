---
title: "Of course it works, it's Bayesian"
description: "How I stopped worrying and keep being Bayesian."
date: 2026-07-11
status: stable
tags: ["ai", "workflow", "bayesian", "agents"]
---

> **TL;DR:** for your Agentic maxxing, run bunch of two-arm A/B on your real task,
> orchestrated by a coordinator agent: a lead agent plans the experiment, both arms do the
> actual work, then lead agent do deep-dive survey on each arms and tell you what works
> what does not. Bonus: lead agent combine conclusion from both arm and make solution to
> your task better.

<figure class="fig">
  <img src="/writing/figures/bayesian-bus.webp" alt="Two-guys-on-a-bus meme: the gloomy passenger facing a rock wall is labeled 'Overwhelmed by all the agentic best practices'; the serene passenger facing a sunset is labeled 'Being Bayesian'." width="564" height="500" decoding="async" fetchpriority="high" />
  <figcaption>Step 1: be Bayesian. Step 2: profit.</figcaption>
</figure>

There is a running joke in the Bayesian community: we will find a Bayesian interpretation
for anything. A new method works? Of course it does, it is fundamentally Bayesian, and give
us an afternoon and we will show you the prior it was assuming all along.

I have been building tools with coding agents for a while, and I am convinced you need to be
Bayesian for it to work well. Let me explain: the occasion is a good post from the folks at
[PyMC Labs](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents) on self-improving
agents. They took a skill-optimization approach and ran it honestly,
across four experiments with [multiple seeds](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#is-a-single-optimization-run-enough-to-trust-the-result)
and the noise floor measured. The finding, roughly: it works when the [validation gate](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#when-does-self-improving-skill-optimization-work)
that scores the agent's work is fast, stable, and graded (a real score, not just pass/fail),
and it [hits a wall](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#experiment-3-real-practitioner-tasks-and-a-wall)
on the slow, ungraded, real-practitioner tasks. Their fix is to [reshape the real task into
a fast synthetic benchmark](https://www.pymc-labs.com/blog-posts/self-improving-ai-agents#experiment-4-keep-the-shape-synthesize-the-data)
you can grade against truth.

That is a fine approach, but I want to be more Bayesian about it. The benchmark is the
large-N move; real work is often small N (and I am impatient). But that's fine. Small N is
home turf: when the data is thin, you lean on the rest of the model. An informative prior, a
richer specification, a careful read of the posterior. The same three carry the method below.

## The part that horrifies a frequentist

Instead of building a benchmark, I run a lot of small experiments on the real work and do an anthropology study on it.
No clean control, no metric fixed in advance, N of a handful. Just vibes, and I decide by
reading the traces. Nobody runs an experiment like this, but I get much faster progress. 

Here is what that looks like. Right now I am building loops for tuningfork, for example an agent
works out how to tune a sampler for a hard model. Loop engineering is what everyone is
talking about lately, and a loop is even harder to benchmark than a skill: there are multiple
outputs you can grade. So instead of trying to evaluate the trajectory through the problem, 
I run small experiments: every change I make to the loop, I run against a baseline I picked,
on the same few models, and read which arm performs better.

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

Partly because tokens are expensive, partly because I am lazy. But mostly this: we reach for
an agent precisely because the task is ambiguous, and ambiguous is exactly what resists a
clean eval. Synthesize the benchmark and you can define away the thing you needed help with.

And the ambiguity usually lives in the outcome, not only the path. In my runs the common case
is not a clean win: both arms come back partially right along different dimensions, with no
single end state to check them against. That is where a winner-take-all score has nothing to
grab, and why the method reads both traces and grafts instead of ranking them.

The benchmark is the engineer's move: define "good" precisely enough to optimize, build the
harness, grade the runs. The expensive part is not the compute, it is specifying "good" for
a task whose scope is fuzzy. A big lab can pay it. A small team usually cannot, and often
should not.

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

This is small-N advice, for you or a handful of people refining your own tools. It scales up.
For a product with thousands of users you cannot deep-read every trace, though I doubt the
answer there is a giant benchmark either. You ship something deliberately vague and let a
per-user loop refine it. The same move, one level up.

So, yes. I have taken a perfectly good engineering debate and found the Bayesian
interpretation, exactly as the joke predicts.

Of course it works. It's Bayesian.
