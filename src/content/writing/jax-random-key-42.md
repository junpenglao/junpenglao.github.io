---
title: "jax.random.key(42)"
description: "Life is like calling next() on a pseudorandom number generator. It feels random even if it is destined."
date: 2026-08-07
status: stable
type: post
tags: ["career", "agents", "bayesian"]
---

<figure class="fig">
  <img src="/writing/figures/so-long-fish.webp" alt="A dolphin leaping clear of a deep blue sea, trailing spray." width="1600" height="1065" decoding="async" fetchpriority="high" />
  <figcaption>So long, and thanks for all the fish. (Photo:
    <a href="https://www.flickr.com/photos/37575130@N02/17196468535/" rel="noopener">Alessandro Caproni</a>,
    <a href="https://creativecommons.org/licenses/by/2.0/" rel="noopener">CC BY 2.0</a>)</figcaption>
</figure>

August 31st is my last day at Google. Before I get to what comes next, the exit interview
nobody asked for.

## Top 10 most impactful things I did during the last eight years

**10.** Scaled content moderation forecasting from a handful of time series to a couple of
thousands, running in production with 0 SRE.

**9.** Mentored people inside and outside of Google, and co-supervised a PhD student in
cosmology. Very rewarding experience.

**8.** Did not use Google's internal Year in Search data to clear
[$1.2M on Polymarket](https://www.cnbc.com/2026/05/27/google-employee-polymarket-insider-trading.html).

**7.** Did not personally
[take down half the internet](https://www.thousandeyes.com/blog/google-cloud-outage-analysis-june-12-2025)
with a null pointer.

**6.** Combined nowcasting with forecasting and built a dynamic model selection system that
accounts for data drift, because our stakeholders love to retrospectively change their
historical metrics.

**5.** Was the data science go to person for Trust and Safety business planning these last few
years. Honestly, sick of arguing about million dollar questions.

**4.** Got my reports promoted from L4 to L5, all on the first try. Three for three.

**3.** Co-wrote [a book](https://bayesiancomputationbook.com) on Bayesian modeling and
computation. People bought it. Some even read it.

**2.** Gave a healthy stack of Bayesian modeling and time series talks, internally and at
conferences.

**1.** Did not force a single frequentist to become Bayesian, including the ones who reported
to me.\*

\* _In fairness, I built zero Bayesian models and looked at zero posterior samples at work in
the last two years._

I hope you read that in
[Letterman Top 10 voice](https://www.youtube.com/watch?v=7FIQQVWNE1U).


## Wait, why is Jeff Dean also following what I am doing?

In *The Hitchhiker's Guide to the Galaxy*, a computer called Deep Thought is built to work out
the Answer to Life, the Universe, and Everything. It returns 42. The problem, which takes the
rest of the book, is that nobody ever knew what the question was.

That gag has aged strangely well, though the shape is inverted. Deep Thought spent seven and a
half million years to produce two characters. Ask a LLM almost anything and two thousand
words come back before you finish typing, fluent, fast and cheap. What has not gotten cheaper
in either case is knowing which question was worth asking, and whether the answer you got is
warranted.

That is the part I want to work on. In September I am joining my best friend Josh and my new
best friend Dan at [rekursiv.ai](https://rekursiv.ai) as Founding Scientist and Chief
Epistemologist. The mission is to **autonomously create knowledge**, using AI, LLMs, agents,
whichever word you prefer (interchangeable today, probably not for much longer).

My pet theory about LLMs is that they are excellent (meta) compression algorithms. The
compression half is obvious, they are very good at summarizing. The decompression half goes
beyond the traditional sense, because it is active: you give it a research question and it
does not only unpack what it already holds, it goes and gathers, pulling in fresh information
from web search and papers, and running its own experiments. Then it hands you end to end
reasoning. What makes the decompression almost magical is when your question connects two
concepts that look unrelated. Sometimes you add the right hint or heuristic as a follow up,
and it draws a path between two points sitting far apart in whatever manifold it learned. That
is when the thing unfolds into a coherent picture with real sparks in it. A recent example is
Terence Tao
[digesting the Jacobian Conjecture counterexample](https://terrytao.wordpress.com/2026/07/21/a-digestion-of-the-jacobian-conjecture-counterexample/),
with [a chatbot to talk it through and confirm the calculations](https://chatgpt.com/share/6a5fdc7a-d6f8-83e8-bbea-8deb42cfed56).

So what is missing? Having the model ask that starting question. Having it produce the smart
follow up. Having it go past (de)compression into something that actually discovers.

Josh and Dan have been calling this the next frontier since late last year, and I see it more
clearly every day I work with agents. Then Jeff Dean and Sanjay Ghemawat
[left Google to do it too](https://www.discoveryloop.com/), which I choose to read as
confirmation rather than competition.

## Five minutes early

The part people forget about that joke: in the book, the Earth is the computer. It was built
to work out the question, it ran for ten million years, and the Vogons demolished it five
minutes before it finished.

I have a much worse computer and considerably less than ten million years. Starting in
September.
