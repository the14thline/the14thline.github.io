## the14thline.github.io

Personal site and blog for `the14thline`, built with **Hugo** + **PaperMod**, with a thin layer of custom layout and “sunny mode” styling on top.

This README is written so a future AI (or future me) can quickly understand the structure and how things fit together.

### Tech stack

- **Static site generator**: Hugo (Extended), currently pinned to `0.160.0`.
- **Theme**: `PaperMod` vendored into `themes/PaperMod` (copied, not a git submodule).
- **Hosting**: GitHub Pages, deployed via GitHub Actions from the `main` branch.

### Local development

- Entrypoint: project root is this directory (`the14thline.github.io`).
- Hugo is installed locally under `.tools/` (so global `brew install hugo` is not required).
- Local dev server:

```bash
./.tools/bin/hugo server --disableFastRender --port 1314
```

Then open `http://localhost:1314/`.

- `hugo.yaml` uses:

```yaml
baseURL: http://localhost:1314/
```

This keeps all generated links on the correct local port; CI overrides `baseURL` for production.

### Content model

- All posts live under: `content/posts/`
  - Example: `content/posts/big-bang-vibecoding-my-blog.md`
- Each post uses front matter:

```yaml
title: "Hello, world (again): rebuilding my site with Cursor"
date: 2024-07-03T21:49:53-07:00
draft: false
categories: ["tech"]          # broad buckets
tags: ["hugo", "papermod"]   # finer-grained facets
```

- Hugo taxonomies configured in `hugo.yaml`:

```yaml
taxonomies:
  category: categories
  tag: tags
```

So:

- `/categories/` → category terms page (customized, see below).
- `/tags/` → tags terms page (currently default PaperMod layout).

### Layout customizations

Most layout overrides are small, but important:

- **Homepage intro**:
  - Config: `params.homeInfoParams` in `hugo.yaml`.
  - Title: `👋 Welcome, Friends`.
  - Content: a two-paragraph “sonnet / Volta” description.

- **Categories page** (`/categories/`):
  - Template: `layouts/_default/terms.html` (routes based on `.Type == "categories"`).
  - Style: mimics an archive:
    - Two-column rows: left = “👨‍💻 Tech” / “🌿 Lifestyle” / “💼 Career” / “💭 Thoughts”; right = inline list of posts for that category.
    - Dotted leader lines with dates on the right (archive-like).
  - Supporting CSS: `assets/css/extended/lillog.css` (see `.categories-row`, `.cat-entry-*` rules).

- **Single post page**:
  - Template override: `layouts/_default/single.html`.
  - Change: post tags are rendered near the top of the post, just under the meta, and the footer tag list is removed.

### Sunlit “sunny mode” overlay

The site integrates a dappled-light overlay inspired by `sunlit.place` / `jackyzha0/sunlit`:

- CSS:
  - Source: `assets/css/extended/sunlit.css` (compiled / copied into `static/css/sunlit.css`).
  - Hooked into PaperMod via `layouts/partials/extend_head.html`:

    - Adds `<link rel="stylesheet" href="{{ "css/sunlit.css" | relURL }}">`

- JavaScript:
  - `static/js/sunlit.js`:
    - `Space` key toggles the overlay **on/off** (`body.sunlit-on`) with one press per change (handles `event.repeat`).
    - Persists state in `localStorage` (`sunlit-enabled`, `sunlit-dark`).
  - Hooked via `layouts/partials/extend_footer.html`:

    - Injects the Sunlit overlay DOM.
    - Injects the toggle button (“`Space` for ☀️”) pinned to the bottom-left.
    - Loads the script with `<script defer src="{{ "js/sunlit.js" | relURL }}"></script>`.

- Visual tweaks under `sunlit-on`:
  - `assets/css/extended/lillog.css` makes:
    - Post cards (`.post-entry`, `.first-entry`),
    - ToC (`.toc`),
    - Post tags, previous/next navigation (`.paginav`), and share buttons
    - …slightly more transparent, so the light pattern shows through.

### CSS extensions

Custom project-level CSS lives in:

- `assets/css/extended/lillog.css`

Key responsibilities:

- Tighten spacing between the home intro block and the first post card.
- Ensure the “back to top” button (`.top-link`) is clickable above the overlay (higher `z-index`).
- Style the categories page two-column layout and dotted leader lines.
- Adjust paragraph spacing in the home intro so the “extra blank line” between the two Volta paragraphs feels intentional:

```css
.home-info .entry-content p + p {
  margin-top: 1.75em;
}
```

### GitHub Pages / CI

Deployment is handled by GitHub Actions:

- Workflow: `.github/workflows/hugo.yml`
- Trigger: push to `main` (or manual `workflow_dispatch`).
- Steps:
  - Checkout repo.
  - Install Hugo Extended `0.160.0`.
  - Build:

    ```bash
    hugo --minify --baseURL "https://the14thline.github.io/"
    ```

  - Configure GitHub Pages.
  - Upload `public/` as the artifact.
  - Deploy via `actions/deploy-pages@v4`.

Notes:

- Local dev always uses the `baseURL` from `hugo.yaml` (`http://localhost:1314/`).
- CI **overrides** `baseURL` to the real production URL so links are correct when published.

### TODOs / future work

See `TODO.md` for:

- Wiring up GitHub Pages (auth, initial push, Pages settings).
- Experimental tags word-cloud rendering for `/tags/` using a build-time Python script.

