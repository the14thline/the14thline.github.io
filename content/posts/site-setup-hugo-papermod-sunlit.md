---
date: '2026-04-06T23:59:00-07:00'
draft: false
title: 'Hello, world (again): rebuilding my site with Cursor'
categories: ['tech']
tags: ['hugo', 'papermod', 'github-pages', 'css']
---

I’ve rebuilt my personal website more times than I want to admit.

In the past, “setting up a blog” meant a weekend of yak-shaving: picking a generator, wiring a theme, fighting CSS, and then doing the GitHub Pages dance by hand—branches, build artifacts, weird base URLs, and the inevitable “why are my links pointing to the wrong place”.

This time I wanted a different experience:

- ship a clean baseline fast,
- keep the whole thing boring and maintainable,
- and only then add a little delight.

The twist is that I built this site inside **Cursor**, and I didn’t sit down and type out code line-by-line. I described what I wanted, iterated visually, and let the editor help me stitch everything together.

This post is a narrative walkthrough of what I ended up with and the techniques I used—mostly so future-me remembers how it all fits.

## The boring base: Hugo + PaperMod

I picked **Hugo** because it’s fast, simple, and the mental model is stable: content in Markdown, templates in a directory, output is static HTML.

I picked **PaperMod** because it’s clean and predictable—an opinionated starting point that doesn’t fight you.

The goal wasn’t to build a bespoke design system. The goal was: *make writing frictionless*.

The structure is straightforward:

- posts live in `content/posts/`
- front matter controls metadata
- the theme handles the rest

## How I organize writing (categories + tags)

I’m going to publish in four broad categories:

- 👨‍💻 tech
- 🌿 lifestyle
- 💼 career
- 💭 thoughts

Even though everything sits under `content/posts/`, each post gets categories and tags in front matter so I can slice the archive differently later:

```yaml
categories: ['tech']
tags: ['ai', 'systems']
```

This keeps URLs simple but still gives me a bunch of navigational affordances “for free” (categories pages, tags pages, RSS, etc.).

## Navigation: categories that read like an archive

PaperMod’s default taxonomy “terms” page is fine, but I wanted my **categories** page to feel more like the archive view: scannable and dense.

So I customized `/categories/` to be:

- **Two columns per category row**
  - left: the category label + count
  - right: the list of posts under that category
- A small **Jump to** row at the top (important once one category becomes long).
- Titles only (no date/reading time), because the intent is “find the thing”, not “browse chronologically”.

Under the hood, this is just a template override + a bit of CSS:

- `layouts/_default/terms.html`
- `assets/css/extended/lillog.css`

## Tags: intentionally boring (for now)

I briefly explored word clouds for tags (because they look cool), but I’m keeping `/tags/` dead simple:

- `/tags/` is just a list of tag links with counts.

I can always revisit this once I have enough content for the tag surface area to matter.

## A little delight: Sunlit

After the baseline was stable, I gave myself permission to add one fun thing: an optional sunlight overlay inspired by the recent “sunny mode” wave.

I adapted the effect from Jacky Zhao’s open-source demo:

- Repo: `https://github.com/jackyzha0/sunlit`
- Example: `https://sunlit.pages.dev/`

On this site:

- Press **Space** to toggle ☀️ (one press = one change).
- When it’s on, the post cards become slightly transparent so the effect shows through.

Implementation-wise, it’s surprisingly small:

- CSS: `static/css/sunlit.css` (adapted from the demo)
- JS: `static/js/sunlit.js` (Space toggle + “one press per change”)
- Leaves image: `static/sunlit/leaves.png`
- Hooked into PaperMod via:
  - `layouts/partials/extend_head.html` (inject CSS)
  - `layouts/partials/extend_footer.html` (inject overlay DOM + toggle button + JS)

## The “why is localhost wrong?” trap (and how I avoided it)

One classic footgun: `baseURL`.

If your config points at production while you’re developing locally, Hugo can generate absolute links that jump you to the wrong host/port. I hit this immediately.

My fix is pragmatic:

- Locally, `hugo.yaml` uses `http://localhost:1314/`
- In CI, GitHub Actions builds with the real base URL:

```bash
hugo --minify --baseURL "https://the14thline.github.io/"
```

So local browsing stays local, and production stays correct.

## What changed for me this time

The most interesting part of this build wasn’t Hugo or PaperMod—it was the workflow.

I used to set up GitHub Pages manually and treat “blog setup” as a mini project.
This time I treated it like a conversation:

- “Make the categories page look like an archive.”
- “Remove author names from posts.”
- “Add a sunlight overlay and let Space toggle it.”
- “Stop links from jumping to the wrong port.”

Cursor made that loop fast: describe → change → refresh → adjust.

## Next

- Replace placeholder social links with real ones.
- Trim/replace sample posts with real writing.
- Decide whether to add a proper “notes” section (short-form) alongside long posts.

