#!/usr/bin/env python3

"""
Build a tag word cloud image for the blog using amueller/word_cloud.

- Reads Hugo's generated public/index.json (enabled via outputs.home JSON).
- Aggregates tag frequencies from pages' Params.tags.
- Writes a PNG to static/img/tag-cloud.png.

Run locally:
    python3 scripts/build_wordcloud.py
Make sure you've run `hugo` first so public/index.json exists.
"""

import json
from pathlib import Path

from wordcloud import WordCloud


ROOT = Path(__file__).resolve().parents[1]
INDEX_JSON = ROOT / "public" / "index.json"
OUT_DIR = ROOT / "static" / "img"
OUT_PATH = OUT_DIR / "tag-cloud.png"


def load_tag_counts():
  if not INDEX_JSON.exists():
    raise SystemExit(f"Missing {INDEX_JSON}, run `hugo` first.")

  data = json.loads(INDEX_JSON.read_text(encoding="utf-8"))
  counts = {}
  for page in data:
    # PaperMod's index.json flattens params; tags live under "tags"
    tags = page.get("tags") or []
    for tag in tags:
      counts[tag] = counts.get(tag, 0) + 1
  return counts


def main():
  counts = load_tag_counts()
  if not counts:
    print("No tags found in index.json; nothing to render.")
    return

  OUT_DIR.mkdir(parents=True, exist_ok=True)

  wc = WordCloud(
      width=1200,
      height=600,
      background_color="white",
      prefer_horizontal=0.9,
      colormap="viridis",
      max_words=200,
  )
  wc.generate_from_frequencies(counts)
  wc.to_file(str(OUT_PATH))
  print(f"Wrote tag cloud image to {OUT_PATH}")


if __name__ == "__main__":
  main()

