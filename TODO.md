# TODO

## GitHub Pages publishing

- [ ] **Fix GitHub CLI auth**
  - Current status: `gh auth status` reports an invalid token for `the14thline`.
  - Fix:
    - `gh auth logout -h github.com -u the14thline`
    - `gh auth login -h github.com`
- [ ] **Create repo + push**
  - Create repo: `the14thline/the14thline.github.io`
  - Push `main` from local.
- [ ] **Enable GitHub Pages via Actions**
  - Repo Settings → Pages → Source: **GitHub Actions**
  - Workflow already exists: `.github/workflows/hugo.yml`

Notes:
- Local dev uses `baseURL: http://localhost:1314/` in `hugo.yaml` to avoid wrong-port navigation.
- CI build overrides production base URL:
  - `hugo --minify --baseURL "https://the14thline.github.io/"`

## Tags word cloud (exploration)

Goal: change `/tags/` from the default PaperMod list to a nicer **word cloud** layout closer to `amueller/word_cloud`.

Preferred approach: **build-time generated image** (PNG) so it works on GitHub Pages with no client-side layout.

- [ ] **Generate `static/img/tag-cloud.png` during build**
  - Script scaffold exists: `scripts/build_wordcloud.py`
  - It currently tries to read tags from `public/index.json`, but PaperMod’s default `index.json` output does not include tags in the expected shape yet.
  - Next steps:
    - Either (A) adjust the JSON template to include tags, or (B) parse tags directly from markdown front matter in `content/posts/`.
- [ ] **Render the image on `/tags/`**
  - Keep a fallback list of tags (so the page still works if the image is missing).
- [ ] **Wire into GitHub Actions**
  - Add Python setup + `pip install wordcloud` + `python scripts/build_wordcloud.py` before `hugo --minify`.

