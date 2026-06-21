---
title: "Knowledge as Process: a reply to Working with AI"
description: "A reply to Eugene Yan: I built the same machine he did — worklogs, checklists-as-skills, parallel agents — but I think the intervention-rich trace is the product, not the feedback. The wrong path is also knowledge."
date: 2026-06-21
updated: 2026-06-21
status: draft
tags: ["essay", "ai", "epistemology", "knowledge-as-process", "bayesian"]
---

> The trace is the product, not the feedback. The veto is the lesson. Wrong path
> is also knowledge. Falsify, don't argue.

## The throwaway correction

Here is the part nobody saves. You ask an agent for something, it returns a
confident draft, and you write back: *no — not that, because…* Then you delete
the exchange and keep the fixed output.

That deleted correction is the most valuable thing you produced. It encodes the
distinction the model could not make on its own — the reason the obvious answer
was wrong. The polished artifact you kept is the cheap part; anyone with the same
tools could have generated a plausible version of it. The *intervention* — the
specific place your judgment bent the trajectory — is the scarce part. And the
default workflow throws it in the bin.

This essay is a reply to Eugene Yan's [Working with
AI](https://eugeneyan.com/writing/working-with-ai). I think he is right about
almost everything in the *how*. I want to push on the *what*: what is the thing
we are actually making.

## 1. Eugene is right, and I built the same machine

I should start by giving credit, because the convergence is uncanny. Working
independently, Eugene and I arrived at nearly identical machinery for working
with agents:

- a **worklog plus an INDEX** — an append-only record of what was tried, and a
  map back into it;
- **checklists as skills** — the recurring moves codified so they can be reused
  and handed to an agent verbatim;
- **parallel agents** — fan work out, then reconcile;
- and the habit of **mining the transcripts** afterwards for what was learned.

<figure class="fig">
  <img src="/writing/figures/convergence-table.svg" loading="lazy" decoding="async"
    alt="A two-column table comparing Eugene Yan's practices with mine — worklog and INDEX, checklists as skills, parallel agents, mining transcripts — agreeing across every row." />
  <figcaption>Independent convergence on the same operating practices. Practices from <a href="https://eugeneyan.com/writing/working-with-ai" rel="noopener">Eugene Yan, Working with AI</a>.</figcaption>
</figure>

When two people build the same machine without talking, it is usually because the
machine is real. So this is not a disagreement about practice. It is a
disagreement about what the practice is *for*.

## 2. The turn: means versus asset

In the common framing, all of that machinery — the worklog, the transcripts — is
**feedback**. It exists so the next run is better: better prompts, better
context, a tighter loop. The trace is a *means*. The artifact is the *asset*.

I want to flip that. The intervention-rich trace **is** the asset.

When a competent human and a capable model go back and forth on a hard problem,
the transcript accumulates something neither party had at the start: a record of
which moves worked, which failed, and *why*. That "why" is externalized
expertise. It is the thing you would have to be in the room to acquire
otherwise. Call it **knowledge as process** — knowledge that lives in the
sequence of corrections, not only in the final state.

This is the opposite of the stochastic-parrot worry. The objection says the model
only recombines what already exists. But a dialogue that records *why* a
recombination was rejected produces information that was not in the training data
and not in either head alone. The novelty is in the friction.

This reframing has teeth. If the trace is just feedback, you optimize it away —
the goal is to need fewer corrections. If the trace is the product, you
*preserve* it, you weight it, you learn to read it. Those are different
engineering programs.

## 3. The forking path beats the destination

Concretely: I tried A, it failed because X, so I tried B. The usual instinct is
to report B. But X — the *reason* A failed — is the expertise. B without X is a
fact; X is understanding.

<figure class="fig">
  <img src="/writing/figures/forking-path.svg" loading="lazy" decoding="async"
    alt="A forking-path diagram: from a start node, path A leads to a failure at X; from that failure node, path B leads to a working result. The failure at X is labelled as the expertise." />
  <figcaption>The destination is cheap. The fork — and the reason for it — is the knowledge. Diagram by the author.</figcaption>
</figure>

A worked example, from tuning a stochastic-volatility model. The natural-looking
prior on the persistence parameter was `Beta(20, 1.5)` — mass piled up near one,
because volatility *should* be persistent, right? Running it, the sampler's
divergences roughly **tripled**: the prior had quietly created a funnel the
geometry could not navigate. Switching to a gentle `Beta(4, 4)` fixed it.

<figure class="fig">
  <img src="/writing/figures/stoch-vol-before-after.svg" loading="lazy" decoding="async"
    alt="Before-and-after panels for a stochastic-volatility model: a Beta(20, 1.5) prior tripled the divergences; a Beta(4, 4) prior resolved them." />
  <figcaption>stoch_vol: the one-line fix is forgettable; the reason the first prior broke the geometry is the lesson worth keeping. Example from the author's tuningfork notes.</figcaption>
</figure>

The fix is one line. Anyone could copy `Beta(4, 4)`. The knowledge is *why*
`Beta(20, 1.5)` broke the sampler — and that only exists because the failed path
was recorded instead of discarded.

## 4. Negative information beats positive

Most notes suffer from survivorship bias: we write down what worked. But "B
works" is weak information — there are many things that work. "A fails, here is
the failure mode" is strong information: it prunes a whole region of the space.

The strongest single move in a dialogue is the **veto**. When you reject a
direction and say why, you are not slowing the loop down — you are teaching it. A
veto with a reason is a labelled negative example, and labelled negatives are
exactly what is missing from a corpus of polished outputs. (A correction without a
reason — "no, try again" — teaches almost nothing; it is one of the anti-patterns
in section 5.)

## 5. The honest part: when this is wrong

I am making a claim, so I should say where it fails. Knowledge-as-process is
**not** a universal law. It needs specific conditions, and outside them the trace
is just noise:

- **Intervention-rich engagement.** If you are not actually correcting — if you
  rubber-stamp the output — there is no expertise in the trace to capture.
- **A falsifiable domain.** It works where you can *check*: code that runs, a
  sampler that does or does not diverge, a proof that closes. In domains where
  every answer is equally arguable, the trace records preference, not knowledge.
- **A competent human.** The corrections are only valuable if the person making
  them knows enough to be right. Garbage vetoes teach garbage.

And it is honestly **N = 1**: this is my experience, not a study. Two
anti-patterns I have watched myself fall into:

- the **slot-machine** — pulling the lever for a better roll instead of
  diagnosing why the last one was wrong; and
- the **veto-without-explanation** — rejecting outputs by feel, which throws away
  the very information that made the rejection worth anything.

## 6. Falsify, don't argue

Notice that the previous section is testable. That is the point. The advantage of
working in falsifiable domains is that you do not have to *win the argument* — you
can **run the experiment**. Disagree that `Beta(20, 1.5)` is the problem? Change
it back and count the divergences. The trace makes claims checkable instead of
rhetorical, which is the whole reason I trust it more than my own memory of what
I "learned."

## 7. One floor up on the human

A worry: if the agent does the work, does the human atrophy? My experience is the
opposite, with a caveat. The comfortable, already-known work *does* get handed
off — and that is exactly the work that was not growing you anyway. What is left
is harder: framing the problem, catching the subtle wrong turn, deciding what
"right" means here.

So you end up **tired at a higher altitude**. The growth doesn't stop; it moves
up a floor. The risk is real — if you stop intervening, you stop growing — which
loops straight back to section 5.

## 8. Tooling implications

If the trace is the asset, our tools are built for the wrong thing. A few
directions I think follow:

- **Preserve the forking path.** Capture the failures and the reasons, not just
  the final diff. This is the bet behind tuningfork: keep the failure path, not
  only the result.
- **Provenance-weighted trust.** A claim that survived an intervention-rich
  dialogue in a falsifiable domain should be trusted more than a one-shot
  generation. Trust should carry where it came from.
- **Tiers of knowledge.** Distinguish a settled, checked result from a working
  hunch from a raw draft — the same `draft / working / stable` spirit this site
  applies to its own pages.

## 9. The bigger bet

So that is the thesis: when a competent person thinks with a capable machine in a
domain where you can check the answer, the most valuable output is the
intervention-rich trace — the corrections, the vetoes, the forking paths — and we
should build tools and habits that *keep* it rather than optimize it away.

I am betting my next chapter on this. The rest of this site — living documents
with a status and a date, written so the revisions show — is the same bet, scaled
down to one person's notes. If the trace really is the product, then a good place
to start is to stop deleting it.

---

*This is a draft. Hooks and structure are settling; the worked examples and the
figures are still being tightened. Replies welcome.*
