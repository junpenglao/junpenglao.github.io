---
title: "Make print-debugging great again"
description: "This is a product announcement."
date: 2026-07-11
status: stable
tags: ["jax", "open-source", "ai", "workflow"]
---

<figure class="fig">
  <img src="/writing/figures/bell-curve-print.webp" alt="Bell curve meme: the left and right tails both say 'Use print(...)'; the crying midwit in the middle says 'Nooooo you should use a proper debugger, set up the trace, use breakpoints...'" width="675" height="499" decoding="async" fetchpriority="high" />
  <figcaption>The design document.</figcaption>
</figure>

It started with a progress bar. Last week someone opened a
[PR on BlackJAX](https://github.com/blackjax-devs/blackjax/pull/960): add a progress bar
to MCLMC adaptation. A completely understandable request. They were running distributed
sampling where a single step takes minutes, and for long stretches the program tells you
nothing.

## A perfect PR

It was a perfectly mergeable PR: it copied the exact pattern BlackJAX already uses in
three other places, and did what it said. I would probably have merged it, if I didn't
do agentic coding.

Merging copy number four used to be the rational move: the redesign is an unknown
number of afternoons you don't have, so the idiomatic patch wins. What changed is the cost of the pause: exploring the better design
is now a conversation, so "is this the right mechanism at all?" became an affordable
question.

And this mechanism had it coming. Every algorithm has to thread a `progress_bar` argument
through its signature. Turning the bar on under `jax.vmap` crashes the run
([#927](https://github.com/blackjax-devs/blackjax/issues/927)); our test suite had
`progress_bar=True` literally commented out with a note. A progress bar that can crash
the computation it reports on.

## The whiteboard

So instead of reviewing the diff, [we chatted about it](/writing/at-the-edge-of-what-you-know/).
My idea died first: inspect the compiled program and patch the telemetry in afterwards,
at the HLO level. There is no supported mutate-and-recompile path; dead within the hour.
The incumbent died second: the `io_callback` the old bar was built on refuses `vmap` by
design. What survived was the least clever option on the board: don't touch the program
at all. Wrap the *call* in a context manager, intercept `jax.lax.scan` while inside it,
and watch from the outside.

That landed as [#964](https://github.com/blackjax-devs/blackjax/pull/964), on main and
in the next release:

```python
with blackjax.progress_bar(label="NUTS warmup"):
    (state, params), _ = blackjax.window_adaptation(
        blackjax.nuts, logdensity_fn
    ).run(rng_key, initial_position, 1000)
```

No parameter to thread anywhere. Any scan-based loop gets a bar, vmap included, and the
old mechanism is gone.

## The bar was never the point

The way the bar is switched on, a context manager around an untouched call, tickled
something in my brain. For years it has been more than a minor inconvenience to work
with JAX control flow (`scan`, `while_loop`), because it is so hard to debug. The bug
lives in the middle of a loop, in a carry (the running state a scan passes from one
step to the next) that mutates every iteration, sometimes four levels deep (a scan
calling a body calling a while loop calling a solver). You cannot usefully `print`
inside jit: a bare `print` fires once at trace time, and `jax.debug.print` means
editing the loop body and remembering to un-edit it later, with nothing structured
coming back. A chain that froze into NaNs at step 12 will run to completion and look
perfectly healthy from the outside.

And the step counter is honestly the least interesting value coming out of that loop.
The carry is where everything lives: the chain position, the adapted step size, the
Cholesky factor that is about to go NaN. If you can watch a step index from outside an
unmodified program, you can watch the carry too.

So I pointed the same lens at the carry and made it a library:
[`jax-tap`](https://github.com/arcueil/jax-tap) (pronounced "just tap").

```python
import jax, jax.numpy as jnp
import jaxtap as tap

def f(x0, xs):
    def body(c, x):                  # your code, no logging lines
        return c * 1.01 + jnp.sin(x), c
    return jax.lax.scan(body, x0, xs)

x0, xs = jnp.float32(0.0), jnp.linspace(0.0, 1.0, 100)

with tap.record(select=lambda leaves: {"c": leaves[0]}) as rec:
    f(x0, xs)                        # unmodified

rec.df()    # step-indexed telemetry, as a DataFrame
```

Delete the `with` line and nothing else changes, because nothing else was ever touched.

Three rules from the whiteboard became the design contract:

- **Bitwise identity.** The observed program and the production program are the same
  program: same values, same gradients, through `jit`, `vmap`, `grad`, `checkpoint`.
  This is the CI gate.
- **Live streaming.** Telemetry crosses to the host as it happens. A frozen loop still
  tells you where it froze.
- **Telemetry can never crash the run.** A broken callback warns once and steps aside.
  (I had a progress bar to learn from.)

My favourite part is the one-liner tripwires:

```python
with tap.record(taps=[tap.watch_nan("cholesky", once=True)]):
    warmup.run(rng_key, x0, num_steps)
# -> [tap] FAIL scan[0]/jit[0]/cholesky[0] 0/3: NaN/Inf
```

The moment a Cholesky factor goes non-finite, mid-loop, however deep: you hear about it,
with the loop address and the step, and your code still contains zero logging lines.

OK, admittedly it is not as easy as adding a bunch of `print`. But you also dont need to
remove a bunch of `print` by hand after your testing, just remove a few lines that all
sit conveniently together.

`pip install jax-tap`. It lives at [arcueil](https://github.com/arcueil), a new home I
set up for tools like this. More to come.

## Users at machine speed

`jax-tap` went from an empty repo to 0.3.0 on PyPI in about two days, and I want to be
honest about where the speed came from, because it was not typing speed.

Half of it you already read: the problem had been bothering me for years, and the design
had been argued out before the first commit. The other half is the part I find genuinely
new: I never waited for user feedback. The agents working on my other projects are the
first users. The sampler-benchmarking work wanted a tripwire on NUTS tree depth, which a
carry tap cannot see (tree depth lives in the per-step outputs, not the carry), and that
gap became y-taps in 0.3.0 by the next morning. And they never get tired of testing:
before I trusted any of it, I had the design attacked from two independent directions,
and the 59 adversarial scripts from the #964 review are now the library's regression
bed.

The feedback loop that used to take a release cycle now fits inside a day: wrong designs
die in hours (mine went first).

The PR asked for a progress bar. `jax-tap` does not ship one: it emits data and nothing
else. The BlackJAX bar already runs on it, same front end, `jax-tap` underneath. First
consumer, and the whole reason it exists.
