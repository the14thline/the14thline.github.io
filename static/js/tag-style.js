function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function tagColor(tag) {
  // Deterministic "random" color: map hash -> HSL
  const h = hashString(tag);
  const hue = h % 360;
  const sat = 55 + (h % 20); // 55-74
  const light = 40 + (h % 18); // 40-57
  return `hsl(${hue}deg ${sat}% ${light}%)`;
}

function initTagStyles() {
  const tags = document.querySelectorAll(".terms-tags--scaled .term-tag");
  tags.forEach((a) => {
    const name = a.dataset.tag || a.textContent || "";
    a.style.setProperty("--tagColor", tagColor(name));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTagStyles);
} else {
  initTagStyles();
}

