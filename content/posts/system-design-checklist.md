---
date: '2026-04-06T23:12:54-07:00'
draft: false
title: 'System Design Checklist'
categories: ['tech']
tags: ['system-design']
---

Sample checklist-style post for system design topics.

When I do system design reviews, I tend to run through a mental checklist rather than a fixed template.
The exact questions change by problem, but several themes show up every time:

- **Data and traffic reality.** What are the actual QPS numbers, fan-out patterns, and data shapes?
- **Single points of failure.** If this one machine or dependency dies, what exactly happens to the user?
- **Backpressure and overload.** How does the system behave when upstream sends 10x traffic or downstream stalls?
- **Observability.** What do we log, measure, and alert on when things go wrong?

For a long-form post I’d expand each section with examples and failure stories. Here the goal is simpler:
exercise the typography for headings, bullet lists, and short paragraphs so we can get a feel for how
system-design style content would read in this theme. 
