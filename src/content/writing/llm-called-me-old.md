---
title: "I asked an LLM to analyse my old tweets and it just called me old"
description: "I fed thirteen years of tweets to a fleet of language models to find out whether I am funny."
date: 2026-07-05
updated: 2026-07-05
status: draft
tags: ["ai", "knowledge-as-process", "personal", "writing"]
---

I still have my Twitter archive (the account was already long gone) running from 2009, when I was a
PhD student in Glasgow with nothing to say and said it anyway, to late 2022. I threw out
the retweets and pointed a small fleet of language models at what was left: 4,448 tweets
that were actually me. Haiku read all of them, Sonnet the longer ones more carefully. I
was looking for one thing.

I wanted them to tell me I am funny.

<figure class="fig">
  <img src="/writing/figures/tweets-arc.webp" alt="Bar chart of the author's tweets per year from 2009 to 2022, near zero until a spike of 1,286 in 2017, then tapering." width="1500" height="711" loading="lazy" decoding="async" />
  <figcaption>Thirteen years. I joined in 2009 and mostly lurked. In 2017 I found the PyMC Discourse, and the chart speaks for itself.</figcaption>
</figure>

## The first answer

The first cut was not kind. Label each tweet by what I was doing (telling a joke,
being earnest, or just reacting to someone), line it up against how it did, and the
laugh-cry emoji does not help.

<figure class="fig">
  <img src="/writing/figures/tweets-by-intent.webp" alt="Bar chart of engagement by intent: deadpan joke 3.4x, flagged joke 2.2x, earnest 2.0x, reaction 1.4x." width="1320" height="658" loading="lazy" decoding="async" />
  <figcaption>Engagement relative to my own yearly median, by what I was doing. Adding the laugh-cry emoji does not help.</figcaption>
</figure>

None of this is rigorous. N is one (me), engagement is a noisy proxy for funny*, and
the means are pulled around by a handful of viral outliers. At the median the gap
nearly closes. I am reporting it anyway, because the direction holds every way I cut
it, and because the exact number is not the point.

*it is the only proxy I have.

## Whatever, the top tweets still get a chuckle out of me

Here is the part that saved my evening. My most-liked tweet, by a wide margin, is
"When you display a 1d array in 2d for no reason." After
that: "Trying to solve a problem with multiprocessing in python and now I have 8."
Then "Men will literally rerun the MCMC sampling with the exact same setting thinking
divergence will go away instead of going to therapy."

So I am funny. I am funniest, it turns out, when I am deadpan: those are my most
reliable hits, and pretty much the only things I have ever written that went properly
viral. The instant I add the 😂 to tell you it was a joke, I lose about a
third of the room. 357 times.

## About that 357

<figure class="fig">
  <img src="/writing/figures/tweets-emoji.webp" alt="Bar chart of the author's most-used emoji: face-with-tears-of-joy 357, far ahead of grimacing 72, red flag 71, sweat smile 60, clap 29." width="1320" height="729" loading="lazy" decoding="async" />
  <figcaption>My top five emoji. Exhibit A for the prosecution.</figcaption>
</figure>

😂 is my most-used emoji by a distance, more than the next four put together. I reach
for it to laugh at my own jokes.

There is a second problem, this one I learned from the internet rather than my own
archive. Gen Z has apparently decided that 😂, the crying-laughing face, is a tell-tale
sign of a millennial. The young people use 💀 or 😭 now. 😂 is for the olds.

So: I fed thirteen years of my own writing to a language
model to find out whether I am funny, and the single most efficient finding, the one
it could have handed me in one line without reading anything else, is that I am old.

## The part I did not expect

I had not only asked about jokes. I asked the models to reconstruct my voice, closely
enough to rewrite arbitrary text as me, and that worked better than I expected. They
found the hedges I did not know I leaned on (*pretty sure*, *I dont think*, *I guess*),
and that they vanish the instant a claim turns from technical to ethical: I will hedge
all day about a prior, but I wrote "thinning is just lying to yourself" with a completely
straight face. They found that where most writers reach for an em-dash, I reach for a
parenthesis (like this) or a footnote*. Across 4,448 tweets I used the em-dash exactly
zero times. They found the missing apostrophes, the lowercase i, the dropped articles,
the residue of learning English somewhere around my third language, and the profile's
instruction, in bold, is to keep all of it, because the clean version reads as not-me.

*like this one.

Then the part I did not expect. The profile ends with a list of things to avoid if you
want to sound like me: no manufactured slogans, no "X, not Y" for the rhythm of it, no
little summarising tail that tells you what the moral was. I have seen that list before.
It is, almost line for line, a list I wrote for myself a while back to stop my own essays
reading like a language model. The model rederived it from my tweets, without being told
it existed.

In [an earlier post](/writing/rules-you-cant-write-down/) I argued the tacit knowledge is
hiding in the corrections. Apparently it is also hiding in thirteen years of jokes, if
something reads all of them. Not just the jokes: I ran the same mining on my old PyMC
Discourse posts, years of answering other people's modelling questions, and that me is a
different me, patient, almost no jokes, diagnosing a broken sampler instead of performing
for a timeline. Different register, same tells, across roughly 7,700 posts.

## So I am leaning in

Honestly, I am amazed, and a little amused. A machine read thirteen years of me and
handed back a description I recognise. So I did the obvious thing and turned the
description into a tool. It still does not get to write my posts. What it does now is
review them, the moment a post is about 90% done and I am too close
to it to see where I have gone soft.

The artifact is the voice profile the models built out of my tweets. The reviewer is
one prompt. I am not asking it to make the post better. A model told to improve my prose
will sand off the things that make it mine, the dropped articles and the missing
apostrophes and the sentence that should have just ended.

```
Here is a draft of my next post, and my voice profile (built from my own writing).
Do not rewrite anything, and do not fix my grammar. Read the draft against the profile
and find every place the writing drifts away from me: sentences that got smoother and
more generic, a manufactured slogan or an "X, not Y" used as a landing, a tail that
restates the point I just made, repetition, anything that reads like an LLM wrote it,
and any em-dash. Quote each one, name the rule it breaks, and suggest a flatter,
more-me version. Leave my second-language quirks alone (the dropped articles, the
missing apostrophes, the lowercase i). Those stay. I am the editor. You are the reviewer.
```

Pretty sure it works, because I ran it on this post. It flagged a sentence I was quietly
proud of, some reversal about machines sounding like machines, and said it was probably
the most LLM-shaped line in the draft. Hard to argue. I cut it.

## Verdict

I have read the report. My best jokes are the ones I deliver straight, and I have
spent thirteen years muffling them with a millennial emoji that also, separately,
files me under old.

I have weighed the evidence carefully, the way a well-calibrated person should.

I am keeping the 😂.
