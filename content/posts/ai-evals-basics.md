---
date: '2026-04-06T23:17:52-07:00'
draft: false
title: 'AI Evals Basics (Sample)'
categories: ['tech']
tags: ['ai', 'evals']
---

This is a medium-length sample post meant to exercise list rendering and summary truncation.

## What I mean by “evals”

In practice I tend to bucket eval work into:

- **Unit-style checks**: does the model follow a schema, avoid forbidden strings, produce valid JSON, etc.
- **Task metrics**: accuracy / F1 / pass@k / exact match on a curated dataset.
- **Human preference**: pairwise comparisons, rubrics, or “would you ship this?” judgments.
- **Online signals**: user satisfaction, deflection, escalation, latency and cost.

## A tiny workflow that scales

1. Start with 20–50 examples you actually care about.
2. Add regression tests for every “wow that was bad” failure.
3. Separate **quality** metrics from **safety** metrics.
4. Make evals cheap enough to run often (CI, nightly, or before deploy).

## Common mistakes

- Evaluating on prompts that are too easy (or too synthetic).
- Mixing multiple objectives into one “score”.
- Letting the test distribution drift silently.

