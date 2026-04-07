---
date: '2026-04-06T23:59:00-07:00'
draft: false
title: 'Site Setup: Hugo + PaperMod + Sunlit (Local-first)'
categories: ['tech']
tags: ['hugo', 'papermod', 'github-pages', 'css']
---

I finally bootstrapped this site from scratch: **Hugo + PaperMod**, deployed on **GitHub Pages**, with a few opinionated tweaks to make it feel like a “notes-first” blog and a small dose of fun sunlight.

This post is a short record of *what I did* so future-me can reproduce it (or undo it).

## Goals

- **Local-first**: get everything working on my laptop before worrying about deployment.
- **Fast + boring**: Hugo + PaperMod is a good “it just works” baseline.
- **Good navigation**: categories and tags should be easy to scan.
- **Optional delight**: a Sunlit overlay you can toggle with the keyboard.

## Base stack

- **Hugo (Extended)** with config in `hugo.yaml`
- **PaperMod** theme vendored under `themes/PaperMod/`
- Content lives in `content/posts/` (with `categories` + `tags` in front matter)

## Content structure (categories + tags)

I write in four high-level categories:

- 👨‍💻 tech
- 🌿 lifestyle
- 💼 career
- 💭 thoughts

In practice, posts are stored under `content/posts/` and the categories live in front matter (via Hugo taxonomies):

```yaml
categories: ['tech']
tags: ['ai', 'systems']
```

That keeps URLs simple while still letting the site group content in multiple ways.

## Categories page (custom)

PaperMod’s default taxonomy “terms” page is a list of links. I wanted something closer to an “archive” view:

- **Two columns** per category row
  - left: category label + count
  - right: post titles grouped under that category
- A **Jump to** row at the top so you can skip a long category.
- Clean list style: **title only** (no date/reading time) in this view.

This is implemented by overriding PaperMod’s terms template at:

- `layouts/_default/terms.html`

…and adding a bit of CSS in:

- `assets/css/extended/lillog.css`

## Tags page (kept simple)

I tried “word cloud” layouts for tags, but for now I’m sticking with the PaperMod default:

- `/tags/` is just a list of tag links with counts.

Simple is good; I can revisit the tag UI later.

## Sunlit overlay (optional delight)

Inspired by the “sunlit / dappled light” trend, I integrated an optional overlay based on Jacky Zhao’s open-source CSS demo:

- Repo: `https://github.com/jackyzha0/sunlit`
- Example: `https://sunlit.pages.dev/`

On this site:

- Press **Space** to toggle the sunlight theme ON/OFF (one press = one change).
- The post cards become transparent when Sunlit is enabled so the effect shows through.

Implementation details:

- CSS: `static/css/sunlit.css` (adapted from the demo)
- JS: `static/js/sunlit.js` (Space toggle + persistence)
- Leaves image: `static/sunlit/leaves.png`
- Hooked into PaperMod via:
  - `layouts/partials/extend_head.html` (inject CSS)
  - `layouts/partials/extend_footer.html` (inject overlay DOM + toggle button + JS)

## Local dev vs production URLs

One footgun with Hugo: if `baseURL` points at production, local navigation links can jump to the wrong host/port.

What I do now:

- `hugo.yaml` uses a **local** base URL: `http://localhost:1314/`
- GitHub Actions overrides it during build:

```bash
hugo --minify --baseURL "https://the14thline.github.io/"
```

So local browsing stays local, and production stays correct.

## Next steps

- Replace placeholder social links with real ones.
- Trim/replace sample posts with real writing.
- Decide whether to add a proper “notes” section (short-form) alongside long posts.

