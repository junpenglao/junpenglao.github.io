---
title: "The Rules You Can't Write Down"
description: "Most of your expertise is tacit: you only notice a rule when you catch it being broken. So stop trying to front-load it. Mine your own AI conversations instead, and keep the why."
date: 2026-06-26
updated: 2026-06-26
status: stable
tags: ["ai", "workflow", "knowledge-as-process", "bayesian"]
---

> 吾日三省吾身: "Each day I examine myself on three points."
> 曾子 (Zengzi), *Analects*, Book 1 (5th century BC)

<figure class="fig">
  <img src="/writing/figures/zengzi.webp" alt="A wry ink-wash illustration of a roadside ramen truck and food stall branded with Zengzi's name (曾子), a lone diner at a table out front." width="1600" height="873" loading="lazy" decoding="async" />
  <figcaption>Allegedly, 曾子 did his retrospective here.</figcaption>
</figure>

When I was finishing my PhD, psychology was in the middle of its replication
crisis. I had a small part in the response (I'm one of the many names on
[*Justify Your Alpha*](https://www.nature.com/articles/s41562-018-0311-x)), but the
part that stuck with me wasn't the statistics. It was the
[**file-drawer problem**](https://en.wikipedia.org/wiki/Publication_bias): we
publish what works and quietly file the failures away. A field can run a million
careful experiments and still lose most of what they taught, because the negative
results, the *reasons* a thing didn't work, never get written down.

I think you do the same thing every day you work with an AI agent: the sort you hand
a task and it runs the steps itself, the grown-up cousin of the chatbot in your
browser.

## The part you throw away

You ask it for something. It returns a confident draft. You write back: *no, not
that, because…* Then you keep the fixed output and delete the exchange.

That deleted *because* is the file drawer, one conversation at a time. The fix is
stupid: don't throw it away. Go back and read it.

Mining your conversations isn't new. There are whole startups built on it:
[mem0](https://mem0.ai) and friends auto-distill your chat history into reusable
memory and "skills." I want something narrower: don't mine for the *action*, mine
for the **why**. The reusable thing isn't "use `Beta(4, 4)` as the prior for this
model," which anyone can copy. It's the reason the obvious choice was wrong, and
that only lives in your *steering*: the corrections you made, and what you said when
you made them. An agent is good at reading a transcript back and turning those
reasons into a rule you can keep.

One from my own notes. I was working with an agent on
[tuningfork](https://github.com/blackjax-devs/tuningfork), a benchmark for Bayesian
samplers, and the bug it handed me wasn't statistical at all. It was plumbing, the
dumbest kind. The diagnostic code it wrote grabbed each parameter by its *position* in
a flat
array (slot 0, slot 1) on the assumption that the slots came in the order I'd written
the model. They didn't; the array was sorted alphabetically. Every number downstream
was real but wearing the wrong name. *Confidently wrong*, and silent: nothing
crashes, so nothing flags it. It survived a probe script and my own follow-up
analysis, both of us reading the same wrong labels. Then I stopped and asked it the
obvious question: *shouldn't there be a helper for this?* It refactored to the right
one, and the whole mislabeling fell out. The one-line fix is forgettable; the agent
could write that. What's worth keeping is the reason: never index one of these arrays
by raw position, because the order isn't what you'd guess. That went into the rules it
re-reads each session, and it's saved me on every script since.

The same move scales from plumbing up to judgment. This is how I am currently working
on trying to teach an agent to think like a Bayesian without LLM pretraining. I can't
retrain the model I'm calling through an API; I don't have its weights, and fine-tuning
a couple of principles in would be the wrong tool anyway. What I can do is write the
rules down (the ones I'd never think to state up front, like *check the pushforward, not
just the marginals*), pulled from the moments I caught myself enforcing them, and have
the agent re-read them each session. The expertise lives in the cheat-sheet I hand it,
not the model:
[continual learning at the *context* layer](https://www.langchain.com/blog/continual-learning-for-ai-agents),
in LangChain's framing, rather than the weights. (Same goes for "Pythonic," or whatever
design taste I hold by feel and can't spec out front.)

## My actual workflow

While writing this I went looking, and found I'm hardly the first: Eugene Yan
describes almost the same setup in
[Working with AI](https://eugeneyan.com/writing/working-with-ai). We're not
independent samples: same tools, same corner of the internet, and I read his after.
Take the overlap as a sanity check, not proof. And if you want a recipe for actually
setting up an agent workflow, start with his post: he lays the principles out, and
this one doesn't try to.

Where I'd push past him: Eugene mostly mines his transcripts for what *worked*, the
moves worth saving as a reusable skill. I'm greedier for the opposite. A logged
success gives you one path that worked. A logged failure, with the reason attached,
rules out a whole batch that won't. Negative information is denser, and it's the
first thing a clean archive of wins throws away. Same file-drawer problem, one desk
instead of a field.

The routine has two halves: capture during the day, distill at the end of it.

**During the day, keep the trial-and-error, not just the working state.** My loop is
`implement → commit → test → fix → commit`, and every save to the history carries a
`Finding:` and a `Fix:` line, so the record shows *why* the first attempt was wrong,
not only that the second one worked. I keep the failed attempts on purpose.

The lessons don't live in my head. They live in a few boring, version-tracked
folders:

```
worklog/
├── threads/        # one task per file, the in-flight state
├── decisions/      # the "why we do it this way", dated and immutable
├── lessons/        # distilled and reusable: code-patterns, process, gotchas…
├── meta-thread.md  # patterns not yet promoted to a lesson
└── INDEX.md        # machine-built table of contents
```

There's a promotion ladder. Most observations stay where they land, in the thread for
that task. Something I notice a third time gets written into `meta-thread.md`, and if
it holds up, promoted to a real *lesson*. The few that turn out universal go into
`CLAUDE.md`, the standing-instructions file every session reads first. It goes from
"huh, weird" to "always do this."

**At the end of the day I run one prompt, and most days it does almost nothing, on
purpose.** I'd been doing this by hand before
[`/fewer-permission-prompts`](https://github.com/anthropics/claude-code/releases/tag/v2.1.111)
and [auto mode](https://www.anthropic.com/engineering/claude-code-auto-mode) were a
thing in Claude, glad to see tooling is catching up.

Here's an early version of the prompt:

> **End of day.** Run these in order:
>
> 1. Stitch every Claude Code session from today, mine and the sub-agents', into one
>    consolidated timeline.
> 2. Decide whether a mining sweep is worth it. Any one trigger is enough: a chunk of
>    work merged since the last sweep, ten-plus new sub-agent spawns since the last
>    sweep, or I asked for one. If nothing fires, stop here and report the spawn count
>    and the next likely trigger.
> 3. If it is: chunk the timeline, read the chunks (myself, or fanned out across
>    parallel sub-agents when the corpus is big), and promote any pattern with one
>    critical or three notable instances that isn't already on file to a new lesson, in
>    the house format: *Pattern → Evidence → Mitigation → Cross-references*. Clean up the
>    scratch files, commit the new lessons, push.
> 4. Report what was captured, whether a sweep ran, which lessons got filed, and what
>    landed.

That's roughly where it started, and most days step 2 ends it. I'm not pasting the
script behind step 1: it's trivial glue you'd write for your own setup anyway, the easy
part. The prompt is what's worth keeping, and even that has grown since: severity tags,
an index the next session greps instead of me remembering a lesson exists, more sources
feeding it. So don't copy mine and tweak it. Copy the shape. It's also a few lines short
of a proper skill you invoke by name as a slash command, which is where it's headed.

What a sweep produces is a plain lesson file. Here's a real one. My agents kept getting
killed running the test suite: they fanned it out one worker per core on a small box,
each loading a couple of gigs, until the machine ran out of memory and the kernel
started shooting processes. The mine saw the same crash three sessions running and
wrote it up.

<figure class="fig">
  <img src="/writing/figures/oom-lesson.webp" alt="A worklog lesson file titled 'pytest -n auto OOM-kills on memory-tight machines', with Pattern, Mitigation, and Cross-references sections." width="1440" height="917" loading="lazy" decoding="async" />
  <figcaption>A lesson the end-of-day sweep wrote, in the worklog's house format.</figcaption>
</figure>

The routine drafted that. But the category, the severity bar, and the fixed *Pattern →
Evidence → Mitigation* shape are conventions I set and still tune by hand. What makes a
good label, and what's even worth promoting, is a judgment that stays mine.

曾子 checked himself on three things a day; I point an agent at my logs and have it
check me.

## Keep the why

Anyone with the same tools can reach a working version of the thing. What's scarce is
the steering: the corrections, and the reason behind each one. Most of us throw it
out. Keep it, and the file drawer is worth opening.

The folders are the easy part. None of this works on an empty log: the tool can only
mine what I bothered to write down, and some days I don't. So the next post is the part
that actually matters: how to build the habit of typing out the reasoning, thinking out
loud as I work, instead of just keeping the fix.
