---
title: "The Death of the User Journey"
description: "You build your own software now. Well at least the front end part."
date: 2026-07-20
status: stable
tags: ["ai", "workflow", "customization"]
---

It started with a cognitive tax I could no longer pay.

I was running 3+ agentic coding sessions in parallel across various tmux windows, with VSCode toggling frantically between branches and worktrees. Everything was happening at once: a wall of text to read, a dozen threads to react to, and the constant, nagging need for meta-coordination. And yes, I am already using a meta agent just to keep track of everything.

I felt the familiar urge to go find a tool. I looked at [Herdr](https://herdr.dev/) and various tmux managers like [cmux](https://cmux.com/), but I felt that specific, mild annoyance: I would have to learn a new CLI, a new vocabulary, and a new opinionated way of seeing my own work. I already have enough frontends in my life. I don't want to learn another one just to look at my own terminal.

<figure class="fig">
  <img src="/writing/figures/agent-messages-blocked.webp" alt="Meme-style photo of someone frantically trying to read one message on a phone while a wall of new notifications keeps popping up." width="1280" height="720" loading="lazy" decoding="async" />
  <figcaption>Me, trying to find that one message again while new ones keep popping up left and right, all urgently blocked on me. (Image: <a href="https://www.youtube.com/channel/UCrUI5mqQeZTiWui5UF0DsxA" target="_blank" rel="noopener noreferrer">source</a>)</figcaption>
</figure>

## A cockpit for one

So, I did what a modern 10x developer would do: I asked an AI agent to build a tiny, useless helper.

It started as a naive attempt to build a custom HTML dashboard, a little web page to visualize my chaos. I quickly abandoned it; a browser tab is just another context to switch to, another place to lose focus. Then I tried to bend existing VSCode extensions to my will, manually testing a few that promised "session management". One of them actually came pretty close (tmux-manager), but just missing a bit of je ne sais quoi. Instead of looking for more, I just asked the agent to build on top of that, using a small library to manage my running tmux sessions. Then we added a lightweight VSCode frontend to show the status files my agents drop when they start, block, or finish. The result was a simple, lightweight sidebar of colored dots: red for blocked, yellow for working, green for done.

It was an N=1 product. It made hard, non-generalisable assumptions about how I name my git worktrees and how I structure my home folder. But unlike the polished products I had tried before, this one actually moved at the speed of my thought.

No product manager would have approved it. But it worked.

The interesting part wasn't the script, though; it was the velocity of the iteration. I didn't write a spec. I just used the tool, hit friction, and told the agent to fix the friction. When I realized my worktrees were disconnected from my tmux sessions, we added nesting. When the diffs got too noisy, we switched to working-tree diffs. In a single afternoon, the tool evolved from version 0.1.0 to 0.1.10.

## The inversion of design

This experience suggests a fundamental shift in the economics of software.

For decades, the most expensive part of a product hasn't been the code - it's been the design. We spend months on user research, journey mapping, and A/B testing to converge on a single interface that works acceptably for a million different people. We design "User Journeys" to amortize the cost of human error and cognitive load across a massive cohort. Even with that level of care, every time a popular website changes a button, half of the internet complains.

But if an agent can generate and modify interface code on the fly, that cost structure inverts.

You don't need to map out a journey for a cohort, because there is no cohort. The path through the software is created by you and your agent as you work. You aren't starting from zero: you still need the primitives of a tree view or a diff editor. But the way those components connect is entirely your own.

In my cockpit, VSCode was the sandbox, tmux and git were the capability endpoints, and the agent was the compiler that wired them together for my exact, idiosyncratic workflow.

I still don't want to learn another frontend. I'm starting to think I won't have to.
