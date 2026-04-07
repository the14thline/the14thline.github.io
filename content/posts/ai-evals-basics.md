---
date: '2026-04-06T23:17:52-07:00'
draft: false
title: 'AI Evals Basics (Sample)'
categories: ['tech']
tags: ['ai', 'evals']
---

This is an intentionally long-ish sample post. It’s not trying to be definitive; it’s here so you can test:

- long-scroll reading on a second post,
- headings and subheadings,
- checklists, code blocks, and quotes,
- and how the “back to top” button feels across different article shapes.

## What I mean by “evals”

In practice I tend to bucket eval work into:

- **Unit-style checks**: does the model follow a schema, avoid forbidden strings, produce valid JSON, etc.
- **Task metrics**: accuracy / F1 / pass@k / exact match on a curated dataset.
- **Human preference**: pairwise comparisons, rubrics, or “would you ship this?” judgments.
- **Online signals**: user satisfaction, deflection, escalation, latency and cost.

### The key idea

An eval is anything that turns “this feels better” into a repeatable signal.
It doesn’t have to be perfect. It has to be **stable enough** that when you change something, you can tell:

- did quality go up?
- did safety regress?
- did cost or latency change?

If you can’t answer those questions, you’re flying blind.

## What makes evals hard

Evals are weird because the product is language and the failure modes are subtle. A model can be:

- fluent but wrong,
- correct but unhelpful,
- safe but useless,
- or “good” on average but catastrophic for a small cohort.

So evals are not one number. They’re usually a **bundle** of signals, with explicit tradeoffs.

## A tiny workflow that scales

1. Start with 20–50 examples you actually care about.
2. Add regression tests for every “wow that was bad” failure.
3. Separate **quality** metrics from **safety** metrics.
4. Make evals cheap enough to run often (CI, nightly, or before deploy).

### What “cheap enough” means

Cheap enough is contextual, but I like to aim for:

- a **smoke suite** that runs in minutes,
- a **nightly suite** that runs in tens of minutes,
- and an **offline deep suite** that can take hours when you’re doing big changes.

When everything is expensive, teams stop running evals. Then quality slowly decays.

## A small eval set that stays relevant

If you’re building a product, start from the support queue and real user prompts.
If you’re doing research, start from the tasks you claim to solve.

My go-to process:

1. Collect 100 raw examples.
2. Remove duplicates / near-duplicates.
3. Keep 20 “boring but common” prompts.
4. Keep 10 “hard edge case” prompts.
5. Keep 10 “safety sensitive” prompts.

Over time, this becomes a living dataset.

## Example: a rubric that’s actually usable

Rubrics should be short enough that a human can apply them consistently.
Here’s a sample 0–2 scoring guide:

- **2**: correct + clear + follows constraints
- **1**: partially correct or unclear; still useful
- **0**: wrong, unsafe, or ignores constraints

Then add 1–2 *binary checks* depending on your app:

- “contains PII?” (yes/no)
- “includes citations?” (yes/no)
- “valid JSON?” (yes/no)

## Offline vs online signals

Offline evals help you iterate quickly, but they can lie:

- users behave differently than your curated dataset,
- production retrieval can be noisier,
- and latency/cost constraints change behavior.

Online signals are closer to reality, but they’re noisy and delayed.

You want both.

## Common mistakes

- Evaluating on prompts that are too easy (or too synthetic).
- Mixing multiple objectives into one “score”.
- Letting the test distribution drift silently.

### One particularly common mistake: “average score” worship

If your average quality goes up by 1%, but one important category collapses (e.g. “billing questions”),
users will notice the collapse, not the average.

This is why grouping matters:

- by category,
- by tool usage,
- by language,
- by user segment.

## A tiny JSONL format for eval cases

This is a convenient shape for keeping eval sets in version control:

```json
{"id":"case_001","category":"tech","prompt":"Explain KV cache like I'm an engineer.","ideal":"...","tags":["ai","systems"]}
{"id":"case_002","category":"career","prompt":"Give feedback to a report who missed a deadline.","ideal":"...","tags":["leadership"]}
```

You can start with an `ideal` answer, but later you may replace it with:

- multiple acceptable answers,
- a scoring function,
- or pairwise comparisons against baselines.

## Practical tip: build a baseline and never delete it

Whenever you change prompts/models/tools, keep a baseline output for each case.
Then you can diff like a human:

- What improved?
- What got worse?
- What got longer/shorter?

> The fastest way to debug “the model got worse” is to look at a side-by-side diff on real examples.

## Wrap-up

If this post feels long, that’s on purpose. It’s here to test long-form rendering.
Later you can replace this with real eval tooling notes, dashboards, and case studies.
## Common mistakes

- Evaluating on prompts that are too easy (or too synthetic).
- Mixing multiple objectives into one “score”.
- Letting the test distribution drift silently.

