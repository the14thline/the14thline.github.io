function sunlitToggle() {
  const body = document.body;
  body.classList.add("sunlit-animation-ready");
  body.classList.toggle("sunlit-dark");
  try {
    localStorage.setItem("sunlit-dark", body.classList.contains("sunlit-dark") ? "1" : "0");
  } catch {}
}

function sunlitSetEnabled(enabled) {
  const body = document.body;
  if (enabled) {
    body.classList.add("sunlit-on");
  } else {
    body.classList.remove("sunlit-on", "sunlit-animation-ready", "sunlit-dark");
  }
  try {
    localStorage.setItem("sunlit-enabled", enabled ? "1" : "0");
  } catch {}
}

function sunlitIsEnabled() {
  try {
    return localStorage.getItem("sunlit-enabled") === "1";
  } catch {
    return false;
  }
}

function sunlitIsDark() {
  try {
    return localStorage.getItem("sunlit-dark") === "1";
  } catch {
    return false;
  }
}

function initSunlit() {
  const enabled = sunlitIsEnabled();
  if (enabled) {
    sunlitSetEnabled(true);
    if (sunlitIsDark()) {
      document.body.classList.add("sunlit-animation-ready", "sunlit-dark");
    }
  }

  const btn = document.getElementById("sunlit-toggle");
  if (btn) {
    btn.addEventListener("click", () => {
      const isOn = document.body.classList.contains("sunlit-on");
      sunlitSetEnabled(!isOn);
    });
  }

  document.addEventListener("keydown", (event) => {
    // Don't hijack typing in inputs
    const t = event.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable)) {
      return;
    }

    // Space toggles day/night (one toggle per physical press).
    if (event.code === "Space") {
      if (event.repeat) return; // one toggle per physical press
      event.preventDefault();
      // enable overlay if needed, then toggle day/night
      if (!document.body.classList.contains("sunlit-on")) {
        sunlitSetEnabled(true);
      }
      sunlitToggle();
      return;
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSunlit);
} else {
  initSunlit();
}

