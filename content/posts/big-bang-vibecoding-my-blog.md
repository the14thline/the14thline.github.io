---
date: '2026-04-07'
draft: false
title: 'Big Bang: Vibe-coding this blog'
categories: ['tech']
tags: ['hugo', 'vibecoding']
---

I’ve rebuilt my personal blog more times than I want to admit. In the past, “setting up a blog” meant a weekend of yak-shaving: picking a generator, wiring a theme, fighting CSS, and then doing the GitHub Pages dance by hand—branches, build artifacts, weird base URLs, and the inevitable “why are my links pointing to the wrong place”. The twist is that I built this site with vibecoding, and I didn’t sit down and type out code line-by-line. I described what I wanted, iterated visually, and let the editor help me stitch everything together. My Cursor free trial is ending soon, so I better take the full advantage. 

This post is a narrative walkthrough of what I ended up with and the techniques I used—mostly so future-me remembers how it all fits.

## The boring base: Hugo + PaperMod

I picked **Hugo** because it’s fast, simple, and the mental model is stable: content in Markdown, templates in a directory, output is static HTML.

I picked **PaperMod** because it’s clean and predictable—an opinionated starting point that doesn’t fight you.

The goal wasn’t to build a bespoke design system. The goal was: *make writing frictionless*.

## How I organize contents 

I’m going to publish in four broad categories:

- 👨‍💻 Tech: ai, engineering, science, etc
- 🌿 Lifestyle: travel, reading, hobbies, etc
- 💼 Career: leadership, management, product, etc
- 💭 Thoughts: be creative 

Each post gets categories and tags in front matter so I can slice the archive differently later. This keeps URLs simple but still gives me a bunch of navigational affordances “for free” (categories pages, tags pages, RSS, etc.).

I briefly explored word clouds for tags (because they look cool), but I’m keeping `/tags/` dead simple. I can always revisit this once I have enough content for the tag surface area to matter.

## A little delight: Sunlit

After the baseline was stable, I gave myself permission to add one fun thing: an optional sunlight overlay inspired by the recent “sunny mode” wave. I am not familiar with frontend, so AI really helped me a lot here. 

I adapted the effect from Jacky Zhao’s open-source demo:

- Repo: `https://github.com/jackyzha0/sunlit`
- Example: `https://sunlit.pages.dev/`

On this site:

- Press **Space** to toggle ☀️ (one press = one change).
- When it’s on, the post cards become slightly transparent so the effect shows through.


## What changed for me this time

The most interesting part of this build wasn’t Hugo or PaperMod—it was the workflow. This time I treated it like a conversation. Vibecoding made that loop fast: describe → change → refresh → adjust.
