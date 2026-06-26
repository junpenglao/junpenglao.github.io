---
title: "The Rules You Can't Write Down"
description: "Most of your expertise is tacit — you only notice a rule when you catch it being broken. So stop trying to front-load it. Mine your own AI conversations instead, and keep the why."
date: 2026-06-26
updated: 2026-06-26
status: draft
tags: ["ai", "workflow", "knowledge-as-process", "bayesian"]
---

> 吾日三省吾身 — "Each day I examine myself on three points."
> — Zengzi (5th century BC), *Analects*, Book 1

<figure class="fig">
  <img src="/writing/figures/cc-permission-placeholder.svg" alt="Placeholder: a Claude Code permission prompt." loading="lazy" decoding="async" />
  <figcaption>Placeholder — a Claude Code permission prompt, standing in until the Zengzi image lands.</figcaption>
</figure>

When I was finishing my PhD, psychology was in the middle of its replication
crisis. I had a small part in the response — I'm one of the many names on
[*Justify Your Alpha*](/cv/) — but the thing that stuck with me wasn't the
statistics. It was the **file-drawer problem**: we publish what works and quietly
file the failures away. A field can run a million careful experiments and still
lose most of what they taught, because the negative results — the *reasons* a
thing didn't work — never get written down.

I think you do the same thing every day you work with an AI agent — the thing you
hand a task and it runs the steps, the grown-up cousin of the chatbot in your
browser.

## The deleted *because*

You ask it for something. It returns a confident draft. You write back: *no — not
that, because…* Then you keep the fixed output and delete the exchange.

That deleted *because* is the file drawer, one conversation at a time.

Mining your conversations isn't a new idea — there are startups that scrape your
chats and auto-generate "skills" from them. I want to point at something
narrower: don't mine for the *action*, mine for the **why**. The reusable thing
isn't "use `Beta(4, 4)`" — one specific setting anyone can copy. It's the reason
the obvious choice was wrong. And that only exists in your *steering*: the
corrections you made and the reasons you gave. An agent turns out to be very good
at reading a transcript back and distilling those reasons into a rule you can
keep.

One from my own notes. I'd been building tuningfork, a benchmark for Bayesian
samplers — but the bug that bit wasn't statistics, it was the dumbest kind of
plumbing. The diagnostic code grabbed each parameter by its *position* in a flat
array — slot 0, slot 1 — assuming the slots came in the order I wrote the model
in. They didn't; the array was sorted alphabetically. Every number downstream was
real but wearing the wrong name — *confidently wrong*, the worst kind, because
nothing crashes. It survived a probe script and my own follow-up analysis until I
stopped and asked the obvious thing — *shouldn't there be a helper for this?* — and
the whole mislabeling fell out. The one-line fix is forgettable; the keepable part
is the *why* — never address one of these arrays by raw position, the order isn't
what you'd guess — and it transfers to every script since. I'd have fixed the bug
regardless. The value was in writing down the reason.

The same trick scales from plumbing up to judgment — it's how you teach an agent
to think like a Bayesian without retraining it. You can't retrain the model you're calling through an API — you
don't have its weights, and fine-tuning a couple of principles in would be the
wrong tool anyway. But you can write the rules down — the ones you'd never think
to state up front, like *check the pushforward, not just the marginals* —
distilled from the moments you caught yourself enforcing them, and have the agent
re-read them at the start of every session. The expertise lives in the cheat-sheet
you hand it, not in the model. (The same trick teaches "Pythonic," or whatever
design taste you hold by feel and can't quite spec out front.)

## My actual workflow

While writing this I went looking, and found I'm hardly the first: Eugene Yan
describes almost the same setup in
[Working with AI](https://eugeneyan.com/writing/working-with-ai). We're not
independent samples — same tools, same corner of the internet, and I read his
after — so take the overlap as a sanity check, not proof. It's the boring kind of
reassuring.

The routine has two halves: capture during the day, distill at the end of it.

**During the day, keep the trial-and-error — not just the working state.** My loop
is `implement → commit → test → fix → commit`, and every save to the history
carries a `Finding:` and a `Fix:` line, so the record shows *why* the first
attempt was wrong, not only that the second one worked. The failures are
load-bearing; I keep them on purpose.

The lessons don't live in my head. They live in a few boring, version-tracked
folders that every agent reads at the start of a session:

```
worklog/
├── threads/        # one file per task — in-flight working memory
├── decisions/      # the "why we do it this way", dated and immutable
├── lessons/        # distilled and reusable: code-patterns, process, gotchas…
├── meta-thread.md  # patterns not yet promoted to a lesson
└── INDEX.md        # machine-built table of contents
```

There's a promotion ladder. A one-off observation sits in a case study; a pattern
that shows up three times gets promoted to a *lesson*; a lesson that becomes
universal gets promoted into `CLAUDE.md` — the standing-instructions file every
session reads first. Knowledge climbs from "huh" to "always do this."

**At the end of the day I run one prompt — and most days it does almost nothing,
on purpose.** It has two gears.

The cheap gear runs always: a small script stitches the day's session logs
together — including the parallel sub-agents — into one timeline, and checks
whether anything's worth a deeper look. The expensive gear fires only on a
trigger: a chunk of work merged, or more than ten sub-agents ran since the last
sweep, or I ask for one. No trigger, and it stops there — which is what makes a
quiet day a genuine no-op instead of make-work.

When it *does* fire, it mines. The timeline gets chunked; a batch of reader-agents
skim the chunks in parallel and tag what they see — `[CATEGORY] [SEVERITY]`, one
line each; and anything that clears the bar — one critical instance, or three
merely-notable ones — that isn't already on file gets written up as a new lesson,
in a fixed shape: *Pattern → Evidence → Mitigation → Cross-references*. The
cross-references are the point: they're what turn a pile of notes into something
you can walk. An index over every lesson is rebuilt by a script each time (and a
commit hook fails if it's gone stale), so the *next* session can find the relevant
one instead of me remembering it exists. That last part is the whole game —
writing it down is worthless if nothing reads it back.

A real one: my agents kept getting killed running the test suite — fanning it out
one worker per core on a small box, each worker loading a couple of gigs, until the
machine ran out of memory and the kernel started shooting processes. It happened
enough times across sessions that the mine caught it: it became a lesson with a
one-line rule — *cap the workers to what the box can hold* — and the agents stopped
walking into it. Nobody had to remember; the system noticed its own bruise and
wrote itself the note. Which is all to say: it's 三省吾身 with a build step. 曾子
reviewed himself on three points each day; I have an agent review mine.

None of this is a claim to having invented anything — `/fewer-permission-prompts`
and auto mode weren't features when I started doing it by hand; the tooling caught
up to the habit, which is exactly what should happen. Automate the friction, keep
the judgment.

## Keep the why

The destination — the merged PR, the working model — is the cheap part; anyone
with the same tools can reach a plausible version of it. The journey is the
steering: the corrections, and the reasons behind them. Most of us delete it. Keep
the *why*, and your file drawer turns into a library.
