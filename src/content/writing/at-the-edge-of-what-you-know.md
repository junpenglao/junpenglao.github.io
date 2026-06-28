---
title: "At the Edge of What You Know"
description: "Turns out I do enjoy lecturing people, or, in this case, AI agents."
date: 2026-06-27
updated: 2026-06-28
status: draft
tags: ["ai", "workflow", "knowledge-as-process", "bayesian"]
---

> "I leave to the various futures (not to all) my garden of forking paths."
> Jorge Luis Borges, *The Garden of Forking Paths* (1941)

It was a bit of a lazy Sunday afternoon when I decided my next open-source project would be
a benchmark library for [BlackJAX](https://github.com/blackjax-devs/blackjax). Weather was getting warmer, snowboarding season was winding down, and I was sliding into the usual post-season blue. To fill the
gap I'd been poking at coding agents more and more, and what kept surprising me was how at
ease I felt working with Claude. At some point I caught myself thinking, half joking, I
wonder if I can teach it to be Bayesian.

<figure class="fig">
  <!-- FIGURE: lofi / slow-life mood image (CC-BY, owner to source + attribute). -->
  <figcaption>is it even possible to work slower at this time of age?</figcaption>
</figure>

That half-joke stuck. Working with an agent well is mostly teaching, and the teaching is the
part I like.

## What works for me

I have spent most of my career explaining things: teaching and giving workshop during my postdoc, years answering
modeling questions on the PyMC forum, being tech lead and manager in Google the last few years,
the occasional student to supervise. Those reflexes are what make an agent session pay off,
and what leave a conversation worth keeping afterward.
([Last time](/writing/rules-you-cant-write-down/) I wrote about mining old chats for the
reasons behind your decisions. That only works if the chat has reasons in it. You have to put
them there.)

So, a short list.

- **Drop the one-shot mindset.** It might be fine for a small,
 well-scoped task; for anything real the one-shot just hands you a confident draft
  that is wrong in ways you won't catch yet. (It grinds my gear that Gemini keep handing me a
  one-shot implementation that's half-done or even wrong. Dude, let's review the plan first, don't
  jump the gun.)

- **Think out loud, treat it as a whiteboard.** You usually don't know the exact spec going in,
  so let the agent catch your vibe. When it lays out a menu of options, don't just pick one;
  say "let's chat about it" more (I argue with it most of the time).

- **Explain, don't dictate.** When you ask for something, say why you want it. Even when its
  next step is already the right one, say "yes, but" and explain your intent anyway. The reasons
  land in the chat as a bonus.

- **Be persistent.** An agent will sometimes give up on a direction too early, off one bad
  result. If you think it's still worth a look, lay out why, don't just overrule it. Explaining
  the reason you'd keep going actually makes the output better.

A couple of bonus ones, for when they come up:

- **When you're out of your depth, reach for analogy.** Map the unfamiliar thing onto something
  you already understand and check whether it holds. It is how you learn anything, and how you
  can still steer a problem you don't fully know yet.

- **Keep the dead ends.** Don't delete the paths that failed. The reason something didn't work
  is denser than the reason something did, and it is exactly what you'll want back.

None of it is clever.

## What it turned up

The first thing was a name. The benchmark I was building didn't have one, and the agent floated
"tuningfork." I liked the instrument reading (a sampler in tune gives one clean tone), but the
*fork* in it sent me somewhere the agent hadn't gone, to the
[garden of forking paths](https://en.wikipedia.org/wiki/The_Garden_of_Forking_Paths) (Borges,
then [Gelman and Loken](http://www.stat.columbia.edu/~gelman/research/unpublished/forking.pdf)
using the image for researcher degrees of freedom). Tuning a sampler is a walk through that
garden: every choice is a fork, and a sampler that "works" often works because someone walked
far enough in to find a path that did. I said that back into the chat, and
[tuningfork](https://github.com/blackjax-devs/tuningfork) quietly changed under me, from a
catalog of winners into a map of the garden. A passing recipe stopped being just the winning
settings; it now carries the effort and the dead ends that found them, with no pretense the
winning path is the best one. I didn't spec that. It came out of talking through a name.

The bigger one was a sampler family I had no background in: MCLMC, a faster but more temperamental
cousin of NUTS. I came in with little intuition, and the early runs looked rough, so the agent's read
was reasonable: not worth the effort, move on. I wasn't convinced. So instead of dropping it, we spent a while pulling on *why* it was
failing: how MCLMC sets its two knobs, the step size and how far it runs before it forgets its
direction, how both should scale as the problem grows, and how all of that lines up against the
way you tune NUTS. A few of the constants baked into the default warmup turned out to matter more
than anyone had really justified. Sorting that out became a new warmup scheme
([blackjax #937](https://github.com/blackjax-devs/blackjax/pull/937)), and from there the obvious
next step was to turn to the dynamic variant, the cousin of dynamic HMC. It already existed,
nobody had really tuned it, and it varies its trajectory length instead of fixing it, which copes
a bit better across awkward geometry. I almost let that first "this isn't working" end it.

## The slow part

The name and the warmup scheme both needed the slow version of the work: staying in the chat and
arguing past the point where taking the first plausible answer would have been faster. Nobody
sells working with an agent that way. The whole pitch is speed.

Sometimes the journey *is* more important than the destination. I know how that sounds. Here it
just happens to be true.
