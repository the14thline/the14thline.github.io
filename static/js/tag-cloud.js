function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(str) {
  // simple deterministic hash
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function rectsOverlap(a, b, pad = 2) {
  return !(
    a.right + pad < b.left ||
    a.left - pad > b.right ||
    a.bottom + pad < b.top ||
    a.top - pad > b.bottom
  );
}

function layoutCloud(container) {
  const tags = Array.from(container.querySelectorAll(".tagcloud__tag"));
  if (!tags.length) return;

  // Sort largest first (by computed font-size or weight)
  tags.sort((x, y) => {
    const wx = Number(x.dataset.weight || 0);
    const wy = Number(y.dataset.weight || 0);
    return wy - wx;
  });

  const { width, height } = container.getBoundingClientRect();
  const cx = width / 2;
  const cy = height / 2;

  // place tags with simple spiral search + collision checks
  const placed = [];
  const seed = hashString(location.pathname);
  const rand = mulberry32(seed);

  // pre-measure by temporarily putting at center
  for (const el of tags) {
    el.style.left = `${cx}px`;
    el.style.top = `${cy}px`;
    el.style.transform = "translate(-50%, -50%)";
  }

  for (const el of tags) {
    const label = el.textContent || "";
    const localRand = mulberry32(hashString(label) ^ seed);

    let angle = localRand() * Math.PI * 2;
    let radius = 0;
    let placedRect = null;

    // try up to N positions
    const maxTries = 900;
    for (let i = 0; i < maxTries; i++) {
      // Spiral: radius increases slowly, angle rotates
      radius = 4 + i * 0.55;
      angle += 0.35 + rand() * 0.06;

      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      el.style.left = `${x}px`;
      el.style.top = `${y}px`;

      // slight rotation for “cloud” feel (kept small for readability)
      const rot = (localRand() - 0.5) * 14; // -7..7 deg
      el.style.transform = `translate(-50%, -50%) rotate(${rot.toFixed(2)}deg)`;

      const r = el.getBoundingClientRect();
      const c = container.getBoundingClientRect();
      const rect = {
        left: r.left - c.left,
        right: r.right - c.left,
        top: r.top - c.top,
        bottom: r.bottom - c.top,
      };

      // must be within bounds with some padding
      const pad = 6;
      if (
        rect.left < pad ||
        rect.top < pad ||
        rect.right > width - pad ||
        rect.bottom > height - pad
      ) {
        continue;
      }

      let collides = false;
      for (const pr of placed) {
        if (rectsOverlap(rect, pr, 4)) {
          collides = true;
          break;
        }
      }
      if (!collides) {
        placedRect = rect;
        break;
      }
    }

    if (placedRect) {
      placed.push(placedRect);
    } else {
      // fallback: keep it near center, unrotated
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      el.style.transform = "translate(-50%, -50%)";
    }
  }
}

function init() {
  const container = document.querySelector(".tagboard");
  if (!container) return;

  const run = () => layoutCloud(container);
  run();

  // re-layout on resize
  let raf = 0;
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(run);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

