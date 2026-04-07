const MODES = ["night", "moonlight", "day", "sunny", "rainy", "snowy"];

function setMode(mode) {
  if (!MODES.includes(mode)) return;
  const body = document.body;
  for (const m of MODES) body.classList.remove(`mode-${m}`);
  body.classList.add(`mode-${mode}`);

  const buttons = document.querySelectorAll(".theme-modes__btn");
  buttons.forEach((btn) => {
    const isActive = btn.dataset.mode === mode;
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  try {
    localStorage.setItem("theme-mode", mode);
  } catch {
    // ignore
  }
}

function loadInitialMode() {
  try {
    const stored = localStorage.getItem("theme-mode");
    if (stored && MODES.includes(stored)) return stored;
  } catch {
    // ignore
  }
  return "night";
}

function onKeydown(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const key = String(e.key || "").toLowerCase();
  if (key === "n") return setMode("night");
  if (key === "m") return setMode("moonlight");
  if (key === "d") return setMode("day");
  if (key === "s") return setMode("sunny");
  if (key === "r") return setMode("rainy");
  if (key === "w") return setMode("snowy");
}

function init() {
  const initial = loadInitialMode();
  setMode(initial);

  document.addEventListener("keydown", onKeydown);
  document.addEventListener("click", (e) => {
    const btn = e.target && e.target.closest && e.target.closest(".theme-modes__btn");
    if (!btn) return;
    setMode(btn.dataset.mode);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

